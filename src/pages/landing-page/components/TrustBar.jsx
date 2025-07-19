import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TrustBar = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const trustItems = [
    {
      icon: "Users",
      value: "50,000+",
      label: "Happy Families",
      labelHi: "खुश परिवार",
      color: "text-success"
    },
    {
      icon: "Truck",
      value: "99.5%",
      label: "On-Time Delivery",
      labelHi: "समय पर डिलीवरी",
      color: "text-primary"
    },
    {
      icon: "Shield",
      value: "100%",
      label: "Secure Payments",
      labelHi: "सुरक्षित भुगतान",
      color: "text-orange"
    },
    {
      icon: "Award",
      value: "4.8/5",
      label: "Customer Rating",
      labelHi: "ग्राहक रेटिंग",
      color: "text-warning"
    }
  ];

  const paymentBadges = [
    { name: "Razorpay", logo: "CreditCard" },
    { name: "PayU", logo: "Smartphone" },
    { name: "SSL", logo: "Lock" }
  ];

  return (
    <div className="bg-muted py-6 border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          {/* Trust Metrics */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-8">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-background ${item.color}`}>
                  <Icon name={item.icon} size={20} />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentLanguage === 'hi' ? item.labelHi : item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Security Badges */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {currentLanguage === 'hi' ? 'सुरक्षित भुगतान:' : 'Secure Payments:'}
            </span>
            <div className="flex items-center space-x-3">
              {paymentBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 px-3 py-1 bg-background rounded-lg border border-border"
                >
                  <Icon name={badge.logo} size={16} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;