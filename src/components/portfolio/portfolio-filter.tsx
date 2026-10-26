"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects, projectFilters } from "@/data/projects";
import type { ProjectFilter } from "@/types/content";
import { ProjectCard } from "./project-card";
export function PortfolioFilter() {
  const [selected, setSelected] = useState<ProjectFilter>("All Projects");
  const reduced = useReducedMotion();
  const filtered = projects.filter(p => selected === "All Projects" || p.filter === selected);
  return <><div className="portfolio-toolbar"><div className="filter-list" aria-label="Filter projects">{projectFilters.map(filter => <button key={filter} aria-pressed={selected === filter} onClick={() => setSelected(filter)}>{filter}{filter === "All Projects" && <span>10</span>}</button>)}</div><span className="result-count" role="status">{filtered.length} projects</span></div><div className="project-grid"><AnimatePresence mode="popLayout">{filtered.map(project => <motion.div layout={!reduced} key={project.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }}><ProjectCard project={project} /></motion.div>)}</AnimatePresence></div></>;
}
