import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

export const VideoPreview = ({ children }) => {
  // State to track if the mouse is hovering over the section
  const [isHovering, setIsHovering] = useState(false);

  // Refs to reference the section container and the inner content
  const sectionRef = useRef(null); // Reference for the container section
  const contentRef = useRef(null); // Reference for the inner content

  // Handles mouse movement over the container
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    // Get the dimensions of the container
    const rect = currentTarget.getBoundingClientRect();

    // Calculate the X and Y offset of the mouse relative to the center of the container
    const xOffset = clientX - (rect.left + rect.width / 2);
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      // Move the container slightly in the direction of the cursor to create a 3D effect
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2, // Add 3D rotation effect around Y-axis
        rotationX: -yOffset / 2, // Add 3D rotation effect around X-axis
        transformPerspective: 500, // Set the perspective for a more realistic 3D effect
        duration: 1, // Duration of the animation
        ease: "power1.out", // Easing function for smooth movement
      });

      // Move the inner content in the opposite direction for a parallax effect
      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.out", // Easing function for smooth movement
      });
    }
  };

  useEffect(() => {
    // Reset the position of the container and content when hover ends
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0, // Reset horizontal position
        y: 0, // Reset vertical position
        rotationY: 0, // Reset rotation around Y-axis
        rotationX: 0, // Reset rotation around X-axis
        duration: 1, // Duration of the reset animation
        ease: "power1.out", // Easing function for smooth reset
      });

      gsap.to(contentRef.current, {
        x: 0, // Reset horizontal position of content
        y: 0, // Reset vertical position of content
        duration: 1, // Duration of the reset animation
        ease: "power1.out", // Easing function for smooth reset
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef} // Reference for the section container
      onMouseMove={handleMouseMove} // Trigger handleMouseMove on mouse move
      onMouseEnter={() => setIsHovering(true)} // Set hover state when mouse enters
      onMouseLeave={() => setIsHovering(false)} // Reset hover state when mouse leaves
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{
        perspective: "500px", // Apply perspective to the section for 3D effect
      }}
    >
      <div
        ref={contentRef} // Reference for the inner content
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d", // Preserve 3D transformations for the inner content
        }}
      >
        {children}{" "}
        {/* Render the children passed into the VideoPreview component */}
      </div>
    </section>
  );
};

export default VideoPreview;
