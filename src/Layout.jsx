import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  BookOpen,
  GraduationCap,
  Heart,
  AlertTriangle,
  Menu as MenuIcon,
  X,
  BookText,
  Phone,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

// Senior-friendly navigation items
const navigationItems = [
    { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
    { title: "Guides", url: createPageUrl("HealthcareGuides"), icon: BookOpen },
    { title: "Courses", url: createPageUrl("Courses"), icon: GraduationCap },
    { title: "Glossary", url: createPageUrl("Glossary"), icon: BookText },
    { title: "Messenger vs Texting", url: "/MessengerVsTextingPicker", icon: MessageCircle },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      {/* Top Navigation Bar - Senior Friendly */}
      <nav className="bg-white border-b-4 border-blue-200 shadow-lg sticky top-0 z-50">
        <div className="max-w-full mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Dashboard")} className="flex-shrink-0 flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-white" fill="white" />
              </div>
              <div>
                <span className="font-bold text-gray-800 text-2xl">Tech Helper</span>
                <p className="text-sm text-gray-600 -mt-1">Your friendly tech guide</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`px-6 py-3 rounded-2xl text-lg font-medium transition-all duration-200 ${
                    location.pathname === item.url
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                >
                  <item.icon className="w-5 h-5 inline mr-2" />
                  {item.title}
                </Link>
              ))}
            </div>
            
            {/* Emergency Help Button */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <Link to={createPageUrl("Emergency")}>
                <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-3 rounded-2xl shadow-lg">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Emergency Help
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-12 w-12 border-4 rounded-2xl"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-blue-100 bg-white">
            <div className="px-6 pt-4 pb-6 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`block px-6 py-4 rounded-2xl text-lg font-medium transition-all duration-200 ${
                    location.pathname === item.url
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 inline mr-3" />
                  {item.title}
                </Link>
              ))}
              
              {/* Mobile Emergency Help */}
              <Link
                to={createPageUrl("Emergency")}
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-4 rounded-2xl">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Emergency Help
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Portfolio prototype footer */}
      <footer className="bg-white border-t-4 border-blue-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8 text-center">
          <p className="text-base font-semibold text-gray-700">Work-in-progress portfolio prototype</p>
          <p className="text-sm text-gray-500 mt-1">Built to explore plain-language technology support for people who may need a little more help navigating digital tools.</p>
        </div>
      </footer>
    </div>
  );
}