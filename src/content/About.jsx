import React from "react";
import AboutIcon from "../assets/about.svg";
import BackgroundImg from "../assets/hero-bg.png";

const About = () => {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-20 relative overflow-hidden">
        {/* Background Image */}
        <img
          src={BackgroundImg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-opacity-50"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image on the left */}
            <div className="flex justify-center md:justify-start">
              <img
                src={AboutIcon}
                alt="About Us"
                className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-lg bg-indigo-200"
              />
            </div>

            {/* Content on the right */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-blue-600">About Us</h2>
              <p className="mt-4 text-gray-700 mb-8">
                We help you save money and manage your expenses. Our team is
                dedicated to providing you with the best tools and insights to
                achieve financial freedom.
              </p>
              <button className="bg-blue-500 text-gray-100 px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 font-sm flex items-center justify-center">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;