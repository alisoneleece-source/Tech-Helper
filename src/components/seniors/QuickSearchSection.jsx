import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";

export default function QuickSearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const popularSearchLinks = {
    "Make text bigger": createPageUrl(`Guide?title=${encodeURIComponent("Making Text Bigger on Your Phone")}`),
    "Restart phone": createPageUrl(`Guide?title=${encodeURIComponent("How to Restart Your Device Safely")}`),
    "Video call family": createPageUrl(`Guide?title=${encodeURIComponent("Video Calling Your Family")}`),
    "DocuSign help": createPageUrl(`Guide?title=${encodeURIComponent("How to Use DocuSign to Sign Documents")}`),
    "WiFi problems": createPageUrl(`Emergency?problem=no-internet`),
    "Update apps": createPageUrl(`SearchResults?q=${encodeURIComponent("Update apps")}`),
  };

  const handleGeneralSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(createPageUrl(`SearchResults?q=${encodeURIComponent(searchQuery)}`));
    }
  };

  const handlePopularSearch = (term) => {
    const url = popularSearchLinks[term];
    if (url) {
      navigate(url);
    } else {
      navigate(createPageUrl(`SearchResults?q=${encodeURIComponent(term)}`));
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported on this browser. Please try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase().trim();
      setIsListening(false);
      setSearchQuery(spoken);

      // Try to match against popular search keywords
      const keywordMap = [
        { keywords: ["text", "bigger", "larger", "font", "size"], url: popularSearchLinks["Make text bigger"] },
        { keywords: ["restart", "reboot", "turn off", "frozen", "freeze"], url: popularSearchLinks["Restart phone"] },
        { keywords: ["video call", "facetime", "family", "video"], url: popularSearchLinks["Video call family"] },
        { keywords: ["docusign", "sign", "document", "signature"], url: popularSearchLinks["DocuSign help"] },
        { keywords: ["wifi", "internet", "connect", "online", "network"], url: popularSearchLinks["WiFi problems"] },
        { keywords: ["update", "apps", "upgrade"], url: popularSearchLinks["Update apps"] },
      ];

      const matched = keywordMap.find(({ keywords }) =>
        keywords.some((kw) => spoken.includes(kw))
      );

      if (matched) {
        navigate(matched.url);
      } else {
        navigate(createPageUrl(`SearchResults?q=${encodeURIComponent(spoken)}`));
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl shadow-lg p-4 sm:p-8"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
        Quick Search
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 mb-5 text-center">
        Type what you need help with
      </p>
      
      <form onSubmit={handleGeneralSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="make text bigger, restart phone..."
            className="pl-11 text-lg h-14 border-4 border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 w-full"
          />
        </div>
        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 sm:flex-none h-14 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-2xl shadow-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={handleVoiceSearch}
            className={`h-14 px-5 border-4 rounded-2xl transition-all ${isListening ? 'border-red-400 bg-red-50 text-red-600 animate-pulse' : 'border-gray-200 hover:bg-gray-50'}`}
            title="Voice search"
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </form>
      
      <div className="mt-5 text-center">
        <p className="text-base sm:text-lg text-gray-600 mb-3">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.keys(popularSearchLinks).map((term) => (
            <motion.button
              key={term}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full text-base text-gray-700 transition-colors duration-200"
              onClick={() => handlePopularSearch(term)}
            >
              {term}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}