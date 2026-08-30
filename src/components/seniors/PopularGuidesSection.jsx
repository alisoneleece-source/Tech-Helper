import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function PopularGuidesSection({ guides, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Popular Learning Guides
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse overflow-hidden">
              <div className="h-44 bg-gray-200"></div>
              <CardContent className="p-5">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const featuredGuides = [
    {
      title: "Staying Safe Online",
      description: "Recognize common scams and browse the web with confidence.",
      category: "safety",
      difficulty: "easy",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Creating and Managing Secure Passwords",
      description: "Learn to create strong passwords and use your devices to manage them safely.",
      category: "safety",
      difficulty: "easy",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "How to Simplify My Phone",
      description: "Set up your phone to be easier to use with bigger buttons and fewer distractions.",
      category: "basics",
      difficulty: "beginner",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Making Text Bigger on Your Phone",
      description: "Learn how to increase text size so it's easier to read.",
      category: "basics",
      difficulty: "beginner",
      image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "How to Use DocuSign to Sign Documents",
      description: "Safely sign important documents sent to you online.",
      category: "tools",
      difficulty: "easy",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "How to Restart Your Device Safely",
      description: "Step-by-step guide to restart when your device freezes.",
      category: "troubleshooting",
      difficulty: "beginner",
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbf1?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Video Calling Your Family",
      description: "Connect with loved ones using video calls on FaceTime or WhatsApp.",
      category: "tools",
      difficulty: "easy",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Accessing Healthcare Online",
      description: "How to use patient portals and telemedicine from home.",
      category: "healthcare",
      difficulty: "easy",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Understanding WiFi and Internet",
      description: "What WiFi is and how to connect your device to the internet.",
      category: "basics",
      difficulty: "beginner",
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=600&auto=format&fit=crop"
    }
  ];

  // Combine featured guides with guides from the database, ensuring no duplicates.
  const combined = [...featuredGuides, ...(guides || [])];
  const uniqueTitles = new Set();
  const uniqueCombinedGuides = combined.filter(guide => {
    if (!guide || !guide.title || uniqueTitles.has(guide.title)) return false;
    uniqueTitles.add(guide.title);
    return true;
  });

  const displayGuides = uniqueCombinedGuides.slice(0, 9);

  const getCategoryColor = (category) => {
    const colors = {
      basics: "bg-blue-100 text-blue-800",
      troubleshooting: "bg-orange-100 text-orange-800",
      tools: "bg-purple-100 text-purple-800",
      healthcare: "bg-red-100 text-red-800",
      safety: "bg-yellow-100 text-yellow-800",
      android: "bg-green-100 text-green-800",
      apple: "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const fallbackImage = "https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Popular Learning Guides
      </h2>
      <p className="text-xl text-gray-600 mb-8 text-center">
        Start with these helpful tutorials
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayGuides.map((guide, index) => (
          <motion.div
            key={guide.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link to={createPageUrl(`Guide?title=${encodeURIComponent(guide.title)}`)}>
              <Card className="h-full border-2 hover:border-blue-300 transition-all duration-300 cursor-pointer group hover:shadow-xl overflow-hidden">
                {/* Cover Image */}
                <div className="h-44 overflow-hidden bg-gray-100">
                  <img
                    src={guide.image || fallbackImage}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${getCategoryColor(guide.category)} text-sm px-3 py-1 rounded-full`}>
                      {guide.category ? guide.category.charAt(0).toUpperCase() + guide.category.slice(1) : "Guide"}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-gray-600 text-base leading-relaxed mb-4">
                    {guide.description}
                  </p>

                  <div className="flex items-center justify-end">
                    <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Start Guide <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}