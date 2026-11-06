import React from 'react';
import { useApp } from '../context/AppContext';
import { founderData } from '../data/founderData';
import {
  Crown,
  Heart,
  Globe,
  Tv,
  BookOpen,
  Compass,
  Users,
  Shield,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openDonationModal } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111116] text-stone-300 border-t border-purple-950">
      {/* 1. TOP FOUNDER SPOTLIGHT IN FOOTER (MANDATORY per prompt) */}
      <div className="border-b border-stone-800 bg-[#16161D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              {/* Founder Image in white suit */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg">
                <img
                  src={founderData.imageUrl}
                  alt={founderData.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white font-royal font-bold text-sm sm:text-base">
                    Reverend Listowel Sarsah Adentwi-EdIi
                  </span>
                  <span className="text-amber-400 font-royal font-bold text-xs sm:text-sm">
                    (A.K.A Prophet Do All)
                  </span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded uppercase font-bold">
                    General Overseer
                  </span>
                </div>
                <blockquote className="font-serif italic text-xs sm:text-sm text-stone-200 mt-1">
                  "I can do all things through Christ who strengthens me" — <strong className="text-amber-400">Philippians 4:13</strong>
                </blockquote>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-serif font-bold mt-0.5">
                  <span>"{founderData.slogan}"</span>
                  <span className="text-stone-400 font-sans font-normal">· A 24/7 Global Online Virtual Church</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openDonationModal()}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-stone-950" />
                <span>Give Free Will Seed</span>
              </button>

              <button
                onClick={() => navigateTo('founder')}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              >
                Founder's Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER DIRECTORY & NAVIGATION COLUMNS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Ministry Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B0764] to-[#1e0338] border border-amber-400 flex items-center justify-center text-amber-400">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <div className="font-royal text-base sm:text-lg font-bold tracking-tight text-white">
                  CHURCH OF ROYALS
                </div>
                <div className="text-[10px] tracking-widest uppercase font-semibold text-amber-400">
                  International Ministry
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pr-4">
              A dynamic royal Christian news magazine, global ecclesiastical directory, 24/7 broadcast station, and apostolic network empowering believers as sovereign sons and daughters of the Most High God.
            </p>

            <div className="pt-2 text-xs font-serif italic text-amber-300">
              "You Are A Property of God"
            </div>

            <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
              <div>Church Incorporated in Ghana on 12th August 2013</div>
              <div className="text-amber-400">Official Contact: info@churchofroyals.org</div>
            </div>
          </div>

          {/* Col 2: News & Media */}
          <div className="space-y-3">
            <h4 className="font-royal font-bold text-xs text-white uppercase tracking-wider">
              News & Broadcast
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  World News Wire
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tv')}
                  className="hover:text-amber-400 transition-colors"
                >
                  The Royals TV
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sermons')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Prophetic Sermons
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('neighbours')}
                  className="hover:text-amber-400 transition-colors"
                >
                  From Our Neighbours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Fellowship */}
          <div className="space-y-3">
            <h4 className="font-royal font-bold text-xs text-white uppercase tracking-wider">
              Fellowship & Outreach
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('directory')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Global Church Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('member-portal')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Royal Ambassador Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ministries')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Ministries & Wings
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('events')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Upcoming Convocations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Ministry Leadership & Admin */}
          <div className="space-y-3">
            <h4 className="font-royal font-bold text-xs text-white uppercase tracking-wider">
              Leadership & Trust
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('founder')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Prophet Do All's Biography
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About the Ministry
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Secretariat
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-amber-400 text-purple-400 transition-colors flex items-center gap-1"
                >
                  <Shield className="w-3 h-3" />
                  <span>Overseer Console</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. BOTTOM COPYRIGHT & LEGAL NOTICE */}
        <div className="pt-8 mt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Church of Royals International Ministry. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
