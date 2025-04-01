import React from "react";
import { ArrowRight, PieChart, BarChart, TrendingUp, CreditCard } from "lucide-react"; // Icons for services

const Services = () => {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our <span className="text-blue-600">Features</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Take control of your finances with our powerful expense tracking tools.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1: Expense Tracking */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <PieChart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Expense Tracking
            </h3>
            <p className="text-gray-600 mb-6">
              Easily log and categorize your expenses to keep track of where your money is going.
            </p>
          </div>

          {/* Service 2: Budget Planning */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Budget Planning
            </h3>
            <p className="text-gray-600 mb-6">
              Set budgets for different categories and receive alerts when you're approaching your limits.
            </p>
            
          </div>

          {/* Service 3: Financial Insights */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Financial Insights
            </h3>
            <p className="text-gray-600 mb-6">
              Gain valuable insights with detailed reports and visualizations of your spending patterns.
            </p>
          </div>

          {/* Service 4: Secure Payments */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Secure Payments
            </h3>
            <p className="text-gray-600 mb-6">
              Securely link your bank accounts and credit cards for seamless expense tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;