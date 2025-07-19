import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrustDelivery = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const deliveryZones = [
    {
      state: "Maharashtra",
      stateHi: "महाराष्ट्र",
      cities: ["Mumbai", "Pune", "Nagpur", "Nashik"],
      citiesHi: ["मुंबई", "पुणे", "नागपुर", "नाशिक"],
      deliveryTime: "2-3 days",
      deliveryTimeHi: "2-3 दिन",
      coverage: "95%"
    },
    {
      state: "Delhi NCR",
      stateHi: "दिल्ली एनसीआर",
      cities: ["Delhi", "Gurgaon", "Noida", "Faridabad"],
      citiesHi: ["दिल्ली", "गुड़गांव", "नोएडा", "फरीदाबाद"],
      deliveryTime: "1-2 days",
      deliveryTimeHi: "1-2 दिन",
      coverage: "98%"
    },
    {
      state: "Karnataka",
      stateHi: "कर्नाटक",
      cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
      citiesHi: ["बैंगलोर", "मैसूर", "हुबली", "मंगलौर"],
      deliveryTime: "2-4 days",
      deliveryTimeHi: "2-4 दिन",
      coverage: "90%"
    },
    {
      state: "Gujarat",
      stateHi: "गुजरात",
      cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
      citiesHi: ["अहमदाबाद", "सूरत", "वडोदरा", "राजकोट"],
      deliveryTime: "2-3 days",
      deliveryTimeHi: "2-3 दिन",
      coverage: "92%"
    },
    {
      state: "Tamil Nadu",
      stateHi: "तमिल नाडु",
      cities: ["Chennai", "Coimbatore", "Madurai", "Salem"],
      citiesHi: ["चेन्नई", "कोयंबटूर", "मदुरै", "सेलम"],
      deliveryTime: "3-5 days",
      deliveryTimeHi: "3-5 दिन",
      coverage: "88%"
    }
  ];

  const guarantees = [
    {
      icon: "Shield",
      title: "30-Day Money Back",
      titleHi: "30-दिन पैसे वापसी",
      description: "Full refund if not satisfied",
      descriptionHi: "संतुष्ट नहीं हैं तो पूरा पैसा वापस",
      color: "text-success"
    },
    {
      icon: "Truck",
      title: "Free Delivery",
      titleHi: "मुफ्त डिलीवरी",
      description: "On orders above ₹50,000",
      descriptionHi: "₹50,000 से अधिक के ऑर्डर पर",
      color: "text-primary"
    },
    {
      icon: "Wrench",
      title: "Free Assembly",
      titleHi: "मुफ्त असेंबली",
      description: "Professional installation included",
      descriptionHi: "पेशेवर इंस्टॉलेशन शामिल",
      color: "text-orange"
    },
    {
      icon: "Clock",
      title: "On-Time Guarantee",
      titleHi: "समय पर गारंटी",
      description: "99.5% delivery success rate",
      descriptionHi: "99.5% डिलीवरी सफलता दर",
      color: "text-warning"
    }
  ];

  const serviceFeatures = [
    {
      icon: "Phone",
      title: "24/7 Customer Support",
      titleHi: "24/7 ग्राहक सहायता",
      description: "Always here to help you",
      descriptionHi: "आपकी मदद के लिए हमेशा यहाँ"
    },
    {
      icon: "Star",
      title: "Quality Assurance",
      titleHi: "गुणवत्ता आश्वासन",
      description: "Rigorous quality checks",
      descriptionHi: "कठोर गुणवत्ता जांच"
    },
    {
      icon: "Award",
      title: "Certified Products",
      titleHi: "प्रमाणित उत्पाद",
      description: "ISI & BIS certified furniture",
      descriptionHi: "ISI और BIS प्रमाणित फर्नीचर"
    },
    {
      icon: "Users",
      title: "Expert Team",
      titleHi: "विशेषज्ञ टीम",
      description: "Trained professionals",
      descriptionHi: "प्रशिक्षित पेशेवर"
    }
  ];

  const handleCheckDelivery = () => {
    if (selectedState) {
      console.log('Checking delivery for:', selectedState);
    }
  };

  return (
    <section id="delivery" className="py-16 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {currentLanguage === 'hi' ? 'विश्वसनीय डिलीवरी' : 'Trusted Delivery'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentLanguage === 'hi' ?'पूरे भारत में तेज़ और सुरक्षित डिलीवरी के साथ आपके घर तक फर्नीचर पहुंचाते हैं' :'Fast and secure delivery across India, bringing furniture right to your doorstep'
            }
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="bg-card rounded-xl p-6 text-center furniture-shadow-card hover:shadow-lg furniture-transition">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center ${guarantee.color}`}>
                <Icon name={guarantee.icon} size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {currentLanguage === 'hi' ? guarantee.titleHi : guarantee.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'hi' ? guarantee.descriptionHi : guarantee.description}
              </p>
            </div>
          ))}
        </div>

        {/* Delivery Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Map */}
          <div className="bg-card rounded-xl p-6 furniture-shadow-card">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {currentLanguage === 'hi' ? 'डिलीवरी क्षेत्र' : 'Delivery Coverage'}
            </h3>
            
            {/* Mock India Map */}
            <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="India Delivery Coverage"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=20.5937,78.9629&z=5&output=embed"
                className="rounded-lg"
              />
            </div>

            {/* Coverage Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">
                  {currentLanguage === 'hi' ? 'शहर' : 'Cities'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">28</div>
                <div className="text-sm text-muted-foreground">
                  {currentLanguage === 'hi' ? 'राज्य' : 'States'}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Zones */}
          <div className="bg-card rounded-xl p-6 furniture-shadow-card">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {currentLanguage === 'hi' ? 'डिलीवरी समय' : 'Delivery Timeline'}
            </h3>

            {/* State Selector */}
            <div className="mb-4">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">
                  {currentLanguage === 'hi' ? 'अपना राज्य चुनें' : 'Select your state'}
                </option>
                {deliveryZones.map((zone, index) => (
                  <option key={index} value={zone.state}>
                    {currentLanguage === 'hi' ? zone.stateHi : zone.state}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Info */}
            {selectedState && (
              <div className="space-y-4">
                {deliveryZones
                  .filter(zone => zone.state === selectedState)
                  .map((zone, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-foreground">
                          {currentLanguage === 'hi' ? zone.stateHi : zone.state}
                        </h4>
                        <span className="text-sm font-medium text-success">
                          {zone.coverage} {currentLanguage === 'hi' ? 'कवरेज' : 'Coverage'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {currentLanguage === 'hi' ? 'डिलीवरी समय:' : 'Delivery Time:'}
                          </p>
                          <p className="font-medium text-foreground">
                            {currentLanguage === 'hi' ? zone.deliveryTimeHi : zone.deliveryTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {currentLanguage === 'hi' ? 'मुख्य शहर:' : 'Major Cities:'}
                          </p>
                          <p className="font-medium text-foreground">
                            {currentLanguage === 'hi' ? zone.citiesHi.slice(0, 2).join(', ')
                              : zone.cities.slice(0, 2).join(', ')
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            <Button
              onClick={handleCheckDelivery}
              disabled={!selectedState}
              className="w-full mt-4"
              iconName="MapPin"
              iconPosition="left"
            >
              {currentLanguage === 'hi' ? 'डिलीवरी चेक करें' : 'Check Delivery'}
            </Button>
          </div>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serviceFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon} size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  {currentLanguage === 'hi' ? feature.titleHi : feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'hi' ? feature.descriptionHi : feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Service CTA */}
        <div className="text-center bg-card rounded-xl p-8 furniture-shadow-card">
          <Icon name="Headphones" size={48} className="text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-4">
            {currentLanguage === 'hi' ?'डिलीवरी के बारे में कोई सवाल?' :'Questions About Delivery?'
            }
          </h3>
          <p className="text-muted-foreground mb-6">
            {currentLanguage === 'hi' ?'हमारी टीम आपकी मदद के लिए 24/7 उपलब्ध है' :'Our team is available 24/7 to help you'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              iconName="Phone"
              iconPosition="left"
            >
              {currentLanguage === 'hi' ? 'कॉल करें' : 'Call Now'}
            </Button>
            <Button
              variant="outline"
              iconName="MessageCircle"
              iconPosition="left"
            >
              {currentLanguage === 'hi' ? 'लाइव चैट' : 'Live Chat'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustDelivery;