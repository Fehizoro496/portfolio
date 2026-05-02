"use client";

import * as React from "react";
import type { CardStyle, PaletteName } from "@/lib/palettes";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  paletteLabel: string;
  cardsLabel: string;
  paletteOptions: readonly PaletteName[];
  cardOptions: readonly CardStyle[];
  palette: PaletteName;
  cardStyle: CardStyle;
  onPalette: (p: PaletteName) => void;
  onCard: (c: CardStyle) => void;
}

export function TweaksPanel(props: Props) {
  if (!props.open) return null;
  return (
    <>
      <style>{TWEAK_CSS}</style>
      <div className="twk-panel" role="dialog" aria-label={props.title}>
        <div className="twk-hd">
          <b>{props.title}</b>
          <button className="twk-x" onClick={props.onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="twk-body">
          <div className="twk-sect">{props.paletteLabel}</div>
          <select
            className="twk-field"
            value={props.palette}
            onChange={(e) => props.onPalette(e.target.value as PaletteName)}
          >
            {props.paletteOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <div className="twk-sect">{props.cardsLabel}</div>
          <div className="twk-seg" role="radiogroup">
            <div
              className="twk-seg-thumb"
              style={{
                left: `calc(2px + ${props.cardOptions.indexOf(props.cardStyle)} * (100% - 4px) / ${props.cardOptions.length})`,
                width: `calc((100% - 4px) / ${props.cardOptions.length})`,
              }}
            />
            {props.cardOptions.map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={c === props.cardStyle}
                onClick={() => props.onCard(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

interface ToggleProps {
  onClick: () => void;
}
export function TweaksToggle({ onClick }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open tweaks"
      className="tweaks-fab"
    >
      <style>{FAB_CSS}</style>
      <span aria-hidden>🎨</span>
    </button>
  );
}

const FAB_CSS = `
  .tweaks-fab{position:fixed;right:16px;bottom:16px;z-index:60;width:44px;height:44px;
    border-radius:999px;display:inline-flex;align-items:center;justify-content:center;
    background:var(--bg-2);border:1px solid var(--border-2);box-shadow:var(--shadow-md);
    font-size:20px;cursor:pointer;transition:transform 220ms ease}
  .tweaks-fab:hover{transform:translateY(-2px)}
`;

const TWEAK_CSS = `
  .twk-panel{position:fixed;right:16px;bottom:72px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 96px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.92);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:pointer;font-size:13px}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;min-height:0}
  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}
  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  select.twk-field{padding-right:22px}
  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06)}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:pointer;padding:4px 6px;line-height:1.2}
`;
