import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Category,
  NewsArticle,
  Member,
  DonationRecord,
  Post,
  ChatMessage,
  TvVideo,
  RoyalBadgeLevel
} from '../types';
import { initialNewsArticles } from '../data/newsData';
import { initialTvVideos } from '../data/royalsTvData';
import { calculateBadgeLevel, convertToUSD } from '../utils/royalBadges';

export type AppRoute =
  | 'home'
  | 'news-detail'
  | 'donate'
  | 'tv'
  | 'directory'
  | 'neighbours'
  | 'about'
  | 'founder'
  | 'ministries'
  | 'sermons'
  | 'events'
  | 'contact'
  | 'member-portal'
  | 'join'
  | 'admin';

interface AppContextType {
  currentRoute: AppRoute;
  navigateTo: (route: AppRoute, param?: string) => void;
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (art: NewsArticle | null) => void;
  articles: NewsArticle[];
  
  // Member & Auth
  currentMember: Member | null;
  members: Member[];
  loginMember: (email: string, pass: string) => boolean;
  logoutMember: () => void;
  registerOrUpdateMemberFromDonation: (donation: Omit<DonationRecord, 'id' | 'timestamp' | 'badgeAwarded' | 'equivalentUSD'>) => { member: Member; tempPassword: string; record: DonationRecord };
  updateMemberProfile: (updates: Partial<Member>) => void;

  // Donations
  donations: DonationRecord[];
  isDonationModalOpen: boolean;
  openDonationModal: (initialAmount?: number, initialCurrency?: string) => void;
  closeDonationModal: () => void;

  // Royals TV
  currentVideo: TvVideo;
  setCurrentVideo: (v: TvVideo) => void;
  tvPlaylist: TvVideo[];
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;

  // Social & Fellowship
  posts: Post[];
  addPost: (content: string, category: Post['category']) => void;
  toggleLikePost: (postId: string) => void;
  addPrayerHand: (postId: string) => void;
  chatMessages: Record<string, ChatMessage[]>;
  sendMessage: (channelId: string, text: string) => void;

  // WebRTC Call
  activeCall: {
    isOpen: boolean;
    callerName: string;
    callerTitle: string;
    isVideo: boolean;
    status: 'calling' | 'connected' | 'ended';
  } | null;
  startCall: (name: string, title: string, isVideo: boolean) => void;
  endCall: () => void;

  // Location & Clock
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SEED_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    email: 'kwame.osei@churchofroyals.org',
    fullName: 'Kwame Mensah Osei',
    gender: 'male',
    royalTitle: 'His Royal Majesty Kwame Mensah Osei',
    phone: '+233 24 456 7890',
    country: 'Ghana',
    town: 'Accra',
    badgeLevel: 'Crown Royal Ambassador',
    totalDonationEquivalentUSD: 2400,
    joinedDate: 'January 12, 2025',
    memberIdNumber: 'COR-GH-00109',
    bio: 'Fintech entrepreneur and Chief Ambassador for West Africa. Believing God for continent-wide economic revival.',
    interests: ['Business', 'Mentorship', 'Fintech', 'Prayer'],
    referralCode: 'kwameosei',
    referralCount: 42,
    privacy: { showPhone: false, showTown: true }
  },
  {
    id: 'mem-2',
    email: 'beatrice.adeyemi@churchofroyals.org',
    fullName: 'Lady Beatrice Adeyemi',
    gender: 'female',
    royalTitle: 'Her Royal Majesty Lady Beatrice Adeyemi',
    phone: '+234 80 345 6789',
    country: 'Nigeria',
    town: 'Lagos',
    badgeLevel: 'Diamond Royal',
    totalDonationEquivalentUSD: 950,
    joinedDate: 'March 20, 2025',
    memberIdNumber: 'COR-NG-00244',
    bio: 'Health executive and intercessor. Standing as a property of God in the healthcare space.',
    interests: ['Health', 'Prayer', 'Family', 'Education'],
    referralCode: 'beatricea',
    referralCount: 19,
    privacy: { showPhone: false, showTown: true }
  },
  {
    id: 'mem-3',
    email: 'edward.vance@churchofroyals.org',
    fullName: 'Sir Edward Vance',
    gender: 'male',
    royalTitle: 'His Royal Majesty Sir Edward Vance',
    phone: '+44 79 112 3456',
    country: 'United Kingdom',
    town: 'London',
    badgeLevel: 'Gold Royal',
    totalDonationEquivalentUSD: 480,
    joinedDate: 'May 14, 2025',
    memberIdNumber: 'COR-UK-00388',
    bio: 'Architectural engineer and member of Royals Media Committee.',
    interests: ['Business Connections', 'Jobs', 'Education'],
    referralCode: 'edwardvance',
    referralCount: 11,
    privacy: { showPhone: false, showTown: true }
  }
];

