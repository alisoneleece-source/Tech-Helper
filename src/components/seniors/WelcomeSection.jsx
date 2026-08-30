import React from 'react';
import { motion } from "framer-motion";

export default function WelcomeSection({ greeting, userName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-4 border-blue-100 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            {greeting}, {userName}!
          </h1>
          <p className="text-2xl text-gray-600 mb-6">
            Welcome to your friendly tech learning center
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <p className="text-xl text-blue-800 font-medium">
              We're here to help you feel confident with technology. 
              Take your time, and remember - you've got this!
            </p>
          </div>
        </div>

        {/* Image Content */}
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop"
            alt="A smiling senior citizen using a tablet computer"
            className="rounded-2xl shadow-lg w-full max-w-sm h-auto object-cover border-4 border-white"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}