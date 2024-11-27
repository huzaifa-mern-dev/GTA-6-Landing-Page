import gsap from "gsap"; // Import the GreenSock Animation Platform for animations
import { useGSAP } from "@gsap/react"; // Custom GSAP hook for React integration
import { ScrollTrigger } from "gsap/all"; // ScrollTrigger plugin for scroll-based animations
import { TiLocationArrow } from "react-icons/ti"; // Import location arrow icon from react-icons
import { useEffect, useRef, useState } from "react"; // React hooks for state, effects, and references

import Button from "./Button"; // Custom button component
import VideoPreview from "./VideoPreview"; // Custom video preview component

// Register GSAP's ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // State to track the current video index
  const [currentIndex, setCurrentIndex] = useState(1);

  // State to determine if the user has clicked on a mini video
  const [hasClicked, setHasClicked] = useState(false);

  // States for handling video loading logic
  const [loading, setLoading] = useState(true); // Tracks if videos are loading
  const [loadedVideos, setLoadedVideos] = useState(0); // Tracks the count of loaded videos

  const totalVideos = 4; // Total number of videos in the sequence
  const nextVdRef = useRef(null); // Reference to the "next video" DOM element

  // Increment loaded video count when a video finishes loading
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Stop the loading state when all videos except one are loaded
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Handle user interaction with the mini video
  const handleMiniVdClick = () => {
    setHasClicked(true); // Mark that a video has been clicked

    // Update the current video index to the next video in sequence
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // GSAP animation for transitioning videos on click
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" }); // Make the next video visible
        gsap.to("#next-video", {
          transformOrigin: "center center", // Set transformation origin
          scale: 1, // Animate to normal scale
          width: "100%", // Animate width to full
          height: "100%", // Animate height to full
          duration: 1, // Duration of the animation
          ease: "power1.inOut", // Easing function
          onStart: () => nextVdRef.current.play(), // Play the video when animation starts
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0, // Animate from scale 0
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex], // Re-run animation when currentIndex changes
      revertOnUpdate: true, // Revert GSAP animations when dependencies change
    }
  );

  // GSAP animation for the video frame's appearance on scroll
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)", // Custom clipping path
      borderRadius: "0% 0% 40% 10%", // Initial border radius
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Animation from this clipping path
      borderRadius: "0% 0% 0% 0%", // Animation from no rounded corners
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame", // Element to trigger animation
        start: "center center", // Start animation when this position is reached
        end: "bottom center", // End animation here
        scrub: true, // Smoothly scrub animation during scroll
      },
    });
  });

  // Function to get the video source URL based on the index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading animation when videos are still loading */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* Custom loading animation */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Main video container with animations */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mini video preview area */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                {/* Next video preview */}
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          {/* Next video element for GSAP animation */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          {/* Current video playing in the background */}
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Hero heading text */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>

        {/* Text content over the video */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
            Step into the next era of immersive <br /> open-world gaming with GTA 6.
            </p>

            {/* Call-to-action button */}
            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Duplicate hero heading for visual layering */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
