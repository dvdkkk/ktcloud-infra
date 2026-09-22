import React from 'react';
import { CONSULTATION_URL } from '../constants';

interface ApplyButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const ApplyButton: React.FC<ApplyButtonProps> = ({ className = "", children }) => {
  return (
    <a
      href={CONSULTATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95 ${className}`}
    >
      <span className="relative z-10">{children || "교육상담 신청하기"}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </a>
  );
};

