import React from "react";
import {
  PieChart,
  BarChart,
  TrendingUp,
  CreditCard,
} from "lucide-react";

const Cards = () => {
  return (
    <section id="features" className="py-6 sm:py-10 md:py-16 px-4 sm:px-6 md:px-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {/* Feature 1: Expense Tracking */}
          <div className="bg-indigo-100 p-4 sm:p-6 md:p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row items-center text-center sm:text-left">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-full flex-shrink-0 mb-4 sm:mb-0">
              <PieChart className="h-6 w-6 sm:h-7 md:h-6 text-blue-600" />
            </div>
            <div className="ml-0 sm:ml-4 flex-1">
              <span className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 block">100%</span>
              <p className="text-gray-600 text-sm sm:text-base md:text-base mt-1">Expense Tracking</p>
            </div>
          </div>

          {/* Feature 2: Budget Planning */}
          <div className="bg-green-100 p-4 sm:p-6 md:p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row items-center text-center sm:text-left">
            <div className="bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0 mb-4 sm:mb-0">
              <BarChart className="h-6 w-6 sm:h-7 md:h-6 text-green-600" />
            </div>
            <div className="ml-0 sm:ml-4 flex-1">
              <span className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 block">95%</span>
              <p className="text-gray-600 text-sm sm:text-base md:text-base mt-1">Budget Planning</p>
            </div>
          </div>

          {/* Feature 3: Financial Insights */}
          <div className="bg-purple-100 p-4 sm:p-6 md:p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row items-center text-center sm:text-left">
            <div className="bg-purple-100 p-2 sm:p-3 rounded-full flex-shrink-0 mb-4 sm:mb-0">
              <TrendingUp className="h-6 w-6 sm:h-7 md:h-6 text-purple-600" />
            </div>
            <div className="ml-0 sm:ml-4 flex-1">
              <span className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 block">90%</span>
              <p className="text-gray-600 text-sm sm:text-base md:text-base mt-1">Financial Insights</p>
            </div>
          </div>

          {/* Feature 4: Secure Payments */}
          <div className="bg-orange-100 p-4 sm:p-6 md:p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row items-center text-center sm:text-left">
            <div className="bg-orange-100 p-2 sm:p-3 rounded-full flex-shrink-0 mb-4 sm:mb-0">
              <CreditCard className="h-6 w-6 sm:h-7 md:h-6 text-orange-600" />
            </div>
            <div className="ml-0 sm:ml-4 flex-1">
              <span className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 block">99%</span>
              <p className="text-gray-600 text-sm sm:text-base md:text-base mt-1">Secure Payments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;