import {  FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

// Array containing social media links and their corresponding icons
const socialLinks = [
  { href: "https://www.linkedin.com/in/huzaifa-dev/", icon: <FaLinkedin /> },
  { href: "https://github.com/huzaifa-mern-dev", icon: <FaGithub /> },
  { href: "https://www.instagram.com/huzaifa_dev_92/", icon: <FaInstagram /> },
];

const Footer = () => {
  return (
    // Footer section with background color and padding
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        {/* Copyright text, centered on small screens, left-aligned on larger screens */}
        <p className="text-center text-sm font-light md:text-left">
          Muhammad Huzaifa 2024. All rights reserved
        </p>

        {/* Social media icons */}
        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            // For each social media link, create a clickable icon that opens the link in a new tab
            <a
              key={index} // Unique key for each element
              href={link.href} // Link to the social media page
              target="_blank" // Open the link in a new tab
              rel="noopener noreferrer" // Prevent security risks when opening the link
              className="text-black transition-colors duration-500 ease-in-out hover:text-white" // Styling for hover effect
            >
              {link.icon} {/* Icon component for the social media */}
            </a>
          ))}
        </div>

        {/* Privacy policy link, centered on small screens, right-aligned on larger screens */}
        <a
          href="#privacy-policy" // Link to the privacy policy section
          className="text-center text-sm font-light hover:underline md:text-right" // Styling for the privacy link
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
