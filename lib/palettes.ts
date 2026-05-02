export type PaletteName = "Indigo / Violet" | "Teal / Cyan" | "Amber / Rose" | "Slate / Mint";
export type CardStyle = "Glass" | "Minimal" | "Bordered" | "Tilted";

export interface Palette {
  primary: string;
  primary2: string;
  accent: string;
  glow: string;
  grad: string;
}

export const PALETTES: Record<PaletteName, Palette> = {
  "Indigo / Violet": {
    primary: "#6366f1",
    primary2: "#8b5cf6",
    accent: "#f59e0b",
    glow: "99,102,241",
    grad: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
  },
  "Teal / Cyan": {
    primary: "#0d9488",
    primary2: "#06b6d4",
    accent: "#f97316",
    glow: "13,148,136",
    grad: "linear-gradient(135deg, #0d9488 0%, #06b6d4 50%, #38bdf8 100%)",
  },
  "Amber / Rose": {
    primary: "#f59e0b",
    primary2: "#f43f5e",
    accent: "#8b5cf6",
    glow: "245,158,11",
    grad: "linear-gradient(135deg, #f59e0b 0%, #fb7185 50%, #f43f5e 100%)",
  },
  "Slate / Mint": {
    primary: "#475569",
    primary2: "#10b981",
    accent: "#6366f1",
    glow: "16,185,129",
    grad: "linear-gradient(135deg, #475569 0%, #10b981 50%, #34d399 100%)",
  },
};
