
import React from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const phoneNumber = "+265 881 852 413";

  return (
    <footer className="bg-gray-900 text-gray-200 border-t border-gray-800 py-10 px-4">
      <div className="container mx-auto flex flex-col items-center text-center space-y-6">

        {/* Social Icons */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://wa.me/265881852413"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 transition-colors"
          >
            <FaWhatsapp />
          </a>
        </div>

        {/* Contact Info */}
        <div className="text-gray-300">
          <p className="text-sm md:text-base">Call us: {phoneNumber}</p>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-4 w-full">
          <p className="text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Sweet Crestview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
