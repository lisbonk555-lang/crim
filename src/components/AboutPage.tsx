import React from 'react';
import { useApp } from '../context/AppContext';
import { founderData } from '../data/founderData';
import { Crown, Heart, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openDonationModal, navigateTo } = useApp();

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2E0854] via-[#581C87] to-[#1C0633] text-white p-8 sm:p-14 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
              <Crown className="w-4 h-4" />
              <span>Royal Heritage & Apostolic Mandate</span>
            </div>
            <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              About Church of Royals International Ministry
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-amber-300">
              Slogan: "You Are A Property of God"
            </p>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Founded under the prophetic guidance of Reverend Listowel Sarsah Adentwi-EdIi (Prophet Do All), Church of Royals is a global apostolic movement consecrated to awakening believers to their royal identity in Jesus Christ.
            </p>
          </div>
        </div>

        {/* Cathedral Exterior & Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-stone-200 shadow-md">
            <img
              src="/src/assets/images/church_cathedral_exterior_1793931073461.jpg"
              alt="Church of Royals Cathedral"
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-800">
              Our Vision & Mission
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Raising Sons and Daughters into Kings and Priests
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Scripture declares in 1 Peter 2:9: <em>"But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light."</em>
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              We reject spiritual mediocrity and religious poverty. We believe every child of God carries royal blood through the sacrifice of Calvary. Our mission spans 84 nations, establishing media broadcasts, educational scholarships, community welfare centers, and intercessory prayer altars.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openDonationModal()}
                className="px-6 py-3 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Partner with the Ministry (Free Will Giving)</span>
              </button>
            </div>
          </div>
        </div>

        {/* What We Believe */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-royal text-2xl font-bold text-stone-900">
              Articles of Royal Faith
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Uncompromising adherence to the Holy Scriptures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-stone-700">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="font-bold font-royal text-[#581C87]">01. The Trinity & Godhead</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                We believe in one God eternally existent in three Persons: Father, Son, and Holy Spirit, Creator of heaven and earth.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="font-bold font-royal text-[#581C87]">02. The Lord Jesus Christ</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                His virgin birth, sinless life, atoning death on the cross, bodily resurrection, ascension to the right hand of the Father, and personal return in glory.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="font-bold font-royal text-[#581C87]">03. Royal Priesthood in Christ</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every born-again believer is sealed by the Holy Spirit as a Property of God, empowered to do all things through Christ (Phil 4:13).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
