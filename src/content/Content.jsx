import React from "react";
import { ArrowRight } from "lucide-react";
import Landing from '../assets/Landing1.jpg'

const Content = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="container relative mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
                <span className="block">Save money,</span>
                <span className="block">without thinking about it.</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                Jumpneng analyzes your spending and automatically saves the perfect amount every day, so you don't have to think about it.
              </p>
              <div className="flex justify-center md:justify-start">
                <button className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition duration-300 font-medium flex items-center justify-center">
                  SIGN UP NOW <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-[400px] rounded-xl overflow-hidden ">
                <img
                  src={Landing}
                  alt="Savings Illustration"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;