"use client";

import { useEffect, useRef } from "react";
import { generateGalaxy } from "@/lib/galaxy";
import { PROFILE } from "@/data/galaxyProfile";
import {
  BLOOM,
  CAMERA_HEIGHT_KPC,
  CAMERA_RADIUS_KPC,
  FIELD_COUNT,
  FIELD_RADIUS,
  FOV,
  GALAXY_OFFSET,
  GLOBULAR_POINTS,
  NEBULA_POINTS,
  AIM_SHIFT,
  PARALLAX,
  POINT_SIZE,
  ROTATION_PERIOD,
  STAR_COUNT,
  SYSTEM_POINT_SIZE,
} from "@/lib/scene";

/**
 * The fixed backdrop for the whole page: a barred spiral galaxy whose
 * structure is generated from the owner's galactic profile.
 *
 * Everything is produced at runtime — no model file, no sprite image, no
 * third-party asset, so nothing here carries a licence or needs attribution.
 * three.js is imported lazily and the scene is purely decorative: with WebGL
 * unavailable the page reads exactly the same.
 *
 * Only the profile's geometry is used. Nothing is labelled, and nothing in the
 * scene should be read by a visitor as a factual claim.
 */

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

/** Deterministic, so every visitor sees the same sky. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A soft radial disc, drawn once into a canvas — this is the star sprite. */
function discTexture(THREE: typeof import("three")) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.75)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Profile coordinates are polar and live in the galactic plane. */
const polar = (kpc: number, thetaDeg: number): [number, number, number] => [
  Math.cos(thetaDeg * DEG) * kpc,
  Math.sin(thetaDeg * DEG) * kpc,
  0,
];

