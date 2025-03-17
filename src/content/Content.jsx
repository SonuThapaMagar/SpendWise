import React from 'react';
import { ArrowRight, PieChart, BarChart3, TrendingUp } from 'lucide-react';
import Landing from '../assets/landing.jpg'
import about from '../assets/about.jpg'

const Content = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-800">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
          </svg>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
        </div>

        <div className="container relative mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                <span className="block">Manage Your Finances</span>
                <span className="text-emerald-300">With SpendWise</span>
              </h1>
              <p className="text-gray-100 text-lg mb-8 max-w-lg">
                Take control of your spending habits, track expenses effortlessly, and achieve your financial goals with
                our intuitive expense tracking system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition duration-300 font-medium flex items-center justify-center">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button className="bg-transparent text-white border border-white px-8 py-3 rounded-lg hover:bg-white/10 transition duration-300 font-medium">
                  Learn More
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={Landing}
                  alt="SpendWise Dashboard"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose SpendWise?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our powerful expense tracking tools help you gain insights into your spending habits and make smarter
              financial decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <PieChart className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Expense Tracking</h3>
              <p className="text-gray-600">
                Easily log and categorize your expenses to keep track of where your money is going.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Budget Planning</h3>
              <p className="text-gray-600">
                Set budgets for different categories and receive alerts when you're approaching your limits.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Financial Insights</h3>
              <p className="text-gray-600">
                Gain valuable insights with detailed reports and visualizations of your spending patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About SpendWise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're a team of financial experts and technology enthusiasts dedicated to helping you take control of your
              finances.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="order-2 lg:order-1">
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                <img
                  src={about}
                  alt="SpendWise Team"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-emerald-500 pl-4">Our Mission</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                At SpendWise, we believe that financial freedom starts with understanding your spending habits. Our
                mission is to provide you with the tools and insights you need to make smarter financial decisions.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Founded in 2023, we've helped thousands of users gain control over their finances, reduce unnecessary
                expenses, and save more for what truly matters to them.
              </p>
              <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition duration-300 font-medium">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you! Our team is always ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
              <img
                src="https://via.placeholder.com/600" // Replace with your image URL
                alt="Customer Support"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent flex flex-col justify-center p-12">
                <h3 className="text-3xl font-bold text-white mb-6">Get In Touch</h3>
                <p className="text-white/90 mb-8 max-w-md text-lg">
                  Our support team is available to answer your questions and help you make the most of SpendWise.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-white">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span>support@spendwise.com</span>
                  </div>
                  <div className="flex items-center text-white">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 lg:p-12">
              <form className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition"
                    required
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition duration-300 font-medium flex items-center justify-center"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;