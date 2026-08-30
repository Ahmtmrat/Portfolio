/**
 * Procedural galaxy geometry, driven by the owner's galactic profile.
 *
 * Pure math, no three.js — so it can be rendered offline for previews as well
 * as fed to a WebGL point cloud. Nothing derives from a model file or any
 * third-party asset: no licence, no attribution.
 *
 * The profile calls for an SBbc — a barred spiral. That shapes everything:
 *
 *   1. a BAR through the centre; the arms spring from its ends, not from the
 *      core, which is what makes a barred spiral read as barred;
 *   2. four ARMS as logarithmic spirals, each with its own pitch angle and
 *      its own colour, so the galaxy separates into four themed regions;
 *   3. a thin SMOOTH DISK between them, so the arms modulate a disk rather
 *      than floating in a void;
 *   4. a BULGE with a hole punched through the middle — the core is a black
 *      hole, so the centre has to be dark for the accretion disk to read;
 *   5. ORGANIC MODULATION — fractal noise, dust lanes, the nebula and a
 *      star-forming overdensity around each named system, all applied by
 *      rejection sampling. This is what stops the disk looking computed.
 */

import { PROFILE, type GalaxyProfileData } from "@/data/galaxyProfile";

export type GalaxyGeometry = {
  positions: Float32Array;
  colors: Float32Array;
  /** Per-star galactocentric distance, normalised 0..1. */
  radii: Float32Array;
  /** 1 for bar and bulge stars — drawn smaller so the core does not clip. */
  bulge: Uint8Array;
};

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

// ── Value noise ────────────────────────────────────────────────────────────

function hash3(x: number, y: number, z: number, seed: number) {
  let h = Math.imul(x | 0, 374761393);
  h = (h + Math.imul(y | 0, 668265263)) | 0;
  h = (h + Math.imul(z | 0, 1442695041)) | 0;
  h = (h + Math.imul(seed | 0, 1274126177)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function valueNoise(x: number, y: number, z: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = smoothstep(x - xi);
  const yf = smoothstep(y - yi);
  const zf = smoothstep(z - zi);
  const x00 = lerp(hash3(xi, yi, zi, seed), hash3(xi + 1, yi, zi, seed), xf);
  const x10 = lerp(hash3(xi, yi + 1, zi, seed), hash3(xi + 1, yi + 1, zi, seed), xf);
  const x01 = lerp(hash3(xi, yi, zi + 1, seed), hash3(xi + 1, yi, zi + 1, seed), xf);
  const x11 = lerp(hash3(xi, yi + 1, zi + 1, seed), hash3(xi + 1, yi + 1, zi + 1, seed), xf);
  return lerp(lerp(x00, x10, yf), lerp(x01, x11, yf), zf);
}

/** Fractal sum — the octaves are what give clumps inside clumps. */
function fbm(x: number, y: number, seed: number, octaves = 4) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise(x * freq, y * freq, 0.5, seed + i * 101) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2.07; // non-integer, so octaves never line up into a visible grid
  }
  return sum / norm;
}

