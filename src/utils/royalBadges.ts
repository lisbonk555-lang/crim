import { RoyalBadgeLevel } from '../types';

export function calculateBadgeLevel(totalUSD: number): RoyalBadgeLevel {
  if (totalUSD >= 1500) return 'Crown Royal Ambassador';
  if (totalUSD >= 750) return 'Diamond Royal';
  if (totalUSD >= 350) return 'Gold Royal';
  if (totalUSD >= 150) return 'Silver Royal';
  if (totalUSD >= 50) return 'Bronze Royal';
  return 'Seed Royal';
}

export function getBadgeDetails(level: RoyalBadgeLevel) {
  switch (level) {
    case 'Crown Royal Ambassador':
      return {
        name: 'Crown Royal Ambassador',
        crowns: 6,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10 border-amber-500/30',
        tierRank: 'Highest Royal Distinction',
        motto: 'Pillar of the Royal Kingdom'
      };
    case 'Diamond Royal':
      return {
        name: 'Diamond Royal',
        crowns: 5,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10 border-purple-500/30',
        tierRank: 'Tier 5 Ambassador',
        motto: 'Radiance of Kingdom Generosity'
      };
    case 'Gold Royal':
      return {
        name: 'Gold Royal',
        crowns: 4,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10 border-yellow-500/30',
        tierRank: 'Tier 4 Ambassador',
        motto: 'Excellence in Royal Stewardship'
      };
    case 'Silver Royal':
      return {
        name: 'Silver Royal',
        crowns: 3,
        color: 'text-slate-300',
        bgColor: 'bg-slate-300/10 border-slate-300/30',
        tierRank: 'Tier 3 Ambassador',
        motto: 'Faithful Seed Sower'
      };
    case 'Bronze Royal':
      return {
        name: 'Bronze Royal',
        crowns: 2,
        color: 'text-amber-700',
        bgColor: 'bg-amber-700/10 border-amber-700/30',
        tierRank: 'Tier 2 Ambassador',
        motto: 'Foundation of Kingdom Honor'
      };
    case 'Seed Royal':
    default:
      return {
        name: 'Seed Royal',
        crowns: 1,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10 border-emerald-500/30',
        tierRank: 'First Royal Covenant',
        motto: 'Initiated into the Royal Priesthood'
      };
  }
}

// Convert common currencies to approximate USD for tier calculation
export const currencyRatesToUSD: Record<string, number> = {
  USD: 1.0,
  GHS: 0.065, // ~15.4 GHS per USD
  NGN: 0.00067, // ~1500 NGN per USD
  GBP: 1.28,
  EUR: 1.08,
  KES: 0.0078, // ~128 KES per USD
  ZAR: 0.055,  // ~18 ZAR per USD
};

export function convertToUSD(amount: number, currency: string): number {
  const rate = currencyRatesToUSD[currency.toUpperCase()] || 1.0;
  return Math.round(amount * rate * 100) / 100;
}
