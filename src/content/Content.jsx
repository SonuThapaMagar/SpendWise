import React from "react";
import {
  ArrowRight,
  PieChart,
  BarChart,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import Landing from "../assets/Landing.svg";
import Services from "./Services";
import About from "./About";

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

      {/*Features*/}

      <section className="relative py-20 px-6 bg-gradient-to-br overflow-hidden ">
        <div className="container mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-700">
              Why Choose <span className="text-blue-600">SpendWise?</span>
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto mt-2">
              Our powerful expense tracking tools help you make smarter
              financial decisions.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
            {/* Feature 1: Expense Tracking */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Expense Tracking
              </h3>
              <p className="text-gray-500 text-sm text-center mt-2">
                Easily log and categorize expenses to track your spending.
              </p>
            </div>

            {/* Feature 2: Budget Planning */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Budget Planning
              </h3>
              <p className="text-gray-500 text-sm text-center mt-2">
                Set budgets and receive alerts when nearing your limits.
              </p>
            </div>

            {/* Feature 3: Financial Insights */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Financial Insights
              </h3>
              <p className="text-gray-500 text-sm text-center mt-2">
                Visualize your spending trends with detailed reports.
              </p>
            </div>

            {/* Feature 4: Secure Payments */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <ShieldCheck className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Secure Payments
              </h3>
              <p className="text-gray-500 text-sm text-center mt-2">
                Link bank accounts securely for seamless tracking.
              </p>
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

      <About></About>

      <Services></Services>
    </div>
  );
};

export default Content;
