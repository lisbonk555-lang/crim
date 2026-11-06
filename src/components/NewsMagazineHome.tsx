import React from 'react';
import { useApp } from '../context/AppContext';
import { Category, NewsArticle } from '../types';
import { founderData } from '../data/founderData';
import {
  Flame,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  Tv,
  Globe,
  Radio,
  Share2
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

export const NewsMagazineHome: React.FC = () => {
  const {
    articles,
    activeCategory,
    setActiveCategory,
    searchQuery,
    navigateTo,
    openDonationModal
  } = useApp();

  // Filtered by category and search
  const filteredArticles = articles.filter((art) => {
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

  // Top 5 Trending Global News
  const topTrending = articles.filter((a) => a.isTrending || a.isBreaking).slice(0, 5);
  const leadStory = topTrending[0] || articles[0];
  const sideTrending = topTrending.slice(1, 5);

  return (
    <div className="bg-[#FAF9F6] pb-16">
      {/* 1. EDITORIAL HEADER & SLOGAN BANNER */}
      <section className="bg-gradient-to-b from-white to-[#FAF9F6] border-b border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-700 mb-1">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>Global Christian Newsroom & Prophetic Dispatch</span>
              </div>
              <h2 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
                THE ROYAL GAZETTE
              </h2>
            </div>

            <div className="text-right flex flex-col md:items-end">
              <span className="font-serif italic text-base sm:text-lg text-[#581C87] font-semibold">
                "{founderData.slogan}"
              </span>
              <span className="text-xs text-stone-500 font-sans">
                Interpreting World Events Through the Mind of Christ
              </span>
            </div>
          </div>

          {/* 2. CATEGORY HORIZONTAL FILTER TABS (Interactive controls with functional handlers) */}
          <div className="pt-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max pb-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#581C87] text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO SECTION: TOP 5 TRENDING GLOBAL NEWS (BBC/CNN/Forbes Style) */}
      {activeCategory === 'All' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-red-600 fill-red-600" />
            <h3 className="font-royal text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wider">
              Top Trending Global News
            </h3>
            <span className="text-xs text-stone-400">· Curated 24/7 with God's Perspective</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Lead Primary Story (7 cols) */}
            <div
              onClick={() => navigateTo('news-detail', leadStory.slug)}
              className="lg:col-span-7 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative h-72 sm:h-96 overflow-hidden bg-stone-100">
                <img
                  src={leadStory.imageUrl}
                  alt={leadStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>Lead Story</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-6 text-white">
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
                    <span>{leadStory.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadStory.region}</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadStory.date}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold leading-tight group-hover:text-amber-200 transition-colors text-balance">
                    {leadStory.title}
                  </h4>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {leadStory.summary}
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[#581C87] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Includes Biblical God's Perspective Analysis</span>
                  </div>
                  <span className="font-bold text-stone-900 group-hover:text-[#581C87] flex items-center gap-1">
                    Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Next 4 Trending Stories (5 cols - 2x2 grid) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sideTrending.map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigateTo('news-detail', art.slug)}
                  className="bg-white border border-stone-200 rounded-xl p-3.5 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-32 rounded-lg overflow-hidden bg-stone-100 mb-2.5">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-stone-900/80 text-amber-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded backdrop-blur-xs">
                        {art.category}
                      </div>
                    </div>
                    <div className="text-[11px] text-stone-500 mb-1 flex items-center gap-1.5">
                      <span>{art.region}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h5 className="font-serif font-bold text-sm text-stone-900 line-clamp-2 group-hover:text-[#581C87] transition-colors leading-snug">
                      {art.title}
                    </h5>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="text-amber-800 font-medium">God's Perspective</span>
                    <span className="text-stone-700 font-semibold group-hover:text-[#581C87]">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. MAIN ARTICLE ARCHIVE + SIDEBAR (PROPHET DO ALL's SECTION + ROYALS TV PREVIEW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Articles Feed (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#581C87]" />
                <h3 className="font-royal text-lg font-bold text-stone-900">
                  {activeCategory === 'All' ? 'Latest World Wire & Dispatches' : `${activeCategory} Intelligence`}
                </h3>
                <span className="text-xs text-stone-500">({filteredArticles.length} stories)</span>
              </div>

              {searchQuery && (
                <span className="text-xs text-amber-700 font-medium">
                  Showing results for "{searchQuery}"
                </span>
              )}
            </div>

            {/* Articles List / Grid */}
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
                <p className="text-stone-500 mb-2">No articles found matching your criteria.</p>
                <button
                  onClick={() => setActiveCategory('All')}
                  className="text-sm font-bold text-[#581C87] underline"
                >
                  View all stories
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => navigateTo('news-detail', art.slug)}
                    className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 hover:border-[#581C87] hover:shadow-md transition-all cursor-pointer group grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                  >
                    <div className="sm:col-span-4 h-40 sm:h-36 rounded-lg overflow-hidden bg-stone-100">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="sm:col-span-8 flex flex-col justify-between h-full">
                      <div>
                        {/* Unboxed metadata per anti-pill guidelines */}
                        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                          <span className="font-bold text-[#581C87] uppercase tracking-wider">{art.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.region}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.date}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.readTime}</span>
                        </div>

                        <h4 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#581C87] transition-colors leading-snug mb-1.5">
                          {art.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                          {art.summary}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-amber-800 font-medium flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                          God's Perspective included
                        </span>

                        <span className="font-bold text-[#581C87] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Read full article &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* MANDATORY FOUNDER SECTION: Prophet Do All in white suit */}
            <div className="bg-white border-2 border-amber-400/60 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-gradient-to-r from-[#3B0764] to-[#581C87] text-white p-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mb-0.5">
                  General Overseer & Founder
                </div>
                <h3 className="font-royal text-lg font-bold">
                  Prophet Do All
                </h3>
              </div>

              {/* Photo of Reverend Listowel in White Suit */}
              <div className="relative">
                <img
                  src={founderData.imageUrl}
                  alt="Reverend Listowel Sarsah Adentwi-EdIi"
                  className="w-full h-72 object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white">
                  <div className="font-bold text-sm font-royal">{founderData.name}</div>
                  <div className="text-[11px] text-amber-300 font-semibold">{founderData.role}</div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Founder's Motto
                  </div>
                  <blockquote className="font-serif italic text-stone-900 text-xs sm:text-sm leading-snug">
                    "{founderData.motto}"
                  </blockquote>
                  <div className="text-right text-xs font-bold text-[#581C87] mt-1">
                    — {founderData.scriptureReference}
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200 text-center">
                  <div className="text-xs font-serif font-bold text-amber-900">
                    Slogan: "{founderData.slogan}"
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Join our weekly prophetic broadcasts on The Royals TV and receive your impartation of divine victory.
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigateTo('founder')}
                    className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors text-center"
                  >
                    Founder's Story
                  </button>
                  <button
                    onClick={() => openDonationModal()}
                    className="flex-1 py-2 bg-[#581C87] hover:bg-[#6B21A8] text-white text-xs font-bold rounded-lg transition-colors text-center"
                  >
                    Partner Free Will
                  </button>
                </div>
              </div>
            </div>

            {/* The Royals TV Mini Feature */}
            <div className="bg-[#111116] text-white rounded-xl p-5 border border-purple-900/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-rose-500" />
                  <span className="font-royal text-sm font-bold tracking-wide">THE ROYALS TV</span>
                </div>
                <span className="flex items-center gap-1 bg-rose-600 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded text-white animate-pulse">
                  ON AIR
                </span>
              </div>

              <div className="relative rounded-lg overflow-hidden mb-3 aspect-video bg-stone-900">
                <img
                  src="/src/assets/images/royals_tv_studio_1793931074136.jpg"
                  alt="Royals TV Studio"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => navigateTo('tv')}
                  className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500 group-hover:scale-110 transition-transform flex items-center justify-center text-stone-950 font-bold shadow-lg">
                    ▶
                  </div>
                </button>
              </div>

              <h5 className="font-serif font-bold text-sm text-stone-100 mb-1">
                24/7 Global Worship, Praise, Sermons & Celestial Ambience
              </h5>
              <p className="text-xs text-stone-400 mb-3">
                Continuous auto-playing broadcast across continental and celestial channels.
              </p>

              <button
                onClick={() => navigateTo('tv')}
                className="w-full py-2 bg-gradient-to-r from-[#581C87] to-amber-600 hover:opacity-95 text-white font-bold text-xs rounded-lg transition-all text-center cursor-pointer"
              >
                Watch Royals TV Live
              </button>
            </div>

            {/* From Our Neighbours Quick Spotlight */}
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Mark 12:31 Feature
                </span>
                <span className="text-xs text-stone-400">Harmonized</span>
              </div>
              <h4 className="font-royal font-bold text-sm text-stone-900 mb-2">
                From Our Neighbours
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Inspirational messages from other world faiths reflected in the light of the Holy Bible to foster peace, love, and divine truth.
              </p>
              <button
                onClick={() => navigateTo('neighbours')}
                className="w-full py-2 border border-stone-300 hover:border-[#581C87] hover:text-[#581C87] text-stone-800 text-xs font-bold rounded-lg transition-colors text-center"
              >
                Explore Interfaith Wisdom
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
