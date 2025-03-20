import React from "react";
import { ArrowRight } from "lucide-react";
import Landing from "../assets/Landing.svg";

const Content = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 px-20 overflow-hidden bg-indigo-50">
        <div className="container relative mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
            {/* Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl  text-gray-600 md:text-4xl font-bold text-blue mb-4 leading-tight">
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
              <div className="relative w-full max-w-md h-[400px] rounded-xl overflow-hidden ">
                <img
                  src={Landing}
                  alt="Savings Illustration"
                  className="w-full h-full"
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
