import React, { useState } from "react";
import Logo from "../assets/logo-transparent.png";
import { useNavigate } from "react-router-dom";

const Header = ({ user, logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false); // Close mobile menu after click
    }
  };

  return (
    <nav className="bg-white text-black fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 shadow-gray-200">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-8" alt="SpendWise Logo" />
          <span
            className="text-blue-600 self-center text-2xl font-semibold whitespace-nowrap"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            SpendWise
          </span>
        </a>
        <div className="flex md:order-2 space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            className="text-blue-700 bg-indigo-200 cursor-pointer hover:bg-indigo-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-md px-4 py-2 text-center"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            type="button"
            className="text-blue-700 bg-indigo-200 cursor-pointer hover:bg-indigo-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-md px-4 py-2 text-center"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul
            className="flex flex-col cursor-pointer p-4 md:p-0 mt-4 font-bold text-md border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
                className="block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("features");
                }}
                className="block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;