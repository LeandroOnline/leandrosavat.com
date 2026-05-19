"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import BootLoader from "@/components/BootLoader";
import TextReveal from "@/components/TextReveal";
import Constellation from "@/components/Constellation";

interface PortraitCardProps {
  imageSrc: string;
  imageAlt: string;
  badgeValue: string;
  badgeLabel: string;
  coordinates: string;
}

function PortraitCard({ imageSrc, imageAlt, badgeValue, badgeLabel, coordinates }: PortraitCardProps) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const xc = box.width / 2;
    const yc = box.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;
    
    // Smooth 3D tilt angles (max 15 degrees)
    const rotateY = dx * 15;
    const rotateX = -dy * 15;
    
    setTiltStyle({
      transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`,
      ["--shine-x" as any]: `${(x / box.width) * 100}%`,
      ["--shine-y" as any]: `${(y / box.height) * 100}%`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "rotateY(0deg) rotateX(0deg) scale(1)",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    });
  };

  return (
    <div className="portrait-perspective w-full flex flex-col items-center md:items-end gap-4">
      <div 
        className="relative w-56 h-56 sm:w-64 sm:h-64 portrait-card bg-[#020202]/30 cursor-none flex items-center justify-center pointer-events-auto clickable"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
      >
        {/* Shine Overlay */}
        <div className="portrait-shine" />

        {/* Orbit Lines for technical/editorial look */}
        <div className="tech-orbit tech-orbit-outer" />
        <div className="tech-orbit tech-orbit-inner" />

        {/* Squircle clipping border and portrait */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-zinc-800/80 bg-zinc-950/20 shadow-[0_15px_45px_rgba(0,0,0,0.9)] p-2">
          <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 224px, 256px"
              className="object-cover transition-all duration-700 hover:scale-105"
            />
          </div>
          
          {/* Overlay badge inside squircle */}
          <div className="absolute bottom-4 right-4 bg-zinc-950/90 border border-zinc-800/60 text-zinc-200 py-1.5 px-3 rounded-full text-[10px] font-mono tracking-widest flex items-center gap-1.5 shadow-xl select-none">
            <span className="text-[#10b981] font-bold">{badgeValue}</span>
            <span className="text-zinc-500">{badgeLabel}</span>
          </div>

          {/* Minimal digital status overlay */}
          <div className="absolute top-4 left-4 bg-zinc-950/85 border border-zinc-800/60 text-[8px] font-mono tracking-widest px-2.5 py-1 rounded-md text-zinc-400 flex items-center gap-1.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
            <span>ESTUDIO</span>
          </div>
        </div>
      </div>
      
      {/* Coordinates */}
      <span className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase text-center w-full md:text-right select-none opacity-85">
        {coordinates}
      </span>
    </div>
  );
}

interface MetricCardProps {
  value: string;
  label: string;
}

function AnimatedMetricCard({ value, label }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const numericPart = parseInt(value.replace(/\D/g, ""), 10) || 0;
    const hasPlus = value.includes("+");
    const isTwoDigit = value.length === 2 && !isNaN(Number(value)) && value.startsWith("0");
    
    let observer: IntersectionObserver;
    let frameId: number;
    
    const countUp = () => {
      const duration = 1200; // ms
      const startTime = performance.now();
      
      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * numericPart);
        
        let formattedValue = String(currentValue);
        if (isTwoDigit) {
          formattedValue = String(currentValue).padStart(2, "0");
        }
        if (hasPlus) {
          formattedValue = `${formattedValue}+`;
        }
        
        setDisplayValue(formattedValue);
        
        if (progress < 1) {
          frameId = requestAnimationFrame(updateCount);
        }
      };
      
      frameId = requestAnimationFrame(updateCount);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <div 
      ref={cardRef} 
      className="metric-card text-center clickable"
    >
      <b className="text-xl text-zinc-100 font-mono block tracking-tight mb-1">{displayValue}</b>
      <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-medium select-none">{label}</span>
    </div>
  );
}



const SECTIONS = [
  { id: "00", label: "Identidad", elementId: "identidad" },
  { id: "01", label: "Tesis", elementId: "tesis" },
  { id: "02", label: "El sujeto", elementId: "sujeto" },
  { id: "03", label: "Sistema", elementId: "sistema" },
  { id: "04", label: "Archivo", elementId: "archivo" },
  { id: "05", label: "Atlas", elementId: "atlas" },
  { id: "06", label: "Obras", elementId: "obras" },
  { id: "07", label: "Manifiesto", elementId: "manifiesto" },
];

const BADGES = [
  {
    title: "Ingeniería de Sitios Web",
    issuer: "Tech U.",
    year: "2023",
    img: "/insignias/tech.png",
    cert: "/certificates/ingenieria-web.pdf",
    glow: "rgba(16, 185, 129, 0.25)",
    shadow: "rgba(16, 185, 129, 0.04)",
  },
  {
    title: "Neurociencia Aplicada",
    issuer: "UTN BA",
    year: "2024",
    img: "/insignias/utn.png",
    cert: "/certificates/neurociencia-organizaciones.pdf",
    glow: "rgba(5, 150, 105, 0.25)",
    shadow: "rgba(5, 150, 105, 0.04)",
  },
  {
    title: "Eneagrama Profesional · Nivel III",
    issuer: "Antropología",
    year: "2024",
    img: "/insignias/antropologia.png",
    cert: "/certificates/eneagrama-nivel-3.pdf",
    glow: "rgba(52, 211, 153, 0.25)",
    shadow: "rgba(52, 211, 153, 0.04)",
  },
  {
    title: "Product Manager Bootcamp",
    issuer: "ProductHub",
    year: "2024",
    img: "/insignias/manager.png",
    cert: "/certificates/product-manager.png",
    glow: "rgba(16, 185, 129, 0.25)",
    shadow: "rgba(16, 185, 129, 0.04)",
  },
  {
    title: "Product Analytics Essentials",
    issuer: "ProductHub",
    year: "2024",
    img: "/insignias/productAnalitics.png",
    cert: "/certificates/product-analytics.png",
    glow: "rgba(20, 184, 166, 0.25)",
    shadow: "rgba(20, 184, 166, 0.04)",
  },
  {
    title: "Gestión de Proyectos & Agile",
    issuer: "Santander Open Academy",
    year: "2025",
    img: "/insignias/santander.png",
    cert: "/certificates/gestion-proyectos-santander.pdf",
    glow: "rgba(13, 148, 136, 0.25)",
    shadow: "rgba(13, 148, 136, 0.04)",
  },
  {
    title: "Desarrollo Web Full-Stack",
    issuer: "LinkedIn Learning",
    year: "2023",
    img: "/insignias/linkedin.png",
    cert: "/certificates/desarrollador-web-fullstack.pdf",
    glow: "rgba(110, 231, 183, 0.25)",
    shadow: "rgba(110, 231, 183, 0.04)",
  },
  {
    title: "Análisis e Interpretación de Datos",
    issuer: "Fundación Carlos Slim",
    year: "2023",
    img: "/insignias/analisis.png",
    cert: "/certificates/analista-datos.png",
    glow: "rgba(4, 120, 87, 0.25)",
    shadow: "rgba(4, 120, 87, 0.04)",
  },
  {
    title: "Claude Code · Certified",
    issuer: "Anthropic",
    year: "2025",
    img: "/insignias/claude.png",
    cert: "/certificates/claude-code-certified.pdf",
    glow: "rgba(34, 197, 94, 0.35)",
    shadow: "rgba(34, 197, 94, 0.05)",
  },
];

const STATIONS = [
  {
    code: "US // BUE",
    geo: "Estados Unidos",
    title: "Líder de equipos de desarrollo",
    desc: "Dirección técnica de equipos para sistemas a escala. Decisiones de arquitectura, ritmo de entrega y cultura ágil.",
    role: "Liderazgo",
  },
  {
    code: "EU // AMS",
    geo: "Europa",
    title: "Consultor & guía",
    desc: "Acompañamiento estratégico a empresas europeas en diseño de producto, optimización de operación y dinámica interna.",
    role: "Consultoría",
  },
  {
    code: "LA // SFN",
    geo: "Latinoamérica",
    title: "Fundador de empresas familiares",
    desc: "Crear y escalar desde cero con las personas que más importan. Estrategia comercial y tecnológica sin perder el vínculo humano.",
    role: "Fundador",
  },
  {
    code: "GL // GLOBAL",
    geo: "Global",
    title: "Socio estratégico",
    desc: "Pensar al lado de empresarios líderes. Copiloto técnico y metodológico en la toma de decisiones de alto impacto.",
    role: "Partner",
  },
];

const OBRAS = [
  {
    url: "canalhumano.com",
    title: "Canal Humano",
    desc: "Espacio editorial donde la observación, la antropología y la introspección encuentran una superficie pública.",
    tag: "Editorial",
    status: "Vivo",
  },
  {
    url: "gestiondemievento.com",
    title: "Gestión de mi Evento",
    desc: "Plataforma operativa SaaS para organizadores de eventos: presupuestos, agenda y proveedores unificados.",
    tag: "SaaS",
    status: "Vivo",
  },
  {
    url: "emprendeagil.com",
    title: "Emprende Ágil",
    desc: "Programa de formación y comunidad donde converge ingeniería, estrategia y neurociencia para un emprendimiento humano.",
    tag: "Programa",
    status: "Vivo",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState("00");

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    // Intersection Observer to highlight active scene in sidenav
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // trigger when section occupies center of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sceneId = entry.target.getAttribute("data-scene");
          if (sceneId) {
            setActiveScene(sceneId);
          }
        }
      });
    }, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.elementId);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isLoading]);

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isLoading && <BootLoader onComplete={() => setIsLoading(false)} />}
      
      {/* Structural matrix grid, auroras, and nebulas */}
      <div className="grid-bg" />
      <div className="nebula-bg">
        <div className="nebula-1" />
        <div className="nebula-2" />
        <div className="aurora-flow" />
      </div>
      <div className="vignette" />

      {/* Custom Cursor System */}
      <CustomCursor />

      {/* Top progress indicator rail */}
      <div className="rail" style={{ width: `${scrollProgress}%` }} />

      {/* TOP NAVIGATION / BRAND UI */}
      <header
        className={`fixed top-0 left-0 w-full z-40 px-6 flex justify-between items-center transition-all duration-300 pointer-events-none ${
          scrollProgress > 0
            ? "py-4 bg-[#020202]/70 border-b border-zinc-900/40 shadow-lg"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
        style={{
          backdropFilter: scrollProgress > 0 ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrollProgress > 0 ? "blur(16px)" : "none",
        }}
      >
        <div className="flex items-center gap-3 pointer-events-auto cursor-pointer" onClick={() => scrollToSection("identidad")}>
          <div className="brand-dot" />
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
            L. Savat <span className="hidden sm:inline">· 2026</span>
          </span>
        </div>

        {/* Quotes Ticker Rail (Author's Voice) */}
        <div
          className="hidden md:flex items-center gap-4 bg-zinc-950/40 border border-zinc-900/40 rounded-full py-1.5 px-4 max-w-sm pointer-events-auto"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
          <div className="qrail-container text-[11px] font-mono tracking-wider text-zinc-400">
            <ul className="qrail-list flex flex-col transition-transform duration-500">
              <li className="h-6 flex items-center">Cada proyecto proyecta lo que eres.</li>
              <li className="h-6 flex items-center">Se trabaja por dentro para entregarlo por fuera.</li>
              <li className="h-6 flex items-center">Capacidad de elevar las emociones colectivas.</li>
              <li className="h-6 flex items-center">Salir del confort es hacer consciente lo inconsciente.</li>
              <li className="h-6 flex items-center">Sentir, pensar y hacer — en equilibrio.</li>
              <li className="h-6 flex items-center">Amar al prójimo es un acto de amor propio.</li>
            </ul>
          </div>
        </div>

        {/* Progress Display */}
        <div className="font-mono text-xs tracking-widest text-zinc-400">
          <span className="text-[#10b981] font-semibold">{String(scrollProgress).padStart(3, "0")}</span>
          <span className="text-zinc-600"> / 100</span>
        </div>
      </header>

      {/* SIDE NAVIGATION DOTS */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5" aria-label="Navegación lateral">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.elementId)}
            className="group relative flex items-center justify-end"
            aria-label={`Ir a la sección ${sec.label}`}
          >
            {/* Tooltip Label */}
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono text-[9px] uppercase tracking-widest bg-zinc-950/80 border border-zinc-900 py-1 px-2.5 rounded text-zinc-400 pointer-events-none">
              {sec.label}
            </span>
            {/* Navigation Dot */}
            <div
              className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                activeScene === sec.id
                  ? "bg-[#10b981] border-[#10b981] scale-125"
                  : "bg-transparent border-zinc-800 hover:border-zinc-400"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col">
        
        {/* ============================ SCENE 00 · IDENTIDAD (HERO) ============================ */}
        <section
          id="identidad"
          data-scene="00"
          className="scene-section pt-32 pb-16 min-h-screen flex flex-col justify-between"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto">
            {/* Left Header info - Poetic contrast */}
            <div className="md:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] flex items-center gap-2 animate-reveal-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                Estudio · 2026 · Edición 03
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-poetic font-light italic tracking-tight text-zinc-100 leading-none hero-glow-text">
                <span className="block animate-reveal-2">Leandro</span>
                <span className="text-zinc-400 font-sans font-bold uppercase tracking-widest text-3xl sm:text-5xl md:text-6xl block mt-4 animate-reveal-3">
                  Savat<span className="text-[#10b981]">.</span>
                </span>
              </h1>
            </div>

            {/* Right Portrait & Coordinates - Mysterious details */}
            <div className="md:col-span-5 w-full flex justify-center md:justify-end">
              <PortraitCard 
                imageSrc="/leandro-portrait.jpg" 
                imageAlt="Leandro Savat — Retrato" 
                badgeValue="40+" 
                badgeLabel="obras" 
                coordinates="[ Sujeto 001 · 31° 38' S, 60° 42' W ]" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-12">
            {/* Intro paragraph with serif integration & CTA */}
            <div className="md:col-span-8 space-y-8">
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light tracking-wide max-w-2xl">
                Soy un colaborador <span className="text-[#10b981] font-serif-poetic italic text-2xl font-normal">introspectivo</span>, observador y profundamente curioso.
                Acompaño a fundadores y equipos de alto rendimiento uniendo inteligencia emocional, estrategia y desarrollo de software —
                con calidez, mirada larga y el foco en construir soluciones con sentido.
              </p>

              {/* Call to Actions (Fitts's Law) */}
              <div className="flex flex-wrap gap-4 items-center pt-2">
                <button 
                  onClick={() => scrollToSection("obras")}
                  className="btn-primary clickable cursor-none group"
                  aria-label="Explorar obras"
                >
                  <span>Explorar Obras</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
                <button 
                  onClick={() => scrollToSection("tesis")}
                  className="btn-secondary clickable cursor-none"
                  aria-label="Ver Tesis"
                >
                  <span>Ver Tesis</span>
                  <span className="text-zinc-500 font-mono text-[10px]">↓</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Dashboard */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4 w-full metrics-panel">
              <AnimatedMetricCard value="40+" label="Proyectos" />
              <AnimatedMetricCard value="04" label="Continentes" />
              <AnimatedMetricCard value="04" label="Disciplinas" />
              <AnimatedMetricCard value="09" label="Certificaciones" />
            </div>
          </div>
        </section>

        {/* ============================ SCENE 01 · TESIS ============================ */}
        <section
          id="tesis"
          data-scene="01"
          className="scene-section py-24 text-center justify-center min-h-screen overflow-hidden"
        >
          <div className="max-w-3xl mx-auto space-y-8 relative">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/30 border border-zinc-900/40 py-1.5 px-4 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
              Tesis · <b>01</b> / 07
            </span>

            {/* Giant elegant quotes in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif-poetic italic text-[240px] text-zinc-900/10 pointer-events-none select-none z-0">
              “
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif-poetic font-light italic tracking-tight text-zinc-100 leading-tight relative z-10">
              Cada proyecto<br />
              <span className="text-[#10b981] font-sans font-bold not-italic tracking-widest uppercase text-2xl sm:text-4xl md:text-5xl block my-5">proyecta</span> lo que eres.
            </h2>

            <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest border-t border-zinc-900/40 pt-6 max-w-xs mx-auto relative z-10">
              Una premisa de trabajo · <b>L. Savat</b>
            </div>
          </div>
        </section>

        {/* ============================ SCENE 02 · EL SUJETO ============================ */}
        <section
          id="sujeto"
          data-scene="02"
          className="scene-section py-24 min-h-screen"
        >
          <div className="max-w-3xl mx-auto space-y-10">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/30 border border-zinc-900/40 py-1.5 px-4 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
              Acto · <b>02</b> · El sujeto
            </span>

            <div className="space-y-6 text-zinc-300 text-base md:text-lg leading-relaxed font-light tracking-wide">
              <TextReveal
                text="Inteligencia emocional aplicada a la ingeniería y al producto."
                className="text-2xl md:text-3xl font-serif-poetic font-light italic text-zinc-100"
              />

              <div className="border-l border-[#10b981]/60 pl-6 font-serif-poetic italic text-zinc-400 py-1">
                La empatía y la autogestión como bases del desarrollo.
              </div>

              <TextReveal text="Mi trabajo parte del autoconocimiento y la escucha activa. Combinar la precisión técnica con la inteligencia emocional me permite entender las motivaciones del usuario, alinear los objetivos del equipo y evitar la fricción operativa. No se trata solo de escribir código, sino de gestionar el factor humano para evitar desperdiciar meses de desarrollo en soluciones sin sentido." />

              <TextReveal text="Acompaño a equipos y fundadores aportando autorregulación y empatía en la toma de decisiones complejas. El código es la herramienta, pero el éxito de un producto depende de la salud de las interacciones y del entendimiento profundo del problema humano que buscamos resolver." />

              <div className="border-l border-[#10b981]/60 pl-6 font-serif-poetic italic text-zinc-400 py-1">
                El equilibrio entre la lógica del software y la dinámica emocional.
              </div>

              <TextReveal text="Leo la dinámica humana detrás del producto digital y facilito la alianción del equipo. El equilibrio entre la lógica de ingeniería y el desarrollo de habilidades emocionales es mi centro de gravedad." />
            </div>
          </div>
        </section>

        {/* ============================ SCENE 03 · SISTEMA OPERATIVO ============================ */}
        <section
          id="sistema"
          data-scene="03"
          className="scene-section py-24 min-h-screen justify-center"
        >
          <div className="space-y-12">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/30 border border-zinc-900/40 py-1.5 px-4 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
              Acto · <b>03</b> · Sistema operativo
            </span>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif-poetic font-light italic text-zinc-100 leading-tight">
                Cuatro vías formales, un <span className="text-[#10b981]">centro</span> de gravedad.
              </h2>
              <p className="text-zinc-500 text-sm max-w-xl">
                El autoconocimiento como núcleo que sostiene y equilibra cuatro disciplinas en órbita constante.
              </p>
            </div>

            {/* Constellation interactive diagram */}
            <Constellation />
          </div>
        </section>

        {/* ============================ SCENE 04 · ARCHIVO FORMAL (LARGE BADGES) ============================ */}
        <section
          id="archivo"
          data-scene="04"
          className="scene-section py-24 min-h-screen justify-center"
        >
          <div className="space-y-12">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/30 border border-zinc-900/40 py-1.5 px-4 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
              Acto · <b>04</b> · Archivo formal
            </span>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-poetic font-light italic text-zinc-100">
                Credenciales de <span className="text-[#10b981] font-sans font-bold not-italic">alto valor</span>.
              </h2>
              <p className="text-zinc-400 text-sm max-w-2xl font-light">
                Haz clic en cualquiera de las insignias para abrir su correspondiente certificado verificado.
              </p>
            </div>

            {/* Badges Grid - Showcased like actual medals in a showcase */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {BADGES.map((badge, idx) => (
                <a
                  key={idx}
                  href={badge.cert}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-card aspect-square flex items-center justify-center p-4 sm:p-8 group cursor-pointer"
                  style={{
                    "--badge-glow": badge.glow,
                    "--badge-shadow": badge.shadow,
                  } as React.CSSProperties}
                  title={`${badge.title} — ${badge.issuer}`}
                >
                  {/* Large, beautiful floating insignia */}
                  <div className="relative w-full h-full flex items-center justify-center transition-all duration-700 ease-out group-hover:scale-110">
                    <Image
                      src={badge.img}
                      alt={badge.title}
                      fill
                      sizes="(max-width: 768px) 180px, 180px"
                      className="object-contain transition-all duration-700 brightness-100 group-hover:brightness-110"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ SCENE 05 · ATLAS DE TRABAJO ============================ */}
        <section
          id="atlas"
          data-scene="05"
          className="scene-section py-24 min-h-screen justify-center"
        >
          <div className="space-y-12">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/30 border border-zinc-900/40 py-1.5 px-4 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
              Acto · <b>05</b> · Atlas de trabajo
            </span>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif-poetic font-light italic text-zinc-100">
                Cuatro continentes, <span className="font-sans font-bold not-italic block sm:inline">una misma forma de aportar.</span>
              </h2>
              <p className="text-zinc-500 text-sm max-w-xl">
                En cada geografía, el método de valor fue el mismo: entender primero, estructurar después.
              </p>
            </div>

            {/* Stations flight layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STATIONS.map((st, idx) => (
                <article
                  key={idx}
                  className="glass-card p-6 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-[#10b981] uppercase tracking-widest bg-[#10b981]/5 px-2.5 py-1 rounded">
                        {st.geo}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        {st.code}
                      </span>
                    </div>
                    <h3 className="text-zinc-100 text-sm font-semibold tracking-wide">
                      {st.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {st.desc}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-zinc-900/30">
                    <span className="text-[10px] uppercase font-mono text-zinc-600 tracking-wider">Rol formal</span>
                    <b className="text-zinc-300 text-xs font-medium font-mono">{st.role}</b>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ SCENE 06 · OBRAS VIVAS ============================ */}
        <section
          id="obras"
          data-scene="06"
          className="scene-section py-24 min-h-screen justify-between"
        >
          <div className="space-y-12 my-auto">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/30 border border-zinc-900/40 py-1.5 px-4 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
              Acto · <b>06</b> · Obras vivas
            </span>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif-poetic font-light italic text-zinc-100">
                <span className="text-[#10b981] font-sans font-bold not-italic text-4xl block sm:inline mr-2">40+</span> obras —
                tres para empezar el <span className="font-sans font-bold not-italic block sm:inline">diálogo.</span>
              </h2>
              <p className="text-zinc-500 text-sm max-w-xl font-mono">
                <b>2014 — presente</b> · Productos y proyectos activos, sostenidos por equipos reales.
              </p>
            </div>

            {/* Obras Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OBRAS.map((ob, idx) => (
                <a
                  key={idx}
                  href={`https://${ob.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 flex flex-col justify-between h-64 group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-zinc-500 tracking-wider group-hover:text-zinc-300 transition-colors">{ob.url}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Estado: activo" />
                    </div>
                    <h3 className="text-zinc-100 text-lg font-bold tracking-tight group-hover:text-[#10b981] transition-colors">
                      {ob.title}<span className="text-[#10b981]">.</span>
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {ob.desc}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-zinc-900/30 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    <span>{ob.tag}</span>
                    <b className="text-zinc-300 font-bold">{ob.status}</b>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Scrolling Marquee text */}
          <div className="ticker-wrap mt-16">
            <div className="ticker-track font-mono text-xs uppercase tracking-widest text-zinc-500 gap-16">
              <span>
                Sistemas a medida <i className="text-[#10b981] mx-2">◆</i> Estrategia de producto <i className="text-[#10b981] mx-2">◆</i>
                Investigación aplicada <i className="text-[#10b981] mx-2">◆</i> Mentoría a fundadores <i className="text-[#10b981] mx-2">◆</i>
                Plataformas SaaS <i className="text-[#10b981] mx-2">◆</i> Comunidades digitales <i className="text-[#10b981] mx-2">◆</i>
                Programas de formación <i className="text-[#10b981] mx-2">◆</i> Rediseños de cultura <i className="text-[#10b981] mx-2">◆</i>
                Diagnósticos organizacionales <i className="text-[#10b981] mx-2">◆</i>
              </span>
              <span>
                Sistemas a medida <i className="text-[#10b981] mx-2">◆</i> Estrategia de producto <i className="text-[#10b981] mx-2">◆</i>
                Investigación aplicada <i className="text-[#10b981] mx-2">◆</i> Mentoría a fundadores <i className="text-[#10b981] mx-2">◆</i>
                Plataformas SaaS <i className="text-[#10b981] mx-2">◆</i> Comunidades digitales <i className="text-[#10b981] mx-2">◆</i>
                Programas de formación <i className="text-[#10b981] mx-2">◆</i> Rediseños de cultura <i className="text-[#10b981] mx-2">◆</i>
                Diagnósticos organizacionales <i className="text-[#10b981] mx-2">◆</i>
              </span>
            </div>
          </div>
        </section>

        {/* ============================ SCENE 07 · MANIFIESTO (CIERRE) ============================ */}
        <section
          id="manifiesto"
          data-scene="07"
          className="scene-section py-24 min-h-screen text-center justify-between overflow-hidden"
        >
          {/* Background glowing orb center */}
          <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="my-auto space-y-12 relative z-10">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/30 border border-zinc-900/40 py-1.5 px-4 rounded-full">
              Cierre · 07
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-poetic font-light italic tracking-tight text-zinc-100 leading-tight max-w-4xl mx-auto">
              Amar al prójimo es un acto<br />
              de <span className="text-[#10b981] font-sans font-bold not-italic tracking-wider uppercase text-2xl sm:text-3xl md:text-4xl block my-3">amor propio</span>.<br />
              Quien libera, <span className="italic font-light text-zinc-400">se libera.</span>
            </h2>

            {/* Signature */}
            <div className="flex items-center justify-center gap-6 text-zinc-400 font-mono text-[11px] uppercase tracking-widest py-4">
              <span className="w-12 h-px bg-zinc-900/40" />
              <span><b>Leandro Savat</b> · 2026</span>
              <span className="w-12 h-px bg-zinc-900/40" />
            </div>

            {/* Direct links */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              {OBRAS.map((ob, idx) => (
                <a
                  key={idx}
                  href={`https://${ob.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#10b981] hover:text-white border border-zinc-900/40 bg-zinc-950/10 rounded-full px-5 py-2 hover:border-[#10b981]/50 transition-colors clickable cursor-none"
                >
                  {ob.url}
                </a>
              ))}
              <a
                href="mailto:leandrosavat@gmail.com"
                className="font-mono text-xs text-white hover:text-[#10b981] border border-[#10b981]/40 bg-[#10b981]/5 rounded-full px-5 py-2 hover:border-[#10b981]/80 transition-all shadow-[0_0_15px_rgba(16,185,129,0.05)] clickable cursor-none"
              >
                leandrosavat@gmail.com
              </a>
            </div>
          </div>

          {/* Footer branding */}
          <footer className="flex justify-between items-center border-t border-zinc-900/40 pt-8 text-[10px] font-mono uppercase tracking-widest text-zinc-600 relative z-10 w-full">
            <span>Edición 03 · 2026</span>
            <span>Hecho por dentro · entregado por fuera</span>
          </footer>
        </section>

      </main>
    </>
  );
}
