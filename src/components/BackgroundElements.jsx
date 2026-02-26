import React from 'react';

/**
 * BackgroundElements — GPU-optimized version
 * Uses pure CSS animations instead of Framer Motion to avoid JS-driven repaints.
 * Reduced from 7+ animated blobs to 3, smaller blur radii, and will-change hints.
 */
export default function BackgroundElements() {
  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(60px, 15px, 0); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-50px, -20px, 0); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(40px, 25px, 0); }
        }
        .bg-blob {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Cloud 1 — top left */}
        <div
          className="bg-blob absolute top-20 left-10 w-[350px] h-44 bg-gradient-to-r from-blue-400/50 to-blue-500/40 rounded-full blur-[80px]"
          style={{ animation: 'float1 25s ease-in-out infinite' }}
        />
        {/* Cloud 2 — top right */}
        <div
          className="bg-blob absolute top-1/4 right-10 w-[400px] h-52 bg-gradient-to-l from-blue-500/40 to-blue-400/30 rounded-full blur-[90px]"
          style={{ animation: 'float2 30s ease-in-out infinite' }}
        />
        {/* Cloud 3 — mid left */}
        <div
          className="bg-blob absolute top-1/2 left-1/4 w-[300px] h-40 bg-blue-400/45 rounded-full blur-[80px]"
          style={{ animation: 'float3 35s ease-in-out infinite' }}
        />

        {/* Bridge silhouette — static SVG, no animation needed */}
        <svg className="absolute bottom-0 left-0 w-full h-60 opacity-30" viewBox="0 0 1200 280" preserveAspectRatio="none">
          <path d="M0,160 Q300,50 600,160 T1200,160 L1200,280 L0,280 Z" fill="url(#bridgeGrad)" />
          <defs>
            <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path d="M0,170 Q300,60 600,170 T1200,170" stroke="#1F2937" strokeWidth="4" fill="none" opacity="0.5" />
          <path d="M0,180 Q300,70 600,180 T1200,180" stroke="#374151" strokeWidth="3" fill="none" opacity="0.4" />
          {/* Pillars */}
          <rect x="270" y="160" width="50" height="120" fill="#1F2937" opacity="0.5" rx="4" />
          <rect x="570" y="160" width="50" height="120" fill="#1F2937" opacity="0.5" rx="4" />
          <rect x="870" y="160" width="50" height="120" fill="#1F2937" opacity="0.5" rx="4" />
        </svg>
      </div>
    </>
  );
}
