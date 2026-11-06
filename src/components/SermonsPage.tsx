import React from 'react';
import { useApp } from '../context/AppContext';
import { founderData } from '../data/founderData';
import { Play, Tv, BookOpen, Clock, Heart } from 'lucide-react';

export const SermonsPage: React.FC = () => {
  const { navigateTo, openDonationModal } = useApp();

  const sermons = [
    {
      title: 'Breaking Generational Barriers: I Can Do All Things Through Christ',
      scripture: 'Philippians 4:13',
      date: 'Sunday Prophetic Service',
      minister: 'Prophet Do All',
      duration: '52 mins',
      thumbnail: '/src/assets/images/founder_prophet_do_all_1793931072030.jpg',
    },
    {
      title: 'You Are A Property of God: The Covenant of Ownership & Divine Protection',
      scripture: '1 Peter 2:9',
      date: 'Anointing & Communion Night',
      minister: 'Prophet Do All',
      duration: '48 mins',
      thumbnail: '/src/assets/images/church_cathedral_exterior_1793931073461.jpg',
    },
    {
      title: 'Marketplace Dominion: Kings in Governance and Corporate Excellence',
      scripture: 'Proverbs 22:29',
      date: 'Global Business Summit',
      minister: 'Prophet Do All',
      duration: '41 mins',
      thumbnail: '/src/assets/images/royal_ambassador_summit_1793931073802.jpg',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Prophetic Word Library</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-extrabold text-stone-900">
            PROPHETIC SERMON ARCHIVE
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Anointed audio and video messages preached by Reverend Listowel Sarsah Adentwi-EdIi (Prophet Do All).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sermons.map((s, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-stone-900">
                  <img
                    src={s.thumbnail}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => navigateTo('tv')}
                    className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-500 group-hover:scale-110 transition-transform flex items-center justify-center text-stone-950 font-bold shadow-lg">
                      <Play className="w-5 h-5 ml-0.5 fill-stone-950" />
                    </div>
                  </button>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-stone-200 px-2 py-0.5 rounded">
                    {s.duration}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-1">
                    <span>{s.scripture}</span>
                    <span>{s.date}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900 leading-snug mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-stone-500">Preached by {s.minister}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => navigateTo('tv')}
                  className="w-full py-2 bg-stone-100 hover:bg-[#581C87] hover:text-white text-stone-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Watch Now on Royals TV
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
