import React, { useState, useEffect } from "react";
import { TechGuide } from "@/entities/TechGuide";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, ChevronRight, CheckCircle, Video, BookOpen, Shield, Phone } from "lucide-react";
import { motion } from "framer-motion";

const guideIcons = {
  "How to Use Your Patient Portal": BookOpen,
  "Setting Up a Video Doctor Appointment (Telemedicine)": Video,
  "Managing Your Prescriptions Online": CheckCircle,
  "Understanding Your Health Insurance Online": Shield,
  "Using Health Apps Safely and Effectively": Phone,
  "Scheduling Medical Appointments Online": BookOpen,
};

export default function HealthcareGuidesPage() {
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHealthcareGuides = async () => {
      setIsLoading(true);
      try {
        const healthcareGuides = await TechGuide.filter({ category: "healthcare" }, "title");
        setGuides(healthcareGuides);
      } catch (error) {
        console.error("Error loading healthcare guides:", error);
      }
      setIsLoading(false);
    };

    loadHealthcareGuides();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-6">
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
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
            Patient Portals & Care Platforms
          </h1>
          <p className="text-2xl text-gray-600">
            Step-by-step help navigating patient portals, online appointments, virtual visits, and other care-provider technology.
          </p>
        </div>

        {/* Guides List */}
        <div className="space-y-6">
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
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
            guides.map((guide, index) => {
              const Icon = guideIcons[guide.title] || Heart;
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
                    <Card className="cursor-pointer bg-white border-4 border-transparent hover:border-red-200 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="bg-red-100 p-4 rounded-xl mr-6">
                            <Icon className="w-10 h-10 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-red-700 transition-colors">
                              {guide.title}
                            </h3>
                            <p className="text-lg text-gray-600">
                              {guide.description}
                            </p>
                          </div>
                          <ChevronRight className="w-8 h-8 text-gray-400 group-hover:text-red-600 group-hover:translate-x-2 transition-transform duration-300" />
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
    </div>
  );
}