const SEED_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'mem-1',
    authorName: 'Kwame Mensah Osei',
    authorTitle: 'His Royal Majesty Kwame Mensah Osei',
    authorBadge: 'Crown Royal Ambassador',
    authorTown: 'Accra',
    authorCountry: 'Ghana',
    content: 'Praise the Lord Royals! After Prophet Do All prayed over our business project during the midnight apostolic decree, we were awarded the commercial contract today. Truly, what God cannot do does not exist! "I can do all things through Christ who strengthens me!"',
    category: 'Testimony',
    timestamp: '2 hours ago',
    likes: 47,
    hasLiked: false,
    commentsCount: 14,
    prayerHandCount: 38
  },
  {
    id: 'post-2',
    authorId: 'mem-2',
    authorName: 'Lady Beatrice Adeyemi',
    authorTitle: 'Her Royal Majesty Lady Beatrice Adeyemi',
    authorBadge: 'Diamond Royal',
    authorTown: 'Lagos',
    authorCountry: 'Nigeria',
    content: 'Royal Family, let us lift up our brethren in medical practice this week. Praying for divine precision, angelic assistance in surgeries, and healing virtue flowing into every patient.',
    category: 'Prayer Request',
    timestamp: '5 hours ago',
    likes: 32,
    hasLiked: false,
    commentsCount: 9,
    prayerHandCount: 51
  },
  {
    id: 'post-3',
    authorId: 'mem-3',
    authorName: 'Sir Edward Vance',
    authorTitle: 'His Royal Majesty Sir Edward Vance',
    authorBadge: 'Gold Royal',
    authorTown: 'London',
    authorCountry: 'United Kingdom',
    content: 'Looking to connect with Royal Ambassadors in civil engineering and green infrastructure across Europe and West Africa. We have collaborative initiatives launching in Q1. Send me a 1-on-1 direct message inside the portal!',
    category: 'Business Connect',
    timestamp: '1 day ago',
    likes: 28,
    hasLiked: false,
    commentsCount: 6,
    prayerHandCount: 12
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>(initialNewsArticles);

  // Location
  const [currentLocation, setCurrentLocation] = useState('Accra / London (Global Edition)');

  // TV
  const [tvPlaylist, setTvPlaylist] = useState<TvVideo[]>(initialTvVideos);
  const [currentVideo, setCurrentVideo] = useState<TvVideo>(initialTvVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Donations Modal
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  // Members
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem('cor_members_v1');
      return saved ? JSON.parse(saved) : SEED_MEMBERS;
    } catch {
      return SEED_MEMBERS;
    }
  });

  const [currentMember, setCurrentMember] = useState<Member | null>(() => {
    try {
      const saved = localStorage.getItem('cor_current_member_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('cor_donations_v1');
      return saved ? JSON.parse(saved) : [
        {
          id: 'don-seed-1',
          donorName: 'Kwame Mensah Osei',
          donorEmail: 'kwame.osei@churchofroyals.org',
          donorPhone: '+233 24 456 7890',
          donorCountry: 'Ghana',
          donorTown: 'Accra',
          gender: 'male',
          amount: 2400,
          currency: 'USD',
          equivalentUSD: 2400,
          prayerRequest: 'Kingdom business expansion across West Africa',
          transactionRef: 'PSTK_LIVE_9921448',
          timestamp: '2026-11-04 14:22',
          badgeAwarded: 'Crown Royal Ambassador'
        }
      ];
    } catch {
      return [];
    }
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('cor_posts_v1');
      return saved ? JSON.parse(saved) : SEED_POSTS;
    } catch {
      return SEED_POSTS;
    }
  });

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    'group-ghana': [
      { id: 'cm-1', senderId: 'mem-1', senderName: 'His Royal Majesty Kwame Osei', text: 'Welcome to all our Royal brothers and sisters across Ghana!', timestamp: 'Yesterday' }
    ],
    'group-business': [
      { id: 'cm-2', senderId: 'mem-3', senderName: 'His Royal Majesty Sir Edward Vance', text: 'Shalom! Who is attending the Global Royal Trade summit next month?', timestamp: '2 hours ago' }
    ]
  });

  const [activeCall, setActiveCall] = useState<{
    isOpen: boolean;
    callerName: string;
    callerTitle: string;
    isVideo: boolean;
    status: 'calling' | 'connected' | 'ended';
  } | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('cor_members_v1', JSON.stringify(members));
    } catch (e) {
      console.error(e);
    }
  }, [members]);

  useEffect(() => {
    try {
      if (currentMember) {
        localStorage.setItem('cor_current_member_v1', JSON.stringify(currentMember));
      } else {
        localStorage.removeItem('cor_current_member_v1');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentMember]);

  useEffect(() => {
    try {
      localStorage.setItem('cor_donations_v1', JSON.stringify(donations));
    } catch (e) {
      console.error(e);
    }
  }, [donations]);

  useEffect(() => {
    try {
      localStorage.setItem('cor_posts_v1', JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  // Routing helper
  const navigateTo = (route: AppRoute, param?: string) => {
    if (route === 'news-detail' && param) {
      const art = articles.find((a) => a.slug === param || a.id === param);
      if (art) {
        setSelectedArticle(art);
      }
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDonationModal = (_initialAmount?: number, _initialCurrency?: string) => {
    setIsDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  // Auth
  const loginMember = (email: string, _pass: string) => {
    const found = members.find((m) => m.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      setCurrentMember(found);
      showNotification(`Welcome back, ${found.royalTitle}!`);
      return true;
    }
    return false;
  };

  const logoutMember = () => {
    setCurrentMember(null);
    showNotification('You have logged out of the Royal Ambassador portal.');
    if (currentRoute === 'member-portal') {
      setCurrentRoute('home');
    }
  };

  const registerOrUpdateMemberFromDonation = (
    donationInput: Omit<DonationRecord, 'id' | 'timestamp' | 'badgeAwarded' | 'equivalentUSD'>
  ) => {
    const equivUSD = convertToUSD(donationInput.amount, donationInput.currency);
    const existing = members.find((m) => m.email.toLowerCase() === donationInput.donorEmail.trim().toLowerCase());

    const totalUSD = (existing ? existing.totalDonationEquivalentUSD : 0) + equivUSD;
    const badge = calculateBadgeLevel(totalUSD);

    const titlePrefix = donationInput.gender === 'female' ? 'Her Royal Majesty' : 'His Royal Majesty';
    const royalTitle = `${titlePrefix} ${donationInput.donorName}`;
    const tempPassword = `Royals${Math.floor(100000 + Math.random() * 900000)}`;

    let updatedMember: Member;

    if (existing) {
      updatedMember = {
        ...existing,
        fullName: donationInput.donorName,
        gender: donationInput.gender,
        royalTitle,
        phone: donationInput.donorPhone || existing.phone,
        country: donationInput.donorCountry || existing.country,
        town: donationInput.donorTown || existing.town,
        totalDonationEquivalentUSD: totalUSD,
        badgeLevel: badge,
      };
      setMembers((prev) => prev.map((m) => (m.id === existing.id ? updatedMember : m)));
    } else {
      const code = donationInput.donorName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) + Math.floor(10 + Math.random() * 89);
      updatedMember = {
        id: `mem-${Date.now()}`,
        email: donationInput.donorEmail.trim().toLowerCase(),
        fullName: donationInput.donorName,
        gender: donationInput.gender,
        royalTitle,
        phone: donationInput.donorPhone,
        country: donationInput.donorCountry,
        town: donationInput.donorTown,
        badgeLevel: badge,
        totalDonationEquivalentUSD: totalUSD,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        memberIdNumber: `COR-${donationInput.donorCountry.slice(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
        referralCode: code,
        referralCount: 0,
        privacy: { showPhone: false, showTown: true },
        interests: ['Fellowship', 'Prayer', 'Kingdom Stewardship']
      };
      setMembers((prev) => [updatedMember, ...prev]);
    }

    const newRecord: DonationRecord = {
      id: `don-${Date.now()}`,
      ...donationInput,
      equivalentUSD: equivUSD,
      badgeAwarded: badge,
      timestamp: new Date().toLocaleString(),
    };

    setDonations((prev) => [newRecord, ...prev]);
    setCurrentMember(updatedMember);

    // If referred by someone, increment their count
    if (donationInput.referredBy) {
      setMembers((prev) =>
        prev.map((m) =>
          m.referralCode === donationInput.referredBy ? { ...m, referralCount: m.referralCount + 1 } : m
        )
      );
    }

    return { member: updatedMember, tempPassword, record: newRecord };
  };

  const updateMemberProfile = (updates: Partial<Member>) => {
    if (!currentMember) return;
    const updated = { ...currentMember, ...updates };
    setCurrentMember(updated);
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    showNotification('Royal Ambassador profile updated successfully.');
  };

  // Social feed
  const addPost = (content: string, category: Post['category']) => {
    if (!currentMember) return;
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentMember.id,
      authorName: currentMember.fullName,
      authorTitle: currentMember.royalTitle,
      authorBadge: currentMember.badgeLevel,
      authorTown: currentMember.town,
      authorCountry: currentMember.country,
      content,
      category,
      timestamp: 'Just now',
      likes: 1,
      hasLiked: true,
      commentsCount: 0,
      prayerHandCount: 1,
    };
    setPosts((prev) => [newPost, ...prev]);
    showNotification('Your royal message has been published to the Fellowship Feed.');
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked,
            likes: hasLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const addPrayerHand = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, prayerHandCount: p.prayerHandCount + 1 } : p))
    );
    showNotification('Prayer agreement sent in the Spirit!');
  };

  const sendMessage = (channelId: string, text: string) => {
    if (!currentMember || !text.trim()) return;
    const newMsg: ChatMessage = {
      id: `cm-${Date.now()}`,
      senderId: currentMember.id,
      senderName: currentMember.royalTitle,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };
    setChatMessages((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), newMsg],
    }));
  };

  const startCall = (name: string, title: string, isVideo: boolean) => {
    setActiveCall({
      isOpen: true,
      callerName: name,
      callerTitle: title,
      isVideo,
      status: 'calling',
    });
    setTimeout(() => {
      setActiveCall((curr) => (curr ? { ...curr, status: 'connected' } : null));
    }, 1800);
  };

  const endCall = () => {
    if (activeCall) {
      setActiveCall({ ...activeCall, status: 'ended' });
      setTimeout(() => setActiveCall(null), 1000);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedArticle,
        setSelectedArticle,
        articles,
        currentMember,
        members,
        loginMember,
        logoutMember,
        registerOrUpdateMemberFromDonation,
        updateMemberProfile,
        donations,
        isDonationModalOpen,
        openDonationModal,
        closeDonationModal,
        currentVideo,
        setCurrentVideo,
        tvPlaylist,
        isPlaying,
        setIsPlaying,
        posts,
        addPost,
        toggleLikePost,
        addPrayerHand,
        chatMessages,
        sendMessage,
        activeCall,
        startCall,
        endCall,
        currentLocation,
        setCurrentLocation,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
