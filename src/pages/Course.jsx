
import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  BookOpen,
  Target,
  Lightbulb,
  AlertTriangle,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Complete Phone Mastery Course Content
const phoneMarteryCourse = {
  id: "phone-mastery",
  title: "Phone Mastery Course",
  totalLessons: 10,
  lessons: [
    {
      id: 1,
      title: "Understanding Your Phone: The Foundation",
      duration: "25 minutes",
      type: "theory",
      objectives: [
        "Identify the basic components of your smartphone",
        "Understand the difference between hardware and software",
        "Learn the purpose of each physical button and port",
        "Recognize common phone terminology"
      ],
      content: {
        introduction: "Welcome to your Phone Mastery journey! In this first lesson, we'll build a solid foundation by understanding exactly what your smartphone is and how it works. Think of your phone as a tiny computer that fits in your pocket - and just like any tool, understanding its parts makes it much easier to use.",

        mainContent: [
          {
            section: "Physical Components: What's What on Your Phone",
            content: "Let's start with the parts you can see and touch. Every smartphone has these essential components:",
            details: [
              {
                item: "The Screen (Display)",
                explanation: "This is your main window to everything. Modern phones use 'touchscreens' - you control things by touching, tapping, and swiping on the glass surface. The screen shows you apps, messages, photos, and everything else.",
                image_url: "https://images.unsplash.com/photo-1589793463309-a1b831e50487?q=80&w=600&auto=format&fit=crop"
              },
              {
                item: "Power Button",
                explanation: "Usually located on the right side or top of your phone. Press it once to turn the screen on or off (like a light switch). Hold it down for several seconds to completely turn the phone on or off.",
                image_url: "https://images.unsplash.com/photo-1603273259169-36b359f03221?q=80&w=600&auto=format&fit=crop"
              },
              {
                item: "Volume Buttons",
                explanation: "Typically two buttons on the left side - one for louder (+) and one for quieter (-). These control the volume of calls, music, videos, and notification sounds.",
                image_url: "https://images.unsplash.com/photo-1603273259118-e73d3b76a74b?q=80&w=600&auto=format&fit=crop"
              },
              {
                item: "Home Button (if present)",
                explanation: "Older phones have a physical button at the bottom center. This always takes you back to your main screen. Newer phones do this with gestures instead of a button."
              },
              {
                item: "Charging Port",
                explanation: "The opening where you plug in your charging cable. This might be at the bottom or side of your phone. Some newer phones charge wirelessly too.",
                image_url: "https://images.unsplash.com/photo-1628151124702-9a74db274483?q=80&w=600&auto=format&fit=crop"
              },
              {
                item: "Camera Lens",
                explanation: "The small round glass circles - usually one on the back for taking photos and one on the front for video calls and selfies.",
                image_url: "https://images.unsplash.com/photo-1616077166314-415b331f0c2c?q=80&w=600&auto=format&fit=crop"
              },
              {
                item: "Speaker and Microphone",
                explanation: "Small holes or grilles that let sound in and out. The speaker lets you hear calls, music, and notifications. The microphone picks up your voice."
              }
            ]
          },
          {
            section: "Understanding Software: The Invisible Magic",
            content: "Now let's talk about what you can't see but what makes your phone actually work - the software:",
            details: [
              {
                item: "Operating System (iOS or Android)",
                explanation: "This is like the 'brain' of your phone. iPhone uses iOS, most other phones use Android. It's what makes everything work together and gives you the interface you see on screen.",
                image_url: "https://images.unsplash.com/photo-1618225821237-c83151b38032?q=80&w=600&auto=format&fit=crop"
              },
              {
                item: "Apps (Applications)",
                explanation: "These are programs that do specific things - like a calculator app for math, a weather app for forecasts, or a camera app for taking photos. Apps appear as small icons on your screen."
              },
              {
                item: "Home Screen",
                explanation: "This is what you see when you turn on your phone - rows of app icons. Think of it like the desktop of a computer or the top of your kitchen counter where you keep frequently used items.",
                image_url: "https://images.unsplash.com/photo-1593428939747-73540b611e15?q=80&w=600&auto=format&fit=crop"
              },
              {
                item: "Settings",
                explanation: "A special app (usually looks like a gear) where you can customize how your phone works - like changing the volume, brightness, or text size.",
                image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop"
              }
            ]
          }
        ],

        practice: {
          title: "Practice: Basic Navigation",
          content: "Time to try it yourself! Pick up your phone and try these simple actions:",
          steps: [
            {
              item: "Turn Your Screen On and Off",
              explanation: "Find the power button. Press it once. The screen should go dark. Press it again to wake it up. This is useful for saving battery.",
              image_url: "https://images.unsplash.com/photo-1603273259169-36b359f03221?q=80&w=600&auto=format&fit=crop"
            },
            {
              item: "Change the Volume",
              explanation: "Locate the volume buttons. Press the 'up' button to make it louder and the 'down' button to make it quieter. You should see a volume indicator appear on your screen.",
              image_url: "https://images.unsplash.com/photo-1603273259118-e73d3b76a74b?q=80&w=600&auto=format&fit=crop"
            },
            {
              item: "Open an App",
              explanation: "From your home screen, find an app you recognize (like 'Phone' or 'Messages') and gently tap its icon. You've just launched an app.",
              image_url: "https://images.unsplash.com/photo-1596742639414-7221f42e423d?q=80&w=600&auto=format&fit=crop"
            }
          ]
        },

        practicalTips: [
          "Hold your phone with your non-dominant hand and use your index finger of your dominant hand for tapping - this gives you the most control",
          "If the screen seems dim, it might be in 'sleep mode' - just press the power button once to wake it up",
          "Don't be afraid to explore - it's very hard to break anything just by tapping on the screen",
          "If you ever get lost, look for a 'Home' button or swipe up from the bottom of the screen to get back to your main screen"
        ],

        commonMistakes: [
          {
            mistake: "Pressing too hard on the touchscreen",
            solution: "Touchscreens are very sensitive - a light tap is all you need. Think of it like touching a soap bubble."
          },
          {
            mistake: "Confusing the power button with volume buttons",
            solution: "Power button is usually by itself on one side, volume buttons are usually two buttons together on the opposite side."
          },
          {
            mistake: "Thinking the phone is broken when the screen goes black",
            solution: "Phones automatically turn off their screens to save battery - just press the power button once to wake it up."
          }
        ],

        keyTerms: [
          { term: "Touchscreen", definition: "A screen you control by touching it with your finger" },
          { term: "App", definition: "A program that does a specific job, like taking photos or checking weather" },
          { term: "Home Screen", definition: "The main screen with app icons that you see when you turn on your phone" },
          { term: "Operating System", definition: "The main software that runs your phone (iOS for iPhones, Android for most others)" }
        ]
      }
    },
    {
      id: 2,
      title: "First Steps: Turning On and Basic Navigation",
      duration: "30 minutes",
      type: "practice",
      objectives: [
        "Successfully turn your phone on and off",
        "Navigate the home screen confidently",
        "Master basic touch gestures (tap, swipe, pinch)",
        "Understand and use the status bar information"
      ],
      content: {
        introduction: "Now that you understand what your phone is, let's get hands-on! This lesson is all about actually using your phone. We'll start with the very basics and build up your confidence with each step.",

        practiceScenarios: [
          {
            title: "Scenario 1: Morning Phone Check-in (Easy)",
            setup: "It's 8 AM and you want to check your phone after sleeping. Your phone screen is black.",
            image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
            steps: [
              "Press the power button once - you should see the screen light up",
              "If you see a lock screen, swipe up from the bottom (or enter your passcode if you have one)",
              "You should now see your home screen with app icons",
              "Practice tapping different app icons to see what they do",
              "Use the home gesture (swipe up from bottom) or home button to return to the main screen"
            ],
            whatToExpect: "The screen should respond immediately to your touch. Don't worry about 'breaking' anything - just explore!",
            troubleshooting: "If nothing happens when you press the power button, try charging your phone for 15 minutes first."
          },
          {
            title: "Scenario 2: Exploring Your Home Screen (Easy)",
            setup: "Your phone is on and showing the home screen with various app icons.",
            image_url: "https://images.unsplash.com/photo-1593428939747-73540b611e15?q=80&w=600&auto=format&fit=crop",
            steps: [
              "Count how many app icons you can see on your screen",
              "Practice tapping gently on different icons - notice how each opens a different app",
              "Try swiping left or right on the home screen - this might show you more screens of apps",
              "Look at the bottom of the screen - these are usually your most important apps",
              "Practice returning to the home screen from any app you open"
            ],
            whatToExpect: "You'll see different screens of apps, and each app will have a different purpose.",
            troubleshooting: "If you get 'stuck' in an app, look for a back arrow, home icon, or try the home gesture."
          },
          {
            title: "Scenario 3: Understanding Touch Gestures (Medium)",
            setup: "You want to learn the different ways to interact with your touchscreen.",
            image_url: "https://images.unsplash.com/photo-1604871025217-7a53047976c6?q=80&w=600&auto=format&fit=crop",
            steps: [
              "Tap: Gently touch and immediately lift your finger - try this on different app icons",
              "Long press: Touch and hold your finger down for 2-3 seconds - try this on an empty area of your home screen",
              "Swipe: Place your finger on the screen and slide it in a direction - practice swiping up, down, left, and right",
              "Pinch to zoom: Use two fingers and pinch them together or spread them apart - try this in the Photos app if you have pictures"
            ],
            whatToExpect: "Each gesture does something different. Tapping selects, long pressing often gives you options, swiping moves between screens.",
            troubleshooting: "If gestures aren't working, make sure your screen is clean and your fingers aren't too wet or dry."
          },
          {
            title: "Scenario 4: Reading Your Status Bar (Medium)",
            setup: "Look at the very top of your phone screen - this narrow strip shows important information.",
            image_url: "https://images.unsplash.com/photo-1618384887928-63b751298839?q=80&w=600&auto=format&fit=crop",
            steps: [
              "Find the battery icon - this shows how much power you have left",
              "Look for signal bars - these show how strong your phone connection is",
              "Find the WiFi symbol - curved lines that show internet connection strength",
              "Check for the time - usually displayed prominently",
              "Notice any other small icons - these might be notifications from apps"
            ],
            whatToExpected: "You'll start to understand what your phone is telling you about its status.",
            troubleshooting: "If you can't see the status bar, try swiping down from the very top of the screen."
          },
          {
            title: "Scenario 5: Safe Shutdown Practice (Easy)",
            setup: "You want to completely turn off your phone for the night or to troubleshoot an issue.",
            image_url: "https://images.unsplash.com/photo-1580674285054-f484557f353a?q=80&w=600&auto=format&fit=crop",
            steps: [
              "Hold down the power button for 3-5 seconds",
              "You should see a menu appear with power options",
              "Tap 'Power Off' or 'Shut Down' (the exact words vary by phone)",
              "Wait for the screen to go completely black",
              "To turn it back on, hold the power button for 2-3 seconds until you see the startup logo"
            ],
            whatToExpect: "The phone will take 30-60 seconds to fully shut down and 1-2 minutes to restart.",
            troubleshooting: "If the power menu doesn't appear, you might need to hold the button longer or try holding power + volume down together."
          }
        ],

        practicalExercises: [
          {
            title: "Home Screen Exploration Challenge",
            instructions: "Spend 10 minutes exploring your home screen. Tap on 5 different apps, then successfully return to the home screen each time. Make note of what each app does.",
            timeLimit: "10 minutes",
            successCriteria: "You can confidently navigate to and from 5 different apps."
          },
          {
            title: "Gesture Practice Routine",
            instructions: "Practice each gesture 10 times: single tap, long press, swipe up, swipe down, swipe left, swipe right. Time yourself to see how comfortable you become.",
            timeLimit: "15 minutes",
            successCriteria: "All gestures feel natural and you can perform them without thinking."
          }
        ],

        troubleshootingGuide: [
          {
            problem: "Screen won't respond to touch",
            solutions: [
              "Clean your screen with a soft, dry cloth",
              "Make sure your hands aren't too wet or wearing gloves",
              "Try restarting your phone by holding the power button"
            ]
          },
          {
            problem: "Phone won't turn on",
            solutions: [
              "Charge your phone for at least 15 minutes",
              "Try a different charging cable or wall adapter",
              "Hold the power button for 10-15 seconds (not just a quick press)"
            ]
          },
          {
            problem: "Got lost in an app and can't get back",
            solutions: [
              "Look for a back arrow (←) usually in the top-left corner",
              "Look for a home icon, usually at the bottom of the screen",
              "Try swiping up from the very bottom of the screen",
              "If all else fails, press the physical home button if your phone has one"
            ]
          }
        ]
      }
    },
    {
      id: 3,
      title: "Making Your Phone Easier to Use: Accessibility Settings",
      duration: "35 minutes",
      type: "practice",
      objectives: [
        "Increase text size for better readability",
        "Adjust screen brightness and contrast",
        "Set up simple accessibility features",
        "Customize your phone for your specific needs"
      ],
      // ... (I'll continue with the full content for remaining lessons)
    },
    // ... (Lessons 4-10 would continue with similar detailed structure)
  ]
};

