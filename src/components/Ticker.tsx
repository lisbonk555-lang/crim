import React from 'react';
import { useApp } from '../context/AppContext';
import { tickerNewsItems } from '../data/newsData';
import { Radio } from 'lucide-react';

export const Ticker: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#1C0633] text-white border-b border-purple-900/40 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Ticker Lead Tag */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white font-black text-[11px] sm:text-xs tracking-wider uppercase px-3 sm:px-4 py-2 flex items-center gap-1.5 shrink-0 z-10 shadow-md">
          <Radio className="w-3.5 h-3.5 animate-pulse text-amber-300" />
          <span>BREAKING</span>
        </div>

        {/* Marquee Content */}
        <div className="overflow-hidden py-1.5 whitespace-nowrap flex-1 relative">
          <div className="animate-marquee flex items-center gap-10 text-xs sm:text-sm font-medium text-stone-200">
            {tickerNewsItems.concat(tickerNewsItems).map((item, idx) => (
              <span
                key={idx}
                onClick={() => navigateTo('home')}
                className="hover:text-amber-300 transition-colors cursor-pointer inline-flex items-center gap-3"
              >
                <span>{item}</span>
                <span className="text-amber-500 font-bold" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
