/**
 * Galaxy geometry, extracted from the owner's galactic profile (v2).
 *
 * Geometry, colour and brightness only — no names, no descriptions. The
 * backdrop is decorative and nothing in it should ever be read by a visitor
 * as a factual claim; ids are deliberately neutral.
 *
 * Distances are in kiloparsecs, angles in degrees, exactly as authored.
 */

export type SystemSpec = {
  id: string;
  /** Galactocentric distance — small is concrete, large is long-horizon. */
  kpc: number;
  /** Angular position along its arm. */
  theta: number;
  /** Gravitational pull, independent of how brightly it shines. */
  mass: number;
  luminosity: number;
  color: string;
  planets: number;
  /** Cepheid — brightens and dims on a cycle. */
  variable?: boolean;
};

export type ArmSpec = {
  id: string;
  startAngleDeg: number;
  pitchAngleDeg: number;
  color: string;
  luminosity: number;
  systems: SystemSpec[];
};

export type GalaxyProfileData = {
  radiusKpc: number;
  armCount: number;
  clockwise: boolean;
  core: { color: string; disk: string };
  bar: { lengthKpc: number; angleDeg: number; color: string };
  arms: ArmSpec[];
  nebulae: { id: string; kpc: number; theta: number; radiusKpc: number; color: string; protostars: number[] }[];
  globulars: { id: string; haloKpc: number; age: number; color: string }[];
  novae: { id: string; peak: number; color: string }[];
  wormholes: { from: string; to: string }[];
};

export const PROFILE: GalaxyProfileData = {
  "radiusKpc": 16,
  "armCount": 4,
  "clockwise": true,
  "core": {
    "color": "#1a1420",
    "disk": "#f5a623"
  },
  "bar": {
    "lengthKpc": 9,
    "angleDeg": 27,
    "color": "#e8c87a"
  },
  "arms": [
    {
      "id": "arm1",
      "startAngleDeg": 0,
      "pitchAngleDeg": 12,
      "color": "#0a9e8e",
      "luminosity": 1,
      "systems": [
        {
          "id": "s1",
          "kpc": 8,
          "theta": 12,
          "mass": 1,
          "luminosity": 1,
          "color": "#0a9e8e",
          "planets": 4
        },
        {
          "id": "s2",
          "kpc": 7.4,
          "theta": 26,
          "mass": 0.68,
          "luminosity": 0.6,
          "color": "#4fd1c5",
          "planets": 10
        },
        {
          "id": "s3",
          "kpc": 9.1,
          "theta": 4,
          "mass": 0.5,
          "luminosity": 0.45,
          "color": "#a8d8d0",
          "planets": 0,
          "variable": true
        },
        {
          "id": "s4",
          "kpc": 8.4,
          "theta": 19,
          "mass": 0.95,
          "luminosity": 0.78,
          "color": "#1fb5a8",
          "planets": 0
        },
        {
          "id": "s5",
          "kpc": 9,
          "theta": 33,
          "mass": 0.8,
          "luminosity": 0.7,
          "color": "#62d6c9",
          "planets": 0
        }
      ]
    },
    {
      "id": "arm2",
      "startAngleDeg": 90,
      "pitchAngleDeg": 14,
      "color": "#c1543a",
      "luminosity": 0.5,
      "systems": [
        {
          "id": "s6",
          "kpc": 8.6,
          "theta": 96,
          "mass": 0.75,
          "luminosity": 0.45,
          "color": "#c1543a",
          "planets": 3
        },
        {
          "id": "s7",
          "kpc": 11.5,
          "theta": 108,
          "mass": 0.35,
          "luminosity": 0.12,
          "color": "#c9b27a",
          "planets": 0
        },
        {
          "id": "s8",
          "kpc": 13.2,
          "theta": 118,
          "mass": 0.2,
          "luminosity": 0.05,
          "color": "#5ba3c7",
          "planets": 0
        },
        {
          "id": "s9",
          "kpc": 15.8,
          "theta": 130,
          "mass": 120,
          "luminosity": 0.2,
          "color": "#d9a066",
          "planets": 0
        }
      ]
    },
    {
      "id": "arm3",
      "startAngleDeg": 180,
      "pitchAngleDeg": 11,
      "color": "#e8b04b",
      "luminosity": 0.4,
      "systems": [
        {
          "id": "s10",
          "kpc": 6.9,
          "theta": 186,
          "mass": 0.85,
          "luminosity": 0.4,
          "color": "#e8b04b",
          "planets": 3
        },
        {
          "id": "s11",
          "kpc": 7.6,
          "theta": 196,
          "mass": 0.7,
          "luminosity": 0.25,
          "color": "#4c9aff",
          "planets": 0
        },
        {
          "id": "s12",
          "kpc": 7.2,
          "theta": 190,
          "mass": 0.65,
          "luminosity": 0.45,
          "color": "#f1be63",
          "planets": 0
        }
      ]
    },
    {
      "id": "arm4",
      "startAngleDeg": 270,
      "pitchAngleDeg": 18,
      "color": "#7b61ff",
      "luminosity": 0.08,
      "systems": [
        {
          "id": "s13",
          "kpc": 8.8,
          "theta": 272,
          "mass": 0.85,
          "luminosity": 0.7,
          "color": "#8b72ff",
          "planets": 0
        },
        {
          "id": "s14",
          "kpc": 10.4,
          "theta": 278,
          "mass": 1.4,
          "luminosity": 0.08,
          "color": "#7b61ff",
          "planets": 0
        }
      ]
    }
  ],
  "nebulae": [
    {
      "id": "n1",
      "kpc": 5.5,
      "theta": 220,
      "radiusKpc": 2.4,
      "color": "#8a7ba8",
      "protostars": [
        0.75,
        0.7,
        0.55,
        0.5,
        0.4,
        0.3,
        0.2,
        0.15
      ]
    }
  ],
  "globulars": [
    {
      "id": "g1",
      "haloKpc": 14,
      "age": 1,
      "color": "#b8a8c7"
    },
    {
      "id": "g2",
      "haloKpc": 17,
      "age": 0.9,
      "color": "#a8b8c7"
    },
    {
      "id": "g3",
      "haloKpc": 19,
      "age": 0.85,
      "color": "#b8c7a8"
    },
    {
      "id": "g4",
      "haloKpc": 21,
      "age": 0.8,
      "color": "#c7bfa8"
    },
    {
      "id": "g5",
      "haloKpc": 16,
      "age": 0.95,
      "color": "#afafc7"
    }
  ],
  "novae": [
    {
      "id": "t1",
      "peak": 1,
      "color": "#f2c9d8"
    },
    {
      "id": "t2",
      "peak": 0.6,
      "color": "#c7d9b8"
    },
    {
      "id": "t3",
      "peak": 0.5,
      "color": "#b8c4d9"
    },
    {
      "id": "t4",
      "peak": 0.55,
      "color": "#d9cfb8"
    },
    {
      "id": "t5",
      "peak": 0.45,
      "color": "#d9b8b8"
    },
    {
      "id": "t6",
      "peak": 0.3,
      "color": "#c4b8d9"
    },
    {
      "id": "t7",
      "peak": 0.3,
      "color": "#b8d9d0"
    }
  ],
  "wormholes": [
    {
      "from": "s4",
      "to": "s5"
    },
    {
      "from": "g5",
      "to": "s4"
    },
    {
      "from": "s1",
      "to": "s6"
    },
    {
      "from": "s13",
      "to": "s12"
    }
  ]
};
