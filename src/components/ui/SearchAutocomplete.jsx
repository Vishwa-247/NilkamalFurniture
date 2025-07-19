import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const SearchAutocomplete = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const inputRef = useRef(null);

  // Mock product data for suggestions
  const mockProducts = [
    {
      id: 1,
      name: 'Modern Sofa Set',
      nameHi: 'आधुनिक सोफा सेट',
      category: 'Living Room',
      categoryHi: 'बैठक',
      price: 45000,
      image: '/assets/images/sofa-set.jpg'
    },
    {
      id: 2,
      name: 'Dining Table',
      nameHi: 'खाना खाने की मेज',
      category: 'Dining Room',
      categoryHi: 'भोजन कक्ष',
      price: 25000,
      image: '/assets/images/dining-table.jpg'
    },
    {
      id: 3,
      name: 'Office Chair',
      nameHi: 'कार्यालय की कुर्सी',
      category: 'Office',
      categoryHi: 'कार्यालय',
      price: 15000,
      image: '/assets/images/office-chair.jpg'
    },
    {
      id: 4,
      name: 'Wardrobe',
      nameHi: 'अलमारी',
      category: 'Bedroom',
      categoryHi: 'शयन कक्ष',
      price: 35000,
      image: '/assets/images/wardrobe.jpg'
    },
    {
      id: 5,
      name: 'Coffee Table',
      nameHi: 'कॉफी टेबल',
      category: 'Living Room',
      categoryHi: 'बैठक',
      price: 12000,
      image: '/assets/images/coffee-table.jpg'
    }
  ];

  const popularSearches = [
    { en: 'Sofa', hi: 'सोफा' },
    { en: 'Dining Table', hi: 'खाना खाने की मेज' },
    { en: 'Bed', hi: 'बिस्तर' },
    { en: 'Chair', hi: 'कुर्सी' },
    { en: 'Wardrobe', hi: 'अलमारी' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    const savedSearches = JSON.parse(localStorage.getItem('furniture-recent-searches') || '[]');
    setRecentSearches(savedSearches);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsLoading(true);
      
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockProducts.filter(product => {
          const name = currentLanguage === 'hi' ? product.nameHi : product.name;
          const category = currentLanguage === 'hi' ? product.categoryHi : product.category;
          return name.toLowerCase().includes(query.toLowerCase()) ||
                 category.toLowerCase().includes(query.toLowerCase());
        });
        setSuggestions(filtered);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [query, currentLanguage]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter(search => search !== searchQuery)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('furniture-recent-searches', JSON.stringify(newRecentSearches));
      
      // Perform search
      onSearch(searchQuery);
      setQuery('');
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleProductClick = (product) => {
    const productName = currentLanguage === 'hi' ? product.nameHi : product.name;
    handleSearch(productName);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('furniture-recent-searches');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const text = {
    en: {
      placeholder: 'Search for furniture, rooms, or styles...',
      recentSearches: 'Recent Searches',
      popularSearches: 'Popular Searches',
      suggestions: 'Suggestions',
      noResults: 'No products found',
      clear: 'Clear',
      searchFor: 'Search for',
      voiceSearch: 'Voice Search'
    },
    hi: {
      placeholder: 'फर्नीचर, कमरे या स्टाइल खोजें...',
      recentSearches: 'हाल की खोजें',
      popularSearches: 'लोकप्रिय खोजें',
      suggestions: 'सुझाव',
      noResults: 'कोई उत्पाद नहीं मिला',
      clear: 'साफ़ करें',
      searchFor: 'खोजें',
      voiceSearch: 'आवाज़ से खोजें'
    }
  };

  const t = text[currentLanguage];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-60"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border z-70 max-h-screen overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          {/* Search Header */}
          <div className="flex items-center p-6 border-b border-border">
            <form onSubmit={handleSubmit} className="flex-1 flex items-center space-x-4">
              <div className="relative flex-1">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuery('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                )}
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="hidden sm:flex"
                title={t.voiceSearch}
              >
                <Icon name="Mic" size={20} />
              </Button>
            </form>
            
            <Button variant="ghost" onClick={onClose} className="ml-4">
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim().length === 0 ? (
              <div className="p-6 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-foreground">{t.recentSearches}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {t.clear}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 furniture-transition"
                        >
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                          <span className="text-sm">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">{t.popularSearches}</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(currentLanguage === 'hi' ? search.hi : search.en)}
                        className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 furniture-transition"
                      >
                        <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                        <span className="text-sm">
                          {currentLanguage === 'hi' ? search.hi : search.en}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div>
                    <h3 className="font-medium text-foreground mb-4">{t.suggestions}</h3>
                    <div className="space-y-3">
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-muted furniture-transition text-left"
                        >
                          <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={currentLanguage === 'hi' ? product.nameHi : product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {currentLanguage === 'hi' ? product.nameHi : product.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {currentLanguage === 'hi' ? product.categoryHi : product.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t.noResults}</p>
                    <Button
                      onClick={() => handleSearch(query)}
                      className="mt-4"
                    >
                      {t.searchFor} "{query}"
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAutocomplete;