"use client";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

export function SiteImage({ src, alt, className = "", sizes = "(max-width: 479px) calc(100vw - 40px), (max-width: 767px) calc((100vw - 58px) / 2), (max-width: 1023px) calc((100vw - 88px) / 2), (max-width: 1200px) calc((100vw - 112px) / 3), (max-width: 1376px) calc((100vw - 144px) / 3), 411px", priority = false }: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <div className={`site-image ${className}`}>{failed ? <div className="image-fallback" role="img" aria-label={alt}><ImageOff size={28} aria-hidden="true" /><span>Preview unavailable</span></div> : <Image src={src} alt={alt} fill sizes={sizes} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} onError={() => setFailed(true)} />}</div>;
}
