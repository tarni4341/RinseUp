import React from 'react';

/**
 * Subtle floating bubble decorative elements for clean laundry aesthetics.
 * Kept restrained to avoid interfering with interaction.
 */
export default function FloatingBubbles() {
  const bubbles = [
    { size: 140, top: '8%', left: '4%', delay: '0s', duration: '18s', opacity: 0.35 },
    { size: 90, top: '22%', right: '6%', delay: '2s', duration: '14s', opacity: 0.25 },
    { size: 60, top: '45%', left: '8%', delay: '4s', duration: '16s', opacity: 0.3 },
    { size: 110, top: '65%', right: '10%', delay: '1s', duration: '20s', opacity: 0.2 },
    { size: 75, top: '82%', left: '15%', delay: '3s', duration: '15s', opacity: 0.28 },
    { size: 50, top: '35%', right: '28%', delay: '5s', duration: '12s', opacity: 0.22 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Gentle background color washes */}
      <div className="absolute -top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-3xl" />
      <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-[10%] left-[10%] w-[550px] h-[550px] rounded-full bg-indigo-100/40 blur-3xl" />

      {/* Floating iridescent bubble elements */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/60 bubble-float"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(199,210,254,0.3) 50%, rgba(167,139,250,0.15) 100%)',
            boxShadow: 'inset -4px -4px 10px rgba(129, 140, 248, 0.15), 0 8px 24px rgba(99, 102, 241, 0.08)',
            animationDelay: b.delay,
            animationDuration: b.duration,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}

