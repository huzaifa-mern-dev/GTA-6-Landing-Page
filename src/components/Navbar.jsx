import clsx from "clsx"; // clsx for conditional classNames
import gsap from "gsap"; // GSAP for animations
import { useWindowScroll } from "react-use"; // Custom hook for getting scroll position
import { useEffect, useRef, useState } from "react"; // React hooks for component state and side effects
import { TiLocationArrow } from "react-icons/ti"; // Icon for "Products" button

import Button from "./Button"; // Custom Button component

// Array for navigation menu items
const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio element and the navigation container for manipulation
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  // Window scroll position using the useWindowScroll hook
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true); // State for visibility of the navbar
  const [lastScrollY, setLastScrollY] = useState(0); // To track previous scroll position for hiding/showing the navbar

  // Toggle audio and visual indicator on button click
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev); // Toggle audio play/pause
    setIsIndicatorActive((prev) => !prev); // Toggle indicator animation
  };

  // Handle audio playback: play or pause based on the state
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Handle navbar visibility and "floating-nav" class based on scroll position
  useEffect(() => {
    if (currentScrollY === 0) {
      // At the topmost position: show navbar without floating effect
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav effect
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating effect
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    // Update last scroll position
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animation for navbar visibility using GSAP
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100, // Move navbar based on visibility
      opacity: isNavVisible ? 1 : 0, // Fade in/out based on visibility
      duration: 0.2, // Duration of the transition
    });
  }, [isNavVisible]);

  return (
    // Navbar container with fixed position and responsive design
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            {/* Navigation items on larger screens */}
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`} // Linking to the section with the corresponding ID
                  className="nav-hover-btn" // Class for hover effect on links
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio button with indicator animation */}
            <button
              onClick={toggleAudioIndicator} // Toggle audio and visual indicator on click
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden" // Hiding the audio element
                src="/audio/loop.mp3" // Audio file source
                loop // Loop the audio
              />
              {/* Indicator lines that animate when audio is active */}
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive, // Apply 'active' class based on the indicator state
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`, // Stagger animation timing for each bar
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
