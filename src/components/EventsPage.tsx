import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { openDonationModal, navigateTo } = useApp();

  const events = [
    {
      title: 'Global Night of Royal Decrees 2026',
      date: 'Friday, November 27, 2026',
      time: '10:00 PM GMT (All-Night Vigil)',
      venue: 'Cathedral of Royals, Independence Square, Accra & Live on Royals TV',
      speaker: 'Prophet Do All',
      description: 'An apostolic gathering to decree victory into 2027, break covenant delays, and release financial and spiritual speed.',
    },
    {
      title: 'World Royal Ambassadors Leadership Summit',
      date: 'December 12 - 14, 2026',
      time: '9:00 AM - 5:00 PM Daily',
      venue: 'London International Convention Centre & Hybrid Video Stream',
      speaker: 'Reverend Listowel & Guest Global Speakers',
      description: 'Empowering Christian professionals, ministers, and investors in marketplace ministry and global outreach.',
    },
    {
      title: 'Jubilee of High Praises & Philanthropy Gala',
      date: 'December 31, 2026',
      time: '8:00 PM - Midnight Crossover',
      venue: 'Worldwide Satellite Centers in 84 Nations',
      speaker: 'Prophet Do All & Mass Choirs',
      description: 'Entering the New Year as a consecrated Property of God with thanksgiving, communion, and prophetic declarations.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>Kingdom Itinerary</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-extrabold text-stone-900">
            UPCOMING ROYAL CONVOCATIONS
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Join Prophet Do All in person or tune in internationally via The Royals TV stream.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {events.map((ev, i) => (
            <div
              key={i}
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 hover:border-[#581C87] hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                  <span className="font-bold text-[#581C87]">{ev.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {ev.time}
                  </span>
                </div>

                <h3 className="font-royal font-bold text-lg text-stone-900 leading-snug">
                  {ev.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {ev.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold pt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>{ev.venue}</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => openDonationModal()}
                  className="px-4 py-2 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-xs rounded-xl shadow-xs transition-colors text-center cursor-pointer"
                >
                  Sponsor Convocation
                </button>
                <button
                  onClick={() => navigateTo('tv')}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors text-center cursor-pointer"
                >
                  Watch Stream
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
