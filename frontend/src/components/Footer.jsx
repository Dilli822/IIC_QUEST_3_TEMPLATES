import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-40">
        <div className="flex flex-col gap-5 items-center sm:items-start">
          <h2 className="text-white text-lg font-bold">Your Logo</h2>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <nav className="w-full flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-2">
          <a href="#top" className="hover:text-white">
            Home
          </a>
          <a href="/about" className="hover:text-white">
            About Us
          </a>
          <a href="#features" className="hover:text-white">
            Services
          </a>
          <a href="/blog" className="hover:text-white">
            Blog
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
          <a href="/faq" className="hover:text-white">
            Terms & Conditions
          </a>
          <a href="/faq" className="hover:text-white">
            Privacy Policy
          </a>
        </nav>
      </div>
      <p className="text-center mt-6 text-gray-500">
        &copy; 2025 Your Company. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
