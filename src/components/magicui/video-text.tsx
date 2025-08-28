"use client";

import { cn } from "@/lib/utils";

interface VideoTextProps {
  src: string;
  children: React.ReactNode;
  className?: string;
}

export const VideoText = ({ src, children, className }: VideoTextProps) => {
  const textContent = String(children).replace(/'/g, '&apos;');
  
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Single video element with text mask */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{
          WebkitMask: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='central' font-family='serif' font-size='120' font-weight='900' fill='white'>${textContent}</text></svg>")`,
          mask: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='central' font-family='serif' font-size='120' font-weight='900' fill='white'>${textContent}</text></svg>")`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      >
        <source src={src} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};