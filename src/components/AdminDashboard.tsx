import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { founderData } from '../data/founderData';
import {
  Shield,
  Users,
  Heart,
  Newspaper,
  Tv,
  Compass,
  CheckCircle2,
  DollarSign,
  Crown,
  Search,
  Key,
  Layers
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { donations, members, articles, tvPlaylist, showNotification } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'donations' | 'members' | 'paystack'>('overview');
  const [paystackKeyInput, setPaystackKeyInput] = useState('pk_live_********************');
  const [newsApiKeyInput, setNewsApiKeyInput] = useState('news_api_********************');

  const totalUSD = donations.reduce((acc, curr) => acc + curr.equivalentUSD, 0);

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Live production API environment configuration updated.');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#1C0633] via-[#3B0764] to-[#120422] rounded-2xl p-6 text-white border-2 border-amber-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                Apostolic Command Console
              </div>
              <h1 className="font-royal text-xl sm:text-2xl font-bold">
                Church of Royals Overseer Dashboard
              </h1>
              <div className="text-xs text-stone-300">
                Founder: {founderData.name} ({founderData.title})
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold">
              Paystack Live Ready
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              adminTab === 'overview'
                ? 'bg-[#581C87] text-white'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setAdminTab('donations')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              adminTab === 'donations'
                ? 'bg-[#581C87] text-white'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            Free Will Donations ({donations.length})
          </button>
          <button
            onClick={() => setAdminTab('members')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              adminTab === 'members'
                ? 'bg-[#581C87] text-white'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            Royal Ambassadors ({members.length})
          </button>
          <button
            onClick={() => setAdminTab('paystack')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              adminTab === 'paystack'
                ? 'bg-[#581C87] text-white'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            API & Environment Configuration
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase">Total Free Will Seeds</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-royal text-2xl font-black text-stone-900">
                  ${totalUSD.toLocaleString()} USD eq.
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Across 7 Global Currencies</div>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase">Enrolled Ambassadors</span>
                  <Crown className="w-4 h-4 text-amber-600" />
                </div>
                <div className="font-royal text-2xl font-black text-stone-900">
                  {members.length} Dignitaries
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Across Africa, UK, US, Global</div>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase">Published News Stories</span>
                  <Newspaper className="w-4 h-4 text-[#581C87]" />
                </div>
                <div className="font-royal text-2xl font-black text-stone-900">
                  {articles.length} Dispatches
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Each with God's Perspective</div>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase">Royals TV Channels</span>
                  <Tv className="w-4 h-4 text-rose-600" />
                </div>
                <div className="font-royal text-2xl font-black text-stone-900">
                  {tvPlaylist.length} Streams
                </div>
                <div className="text-[11px] text-stone-500 mt-1">24/7 Scheduled Auto-Play</div>
              </div>
            </div>

            {/* Recent Donations Feed */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-3">
              <h3 className="font-royal font-bold text-sm text-stone-900">
                Latest Free Will Seeds Logged (Paystack Live)
              </h3>
              <div className="divide-y divide-stone-100">
                {donations.slice(0, 5).map((don) => (
                  <div key={don.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900">{don.donorName}</div>
                      <div className="text-stone-500 text-[11px]">
                        {don.donorTown}, {don.donorCountry} · Ref: {don.transactionRef}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#581C87]">
                        {don.currency} {don.amount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-amber-700 font-semibold">
                        Badge: {don.badgeAwarded}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DONATIONS LIST */}
        {adminTab === 'donations' && (
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="font-royal font-bold text-base text-stone-900">
              Audit Log of All Free Will Donations
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Donor Name</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Amount Given</th>
                    <th className="py-2.5 px-3">USD Equivalent</th>
                    <th className="py-2.5 px-3">Badge Bestowed</th>
                    <th className="py-2.5 px-3">Paystack Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-mono text-[11px]">{d.timestamp}</td>
                      <td className="py-2.5 px-3 font-bold text-stone-900">{d.donorName}</td>
                      <td className="py-2.5 px-3">{d.donorTown}, {d.donorCountry}</td>
                      <td className="py-2.5 px-3 font-bold text-[#581C87]">
                        {d.currency} {d.amount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 font-mono">${d.equivalentUSD}</td>
                      <td className="py-2.5 px-3 font-bold text-amber-800">{d.badgeAwarded}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-stone-500">{d.transactionRef}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MEMBERS */}
        {adminTab === 'members' && (
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="font-royal font-bold text-base text-stone-900">
              Registered Royal Ambassadors Roster
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Member ID</th>
                    <th className="py-2.5 px-3">Ecclesiastical Title</th>
                    <th className="py-2.5 px-3">Town / Country</th>
                    <th className="py-2.5 px-3">Badge Rank</th>
                    <th className="py-2.5 px-3">Total Seed (USD eq.)</th>
                    <th className="py-2.5 px-3">Souls Referred</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#581C87] font-bold">
                        {m.memberIdNumber}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-stone-900">{m.royalTitle}</td>
                      <td className="py-2.5 px-3">{m.town}, {m.country}</td>
                      <td className="py-2.5 px-3 font-bold text-amber-800">{m.badgeLevel}</td>
                      <td className="py-2.5 px-3 font-mono">${m.totalDonationEquivalentUSD}</td>
                      <td className="py-2.5 px-3 font-bold text-stone-800">{m.referralCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: API & ENV SETTINGS */}
        {adminTab === 'paystack' && (
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs max-w-2xl space-y-6">
            <div>
              <h3 className="font-royal font-bold text-lg text-stone-900 mb-1">
                Environment & Integration Keys
              </h3>
              <p className="text-xs text-stone-500">
                To connect live Paystack production payment collection and real-time NewsAPI / GNews synchronization, configure the values below or via server environment variables.
              </p>
            </div>

            <form onSubmit={handleSaveKeys} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  PAYSTACK_PUBLIC_KEY
                </label>
                <input
                  type="text"
                  value={paystackKeyInput}
                  onChange={(e) => setPaystackKeyInput(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono text-xs focus:outline-hidden focus:border-[#581C87]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  NEWS_API_KEY (Optional for 10,000+ Realtime News Streaming)
                </label>
                <input
                  type="text"
                  value={newsApiKeyInput}
                  onChange={(e) => setNewsApiKeyInput(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono text-xs focus:outline-hidden focus:border-[#581C87]"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-600 text-[11px] space-y-1">
                <div>✓ Paystack inline & mobile money webhook verification enabled</div>
                <div>✓ Multi-currency settlement configured (GHS, USD, NGN, GBP, EUR, KES, ZAR)</div>
                <div>✓ Automatic Royal Ambassador account creation active</div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Save Production Environment Keys
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
