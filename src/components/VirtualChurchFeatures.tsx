import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  Clock,
  Sparkles,
  Shield,
  Briefcase,
  Headphones,
  Heart,
  Crown,
  CheckCircle2,
  Video,
  ArrowRight,
  BookOpen,
  Award,
  Users
} from 'lucide-react';

export const VirtualChurchFeatures: React.FC = () => {
  const { openDonationModal, navigateTo } = useApp();

  const fiveOutstandingIdeas = [
    {
      number: '01',
      title: '24/7 Global Midnight Altar & Instant Crisis Helpline',
      problemSolved: 'Loneliness, Depression, Sudden Panic, Midnight Spiritual Attacks & Medical Anxiety',
      solution: 'Most physical churches close their doors on Sunday afternoon. Church of Royals is a 24/7 continuous virtual sanctuary. At 2:00 AM or midday, whether you are in a hospital bed in London, an apartment in New York, or a village in Kumasi, you can tap into continuous live praise, deliverance prayer commands, and connect with consecrated intercessors.',
      icon: Clock,
      color: 'from-purple-900 to-[#3B0764]',
      badge: '24/7 Spiritual Coverage',
    },
    {
      number: '02',
      title: 'The Real-Time "What The Bible Says" Truth Intelligence',
      problemSolved: 'Media-Induced Fear, Disinformation, Economic Cynicism & Moral Confusion',
      solution: 'World news media profits from fear, panic, and hopelessness. Church of Royals filters over 10,000 global stories in real time through the eternal truth of the Holy Scriptures. We give believers prophetic decrees and scriptural explanations for geopolitical, health, and economic turbulence so you walk in unshakeable peace.',
      icon: BookOpen,
      color: 'from-amber-700 to-amber-900',
      badge: 'Biblical Media Filter',
    },
    {
      number: '03',
      title: 'Royal Sovereign Marketplace & Anti-Poverty Business Guild',
      problemSolved: 'Youth Unemployment, Business Stagnation & Cross-Border Isolation',
      solution: 'Church of Royals goes far beyond religious speeches by providing a private global network where Royal Ambassadors connect across 84 nations. Members in tech, agriculture, import/export, law, and medicine network 1-on-1, access startup mentorship, and discover verified international career opportunities under covenant ethics.',
      icon: Briefcase,
      color: 'from-emerald-800 to-teal-950',
      badge: 'Marketplace Dominion',
    },
    {
      number: '04',
      title: 'Direct Browser WebRTC Sanctuary (Zero Installation Barrier)',
      problemSolved: 'Diaspora Isolation, Lack of Fellowship & Distance Constraints',
      solution: 'Many believers live in countries with restricted religious freedom, or work night shifts where attending physical buildings is impossible. Church of Royals uses browser-native WebRTC technology for audio and video fellowship rooms, digital communion, and 1-on-1 pastor counsel with zero downloads, zero tracking, and absolute privacy.',
      icon: Video,
      color: 'from-blue-900 to-indigo-950',
      badge: 'Zero-Barrier Fellowship',
    },
    {
      number: '05',
      title: 'The "You Are A Property of God" Royal Identity Movement',
      problemSolved: 'Inferiority Complex, Generational Rejection & Spiritual Impoverishment',
      solution: 'Millions struggle with low self-worth, feeling abandoned by God or labeled as second-class citizens. Prophet Do All’s prophetic mandate instills the truth of 1 Peter 2:9 into your spirit: you are not a victim of economic circumstance; you are royal blood, marked as God’s personal property, empowered to do all things through Christ.',
      icon: Crown,
      color: 'from-[#581C87] to-purple-950',
      badge: 'Identity Restoration',
    },
  ];

  const whyBecomeMemberReasons = [
    {
      title: 'Bestowal of Ecclesiastical Royal Title',
      description: 'Consecrated within the Church of Royals Ecosystem as "His Royal Majesty [Full Name]" or "Her Royal Majesty [Full Name]" reflecting your spiritual royalty in Christ Jesus.',
    },
    {
      title: 'Official Verifiable Digital Ambassador ID Card',
      description: 'Receive an official printable and downloadable royal credential complete with verified QR code, jurisdiction, member ID number, and gold royal seal.',
    },
    {
      title: 'Direct Petitions at Prophet Do All’s Midnight Altar',
      description: 'Your personal family, health, and financial prayer requests are placed directly before the altar during the General Overseer’s apostolic deliverance watches.',
    },
    {
      title: 'Private Global Social Network & 1-on-1 Encrypted Messaging',
      description: 'Access the private members-only social feed, join chapter chat rooms by country, and initiate private peer-to-peer WebRTC video and audio calls.',
    },
    {
      title: 'Full Unlocked Global Directory with Pastoral Contacts',
      description: 'Instant access to direct phone numbers, personal emails, physical addresses, and Google Maps pins for thousands of churches globally when you travel.',
    },
    {
      title: 'Honorable Free Will Culture (Zero Mandatory Taxation)',
      description: 'No forced tithes, no public extortion. Sowing is strictly a joyful, free will covenant act between you and God across multiple global currencies via Paystack.',
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* SECTION 1: 5 REVOLUTIONARY IDEAS SOLVING REAL-WORLD PROBLEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>24/7 Online Virtual Church Innovation</span>
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            5 PILLARS THAT MAKE THIS VIRTUAL MINISTRY OUTSTANDING
          </h2>

          <p className="text-sm text-stone-600 leading-relaxed">
            How Church of Royals International Ministry bridges spiritual eternity with practical, real-world solutions for families, students, entrepreneurs, and seekers globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fiveOutstandingIdeas.map((idea, idx) => {
            const Icon = idea.icon;
            return (
              <div
                key={idea.number}
                className="bg-white border-2 border-stone-200 hover:border-amber-400 rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-royal font-black text-2xl text-amber-600">
                      {idea.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-purple-50 text-[#581C87] border border-purple-200 rounded-md">
                      {idea.badge}
                    </span>
                  </div>

                  <h3 className="font-royal font-bold text-lg text-stone-900 mb-2 leading-snug group-hover:text-[#581C87] transition-colors">
                    {idea.title}
                  </h3>

                  {/* Problem Solved Badge */}
                  <div className="p-2.5 bg-red-50/70 border border-red-200/60 rounded-lg text-xs text-red-900 mb-3">
                    <strong className="block text-[10px] uppercase font-bold text-red-700 mb-0.5">
                      Problem Solved:
                    </strong>
                    {idea.problemSolved}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {idea.solution}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#581C87]">
                  <span>24/7 Virtual Impact</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
              </div>
            );
          })}

          {/* 6th Callout Card to connect */}
          <div className="bg-gradient-to-br from-[#1C0633] to-[#3B0764] text-white border-2 border-amber-400 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-royal font-bold text-xl text-white mb-2">
                A True 24/7 Global Borderless Sanctuary
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                No matter your time zone, nationality, or physical location, God has prepared a royal table for you. Step into your inheritance as a Property of God.
              </p>
            </div>

            <button
              onClick={() => openDonationModal()}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-royal"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>Join as a Royal Ambassador</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY BECOME A MEMBER (ROYAL AMBASSADOR PRIVILEGES) */}
      <section className="bg-gradient-to-br from-[#0B0214] via-[#1C0633] to-[#120422] text-white py-16 border-y-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/40">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Kingdom Covenant Privileges</span>
            </div>

            <h2 className="font-royal text-3xl sm:text-4xl font-black text-white tracking-tight">
              WHY BECOME A ROYAL AMBASSADOR?
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed font-serif">
              "You are not an ordinary person wandering without covering. When you join the Church of Royals Ecosystem, you are recognized as a consecrated Royal Ambassador of Christ Jesus."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyBecomeMemberReasons.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-amber-400/30 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm border border-amber-400/40">
                      {index + 1}
                    </div>
                    <h3 className="font-royal font-bold text-base text-white">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center gap-2 text-xs text-amber-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Guaranteed Covenant Blessing</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => openDonationModal()}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base rounded-xl shadow-2xl transition-all hover:scale-102 inline-flex items-center gap-2.5 cursor-pointer font-royal"
            >
              <Crown className="w-5 h-5 fill-stone-950" />
              <span>Sow Free Will Seed & Enroll as Ambassador Today</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
