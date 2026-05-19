"use client";

import { useState } from "react";

export default function IntrospectionMirror() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-900/60 bg-zinc-950/60 flex items-center justify-center cursor-none clickable transition-all duration-500 hover:border-[#10b981]/40 shadow-inner group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-[#10b981]/5 via-transparent to-purple-500/5 transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-40"
        }`}
      />

      {/* SVG Introspection Mirror */}
      <svg
        viewBox="0 0 200 200"
        className="w-4/5 h-4/5 relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
      >
        <defs>
          <radialGradient id="mirror-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#080808" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Outer orbital path */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="0.75"
          strokeDasharray="4 8"
          className={`transition-all duration-[6000ms] origin-center ${
            isHovered ? "animate-[spin_10s_linear_infinite]" : "animate-[spin_25s_linear_infinite]"
          }`}
        />

        {/* Mid orbital path (counter-rotating) */}
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="1"
          strokeDasharray="10 6"
          className={`transition-all duration-[4000ms] origin-center ${
            isHovered ? "animate-[spin_6s_linear_infinite_reverse]" : "animate-[spin_15s_linear_infinite_reverse]"
          }`}
        />

        {/* Inner solid thin ring */}
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="0.5"
        />

        {/* Constellation Nodes */}
        <g className={`transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}>
          {/* Top Node */}
          <circle cx="100" cy="20" r="3" fill="#10b981" className="animate-pulse" />
          {/* Right Node */}
          <circle cx="160" cy="100" r="2.5" fill="#8b5cf6" />
          {/* Bottom Node */}
          <circle cx="100" cy="180" r="3" fill="#10b981" className="animate-pulse" />
          {/* Left Node */}
          <circle cx="40" cy="100" r="2.5" fill="#8b5cf6" />
        </g>

        {/* Pulse Waves radiating from core */}
        <circle
          cx="100"
          cy="100"
          r="25"
          fill="none"
          stroke="#10b981"
          strokeWidth="0.5"
          className={`origin-center ${
            isHovered 
              ? "animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" 
              : "animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
          }`}
          style={{ opacity: 0.15 }}
        />

        {/* Pulsing Core representing Self-Knowledge */}
        <circle
          cx="100"
          cy="100"
          r="20"
          fill="url(#mirror-core)"
          className={`origin-center transition-all duration-700 ${
            isHovered ? "scale-125" : "scale-100 animate-pulse"
          }`}
        />
        
        {/* Core center dot */}
        <circle
          cx="100"
          cy="100"
          r="2"
          fill="#f4f4f5"
          className="animate-ping"
        />
      </svg>

      {/* Floating subtitle */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-serif-poetic italic text-xs tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
        Introspección activa
      </div>
    </div>
  );
}
