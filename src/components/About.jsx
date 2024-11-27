// Import necessary modules and components
import gsap from "gsap"; // Import GSAP for animations
import { useGSAP } from "@gsap/react"; // Custom hook for using GSAP in React
import { ScrollTrigger } from "gsap/all"; // Import ScrollTrigger plugin for scroll-based animations

import AnimatedTitle from "./AnimatedTitle"; // Import a custom component for animated titles

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Functional Component: About Section
const About = () => {
  // GSAP animation logic
  useGSAP(() => {
    // Define a timeline for animations using GSAP
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip", // Element to trigger the scroll animation
        start: "center center", // Start the animation when the trigger is in the center of the viewport
        end: "+=800 center", // End the animation 800px further down the scroll
        scrub: 0.5, // Smooth animation playback as the user scrolls
        pin: true, // Pin the element during the animation
        pinSpacing: true, // Maintain spacing while the element is pinned
      },
    });

    // Animation to expand and transform the mask clip path
    clipAnimation.to(".mask-clip-path", {
      width: "100vw", // Expand the mask to full screen width
      height: "100vh", // Expand the mask to full screen height
      borderRadius: 0, // Remove border radius for a rectangular shape
    });
  });

  // JSX for the About section
  return (
    <div id="about" className="min-h-screen w-screen">
      {/* Container for text content */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* Subtext introducing the section */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to GTA 6
        </p>

        {/* Animated title component */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        {/* Additional descriptive text */}
        <div className="about-subtext">
          <p>DISCOVER THE WORLD&apos;S MOST AMBITIOUS OPEN-WORLD ADVENTURE</p>
          <p className="text-gray-500">
            Welcome to the vibrant cities of Vice City and beyond in GTA 6. Dive into an expansive, living world where every corner tells a story. From neon-lit streets to untamed wilderness, explore a world crafted for unparalleled freedom and excitement.
          </p>
        </div>
      </div>

      {/* Section for animated image reveal */}
      <div className="h-dvh w-screen" id="clip">
        {/* Mask element for clip-path animation */}
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp" // Path to the background image
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover" // Styling for image to cover the container
          />
        </div>
      </div>
    </div>
  );
};

export default About; // Export the About component