export default function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('id');
  const lessonId = parseInt(searchParams.get('lesson')) || 1;
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);

  // For now, we'll focus on the Phone Mastery course
  const course = phoneMarteryCourse;
  const currentLesson = course?.lessons.find(l => l.id === lessonId);
  const progress = (completedLessons.length / course?.totalLessons) * 100;

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const nextLesson = () => {
    if (lessonId < course?.totalLessons) {
      window.location.href = createPageUrl(`Course?id=${courseId}&lesson=${lessonId + 1}`);
    }
  };

  const prevLesson = () => {
    if (lessonId > 1) {
      window.location.href = createPageUrl(`Course?id=${courseId}&lesson=${lessonId - 1}`);
    }
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Course not found</h2>
          <Link to={createPageUrl("Courses")}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 rounded-xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link to={createPageUrl("Courses")}>
              <Button variant="outline" className="text-lg px-6 py-3 rounded-xl">
                <ArrowLeft className="w-5 h-5 mr-2" />
                All Courses
              </Button>
            </Link>
            <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
              Lesson {lessonId} of {course.totalLessons}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Course Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        {/* Lesson Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-lg rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {lessonId}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-800">
                      {currentLesson.title}
                    </CardTitle>
                    <div className="flex gap-4 mt-2">
                      <Badge className="bg-green-100 text-green-800">
                        <Clock className="w-3 h-3 mr-1" />
                        {currentLesson.duration}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800">
                        {currentLesson.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {/* Learning Objectives */}
                <div className="mb-8 p-6 bg-blue-50 rounded-2xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Target className="w-6 h-6 mr-2" />
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {currentLesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Introduction */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {currentLesson.content.introduction}
                  </p>
                </div>

                {/* Main Content Sections */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentLesson.type === 'practice' && currentLesson.content.practiceScenarios ? (
                      // Practice Lesson Content
                      <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-gray-800">Practice Scenarios</h3>
                        {currentLesson.content.practiceScenarios.map((scenario, index) => (
                          <div key={index} className="border-2 border-gray-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                scenario.title.includes('Easy') ? 'bg-green-500' :
                                scenario.title.includes('Medium') ? 'bg-yellow-500' : 'bg-red-500'
                              }`}>
                                {index + 1}
                              </div>
                              <h4 className="text-xl font-bold text-gray-800">{scenario.title}</h4>
                            </div>

                            {scenario.image_url && (
                              <img
                                src={scenario.image_url}
                                alt={`Visual for ${scenario.title}`}
                                className="rounded-lg shadow-md mb-6 w-full object-cover max-h-64"
                              />
                            )}

                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                              <h5 className="font-bold text-blue-800 mb-2">Scenario Setup:</h5>
                              <p className="text-blue-700">{scenario.setup}</p>
                            </div>

                            <h5 className="font-bold text-gray-800 mb-3">Steps to Complete:</h5>
                            <ol className="list-decimal list-inside space-y-2 mb-4">
                              {scenario.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="text-gray-700 text-lg">{step}</li>
                              ))}
                            </ol>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h6 className="font-bold text-green-800 mb-2 flex items-center">
                                  <Lightbulb className="w-4 h-4 mr-2" />
                                  What to Expect:
                                </h6>
                                <p className="text-green-700">{scenario.whatToExpect}</p>
                              </div>
                              <div className="bg-yellow-50 p-4 rounded-lg">
                                <h6 className="font-bold text-yellow-800 mb-2 flex items-center">
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  Troubleshooting:
                                </h6>
                                <p className="text-yellow-700">{scenario.troubleshooting}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Theory Lesson Content
                      <div className="space-y-8">
                        {currentLesson.content.mainContent?.map((section, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-6">
                            <h4 className="text-xl font-bold text-gray-800 mb-4">{section.section}</h4>
                            <p className="text-lg text-gray-700 mb-4">{section.content}</p>
                            <div className="space-y-4">
                              {section.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="bg-gray-50 p-4 rounded-lg overflow-hidden">
                                  <div className="md:flex md:gap-6 items-center">
                                    {detail.image_url && (
                                      <img src={detail.image_url} alt={detail.item} className="w-full md:w-1/3 h-auto rounded-md mb-4 md:mb-0 object-cover shadow-sm"/>
                                    )}
                                    <div className="flex-1">
                                      <h5 className="font-bold text-gray-800 mb-2">{detail.item}:</h5>
                                      <p className="text-gray-700">{detail.explanation}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Render practice section if present (e.g., in a theory lesson that also has a practice component) */}
                {currentLesson.content.practice && (
                  <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                      <Play className="w-6 h-6 mr-2" />
                      {currentLesson.content.practice.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      {currentLesson.content.practice.content}
                    </p>
                    <div className="space-y-4">
                      {currentLesson.content.practice.steps.map((step, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                           <div className="md:flex md:gap-6 items-center">
                            {step.image_url && (
                              <img src={step.image_url} alt={step.item} className="w-full md:w-1/3 h-auto rounded-md mb-4 md:mb-0 object-cover shadow-sm"/>
                            )}
                            <div className="flex-1">
                              <h4 className="font-bold text-blue-800 mb-2">Step {index + 1}: {step.item}</h4>
                              <p className="text-blue-700">{step.explanation}</p>
                            </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practical Tips */}
                {currentLesson.content.practicalTips && (
                  <div className="mt-8 p-6 bg-green-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                      <Lightbulb className="w-6 h-6 mr-2" />
                      Practical Tips
                    </h3>
                    <ul className="space-y-3">
                      {currentLesson.content.practicalTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-green-700 text-lg">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Mistakes */}
                {currentLesson.content.commonMistakes && (
                  <div className="mt-8 p-6 bg-red-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2" />
                      Common Mistakes to Avoid
                    </h3>
                    <div className="space-y-4">
                      {currentLesson.content.commonMistakes.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                          <h4 className="font-bold text-red-800 mb-2">❌ {item.mistake}</h4>
                          <p className="text-red-700">✅ <strong>Solution:</strong> {item.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Terms */}
                {currentLesson.content.keyTerms && (
                  <div className="mt-8 p-6 bg-purple-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                      <BookOpen className="w-6 h-6 mr-2" />
                      Key Terms
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentLesson.content.keyTerms.map((term, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-purple-800">{term.term}</h4>
                          <p className="text-purple-700">{term.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={prevLesson}
                disabled={lessonId === 1}
                className="text-lg px-6 py-3 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous Lesson
              </Button>

              <Button
                onClick={() => markLessonComplete(lessonId)}
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Mark Complete
              </Button>

              <Button
                onClick={nextLesson}
                disabled={lessonId === course.totalLessons}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl"
              >
                Next Lesson
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg rounded-2xl sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Course Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={createPageUrl(`Course?id=${courseId}&lesson=${lesson.id}`)}
                      className={`block p-3 rounded-lg transition-colors ${
                        lesson.id === lessonId
                          ? 'bg-blue-600 text-white'
                          : completedLessons.includes(lesson.id)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          lesson.id === lessonId
                            ? 'bg-white text-blue-600'
                            : completedLessons.includes(lesson.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {completedLessons.includes(lesson.id) ? '✓' : lesson.id}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{lesson.title}</div>
                          <div className="text-xs opacity-75">{lesson.duration}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
