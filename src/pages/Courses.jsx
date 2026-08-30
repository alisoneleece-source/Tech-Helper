
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Smartphone, 
  Shield, 
  Tablet, 
  Monitor, 
  Lock, 
  Heart,
  Clock,
  BookOpen,
  Star,
  Users,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    id: "phone-mastery",
    title: "Phone Mastery Course",
    description: "Master your smartphone with confidence - from basic navigation to advanced features",
    icon: Smartphone,
    color: "#10B981",
    bgColor: "#D1FAE5",
    duration: "6-8 hours",
    lessons: 10,
    difficulty: "Beginner to Intermediate",
    whatYouLearn: [
      "Navigate your phone interface with ease",
      "Customize settings for easier use", 
      "Master calling, texting, and contacts",
      "Use apps safely and effectively",
      "Take and share photos confidently"
    ],
    highlights: [
      "Step-by-step video guides",
      "Practice exercises for each lesson",
      "Common troubleshooting tips",
      "Safety and security best practices"
    ]
  },
  {
    id: "staying-safe-online",
    title: "Staying Safe Online Course",
    description: "Protect yourself from scams, create secure passwords, and browse the internet safely",
    icon: Shield,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    duration: "4-5 hours",
    lessons: 8,
    difficulty: "Essential for Everyone",
    whatYouLearn: [
      "Recognize and avoid online scams",
      "Create and manage strong passwords",
      "Identify secure websites",
      "Safe online shopping practices",
      "Protect your personal information"
    ],
    highlights: [
      "Real scam examples and how to spot them",
      "Password manager setup guides",
      "Interactive safety scenarios",
      "Emergency response procedures"
    ]
  },
  {
    id: "tablet-mastery",
    title: "iPad/Android Tablet Mastery",
    description: "Get the most out of your tablet for reading, entertainment, and staying connected",
    icon: Tablet,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
    duration: "5-7 hours",
    lessons: 9,
    difficulty: "Beginner to Intermediate",
    whatYouLearn: [
      "Navigate tablet interfaces efficiently",
      "Download and organize apps",
      "Use tablets for video calls",
      "Read books and browse the web",
      "Manage photos and videos"
    ],
    highlights: [
      "Touch gesture mastery",
      "App store navigation",
      "Accessibility features setup",
      "Maintenance and care tips"
    ]
  },
  {
    id: "computer-mastery",
    title: "Computer & Laptop Mastery",
    description: "Become confident with Windows computers, file management, and essential programs",
    icon: Monitor,
    color: "#3B82F6",
    bgColor: "#DBEAFE", 
    duration: "8-10 hours",
    lessons: 12,
    difficulty: "Beginner to Advanced",
    whatYouLearn: [
      "Master Windows navigation and settings",
      "Organize files and folders effectively",
      "Use essential programs with confidence",
      "Browse the internet safely",
      "Maintain your computer's health"
    ],
    highlights: [
      "Complete Windows tutorial",
      "File organization strategies",
      "Software installation guides",
      "Performance optimization tips"
    ]
  },
  {
    id: "password-mastery",
    title: "Password Mastery Course",
    description: "Create bulletproof passwords and use password managers like a security expert",
    icon: Lock,
    color: "#DC2626",
    bgColor: "#FEE2E2",
    duration: "3-4 hours",
    lessons: 8,
    difficulty: "Essential for Everyone", 
    whatYouLearn: [
      "Create unbreakable passwords",
      "Use built-in password managers",
      "Secure all your accounts properly",
      "Recover from password breaches",
      "Set up two-factor authentication"
    ],
    highlights: [
      "Password strength testing tools",
      "Step-by-step manager setup",
      "Security breach response plans",
      "Advanced protection techniques"
    ]
  },
  {
    id: "healthcare-help",
    title: "Healthcare Technology Help",
    description: "Navigate patient portals, telemedicine, and health apps with confidence",
    icon: Heart,
    color: "#DC2626",
    bgColor: "#FEE2E2",
    duration: "4-6 hours",
    lessons: 9,
    difficulty: "Beginner to Intermediate",
    whatYouLearn: [
      "Access and use patient portals",
      "Set up telemedicine appointments", 
      "Manage prescriptions online",
      "Use health monitoring apps",
      "Understand health insurance websites"
    ],
    highlights: [
      "Portal navigation guides",
      "Video appointment setup",
      "Prescription management tools",
      "Emergency contact procedures"
    ]
  }
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCourse(null)}
            className="mb-6 text-lg px-6 py-3 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Courses
          </Button>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex items-start gap-6 mb-8">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: selectedCourse.bgColor }}
              >
                <selectedCourse.icon 
                  className="w-12 h-12" 
                  style={{ color: selectedCourse.color }}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {selectedCourse.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {selectedCourse.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedCourse.duration}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {selectedCourse.lessons} Lessons
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
                    <Star className="w-4 h-4 mr-2" />
                    {selectedCourse.difficulty}
                  </Badge>
                </div>
                <Link to={createPageUrl(`Course?id=${selectedCourse.id}&lesson=1`)}>
                  <Button 
                    className="text-xl px-8 py-4 rounded-2xl shadow-lg"
                    style={{ backgroundColor: selectedCourse.color }}
                  >
                    Start Course Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  {selectedCourse.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Highlights</h3>
                <ul className="space-y-3">
                  {selectedCourse.highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" className="mb-6 text-lg px-6 py-3 rounded-xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Find Your Course Now
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Choose your learning path and become a technology expert step by step
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Award className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-800">What Makes Our Courses Special</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-700 font-medium">Designed for Seniors</p>
              </div>
              <div>
                <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-700 font-medium">Step-by-Step Learning</p>
              </div>
              <div>
                <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-700 font-medium">Real-World Practice</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group flex"
            >
              <Card 
                className="h-full flex flex-col border-4 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer w-full"
                style={{ 
                  backgroundColor: course.bgColor,
                  borderColor: course.color + '40'
                }}
                onClick={() => setSelectedCourse(course)}
              >
                <CardHeader className="text-center pb-4">
                  <course.icon 
                    className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" 
                    style={{ color: course.color }}
                  />
                  <CardTitle 
                    className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300"
                    style={{ color: course.color }}
                  >
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{course.lessons} comprehensive lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{course.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full text-lg py-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 mt-auto"
                    style={{ backgroundColor: course.color }}
                  >
                    Explore This Course
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl mb-6">
              Choose any course above and begin your journey to technology confidence today!
            </p>
            <div className="flex justify-center items-center gap-2">
              <Heart className="w-6 h-6" />
              <span className="text-lg">Remember: Learning takes time. Be patient with yourself!</span>
              <Heart className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
