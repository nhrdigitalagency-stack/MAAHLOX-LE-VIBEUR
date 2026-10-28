import React from 'react';
import { AppSettingsProvider, useAppSettings } from './context/AppSettingsContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { UniverseSection } from './components/UniverseSection';
import { BiographySection } from './components/BiographySection';
import { DiscographySection } from './components/DiscographySection';
import { VideosSection } from './components/VideosSection';
import { ConcertsTicketsSection } from './components/ConcertsTicketsSection';
import { MerchShopSection } from './components/MerchShopSection';
import { GallerySection } from './components/GallerySection';
import { SocialVibrationSection } from './components/SocialVibrationSection';
import { EventsAndBookingSection } from './components/EventsAndBookingSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

const PortfolioContent: React.FC = () => {
  const { featureFlags } = useAppSettings();

  return (
    <div className="min-h-screen theme-bg font-poppins flex flex-col transition-colors duration-250">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <UniverseSection />
        <BiographySection />
        <DiscographySection />
        <VideosSection />
        {featureFlags.enableTickets && <ConcertsTicketsSection />}
        {featureFlags.enableShop && <MerchShopSection />}
        <GallerySection />
        {featureFlags.enableSocialSection && <SocialVibrationSection />}
        <EventsAndBookingSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AppSettingsProvider>
      <CartProvider>
        <PortfolioContent />
      </CartProvider>
    </AppSettingsProvider>
  );
}
