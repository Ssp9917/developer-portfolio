"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // For Hamburger and Cross Icon

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-transparent  w-full z-50 ">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
        {/* Logo */}
        <div className="text-[#16f2b3] text-2xl font-bold">
          <Link href="/" onClick={closeMenu}>
            SONU SHARMA
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links for Larger Screens */}
        <ul className="hidden md:flex gap-6">
          {["ABOUT", "EXPERIENCE", "SKILLS", "EDUCATION", "PROJECTS"].map(
            (item, index) => (
              <li key={index}>
                <Link
                  href={`/#${item.toLowerCase()}`}
                  className="no-underline outline-none hover:no-underline"
                >
                  {item}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="fixed inset-0 w-[70%] bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-8 transform transition-transform duration-300 ease-in-out z-40 md:hidden">
            {["ABOUT", "EXPERIENCE", "SKILLS", "EDUCATION", "PROJECTS"].map(
              (item, index) => (
                <li key={index}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    onClick={closeMenu}
                    className="text-white text-xl transition-colors duration-300 hover:text-[#16f2b3]"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        )}

        {/* Overlay for Mobile Menu */}
        {/* {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
            onClick={closeMenu}
          ></div>
        )} */}
      </div>
    </nav>
  );
}

export default Navbar;
