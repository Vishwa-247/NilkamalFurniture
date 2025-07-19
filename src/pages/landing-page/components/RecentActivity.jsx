import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const recentActivities = [
    {
      id: 1,
      customerName: "Priya",
      customerNameHi: "प्रिया",
      location: "Mumbai",
      locationHi: "मुंबई",
      product: "3-Seater Sofa Set",
      productHi: "3-सीटर सोफा सेट",
      timeAgo: "2 minutes ago",
      timeAgoHi: "2 मिनट पहले",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      action: "purchased",
      actionHi: "खरीदा"
    },
    {
      id: 2,
      customerName: "Rajesh",
      customerNameHi: "राजेश",
      location: "Delhi",
      locationHi: "दिल्ली",
      product: "Office Chair",
      productHi: "ऑफिस चेयर",
      timeAgo: "5 minutes ago",
      timeAgoHi: "5 मिनट पहले",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      action: "added to cart",
      actionHi: "कार्ट में जोड़ा"
    },
    {
      id: 3,
      customerName: "Anita",
      customerNameHi: "अनीता",
      location: "Bangalore",
      locationHi: "बैंगलोर",
      product: "Dining Table Set",
      productHi: "डाइनिंग टेबल सेट",
      timeAgo: "8 minutes ago",
      timeAgoHi: "8 मिनट पहले",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      action: "purchased",
      actionHi: "खरीदा"
    },
    {
      id: 4,
      customerName: "Vikram",
      customerNameHi: "विक्रम",
      location: "Chennai",
      locationHi: "चेन्नई",
      product: "King Size Bed",
      productHi: "किंग साइज़ बेड",
      timeAgo: "12 minutes ago",
      timeAgoHi: "12 मिनट पहले",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      action: "purchased",
      actionHi: "खरीदा"
    },
    {
      id: 5,
      customerName: "Meera",
      customerNameHi: "मीरा",
      location: "Pune",
      locationHi: "पुणे",
      product: "Wardrobe",
      productHi: "अलमारी",
      timeAgo: "15 minutes ago",
      timeAgoHi: "15 मिनट पहले",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      action: "added to wishlist",
      actionHi: "विशलिस्ट में जोड़ा"
    },
    {
      id: 6,
      customerName: "Arjun",
      customerNameHi: "अर्जुन",
      location: "Hyderabad",
      locationHi: "हैदराबाद",
      product: "Coffee Table",
      productHi: "कॉफी टेबल",
      timeAgo: "18 minutes ago",
      timeAgoHi: "18 मिनट पहले",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      action: "purchased",
      actionHi: "खरीदा"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % recentActivities.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(timer);
  }, [recentActivities.length]);

  const currentItem = recentActivities[currentActivity];

  const getActionIcon = (action) => {
    switch (action) {
      case 'purchased':
        return 'ShoppingBag';
      case 'added to cart':
        return 'ShoppingCart';
      case 'added to wishlist':
        return 'Heart';
      default:
        return 'User';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'purchased':
        return 'text-success';
      case 'added to cart':
        return 'text-primary';
      case 'added to wishlist':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden lg:block">
      <div className={`bg-background border border-border rounded-lg shadow-lg p-4 max-w-sm furniture-transition ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        <div className="flex items-center space-x-3">
          {/* Customer Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={currentItem.avatar}
              alt={currentLanguage === 'hi' ? currentItem.customerNameHi : currentItem.customerName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Activity Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-foreground text-sm">
                {currentLanguage === 'hi' ? currentItem.customerNameHi : currentItem.customerName}
              </span>
              <span className="text-xs text-muted-foreground">
                {currentLanguage === 'hi' ? 'से' : 'from'} {currentLanguage === 'hi' ? currentItem.locationHi : currentItem.location}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 mb-1">
              <Icon 
                name={getActionIcon(currentItem.action)} 
                size={12} 
                className={getActionColor(currentItem.action)} 
              />
              <span className="text-xs text-muted-foreground">
                {currentLanguage === 'hi' ? currentItem.actionHi : currentItem.action}
              </span>
            </div>
            
            <p className="text-xs font-medium text-foreground truncate">
              {currentLanguage === 'hi' ? currentItem.productHi : currentItem.product}
            </p>
            
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'hi' ? currentItem.timeAgoHi : currentItem.timeAgo}
            </p>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">
              {currentLanguage === 'hi' ? 'लाइव' : 'Live'}
            </span>
          </div>
        </div>

        {/* Activity Counter */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ? 'हाल की गतिविधि' : 'Recent Activity'}
          </span>
          <div className="flex space-x-1">
            {recentActivities.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full furniture-transition ${
                  index === currentActivity ? 'bg-primary' : 'bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;