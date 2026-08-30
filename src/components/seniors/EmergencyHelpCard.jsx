import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, RefreshCw, Wifi, Battery } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function EmergencyHelpCard() {
  const emergencyTopics = [
    {
      icon: RefreshCw,
      title: "Device Frozen",
      description: "Screen won't respond",
      color: "text-red-600",
      bg: "bg-red-50",
      problemId: "frozen"
    },
    {
      icon: Wifi,
      title: "No Internet",
      description: "Can't connect online",
      color: "text-orange-600",
      bg: "bg-orange-50",
      problemId: "no-internet"
    },
    {
      icon: Battery,
      title: "Won't Turn On",
      description: "Device completely dead",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      problemId: "wont-turn-on"
    },
    {
      icon: Phone,
      title: "Can't Make Calls",
      description: "Phone not working",
      color: "text-blue-600",
      bg: "bg-blue-50",
      problemId: "cant-make-calls"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-red-50 border-4 border-red-200 shadow-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-center mb-4 gap-2">
            <AlertTriangle className="w-7 h-7 sm:w-10 sm:h-10 text-red-600 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-red-800">
              Need Help Right Now?
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-5">
            {emergencyTopics.map((topic) => (
              <Link key={topic.problemId} to={createPageUrl(`Emergency?problem=${topic.problemId}`)}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${topic.bg} p-3 sm:p-5 rounded-xl cursor-pointer border-2 border-transparent hover:border-gray-300 transition-all duration-200 flex flex-col justify-center items-center h-full`}
                >
                  <topic.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${topic.color} mx-auto mb-2`} />
                  <h4 className={`font-bold text-sm sm:text-base ${topic.color} text-center leading-tight`}>
                    {topic.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 text-center mt-1 hidden sm:block">
                    {topic.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to={createPageUrl("Emergency")}>
              <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Get Emergency Help
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}