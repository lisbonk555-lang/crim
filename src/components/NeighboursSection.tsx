import React, { useState } from 'react';
import { neighboursData } from '../data/neighboursData';
import { BookOpen, Sparkles, HeartHandshake, Compass } from 'lucide-react';

export const NeighboursSection: React.FC = () => {
  const [activeFaith, setActiveFaith] = useState<string>('All');

  const faiths = ['All', 'Islam', 'Buddhism', 'Hinduism', 'ISKCON', 'Baháʼí', 'Shinto'];

  const filteredMessages = neighboursData.filter(
    (msg) => activeFaith === 'All' || msg.faith === activeFaith
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-[#581C87] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>Mark 12:31 Scriptural Initiative</span>
          </div>

          <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            FROM OUR NEIGHBOURS
          </h1>

          <blockquote className="font-serif italic text-lg sm:text-xl text-[#581C87] font-semibold mb-3">
            "And the second is like, namely this, Thou shalt love thy neighbour as thyself. There is none other commandment greater than these." — Mark 12:31
          </blockquote>

          <p className="text-sm text-stone-600 leading-relaxed">
            As royal followers of Christ Jesus, we shine the light of God’s truth across all human communities. Here we examine inspirational proverbs from our global neighbours through the illuminating lens of the Holy Bible, demonstrating unity, peace, and the timeless wisdom of our Creator.
          </p>
        </div>

        {/* Faith Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl">
            {faiths.map((faith) => (
              <button
                key={faith}
                onClick={() => setActiveFaith(faith)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeFaith === faith
                    ? 'bg-[#581C87] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {faith}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Messages: Quote > Source > Bible Reflection > Bible Verse */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Top: Faith tag & Source Quote */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-amber-700 uppercase tracking-wider">
                    {msg.faith}
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">
                    {msg.sourceText}
                  </span>
                </div>

                <div className="relative pl-4 border-l-2 border-amber-500/40 my-3">
                  <blockquote className="font-serif italic text-base text-stone-900 leading-relaxed">
                    "{msg.quote}"
                  </blockquote>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Source: {msg.originFigure}
                  </div>
                </div>

                {/* Bible Harmonization Reflection */}
                <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#581C87] uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Biblical Reflection</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {msg.christianReflection}
                  </p>
                </div>
              </div>

              {/* Bottom Bible Verse Accordion Box */}
              <div className="bg-gradient-to-r from-purple-50 to-amber-50/50 p-4 border-t border-purple-100">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#581C87] uppercase mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>The Word of God ({msg.verseReference})</span>
                </div>
                <p className="font-serif italic text-xs text-stone-800 leading-snug">
                  "{msg.bibleVerse}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Biblical Mandate Callout Box */}
        <div className="mt-12 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xs text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-royal text-lg font-bold text-stone-900">
            Our Royal Commitment to Global Love and Truth
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            At Church of Royals International Ministry, we stand on the unshakeable truth that Jesus Christ is Lord of all. We reach out with kindness, generosity, and peace to people of every nation and creed, reflecting God's love without compromising the Gospel.
          </p>
        </div>
      </div>
    </div>
  );
};
