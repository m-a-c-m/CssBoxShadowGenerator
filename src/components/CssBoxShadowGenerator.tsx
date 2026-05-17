"use client";

import { useState, useCallback } from "react";
import { MdAdd, MdDelete, MdContentCopy, MdCheck } from "react-icons/md";

interface ShadowLayer {
  id: number;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

let nextId = 1;

function defaultLayer(): ShadowLayer {
  return { id: nextId++, offsetX: 4, offsetY: 4, blur: 10, spread: 0, color: "#000000", opacity: 40, inset: false };
}

function layerToCss(l: ShadowLayer): string {
  const hex = l.color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const alpha = (l.opacity / 100).toFixed(2);
  return `${l.inset ? "inset " : ""}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.spread}px rgba(${r},${g},${b},${alpha})`;
}

const PRESETS: { label: string; layers: Omit<ShadowLayer, "id">[] }[] = [
  { label: "Soft", layers: [{ offsetX: 0, offsetY: 4, blur: 20, spread: 0, color: "#000000", opacity: 25, inset: false }] },
  { label: "Hard", layers: [{ offsetX: 6, offsetY: 6, blur: 0, spread: 0, color: "#000000", opacity: 50, inset: false }] },
  { label: "Neon", layers: [{ offsetX: 0, offsetY: 0, blur: 20, spread: 4, color: "#a78bfa", opacity: 80, inset: false }, { offsetX: 0, offsetY: 0, blur: 40, spread: 8, color: "#a78bfa", opacity: 40, inset: false }] },
  { label: "Inset", layers: [{ offsetX: 0, offsetY: 2, blur: 6, spread: 0, color: "#000000", opacity: 30, inset: true }] },
  { label: "3D", layers: [{ offsetX: 2, offsetY: 2, blur: 0, spread: 0, color: "#000000", opacity: 60, inset: false }, { offsetX: -2, offsetY: -2, blur: 0, spread: 0, color: "#ffffff", opacity: 20, inset: false }] },
];

export default function CssBoxShadowGenerator() {
  const [layers, setLayers] = useState<ShadowLayer[]>([defaultLayer()]);
  const [bgColor, setBgColor] = useState("#1a1a2e");
  const [boxColor, setBoxColor] = useState("#a78bfa");
  const [copied, setCopied] = useState(false);

  const cssValue = layers.map(layerToCss).join(", ");

  const update = (id: number, field: keyof ShadowLayer, value: number | string | boolean) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const addLayer = () => {
    if (layers.length >= 6) return;
    setLayers((prev) => [...prev, defaultLayer()]);
  };

  const removeLayer = (id: number) => {
    if (layers.length === 1) return;
    setLayers((prev) => prev.filter((l) => l.id !== id));
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setLayers(preset.layers.map((l) => ({ ...l, id: nextId++ })));
  };

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(`box-shadow: ${cssValue};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [cssValue]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => applyPreset(p)}
            className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-primary/40 hover:text-primary">
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-6 flex items-center justify-center"
        style={{ backgroundColor: bgColor, minHeight: 180 }}>
        <div className="h-28 w-28 rounded-2xl transition-all duration-300"
          style={{ backgroundColor: boxColor, boxShadow: cssValue }} />
      </div>

      <div className="flex gap-4">
        <label className="flex flex-1 items-center gap-2 text-xs text-text-muted">
          Fondo
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
            className="h-7 w-10 cursor-pointer rounded border border-white/10 bg-transparent" />
        </label>
        <label className="flex flex-1 items-center gap-2 text-xs text-text-muted">
          Caja
          <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)}
            className="h-7 w-10 cursor-pointer rounded border border-white/10 bg-transparent" />
        </label>
      </div>

      <div className="space-y-3">
        {layers.map((layer, idx) => (
          <div key={layer.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted">
                Capa {idx + 1}
              </span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-text-muted">
                  <div onClick={() => update(layer.id, "inset", !layer.inset)}
                    className={`relative h-4 w-7 rounded-full transition-colors ${layer.inset ? "bg-primary" : "bg-white/20"}`}>
                    <div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${layer.inset ? "translate-x-3" : "translate-x-0.5"}`} />
                  </div>
                  inset
                </label>
                <button onClick={() => removeLayer(layer.id)} disabled={layers.length === 1}
                  className="rounded-lg p-1 text-text-muted transition-colors hover:text-red-400 disabled:opacity-30">
                  <MdDelete />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(["offsetX", "offsetY", "blur", "spread"] as const).map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-xs text-text-muted">
                    {field === "offsetX" ? "X" : field === "offsetY" ? "Y" : field === "blur" ? "Blur" : "Spread"} (px)
                  </label>
                  <input type="number" min={field === "blur" || field === "spread" ? 0 : -100} max={100}
                    value={layer[field]} onChange={(e) => update(layer.id, field, Number(e.target.value))}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 text-sm text-white focus:border-primary/50 focus:outline-none" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-text-muted">Color</label>
                <input type="color" value={layer.color} onChange={(e) => update(layer.id, "color", e.target.value)}
                  className="h-7 w-10 cursor-pointer rounded border border-white/10 bg-transparent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-text-muted">Opacidad</label>
                  <span className="text-xs text-primary">{layer.opacity}%</span>
                </div>
                <input type="range" min={0} max={100} value={layer.opacity}
                  onChange={(e) => update(layer.id, "opacity", Number(e.target.value))}
                  className="w-full accent-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {layers.length < 6 && (
        <button onClick={addLayer}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-2.5 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-primary">
          <MdAdd />
          Añadir capa
        </button>
      )}

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-text-muted">CSS</span>
          <button onClick={copy}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1 text-xs text-text-muted transition-colors hover:border-primary/40 hover:text-primary">
            {copied ? <MdCheck className="text-green-400" /> : <MdContentCopy />}
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <pre className="overflow-x-auto text-xs text-white">
          {`box-shadow: ${cssValue};`}
        </pre>
      </div>
    </div>
  );
}
