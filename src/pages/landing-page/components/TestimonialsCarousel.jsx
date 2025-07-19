import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialsCarousel = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      nameHi: "प्रिया शर्मा",
      location: "Mumbai, Maharashtra",
      locationHi: "मुंबई, महाराष्ट्र",
      rating: 5,
      review: "Excellent quality furniture at amazing prices! The sofa set I bought is perfect for my living room. Delivery was on time and the team was very professional.",
      reviewHi: "अद्भुत कीमतों पर उत्कृष्ट गुणवत्ता का फर्नीचर! मैंने जो सोफा सेट खरीदा है वह मेरे लिविंग रूम के लिए बिल्कुल सही है। डिलीवरी समय पर थी और टीम बहुत पेशेवर थी।",
      product: "3-Seater Sofa Set",
      productHi: "3-सीटर सोफा सेट",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      purchaseDate: "2 weeks ago",
      purchaseDateHi: "2 सप्ताह पहले"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      nameHi: "राजेश कुमार",
      location: "Delhi, NCR",
      locationHi: "दिल्ली, एनसीआर",
      rating: 5,
      review: "Outstanding service! I furnished my entire office with their furniture. The quality is top-notch and the prices are very competitive. Highly recommended!",
      reviewHi: "उत्कृष्ट सेवा! मैंने अपने पूरे कार्यालय को उनके फर्नीचर से सजाया है। गुणवत्ता शीर्ष स्तर की है और कीमतें बहुत प्रतिस्पर्धी हैं। अत्यधिक अनुशंसित!",
      product: "Office Furniture Set",
      productHi: "ऑफिस फर्नीचर सेट",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      purchaseDate: "1 month ago",
      purchaseDateHi: "1 महीने पहले"
    },
    {
      id: 3,
      name: "Anita Patel",
      nameHi: "अनीता पटेल",
      location: "Ahmedabad, Gujarat",
      locationHi: "अहमदाबाद, गुजरात",
      rating: 4,
      review: "Great experience shopping here! The bedroom set I ordered arrived perfectly packed. The assembly service was also very helpful. Will definitely shop again.",
      reviewHi: "यहाँ खरीदारी का बेहतरीन अनुभव! मैंने जो बेडरूम सेट ऑर्डर किया था वह बिल्कुल सही तरीके से पैक होकर आया। असेंबली सेवा भी बहुत सहायक थी। निश्चित रूप से फिर से खरीदारी करूंगी।",
      product: "King Size Bedroom Set",
      productHi: "किंग साइज़ बेडरूम सेट",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      purchaseDate: "3 weeks ago",
      purchaseDateHi: "3 सप्ताह पहले"
    },
    {
      id: 4,
      name: "Vikram Singh",
      nameHi: "विक्रम सिंह",
      location: "Bangalore, Karnataka",
      locationHi: "बैंगलोर, कर्नाटक",
      rating: 5,
      review: "Fantastic quality and service! The dining table set is beautiful and sturdy. Customer support was very responsive when I had questions. Excellent value for money.",
      reviewHi: "शानदार गुणवत्ता और सेवा! डाइनिंग टेबल सेट सुंदर और मजबूत है। जब मेरे पास प्रश्न थे तो ग्राहक सहायता बहुत उत्तरदायी थी। पैसे के लिए उत्कृष्ट मूल्य।",
      product: "6-Seater Dining Set",
      productHi: "6-सीटर डाइनिंग सेट",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      purchaseDate: "1 week ago",
      purchaseDateHi: "1 सप्ताह पहले"
    },
    {
      id: 5,
      name: "Meera Reddy",
      nameHi: "मीरा रेड्डी",
      location: "Hyderabad, Telangana",
      locationHi: "हैदराबाद, तेलंगाना",
      rating: 5,
      review: "Amazing furniture store! I bought a complete living room set and I\'m extremely satisfied. The quality exceeded my expectations and the delivery was prompt.",
      reviewHi: "अद्भुत फर्नीचर स्टोर! मैंने एक पूरा लिविंग रूम सेट खरीदा और मैं बेहद संतुष्ट हूँ। गुणवत्ता ने मेरी अपेक्षाओं को पार कर दिया और डिलीवरी तुरंत थी।",
      product: "Complete Living Room Set",
      productHi: "पूरा लिविंग रूम सेट",
      image: "https://randomuser.me/api/portraits/women/41.jpg",
      purchaseDate: "2 months ago",
      purchaseDateHi: "2 महीने पहले"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
      );
    }
    return stars;
  };

  const currentReview = testimonials[currentTestimonial];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {currentLanguage === 'hi' ? 'ग्राहक समीक्षाएं' : 'Customer Reviews'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentLanguage === 'hi' ?'हमारे खुश ग्राहकों की वास्तविक समीक्षाएं और अनुभव' :'Real reviews and experiences from our happy customers'
            }
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 furniture-shadow-card">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Customer Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
                  <Image
                    src={currentReview.image}
                    alt={currentLanguage === 'hi' ? currentReview.nameHi : currentReview.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars */}
                <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                  {renderStars(currentReview.rating)}
                </div>

                {/* Review Text */}
                <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                  "{currentLanguage === 'hi' ? currentReview.reviewHi : currentReview.review}"
                </blockquote>

                {/* Customer Info */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-lg">
                    {currentLanguage === 'hi' ? currentReview.nameHi : currentReview.name}
                  </h4>
                  <p className="text-muted-foreground">
                    {currentLanguage === 'hi' ? currentReview.locationHi : currentReview.location}
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
                    <span>
                      {currentLanguage === 'hi' ? 'खरीदा:' : 'Purchased:'} {currentLanguage === 'hi' ? currentReview.productHi : currentReview.product}
                    </span>
                    <span>•</span>
                    <span>
                      {currentLanguage === 'hi' ? currentReview.purchaseDateHi : currentReview.purchaseDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-background border border-border hover:bg-muted"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-background border border-border hover:bg-muted"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full furniture-transition ${
                index === currentTestimonial
                  ? 'bg-primary' :'bg-muted-foreground hover:bg-primary'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-sm text-muted-foreground">
              {currentLanguage === 'hi' ? 'औसत रेटिंग' : 'Average Rating'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">
              {currentLanguage === 'hi' ? 'खुश ग्राहक' : 'Happy Customers'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">99.5%</div>
            <div className="text-sm text-muted-foreground">
              {currentLanguage === 'hi' ? 'संतुष्टि दर' : 'Satisfaction Rate'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">2,500+</div>
            <div className="text-sm text-muted-foreground">
              {currentLanguage === 'hi' ? '5-स्टार समीक्षाएं' : '5-Star Reviews'}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
          >
            {currentLanguage === 'hi' ? 'अपनी समीक्षा साझा करें' : 'Share Your Review'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;