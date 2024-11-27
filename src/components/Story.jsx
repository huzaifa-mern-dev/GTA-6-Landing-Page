import gsap from "gsap"; // Importing GSAP for animations
import { useRef } from "react"; // Importing useRef to reference DOM elements

import Button from "./Button"; // Importing custom Button component
import AnimatedTitle from "./AnimatedTitle"; // Importing custom AnimatedTitle component

const FloatingImage = () => {
  // Creating a reference for the image element
  const frameRef = useRef(null);

  // Handle mouse move event for image interaction
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e; // Get mouse position
    const element = frameRef.current; // Get the reference to the image element

    if (!element) return; // If element is not found, exit

    const rect = element.getBoundingClientRect(); // Get the image dimensions and position
    const xPos = clientX - rect.left; // Calculate mouse position relative to image
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2; // Find the center of the image
    const centerY = rect.height / 2;

    // Calculate rotation values based on mouse position
    const rotateX = ((yPos - centerY) / centerY) * -10; // X-axis rotation (vertical)
    const rotateY = ((xPos - centerX) / centerX) * 10; // Y-axis rotation (horizontal)

    // Animate the image rotation using GSAP
    gsap.to(element, {
      duration: 0.3, // Duration of the animation
      rotateX, // Apply calculated X rotation
      rotateY, // Apply calculated Y rotation
      transformPerspective: 500, // Add perspective for 3D effect
      ease: "power1.inOut", // Smooth easing for animation
    });
  };

  // Handle mouse leave event to reset image rotation
  const handleMouseLeave = () => {
    const element = frameRef.current; // Get reference to the image element

    if (element) {
      // Reset image rotation to default using GSAP animation
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0, // Reset X rotation
        rotateY: 0, // Reset Y rotation
        ease: "power1.inOut", // Smooth easing for reset
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      {/* Main container for the image and content */}
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>

        <div className="relative size-full">
          {/* Animated title component */}
          <AnimatedTitle
            title="the st<b>o</b>rm is <br /> a risin<b>g</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                {/* Image with mouse interaction for rotation */}
                <img
                  ref={frameRef} // Assign reference to the image element
                  onMouseMove={handleMouseMove} // Handle mouse move
                  onMouseLeave={handleMouseLeave} // Handle mouse leave
                  onMouseUp={handleMouseLeave} // Reset rotation on mouse up
                  onMouseEnter={handleMouseLeave} // Reset rotation on mouse enter
                  src="/img/entrance.webp" // Image source
                  alt="entrance.webp" // Image alt text
                  className="object-contain" // Image styling
                />
              </div>
            </div>

            {/* SVG filter (currently not visible) */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  {/* Apply Gaussian blur filter */}
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  {/* Apply color matrix for blur effect */}
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* Additional content with button */}
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Prepare for the most cinematic story mode yet, with groundbreaking characters and thrilling missions. GTA 6 is more than a game—it’s an experience.
            </p>

            {/* Button to trigger the prologue discovery */}
            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage; // Export the component
