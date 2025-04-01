import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-20 bg-indigo-50">
      {/* Section Title */}
      <div className="container mx-auto max-w-7xl text-center mb-8 sm:mb-12">
        <button className="text-sm sm:text-md w-24 sm:w-28 font-semibold text-indigo-800 bg-indigo-100 rounded-full py-1 sm:py-2">
          Contact
        </button>
        <h2 className="text-black mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold">
          <span className="text-blue-600">Contact</span> Us
        </h2>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Address */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3 sm:mb-4">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Address</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">A108 Adam Street</p>
              <p className="text-gray-600 text-sm sm:text-base">New York, NY 535022</p>
            </div>

            {/* Call Us */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3 sm:mb-4">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Call Us</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">+1 5589 55488 55</p>
              <p className="text-gray-600 text-sm sm:text-base">+1 6678 254445 41</p>
            </div>

            {/* Email Us */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3 sm:mb-4">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Email Us</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">info@example.com</p>
              <p className="text-gray-600 text-sm sm:text-base">contact@example.com</p>
            </div>

            {/* Open Hours */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3 sm:mb-4">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Open Hours</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Monday - Friday</p>
              <p className="text-gray-600 text-sm sm:text-base">9:00AM - 05:00PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  rows="4 sm:rows-5 md:rows-6"
                  placeholder="Message"
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-100 text-indigo-700 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base hover:bg-indigo-200 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;