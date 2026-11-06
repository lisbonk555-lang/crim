import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { globalChurchesData, denominationsList } from '../data/churchesData';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Globe,
  Lock,
  Search,
  Filter,
  AlertCircle,
  ExternalLink,
  Crown
} from 'lucide-react';

export const DirectorySection: React.FC = () => {
  const { currentMember, navigateTo } = useApp();

  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedDenomination, setSelectedDenomination] = useState<string>('All Denominations');
  const [searchQuery, setSearchQuery] = useState('');

  const countries = ['All', ...Array.from(new Set(globalChurchesData.map((c) => c.country)))];

  const filteredChurches = globalChurchesData.filter((church) => {
    const matchesCountry = selectedCountry === 'All' || church.country === selectedCountry;
    const matchesDenom =
      selectedDenomination === 'All Denominations' || church.denomination === selectedDenomination;
    const matchesSearch =
      searchQuery === '' ||
      church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.pastor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCountry && matchesDenom && matchesSearch;
  });

  const isMemberLoggedIn = !!currentMember;

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Ecumenical Fellowship Index</span>
          </div>

          <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            GLOBAL DIRECTORY OF CHURCHES
          </h1>

          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            A comprehensive reference database of Christian congregations across cities and nations worldwide to support believers in travel and fellowship.
          </p>

          {/* MANDATORY DISCLAIMER */}
          <div className="bg-amber-50 border border-amber-300/70 rounded-xl p-3.5 flex items-start gap-3 text-left max-w-2xl mx-auto shadow-2xs">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Disclaimer:</strong> Church of Royals International Ministry is <em>NOT</em> affiliated with any of these churches. This directory is for fellowship and reference only.
            </p>
          </div>
        </div>

        {/* Public vs Member Mode Notice */}
        {!isMemberLoggedIn ? (
          <div className="bg-white border border-stone-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-[#581C87] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-stone-900">
                  Public Directory Mode
                </div>
                <div className="text-xs text-stone-500">
                  Showing Church Name, Denomination, City & Country. Head pastor phone numbers, emails, and exact Google map coordinates are reserved for logged-in Royal Ambassadors.
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('member-portal')}
              className="px-4 py-2 bg-gradient-to-r from-[#581C87] to-[#3B0764] hover:opacity-95 text-white text-xs font-bold rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Log in to View Full Pastoral Contacts</span>
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-8 flex items-center gap-2 text-xs text-emerald-900 max-w-4xl mx-auto">
            <Crown className="w-4 h-4 text-emerald-700" />
            <span>
              <strong>Royal Ambassador Access Granted:</strong> Welcome {currentMember.royalTitle}. Full verified pastoral contacts, direct email, phone, and coordinates are unlocked.
            </span>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search church by name, city, pastor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-[#581C87]"
              />
            </div>

            {/* Country Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-[#581C87]"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Countries' : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Denomination Filter */}
            <div className="sm:col-span-4">
              <select
                value={selectedDenomination}
                onChange={(e) => setSelectedDenomination(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-[#581C87]"
              >
                {denominationsList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Churches Directory Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChurches.map((church) => (
            <div
              key={church.id}
              className="bg-white border border-stone-200 rounded-xl p-5 hover:border-[#581C87] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Denomination and Region */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#581C87] uppercase tracking-wider">
                    {church.denomination}
                  </span>
                  <span className="text-stone-500 font-medium">
                    {church.city}, {church.country}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug mb-2">
                  {church.name}
                </h3>

                {/* Pastor Information */}
                <div className="text-xs text-stone-700 mb-3">
                  <span className="text-stone-400">Head Pastor / Leader: </span>
                  <span className="font-semibold text-stone-800">{church.pastor}</span>
                </div>

                {/* MEMBER ONLY DETAILS */}
                {isMemberLoggedIn ? (
                  <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{church.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <a href={`tel:${church.phone}`} className="hover:text-[#581C87] underline">
                        {church.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <a href={`mailto:${church.email}`} className="hover:text-[#581C87] underline truncate">
                        {church.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <a
                        href={church.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#581C87] underline flex items-center gap-1"
                      >
                        Visit Website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Interactive Google Maps link with coords */}
                    <div className="pt-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${church.name} ${church.city} ${church.country}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-1.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-red-600" />
                        <span>View on Google Maps</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-stone-100 text-xs text-stone-400 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Contact details locked (Public mode)</span>
                    </div>
                    <button
                      onClick={() => navigateTo('member-portal')}
                      className="text-[#581C87] font-bold hover:underline"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredChurches.length === 0 && (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-stone-500">
            No congregations match your filter criteria. Try choosing another country or denomination.
          </div>
        )}
      </div>
    </div>
  );
};
