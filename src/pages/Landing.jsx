import React from 'react'


const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col justify-center items-center p-6">
    {/* Header */}
    <header className="text-center mb-8">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
        Expense Tracker
      </h1>
      <p className="text-lg md:text-xl text-gray-600">
        Track your expenses, manage your budget, and achieve financial goals effortlessly.
      </p>
    </header>

    {/* Call to Action Buttons */}
    <div className="flex flex-col md:flex-row gap-4">
      <a
        href="/signup"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 text-center"
      >
        Sign Up
      </a>
      <a
        href="/login"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition duration-300 text-center"
      >
        Login
      </a>
    </div>

    {/* Footer */}
    <footer className="mt-12 text-center text-gray-500">
      <p>© 2023 Expense Tracker. All rights reserved.</p>
    </footer>
  </div>
  )
}

export default Landing
