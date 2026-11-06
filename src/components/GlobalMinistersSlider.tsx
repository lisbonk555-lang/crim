import React, { useRef } from 'react';
import { globalMinistersData } from '../data/globalMinistersData';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Users,
  Compass
} from 'lucide-react';

export const GlobalMinistersSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleOpenMinistry = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-amber-800 tracking-wider mb-1">
              <Users className="w-4 h-4 text-amber-700" />
              <span>Ecumenical Hall of Honor & Global Christian Fathers</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              TOP GLOBAL PASTORS, CLERGY, APOSTLES & EVANGELISTS
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Honoring anointed leaders across the global body of Christ. Click any leader or church to visit their ministry platform.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-stone-300 hover:border-[#581C87] hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
              aria-label="Previous ministers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-stone-300 hover:border-[#581C87] hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
              aria-label="Next ministers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MANDATORY DISCLAIMER AS REQUESTED */}
        <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed shadow-2xs">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Ecclesiastical Disclaimer:</strong> We are <em>NOT</em> affiliated to any of these men and women of God or their respective ministries. This directory showcase is presented strictly for kingdom honor, global fellowship awareness, and ecumenical reference.
          </div>
        </div>

        {/* Scrollable Slider Cards */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto scrollbar-none py-2 scroll-smooth"
        >
          {globalMinistersData.map((minister) => (
            <div
              key={minister.id}
              onClick={() => handleOpenMinistry(minister.socialUrl)}
              className="w-72 shrink-0 bg-stone-50 border border-stone-200 hover:border-[#581C87] hover:shadow-lg rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative h-60 bg-stone-200 overflow-hidden">
                  <img
                    src={minister.imageUrl}
                    alt={minister.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span>{minister.socialPlatform}</span>
                    <ExternalLink className="w-3 h-3 text-amber-300" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                      {minister.title}
                    </div>
                    <div className="font-royal font-bold text-base text-white">
                      {minister.name}
                    </div>
                  </div>
                </div>

                {/* Church details */}
                <div className="p-4 space-y-1.5">
                  <div className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#581C87] transition-colors leading-snug line-clamp-2">
                    {minister.churchName}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {minister.city}, {minister.country}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="p-4 pt-0">
                <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-[#581C87] group-hover:text-[#6B21A8]">
                  <span>Visit Ministry Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
