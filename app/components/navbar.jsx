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

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] md:text-3xl text-xl md:pl-0 pl-4 font-bold"
          >
            SONU SHARMA
          </Link>
        </div>

        {/* Hamburger Icon for small screens */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none pr-4"
          >
            {isMenuOpen ? (
              <FaTimes className="text-xl" /> // Cross Icon when open
            ) : (
              <FaBars className="text-xl" /> // Hamburger Icon when closed
            )}
          </button>
        </div>

        {/* Main Menu - hidden on small screens */}
        <ul
          className={`fixed top-0 left-0 h-full flex pt-20 md:pt-0 items-center md: flex-col md:flex-row w-3/4 max-w-xs transform bg-black bg-opacity-90 shadow-lg transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:flex ml-[50rem] md:gap-2 flex-1 md:bg-transparent`}
          id="navbar-default"
        >
          <li>
            <Link
              onClick={toggleMenu} // Close menu on link click
              className="block px-6 md:px-0 md:py-0 py-4  no-underline outline-none hover:no-underline"
              href="/#about"
            >
              <div className="text-base text-white transition-colors duration-300 hover:text-[#16f2b3]">
                ABOUT
              </div>
            </Link>
          </li>
          <li>
            <Link
              onClick={toggleMenu}
              className="block px-6 py-4 md:px-0 md:py-0 no-underline outline-none hover:no-underline"
              href="/#experience"
            >
              <div className="text-base text-white transition-colors duration-300 hover:text-[#16f2b3]">
                EXPERIENCE
              </div>
            </Link>
          </li>
          <li>
            <Link
              onClick={toggleMenu}
              className="block px-6 py-4 md:px-0 md:py-0 no-underline outline-none hover:no-underline"
              href="/#skills"
            >
              <div className="text-base text-white transition-colors duration-300 hover:text-[#16f2b3]">
                SKILLS
              </div>
            </Link>
          </li>
          <li>
            <Link
              onClick={toggleMenu}
              className="block px-6 py-4 md:px-0 md:py-0 no-underline outline-none hover:no-underline"
              href="/#education"
            >
              <div className="text-base text-white transition-colors duration-300 hover:text-[#16f2b3]">
                EDUCATION
              </div>
            </Link>
          </li>
          <li>
            <Link
              onClick={toggleMenu}
              className="block px-6 py-4 md:px-0 md:py-0 no-underline outline-none hover:no-underline"
              href="/#projects"
            >
              <div className="text-base text-white transition-colors duration-300 hover:text-[#16f2b3]">
                PROJECTS
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
