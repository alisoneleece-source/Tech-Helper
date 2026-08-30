
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { TechGuide } from "@/entities/TechGuide";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, FileText, Video, Mail, Shield, Edit } from "lucide-react";
import { motion } from "framer-motion";

const categoryInfo = {
  tools: {
    title: "Helpful Tools",
    description: "Learn to use essential digital tools like DocuSign, email, video calls, and more",
    color: "#7C3AED",
    bgColor: "#F3E8FF"
  },
  android: {
    title: "Android Phone & Tablet", 
    description: "Master your Android device with step-by-step guides",
    color: "#4CAF50",
    bgColor: "#E8F5E8"
  },
  windows: {
    title: "Windows Computer",
    description: "Learn to navigate your PC with confidence", 
    color: "#0078D4",
    bgColor: "#E6F3FF"
  },
  troubleshooting: {
    title: "Fix Common Problems",
    description: "Solutions for when things go wrong with your devices",
    color: "#EA580C", 
    bgColor: "#FFF7ED"
  }
};

const guideIcons = {
  "How to Use DocuSign to Sign Documents": Edit,
  "How to Make Video Calls to Family": Video,
  "How to Send and Receive Email Safely": Mail,
  "Understanding Online Security": Shield
};

export default function CategoryPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('id');
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategoryGuides = useCallback(async () => {
    if (!categoryId) return; // Prevent fetching if categoryId is not available
    setIsLoading(true);
    try {
      const categoryGuides = await TechGuide.filter({ category: categoryId }, "title");
      setGuides(categoryGuides);
    } catch (error) {
      console.error("Error loading category guides:", error);
    }
    setIsLoading(false);
  }, [categoryId]); // categoryId is a dependency of this callback

  useEffect(() => {
    loadCategoryGuides(); // Call the memoized function
  }, [loadCategoryGuides]); // loadCategoryGuides is a dependency of this effect

  const category = categoryInfo[categoryId];
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Category not found</h2>
          <Link to={createPageUrl("Dashboard")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 rounded-xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" className="mb-4 text-lg px-6 py-3 rounded-xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: category.color }}
          >
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {category.title}
          </h1>
          <p className="text-2xl text-gray-600">
            {category.description}
          </p>
        </div>

        {/* Guides List */}
        <div className="space-y-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse bg-white/50 rounded-xl shadow-md h-[120px]">
                <CardContent className="p-6 flex items-center gap-4">
                   <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                   <div className="flex-1 space-y-3">
                     <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                     <div className="h-4 bg-gray-200 rounded w-full"></div>
                   </div>
                </CardContent>
              </Card>
            ))
          ) : guides.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: category.bgColor }}
              >
                <FileText className="w-10 h-10" style={{ color: category.color }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h3>
              <p className="text-xl text-gray-600 mb-8">
                We're working on helpful guides for this category. Check back soon!
              </p>
              <Link to={createPageUrl("Dashboard")}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl">
                  Explore Other Categories
                </Button>
              </Link>
            </div>
          ) : (
            guides.map((guide, index) => {
              const Icon = guideIcons[guide.title] || FileText;
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
                    <Card className="cursor-pointer bg-white border-4 border-transparent hover:shadow-xl transition-all duration-300"
                          style={{ borderColor: `${category.color}40` }}>
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div 
                            className="p-4 rounded-xl mr-6 shadow-lg"
                            style={{ backgroundColor: category.bgColor }}
                          >
                            <Icon className="w-10 h-10" style={{ color: category.color }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:transition-colors duration-300"
                                style={{ color: 'inherit' }}>
                              {guide.title}
                            </h3>
                            <p className="text-lg text-gray-600">
                              {guide.description}
                            </p>
                          </div>
                          <ChevronRight 
                            className="w-8 h-8 text-gray-400 group-hover:translate-x-2 transition-transform duration-300"
                            style={{ color: category.color }}
                          />
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
