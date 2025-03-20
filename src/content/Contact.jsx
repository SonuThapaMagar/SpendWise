import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react"; // Icons for contact info

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-20 bg-white">
      {/* Section Title */}
      <div className="container mx-auto text-center mb-12 ">
        <button  className="text-md w-24 font-semi-bold text-indigo-800 bg-indigo-100 rounded-full">
          Contact
        </button>
        <h2 className="text-black mt-4 text-3xl font-bold"><span className="text-blue-600">Contact</span> Us</h2>
      </div>

      <div className="container mx-auto px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Address */}
            <div className="bg-gray-50 p-6  shadow-md">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Address</h3>
              </div>
              <p className="text-gray-600">A108 Adam Street</p>
              <p className="text-gray-600">New York, NY 535022</p>
            </div>

            {/* Call Us */}
            <div className="bg-gray-50  p-6  shadow-md">
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
              </div>
              <p className="text-gray-600">+1 5589 55488 55</p>
              <p className="text-gray-600">+1 6678 254445 41</p>
            </div>

            {/* Email Us */}
            <div className="bg-gray-50  p-6  shadow-md">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Email Us
                </h3>
              </div>
              <p className="text-gray-600">info@example.com</p>
              <p className="text-gray-600">contact@example.com</p>
            </div>

            {/* Open Hours */}
            <div className="bg-gray-50  p-6  shadow-md">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Open Hours
                </h3>
              </div>
              <p className="text-gray-600">Monday - Friday</p>
              <p className="text-gray-600">9:00AM - 05:00PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50  p-8  shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Message"
                  className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-100 text-indigo-700 rounded-full px-6 py-3  hover:bg-indigo-200 transition duration-300"
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