/** Smoothly fades a population out toward the centre, 0 at r=0 up to 1. */
function innerGate(r: number, scale: number) {
  const t = Math.min(r / scale, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Exponential disk profile with a soft cap: dense inside, fading outward,
 * so the disk has neither a hard inner edge nor a cut-off rim.
 */
function expRadius(rand: () => number, scale: number, max: number) {
  const r = -scale * Math.log(1 - rand() * 0.985);
  return r > max ? max * (0.72 + rand() * 0.3) : r;
}

/** Sum of three uniforms ≈ normal; cheap and good enough for disk thickness. */
function gaussian(rand: () => number) {
  return (rand() + rand() + rand() - 1.5) * 0.9;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// ── Population mix ─────────────────────────────────────────────────────────

const HALO_FRACTION = 0.2;
const BAR_FRACTION = 0.12;
const BULGE_FRACTION = 0.09;
const SMOOTH_FRACTION = 0.19; // inter-arm disk
// the remainder goes to the arms

/** Radius of the dark centre, in kpc — the black hole's shadow. */
const CORE_HOLE_KPC = 0.55;

export function generateGalaxy(
  count = 110_000,
  profile: GalaxyProfileData = PROFILE,
  seed = 0x4d5254 // "MRT"
): GalaxyGeometry {
  const rand = mulberry32(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const radii = new Float32Array(count);
  const bulge = new Uint8Array(count);

  const R = profile.radiusKpc;
  const barHalf = profile.bar.lengthKpc / 2;
  const barAngle = profile.bar.angleDeg * DEG;
  const spin = profile.clockwise ? -1 : 1;

  const barRgb = hexToRgb(profile.bar.color);
  const coreRgb = hexToRgb(profile.core.disk);

  // Arms are chosen in proportion to how brightly they burn, so a quiet arm
  // is genuinely sparser rather than merely dimmer.
  const armWeights = profile.arms.map((a) => 0.35 + a.luminosity);
  const armTotal = armWeights.reduce((s, w) => s + w, 0);
  const armRgb = profile.arms.map((a) => hexToRgb(a.color));

  // Star-forming overdensities: the nebula, and every named system.
  type Blob = { x: number; y: number; sigma2: number; weight: number };
  const blobs: Blob[] = [];
  for (const n of profile.nebulae) {
    blobs.push({
      x: Math.cos(n.theta * DEG) * n.kpc,
      y: Math.sin(n.theta * DEG) * n.kpc,
      sigma2: n.radiusKpc ** 2,
      weight: 1.5,
    });
  }
  for (const arm of profile.arms) {
    for (const s of arm.systems) {
      blobs.push({
        x: Math.cos(s.theta * DEG) * s.kpc,
        y: Math.sin(s.theta * DEG) * s.kpc,
        sigma2: (0.5 + s.mass * 0.25) ** 2,
        weight: 0.5 + s.luminosity * 1.2,
      });
    }
  }

  const density = (x: number, y: number, r: number) => {
    let d = 0.3 + fbm(x / 2.4, y / 2.4, seed, 4) * 1.2;
    for (const b of blobs) {
      const dx = x - b.x;
      const dy = y - b.y;
      d += b.weight * Math.exp(-(dx * dx + dy * dy) / b.sigma2);
    }
    // Dust lane: a deficit trailing each arm, the darkest structure in a disk.
    const lane = Math.sin((r / R) * 9 + Math.atan2(y, x) * 2);
    d *= 1 - 0.22 * Math.max(0, lane);
    return d;
  };

  let i = 0;
  let guard = 0;
  const maxIterations = count * 60;

  while (i < count && guard++ < maxIterations) {
    let x: number, y: number, z: number;
    let rgb: [number, number, number];
    let isCore = 0;
    const roll = rand();

    if (roll < HALO_FRACTION) {
      /**
       * The stellar halo: old, dim stars on a nearly spherical distribution
       * reaching far above and below the plane.
       *
       * Without it a galaxy renders as a disc with nothing over its centre —
       * a cylinder seen from above rather than a body with volume. It is the
       * single population that makes the system read as three-dimensional.
       */
      const r = 1.2 + Math.pow(rand(), 3.1) * (R * 1.3);
      const theta = rand() * TAU;
      const cosPhi = rand() * 2 - 1;
      const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
      x = r * sinPhi * Math.cos(theta);
      y = r * sinPhi * Math.sin(theta);
      z = r * cosPhi * 0.92; // very nearly spherical
      // Old and metal-poor: warm, desaturated, and never bright enough to
      // compete with the disk it surrounds.
      const warm = 0.85 + rand() * 0.3;
      rgb = [0.95 * warm, 0.87 * warm, 0.78 * warm];
      isCore = 1;
    } else if (roll < HALO_FRACTION + BULGE_FRACTION) {
      // Spheroid with a hole punched out of the middle.
      const r = CORE_HOLE_KPC + Math.pow(rand(), 1.5) * (3.1 - CORE_HOLE_KPC);
      const theta = rand() * TAU;
      const cosPhi = rand() * 2 - 1;
      const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
      x = r * sinPhi * Math.cos(theta);
      y = r * sinPhi * Math.sin(theta);
      z = r * cosPhi * 0.88;
      rgb = [...coreRgb];
      isCore = 1;
    } else if (roll < HALO_FRACTION + BULGE_FRACTION + BAR_FRACTION) {
      // Prolate ellipsoid along the bar axis, with a hole at the centre.
      const u = (rand() * 2 - 1) * barHalf;
      const v = gaussian(rand) * 1.05;
      const c = Math.cos(barAngle);
      const s = Math.sin(barAngle);
      x = u * c - v * s;
      y = u * s + v * c;
      z = gaussian(rand) * 0.55;
      if (Math.hypot(x, y) < CORE_HOLE_KPC) continue;
      rgb = [...barRgb];
      isCore = 1;
    } else if (roll < HALO_FRACTION + BULGE_FRACTION + BAR_FRACTION + SMOOTH_FRACTION) {
      // Smooth inter-arm disk: faint, uniform in angle.
      const r = expRadius(rand, 5.5, R);
      // Soft inner rolloff instead of a minimum radius: a hard floor piles the
      // exponential up against it and rings the core with a donut.
      if (rand() > innerGate(r, barHalf * 0.55)) continue;
      const a = rand() * TAU;
      x = Math.cos(a) * r;
      y = Math.sin(a) * r;
      if (rand() * 1.9 > density(x, y, r)) continue;
      z = gaussian(rand) * (0.45 + r * 0.115);
      // Inter-arm stars borrow the nearest arm's hue, heavily desaturated.
      const k = Math.floor(rand() * profile.arms.length);
      const base = armRgb[k];
      rgb = [
        lerp(base[0], 0.72, 0.62),
        lerp(base[1], 0.78, 0.62),
        lerp(base[2], 0.85, 0.62),
      ];
    } else {
      // Arms. Each is a logarithmic spiral launched from a bar end.
      let pick = rand() * armTotal;
      let k = 0;
      while (k < armWeights.length - 1 && pick > armWeights[k]) {
        pick -= armWeights[k];
        k++;
      }
      const arm = profile.arms[k];

      const r = expRadius(rand, 5.2, R);
      if (rand() > innerGate(r, barHalf * 1.15)) continue;
      // A full logarithmic solution coils about twice over this radius range,
      // which reads as a pinwheel; 0.55 keeps roughly one turn.
      // log(r / barHalf) diverges as r falls toward the centre, which throws
      // inner stars to random angles and smears them into a ring around the
      // core. This form is zero where the arm leaves the bar and grows
      // smoothly outward, so it never blows up.
      const u = Math.max(r - barHalf * 0.55, 0) / barHalf;
      // 0.8 still carried the tightest arm past a full turn, so it overlapped
      // itself and read as a ring; 0.45 keeps every arm under about half a turn.
      const wind = 0.45 * (Math.log(1 + u * 1.8) / Math.tan(arm.pitchAngleDeg * DEG));
      const a = arm.startAngleDeg * DEG + spin * wind + gaussian(rand) * 0.58;

      x = Math.cos(a) * r;
      y = Math.sin(a) * r;
      if (rand() * 1.9 > density(x, y, r)) continue;
      z = gaussian(rand) * (0.4 + r * 0.12);
      // Colour is not a map of which arm a star belongs to. A slow noise
      // field picks a second arm and a mixing weight, so hues bleed across
      // arm boundaries — the spiral stays as structure but stops announcing
      // itself as four coloured ribbons.
      const ac = armRgb[k];
      const pickField = fbm(x / 6.5, y / 6.5, seed + 57, 3);
      const k2 = (k + 1 + Math.floor(pickField * (profile.arms.length - 1))) % profile.arms.length;
      const bc = armRgb[k2];
      const m = 0.12 + fbm(x / 3.4, y / 3.4, seed + 91, 3) * 0.72;
      rgb = [
        lerp(lerp(ac[0], bc[0], m), 0.95, 0.2),
        lerp(lerp(ac[1], bc[1], m), 0.93, 0.2),
        lerp(lerp(ac[2], bc[2], m), 0.86, 0.2),
      ];
    }

    const rr = Math.hypot(x, y);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    radii[i] = Math.min(rr / R, 1);
    bulge[i] = isCore;

    // A few hot young stars, kept to white so they never fight the arm hues.
    if (!isCore && rand() < 0.04) rgb = [0.86, 0.92, 1.0];

    // Brightness falls outward; the core and bar carry the inner glow.
    const t = radii[i];
    const falloff = isCore ? 0.5 - t * 0.1 : 0.85 - t * 0.45;
    const brightness = Math.max(falloff, 0.16) * (0.82 + rand() * 0.42);

    colors[i * 3] = rgb[0] * brightness;
    colors[i * 3 + 1] = rgb[1] * brightness;
    colors[i * 3 + 2] = rgb[2] * brightness;
    i++;
  }

  return { positions, colors, radii, bulge };
}
