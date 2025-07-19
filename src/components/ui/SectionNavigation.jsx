import { useEffect, useState } from "react";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import Icon from "../AppIcon";

const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isSticky, setIsSticky] = useState(false);
  const deviceState = useDeviceDetection();

  const sections = [
    {
      id: "collections",
      label: "Shop Collections",
      labelHi: "संग्रह खरीदें",
      icon: "Grid3X3",
    },
    { id: "deals", label: "Featured Deals", labelHi: "विशेष ऑफर", icon: "Tag" },
    {
      id: "room-ideas",
      label: "Room Ideas",
      labelHi: "कमरे के विचार",
      icon: "Home",
    },
    {
      id: "testimonials",
      label: "Customer Stories",
      labelHi: "ग्राहक कहानियां",
      icon: "MessageCircle",
    },
    {
      id: "delivery",
      label: "Delivery Info",
      labelHi: "डिलीवरी जानकारी",
      icon: "Truck",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = 600; // Approximate hero section height

      setIsSticky(scrollPosition > heroHeight);

      // Find active section based on scroll position
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0,
      }));

      const currentSection = sectionElements
        .filter((section) => section.element)
        .find((section, index, array) => {
          const nextSection = array[index + 1];
          const sectionTop = section.offset - 100; // Offset for header
          const sectionBottom = nextSection
            ? nextSection.offset - 100
            : document.body.scrollHeight;

          return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
        });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Header height
      const navHeight = 60; // Navigation height
      const offset = headerHeight + navHeight;

      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const currentLanguage = localStorage.getItem("furniture-language") || "en";

  return (
    <nav
      className={`bg-background border-b border-border z-40 furniture-transition ${
        isSticky ? "fixed top-16 left-0 right-0 shadow-sm" : "relative"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-center px-6 py-3">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`nav-section-item ${
                  activeSection === section.id ? "nav-item-active" : ""
                }`}
              >
                <Icon name={section.icon} size={18} />
                <span>
                  {currentLanguage === "hi" ? section.labelHi : section.label}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="md:hidden w-full">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`nav-section-item-mobile ${
                    activeSection === section.id ? "nav-item-active" : ""
                  }`}
                >
                  <Icon name={section.icon} size={16} />
                  <span className="text-xs font-medium">
                    {currentLanguage === "hi" ? section.labelHi : section.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SectionNavigation;
