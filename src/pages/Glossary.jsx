import React, { useState, useEffect } from "react";
import { Glossary } from "@/entities/Glossary";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function GlossaryPage() {
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadGlossary();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = terms.filter(term =>
      term.term.toLowerCase().includes(lowercasedQuery) ||
      term.simple_definition.toLowerCase().includes(lowercasedQuery) ||
      (term.synonyms && term.synonyms.some(s => s.toLowerCase().includes(lowercasedQuery)))
    );
    setFilteredTerms(filtered);
  }, [searchQuery, terms]);

  const loadGlossary = async () => {
    setIsLoading(true);
    try {
      const glossaryData = await Glossary.list("term");
      setTerms(glossaryData);
      setFilteredTerms(glossaryData);
    } catch (error) {
      console.error("Error loading glossary:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
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
            <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            Tech Dictionary
          </h1>
          <p className="text-2xl text-gray-600">
            Look up confusing tech words with simple explanations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a term (e.g., 'WiFi', 'App')"
            className="pl-12 text-xl h-16 border-4 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
          />
        </div>

        {/* Glossary List */}
        {isLoading ? (
          <div className="text-center">
            <p className="text-lg text-gray-500">Loading terms...</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredTerms.length > 0 ? filteredTerms.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem value={item.id} className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-200 transition-all">
                  <AccordionTrigger className="text-2xl font-semibold text-gray-800 p-6 hover:no-underline">
                    {item.term}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-purple-700 mb-2">Simple Explanation</h3>
                        <p className="text-lg text-gray-700 leading-relaxed">{item.simple_definition}</p>
                      </div>

                      {item.visual_example && (
                        <div>
                          <h3 className="text-xl font-bold text-purple-700 mb-2">What it Looks Like</h3>
                          <img 
                            src={item.visual_example}
                            alt={`Visual for ${item.term}`}
                            className="rounded-lg shadow-md border-4 border-white w-full md:w-2/3 mx-auto"
                          />
                        </div>
                      )}

                      {item.detailed_explanation && (
                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-300">
                          <h3 className="text-xl font-bold text-purple-700 mb-2">More Detail</h3>
                          <p className="text-lg text-gray-700 leading-relaxed">{item.detailed_explanation}</p>
                        </div>
                      )}

                      {item.synonyms && item.synonyms.length > 0 && (
                        <div>
                           <h3 className="text-xl font-bold text-purple-700 mb-2">Also Known As</h3>
                           <div className="flex flex-wrap gap-2">
                            {item.synonyms.map(synonym => (
                              <span key={synonym} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-md">
                                {synonym}
                              </span>
                            ))}
                           </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            )) : (
              <div className="text-center py-10 bg-white rounded-2xl shadow-md">
                <h3 className="text-2xl font-semibold text-gray-700">No results found</h3>
                <p className="text-lg text-gray-500 mt-2">
                  We couldn't find a term matching your search. Please try another word.
                </p>
              </div>
            )}
          </Accordion>
        )}
      </div>
    </div>
  );
}