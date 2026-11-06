import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Member, Post, RoyalBadgeLevel } from '../types';
import { getBadgeDetails } from '../utils/royalBadges';
import {
  Crown,
  QrCode,
  Share2,
  Users,
  MessageSquare,
  Video,
  Phone,
  Shield,
  Heart,
  Send,
  Lock,
  Search,
  PlusCircle,
  Copy,
  Check,
  LogOut,
  Sparkles,
  Printer,
  Compass,
  Briefcase,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';

export const MemberPortal: React.FC = () => {
  const {
    currentMember,
    members,
    loginMember,
    logoutMember,
    posts,
    addPost,
    toggleLikePost,
    addPrayerHand,
    chatMessages,
    sendMessage,
    startCall,
    updateMemberProfile,
    openDonationModal,
    showNotification,
    navigateTo
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active portal tab
  const [portalTab, setPortalTab] = useState<'id-card' | 'feed' | 'directory' | 'chat' | 'referrals' | 'settings'>('id-card');

  // Post form
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<Post['category']>('Fellowship');

  // Chat state
  const [activeChannelId, setActiveChannelId] = useState<string>('group-ghana');
  const [chatInputText, setChatInputText] = useState('');

  // Search members state
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [selectedInterestFilter, setSelectedInterestFilter] = useState('All');

  // Copied referral link flag
  const [copiedLink, setCopiedLink] = useState(false);

  // If NOT logged in, show Login Form with Quick Ambassador demo switch
  if (!currentMember) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError('');
      const success = loginMember(loginEmail, loginPassword);
      if (!success) {
        setLoginError('Invalid credentials. If you are a new donor, check your temporary password from your donation receipt, or use the demo login below.');
      }
    };

    return (
      <div className="bg-[#FAF9F6] min-h-screen py-12 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2E0854] via-[#581C87] to-[#1C0633] text-white p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto mb-2">
              <Crown className="w-6 h-6" />
            </div>
            <h2 className="font-royal text-xl font-bold tracking-tight">
              ROYAL AMBASSADOR LOGIN
            </h2>
            <p className="text-xs text-stone-200 font-serif mt-1">
              Church of Royals International Ministry
            </p>
          </div>

          <div className="p-6 space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Registered Email Address (Username)
                </label>
                <input
                  type="email"
                  required
                  placeholder="ambassador@churchofroyals.org"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:border-[#581C87]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:border-[#581C87]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Enter Royal Sanctuary</span>
              </button>
            </form>

            <div className="pt-4 border-t border-stone-200 text-center space-y-3">
              <div className="text-xs text-stone-500">
                Don’t have an account yet? Make a Free Will Donation to automatically generate credentials and receive your Royal Title.
              </div>
              <button
                onClick={() => openDonationModal()}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Make Free Will Donation & Join As Ambassador
              </button>

              {/* Instant Demo Switch for fast verification */}
              <div className="pt-2 text-[11px] text-stone-400 border-t border-dashed border-stone-200">
                <span className="block mb-1 font-semibold text-stone-600">Quick Demo Accounts:</span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <button
                    onClick={() => loginMember('kwame.osei@churchofroyals.org', 'demo')}
                    className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-mono"
                  >
                    Kwame (Ghana)
                  </button>
                  <button
                    onClick={() => loginMember('beatrice.adeyemi@churchofroyals.org', 'demo')}
                    className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-mono"
                  >
                    Beatrice (Nigeria)
                  </button>
                  <button
                    onClick={() => loginMember('edward.vance@churchofroyals.org', 'demo')}
                    className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-mono"
                  >
                    Edward (UK)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN AMBASSADOR SUITE
  const badgeDetails = getBadgeDetails(currentMember.badgeLevel);
  const referralLink = `https://churchofroyals.com/join/${currentMember.referralCode}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    showNotification('Unique Royal Ambassador invite link copied!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    addPost(newPostContent.trim(), newPostCategory);
    setNewPostContent('');
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    sendMessage(activeChannelId, chatInputText.trim());
    setChatInputText('');
  };

  // Channels
  const channels = [
    { id: 'group-ghana', name: '🇬🇭 Ghana Royal Chapter', type: 'Country' },
    { id: 'group-nigeria', name: '🇳🇬 Nigeria Royal Chapter', type: 'Country' },
    { id: 'group-uk-europe', name: '🇬🇧 UK & Europe Chapter', type: 'Country' },
    { id: 'group-business', name: '💼 Business & Enterprise', type: 'Interest' },
    { id: 'group-prayer', name: '🔥 Midnight Prayer Warriors', type: 'Interest' },
    { id: 'group-education', name: '🎓 Academic & Mentorship', type: 'Interest' },
  ];

  const currentChannelMessages = chatMessages[activeChannelId] || [];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 1. TOP AMBASSADOR PROFILE BAR */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B0764] to-[#581C87] border-2 border-amber-400 text-amber-300 flex items-center justify-center text-xl font-bold font-royal shadow-sm">
              <Crown className="w-8 h-8" />
            </div>

            <div>
              {/* Royal Title Assignment */}
              <div className="flex items-center gap-2">
                <h2 className="font-royal text-xl sm:text-2xl font-black text-[#3B0764]">
                  {currentMember.royalTitle}
                </h2>
              </div>

              {/* Ambassador badge */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 mt-1">
                <span className="font-bold text-amber-800">
                  Royal Ambassador of Church of Royals — {currentMember.town}, {currentMember.country}
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="font-mono text-stone-500">{currentMember.memberIdNumber}</span>
              </div>

              {/* Royal Badge Distinction (NO raw amounts displayed!) */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(badgeDetails.crowns)].map((_, i) => (
                    <Crown key={i} className="w-4 h-4 fill-amber-400 text-amber-600" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800">
                  {badgeDetails.name} ({badgeDetails.tierRank})
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openDonationModal()}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-stone-950 font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>Sow Additional Seed</span>
            </button>

            <button
              onClick={logoutMember}
              className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. TAB NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-stone-200">
          <button
            onClick={() => setPortalTab('id-card')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              portalTab === 'id-card'
                ? 'bg-[#581C87] text-white shadow-xs'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Digital ID Card</span>
          </button>

          <button
            onClick={() => setPortalTab('feed')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              portalTab === 'feed'
                ? 'bg-[#581C87] text-white shadow-xs'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Fellowship Feed</span>
          </button>

          <button
            onClick={() => setPortalTab('chat')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              portalTab === 'chat'
                ? 'bg-[#581C87] text-white shadow-xs'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Private Chat & Calls</span>
          </button>

          <button
            onClick={() => setPortalTab('directory')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              portalTab === 'directory'
                ? 'bg-[#581C87] text-white shadow-xs'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Find Members</span>
          </button>

          <button
            onClick={() => setPortalTab('referrals')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              portalTab === 'referrals'
                ? 'bg-[#581C87] text-white shadow-xs'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Invitation Link ({currentMember.referralCount})</span>
          </button>
        </div>

        {/* 3. TAB CONTENT */}

        {/* TAB A: DIGITAL ID CARD (Downloadable & Printable) */}
        {portalTab === 'id-card' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* The Physical Card Canvas */}
            <div className="md:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-royal text-lg font-bold text-stone-900">
                  Official Digital Ambassador Credential
                </h3>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
              </div>

              {/* ID Card Front */}
              <div className="relative rounded-2xl p-6 sm:p-7 text-white overflow-hidden shadow-2xl bg-gradient-to-br from-[#1C0633] via-[#3B0764] to-[#120422] border-2 border-amber-400">
                {/* Background Watermark Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Top Strip */}
                <div className="flex items-start justify-between relative z-10 border-b border-amber-400/30 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
                      <Crown className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-royal text-sm sm:text-base font-black tracking-wider text-amber-300">
                        CHURCH OF ROYALS
                      </div>
                      <div className="text-[10px] tracking-widest uppercase font-semibold text-stone-300">
                        International Ministry · Royal Priesthood
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded text-[10px] font-bold uppercase tracking-wider">
                      {currentMember.badgeLevel}
                    </span>
                  </div>
                </div>

                {/* Middle details */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative z-10 mb-4">
                  <div className="sm:col-span-8 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                      Title & Legal Holder
                    </span>
                    <h4 className="font-royal text-lg sm:text-xl font-bold text-white tracking-wide">
                      {currentMember.royalTitle}
                    </h4>

                    <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-stone-300">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-amber-400 block">
                          Jurisdiction
                        </span>
                        <span className="font-semibold">{currentMember.town}, {currentMember.country}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-amber-400 block">
                          Member ID Number
                        </span>
                        <span className="font-mono font-bold text-white">{currentMember.memberIdNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* QR & Security Seal */}
                  <div className="sm:col-span-4 flex flex-col items-center justify-center sm:border-l sm:border-amber-400/20 pl-2">
                    <div className="w-20 h-20 bg-white p-1.5 rounded-lg shadow-md flex items-center justify-center">
                      <QrCode className="w-full h-full text-stone-900" />
                    </div>
                    <span className="text-[9px] text-amber-300 font-mono mt-1">VERIFIED AMBASSADOR</span>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-3 border-t border-amber-400/30 flex items-center justify-between text-[10px] text-stone-300 relative z-10">
                  <span>Motto: "I can do all things through Christ"</span>
                  <span className="text-amber-400 font-serif italic font-bold">
                    "You Are A Property of God"
                  </span>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="mt-4 text-xs text-stone-500 leading-relaxed">
                * <strong>Statutory Royal Protocol:</strong> This title is for use and recognised ONLY within the Church of Royals Ecosystem and its international fellowship branches.
              </div>
            </div>

            {/* Right: Badge Progression & Privileges */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-amber-600" />
                  <h4 className="font-royal font-bold text-stone-900 text-sm">
                    Royal Badge Hierarchy
                  </h4>
                </div>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  Badges represent tiers of covenant participation in kingdom advancement. They are awarded based on faithful Free Will sowing and displayed via royal crown emblems.
                </p>

                <div className="space-y-2 text-xs">
                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${currentMember.badgeLevel === 'Crown Royal Ambassador' ? 'bg-amber-50 border-amber-400' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">👑👑👑👑👑👑</span>
                      <span className="font-bold">Crown Royal Ambassador</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-amber-700">Tier 6</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${currentMember.badgeLevel === 'Diamond Royal' ? 'bg-purple-50 border-purple-400' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-bold">👑👑👑👑👑</span>
                      <span className="font-bold">Diamond Royal</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-purple-700">Tier 5</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${currentMember.badgeLevel === 'Gold Royal' ? 'bg-yellow-50 border-yellow-400' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-bold">👑👑👑👑</span>
                      <span className="font-bold">Gold Royal</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-yellow-700">Tier 4</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${currentMember.badgeLevel === 'Silver Royal' ? 'bg-stone-100 border-stone-300' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-400 font-bold">👑👑👑</span>
                      <span className="font-bold">Silver Royal</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-stone-600">Tier 3</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${currentMember.badgeLevel === 'Bronze Royal' ? 'bg-amber-50 border-amber-300' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-700 font-bold">👑👑</span>
                      <span className="font-bold">Bronze Royal</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-amber-800">Tier 2</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${currentMember.badgeLevel === 'Seed Royal' ? 'bg-emerald-50 border-emerald-400' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">👑</span>
                      <span className="font-bold">Seed Royal</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700">Level 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB B: FELLOWSHIP SOCIAL FEED */}
        {portalTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Feed stream (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              {/* Post Creator Box */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#581C87] uppercase mb-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Share Testimony, Prayer Request or Business Connect</span>
                </div>

                <form onSubmit={handleNewPost} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder={`What is God doing in your life, ${currentMember.royalTitle}?`}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-hidden focus:border-[#581C87]"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-stone-500 font-semibold">Channel:</span>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value as Post['category'])}
                        className="px-2.5 py-1 border border-stone-300 rounded-lg text-xs bg-stone-50"
                      >
                        <option value="Fellowship">Fellowship & Encouragement</option>
                        <option value="Testimony">Testimony of Victory</option>
                        <option value="Prayer Request">Prayer Request</option>
                        <option value="Business Connect">Business Connect</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish Royal Post</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Posts Stream */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3"
                  >
                    {/* Author header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-[#581C87] font-bold flex items-center justify-center font-royal text-sm border border-purple-200">
                          {post.authorName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-royal font-bold text-sm text-stone-900">
                            {post.authorTitle}
                          </div>
                          <div className="text-xs text-stone-500 flex items-center gap-1.5">
                            <span>{post.authorTown}, {post.authorCountry}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-bold text-amber-700">{post.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-sm text-stone-800 leading-relaxed whitespace-pre-wrap font-sans">
                      {post.content}
                    </p>

                    {/* Interaction Buttons */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLikePost(post.id)}
                          className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                            post.hasLiked ? 'text-red-600 font-bold' : 'hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-red-600' : ''}`} />
                          <span>{post.likes} Blessings</span>
                        </button>

                        <button
                          onClick={() => addPrayerHand(post.id)}
                          className="flex items-center gap-1.5 hover:text-amber-600 transition-colors cursor-pointer"
                        >
                          <span>🙏</span>
                          <span>{post.prayerHandCount} Amen / Agree</span>
                        </button>

                        <button
                          onClick={() => showNotification('Comments opened in fellowship thread.')}
                          className="flex items-center gap-1.5 hover:text-[#581C87] transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.commentsCount} Comments</span>
                        </button>
                      </div>

                      <button
                        onClick={() => startCall(post.authorName, post.authorTitle, true)}
                        className="text-[#581C87] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Direct Call</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Fellowship Groups & Topics (Education, Jobs, Mentorship) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
                <h4 className="font-royal font-bold text-sm text-stone-900">
                  Kingdom Marketplace Guilds
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Fellowship extends into corporate leadership, technology, education, and family governance.
                </p>

                <div className="space-y-2 text-xs">
                  <div
                    onClick={() => {
                      setActiveChannelId('group-business');
                      setPortalTab('chat');
                    }}
                    className="p-2.5 rounded-lg border border-stone-200 hover:border-[#581C87] bg-stone-50 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-amber-700" />
                      <span className="font-bold">Business & Investments</span>
                    </div>
                    <span className="text-stone-400">Enter &rarr;</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveChannelId('group-education');
                      setPortalTab('chat');
                    }}
                    className="p-2.5 rounded-lg border border-stone-200 hover:border-[#581C87] bg-stone-50 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-700" />
                      <span className="font-bold">Education & Mentorship</span>
                    </div>
                    <span className="text-stone-400">Enter &rarr;</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveChannelId('group-prayer');
                      setPortalTab('chat');
                    }}
                    className="p-2.5 rounded-lg border border-stone-200 hover:border-[#581C87] bg-stone-50 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-purple-700" />
                      <span className="font-bold">Midnight Intercessors</span>
                    </div>
                    <span className="text-stone-400">Enter &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB C: PRIVATE CHAT & WEBRTC CALLS */}
        {portalTab === 'chat' && (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
            {/* Left Channel Rail (4 cols) */}
            <div className="md:col-span-4 border-r border-stone-200 p-4 space-y-3 bg-stone-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-royal font-bold text-sm text-stone-900">
                  Royal Fellowship Rooms
                </span>
                <span className="text-[11px] text-stone-400">Encrypted</span>
              </div>

              <div className="space-y-1">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannelId(ch.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      activeChannelId === ch.id
                        ? 'bg-[#581C87] text-white shadow-xs'
                        : 'hover:bg-stone-200/70 text-stone-700'
                    }`}
                  >
                    <span className="truncate">{ch.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeChannelId === ch.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      {ch.type}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                  1-on-1 WebRTC Calls
                </span>
                <button
                  onClick={() => startCall('Lady Beatrice Adeyemi', 'Her Royal Majesty Lady Beatrice Adeyemi', true)}
                  className="w-full py-2 px-3 bg-purple-50 hover:bg-purple-100 text-[#581C87] font-bold text-xs rounded-lg flex items-center justify-center gap-2 mb-2 transition-colors cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Call Lady Beatrice (Lagos)</span>
                </button>
                <button
                  onClick={() => startCall('Sir Edward Vance', 'His Royal Majesty Sir Edward Vance', false)}
                  className="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Audio Call Sir Edward (London)</span>
                </button>
              </div>
            </div>

            {/* Right Chat Conversation (8 cols) */}
            <div className="md:col-span-8 flex flex-col justify-between p-4 sm:p-6">
              {/* Channel Header */}
              <div className="pb-3 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-royal font-bold text-sm text-stone-900">
                    {channels.find((c) => c.id === activeChannelId)?.name || 'Royal Sanctuary'}
                  </h4>
                  <div className="text-[11px] text-stone-500">
                    Open to all verified Royal Ambassadors
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startCall('Chapter Assembly', 'Royal Chapter Conference', true)}
                    className="p-2 bg-purple-100 hover:bg-purple-200 text-[#581C87] rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Launch WebRTC Group Video Call"
                  >
                    <Video className="w-4 h-4" />
                    <span className="hidden sm:inline">Launch WebRTC Room</span>
                  </button>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[380px] pr-2">
                {currentChannelMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-stone-400 mb-0.5">
                      {msg.senderName} · {msg.timestamp}
                    </span>
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.isMine
                          ? 'bg-[#581C87] text-white rounded-br-none shadow-xs'
                          : 'bg-stone-100 text-stone-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} className="pt-3 border-t border-stone-200 flex gap-2">
                <input
                  type="text"
                  placeholder="Type an encouraging message to the Royal brethren..."
                  value={chatInputText}
                  onChange={(e) => setChatInputText(e.target.value)}
                  className="flex-1 px-3 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#581C87]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB D: FIND OTHER MEMBERS (Privacy enforced) */}
        {portalTab === 'directory' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-royal text-lg font-bold text-stone-900">
                  Global Royal Ambassadors Network
                </h3>
                <p className="text-xs text-stone-500">
                  Connect for business, mentorship, fellowship and joint apostolic projects. WhatsApp numbers remain private by default.
                </p>
              </div>

              <div className="w-full sm:w-72 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, town, country..."
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-hidden focus:border-[#581C87]"
                />
              </div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members
                .filter(
                  (m) =>
                    m.id !== currentMember.id &&
                    (memberSearchQuery === '' ||
                      m.fullName.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
                      m.town.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
                      m.country.toLowerCase().includes(memberSearchQuery.toLowerCase()))
                )
                .map((ambassador) => {
                  const badge = getBadgeDetails(ambassador.badgeLevel);
                  return (
                    <div
                      key={ambassador.id}
                      className="border border-stone-200 rounded-xl p-4 hover:border-[#581C87] transition-all bg-stone-50/50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-[#581C87] font-bold flex items-center justify-center font-royal text-sm">
                              {ambassador.fullName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-royal font-bold text-xs sm:text-sm text-stone-900">
                                {ambassador.royalTitle}
                              </h4>
                              <div className="text-[11px] text-stone-500">
                                {ambassador.town}, {ambassador.country}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 my-2">
                          {[...Array(badge.crowns)].map((_, i) => (
                            <Crown key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
                          ))}
                          <span className="text-[11px] font-bold text-stone-700 ml-1">
                            {ambassador.badgeLevel}
                          </span>
                        </div>

                        {ambassador.bio && (
                          <p className="text-xs text-stone-600 line-clamp-2 my-2">
                            "{ambassador.bio}"
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-stone-200 flex gap-2">
                        <button
                          onClick={() => {
                            setActiveChannelId('group-ghana');
                            setPortalTab('chat');
                            showNotification(`Opened private channel with ${ambassador.royalTitle}`);
                          }}
                          className="flex-1 py-1.5 bg-white border border-stone-300 hover:border-[#581C87] text-stone-800 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Message</span>
                        </button>
                        <button
                          onClick={() => startCall(ambassador.fullName, ambassador.royalTitle, true)}
                          className="p-1.5 bg-purple-50 hover:bg-purple-100 text-[#581C87] rounded-lg transition-colors cursor-pointer"
                          title="Video Call"
                        >
                          <Video className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB E: REFERRAL / INVITATION LINK SYSTEM */}
        {portalTab === 'referrals' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="font-royal text-xl font-bold text-stone-900">
                Your Unique Royal Ambassador Invitation Link
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Invite friends, family, and associates into the Church of Royals ecosystem. When someone sows a Free Will donation using your link, you are credited as their inviting Ambassador.
              </p>
              <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] font-semibold text-amber-900">
                Note: There is NO financial commission. This is strictly for apostolic connection tracking, fellowship credit, and soul winning.
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                Your Personal Referral URL:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold text-stone-800"
                />
                <button
                  onClick={handleCopyReferral}
                  className="px-4 py-2 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Referrals Scoreboard */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="font-royal text-2xl font-black text-[#3B0764]">
                  {currentMember.referralCount}
                </div>
                <div className="text-xs text-stone-600 font-semibold mt-1">
                  Fellowship Souls Welcomed
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="font-royal text-2xl font-black text-amber-700">
                  {badgeDetails.name}
                </div>
                <div className="text-xs text-stone-600 font-semibold mt-1">
                  Active Ambassador Standing
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
