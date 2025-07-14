import React from "react";

// The logo consists of a gradient square with a white house outline and the word 'Stayll' in dark gray
export const Logo: React.FC<{ size?: number; showText?: boolean }> = ({ size = 48, showText = true }) => (
  <div className="flex items-center gap-3 select-none">
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: "linear-gradient(135deg, #61A6FA 0%, #4BD88A 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size/2} height={size/2} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12L12 6l9 6" />
        <path d="M5 12v6h14v-6" />
        <rect x="10" y="14" width="4" height="4" rx="1" fill="none" />
      </svg>
    </span>
    {showText && (
      <span className="font-bold text-[30px] text-[#0F172A] tracking-wide" style={{lineHeight: 1}}>
        Stayll
      </span>
    )}
  </div>
);

export default Logo; 