import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CategoryGrid = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    {
      id: 1,
      name: "Living Room",
      nameHi: "बैठक",
      description: "Sofas, Coffee Tables, TV Units",
      descriptionHi: "सोफा, कॉफी टेबल, टीवी यूनिट",
      priceRange: "₹8,999 - ₹89,999",
      bestseller: "3-Seater Sofa Set",
      bestsellerHi: "3-सीटर सोफा सेट",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "Sofa",
      itemCount: 245,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Bedroom",
      nameHi: "शयन कक्ष",
      description: "Beds, Wardrobes, Dressers",
      descriptionHi: "बिस्तर, अलमारी, ड्रेसर",
      priceRange: "₹12,999 - ₹1,25,999",
      bestseller: "King Size Bed",
      bestsellerHi: "किंग साइज़ बेड",
      image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "Bed",
      itemCount: 189,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "Office",
      nameHi: "कार्यालय",
      description: "Chairs, Desks, Storage",
      descriptionHi: "कुर्सी, डेस्क, भंडारण",
      priceRange: "₹5,999 - ₹45,999",
      bestseller: "Ergonomic Chair",
      bestsellerHi: "एर्गोनॉमिक कुर्सी",
      image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "Briefcase",
      itemCount: 156,
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      name: "Dining",
      nameHi: "भोजन कक्ष",
      description: "Tables, Chairs, Cabinets",
      descriptionHi: "टेबल, कुर्सी, कैबिनेट",
      priceRange: "₹15,999 - ₹75,999",
      bestseller: "6-Seater Dining Set",
      bestsellerHi: "6-सीटर डाइनिंग सेट",
      image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "UtensilsCrossed",
      itemCount: 98,
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      name: "Storage",
      nameHi: "भंडारण",
      description: "Shelves, Cabinets, Organizers",
      descriptionHi: "शेल्फ, कैबिनेट, ऑर्गनाइज़र",
      priceRange: "₹2,999 - ₹35,999",
      bestseller: "Modular Wardrobe",
      bestsellerHi: "मॉड्यूलर अलमारी",
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "Archive",
      itemCount: 134,
      color: "from-teal-500 to-teal-600"
    },
    {
      id: 6,
      name: "Decor",
      nameHi: "सजावट",
      description: "Lamps, Mirrors, Accessories",
      descriptionHi: "लैंप, दर्पण, सहायक उपकरण",
      priceRange: "₹999 - ₹15,999",
      bestseller: "Designer Table Lamp",
      bestsellerHi: "डिज़ाइनर टेबल लैंप",
      image: "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "Lightbulb",
      itemCount: 267,
      color: "from-pink-500 to-pink-600"
    }
  ];

  const handleCategoryClick = (categoryId) => {
    console.log(`Navigating to category: ${categoryId}`);
    // In a real app, this would navigate to the category page
  };

  // Loading state
  if (!isLoaded) {
    return (
      <section id="collections" className="section-padding bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-screen-2xl mx-auto container-padding">
          <div className="section-header">
            <h2 className="section-title">
              {currentLanguage === 'hi' ? 'हमारे संग्रह खोजें' : 'Explore Our Collections'}
            </h2>
            <p className="section-subtitle">
              {currentLanguage === 'hi' ?'आपके घर और कार्यालय के लिए गुणवत्तापूर्ण फर्नीचर की विस्तृत श्रृंखला' :'Wide range of quality furniture for your home and office needs'
            }
          </p>
          </div>
          
          <div className="furniture-grid-hero">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="furniture-card-hero animate-pulse">
                <div className="skeleton-image"></div>
                <div className="p-8">
                  <div className="skeleton-title mb-3"></div>
                  <div className="skeleton-text mb-6"></div>
                  <div className="h-12 bg-muted rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="collections" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-screen-2xl mx-auto container-padding">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            {currentLanguage === 'hi' ? 'हमारे संग्रह खोजें' : 'Explore Our Collections'}
          </h2>
          <p className="section-subtitle">
            {currentLanguage === 'hi' ?'आपके घर और कार्यालय के लिए गुणवत्तापूर्ण फर्नीचर की विस्तृत श्रृंखला' :'Wide range of quality furniture for your home and office needs'
            }
          </p>
        </div>

        {/* Categories Grid */}
        <div className="furniture-grid-hero">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="furniture-card-hero group cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category.id)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={currentLanguage === 'hi' ? category.nameHi : category.name}
                  className="w-full h-full object-cover group-hover:scale-110 furniture-transition-slow"
                />
                
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/80 furniture-transition"></div>
                
                {/* Icon with gradient background */}
                <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 furniture-transition`}>
                  <Icon name={category.icon} size={24} color="white" />
                </div>
                
                {/* Item Count Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-white bg-opacity-95 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-foreground">
                    {category.itemCount} {currentLanguage === 'hi' ? 'आइटम' : 'items'}
                  </span>
                </div>

                {/* Price Range Badge */}
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg">
                  <span className="text-sm font-bold">
                    {category.priceRange}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-3 font-display">
                  {currentLanguage === 'hi' ? category.nameHi : category.name}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {currentLanguage === 'hi' ? category.descriptionHi : category.description}
                </p>

                {/* Hover Content */}
                <div className={`transition-all duration-500 ease-in-out ${
                  hoveredCategory === category.id 
                    ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 overflow-hidden'
                }`}>
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {currentLanguage === 'hi' ? 'बेस्टसेलर:' : 'Bestseller:'}
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {currentLanguage === 'hi' ? category.bestsellerHi : category.bestseller}
                        </p>
                      </div>
                      <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center group-hover:scale-110 furniture-transition`}>
                        <Icon name="ArrowRight" size={20} color="white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary furniture-transition"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {currentLanguage === 'hi' ? 'संग्रह देखें' : 'Explore Collection'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="btn-primary text-lg px-12 py-4"
            iconName="Grid3X3"
            iconPosition="right"
          >
            {currentLanguage === 'hi' ? 'सभी संग्रह देखें' : 'View All Collections'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
