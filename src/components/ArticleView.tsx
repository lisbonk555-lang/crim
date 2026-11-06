import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NewsArticle } from '../types';
import { founderData } from '../data/founderData';
import {
  Share2,
  Bookmark,
  Heart,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Check,
  Send,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface ArticleViewProps {
  article: NewsArticle;
  onBack: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  const { openDonationModal, navigateTo, articles, showNotification } = useApp();
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const articleUrl = typeof window !== 'undefined' ? `${window.location.origin}/news/${article.slug}` : `https://churchofroyals.com/news/${article.slug}`;

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'x' | 'telegram' | 'copy') => {
    const text = `${article.title} - Read with God's Perspective on Church of Royals International Ministry: ${articleUrl}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank');
        break;
      case 'x':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(articleUrl);
        setCopied(true);
        showNotification('Article link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.region === article.region))
    .slice(0, 3);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back and Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6 text-sm text-stone-600">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-semibold text-stone-800 hover:text-[#581C87] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All News</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-amber-700 font-semibold uppercase">{article.category}</span>
            <span aria-hidden="true" className="text-stone-300">/</span>
            <span className="text-stone-500">{article.region}</span>
            <span aria-hidden="true" className="text-stone-300">/</span>
            <span className="font-mono text-stone-400">SEO: /news/{article.slug}</span>
          </div>
        </div>

        {/* Article Layout Grid (70% main body / 30% margin sidebar per museum/editorial guidelines) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Editorial Canvas (8 cols) */}
          <article className="lg:col-span-8 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
            {/* Meta Category & Region */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
              <span className="font-bold text-[#581C87] uppercase tracking-wider">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.region}</span>
              <span aria-hidden="true">·</span>
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight mb-4 text-balance">
              {article.title}
            </h1>

            {/* Standfirst / Summary Deck */}
            <p className="text-lg text-stone-700 font-serif leading-relaxed italic border-b border-stone-200 pb-5 mb-6">
              {article.summary}
            </p>

            {/* Author Byline & Social Action Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-stone-200 mb-6 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-700">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-stone-900">{article.author}</div>
                  <div className="text-[11px] text-stone-500">Verified International Bureau</div>
                </div>
              </div>

              {/* Share & Bookmark buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('x')}
                  className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                  title="Share on X"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  title="Share on Facebook"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors flex items-center gap-1"
                  title="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <ExternalLink className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Link'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsBookmarked(!isBookmarked);
                    showNotification(isBookmarked ? 'Removed from saved reading' : 'Saved to your personal reading list');
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                  title="Bookmark Article"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative mb-8 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-2.5 bg-stone-50 text-[11px] font-sans text-stone-500 border-t border-stone-200 flex items-center justify-between">
                <span>Featured Dispatch: Global Editorial Coverage for Church of Royals</span>
                <span className="font-mono text-stone-400">COR INDEX #{article.id}</span>
              </div>
            </div>

            {/* Full Article Content */}
            <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed font-sans space-y-4 mb-10 text-[16px]">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#581C87]' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* MANDATORY: GOD'S PERSPECTIVE SECTION ON EACH ARTICLE */}
            <div className="my-10 bg-gradient-to-br from-[#FAF5FF] to-[#FFFBEB] border-2 border-amber-400/50 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-300/40">
                <div className="w-10 h-10 rounded-full bg-[#581C87] text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-royal text-lg sm:text-xl font-bold text-[#3B0764] flex items-center gap-2">
                    GOD'S PERSPECTIVE
                  </h3>
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                    Biblical Interpretation & Prophetic Alignment
                  </p>
                </div>
              </div>

              {/* 150-250 Word Christian Interpretation */}
              <div className="text-stone-800 leading-relaxed text-[15px] sm:text-[16px] mb-6 font-serif">
                {article.godPerspective.interpretation}
              </div>

              {/* Bible Quotations with Verse Reference */}
              <div className="space-y-3 mb-5">
                <div className="text-xs uppercase font-bold tracking-wider text-amber-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Scriptural Foundations</span>
                </div>
                {article.godPerspective.scriptures.map((sc, i) => (
                  <div key={i} className="bg-white/90 border border-amber-200 rounded-lg p-3.5 shadow-xs">
                    <p className="text-stone-900 font-serif italic text-sm mb-1">
                      "{sc.verse}"
                    </p>
                    <p className="text-xs font-bold text-[#581C87] font-sans">
                      — {sc.reference}
                    </p>
                  </div>
                ))}
              </div>

              {/* Prophetic Action */}
              <div className="pt-4 border-t border-amber-200/60 flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                <strong className="text-[#581C87] shrink-0 font-bold">Prophetic Decree:</strong>
                <span>{article.godPerspective.propheticAction}</span>
              </div>
            </div>

            {/* Free Will Donation Button at bottom of EACH article */}
            <div className="bg-[#111116] text-white rounded-xl p-6 sm:p-8 text-center my-8 border border-amber-500/30">
              <div className="max-w-xl mx-auto space-y-3">
                <span className="text-amber-400 font-royal font-bold text-xs uppercase tracking-widest">
                  Kingdom Support
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Partner with Church of Royals International Ministry
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Your Free Will seed empowers global news broadcasting with biblical truth, television evangelism, orphan care, and apostolic missions. Every donor is consecrated as a Royal Ambassador.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => openDonationModal()}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-lg shadow-lg transition-transform hover:scale-102 flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-stone-950" />
                    <span>Give a Free Will Donation (Paystack Live)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Related News */}
            {relatedArticles.length > 0 && (
              <div className="pt-8 border-t border-stone-200">
                <h3 className="font-royal text-lg font-bold text-stone-900 mb-4">
                  Related Global Stories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        navigateTo('news-detail', rel.slug);
                      }}
                      className="group cursor-pointer border border-stone-200 rounded-lg p-3 hover:border-[#581C87] transition-all bg-stone-50"
                    >
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-28 object-cover rounded mb-2 group-hover:opacity-90"
                      />
                      <div className="text-[11px] font-bold text-amber-700 uppercase mb-1">
                        {rel.category}
                      </div>
                      <h5 className="font-serif font-bold text-xs text-stone-900 line-clamp-2 group-hover:text-[#581C87]">
                        {rel.title}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Right Sidebar: MANDATORY FOUNDER SECTION on each article page (Reverend Listowel in white suit) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Message from Prophet Do All */}
            <div className="bg-white border-2 border-purple-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-gradient-to-r from-[#3B0764] to-[#581C87] text-white p-4">
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-300">
                  Prophetic Overseer
                </span>
                <h3 className="font-royal text-lg font-bold leading-tight">
                  Message from Prophet Do All
                </h3>
              </div>

              {/* Real Picture Uploaded by Founder */}
              <div className="relative">
                <img
                  src={founderData.imageUrl}
                  alt="Reverend Listowel Sarsah Adentwi-EdIi (A.K.A Prophet Do All)"
                  className="w-full h-80 object-cover object-top"
                />
                <div className="p-3 bg-[#1C0633] text-white border-t-2 border-amber-400">
                  <div className="font-royal font-bold text-sm text-white">
                    Reverend Listowel Sarsah Adentwi-EdIi
                  </div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">
                    A.K.A Prophet Do All
                  </div>
                  <div className="text-xs text-stone-200 font-serif italic mt-1">
                    "I can do all things through Christ who strengthens me" — Philippians 4:13
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Motto & Slogan */}
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 mb-0.5">
                    Church of Royals Proclamation
                  </div>
                  <div className="text-sm font-serif font-bold text-stone-900">
                    "{founderData.slogan}"
                  </div>
                  <div className="text-xs text-[#581C87] font-semibold mt-1">
                    24/7 Global Online Virtual Church
                  </div>
                </div>

                {/* Prophetic Exhortation for the reader */}
                <p className="text-xs text-stone-600 leading-relaxed">
                  "Beloved reader, do not let worldly turbulence fill your heart with anxiety. Christ has given you kingdom dominion. Stand firm as a Royal Ambassador in your city."
                </p>

                <button
                  onClick={() => navigateTo('founder')}
                  className="w-full py-2 bg-stone-100 hover:bg-[#581C87] hover:text-white text-stone-800 text-xs font-bold rounded-lg transition-colors"
                >
                  Read Prophet Do All's Full Biography
                </button>
              </div>
            </div>

            {/* Quick Free Will Donation Widget */}
            <div className="bg-gradient-to-br from-[#2E0854] to-[#111116] text-white rounded-xl p-5 border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-2">
                <Heart className="w-4 h-4 fill-amber-400" />
                <span>Free Will Giving</span>
              </div>
              <h4 className="font-serif font-bold text-base text-white mb-2">
                Sow Your Kingdom Seed
              </h4>
              <p className="text-xs text-stone-300 mb-4 leading-relaxed">
                Enter any amount in GHS, USD, NGN, GBP or EUR. Receive instant royal title and credentials.
              </p>
              <button
                onClick={() => openDonationModal()}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Donate Now via Paystack
              </button>
            </div>

            {/* Royal Ambassador Callout */}
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <div className="flex items-center gap-2 text-[#581C87] text-xs font-bold uppercase mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Royal Ambassador Fellowship</span>
              </div>
              <h4 className="font-royal font-bold text-stone-900 text-sm mb-2">
                Are You Logged In?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Unlock the global church directory with interactive maps and private contact info, join 1-on-1 member chats, and join group video calls.
              </p>
              <button
                onClick={() => navigateTo('member-portal')}
                className="w-full py-2 border border-[#581C87] text-[#581C87] hover:bg-[#581C87] hover:text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Enter Royal Portal
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
