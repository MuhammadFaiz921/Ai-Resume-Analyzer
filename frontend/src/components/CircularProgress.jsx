import React, { useEffect, useState } from 'react';

export default function CircularProgress({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <div className="relative w-[140px] h-[140px] mx-auto">
      <svg height="140" width="140">
        {/* Background Circle */}
        <circle
          stroke="#e5e7eb" // Tailwind slate-200
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="70"
          cy="70"
        />

        {/* Progress Circle with gradient */}
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx="70"
          cy="70"
          style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />  {/* Indigo-500 */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue-500 */}
          </linearGradient>
        </defs>
      </svg>

      {/* Score Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-indigo-600 text-3xl font-bold drop-shadow-sm">
          {animatedScore}%
        </span>
      </div>
    </div>
  );
}
