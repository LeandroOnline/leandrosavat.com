"use client";

import { useState } from "react";

interface Discipline {
  id: string;
  name: string;
  via: string;
  role: string;
  desc: string;
  icon: string;
  relation: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: "d1",
    name: "Ingeniería",
    via: "Vía · 01",
    role: "Construir lo que se piensa.",
    desc: "Desarrollo de sistemas a escala, arquitectura de software e infraestructura robusta que materializa las ideas.",
    icon: "◆",
    relation: "La técnica sin introspección es solo código; con ella, es arquitectura con propósito y significado."
  },
  {
    id: "d2",
    name: "Producto",
    via: "Vía · 02",
    role: "Decidir qué construir y cuándo.",
    desc: "Estrategia de producto, priorización de características y análisis de tracción para maximizar el valor de entrega.",
    icon: "◇",
    relation: "Decidir qué construir y cuándo requiere entender primero las motivaciones profundas del usuario."
  },
  {
    id: "d3",
    name: "Antropología",
    via: "Vía · 03",
    role: "Leer al ser humano detrás del trabajo.",
    desc: "Investigación cualitativa, dinámicas culturales y entendimiento profundo de la interacción humana en equipos.",
    icon: "○",
    relation: "Comprender la cultura y las relaciones humanas para habilitar la colaboración real en los equipos."
  },
  {
    id: "d4",
    name: "Neurociencia",
    via: "Vía · 04",
    role: "Mover organizaciones desde la decisión.",
    desc: "Modelos cognitivos de toma de decisiones, neuro-liderazgo y gestión humana del cambio organizacional.",
    icon: "●",
    relation: "Alinear las decisiones y los procesos de cambio con la biología cognitiva y el bienestar del equipo."
  },
];

