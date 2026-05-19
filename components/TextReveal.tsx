"use client";

import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number; // delay between words in ms
}

export default function TextReveal({ text, className = "", staggerDelay = 35 }: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger staggered reveal
            words.forEach((_, index) => {
              setTimeout(() => {
                setRevealedIndices((prev) => {
                  const next = new Set(prev);
                  next.add(index);
                  return next;
                });
              }, index * staggerDelay);
            });
            // Stop observing once triggered
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        threshold: 0.15, // trigger when 15% visible
        rootMargin: "0px 0px -50px 0px", // offset to trigger slightly before/after screen edge
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [words, staggerDelay]);

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`word-span ${revealedIndices.has(index) ? "revealed" : ""}`}
          style={{
            marginRight: "0.35em",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
