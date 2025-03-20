import React from "react";
import {
  PieChart,
  BarChart,
  TrendingUp,
  CreditCard,
} from "lucide-react"; // Icons for features

const Cards = () => {
  return (
    <section id="features" className="py-8 px-20">
      <div className="container mx-auto px-12">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Feature 1: Expense Tracking */}
          <div className="bg-indigo-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center">
            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
              <PieChart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <span className="text-2xl font-bold text-gray-800">100%</span>
              <p className="text-gray-600">Expense Tracking</p>
            </div>
          </div>

          {/* Feature 2: Budget Planning */}
          <div className="bg-green-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center">
            <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <span className="text-2xl font-bold text-gray-800">95%</span>
              <p className="text-gray-600">Budget Planning</p>
            </div>
          </div>

          {/* Feature 3: Financial Insights */}
          <div className="bg-purple-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center">
            <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <span className="text-2xl font-bold text-gray-800">90%</span>
              <p className="text-gray-600">Financial Insights</p>
            </div>
          </div>

          {/* Feature 4: Secure Payments */}
          <div className="bg-orange-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center">
            <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <span className="text-2xl font-bold text-gray-800">99%</span>
              <p className="text-gray-600">Secure Payments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;