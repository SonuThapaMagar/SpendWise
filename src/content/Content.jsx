import React from "react";
import { ArrowRight } from "lucide-react";
import Landing from "../assets/Landing.svg";
import Services from "./Services";
import About from "./About";
import Cards from "./Cards";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-grow">
      {/* Home Section */}
      <section
        id="home"
        className="relative py-8 md:py-20 px-4 sm:px-6 md:px-20 overflow-hidden bg-indigo-50"
      >
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-6 md:mt-8">
            <div className="text-center md:text-left mx-0 sm:mx-8 pt-6 sm:pt-8 md:pt-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-600 mb-4 sm:mb-6 leading-tight">
                <span className="block text-blue-600 text-3xl sm:text-4xl mt-12 md:text-5xl lg:text-6xl">
                  Save money,
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 sm:mt-2">
                  without thinking about it.
                </span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md sm:max-w-lg mx-auto md:mx-0">
                Spendwise analyzes your spending and automatically saves the
                perfect amount every day, so you don't have to think about it.
              </p>
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-500 text-gray-100 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-600 transition duration-300 text-sm sm:text-base flex items-center justify-center whitespace-nowrap"
                >
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-6 md:mt-0">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                <img
                  src={Landing}
                  alt="Savings Illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-12 sm:h-16 md:h-20"
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

      {/* Features Section */}
      <section id="features">
        <Cards />
        <Services />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Content;
