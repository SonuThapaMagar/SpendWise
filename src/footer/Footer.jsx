import React from 'react';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-blue-500 rounded-xl text-white py-8 px-4">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-400 transition duration-300">Home</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition duration-300">About</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition duration-300">Contact</a></li>
              <li><a href="/privacy" className="hover:text-blue-400 transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" className="hover:text-blue-400 transition duration-300">
                <FacebookOutlined className="text-2xl" />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400 transition duration-300">
                <TwitterOutlined className="text-2xl" />
              </a>
              <a href="https://instagram.com" className="hover:text-blue-400 transition duration-300">
                <InstagramOutlined className="text-2xl" />
              </a>
              <a href="https://linkedin.com" className="hover:text-blue-400 transition duration-300">
                <LinkedinOutlined className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p>Email: support@SpendWise.com</p>
            <p>Phone: +977 9876543210</p>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-white mt-8 pt-6 text-center">
          <p>© 2023 SpendWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;