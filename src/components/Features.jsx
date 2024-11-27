import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

// BentoTilt component adds tilt effect to its children when mouse moves
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState(""); // state to hold the tilt transform style
  const itemRef = useRef(null); // reference to the element for calculating mouse position

  // Function to calculate the tilt effect based on mouse position
  const handleMouseMove = (event) => {
    if (!itemRef.current) return; // prevent errors if ref is not available

    const { left, top, width, height } = itemRef.current.getBoundingClientRect(); // get element's position
    const relativeX = (event.clientX - left) / width; // calculate mouse position relative to element
    const relativeY = (event.clientY - top) / height;

    // calculate the tilt values for X and Y axis
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    // apply the tilt effect using CSS transform
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform); // update the state with new transform style
  };

  // Reset the transform when the mouse leaves
  const handleMouseLeave = () => {
    setTransformStyle(""); // reset transform
  };

  return (
    <div
      ref={itemRef}
      className={className} // className passed as a prop
      onMouseMove={handleMouseMove} // event listener for mouse movement
      onMouseLeave={handleMouseLeave} // event listener for mouse leave
      style={{ transform: transformStyle }} // apply the calculated transform style
    >
      {children} {/* Render child components */}
    </div>
  );
};

// BentoCard component displays a card with a video, title, description, and optional 'coming soon' label
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // state for cursor position inside the button
  const [hoverOpacity, setHoverOpacity] = useState(0); // state for hover opacity effect
  const hoverButtonRef = useRef(null); // reference to the button element

  // Function to update cursor position relative to button on mouse move
  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;

    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  // Show hover effect when mouse enters
  const handleMouseEnter = () => setHoverOpacity(1);

  // Hide hover effect when mouse leaves
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {/* Display the background video */}
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1> {/* Title */}
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {/* 'Coming soon' button with hover effect */}
        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove} // update cursor position
            onMouseEnter={handleMouseEnter} // trigger hover effect
            onMouseLeave={handleMouseLeave} // reset hover effect
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity, // apply opacity for hover effect
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Features section to display multiple BentoCard components
const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          ENTER THE NEW FRONTIER
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Immerse yourself in a hyper-realistic universe where the line between real and digital fades. GTA 6 introduces dynamic ecosystems, evolving storylines, and a deeply interconnected economy that lets you shape your own destiny.
        </p>
      </div>

      {/* BentoTilt component adds tilt effect to the card */}
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4" // video source
          title={
            <>
              radia<b>n</b>t {/* Title with special styling */}
            </>
          }
          description="A new era of visuals with ray tracing and cinematic fidelity. GTA 6 redefines realism, offering breathtaking environments that evolve with time and weather."
          isComingSoon
        />
      </BentoTilt>

      {/* Grid layout for additional features */}
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        {/* BentoTilt used for other feature cards */}
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="Explore Vice City’s underground like never before. Discover hidden secrets, plan heists, and create your empire in a world where choices matter."
            isComingSoon
          />
        </BentoTilt>

        {/* More feature cards */}
        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="Seamless multiplayer integration lets you connect with friends to conquer the city or engage in high-octane street races. Your story is yours to write."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="Meet Azul, your customizable AI companion. Get help with missions, explore new opportunities, and navigate the dynamic world of GTA 6."
            isComingSoon
          />
        </BentoTilt>

        {/* A card for upcoming features */}
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        {/* Additional video feature */}
        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
