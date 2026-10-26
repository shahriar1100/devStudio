"use client";
import { useState } from "react";
import { Monitor, Tablet, Smartphone, LockKeyhole } from "lucide-react";
import { SiteImage } from "./site-image";
import { siteImages } from "@/data/images";
const devices = [{ name: "Desktop", icon: Monitor, width: "100%" }, { name: "Tablet", icon: Tablet, width: "68%" }, { name: "Mobile", icon: Smartphone, width: "35%" }];
export function DevicePreview({ src = siteImages.hero, alt = "A bright creative workspace — stock photography used to demonstrate responsive framing" }: { src?: string; alt?: string }) {
  const [device, setDevice] = useState(devices[0]);
  return <div className="device-showcase"><div className="device-controls" aria-label="Preview device size">{devices.map(item => <button key={item.name} aria-pressed={device.name === item.name} onClick={() => setDevice(item)}><item.icon size={18} /><span>{item.name}</span></button>)}</div><div className="device-stage"><div className={`device-frame device-${device.name.toLowerCase()}`} style={{ width: device.width }}><div className="browser-bar"><div className="browser-dots"><i /><i /><i /></div><span><LockKeyhole size={10} /> Responsive design preview</span><span /></div><SiteImage src={src} alt={alt} sizes="(max-width: 768px) 90vw, 800px" /></div></div><p className="preview-note">One thoughtful experience, adapted to every screen.<br /><span>Stock image placeholder · controls demonstrate frame sizes, not a live website.</span></p></div>;
}
