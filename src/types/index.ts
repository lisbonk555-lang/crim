export type Category =
  | 'All'
  | 'World'
  | 'Politics'
  | 'Business'
  | 'Technology'
  | 'Health'
  | 'Sports'
  | 'Entertainment'
  | 'Education'
  | 'Science'
  | 'Religion'
  | 'Africa'
  | 'Europe'
  | 'Asia'
  | 'Americas'
  | 'Middle East'
  | 'Oceania';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: Category;
  region: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  isLeadStory?: boolean;
  godPerspective: {
    interpretation: string;
    scriptures: Array<{
      verse: string;
      reference: string;
    }>;
    propheticAction: string;
  };
}

export type RoyalBadgeLevel =
  | 'Seed Royal'
  | 'Bronze Royal'
  | 'Silver Royal'
  | 'Gold Royal'
  | 'Diamond Royal'
  | 'Crown Royal Ambassador';

export interface Member {
  id: string;
  email: string;
  fullName: string;
  gender: 'male' | 'female';
  royalTitle: string; // "His Royal Majesty [Name]" or "Her Royal Majesty [Name]"
  phone: string;
  country: string;
  town: string;
  badgeLevel: RoyalBadgeLevel;
  totalDonationEquivalentUSD: number;
  joinedDate: string;
  memberIdNumber: string;
  avatarUrl?: string;
  bio?: string;
  interests?: string[];
  invitedBy?: string;
  referralCode: string;
  referralCount: number;
  privacy: {
    showPhone: boolean;
    showTown: boolean;
  };
}

export interface ChurchEntry {
  id: string;
  name: string;
  denomination:
    | 'Pentecostal'
    | 'Charismatic'
    | 'Apostolic'
    | 'Catholic'
    | 'Anglican'
    | 'Methodist'
    | 'Presbyterian'
    | 'Baptist'
    | 'Evangelical'
    | 'Seventh-day Adventist'
    | 'Lutheran'
    | 'Orthodox'
    | 'Non-Denominational';
  pastor: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  mapCoords: { lat: number; lng: number };
}

export interface TvVideo {
  id: string;
  title: string;
  category: 'Worship' | 'Praise' | 'Gospel Music' | 'Sermons' | 'Prayers' | 'Celestial';
  speakerOrArtist: string;
  duration: string;
  videoUrl: string; // Direct mp4 or fallback
  youtubeId?: string; // YouTube embed ID
  scheduledAirTime?: string;
  thumbnailUrl: string;
  description: string;
  isLiveBroadcast?: boolean;
}

export interface NeighbourMessage {
  id: string;
  faith: 'Islam' | 'Hinduism' | 'Buddhism' | 'ISKCON' | 'Shinto' | 'Baháʼí';
  quote: string;
  sourceText: string;
  originFigure: string;
  christianReflection: string;
  bibleVerse: string;
  verseReference: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorTitle: string;
  authorBadge: RoyalBadgeLevel;
  authorTown: string;
  authorCountry: string;
  authorAvatar?: string;
  content: string;
  category: 'Testimony' | 'Prayer Request' | 'Business Connect' | 'Fellowship' | 'General';
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
  commentsCount: number;
  prayerHandCount: number;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorCountry: string;
  donorTown: string;
  gender: 'male' | 'female';
  amount: number;
  currency: string;
  equivalentUSD: number;
  prayerRequest?: string;
  transactionRef: string;
  timestamp: string;
  badgeAwarded: RoyalBadgeLevel;
  referredBy?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMine?: boolean;
}
