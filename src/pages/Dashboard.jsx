import React, { useState, useEffect } from "react";
import { TechGuide } from "@/entities/TechGuide";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Smartphone, 
  Monitor, 
  Apple, 
  Book, 
  Heart,
  HelpCircle,
  Settings,
  FileText,
  Phone,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import WelcomeSection from "../components/seniors/WelcomeSection";
import CategoryGrid from "../components/seniors/CategoryGrid";
import QuickSearchSection from "../components/seniors/QuickSearchSection";
import EmergencyHelpCard from "../components/seniors/EmergencyHelpCard";
import PopularGuidesSection from "../components/seniors/PopularGuidesSection";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [userData, guidesData] = await Promise.all([
        User.me().catch(() => null),
        TechGuide.list("-updated_date", 10)
      ]);
      
      // De-duplicate guides by title, keeping the newest one (since guidesData is already sorted by -updated_date)
      const uniqueTitles = new Set();
      const uniqueGuides = guidesData.filter(guide => {
          if (uniqueTitles.has(guide.title)) {
              return false;
          }
          uniqueTitles.add(guide.title);
          return true;
      });

      setUser(userData);
      setGuides(uniqueGuides);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const categories = [
    {
      id: 'android',
      title: 'Android Phone & Tablet',
      description: 'Learn to use your Android device',
      icon: Smartphone,
      color: '#4CAF50',
      bgColor: '#E8F5E8'
    },
    {
      id: 'apple',
      title: 'iPhone & iPad',
      description: 'Master your Apple devices',
      icon: Apple,
      color: '#000000',
      bgColor: '#F5F5F5',
      customUrl: createPageUrl("AppleGuides")
    },
    {
      id: 'windows',
      title: 'Windows Computer',
      description: 'Navigate your PC with confidence',
      icon: Monitor,
      color: '#0078D4',
      bgColor: '#E6F3FF',
      customUrl: createPageUrl(`Guide?title=${encodeURIComponent("Navigate Your Windows PC with Confidence")}`)
    },
    {
      id: 'healthcare',
      title: 'Patient Portals & Care Platforms',
      description: 'Navigate your care provider’s online tools',
      icon: Heart,
      color: '#DC2626',
      bgColor: '#FEE2E2',
      customUrl: createPageUrl("HealthcareGuides")
    },
    {
      id: 'tools',
      title: 'Helpful Tools',
      description: 'DocuSign, email, and more',
      icon: FileText,
      color: '#7C3AED',
      bgColor: '#F3E8FF'
    },
    {
      id: 'troubleshooting',
      title: 'Fix Common Problems',
      description: 'When things go wrong',
      icon: Settings,
      color: '#EA580C',
      bgColor: '#FFF7ED'
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Filter guides based on searchQuery
  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (guide.description && guide.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <WelcomeSection 
          greeting={getGreeting()}
          userName={user?.full_name?.split(' ')[0] || 'there'}
        />

        {/* Emergency Help - Always Visible */}
        <EmergencyHelpCard />

        {/* Quick Search */}
        {/* Keeping existing props to link the search input to the Dashboard's searchQuery state
            and enable filtering functionality. */}
        <QuickSearchSection 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Categories */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            What would you like to learn today?
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Choose a topic below to get started
          </p>
          
          <CategoryGrid categories={categories} />
        </div>

        {/* Popular Guides */}
        {/* Pass filteredGuides to display search results */}
        <PopularGuidesSection guides={filteredGuides} isLoading={isLoading} />

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-100 to-indigo-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">Messenger vs Texting</h3>
              <p className="text-blue-700 mb-4">Not sure which app you have open?</p>
              <Link to="/MessengerVsTextingPicker">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl">
                  Find Out Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Book className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-800 mb-2">Tech Dictionary</h3>
              <p className="text-purple-700 mb-4">Look up confusing tech terms</p>
              <Link to={createPageUrl("Glossary")}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 rounded-xl">
                  Browse Dictionary
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Phone className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-orange-800 mb-2">Get Help Now</h3>
              <p className="text-orange-700 mb-4">Need immediate assistance?</p>
              <Link to={createPageUrl("Emergency")}>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg py-3 rounded-xl">
                  Emergency Help
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <HelpCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Ask a Question</h3>
              <p className="text-green-700 mb-4">Can't find what you need?</p>
              <Link to={createPageUrl("Ask")}>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-xl">
                  Ask for Help
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}