const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";

const steps = [
  {
    number: 1,
    image: "https://media.db.com/images/public/68d2c3d10887bbe5530210d6/33db861ee_generated_image.png",
    instruction: "Check the app icon — purple lightning bolt = Messenger, green speech bubble = regular texting."
  },
  {
    number: 2,
    image: "https://media.db.com/images/public/68d2c3d10887bbe5530210d6/97012826a_generated_image.png",
    instruction: "Look beside the text box — if you see emoji, GIF, and sticker buttons, you're in Messenger."
  },
  {
    number: 3,
    image: "https://media.db.com/images/public/68d2c3d10887bbe5530210d6/68c7b96fe_generated_image.png",
    instruction: "Look at the messages — small profile photos beside each message means Messenger, no photos means regular texting."
  },
  {
    number: 4,
    image: "https://media.db.com/images/public/68d2c3d10887bbe5530210d6/f1c343353_generated_image.png",
    instruction: "Check the send button — a thumbs-up icon means you're in Messenger."
  }
];

export default function MessengerVsTexting() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-2xl mx-auto">
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
            Follow these steps to find out which app you have open.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              {/* Image */}
              <div className="bg-gray-50 flex items-center justify-center p-6">
                <img
                  src={step.image}
                  alt={`Step ${step.number}`}
                  className="max-h-80 w-auto rounded-2xl object-contain"
                />
              </div>

              {/* Instruction */}
              <div className="p-6 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <p className="text-2xl text-gray-800 font-medium leading-snug pt-1">
                  {step.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}