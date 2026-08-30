import React, { useState, useEffect } from "react";
import { TechGuide } from "@/entities/TechGuide";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Apple, ChevronRight, Smartphone, Tablet, Camera, Video, Mail, Settings } from "lucide-react";
import { motion } from "framer-motion";

const guideIcons = {
  "Making Text Bigger on Your iPhone": Settings,
  "How to Take and Share Photos on iPhone": Camera,
  "Setting Up and Using FaceTime on iPhone": Video,
  "Managing Apps on Your iPad": Settings,
  "Using iPad for Video Calls with Family": Video,
  "Reading and Managing Email on iPad": Mail,
};

const deviceIcons = {
  "iphone": Smartphone,
  "ipad": Tablet,
  "all": Apple
};

export default function AppleGuidesPage() {
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppleGuides = async () => {
      setIsLoading(true);
      try {
        const appleGuides = await TechGuide.filter({ category: "apple" }, "device_type");
        setGuides(appleGuides);
      } catch (error) {
        console.error("Error loading Apple guides:", error);
      }
      setIsLoading(false);
    };

    loadAppleGuides();
  }, []);

  // Group guides by device type
  const groupedGuides = guides.reduce((acc, guide) => {
    const deviceType = guide.device_type || 'all';
    if (!acc[deviceType]) {
      acc[deviceType] = [];
    }
    acc[deviceType].push(guide);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" className="mb-4 text-lg px-6 py-3 rounded-xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <Apple className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            iPhone & iPad Guides
          </h1>
          <p className="text-2xl text-gray-600">
            Master your Apple devices with step-by-step instructions.
          </p>
        </div>

        {/* Guides organized by device type */}
        <div className="space-y-8">
          {Object.entries(groupedGuides).map(([deviceType, deviceGuides]) => {
            const DeviceIcon = deviceIcons[deviceType] || Apple;
            const deviceName = deviceType === 'iphone' ? 'iPhone' : 
                             deviceType === 'ipad' ? 'iPad' : 
                             'iPhone & iPad';
            
            return (
              <div key={deviceType} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <DeviceIcon className="w-8 h-8 text-gray-600" />
                  <h2 className="text-2xl font-bold text-gray-800">{deviceName} Guides</h2>
                </div>
                
                <div className="space-y-4">
                  {isLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <Card key={i} className="animate-pulse bg-white/50 rounded-xl shadow-md h-[100px]">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    deviceGuides.map((guide, index) => {
                      const Icon = guideIcons[guide.title] || Apple;
                      return (
                        <motion.div
                          key={guide.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="group"
                        >
                          <Link to={createPageUrl(`Guide?title=${encodeURIComponent(guide.title)}`)}>
                            <Card className="cursor-pointer bg-white border-4 border-transparent hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="flex items-center">
                                  <div className="bg-gray-100 p-4 rounded-xl mr-6">
                                    <Icon className="w-10 h-10 text-gray-700" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-600 transition-colors">
                                      {guide.title}
                                    </h3>
                                    <p className="text-lg text-gray-600">
                                      {guide.description}
                                    </p>
                                  </div>
                                  <ChevronRight className="w-8 h-8 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}