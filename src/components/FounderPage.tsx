import React from 'react';
import { useApp } from '../context/AppContext';
import { founderData } from '../data/founderData';
import {
  Crown,
  Heart,
  BookOpen,
  Sparkles,
  Award,
  Shield,
  ArrowRight
} from 'lucide-react';

export const FounderPage: React.FC = () => {
  const { openDonationModal, navigateTo } = useApp();

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Portrait in white suit (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-black">
              <img
                src={founderData.imageUrl}
                alt="Reverend Listowel Sarsah Adentwi-EdIi (A.K.A Prophet Do All)"
                className="w-full h-auto object-cover"
              />
              <div className="bg-[#1C0633] p-4 text-white border-t-2 border-amber-400">
                <div className="font-royal text-base sm:text-lg font-bold text-white">
                  Reverend Listowel Sarsah Adentwi-EdIi
                </div>
                <div className="text-sm font-bold text-amber-300 mt-0.5 font-royal">
                  A.K.A Prophet Do All
                </div>
                <div className="text-xs text-stone-300 font-serif italic mt-1">
                  "I can do all things through Christ who strengthens me" — Philippians 4:13
                </div>
              </div>
            </div>

            {/* Floating Motto Pill */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-xl text-center shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                Church of Royals Proclamation
              </div>
              <div className="font-serif italic font-bold text-stone-900 text-sm">
                "{founderData.slogan}"
              </div>
              <div className="text-xs font-bold text-[#581C87] mt-0.5">
                A 24/7 Global Online Virtual Church
              </div>
            </div>
          </div>

          {/* Bio & Commission (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-[#581C87] rounded-full text-xs font-bold uppercase tracking-wider">
              <Crown className="w-4 h-4 text-amber-600" />
              <span>General Overseer & Founder</span>
            </div>

            <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              {founderData.title}
            </h1>
            <div className="text-lg font-serif font-bold text-amber-800">
              {founderData.name}
            </div>

            <p className="text-base sm:text-lg text-stone-700 font-serif leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1">
              "Gather my royal priesthood. Remind them that before kings formed decrees, they were marked as the Property of the Most High!"
            </p>

            <div className="prose prose-stone text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                {founderData.bio}
              </p>
              <p>
                Prophet Do All's unique calling merges the deep spiritual demonstrations of apostolic deliverance with the institutional excellence required to transform global finance, governance, and youth empowerment.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => openDonationModal()}
                className="px-6 py-3 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Partner with Prophet Do All</span>
              </button>

              <button
                onClick={() => navigateTo('tv')}
                className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Watch Sermons on Royals TV</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-royal text-2xl font-bold text-stone-900">
              The Four Foundations of the Royal Mandate
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Guiding principles established by Reverend Listowel Sarsah Adentwi-EdIi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {founderData.corePillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#581C87] font-bold font-royal flex items-center justify-center text-sm border border-purple-200">
                  0{i + 1}
                </div>
                <h4 className="font-royal font-bold text-base text-stone-900">
                  {pillar.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
