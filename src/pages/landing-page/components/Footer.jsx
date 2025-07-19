import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const currentYear = new Date().getFullYear();

  const footerSections = {
    en: {
      company: {
        title: "Company",
        links: [
          { name: "About Us", href: "#about" },
          { name: "Our Story", href: "#story" },
          { name: "Careers", href: "#careers" },
          { name: "Press", href: "#press" }
        ]
      },
      products: {
        title: "Products",
        links: [
          { name: "Living Room", href: "#living-room" },
          { name: "Bedroom", href: "#bedroom" },
          { name: "Office", href: "#office" },
          { name: "Dining", href: "#dining" }
        ]
      },
      support: {
        title: "Support",
        links: [
          { name: "Help Center", href: "#help" },
          { name: "Contact Us", href: "#contact" },
          { name: "Shipping Info", href: "#shipping" },
          { name: "Returns", href: "#returns" }
        ]
      },
      legal: {
        title: "Legal",
        links: [
          { name: "Privacy Policy", href: "#privacy" },
          { name: "Terms of Service", href: "#terms" },
          { name: "Cookie Policy", href: "#cookies" },
          { name: "Refund Policy", href: "#refund" }
        ]
      }
    },
    hi: {
      company: {
        title: "कंपनी",
        links: [
          { name: "हमारे बारे में", href: "#about" },
          { name: "हमारी कहानी", href: "#story" },
          { name: "करियर", href: "#careers" },
          { name: "प्रेस", href: "#press" }
        ]
      },
      products: {
        title: "उत्पाद",
        links: [
          { name: "बैठक", href: "#living-room" },
          { name: "शयन कक्ष", href: "#bedroom" },
          { name: "कार्यालय", href: "#office" },
          { name: "भोजन कक्ष", href: "#dining" }
        ]
      },
      support: {
        title: "सहायता",
        links: [
          { name: "सहायता केंद्र", href: "#help" },
          { name: "संपर्क करें", href: "#contact" },
          { name: "शिपिंग जानकारी", href: "#shipping" },
          { name: "रिटर्न", href: "#returns" }
        ]
      },
      legal: {
        title: "कानूनी",
        links: [
          { name: "गोपनीयता नीति", href: "#privacy" },
          { name: "सेवा की शर्तें", href: "#terms" },
          { name: "कुकी नीति", href: "#cookies" },
          { name: "रिफंड नीति", href: "#refund" }
        ]
      }
    }
  };

  const contactInfo = {
    en: {
      phone: "+91 1800-123-4567",
      email: "support@myfurniturestore.com",
      address: "123 Furniture Street, Mumbai, Maharashtra 400001",
      hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM"
    },
    hi: {
      phone: "+91 1800-123-4567",
      email: "support@myfurniturestore.com",
      address: "123 फर्नीचर स्ट्रीट, मुंबई, महाराष्ट्र 400001",
      hours: "सोम-शनि: 9AM-8PM, रवि: 10AM-6PM"
    }
  };

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "#facebook" },
    { name: "Instagram", icon: "Instagram", href: "#instagram" },
    { name: "Twitter", icon: "Twitter", href: "#twitter" },
    { name: "YouTube", icon: "Youtube", href: "#youtube" },
    { name: "LinkedIn", icon: "Linkedin", href: "#linkedin" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "RuPay", icon: "CreditCard" },
    { name: "UPI", icon: "Smartphone" },
    { name: "Net Banking", icon: "Building" }
  ];

  const certifications = [
    { name: "ISI Certified", icon: "Award" },
    { name: "BIS Approved", icon: "Shield" },
    { name: "SSL Secured", icon: "Lock" },
    { name: "ISO 9001", icon: "CheckCircle" }
  ];

  const sections = footerSections[currentLanguage];
  const contact = contactInfo[currentLanguage];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Sofa" size={20} color="white" />
                </div>
                <span className="text-xl font-bold">NilKamalFurniture Store</span>
              </div>
              
              <p className="text-background opacity-80 mb-6 leading-relaxed">
                {currentLanguage === 'hi' ?'भारत का सबसे भरोसेमंद फर्नीचर स्टोर। गुणवत्तापूर्ण फर्नीचर, बेहतरीन कीमतों पर, आपके घर तक।' :'India\'s most trusted furniture store. Quality furniture at great prices, delivered to your doorstep.'
                }
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-sm">{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-sm">{contact.email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                  <span className="text-sm">{contact.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm">{contact.hours}</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(sections).map(([key, section]) => (
              <div key={key}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-background opacity-80 hover:opacity-100 hover:text-primary furniture-transition"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="py-8 border-t border-background border-opacity-20">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {currentLanguage === 'hi' ? 'हमसे जुड़ें:' : 'Follow Us:'}
              </span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-background bg-opacity-10 hover:bg-primary rounded-lg flex items-center justify-center furniture-transition"
                  title={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {currentLanguage === 'hi' ? 'न्यूज़लेटर:' : 'Newsletter:'}
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder={currentLanguage === 'hi' ? 'ईमेल दर्ज करें' : 'Enter email'}
                  className="px-4 py-2 bg-background bg-opacity-10 border border-background border-opacity-20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-l-none"
                >
                  {currentLanguage === 'hi' ? 'सब्सक्राइब' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Certifications */}
        <div className="py-6 border-t border-background border-opacity-20">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {currentLanguage === 'hi' ? 'भुगतान विकल्प:' : 'Payment Options:'}
              </span>
              <div className="flex items-center space-x-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-background bg-opacity-10 rounded flex items-center justify-center"
                    title={method.name}
                  >
                    <Icon name={method.icon} size={14} />
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {currentLanguage === 'hi' ? 'प्रमाणन:' : 'Certifications:'}
              </span>
              <div className="flex items-center space-x-2">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-background bg-opacity-10 rounded flex items-center justify-center"
                    title={cert.name}
                  >
                    <Icon name={cert.icon} size={14} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-background border-opacity-20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-background opacity-80">
              © {currentYear} NilKamalFurniture Store. {currentLanguage === 'hi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#privacy" className="text-background opacity-80 hover:opacity-100 furniture-transition">
                {currentLanguage === 'hi' ? 'गोपनीयता' : 'Privacy'}
              </a>
              <a href="#terms" className="text-background opacity-80 hover:opacity-100 furniture-transition">
                {currentLanguage === 'hi' ? 'नियम' : 'Terms'}
              </a>
              <a href="#sitemap" className="text-background opacity-80 hover:opacity-100 furniture-transition">
                {currentLanguage === 'hi' ? 'साइटमैप' : 'Sitemap'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
