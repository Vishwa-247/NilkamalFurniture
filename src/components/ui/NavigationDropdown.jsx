import { useEffect, useRef, useState } from "react";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import Icon from "../AppIcon";

const NavigationDropdown = ({
  title,
  children,
  className = "",
  dropdownClassName = "",
  hoverDelay = 100,
  leaveDelay = 200,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("left");
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const deviceState = useDeviceDetection();

  const calculateDropdownPosition = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 256; // min-w-64 = 16rem = 256px

      // Check if dropdown would go off the right edge
      if (triggerRect.left + dropdownWidth > viewportWidth - 20) {
        setDropdownPosition("right");
      } else {
        setDropdownPosition("left");
      }
    }
  };

  const clearTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    // Skip hover behavior on touch devices
    if (deviceState.prefersTouchInteraction) return;

    clearTimeout();
    setIsHovering(true);

    // Calculate position before opening
    calculateDropdownPosition();

    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, hoverDelay);
  };

  const handleMouseLeave = () => {
    // Skip hover behavior on touch devices
    if (deviceState.prefersTouchInteraction) return;

    setIsHovering(false);
    clearTimeout();
    
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, leaveDelay);
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout();
    setIsHovering(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHovering(false);
    clearTimeout();
    
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, leaveDelay);
  };

  const handleClick = () => {
    // Handle click for touch devices
    if (deviceState.prefersTouchInteraction) {
      if (isOpen) {
        setIsOpen(false);
      } else {
        calculateDropdownPosition();
        setIsOpen(true);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        className="nav-dropdown-trigger group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="group-hover:text-primary furniture-transition">{title}</span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transform transition-transform duration-200 group-hover:text-primary ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute top-full mt-2 bg-popover border border-border rounded-xl shadow-xl z-50 backdrop-blur-sm ${
            dropdownPosition === "right" ? "right-0" : "left-0"
          } ${dropdownClassName} animate-in fade-in-0 slide-in-from-top-2 duration-200`}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          style={{
            minWidth: '680px',
            maxWidth: '700px'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default NavigationDropdown;
