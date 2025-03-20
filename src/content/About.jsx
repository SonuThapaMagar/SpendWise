import React from "react";
import AboutIcon from "../assets/about.svg";

const About = () => {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 px-20 bg-indigo-100 relative">
        {/* Wave Divider BEFORE About Section */}
        <div className="relative w-full overflow-hidden leading-[0]">
          <svg
            className="absolute top-0 left-0 w-full"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 60 Q 300 120, 600 60 T 1200 60 L 1200 0 L 0 0 Z"
              className="fill-indigo-100"
            ></path>
          </svg>
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image on the left */}
            <div className="flex justify-center md:justify-start">
              <img
                src={AboutIcon}
                alt="About Us"
                className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-lg bg-indigo-200"
              />{" "}
            </div>

            {/* Content on the right */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">About Us</h2>
              <p className="mt-4 text-gray-600 mb-8">
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