export default function SpaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let dispose: (() => void) | undefined;

    (async () => {
      let THREE: typeof import("three");
      let EffectComposer: typeof import("three/addons/postprocessing/EffectComposer.js")["EffectComposer"];
      let RenderPass: typeof import("three/addons/postprocessing/RenderPass.js")["RenderPass"];
      let UnrealBloomPass: typeof import("three/addons/postprocessing/UnrealBloomPass.js")["UnrealBloomPass"];
      let OutputPass: typeof import("three/addons/postprocessing/OutputPass.js")["OutputPass"];
      try {
        [THREE, { EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }] =
          await Promise.all([
            import("three"),
            import("three/addons/postprocessing/EffectComposer.js"),
            import("three/addons/postprocessing/RenderPass.js"),
            import("three/addons/postprocessing/UnrealBloomPass.js"),
            import("three/addons/postprocessing/OutputPass.js"),
          ]);
      } catch {
        return; // Decorative only — the page is fully readable without it.
      }
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        return; // No WebGL context.
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.autoClear = false;

      const rand = mulberry32(0x4d5254); // "MRT"
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 4000);
      // Z is up: the galactic plane is XY, so a Y-up camera looking down the
      // Y axis would give a degenerate basis.
      camera.up.set(0, 0, 1);
      const home = new THREE.Vector3(0, -CAMERA_RADIUS_KPC, CAMERA_HEIGHT_KPC);
      const look = new THREE.Vector3(0, 0, 0);
      const aim = look.clone();
      camera.position.copy(home);
      camera.lookAt(look);

      const disc = discTexture(THREE);
      const disposables: { dispose: () => void }[] = [disc];
      const track = <T extends { dispose: () => void }>(x: T) => {
        disposables.push(x);
        return x;
      };

      /** Everything that turns with the disk hangs off this. */
      const galaxy = new THREE.Group();
      galaxy.position.set(...GALAXY_OFFSET);
      scene.add(galaxy);

      const pointCloud = (
        pos: Float32Array,
        col: Float32Array,
        size: number,
        parent: import("three").Object3D
      ) => {
        const geo = track(new THREE.BufferGeometry());
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        const mat = track(
          new THREE.PointsMaterial({
            map: disc,
            transparent: true,
            depthWrite: false,
            vertexColors: true,
            size,
            blending: THREE.AdditiveBlending,
          })
        );
        const pts = new THREE.Points(geo, mat);
        parent.add(pts);
        return { geo, mat, pts };
      };

      // ── The disk itself ──────────────────────────────────────────────
      const g = generateGalaxy(STAR_COUNT);

      /**
       * Bar and bulge are drawn as a separate cloud with a smaller point:
       * tens of thousands of full-size sprites piled into the centre saturate
       * additive blending and flatten the core into a white disc.
       */
      const splitCloud = (wantCore: boolean, size: number) => {
        let n = 0;
        for (let i = 0; i < STAR_COUNT; i++) if (!!g.bulge[i] === wantCore) n++;
        const pos = new Float32Array(n * 3);
        const col = new Float32Array(n * 3);
        let k = 0;
        for (let i = 0; i < STAR_COUNT; i++) {
          if (!!g.bulge[i] !== wantCore) continue;
          pos[k * 3] = g.positions[i * 3];
          pos[k * 3 + 1] = g.positions[i * 3 + 1];
          pos[k * 3 + 2] = g.positions[i * 3 + 2];
          col[k * 3] = g.colors[i * 3];
          col[k * 3 + 1] = g.colors[i * 3 + 1];
          col[k * 3 + 2] = g.colors[i * 3 + 2];
          k++;
        }
        pointCloud(pos, col, size, galaxy);
      };
      splitCloud(false, POINT_SIZE.disk);
      splitCloud(true, POINT_SIZE.core);

      // ── Core: a black hole, so the centre is dark ────────────────────
      const sphere = track(new THREE.SphereGeometry(1, 24, 18));
      const shadowMat = track(new THREE.MeshBasicMaterial({ color: PROFILE.core.color }));
      const shadow = new THREE.Mesh(sphere, shadowMat);
      shadow.scale.setScalar(0.17);
      galaxy.add(shadow);

      // The accretion disk is the only bright thing at the centre.
      // Sized for a camera this close to the core: at the old radius the ring
      // filled a third of the frame and read as a donut rather than a core.
      const accretionGeo = track(new THREE.RingGeometry(0.21, 0.52, 72));
      const accretionMat = track(
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(PROFILE.core.disk).multiplyScalar(1.7),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      const accretion = new THREE.Mesh(accretionGeo, accretionMat);
      galaxy.add(accretion);

      // ── Named systems ────────────────────────────────────────────────
      // Drawn as points like every other star, only fractionally larger: they
      // should read as slightly notable stars, not as pins on a map. A variable
      // star therefore pulses in brightness rather than in size — which is what
      // a Cepheid actually does.
      const systems = PROFILE.arms.flatMap((arm) => arm.systems);
      const sysPos = new Float32Array(systems.length * 3);
      const sysCol = new Float32Array(systems.length * 3);
      const sysBase = systems.map((s) => {
        const [x, y] = polar(s.kpc, s.theta);
        return { rgb: new THREE.Color(s.color), gain: 0.9 + s.luminosity * 2.2, x, y };
      });
      sysBase.forEach((b, i) => {
        sysPos[i * 3] = b.x;
        sysPos[i * 3 + 1] = b.y;
        sysPos[i * 3 + 2] = 0;
        sysCol[i * 3] = b.rgb.r * b.gain;
        sysCol[i * 3 + 1] = b.rgb.g * b.gain;
        sysCol[i * 3 + 2] = b.rgb.b * b.gain;
      });
      const systemCloud = pointCloud(sysPos, sysCol, SYSTEM_POINT_SIZE, galaxy);
      const variableStars = systems
        .map((s, i) => ({ i, variable: s.variable }))
        .filter((s) => s.variable)
        .map((s) => ({ index: s.i, phase: rand() * TAU }));

      // ── Globular clusters, out in the halo ───────────────────────────
      for (const gc of PROFILE.globulars) {
        // Halo clusters sit off the disk plane, which is what makes them read
        // as halo rather than as another arm.
        const u = rand() * 2 - 1;
        const phi = rand() * TAU;
        const s = Math.sqrt(1 - u * u);
        const centre = new THREE.Vector3(
          s * Math.cos(phi) * gc.haloKpc,
          s * Math.sin(phi) * gc.haloKpc,
          u * gc.haloKpc * 0.75
        );

        const pos = new Float32Array(GLOBULAR_POINTS * 3);
        const col = new Float32Array(GLOBULAR_POINTS * 3);
        const base = new THREE.Color(gc.color);
        const spread = 0.5 + gc.age * 0.45;
        for (let i = 0; i < GLOBULAR_POINTS; i++) {
          const r = Math.pow(rand(), 2) * spread;
          const uu = rand() * 2 - 1;
          const pp = rand() * TAU;
          const ss = Math.sqrt(1 - uu * uu);
          pos[i * 3] = centre.x + ss * Math.cos(pp) * r;
          pos[i * 3 + 1] = centre.y + ss * Math.sin(pp) * r;
          pos[i * 3 + 2] = centre.z + uu * r;
          const b = (0.22 + rand() * 0.34) * gc.age;
          col[i * 3] = base.r * b;
          col[i * 3 + 1] = base.g * b;
          col[i * 3 + 2] = base.b * b;
        }
        pointCloud(pos, col, 0.045, galaxy);
      }

      // ── Nebula ───────────────────────────────────────────────────────
      for (const n of PROFILE.nebulae) {
        const [nx, ny] = polar(n.kpc, n.theta);
        const pos = new Float32Array(NEBULA_POINTS * 3);
        const col = new Float32Array(NEBULA_POINTS * 3);
        const base = new THREE.Color(n.color);
        for (let i = 0; i < NEBULA_POINTS; i++) {
          const r = Math.pow(rand(), 0.6) * n.radiusKpc;
          const a = rand() * TAU;
          pos[i * 3] = nx + Math.cos(a) * r;
          pos[i * 3 + 1] = ny + Math.sin(a) * r * 0.8;
          pos[i * 3 + 2] = (rand() - 0.5) * 0.7;
          const fade = (1 - r / n.radiusKpc) * (0.12 + rand() * 0.22);
          col[i * 3] = base.r * fade;
          col[i * 3 + 1] = base.g * fade;
          col[i * 3 + 2] = base.b * fade;
        }
        pointCloud(pos, col, 0.06, galaxy);

        // Protostars: brighter the further they have condensed.
        const pp = new Float32Array(n.protostars.length * 3);
        const pc = new Float32Array(n.protostars.length * 3);
        n.protostars.forEach((condensation, i) => {
          const r = rand() * n.radiusKpc * 0.75;
          const a = rand() * TAU;
          pp[i * 3] = nx + Math.cos(a) * r;
          pp[i * 3 + 1] = ny + Math.sin(a) * r * 0.8;
          pp[i * 3 + 2] = (rand() - 0.5) * 0.4;
          const b = 0.5 + condensation * 1.4;
          pc[i * 3] = base.r * b;
          pc[i * 3 + 1] = base.g * b;
          pc[i * 3 + 2] = base.b * b;
        });
        pointCloud(pp, pc, 0.12, galaxy);
      }

      // ── Novae: one-off flashes, each on its own cycle ────────────────
      const novaPos = new Float32Array(PROFILE.novae.length * 3);
      const novaCol = new Float32Array(PROFILE.novae.length * 3);
      const novae = PROFILE.novae.map((t, i) => {
        const r = 3 + rand() * (PROFILE.radiusKpc - 4);
        const a = rand() * TAU;
        novaPos[i * 3] = Math.cos(a) * r;
        novaPos[i * 3 + 1] = Math.sin(a) * r;
        novaPos[i * 3 + 2] = (rand() - 0.5) * 0.6;
        return {
          rgb: new THREE.Color(t.color),
          peak: t.peak,
          phase: rand() * TAU,
          speed: 0.18 + rand() * 0.22,
        };
      });
      const novaCloud = pointCloud(novaPos, novaCol, 0.16, galaxy);

      // ── Sparse foreground field ──────────────────────────────────────
      const fieldPos = new Float32Array(FIELD_COUNT * 3);
      const fieldCol = new Float32Array(FIELD_COUNT * 3);
      for (let i = 0; i < FIELD_COUNT; i++) {
        const u = rand() * 2 - 1;
        const phi = rand() * TAU;
        const s = Math.sqrt(1 - u * u);
        const d = FIELD_RADIUS.min + rand() * (FIELD_RADIUS.max - FIELD_RADIUS.min);
        fieldPos[i * 3] = s * Math.cos(phi) * d;
        fieldPos[i * 3 + 1] = s * Math.sin(phi) * d;
        fieldPos[i * 3 + 2] = u * d;
        const b = 0.3 + rand() * 0.55;
        fieldCol[i * 3] = 0.72 * b;
        fieldCol[i * 3 + 1] = 0.8 * b;
        fieldCol[i * 3 + 2] = b;
      }
      const field = pointCloud(fieldPos, fieldCol, 1.2, scene);
      field.mat.sizeAttenuation = false;

      // ── Bloom ────────────────────────────────────────────────────────
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(1, 1),
        BLOOM.strength,
        BLOOM.radius,
        BLOOM.threshold
      );
      composer.addPass(bloomPass);
      composer.addPass(new OutputPass());

      const resize = () => {
        const w = canvas.clientWidth || 1;
        const h = canvas.clientHeight || 1;
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        bloomPass.resolution.set(w * 0.5, h * 0.5);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      resize();

      // ── Motion ───────────────────────────────────────────────────────
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      const spin = PROFILE.clockwise ? -1 : 1;

      const onPointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        target.x = (e.clientX - rect.left) / rect.width - 0.5;
        target.y = (e.clientY - rect.top) / rect.height - 0.5;
      };

      const clock = new THREE.Clock();
      let frame = 0;

      const draw = (t: number) => {
        galaxy.rotation.z = spin * (t / ROTATION_PERIOD) * TAU;

        // The accretion disk turns far faster than the disk around it.
        accretion.rotation.z = -t * 0.22;
        accretionMat.opacity = 0.82 + Math.sin(t * 0.9) * 0.14;

        for (const v of variableStars) {
          const b = sysBase[v.index];
          const k = 1 + Math.sin(t * 0.55 + v.phase) * 0.55;
          sysCol[v.index * 3] = b.rgb.r * b.gain * k;
          sysCol[v.index * 3 + 1] = b.rgb.g * b.gain * k;
          sysCol[v.index * 3 + 2] = b.rgb.b * b.gain * k;
        }
        if (variableStars.length) systemCloud.geo.attributes.color.needsUpdate = true;

        novae.forEach((n, i) => {
          // Sharp rise, slow decay — a nova, not a sine wave.
          const cycle = (Math.sin(t * n.speed + n.phase) + 1) / 2;
          const b = Math.pow(cycle, 6) * n.peak * 2.2;
          novaCol[i * 3] = n.rgb.r * b;
          novaCol[i * 3 + 1] = n.rgb.g * b;
          novaCol[i * 3 + 2] = n.rgb.b * b;
        });
        novaCloud.geo.attributes.color.needsUpdate = true;

        current.x += (target.x - current.x) * 0.04;
        current.y += (target.y - current.y) * 0.04;
        camera.position.set(
          home.x - current.x * PARALLAX,
          home.y - current.y * PARALLAX * 0.35,
          home.z + current.y * PARALLAX
        );
        // Swinging the aim as well as the position turns the parallax into a
        // look-around rather than a slide.
        aim.set(
          look.x + current.x * AIM_SHIFT,
          look.y,
          look.z - current.y * AIM_SHIFT
        );
        camera.lookAt(aim);

        composer.render();
      };

      const tick = () => {
        frame = requestAnimationFrame(tick);
        draw(clock.getElapsedTime());
      };

      const start = () => {
        if (!frame) tick();
      };
      const stop = () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      };

      // Reduced motion: draw one still frame and leave it there.
      const applyMotionPreference = () => {
        if (reduceMotion.matches) {
          stop();
          draw(0);
        } else {
          start();
        }
      };

      // No sense burning battery on an animated scene in a background tab.
      const onVisibility = () => {
        if (document.hidden) stop();
        else applyMotionPreference();
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      reduceMotion.addEventListener("change", applyMotionPreference);
      applyMotionPreference();

      dispose = () => {
        stop();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("visibilitychange", onVisibility);
        reduceMotion.removeEventListener("change", applyMotionPreference);
        observer.disconnect();
        for (const d of disposables) d.dispose();
        bloomPass.dispose();
        composer.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      dispose?.();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="galaxy-canvas" aria-hidden="true" />
      <div className="galaxy-scrim" aria-hidden="true" />
    </>
  );
}
