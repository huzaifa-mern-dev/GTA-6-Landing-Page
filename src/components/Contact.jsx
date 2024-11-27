// Import dependencies
import AnimatedTitle from "./AnimatedTitle"; // Custom animated title component
import Button from "./Button"; // Custom button component

// ImageClipBox Component
// A reusable component for displaying an image with a specific class for styling
const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

// Contact Component
// A section to display the "Contact Us" section of the webpage
const Contact = () => {
  return (
    // Main container for the contact section
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      {/* Content wrapper with background styling */}
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* Decorative images on the left side (visible on larger screens) */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          {/* Image 1 with custom clip-path */}
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          {/* Image 2 with custom clip-path and offset positioning */}
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        {/* Decorative images on the right side */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/contact.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* Content area */}
        <div className="flex flex-col items-center text-center">
          {/* Subtitle text */}
          <p className="mb-10 font-general text-[10px] uppercase">Join Now</p>

          {/* Animated title text */}
          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          {/* Button to trigger contact actions */}
          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact; // Export the Contact component
