import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSignup = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const categories = [
    { id: 'living', name: 'Living Room', nameHi: 'बैठक', icon: 'Sofa' },
    { id: 'bedroom', name: 'Bedroom', nameHi: 'शयन कक्ष', icon: 'Bed' },
    { id: 'office', name: 'Office', nameHi: 'कार्यालय', icon: 'Briefcase' },
    { id: 'dining', name: 'Dining', nameHi: 'भोजन कक्ष', icon: 'UtensilsCrossed' },
    { id: 'storage', name: 'Storage', nameHi: 'भंडारण', icon: 'Archive' },
    { id: 'decor', name: 'Decor', nameHi: 'सजावट', icon: 'Lightbulb' }
  ];

  const benefits = [
    {
      icon: 'Tag',
      title: 'Exclusive 15% Discount',
      titleHi: 'विशेष 15% छूट',
      description: 'Get instant discount code',
      descriptionHi: 'तुरंत डिस्काउंट कोड पाएं'
    },
    {
      icon: 'Bell',
      title: 'Early Access',
      titleHi: 'पहले पहुंच',
      description: 'First to know about new arrivals',
      descriptionHi: 'नए आगमन के बारे में पहले जानें'
    },
    {
      icon: 'Gift',
      title: 'Special Offers',
      titleHi: 'विशेष ऑफर',
      description: 'Exclusive deals for subscribers',
      descriptionHi: 'सब्सक्राइबर्स के लिए विशेष डील'
    },
    {
      icon: 'Lightbulb',
      title: 'Design Tips',
      titleHi: 'डिज़ाइन टिप्स',
      description: 'Weekly home decor ideas',
      descriptionHi: 'साप्ताहिक घर सजावट के विचार'
    }
  ];

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Save to localStorage for demo
      const newsletterData = {
        email,
        categories: selectedCategories,
        language: currentLanguage,
        subscribedAt: new Date().toISOString()
      };
      localStorage.setItem('furniture-newsletter', JSON.stringify(newsletterData));
    }, 1500);
  };

  const text = {
    en: {
      title: 'Get Exclusive Furniture Deals',
      subtitle: 'Join 50,000+ subscribers and never miss a great deal',
      emailPlaceholder: 'Enter your email address',
      categoriesTitle: 'What interests you most?',
      categoriesSubtitle: 'Select your favorite furniture categories',
      subscribe: 'Subscribe Now',
      subscribing: 'Subscribing...',
      successTitle: 'Welcome to Our Family!',
      successMessage: 'Check your email for your exclusive 15% discount code',
      discountCode: 'Your discount code: WELCOME15',
      privacy: 'We respect your privacy. Unsubscribe anytime.',
      shopNow: 'Start Shopping'
    },
    hi: {
      title: 'विशेष फर्नीचर डील पाएं',
      subtitle: '50,000+ सब्सक्राइबर्स के साथ जुड़ें और कोई भी बेहतरीन डील न चूकें',
      emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
      categoriesTitle: 'आपको सबसे ज्यादा क्या दिलचस्पी है?',
      categoriesSubtitle: 'अपनी पसंदीदा फर्नीचर श्रेणियां चुनें',
      subscribe: 'अभी सब्सक्राइब करें',
      subscribing: 'सब्सक्राइब हो रहा है...',
      successTitle: 'हमारे परिवार में आपका स्वागत है!',
      successMessage: 'अपने विशेष 15% डिस्काउंट कोड के लिए अपना ईमेल चेक करें',
      discountCode: 'आपका डिस्काउंट कोड: WELCOME15',
      privacy: 'हम आपकी गोपनीयता का सम्मान करते हैं। कभी भी अनसब्सक्राइब करें।',
      shopNow: 'खरीदारी शुरू करें'
    }
  };

  const t = text[currentLanguage];

  if (isSubmitted) {
    return (
      <section className="py-16 bg-primary">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-success text-success-foreground rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={32} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t.successTitle}
            </h2>
            
            <p className="text-xl text-primary-foreground opacity-90 mb-6">
              {t.successMessage}
            </p>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-8">
              <p className="text-primary-foreground font-mono text-lg">
                {t.discountCode}
              </p>
            </div>
            
            <Button
              variant="secondary"
              size="lg"
              iconName="ShoppingBag"
              iconPosition="right"
            >
              {t.shopNow}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t.title}
            </h2>
            <p className="text-xl text-primary-foreground opacity-90 mb-8">
              {t.subtitle}
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit.icon} size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground mb-1">
                      {currentLanguage === 'hi' ? benefit.titleHi : benefit.title}
                    </h3>
                    <p className="text-sm text-primary-foreground opacity-80">
                      {currentLanguage === 'hi' ? benefit.descriptionHi : benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="bg-background rounded-2xl p-8 furniture-shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <Input
                  type="email"
                  label={currentLanguage === 'hi' ? 'ईमेल पता' : 'Email Address'}
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-lg"
                />
              </div>

              {/* Category Selection */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t.categoriesTitle}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t.categoriesSubtitle}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-lg border-2 furniture-transition ${
                        selectedCategories.includes(category.id)
                          ? 'border-primary bg-primary bg-opacity-10 text-primary' :'border-border hover:border-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={category.icon} size={20} />
                      <span className="text-xs font-medium">
                        {currentLanguage === 'hi' ? category.nameHi : category.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!email || isLoading}
                loading={isLoading}
                className="w-full"
                size="lg"
                iconName="Mail"
                iconPosition="left"
              >
                {isLoading ? t.subscribing : t.subscribe}
              </Button>

              {/* Privacy Notice */}
              <p className="text-xs text-muted-foreground text-center">
                {t.privacy}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;