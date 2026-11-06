import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getIncorporationDuration } from '../utils/incorporationTimer';
import {
  Globe,
  Clock,
  Tv,
  Crown,
  Heart,
  Menu,
  X,
  Compass,
  Users,
  Search,
  UserCheck,
  Mail,
  Calendar,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    openDonationModal,
    currentMember,
    currentLocation,
    setCurrentLocation,
    searchQuery,
    setSearchQuery,
    setActiveCategory
  } = useApp();

  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');
  const [incDuration, setIncDuration] = useState(getIncorporationDuration());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setDateString(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
      setIncDuration(getIncorporationDuration(now));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const locations = [
    'Accra (Ghana HQ)',
    'Kumasi (Cathedral)',
    'London (Europe)',
    'New York / Dallas (Americas)',
    'Lagos / Abuja (Nigeria)',
    'Nairobi (East Africa)',
    'Johannesburg (South Africa)',
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#120422] text-white border-b-2 border-amber-400/80 shadow-xl">
      {/* 1. TOP OPERATIONAL UTILITY & INCORPORATION COVENANT BAR */}
      <div className="bg-[#0B0214] text-stone-300 text-[11px] border-b border-purple-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Official Incorporation Timer + Email Address */}
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            {/* Incorporation Milestone Timer */}
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                <strong className="text-white">Incorporated in Ghana 12th August 2013:</strong>{' '}
                <span className="font-mono text-amber-300">{incDuration.formatted}</span> of Covenant Grace
              </span>
            </div>

            {/* Official Email */}
            <a
              href="mailto:info@churchofroyals.org"
              className="flex items-center gap-1 text-stone-300 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span className="font-mono">info@churchofroyals.org</span>
            </a>
          </div>

          {/* Right: Date, Location, Clock & Slogan */}
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-400 font-serif italic hidden md:inline">
              "You Are A Property of God"
            </span>

            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLocationSelectorOpen(!isLocationSelectorOpen)}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer text-stone-300"
                title="Select Edition"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate max-w-[130px]">{currentLocation}</span>
              </button>

              {isLocationSelectorOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-stone-900 border border-amber-500/40 rounded-lg shadow-2xl py-1 z-50">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-amber-400 border-b border-stone-800">
                    Jurisdiction Edition
                  </div>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setCurrentLocation(loc);
                        setIsLocationSelectorOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-stone-200 hover:bg-[#3B0764] hover:text-amber-300 transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 font-mono text-amber-400 font-bold">
              <Clock className="w-3 h-3" />
              <span>{timeString}</span>
            </div>

            {currentMember ? (
              <button
                onClick={() => navigateTo('member-portal')}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="truncate max-w-[120px]">{currentMember.royalTitle}</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('member-portal')}
                className="hover:text-amber-300 transition-colors text-amber-400 font-semibold"
              >
                Ambassador Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN GRAND ROYAL NAVIGATION (ROYAL PURPLE & GOLD AESTHETIC) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Royal Crest & Name */}
          <button
            onClick={() => {
              setActiveCategory('All');
              navigateTo('home');
            }}
            className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#1C0633] rounded-[10px] flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Crown className="w-6 h-6 fill-amber-400/30" />
              </div>
            </div>
            <div>
              <div className="font-royal text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors leading-none flex items-center gap-1.5">
                <span>CHURCH OF ROYALS</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-amber-400 mt-1">
                International Ministry · Slogan: You Are A Property of God
              </div>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Navigating to Homepage sections or dedicated pages) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold text-stone-200">
            <button
              onClick={() => {
                setActiveCategory('All');
                navigateTo('home');
              }}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer ${
                currentRoute === 'home' ? 'text-amber-400' : ''
              }`}
            >
              Royal Hub
            </button>

            <button
              onClick={() => {
                navigateTo('tv');
              }}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                currentRoute === 'tv' ? 'text-amber-400' : ''
              }`}
            >
              <Tv className="w-4 h-4 text-rose-500" />
              <span>Royals TV</span>
            </button>

            <button
              onClick={() => {
                navigateTo('directory');
              }}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                currentRoute === 'directory' ? 'text-amber-400' : ''
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Church Directory</span>
            </button>

            <button
              onClick={() => navigateTo('founder')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer ${
                currentRoute === 'founder' ? 'text-amber-400' : ''
              }`}
            >
              Prophet Do All
            </button>

            <button
              onClick={() => navigateTo('neighbours')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer ${
                currentRoute === 'neighbours' ? 'text-amber-400' : ''
              }`}
            >
              From Our Neighbours
            </button>

            <button
              onClick={() => navigateTo('member-portal')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                currentRoute === 'member-portal' ? 'text-amber-400' : ''
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Royal Ambassador Portal</span>
            </button>
          </nav>

          {/* Zone 3: Search + Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-[#2E0854] rounded-lg px-2.5 py-1.5 border border-amber-400/50">
                  <Search className="w-4 h-4 text-amber-400 shrink-0 mr-1.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 10,000+ stories & scriptures..."
                    autoFocus
                    className="bg-transparent text-xs text-white focus:outline-hidden w-36 sm:w-52"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchInput(false);
                    }}
                    className="text-stone-400 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-stone-300 hover:text-amber-400 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Search 10,000+ news with Bible perspective"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Primary Action Button: Free Will Giving */}
            <button
              onClick={() => openDonationModal()}
              className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 rounded-xl shadow-lg border border-amber-300 transition-transform hover:scale-102 flex items-center gap-1.5 whitespace-nowrap cursor-pointer font-royal"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>Give Free Will Seed</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1C0633] border-b border-purple-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveCategory('All');
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-stone-200"
            >
              Royal Hub (Home)
            </button>
            <button
              onClick={() => {
                navigateTo('tv');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-stone-200 flex items-center gap-1.5"
            >
              <Tv className="w-3.5 h-3.5 text-rose-500" />
              <span>The Royals TV</span>
            </button>
            <button
              onClick={() => {
                navigateTo('directory');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-stone-200"
            >
              Global Church Directory
            </button>
            <button
              onClick={() => {
                navigateTo('founder');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-stone-200"
            >
              Prophet Do All
            </button>
            <button
              onClick={() => {
                navigateTo('neighbours');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-stone-200"
            >
              From Our Neighbours
            </button>
            <button
              onClick={() => {
                navigateTo('about');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-stone-200"
            >
              About Ministry
            </button>
            <button
              onClick={() => {
                navigateTo('contact');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-stone-200"
            >
              Contact Secretariat
            </button>
          </div>

          <div className="pt-2 border-t border-purple-900/60 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('member-portal');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-stone-900 text-amber-400 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4" />
              <span>{currentMember ? currentMember.royalTitle : 'Royal Ambassador Login'}</span>
            </button>
            <button
              onClick={() => {
                openDonationModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>Give Free Will Seed (Paystack Live)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
