"use client";

import { useEffect, useState } from "react";

interface Cell {
  col: number;
  row: number;
  tx: number;
  ty: number;
  delay: number;
}

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function AnimatedGrid() {
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    const rng = lcg(0xc0ffee42);
    const cellSize = 64;
    const cols = Math.ceil(window.innerWidth / cellSize) + 1;
    const rows = Math.ceil(window.innerHeight / cellSize) + 1;

    const generated: Cell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        generated.push({
          col: c,
          row: r,
          tx: (rng() - 0.5) * 700,
          ty: (rng() - 0.5) * 700,
          delay: rng() * 0.9,
        });
      }
    }
    setCells(generated);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          className="agrid-cell"
          style={{
            left: cell.col * 64,
            top: cell.row * 64,
            "--tx": `${cell.tx}px`,
            "--ty": `${cell.ty}px`,
            "--delay": `${cell.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
