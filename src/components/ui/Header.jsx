import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';
import NavigationDropdown from './NavigationDropdown';

const Header = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('furniture-language', lang);
    setIsLanguageOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleCartClick = () => {
    console.log('Opening cart sidebar');
    window.dispatchEvent(new CustomEvent('furniture-cart', {
      detail: { action: 'open' }
    }));
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  // Navigation menu data
  const collectionsMenu = [
    { 
      name: 'Modern Living', 
      href: '/collections/modern-living', 
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=150&fit=crop',
      description: 'Contemporary furniture for modern homes'
    },
    { 
      name: 'Cozy Bedroom', 
      href: '/collections/cozy-bedroom', 
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=200&h=150&fit=crop',
      description: 'Comfortable and stylish bedroom furniture'
    },
    { 
      name: 'Office Essentials', 
      href: '/collections/office-essentials', 
      image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=200&h=150&fit=crop',
      description: 'Professional workspace solutions'
    },
    { 
      name: 'Dining Elegance', 
      href: '/collections/dining-elegance', 
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=150&fit=crop',
      description: 'Elegant dining room furniture'
    }
  ];

  const dealsMenu = [
    { name: 'Flash Sale', href: '/deals/flash-sale', discount: '50% OFF', color: 'text-red-600' },
    { name: 'Clearance Items', href: '/deals/clearance', discount: '30% OFF', color: 'text-orange-600' },
    { name: 'Bundle Offers', href: '/deals/bundles', discount: 'Buy 2 Get 1', color: 'text-green-600' },
    { name: 'New Arrivals', href: '/deals/new-arrivals', discount: '25% OFF', color: 'text-blue-600' }
  ];

  const roomIdeasMenu = [
    { name: 'Living Room', href: '/room-ideas/living-room', type: 'Scandinavian, Modern, Rustic' },
    { name: 'Bedroom', href: '/room-ideas/bedroom', type: 'Minimalist, Cozy, Industrial' },
    { name: 'Office', href: '/room-ideas/office', type: 'Productive, Modern, Ergonomic' },
    { name: 'Dining', href: '/room-ideas/dining', type: 'Elegant, Family, Contemporary' }
  ];

  const customerMenu = [
    { name: 'Customer Reviews', href: '/reviews', icon: 'Star' },
    { name: 'Success Stories', href: '/stories', icon: 'Heart' },
    { name: 'Photo Gallery', href: '/gallery', icon: 'Camera' },
    { name: 'Testimonials', href: '/testimonials', icon: 'MessageCircle' }
  ];

  const deliveryMenu = [
    { name: 'Delivery Areas', href: '/delivery/areas', icon: 'MapPin' },
    { name: 'Shipping Costs', href: '/delivery/costs', icon: 'Truck' },
    { name: 'Installation Service', href: '/delivery/installation', icon: 'Tool' },
    { name: 'Return Policy', href: '/delivery/returns', icon: 'RotateCcw' }
  ];

  // Navigation handlers
  const handleNavigation = (href) => {
    console.log('Navigating to:', href);
    // In a real app, this would use React Router
    // For now, we'll simulate navigation
    window.location.href = href;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 furniture-transition ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
        : 'bg-background border-b border-border'
    }`}>
      {/* Logo - Completely separate and positioned to the far left */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-60">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="Sofa" size={24} color="white" />
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground font-display">
              NilKamalFurniture
            </span>
            <div className="text-xs text-muted-foreground -mt-1">Premium Store</div>
          </div>
        </div>
      </div>

      {/* Main Header Content - Centered without logo */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-center h-20 px-4 ml-48">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Shop Collections */}
            <NavigationDropdown title="Shop Collections">
              <div className="p-10 min-w-96">
                <div className="grid grid-cols-2 gap-8">
                  {collectionsMenu.map((collection, index) => (
                    <a
                      key={index}
                      href={collection.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(collection.href);
                      }}
                      className="flex items-start space-x-5 p-5 rounded-xl hover:bg-muted hover:bg-opacity-50 furniture-transition group cursor-pointer"
                    >
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-24 h-24 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground group-hover:text-primary furniture-transition mb-2 text-lg">
                          {collection.name}
                        </div>
                        <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 furniture-transition leading-relaxed">
                          {collection.description}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="border-t border-border mt-8 pt-8">
                  <a
                    href="/collections"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/collections');
                    }}
                    className="flex items-center justify-center text-primary hover:text-primary-dark font-semibold furniture-transition group cursor-pointer text-lg"
                  >
                    View All Collections
                    <Icon name="ArrowRight" size={18} className="ml-2 group-hover:translate-x-1 furniture-transition" />
                  </a>
                </div>
              </div>
            </NavigationDropdown>

            {/* Featured Deals */}
            <NavigationDropdown title="Featured Deals">
              <div className="p-6 min-w-72">
                <div className="space-y-3">
                  {dealsMenu.map((deal, index) => (
                    <a
                      key={index}
                      href={deal.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(deal.href);
                      }}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-muted hover:bg-opacity-50 furniture-transition group cursor-pointer"
                    >
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary furniture-transition">
                          {deal.name}
                        </div>
                      </div>
                      <div className={`font-bold ${deal.color} group-hover:scale-110 furniture-transition`}>
                        {deal.discount}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="border-t border-border mt-6 pt-6">
                  <a
                    href="/deals"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/deals');
                    }}
                    className="flex items-center justify-center text-primary hover:text-primary-dark font-semibold furniture-transition group cursor-pointer"
                  >
                    View All Deals
                    <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 furniture-transition" />
                  </a>
                </div>
              </div>
            </NavigationDropdown>

            {/* Room Ideas */}
            <NavigationDropdown title="Room Ideas">
              <div className="p-6 min-w-72">
                <div className="space-y-3">
                  {roomIdeasMenu.map((room, index) => (
                    <a
                      key={index}
                      href={room.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(room.href);
                      }}
                      className="block p-4 rounded-xl hover:bg-muted hover:bg-opacity-50 furniture-transition group cursor-pointer"
                    >
                      <div className="font-semibold text-foreground group-hover:text-primary furniture-transition">
                        {room.name}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 group-hover:text-muted-foreground/80 furniture-transition">
                        {room.type}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="border-t border-border mt-6 pt-6">
                  <a
                    href="/room-ideas"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/room-ideas');
                    }}
                    className="flex items-center justify-center text-primary hover:text-primary-dark font-semibold furniture-transition group cursor-pointer"
                  >
                    Browse All Ideas
                    <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 furniture-transition" />
                  </a>
                </div>
              </div>
            </NavigationDropdown>

            {/* Customer Stories */}
            <NavigationDropdown title="Customer Stories">
              <div className="p-6 min-w-64">
                <div className="space-y-3">
                  {customerMenu.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.href);
                      }}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted hover:bg-opacity-50 furniture-transition group cursor-pointer"
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className="text-muted-foreground group-hover:text-primary furniture-transition" 
                      />
                      <div className="font-semibold text-foreground group-hover:text-primary furniture-transition">
                        {item.name}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </NavigationDropdown>

            {/* Delivery Info */}
            <NavigationDropdown title="Delivery Info">
              <div className="p-6 min-w-64">
                <div className="space-y-3">
                  {deliveryMenu.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.href);
                      }}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted hover:bg-opacity-50 furniture-transition group cursor-pointer"
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className="text-muted-foreground group-hover:text-primary furniture-transition" 
                      />
                      <div className="font-semibold text-foreground group-hover:text-primary furniture-transition">
                        {item.name}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </NavigationDropdown>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search furniture..."
                    className="w-72 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex"
                >
                  <Icon name="Search" size={20} />
                </Button>
              )}
            </div>

            {/* Language Toggle */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted"
              >
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="hidden sm:inline text-sm font-medium">
                  {currentLang?.name}
                </span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {isLanguageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-xl shadow-xl z-60">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted furniture-transition rounded-lg ${
                        currentLanguage === lang.code ? 'bg-muted' : ''
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                      {currentLanguage === lang.code && (
                        <Icon name="Check" size={16} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Account */}
            {user ? (
              <div className="relative">
                <NavigationDropdown title={user?.email?.split('@')[0] || 'Account'}>
                  <div className="p-6 min-w-56">
                    <div className="space-y-3">
                      <a
                        href="/profile"
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted furniture-transition group"
                      >
                        <Icon name="User" size={20} className="text-muted-foreground group-hover:text-primary" />
                        <span className="font-semibold text-foreground group-hover:text-primary">
                          My Profile
                        </span>
                      </a>
                      <a
                        href="/orders"
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted furniture-transition group"
                      >
                        <Icon name="Package" size={20} className="text-muted-foreground group-hover:text-primary" />
                        <span className="font-semibold text-foreground group-hover:text-primary">
                          My Orders
                        </span>
                      </a>
                      <a
                        href="/wishlist"
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted furniture-transition group"
                      >
                        <Icon name="Heart" size={20} className="text-muted-foreground group-hover:text-primary" />
                        <span className="font-semibold text-foreground group-hover:text-primary">
                          Wishlist
                        </span>
                      </a>
                      <div className="border-t border-border my-3"></div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-muted furniture-transition group text-left"
                      >
                        <Icon name="LogOut" size={20} className="text-muted-foreground group-hover:text-red-600" />
                        <span className="font-semibold text-foreground group-hover:text-red-600">
                          Sign Out
                        </span>
                      </button>
                    </div>
                  </div>
                </NavigationDropdown>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/signin'}
                  className="hover:bg-muted"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.location.href = '/signup'}
                  className="btn-primary"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="relative hover:bg-muted"
            >
              <Icon name="ShoppingCart" size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-muted"
            >
              <Icon name="Menu" size={22} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden px-6 pb-6">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search furniture..."
                  className="w-full px-4 py-3 pr-12 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Icon name="Search" size={20} />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Click outside to close language dropdown */}
      {isLanguageOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
