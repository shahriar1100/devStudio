"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
export function AnimatedSection({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { opacity: [0.65, 1], y: [20, 0] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
