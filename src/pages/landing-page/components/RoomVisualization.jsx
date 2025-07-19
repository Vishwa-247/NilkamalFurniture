import React, { useState, useEffect } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RoomVisualization = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [viewMode, setViewMode] = useState('before'); // 'before' or 'after'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const roomTransformations = [
    {
      id: 1,
      title: "Modern Living Room Makeover",
      titleHi: "आधुनिक लिविंग रूम मेकओवर",
      description: "Complete transformation with contemporary furniture",
      descriptionHi: "समकालीन फर्नीचर के साथ पूर्ण परिवर्तन",
      beforeImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      afterImage: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
      budget: "₹85,000",
      timeframe: "2 weeks",
      timeframeHi: "2 सप्ताह",
      items: [
        { name: "3-Seater Sofa", nameHi: "3-सीटर सोफा", price: "₹45,000" },
        { name: "Coffee Table", nameHi: "कॉफी टेबल", price: "₹12,000" },
        { name: "TV Unit", nameHi: "टीवी यूनिट", price: "₹18,000" },
        { name: "Side Tables", nameHi: "साइड टेबल", price: "₹10,000" }
      ]
    },
    {
      id: 2,
      title: "Cozy Bedroom Setup",
      titleHi: "आरामदायक बेडरूम सेटअप",
      description: "Comfortable and stylish bedroom furniture",
      descriptionHi: "आरामदायक और स्टाइलिश बेडरूम फर्नीचर",
      beforeImage: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
      afterImage: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800",
      budget: "₹75,000",
      timeframe: "10 days",
      timeframeHi: "10 दिन",
      items: [
        { name: "King Size Bed", nameHi: "किंग साइज़ बेड", price: "₹35,000" },
        { name: "Wardrobe", nameHi: "अलमारी", price: "₹25,000" },
        { name: "Dresser", nameHi: "ड्रेसर", price: "₹15,000" }
      ]
    },
    {
      id: 3,
      title: "Professional Office Space",
      titleHi: "पेशेवर कार्यालय स्थान",
      description: "Productive workspace with ergonomic furniture",
      descriptionHi: "एर्गोनॉमिक फर्नीचर के साथ उत्पादक कार्यक्षेत्र",
      beforeImage: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800",
      afterImage: "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800",
      budget: "₹55,000",
      timeframe: "1 week",
      timeframeHi: "1 सप्ताह",
      items: [
        { name: "Executive Desk", nameHi: "एक्जीक्यूटिव डेस्क", price: "₹25,000" },
        { name: "Office Chair", nameHi: "ऑफिस चेयर", price: "₹15,000" },
        { name: "Storage Cabinet", nameHi: "स्टोरेज कैबिनेट", price: "₹15,000" }
      ]
    },
    {
      id: 4,
      title: "Elegant Dining Area",
      titleHi: "सुरुचिपूर्ण भोजन क्षेत्र",
      description: "Perfect dining setup for family gatherings",
      descriptionHi: "पारिवारिक मेल-जोल के लिए परफेक्ट डाइनिंग सेटअप",
      beforeImage: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800",
      afterImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      budget: "₹65,000",
      timeframe: "1 week",
      timeframeHi: "1 सप्ताह",
      items: [
        { name: "6-Seater Dining Table", nameHi: "6-सीटर डाइनिंग टेबल", price: "₹35,000" },
        { name: "Dining Chairs", nameHi: "डाइनिंग चेयर", price: "₹18,000" },
        { name: "Buffet Cabinet", nameHi: "बुफे कैबिनेट", price: "₹12,000" }
      ]
    }
  ];

  const currentRoom = roomTransformations[selectedRoom];

  const handleGetQuote = () => {
    console.log('Getting quote for room transformation:', currentRoom);
  };

  const handleViewProducts = () => {
    console.log('Viewing products for room:', currentRoom);
  };

  return (
    <section id="room-ideas" className="py-16 bg-muted">
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {currentLanguage === 'hi' ? 'कमरे के विचार' : 'Room Ideas'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentLanguage === 'hi' ?'देखें कि हमारे फर्नीचर से आपका स्थान कैसे बदल सकता है' :'See how your space can transform with our furniture'
            }
          </p>
        </div>

        {/* Room Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {roomTransformations.map((room, index) => (
            <Button
              key={room.id}
              variant={selectedRoom === index ? "default" : "outline"}
              onClick={() => setSelectedRoom(index)}
              className="text-sm"
            >
              {currentLanguage === 'hi' ? room.titleHi : room.title}
            </Button>
          ))}
        </div>

        {/* Main Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Before/After Images */}
          <div className="space-y-6">
            {/* View Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={viewMode === 'before' ? "default" : "outline"}
                onClick={() => setViewMode('before')}
                size="sm"
              >
                {currentLanguage === 'hi' ? 'पहले' : 'Before'}
              </Button>
              <Button
                variant={viewMode === 'after' ? "default" : "outline"}
                onClick={() => setViewMode('after')}
                size="sm"
              >
                {currentLanguage === 'hi' ? 'बाद में' : 'After'}
              </Button>
            </div>

            {/* Image Display */}
            <div className="relative aspect-video rounded-xl overflow-hidden furniture-shadow-card">
              <Image
                src={viewMode === 'before' ? currentRoom.beforeImage : currentRoom.afterImage}
                alt={`${currentLanguage === 'hi' ? currentRoom.titleHi : currentRoom.title} - ${viewMode}`}
                className="w-full h-full object-cover"
              />
              
              {/* View Mode Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-background bg-opacity-90 rounded-full">
                <span className="text-sm font-medium text-foreground">
                  {viewMode === 'before' 
                    ? (currentLanguage === 'hi' ? 'पहले' : 'Before')
                    : (currentLanguage === 'hi' ? 'बाद में' : 'After')
                  }
                </span>
              </div>
            </div>

            {/* Quick Switch */}
            <div className="flex items-center justify-center">
              <Button
                variant="ghost"
                onClick={() => setViewMode(viewMode === 'before' ? 'after' : 'before')}
                iconName="RefreshCw"
                iconPosition="left"
              >
                {currentLanguage === 'hi' ? 'दृश्य बदलें' : 'Switch View'}
              </Button>
            </div>
          </div>

          {/* Room Details */}
          <div className="bg-background rounded-xl p-6 furniture-shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {currentLanguage === 'hi' ? currentRoom.titleHi : currentRoom.title}
            </h3>
            
            <p className="text-muted-foreground mb-6">
              {currentLanguage === 'hi' ? currentRoom.descriptionHi : currentRoom.description}
            </p>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold text-primary mb-1">
                  {currentRoom.budget}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentLanguage === 'hi' ? 'कुल बजट' : 'Total Budget'}
                </div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold text-primary mb-1">
                  {currentLanguage === 'hi' ? currentRoom.timeframeHi : currentRoom.timeframe}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentLanguage === 'hi' ? 'समय सीमा' : 'Timeframe'}
                </div>
              </div>
            </div>

            {/* Furniture Items */}
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">
                {currentLanguage === 'hi' ? 'शामिल फर्नीचर:' : 'Furniture Included:'}
              </h4>
              <div className="space-y-2">
                {currentRoom.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <span className="text-foreground">
                      {currentLanguage === 'hi' ? item.nameHi : item.name}
                    </span>
                    <span className="font-medium text-primary">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleGetQuote}
                className="w-full"
                iconName="Calculator"
                iconPosition="left"
              >
                {currentLanguage === 'hi' ? 'कस्टम कोट प्राप्त करें' : 'Get Custom Quote'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleViewProducts}
                className="w-full"
                iconName="Eye"
                iconPosition="left"
              >
                {currentLanguage === 'hi' ? 'उत्पाद देखें' : 'View Products'}
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Room Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roomTransformations.map((room, index) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(index)}
              className={`relative aspect-square rounded-lg overflow-hidden furniture-transition ${
                selectedRoom === index 
                  ? 'ring-2 ring-primary ring-offset-2' :'hover:opacity-80'
              }`}
            >
              <Image
                src={room.afterImage}
                alt={currentLanguage === 'hi' ? room.titleHi : room.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <div className="p-3 w-full">
                  <h5 className="text-white font-medium text-sm text-center">
                    {currentLanguage === 'hi' ? room.titleHi : room.title}
                  </h5>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-background rounded-xl furniture-shadow-card">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {currentLanguage === 'hi' ?'अपना सपनों का कमरा बनाने के लिए तैयार हैं?' :'Ready to Create Your Dream Room?'
            }
          </h3>
          <p className="text-muted-foreground mb-6">
            {currentLanguage === 'hi' ?'हमारे डिज़ाइन विशेषज्ञों से मुफ्त परामर्श प्राप्त करें' :'Get a free consultation with our design experts'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              iconName="Phone"
              iconPosition="left"
            >
              {currentLanguage === 'hi' ? 'मुफ्त परामर्श बुक करें' : 'Book Free Consultation'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
            >
              {currentLanguage === 'hi' ? 'व्हाट्सऐप पर चैट करें' : 'Chat on WhatsApp'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomVisualization;