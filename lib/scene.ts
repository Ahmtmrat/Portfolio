/**
 * Layout of the galaxy backdrop, in kiloparsecs — the same units the profile
 * is authored in, so nothing is converted twice.
 *
 * Shared by the live component and the offline preview renderer, so the two
 * cannot drift apart while the composition is being tuned.
 */

/** Vertical field of view, degrees. */
export const FOV = 80;

/**
 * The camera sits INSIDE the disk: 13 kpc out from the axis on a 16 kpc
 * disk, only 9 kpc above the plane. Near stars stream past large while the
 * far side falls away small, and that size difference is the entire source of
 * the depth — a distant, near face-on view flattens into a decal.
 */
export const CAMERA_RADIUS_KPC = 8;
export const CAMERA_HEIGHT_KPC = 3.4;

/** Core sits left of centre, clear of the hero headline. */
export const GALAXY_OFFSET: [number, number, number] = [-3, 1.5, 0];

/** How far the pointer drags the camera. Small: this is a backdrop. */
export const PARALLAX = 2.8;
/** The pointer also swings where the camera aims, not just where it sits. */
export const AIM_SHIFT = 1.6;

export const STAR_COUNT = 110_000;

/**
 * Point sizes in kpc. At this distance and field of view these land near a
 * pixel apiece; the glow comes from bloom, not from fat points.
 */
export const POINT_SIZE = { disk: 0.028, core: 0.019 };

/**
 * Named systems are drawn as points like everything else, only 15% larger —
 * they should read as slightly notable stars, not as markers on a map.
 */
export const SYSTEM_POINT_SIZE = POINT_SIZE.disk * 1.15;

/** Sparse foreground field, for depth in front of the galaxy. */
export const FIELD_COUNT = 2_200;
export const FIELD_RADIUS = { min: 40, max: 220 };

/** Points per globular cluster out in the halo. */
export const GLOBULAR_POINTS = 420;
/** Points making up the nebula. */
export const NEBULA_POINTS = 3_200;

/** Bloom: threshold 0 so every star bleeds a little. */
export const BLOOM = { strength: 0.95, radius: 0.85, threshold: 0 };

/** Seconds for a full turn of the disk. */
export const ROTATION_PERIOD = 400;
