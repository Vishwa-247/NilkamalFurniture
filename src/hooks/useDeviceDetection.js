import { useState, useEffect } from "react";

/**
 * Custom hook to detect device capabilities and screen size
 * @returns {Object} Device detection state
 */
const useDeviceDetection = () => {
  const [deviceState, setDeviceState] = useState({
    isTouchDevice: false,
    isHoverCapable: false,
    screenSize: "desktop",
    prefersTouchInteraction: false,
  });

  useEffect(() => {
    const detectDevice = () => {
      // Detect hover capability using CSS media query
      const hasHover = window.matchMedia("(hover: hover)").matches;

      // Detect touch capability
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

      // Detect screen size
      const width = window.innerWidth;
      let screenSize = "desktop";
      if (width < 768) {
        screenSize = "mobile";
      } else if (width < 1024) {
        screenSize = "tablet";
      }

      // Determine preferred interaction method
      // Mobile devices prefer touch even if they support hover
      const prefersTouchInteraction =
        screenSize === "mobile" || (hasTouch && !hasHover);

      setDeviceState({
        isTouchDevice: hasTouch,
        isHoverCapable: hasHover,
        screenSize,
        prefersTouchInteraction,
      });
    };

    // Initial detection
    detectDevice();

    // Listen for resize events to update screen size
    const handleResize = () => {
      detectDevice();
    };

    // Listen for hover capability changes (rare but possible)
    const hoverMediaQuery = window.matchMedia("(hover: hover)");
    const handleHoverChange = () => {
      detectDevice();
    };

    window.addEventListener("resize", handleResize);

    // Modern browsers support addEventListener on MediaQueryList
    if (hoverMediaQuery.addEventListener) {
      hoverMediaQuery.addEventListener("change", handleHoverChange);
    } else {
      // Fallback for older browsers
      hoverMediaQuery.addListener(handleHoverChange);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (hoverMediaQuery.removeEventListener) {
        hoverMediaQuery.removeEventListener("change", handleHoverChange);
      } else {
        hoverMediaQuery.removeListener(handleHoverChange);
      }
    };
  }, []);

  return deviceState;
};

export default useDeviceDetection;