export default function Constellation() {
  const [activeId, setActiveId] = useState<string>("d1");

  return (
    <div className="w-full py-6">
      {/* DESKTOP SPLIT-PANE DASHBOARD */}
      <div className="hidden md:grid grid-cols-12 gap-8 items-center min-h-[420px] max-w-4xl mx-auto relative z-10">
        
        {/* Left Side: Circular Orbit Selector */}
        <div className="col-span-5 flex justify-center items-center">
          <div className="relative w-80 h-80 flex items-center justify-center">
            
            {/* SVG Dynamic Glowing Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="line-glow-d1" x1="50%" y1="50%" x2="15%" y2="15%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="line-glow-d2" x1="50%" y1="50%" x2="85%" y2="15%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="line-glow-d3" x1="50%" y1="50%" x2="15%" y2="85%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="line-glow-d4" x1="50%" y1="50%" x2="85%" y2="85%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Draw 4 connection lines using percentage points that will NEVER shift */}
              <line
                x1="50%"
                y1="50%"
                x2="15%"
                y2="15%"
                stroke={activeId === "d1" ? "url(#line-glow-d1)" : "rgba(255, 255, 255, 0.05)"}
                strokeWidth={activeId === "d1" ? 2.5 : 1}
                strokeDasharray={activeId === "d1" ? "none" : "3 3"}
                className="transition-all duration-500"
              />
              <line
                x1="50%"
                y1="50%"
                x2="85%"
                y2="15%"
                stroke={activeId === "d2" ? "url(#line-glow-d2)" : "rgba(255, 255, 255, 0.05)"}
                strokeWidth={activeId === "d2" ? 2.5 : 1}
                strokeDasharray={activeId === "d2" ? "none" : "3 3"}
                className="transition-all duration-500"
              />
              <line
                x1="50%"
                y1="50%"
                x2="15%"
                y2="85%"
                stroke={activeId === "d3" ? "url(#line-glow-d3)" : "rgba(255, 255, 255, 0.05)"}
                strokeWidth={activeId === "d3" ? 2.5 : 1}
                strokeDasharray={activeId === "d3" ? "none" : "3 3"}
                className="transition-all duration-500"
              />
              <line
                x1="50%"
                y1="50%"
                x2="85%"
                y2="85%"
                stroke={activeId === "d4" ? "url(#line-glow-d4)" : "rgba(255, 255, 255, 0.05)"}
                strokeWidth={activeId === "d4" ? 2.5 : 1}
                strokeDasharray={activeId === "d4" ? "none" : "3 3"}
                className="transition-all duration-500"
              />
            </svg>

            {/* Orbit Tracks */}
            <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-zinc-900 pointer-events-none" />

            {/* Central Core: Autoconocimiento */}
            <div className="absolute z-10 w-28 h-28 rounded-full bg-zinc-950/80 border border-zinc-900/60 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.02)] relative group">
              <div className="absolute inset-2.5 rounded-full bg-radial from-[#10b981]/10 to-transparent pointer-events-none animate-pulse" />
              <span className="text-[8px] uppercase tracking-widest text-[#10b981] font-mono font-bold">Núcleo</span>
              <span className="text-[10px] font-semibold tracking-wider text-zinc-100 mt-0.5">Autoconocimiento</span>
            </div>

            {/* Orbiting Point 1 (Top Left) */}
            <button
              onClick={() => setActiveId("d1")}
              onMouseEnter={() => setActiveId("d1")}
              className={`absolute top-[5%] left-[5%] z-20 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 clickable ${
                activeId === "d1"
                  ? "border-[#10b981] bg-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-zinc-100 scale-110"
                  : "border-zinc-800 bg-zinc-950/80 hover:border-[#10b981]/50 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-sm font-semibold">◆</span>
              <span className="absolute -top-6 right-2 font-mono text-[9px] uppercase tracking-wider text-zinc-400 whitespace-nowrap">
                Ingeniería
              </span>
            </button>

            {/* Orbiting Point 2 (Top Right) */}
            <button
              onClick={() => setActiveId("d2")}
              onMouseEnter={() => setActiveId("d2")}
              className={`absolute top-[5%] right-[5%] z-20 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 clickable ${
                activeId === "d2"
                  ? "border-[#10b981] bg-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-zinc-100 scale-110"
                  : "border-zinc-800 bg-zinc-950/80 hover:border-[#10b981]/50 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-sm font-semibold">◇</span>
              <span className="absolute -top-6 left-2 font-mono text-[9px] uppercase tracking-wider text-zinc-400 whitespace-nowrap">
                Producto
              </span>
            </button>

            {/* Orbiting Point 3 (Bottom Left) */}
            <button
              onClick={() => setActiveId("d3")}
              onMouseEnter={() => setActiveId("d3")}
              className={`absolute bottom-[5%] left-[5%] z-20 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 clickable ${
                activeId === "d3"
                  ? "border-[#10b981] bg-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-zinc-100 scale-110"
                  : "border-zinc-800 bg-zinc-950/80 hover:border-[#10b981]/50 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-sm font-semibold">○</span>
              <span className="absolute -bottom-6 right-2 font-mono text-[9px] uppercase tracking-wider text-zinc-400 whitespace-nowrap">
                Antropología
              </span>
            </button>

            {/* Orbiting Point 4 (Bottom Right) */}
            <button
              onClick={() => setActiveId("d4")}
              onMouseEnter={() => setActiveId("d4")}
              className={`absolute bottom-[5%] right-[5%] z-20 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 clickable ${
                activeId === "d4"
                  ? "border-[#10b981] bg-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-zinc-100 scale-110"
                  : "border-zinc-800 bg-zinc-950/80 hover:border-[#10b981]/50 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-sm font-semibold">●</span>
              <span className="absolute -bottom-6 left-2 font-mono text-[9px] uppercase tracking-wider text-zinc-400 whitespace-nowrap">
                Neurociencia
              </span>
            </button>

          </div>
        </div>

        {/* Right Side: Active details dashboard pane */}
        <div className="col-span-7">
          {(() => {
            const activeDisc = DISCIPLINES.find((d) => d.id === activeId) || DISCIPLINES[0];
            return (
              <article className="glass-card p-8 rounded-xl border border-zinc-900/50 min-h-[300px] flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.7)] relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/[0.02] blur-xl rounded-full pointer-events-none" />

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/40 border border-zinc-900/60 py-1.5 px-4 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block animate-pulse" />
                      {activeDisc.via}
                    </span>
                    <span className="text-xl text-[#10b981]">{activeDisc.icon}</span>
                  </div>

                  <h3 className="text-zinc-100 text-3xl font-serif-poetic font-light italic tracking-wide mb-3">
                    {activeDisc.name}
                  </h3>

                  <p className="text-[#10b981] font-serif-poetic italic text-lg leading-relaxed mb-4">
                    {activeDisc.role}
                  </p>

                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                    {activeDisc.desc}
                  </p>
                </div>

                <div className="border-t border-zinc-900/60 pt-4 mt-6">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-1">
                    Conexión con el núcleo:
                  </span>
                  <p className="text-xs text-zinc-500 italic leading-relaxed">
                    {activeDisc.relation}
                  </p>
                </div>
              </article>
            );
          })()}
        </div>
      </div>

      {/* MOBILE DISPLAY (VERTICAL GRID) */}
      <div className="flex md:hidden flex-col gap-5">
        {/* Core display */}
        <div
          className="bg-zinc-950/60 border border-zinc-900/60 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-1 shadow-inner relative overflow-hidden"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#10b981]/[0.015] blur-xl rounded-full pointer-events-none" />
          <span className="text-[10px] uppercase tracking-widest text-[#10b981] font-mono font-bold">Núcleo del Sistema</span>
          <h3 className="text-lg font-semibold text-zinc-100 tracking-wide mt-1">Autoconocimiento</h3>
          <p className="text-xs text-zinc-500 max-w-xs mt-1.5 leading-relaxed">
            El eje central e introspectivo que unifica y da propósito a las cuatro vías formales.
          </p>
        </div>

        {/* Disciplines grid */}
        <div className="flex flex-col gap-4">
          {DISCIPLINES.map((disc) => (
            <article
              key={disc.id}
              className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 flex flex-col justify-between shadow-sm relative overflow-hidden"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
                    {disc.via}
                  </span>
                  <span className="text-base text-[#10b981]">{disc.icon}</span>
                </div>
                <h4 className="text-zinc-100 text-lg font-serif-poetic font-light italic mb-1.5">{disc.name}</h4>
                <p className="text-[#10b981] text-xs font-serif-poetic italic leading-relaxed mb-2">{disc.role}</p>
                <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                  {disc.desc}
                </p>
              </div>
              <p className="text-zinc-500 text-[10px] leading-relaxed border-t border-zinc-900/80 pt-3 mt-2 italic">
                {disc.relation}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
