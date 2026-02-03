'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function SpotlightCard({
  children,
  className,
  glowColor = 'rgba(255, 255, 0, 0.15)',
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movements
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative group overflow-hidden bg-[#1A1A1A] rounded-2xl border border-white/[0.08]',
        className
      )}
    >
      {/* Dynamic Glow Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useTransform(
            [smoothMouseX, smoothMouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`
          ),
        }}
      />

      <div className="relative z-20">{children}</div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-30 bg-noise" />
    </div>
  );
}
