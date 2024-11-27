// Import the 'clsx' library for conditional class names
import clsx from "clsx";

// Button Component
// Props:
// - id: Unique identifier for the button
// - title: The text displayed on the button
// - rightIcon: Optional icon displayed on the right side of the button text
// - leftIcon: Optional icon displayed on the left side of the button text
// - containerClass: Additional classes for customizing the button's appearance
const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    // Render the button element
    <button
      id={id} // Assign the provided id to the button
      className={clsx(
        // Default styles for the button
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
        containerClass // Merge any additional classes passed via props
      )}
    >
      {/* Render the left icon if provided */}
      {leftIcon}

      {/* Text container with animation */}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {/* First layer of the animated text */}
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        
        {/* Second layer of the animated text */}
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {/* Render the right icon if provided */}
      {rightIcon}
    </button>
  );
};

export default Button; // Export the Button component
