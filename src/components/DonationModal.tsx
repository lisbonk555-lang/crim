import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Member, DonationRecord } from '../types';
import { getBadgeDetails, convertToUSD } from '../utils/royalBadges';
import confetti from 'canvas-confetti';
import {
  X,
  Heart,
  Crown,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  Copy,
  ExternalLink,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const { registerOrUpdateMemberFromDonation, navigateTo, showNotification } = useApp();

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [country, setCountry] = useState('Ghana');
  const [town, setTown] = useState('');
  const [amount, setAmount] = useState<number | ''>(50);
  const [currency, setCurrency] = useState('GHS');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [referredByCode, setReferredByCode] = useState('');

  // Result state
  const [resultData, setResultData] = useState<{
    member: Member;
    tempPassword: string;
    record: DonationRecord;
  } | null>(null);

  if (!isOpen) return null;

  const currencies = ['GHS', 'USD', 'NGN', 'KES', 'ZAR', 'GBP', 'EUR'];
  const quickAmounts: Record<string, number[]> = {
    GHS: [50, 100, 250, 500, 1000, 5000],
    USD: [10, 25, 50, 100, 250, 500],
    NGN: [10000, 25000, 50000, 100000, 250000, 500000],
    GBP: [10, 25, 50, 100, 200, 500],
    EUR: [10, 25, 50, 100, 200, 500],
    KES: [1000, 2500, 5000, 10000, 25000, 50000],
    ZAR: [150, 300, 750, 1500, 3000, 7500],
  };

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !town || !amount || Number(amount) <= 0) {
      showNotification('Please fill in all required fields and a valid Free Will amount.');
      return;
    }

    setStep('processing');

    // Simulate Paystack Live inline verification & secure webhook authorization
    setTimeout(() => {
      const res = registerOrUpdateMemberFromDonation({
        donorName: fullName.trim(),
        donorEmail: email.trim(),
        donorPhone: phone.trim(),
        donorCountry: country,
        donorTown: town.trim(),
        gender,
        amount: Number(amount),
        currency,
        prayerRequest: prayerRequest.trim(),
        transactionRef: `PSTK_LIVE_${Math.floor(10000000 + Math.random() * 90000000)}`,
        referredBy: referredByCode.trim() || undefined,
      });

      setResultData(res);
      setStep('success');

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D97706', '#581C87', '#FBBF24', '#FAF5FF'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 2200);
  };

  const resetAndClose = () => {
    setStep('form');
    setResultData(null);
    onClose();
  };

  const badgeDetails = resultData ? getBadgeDetails(resultData.member.badgeLevel) : null;
  const approxUSD = amount ? convertToUSD(Number(amount), currency) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2E0854] via-[#581C87] to-[#1C0633] text-white p-6 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
            <Crown className="w-4 h-4" />
            <span>Paystack Live Production · Free Will Giving</span>
          </div>

          <h3 className="font-royal text-xl sm:text-2xl font-bold tracking-tight">
            Free Will Kingdom Seed
          </h3>
          <p className="text-xs text-stone-200 mt-1 font-serif">
            "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." — 2 Corinthians 9:7
          </p>
        </div>

        {/* Step 1: Form */}
        {step === 'form' && (
          <form onSubmit={handlePaystackPayment} className="p-6 space-y-4 text-stone-800 text-sm">
            {/* Gender selection for Royal Title */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Title Assignment in the Church of Royals Ecosystem *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-purple-50 border-[#581C87] text-[#581C87] shadow-xs'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span>His Royal Majesty (Male)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-purple-50 border-[#581C87] text-[#581C87] shadow-xs'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span>Her Royal Majesty (Female)</span>
                </button>
              </div>
            </div>

            {/* Donor Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Listowel Mensah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:border-[#581C87]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address * (For Royal Credentials)
                </label>
                <input
                  type="email"
                  required
                  placeholder="donor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:border-[#581C87]"
                />
              </div>
            </div>

            {/* Phone & Country & Town */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+233 / +234 / +1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:border-[#581C87]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Country *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:border-[#581C87]"
                >
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="Other">Other Country</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Town / City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Accra, Kumasi, London"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:border-[#581C87]"
                />
              </div>
            </div>

            {/* Amount & Currency Selection */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Free Will Donation Amount *
                </label>
                <span className="text-[11px] text-stone-500 font-mono">
                  ≈ ${approxUSD} USD equivalent
                </span>
              </div>

              <div className="flex gap-2 mb-2">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-28 px-3 py-2 border border-stone-300 rounded-lg font-bold text-sm bg-stone-50 focus:outline-hidden focus:border-[#581C87]"
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    placeholder="Enter any amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-base font-bold text-stone-900 focus:outline-hidden focus:border-[#581C87]"
                  />
                </div>
              </div>

              {/* Quick Amount suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(quickAmounts[currency] || [10, 25, 50, 100, 250]).map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      amount === amt
                        ? 'bg-[#581C87] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {currency} {amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Prayer Request (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Prayer Request for Prophet Do All (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Share your personal prayer points to be brought before the altar during midnight decree..."
                value={prayerRequest}
                onChange={(e) => setPrayerRequest(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:outline-hidden focus:border-[#581C87]"
              />
            </div>

            {/* Referral / Inviter code */}
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1">
                Referral Code (Optional - e.g. from an Ambassador invite link)
              </label>
              <input
                type="text"
                placeholder="e.g. kwameosei"
                value={referredByCode}
                onChange={(e) => setReferredByCode(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs focus:outline-hidden"
              />
            </div>

            {/* Paystack Security Notice */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secured by Paystack 256-bit Bank Encryption</span>
              </div>
              <span className="font-mono text-[10px] text-stone-400">PAYSTACK_LIVE_TLS</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#581C87] via-[#6B21A8] to-[#3B0764] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>
                Proceed to Pay {currency} {amount ? Number(amount).toLocaleString() : '0'} via Paystack
              </span>
            </button>
          </form>
        )}

        {/* Step 2: Processing */}
        {step === 'processing' && (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#581C87] border-t-amber-400 rounded-full animate-spin mx-auto" />
            <h4 className="font-royal text-lg font-bold text-stone-900">
              Connecting to Paystack Live Gateway...
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Securing transaction token, initializing member credentials, and consecrating your royal covenant.
            </p>
          </div>
        )}

        {/* Step 3: Success & Credentials Generation */}
        {step === 'success' && resultData && (
          <div className="p-6 space-y-5 text-stone-800">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-royal text-xl font-bold text-stone-900">
                Payment Confirmed & Covenant Consecrated!
              </h4>
              <p className="text-xs text-stone-600">
                Thank you for your generous Free Will seed to Church of Royals International Ministry.
              </p>
            </div>

            {/* Royal Title Announcement Card */}
            <div className="bg-gradient-to-br from-[#FAF5FF] to-[#FFFBEB] border-2 border-amber-400 rounded-xl p-5 text-center shadow-xs">
              <div className="flex items-center justify-center gap-1.5 text-amber-600 mb-1">
                {[...Array(badgeDetails?.crowns || 1)].map((_, i) => (
                  <Crown key={i} className="w-5 h-5 fill-amber-400 text-amber-600" />
                ))}
              </div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-amber-800">
                Royal Distinction Bestowed
              </div>
              <h3 className="font-royal text-lg sm:text-xl font-extrabold text-[#3B0764] mt-0.5 mb-1">
                {resultData.member.royalTitle}
              </h3>
              <p className="text-xs font-semibold text-stone-700">
                Royal Ambassador of Church of Royals — {resultData.member.town}, {resultData.member.country}
              </p>
              <div className="mt-2 inline-block px-3 py-1 bg-amber-400/20 rounded-full text-xs font-bold text-amber-900">
                Awarded Badge: {resultData.member.badgeLevel}
              </div>
            </div>

            {/* Generated Login Credentials */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase">
                <Lock className="w-3.5 h-3.5 text-[#581C87]" />
                <span>Your Royal Ambassador Login Credentials</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Username (Email)</span>
                  <span className="font-mono font-bold text-stone-900">{resultData.member.email}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Temporary Password</span>
                  <span className="font-mono font-bold text-amber-700">{resultData.tempPassword}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500">
                * Note: Keep this temporary password safe. You can change it anytime inside your Ambassador Portal.
              </p>
            </div>

            {/* Official Receipt Summary */}
            <div className="border-t border-stone-200 pt-3 flex items-center justify-between text-xs text-stone-600">
              <div>
                <span>Ref: </span>
                <span className="font-mono font-semibold text-stone-800">
                  {resultData.record.transactionRef}
                </span>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 text-[#581C87] hover:underline font-bold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Receipt</span>
              </button>
            </div>

            {/* Direct Access Action */}
            <button
              onClick={() => {
                resetAndClose();
                navigateTo('member-portal');
              }}
              className="w-full py-3 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter Royal Ambassador Portal Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
