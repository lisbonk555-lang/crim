import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Ticker } from './components/Ticker';
import { RoyalHomepage } from './components/RoyalHomepage';
import { ArticleView } from './components/ArticleView';
import { RoyalsTvPlayer } from './components/RoyalsTvPlayer';
import { DirectorySection } from './components/DirectorySection';
import { NeighboursSection } from './components/NeighboursSection';
import { FounderPage } from './components/FounderPage';
import { AboutPage } from './components/AboutPage';
import { MinistriesPage } from './components/MinistriesPage';
import { SermonsPage } from './components/SermonsPage';
import { EventsPage } from './components/EventsPage';
import { ContactPage } from './components/ContactPage';
import { MemberPortal } from './components/MemberPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { DonationModal } from './components/DonationModal';
import { WebRtcCallModal } from './components/WebRtcCallModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    selectedArticle,
    articles,
    isDonationModalOpen,
    closeDonationModal,
    notification
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-[#581C87] selection:text-white">
      {/* 1. Header with Operational Utility Bar and Top Bar Contract */}
      <Header />

      {/* 2. Breaking News Ticker */}
      <Ticker />

      {/* 3. Main Route Canvas */}
      <main className="flex-1">
        {currentRoute === 'home' && <RoyalHomepage />}

        {currentRoute === 'news-detail' && (
          <ArticleView
            article={selectedArticle || articles[0]}
            onBack={() => navigateTo('home')}
          />
        )}

        {currentRoute === 'tv' && <RoyalsTvPlayer />}
        {currentRoute === 'directory' && <DirectorySection />}
        {currentRoute === 'neighbours' && <NeighboursSection />}
        {currentRoute === 'founder' && <FounderPage />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'ministries' && <MinistriesPage />}
        {currentRoute === 'sermons' && <SermonsPage />}
        {currentRoute === 'events' && <EventsPage />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'member-portal' && <MemberPortal />}
        {currentRoute === 'admin' && <AdminDashboard />}
      </main>

      {/* 4. Paystack Free Will Donation Modal */}
      <DonationModal isOpen={isDonationModalOpen} onClose={closeDonationModal} />

      {/* 5. WebRTC Peer-to-Peer Audio/Video Call Interface */}
      <WebRtcCallModal />

      {/* 6. Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C0633] text-white border-2 border-amber-400 px-4 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold max-w-sm flex items-center gap-2 animate-bounce">
          <span className="text-amber-400">✦</span>
          <span>{notification}</span>
        </div>
      )}

      {/* 7. Footer with Prophet Do All's Image & Links */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
