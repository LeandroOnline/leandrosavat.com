"use client";

import { useEffect, useState } from "react";

interface BootLoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "system: initializing core module",
  "identity: loading studio configs v3.0.26",
  "philosophy: mounting introspective.so",
  "engine: establishing center of gravity",
  "modules: engineering, product, anthropology, neuro",
  "network: listening on 4 continents",
  "status: ready"
];

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random increments for a natural loading feel
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 80);

    // Logs sequence animation
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 250);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100 && logs.length === BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        const completeTimeout = setTimeout(() => {
          document.body.style.overflow = "";
          onComplete();
        }, 600); // match duration-500
        return () => clearTimeout(completeTimeout);
      }, 400); // pause for dramatic effect
      return () => clearTimeout(timeout);
    }
  }, [progress, logs, onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-[#080808] z-[9999] flex flex-col justify-between p-8 font-mono text-xs uppercase tracking-widest transition-opacity duration-500 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-zinc-600">
        <div>L. SAVAT — BIOS v3.0</div>
        <div>2026.05.19</div>
      </div>

      {/* Terminal log logs */}
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full text-left gap-2 text-zinc-500">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-4">
            <span className="text-[#10b981]">[ok]</span>
            <span>{log}</span>
          </div>
        ))}
        {progress < 100 && (
          <div className="flex gap-2 items-center text-zinc-400">
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>

      {/* Footer loading progress */}
      <div className="flex justify-between items-end border-t border-zinc-900 pt-6">
        <div className="flex flex-col gap-2">
          <div className="text-zinc-600">Leandro Savat · cargando</div>
          <div className="h-1 bg-zinc-900 w-48 relative overflow-hidden rounded">
            <div
              className="h-full bg-[#10b981] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="text-3xl font-light text-zinc-300">
          <span className="text-[#10b981]">{String(progress).padStart(3, "0")}</span>
          <span className="text-zinc-600"> / 100</span>
        </div>
      </div>
    </div>
  );
}
