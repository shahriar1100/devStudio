"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="not-found"><span className="eyebrow">A small interruption</span><h1>Let’s try that again.</h1><p>Something prevented this page from loading. Please try again or return to the home page.</p><div className="hero-buttons"><button className="button button-primary" onClick={reset}>Try again</button><Link href="/" className="button button-secondary">Back to home</Link></div></div>; }
