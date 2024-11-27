// Import required libraries
import { gsap } from "gsap"; // GSAP for animations
import { useEffect, useRef } from "react"; // React hooks
import { ScrollTrigger } from "gsap/ScrollTrigger"; // GSAP ScrollTrigger plugin
import clsx from "clsx"; // Utility for conditional class names

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// AnimatedTitle Component
// Props: 
// - title: The text for the title, which may include HTML-like tags for custom formatting.
// - containerClass: Additional class names for styling the container.
const AnimatedTitle = ({ title, containerClass }) => {
  // Reference to the container DOM element
  const containerRef = useRef(null);

  // useEffect for setting up the animation
  useEffect(() => {
    // Create a GSAP animation context for scoped animations
    const ctx = gsap.context(() => {
      // Define the timeline for animating the title
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // Element that triggers the animation
          start: "100 bottom", // Start when 100px of the element is in the viewport
          end: "center bottom", // End when the center of the element reaches the bottom of the viewport
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
        },
      });

      // Animation settings for the individual words
      titleAnimation.to(
        ".animated-word", // Target all elements with the class 'animated-word'
        {
          opacity: 1, // Fade in the words
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", // Reset 3D transformation
          ease: "power2.inOut", // Smooth easing for animation
          stagger: 0.02, // Add a slight delay between animating each word
        },
        0 // Start the animation at the beginning of the timeline
      );
    }, containerRef);

    // Clean up animations when the component unmounts
    return () => ctx.revert();
  }, []);

  // JSX for the AnimatedTitle component
  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {/* Split the title into lines based on <br />, then render each line */}
      {title.split("<br />").map((line, index) => (
        <div
          key={index} // Unique key for each line
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3" // Styling for centering and wrapping
        >
          {/* Split each line into words and render each word as a span */}
          {line.split(" ").map((word, idx) => (
            <span
              key={idx} // Unique key for each word
              className="animated-word" // Class for animated words
              dangerouslySetInnerHTML={{ __html: word }} // Render HTML content for the word
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle; // Export the component
