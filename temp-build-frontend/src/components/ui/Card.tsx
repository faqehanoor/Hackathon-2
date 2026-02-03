'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover
    ? {
        whileHover: { scale: 1.01, y: -4, boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)' },
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
      }
    : {};

  return (
    <Component
      className={cn(
        'bg-white/[0.03] border border-white/[0.08] premium-blur rounded-2xl p-6 shadow-premium-glass inner-glow transition-all',
        hover && 'cursor-pointer hover:bg-white/[0.05] hover:border-white/[0.12]',
        className
      )}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn('text-lg font-semibold text-text-primary', className)}>{children}</h3>;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={cn('text-sm text-text-secondary', className)}>{children}</p>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn('mt-4 flex items-center gap-2', className)}>{children}</div>;
}
