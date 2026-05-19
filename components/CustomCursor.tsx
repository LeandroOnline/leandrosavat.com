"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    const timer = setTimeout(() => {
      if (!isTouchDevice()) {
        setIsHidden(false);
      }
    }, 0);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track hover states for links and interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable") ||
        target.closest(".clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Trail physics
  useEffect(() => {
    let animationFrameId: number;
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Adjust speed parameter (0.15 represents lag stiffness)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (isHidden) return null;

  return (
    <div className={isHovered ? "cursor-hover" : ""}>
      <div
        className="cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        ref={cursorRef}
        className="cursor-d"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
      />
    </div>
  );
}
