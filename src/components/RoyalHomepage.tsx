import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Category, NewsArticle } from '../types';
import { founderData } from '../data/founderData';
import { globalChurchesData, denominationsList } from '../data/churchesData';
import { neighboursData } from '../data/neighboursData';
import { getIncorporationDuration } from '../utils/incorporationTimer';
import { generateGodPerspectiveForNews } from '../data/newsData';
import { GlobalMinistersSlider } from './GlobalMinistersSlider';
import { VirtualChurchFeatures } from './VirtualChurchFeatures';
import {
  Crown,
  Sparkles,
  Heart,
  Tv,
  Radio,
  BookOpen,
  Compass,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Globe,
  Share2,
  Calendar,
  Lock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Play,
  Volume2,
  VolumeX,
  CreditCard,
  MessageCircle,
  Send,
  Users
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'World',
  'Politics',
  'Business',
  'Technology',
  'Health',
  'Sports',
  'Entertainment',
  'Education',
  'Science',
  'Religion',
  'Africa',
  'Europe',
  'Asia',
  'Americas',
  'Middle East',
  'Oceania',
];

export const RoyalHomepage: React.FC = () => {
  const {
    articles,
    activeCategory,
    setActiveCategory,
    searchQuery,
    navigateTo,
    openDonationModal,
    tvPlaylist,
    currentVideo,
    setCurrentVideo,
    currentMember,
    showNotification
  } = useApp();

  const [incDuration, setIncDuration] = useState(getIncorporationDuration());
  const [isAutoFetching, setIsAutoFetching] = useState(false);
  const [autoFetchCounter, setAutoFetchCounter] = useState(10482);
  const [liveNewsList, setLiveNewsList] = useState<NewsArticle[]>(articles);
  const [lastUpdatedTime, setLastUpdatedTime] = useState('Just now (Live sync active)');

  // TV state
  const [tvMuted, setTvMuted] = useState(true);
  const [useYouTubeEmbed, setUseYouTubeEmbed] = useState(true);

  // Directory state
  const [directoryCountry, setDirectoryCountry] = useState('All');
  const [directoryDenom, setDirectoryDenom] = useState('All Denominations');
  const [directorySearch, setDirectorySearch] = useState('');

  // Inline Donation form state
  const [inlineAmount, setInlineAmount] = useState<number | ''>(100);
  const [inlineCurrency, setInlineCurrency] = useState('GHS');

  useEffect(() => {
    const timer = setInterval(() => {
      setIncDuration(getIncorporationDuration());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Sync articles
  useEffect(() => {
    setLiveNewsList(articles);
  }, [articles]);

  // Simulated live auto-fetching every 60 seconds to pull over 10,000 global news items
  useEffect(() => {
    const autoFetchInterval = setInterval(() => {
      triggerAutoFetch(true);
    }, 45000);
    return () => clearInterval(autoFetchInterval);
  }, []);

  const triggerAutoFetch = (silent = false) => {
    setIsAutoFetching(true);
    setTimeout(() => {
      setAutoFetchCounter((prev) => prev + Math.floor(1 + Math.random() * 6));
      setLastUpdatedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsAutoFetching(false);
      if (!silent) {
        showNotification('Fetched latest global trending news and aligned with Bible perspectives.');
      }
    }, 1200);
  };

  // Filtered news
  const filteredNews = liveNewsList.filter((art) => {
    const matchesCategory =
      activeCategory === 'All' ||
      art.category === activeCategory ||
      art.region === (activeCategory as string);

    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.region.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Directory filtering
  const countries = ['All', ...Array.from(new Set(globalChurchesData.map((c) => c.country)))];
  const filteredChurches = globalChurchesData.filter((c) => {
    const matchCountry = directoryCountry === 'All' || c.country === directoryCountry;
    const matchDenom = directoryDenom === 'All Denominations' || c.denomination === directoryDenom;
    const matchSearch =
      directorySearch === '' ||
      c.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      c.city.toLowerCase().includes(directorySearch.toLowerCase()) ||
      c.pastor.toLowerCase().includes(directorySearch.toLowerCase());
    return matchCountry && matchDenom && matchSearch;
  }).slice(0, 6);

  return (
    <div className="bg-[#FAF9F6] text-stone-900 pb-20">
      {/* 1. MAJESTIC ROYAL HERO & FOUNDER EMBASSY */}
      <section className="relative bg-gradient-to-br from-[#1C0633] via-[#3B0764] to-[#120422] text-white overflow-hidden py-12 lg:py-16 border-b-4 border-amber-400">
        {/* Subtle royal damask background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Royal Calling & Mandate (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Incorporation Milestone Ribbon */}
              <div className="inline-flex flex-wrap items-center gap-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/50 px-3.5 py-1.5 rounded-full text-xs text-amber-300 font-semibold shadow-inner">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Incorporated in Ghana on 12th August 2013</span>
                <span className="text-stone-400">·</span>
                <span className="font-bold text-white font-mono">{incDuration.formatted}</span>
              </div>

              {/* Grand Title */}
              <div>
                <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  CHURCH OF ROYALS
                </h1>
                <div className="font-royal text-lg sm:text-2xl font-bold text-amber-400 tracking-wide mt-1">
                  INTERNATIONAL MINISTRY
                </div>
              </div>

              {/* Slogan & Motto */}
              <div className="space-y-2 border-l-4 border-amber-400 pl-4 py-1">
                <div className="font-serif italic text-2xl sm:text-3xl font-extrabold text-amber-300">
                  "{founderData.slogan}"
                </div>
                <div className="text-xs sm:text-sm text-stone-200 font-medium">
                  "{founderData.motto}" — <strong className="text-amber-400">{founderData.scriptureReference}</strong>
                </div>
              </div>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Welcome to the global sanctuary of the royal priesthood. Under the anointing of Prophet Do All, we bring you live celestial broadcast, over 10,000 trending world news analyzed strictly through the Word of God, an international church directory, and a consecrated Royal Ambassador fellowship.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openDonationModal()}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-xl transition-all hover:scale-102 flex items-center gap-2 cursor-pointer font-royal"
                >
                  <Heart className="w-4 h-4 fill-stone-950" />
                  <span>Give Free Will Seed (Paystack Live)</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('royals-tv-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Tv className="w-4 h-4 text-rose-400" />
                  <span>Watch Royals TV Live</span>
                </button>

                <button
                  onClick={() => navigateTo('member-portal')}
                  className="px-4 py-3.5 text-amber-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors"
                >
                  <span>Ambassador Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Founder Prophet Do All Real Picture & Required Text (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-black">
                <img
                  src={founderData.imageUrl}
                  alt="Reverend Listowel Sarsah Adentwi-EdIi (A.K.A Prophet Do All)"
                  className="w-full h-[400px] sm:h-[430px] object-cover object-top"
                />

                {/* Exact Caption Under Picture Required by User */}
                <div className="bg-[#1C0633] border-t-4 border-amber-400 p-5 text-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider bg-amber-400/20 px-2 py-0.5 rounded">
                      Founder & General Overseer
                    </span>
                    <span className="text-[10px] text-stone-300 font-medium">
                      24/7 Virtual Sanctuary
                    </span>
                  </div>

                  {/* Full Name */}
                  <h3 className="font-royal text-lg sm:text-xl font-black text-white leading-tight">
                    Reverend Listowel Sarsah Adentwi-EdIi
                  </h3>

                  {/* A K A Prophet Do All */}
                  <div className="text-sm font-bold text-amber-300 tracking-wide font-royal">
                    A.K.A Prophet Do All
                  </div>

                  {/* Motto with Bible Quotation */}
                  <blockquote className="font-serif italic text-xs sm:text-sm text-stone-200 pt-1 leading-snug border-t border-purple-900/60">
                    "I can do all things through Christ who strengthens me" — <strong className="text-amber-400 font-bold">Philippians 4:13</strong>
                  </blockquote>

                  {/* Slogan */}
                  <div className="text-xs font-serif font-bold text-amber-400 pt-0.5">
                    "{founderData.slogan}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE ROYALS TV LIVE BROADCAST PAVILION (HOMEPAGE INTEGRATION) */}
      <section id="royals-tv-section" className="py-12 bg-[#111116] text-white border-b-2 border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-[#581C87] flex items-center justify-center text-white shadow-md">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-royal text-xl sm:text-2xl font-bold tracking-tight text-white">
                    THE ROYALS TV
                  </h2>
                  <span className="flex items-center gap-1 bg-rose-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full animate-pulse">
                    <Radio className="w-3 h-3" />
                    LIVE ON AIR
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Continuous 24/7 Christian Broadcast · Sermons, Worship, Praises, Prayers & Celestial Ambience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 hidden sm:inline">Scheduled Auto-Play:</span>
              <span className="text-xs font-mono text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/30">
                {currentVideo.scheduledAirTime || 'Broadcast Active'}
              </span>
            </div>
          </div>

          {/* Player Grid: Main Screen + Schedule List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Player Frame (8 cols) */}
            <div className="lg:col-span-8 space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border-2 border-amber-500/40 shadow-2xl">
                {currentVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&mute=1&controls=1&rel=0`}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    src={currentVideo.videoUrl}
                    autoPlay
                    loop
                    muted={tvMuted}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Now Playing Bar */}
              <div className="p-4 bg-[#181822] rounded-xl border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                    Now Playing ({currentVideo.category})
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                    {currentVideo.title}
                  </h4>
                  <div className="text-stone-400 text-[11px]">
                    Minister: {currentVideo.speakerOrArtist} · Duration: {currentVideo.duration}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openDonationModal()}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-stone-950" />
                    <span>Support Broadcast</span>
                  </button>
                  <button
                    onClick={() => navigateTo('tv')}
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Full TV View &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Channels Rail (4 cols) */}
            <div className="lg:col-span-4 bg-[#181822] border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs">
                <span className="font-royal font-bold text-stone-200">Broadcast Channel Playlist</span>
                <span className="text-amber-400 font-mono">{tvPlaylist.length} Channels</span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {tvPlaylist.map((item) => {
                  const isActive = item.id === currentVideo.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setCurrentVideo(item)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                        isActive
                          ? 'bg-[#581C87]/40 border-amber-400 text-white'
                          : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-900'
                      }`}
                    >
                      <div className="w-16 h-12 rounded-lg bg-stone-950 overflow-hidden shrink-0 relative">
                        <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#581C87]/80 flex items-center justify-center">
                            <Play className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 text-xs">
                        <div className="text-[10px] font-bold text-amber-400 uppercase truncate">
                          {item.category}
                        </div>
                        <div className="font-serif font-bold truncate text-white leading-tight">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">
                          {item.scheduledAirTime || item.speakerOrArtist}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRENDING GLOBAL NEWS WIRE WITH AUTO-FETCHING & WHAT THE BIBLE SAYS (HOMEPAGE) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* News Header & Live Auto-Fetching Counter */}
        <div className="bg-white border-2 border-amber-400/40 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#581C87] uppercase tracking-wider mb-1">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>Global Intelligence Wire · Auto-Sync Active</span>
              </div>
              <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                TRENDING GLOBAL NEWS & BIBLE PERSPECTIVE
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Fetching over 10,000 global stories from every continent, paired with divine biblical interpretation and prophetic alignment.
              </p>
            </div>

            {/* Auto-Fetch Status Pulse & Manual Refresh */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-right">
                <div className="text-[10px] uppercase font-bold text-stone-500">
                  Global Stories Indexed
                </div>
                <div className="font-mono text-base font-black text-[#581C87]">
                  {autoFetchCounter.toLocaleString()}+ Articles
                </div>
                <div className="text-[9px] text-emerald-600 flex items-center gap-1 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Auto-updated {lastUpdatedTime}</span>
                </div>
              </div>

              <button
                onClick={() => triggerAutoFetch()}
                disabled={isAutoFetching}
                className="px-4 py-2.5 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAutoFetching ? 'animate-spin' : ''}`} />
                <span>{isAutoFetching ? 'Auto-Fetching...' : 'Fetch Latest News'}</span>
              </button>
            </div>
          </div>

          {/* 16 Category Filter Tabs */}
          <div className="pt-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#581C87] text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Cards Grid: Title, Summary, Dedicated Page, WHAT THE BIBLE SAYS Section on EACH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white border-2 border-stone-200 hover:border-[#581C87] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image & Region Tag */}
                <div className="relative h-60 bg-stone-100 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C0633]/90 text-amber-300 text-[11px] font-bold uppercase px-3 py-1 rounded-md shadow-md backdrop-blur-xs">
                    {article.category} · {article.region}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-stone-200 text-[10px] px-2 py-0.5 rounded">
                    {article.readTime}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Article Title */}
                  <h3
                    onClick={() => navigateTo('news-detail', article.slug)}
                    className="font-serif font-bold text-xl text-stone-900 hover:text-[#581C87] transition-colors leading-snug cursor-pointer"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  {/* MANDATORY: WHAT THE BIBLE SAYS / BIBLE PERSPECTIVE SECTION ON EACH ARTICLE */}
                  <div className="p-4 bg-gradient-to-br from-[#FAF5FF] via-[#FFFBEB] to-purple-50/40 rounded-xl border-2 border-amber-400/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#581C87] uppercase tracking-wide">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span>What the Bible Says (God's Perspective)</span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif italic">
                      "{article.godPerspective.interpretation}"
                    </p>

                    {/* Scriptures */}
                    <div className="space-y-1.5 pt-1">
                      {article.godPerspective.scriptures.map((sc, i) => (
                        <div key={i} className="text-xs text-[#581C87] font-semibold bg-white/80 p-2 rounded border border-amber-200">
                          <span className="font-serif italic font-normal text-stone-800">"{sc.verse}" </span>
                          <span className="font-bold">— {sc.reference}</span>
                        </div>
                      ))}
                    </div>

                    {/* Prophetic Decree */}
                    <div className="text-[11px] text-stone-700 pt-1 border-t border-amber-200/60">
                      <strong className="text-amber-900 font-bold">Prophetic Decree: </strong>
                      {article.godPerspective.propheticAction}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Read Full Dedicated Page, Free Will, Share */}
              <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 text-xs">
                <button
                  onClick={() => navigateTo('news-detail', article.slug)}
                  className="font-bold text-[#581C87] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Dedicated Page (/news/{article.slug})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openDonationModal()}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-stone-950" />
                    <span>Free Will Seed</span>
                  </button>

                  <button
                    onClick={() => {
                      const url = `https://churchofroyals.com/news/${article.slug}`;
                      navigator.clipboard.writeText(url);
                      showNotification('Dedicated article link copied to clipboard!');
                    }}
                    className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg"
                    title="Share Article Link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3B. GLOBAL PASTORS, CLERGY, APOSTLES & EVANGELISTS SLIDER (WITH NON-AFFILIATION DISCLAIMER) */}
      <GlobalMinistersSlider />

      {/* 4. FREE WILL DONATION PAVILION (HOMEPAGE INTEGRATION WITH PAYSTACK LIVE) */}
      <section className="py-14 bg-gradient-to-br from-[#1C0633] via-[#3B0764] to-[#120422] text-white border-y-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Description (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
                <Crown className="w-4 h-4" />
                <span>Paystack Live Production · Free Will Sowing</span>
              </div>

              <h2 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                THE ROYAL SEED PAVILION
              </h2>

              <p className="font-serif italic text-base sm:text-lg text-amber-300">
                "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." — 2 Corinthians 9:7
              </p>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Giving in Church of Royals is strictly a Free Will act of covenant worship. No fixed taxation, no coercion. Give whatever amount God places in your heart in GHS, USD, NGN, GBP, EUR, KES, or ZAR.
              </p>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Automatic Member Account & Login Credentials Generated</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Crown className="w-4 h-4" />
                  <span>Bestowal of Royal Title: His Royal Majesty / Her Royal Majesty</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Personal Data Kept Confidential & Protected by 256-bit Encryption</span>
                </div>
              </div>
            </div>

            {/* Right Quick Donation Card (6 cols) */}
            <div className="lg:col-span-6 bg-white text-stone-900 rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400 space-y-5">
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                  Instant Kingdom Partnership
                </span>
                <h3 className="font-royal text-xl font-bold text-stone-900 mt-1">
                  Sow Your Free Will Seed Now
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Select Currency & Free Will Amount
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={inlineCurrency}
                      onChange={(e) => setInlineCurrency(e.target.value)}
                      className="px-3 py-2 border border-stone-300 rounded-lg font-bold text-sm bg-stone-50"
                    >
                      <option value="GHS">GHS (Ghana)</option>
                      <option value="USD">USD (Global)</option>
                      <option value="NGN">NGN (Nigeria)</option>
                      <option value="GBP">GBP (UK)</option>
                      <option value="EUR">EUR (Europe)</option>
                      <option value="KES">KES (Kenya)</option>
                      <option value="ZAR">ZAR (South Africa)</option>
                    </select>

                    <input
                      type="number"
                      min="1"
                      placeholder="Enter any amount"
                      value={inlineAmount}
                      onChange={(e) => setInlineAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-base font-bold text-stone-900"
                    />
                  </div>
                </div>

                <button
                  onClick={() => openDonationModal(Number(inlineAmount) || 50, inlineCurrency)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#581C87] via-[#6B21A8] to-[#3B0764] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-royal"
                >
                  <CreditCard className="w-4 h-4 text-amber-300" />
                  <span>
                    Proceed with {inlineCurrency} {inlineAmount || '0'} via Paystack Live
                  </span>
                </button>

                <div className="text-center text-[11px] text-stone-500">
                  * Instant digital receipt, Royal Ambassador ID Card and Member Credentials generated upon confirmation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4B. 5 REVOLUTIONARY IDEAS SOLVING REAL-WORLD PROBLEMS & WHY BECOME A MEMBER */}
      <VirtualChurchFeatures />

      {/* 5. GLOBAL DIRECTORY OF CHURCHES (HOMEPAGE INTEGRATION) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Worldwide Fellowship Register</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              GLOBAL DIRECTORY OF CHURCHES
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Verified Christian congregations across cities in Africa, Europe, Americas, Asia, and Oceania.
            </p>
          </div>

          <button
            onClick={() => navigateTo('directory')}
            className="px-4 py-2 border border-[#581C87] text-[#581C87] hover:bg-[#581C87] hover:text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            View Full Global Directory &rarr;
          </button>
        </div>

        {/* Mandatory Non-Affiliation Disclaimer */}
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 leading-relaxed">
          <strong>Ecclesiastical Disclaimer:</strong> Church of Royals International Ministry is <em>NOT</em> affiliated with any of these churches. This directory is provided strictly for Christian fellowship, travel reference, and kingdom networking.
        </div>

        {/* 6 Public Churches Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChurches.map((church) => (
            <div
              key={church.id}
              className="bg-white border border-stone-200 rounded-xl p-5 hover:border-[#581C87] transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#581C87] uppercase tracking-wider">
                    {church.denomination}
                  </span>
                  <span className="text-stone-500 font-medium">
                    {church.city}, {church.country}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                  {church.name}
                </h4>

                <div className="text-xs text-stone-600 mb-3">
                  <span className="text-stone-400">Pastor: </span>
                  <span className="font-semibold">{church.pastor}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                {currentMember ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Contact Unlocked
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Contact info reserved for Ambassadors
                  </span>
                )}
                <button
                  onClick={() => navigateTo('directory')}
                  className="text-[#581C87] font-bold hover:underline"
                >
                  Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FROM OUR NEIGHBOURS (MARK 12:31 FEATURE AT HOMEPAGE) */}
      <section className="py-12 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
              Mark 12:31 Royal Mandate
            </span>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-stone-900">
              FROM OUR NEIGHBOURS
            </h2>
            <blockquote className="font-serif italic text-sm text-[#581C87] font-semibold">
              "Love your neighbour as yourself" — Mark 12:31
            </blockquote>
            <p className="text-xs text-stone-600">
              Inspirational messages from world faiths examined through the supreme light of the Holy Bible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {neighboursData.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">
                    {item.faith}
                  </span>
                  <blockquote className="font-serif italic text-stone-800 text-sm my-2">
                    "{item.quote}"
                  </blockquote>
                  <div className="text-[10px] text-stone-400 mb-3">{item.originFigure}</div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-xs text-stone-700 space-y-1">
                    <div className="font-bold text-[#581C87]">Bible Reflection:</div>
                    <p className="leading-snug">{item.christianReflection}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 text-xs font-serif italic text-stone-900 mt-3">
                  "{item.bibleVerse}" — <strong className="font-sans font-bold text-[#581C87]">{item.verseReference}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('neighbours')}
              className="text-xs font-bold text-[#581C87] hover:underline"
            >
              Explore all messages from our global neighbours &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
