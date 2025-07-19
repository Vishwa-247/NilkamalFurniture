import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const slides = [
    {
      id: 1,
      title: "Transform Your Home with Premium Furniture",
      titleHi: "प्रीमियम फर्नीचर के साथ अपने घर को बदलें",
      subtitle: "Discover elegant designs that blend comfort with sophistication",
      subtitleHi: "आराम और परिष्कार को मिलाने वाले सुरुचिपूर्ण डिज़ाइन खोजें",
      cta: "Explore Collection",
      ctaHi: "संग्रह देखें",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      discount: "UP TO 40% OFF",
      discountHi: "40% तक छूट",
      badge: "New Arrival",
      badgeHi: "नया आगमन"
    },
    {
      id: 2,
      title: "Quality Furniture for Every Indian Family",
      titleHi: "हर भारतीय परिवार के लिए गुणवत्तापूर्ण फर्नीचर",
      subtitle: "Trusted by 50,000+ families across India",
      subtitleHi: "भारत भर के 50,000+ परिवारों का भरोसा",
      cta: "Shop Now",
      ctaHi: "अभी खरीदें",
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200",
      discount: "FREE DELIVERY",
      discountHi: "मुफ्त डिलीवरी",
      badge: "Best Seller",
      badgeHi: "सर्वश्रेष्ठ विक्रेता"
    },
    {
      id: 3,
      title: "Office Solutions Starting ₹5,999",
      titleHi: "कार्यालय समाधान ₹5,999 से शुरू",
      subtitle: "Professional furniture for modern workspaces",
      subtitleHi: "आधुनिक कार्यक्षेत्रों के लिए पेशेवर फर्नीचर",
      cta: "Shop Office",
      ctaHi: "ऑफिस फर्नीचर खरीदें",
      image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1200",
      discount: "FROM ₹5,999",
      discountHi: "₹5,999 से",
      badge: "Office Collection",
      badgeHi: "ऑफिस संग्रह"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleShopNow = () => {
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-background">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={currentLanguage === 'hi' ? slide.titleHi : slide.title}
                className="w-full h-full object-cover"
              />
              
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-overlay"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-screen-2xl mx-auto container-padding w-full">
                  <div className="max-w-3xl text-white">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground rounded-full font-bold text-sm mb-6 shadow-lg">
                      <Icon name="Star" size={16} className="mr-2" />
                      {currentLanguage === 'hi' ? slide.badgeHi : slide.badge}
                    </div>
                    
                    {/* Discount Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-lg mb-8 shadow-xl ml-4">
                      <Icon name="Tag" size={20} className="mr-3" />
                      {currentLanguage === 'hi' ? slide.discountHi : slide.discount}
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-display">
                      {currentLanguage === 'hi' ? slide.titleHi : slide.title}
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl lg:text-3xl mb-10 opacity-95 leading-relaxed">
                      {currentLanguage === 'hi' ? slide.subtitleHi : slide.subtitle}
                    </p>
                    
                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleShopNow}
                        size="lg"
                        className="btn-primary text-xl px-10 py-4 shadow-2xl hover:shadow-3xl"
                        iconName="ShoppingCart"
                        iconPosition="right"
                      >
                        {currentLanguage === 'hi' ? slide.ctaHi : slide.cta}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        className="btn-outline text-xl px-10 py-4 border-white text-white hover:bg-white hover:text-foreground"
                        iconName="Play"
                        iconPosition="right"
                      >
                        {currentLanguage === 'hi' ? 'वीडियो देखें' : 'Watch Video'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center furniture-transition backdrop-blur-sm border border-white border-opacity-30 hover:scale-110"
      >
        <Icon name="ChevronLeft" size={28} color="white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center furniture-transition backdrop-blur-sm border border-white border-opacity-30 hover:scale-110"
      >
        <Icon name="ChevronRight" size={28} color="white" />
      </button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full furniture-transition ${
              index === currentSlide
                ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-20">
        <div 
          className="h-full bg-white transition-all duration-1000 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
          <div className="text-white text-center">
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-sm opacity-90">Happy Customers</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-20 hidden lg:block">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
          <div className="text-white text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm opacity-90">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
