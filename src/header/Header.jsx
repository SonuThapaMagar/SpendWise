import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../assets/logo.png";
import { Button } from "antd";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src={Logo} alt="" className="rounded-full h-24 w-full" />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Contact
          </a>
          <Button
            type="primary"
            shape="round"
          >
            Login
          </Button>
          <Button
            type="primary"
            color="purple"
            shape="round"
          >
            Sign Up
          </Button>
        </nav>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-2 px-4 py-2">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Contact
            </a>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <LockOutlined className="mr-1" /> Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <UserOutlined className="mr-1" /> Signup
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
