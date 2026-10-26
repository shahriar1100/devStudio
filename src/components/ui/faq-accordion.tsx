"use client";
import { useId, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs } from "@/data/faq";
export function FAQAccordion() {
  const [active, setActive] = useState<number | null>(0);
  const id = useId();
  const reduced = useReducedMotion();
  return <div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item ${active === index ? "is-open" : ""}`} key={faq.question}><h3><button id={`${id}-button-${index}`} aria-expanded={active === index} aria-controls={`${id}-panel-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="faq-number">{String(index + 1).padStart(2, "0")}</span>{faq.question}{active === index ? <Minus size={19} /> : <Plus size={19} />}</button></h3><div id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-button-${index}`}><AnimatePresence initial={false}>{active === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }} className="faq-answer"><p>{faq.answer}</p></motion.div>}</AnimatePresence></div></div>)}</div>;
}
