import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function MessengerVsTextingPicker() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-xl mx-auto">
        {/* Back button */}
        <Link
          to={createPageUrl("Dashboard")}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-lg font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Messenger or Texting?
          </h1>
          <p className="text-xl text-gray-600">
            First, what kind of phone do you have?
          </p>
        </div>

        {/* Device picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* iPhone */}
          <Link to="/MessengerVsTexting" className="h-full">
            <div className="h-full bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border-4 border-transparent hover:border-blue-300 min-h-64">
              <span className="text-7xl">🍎</span>
              <h2 className="text-2xl font-bold text-gray-800">iPhone</h2>
              <p className="text-gray-500 text-center text-lg">I have an Apple iPhone</p>
            </div>
          </Link>

          {/* Android */}
          <Link to="/MessengerVsTextingAndroid" className="h-full">
            <div className="h-full bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border-4 border-transparent hover:border-green-300 min-h-64">
              <span className="text-7xl">🤖</span>
              <h2 className="text-2xl font-bold text-gray-800">Android</h2>
              <p className="text-gray-500 text-center text-lg">I have a Samsung, Google, or other Android phone</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}