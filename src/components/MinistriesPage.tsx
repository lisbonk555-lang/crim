import React from 'react';
import { useApp } from '../context/AppContext';
import { Crown, Users, Heart, Sparkles, Tv, BookOpen, Shield } from 'lucide-react';

export const MinistriesPage: React.FC = () => {
  const { openDonationModal, navigateTo } = useApp();

  const ministriesList = [
    {
      title: 'Youth Royals & Campus Awakening',
      desc: 'Equipping teenagers and university students with moral integrity, technology literacy, and supernatural prayer boldness.',
      icon: Sparkles,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Women of the Crown',
      desc: 'Nurturing godly matriarchs, business executives, mothers, and intercessors walking in covenant dignity and wisdom.',
      icon: Crown,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'Men of Honor & Dominion',
      desc: 'Challenging men to lead in family priesthood, financial stewardship, marketplace mentorship, and civic integrity.',
      icon: Shield,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'The Royals TV & Broadcast Network',
      desc: '24/7 global transmission of praise, prophetic sermons, and celestial ambient frequencies reaching unreached nations.',
      icon: Tv,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Apostolic Philanthropy & Orphan Care',
      desc: 'Distributing food parcels, educational scholarships, and hospital bill clearances to vulnerable families across Africa and abroad.',
      icon: Heart,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'The Royal Priesthood Intercessory Network',
      desc: 'Round-the-clock continuous prayer watch declaring peace over cities and protection for all Property of God worldwide.',
      icon: BookOpen,
      color: 'text-indigo-600 bg-indigo-50',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-[#581C87] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-4 h-4" />
            <span>Kingdom Wings</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            MINISTRIES OF CHURCH OF ROYALS
          </h1>
          <p className="text-sm text-stone-600 mt-2">
            Diverse arms of ministry functioning as one unified body under the leadership of Reverend Listowel Sarsah Adentwi-EdIi (Prophet Do All).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministriesList.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs hover:border-[#581C87] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-royal font-bold text-lg text-stone-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#581C87]">Learn more &rarr;</span>
                  <button
                    onClick={() => openDonationModal()}
                    className="text-xs text-amber-700 font-semibold hover:underline"
                  >
                    Support Wing
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
