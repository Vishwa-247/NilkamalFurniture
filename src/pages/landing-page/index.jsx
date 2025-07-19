import { useEffect, useState } from 'react';
import CartSidebar from '../../components/ui/CartSidebar';
import Header from '../../components/ui/Header';
import SearchAutocomplete from '../../components/ui/SearchAutocomplete';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';
import NewsletterSignup from './components/NewsletterSignup';
import RecentActivity from './components/RecentActivity';
import RoomVisualization from './components/RoomVisualization';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import TrustBar from './components/TrustBar';
import TrustDelivery from './components/TrustDelivery';

const LandingPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // In a real app, this would trigger search functionality
  };

  // Listen for cart events from other components
  useEffect(() => {
    const handleCartEvent = (event) => {
      if (event.detail?.action === 'open') {
        setIsCartOpen(true);
      }
    };

    window.addEventListener('furniture-cart', handleCartEvent);
    return () => window.removeEventListener('furniture-cart', handleCartEvent);
  }, []);

  // Listen for search events from header
  useEffect(() => {
    const handleSearchEvent = (event) => {
      if (event.detail?.action === 'open') {
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('furniture-search', handleSearchEvent);
    return () => window.removeEventListener('furniture-search', handleSearchEvent);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <HeroCarousel />
        
        {/* Trust Bar */}
        <TrustBar />
        
        {/* Category Grid */}
        <CategoryGrid />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Customer Testimonials */}
        <TestimonialsCarousel />
        
        {/* Room Visualization */}
        <RoomVisualization />
        
        {/* Trust & Delivery */}
        <TrustDelivery />
        
        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Components */}
      <RecentActivity />
      
      {/* Sidebars & Modals */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      
      <SearchAutocomplete
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default LandingPage;
