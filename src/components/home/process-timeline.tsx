"use client";
import { useEffect, useRef } from "react";
import { processSteps } from "@/data/process";
export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    let nearby = false;
    let pending = false;
    let generation = 0;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const init = async () => {
      if (disposed || !nearby || media.matches || pending || cleanup) return;
      pending = true;
      const currentGeneration = generation;
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (disposed || currentGeneration !== generation || media.matches || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".process-step").forEach(step => {
            ScrollTrigger.create({ trigger: step, start: "top 75%", end: "bottom 25%", toggleClass: "step-active" });
          });
        }, ref);
        cleanup = () => ctx.revert();
      } catch {
        // Optional motion must never block the readable, static timeline.
      } finally {
        if (currentGeneration === generation) pending = false;
      }
    };
    // Fetch the animation libraries only when this below-the-fold section is approached.
    const observer = typeof IntersectionObserver === "undefined" ? undefined : new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        nearby = true;
        observer?.disconnect();
        void init();
      }
    }, { rootMargin: "300px" });
    if (ref.current) observer?.observe(ref.current);
    const onChange = () => {
      generation++;
      pending = false;
      cleanup?.();
      cleanup = undefined;
      if (!media.matches) void init();
    };
    media.addEventListener("change", onChange);
    return () => { disposed = true; generation++; observer?.disconnect(); cleanup?.(); media.removeEventListener("change", onChange); };
  }, []);
  return <div className="process-grid" ref={ref}>{processSteps.map((step, index) => <article key={step.title} className="process-step"><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>;
}
