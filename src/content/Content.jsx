import React from "react";
import landing from "../assets/landing.jpg";
import about from "../assets/about.jpg";

const Content = () => {
  return (
    <div className="flex-grow bg-gray-50">
      {/* Image Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={landing} // Replace with your image URL
                alt="Expense Tracker"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Track Your Expenses Effortlessly
              </h2>
              <p className="text-gray-600 mb-6">
                Our expense tracker helps you manage your finances with ease.
                Stay on top of your budget, monitor your spending, and achieve
                your financial goals.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We are a team of financial experts dedicated to helping you take
              control of your finances. Our mission is to provide you with the
              tools and insights you need to make smarter financial decisions.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Image Section */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={about}
                alt="Expense Tracker"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                What is Expense Tracker?
              </h3>
              <p className="text-gray-600">
                Expense Tracker is a powerful tool designed to help you manage
                your finances effectively. With our user-friendly interface, you
                can easily track your expenses, set budgets, and gain insights
                into your spending habits. Our goal is to empower you to make
                informed financial decisions and achieve your financial goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-gray-600 mt-2">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Enter your message"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>{" "}
    </div>
  );
};

export default Content;
