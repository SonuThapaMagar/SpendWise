import React from "react";
import { ArrowRight } from "lucide-react";
import Landing from "../assets/Landing.svg";
import About from "../assets/about.svg";

const Content = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 px-20 overflow-hidden bg-indigo-50">
        <div className="container relative mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
            {/* Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl text-gray-600 md:text-4xl font-bold text-blue mb-4 leading-tight">
                <span className="block text-blue-600">Save money,</span>
                <span className="block">without thinking about it.</span>
              </h2>
              <p className="text-gray-500 text-md mb-8 max-w-lg">
                Spendwise analyzes your spending and automatically saves the
                perfect amount every day, so you don't have to think about it.
              </p>
              <div className="flex justify-center md:justify-start">
                <button className="bg-blue-500 text-gray-100 px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 font-sm flex items-center justify-center">
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-[400px] rounded-xl overflow-hidden">
                <img
                  src={Landing}
                  alt="Savings Illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider at the Bottom of Hero Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-20"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60 Q 300 120, 600 60 T 1200 60 L 1200 120 L 0 120 Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20  px-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image on the left */}
            <div className="flex justify-center md:justify-start">
              <img
                src={About}
                alt="About Us"
                className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-lg bg-indigo-200"
              />
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
    </div>
  );
};

export default Content;
