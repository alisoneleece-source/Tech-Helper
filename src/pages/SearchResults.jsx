import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { TechGuide } from '@/entities/TechGuide';
import { Glossary } from '@/entities/Glossary';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen, ChevronRight, Search, BookText, Frown, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

// Import course data to make it searchable
const courses = [
  {
    id: "phone-mastery",
    title: "Phone Mastery Course",
    description: "Master your smartphone with confidence - from basic navigation to advanced features"
  },
  {
    id: "staying-safe-online",
    title: "Staying Safe Online Course",
    description: "Protect yourself from scams, create secure passwords, and browse the internet safely"
  },
  {
    id: "tablet-mastery",
    title: "iPad/Android Tablet Mastery",
    description: "Get the most out of your tablet for reading, entertainment, and staying connected"
  },
  {
    id: "computer-mastery",
    title: "Computer & Laptop Mastery",
    description: "Become confident with Windows computers, file management, and essential programs"
  },
  {
    id: "password-mastery",
    title: "Password Mastery Course",
    description: "Create bulletproof passwords and use password managers like a security expert"
  },
  {
    id: "healthcare-help",
    title: "Healthcare Technology Help",
    description: "Navigate patient portals, telemedicine, and health apps with confidence"
  }
];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [guides, setGuides] = useState([]);
  const [terms, setTerms] = useState([]);
  const [matchingCourses, setMatchingCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const performSearch = useCallback(async () => {
    if (!query) {
      setIsLoading(false);
      setGuides([]);
      setTerms([]);
      setMatchingCourses([]);
      return;
    }
    
    setIsLoading(true);
    const lowercasedQuery = query.toLowerCase();

    try {
      const [allGuides, allTerms] = await Promise.all([
        TechGuide.list(),
        Glossary.list()
      ]);

      // Search guides
      const filteredGuides = allGuides.filter(guide => 
        guide.title.toLowerCase().includes(lowercasedQuery) ||
        guide.description.toLowerCase().includes(lowercasedQuery) ||
        (guide.tags && guide.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)))
      );

      // Search dictionary terms
      const filteredTerms = allTerms.filter(term => 
        term.term.toLowerCase().includes(lowercasedQuery) ||
        term.simple_definition.toLowerCase().includes(lowercasedQuery) ||
        (term.detailed_explanation && term.detailed_explanation.toLowerCase().includes(lowercasedQuery)) ||
        (term.synonyms && term.synonyms.some(s => s.toLowerCase().includes(lowercasedQuery)))
      );

      // Search courses
      const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(lowercasedQuery) ||
        course.description.toLowerCase().includes(lowercasedQuery)
      );

      setGuides(filteredGuides);
      setTerms(filteredTerms);
      setMatchingCourses(filteredCourses);

    } catch (error) {
      console.error("Error performing search:", error);
    }
    setIsLoading(false);
  }, [query]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" className="mb-4 text-lg px-6 py-3 rounded-xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            Search Results
          </h1>
          {query ? (
            <p className="text-2xl text-gray-600">
              Showing results for: <span className="font-bold text-blue-700">"{query}"</span>
            </p>
          ) : (
            <p className="text-2xl text-gray-600">
              Please enter a search query.
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Searching for you...</p>
          </div>
        ) : (guides.length === 0 && terms.length === 0 && matchingCourses.length === 0) ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <Frown className="w-20 h-20 mx-auto mb-6 text-orange-500" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No results found</h3>
            <p className="text-xl text-gray-600 mb-8">
              Sorry, we couldn't find anything matching your search. Try using different words.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {guides.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-green-600" />
                  Matching Guides
                </h2>
                <div className="space-y-4">
                  {guides.map((guide, index) => (
                    <motion.div key={guide.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, x: 5 }} className="group">
                      <Link to={createPageUrl(`Guide?title=${encodeURIComponent(guide.title)}`)}>
                        <Card className="cursor-pointer bg-white border-4 border-transparent hover:border-green-200 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6 flex items-center">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{guide.title}</h3>
                              <p className="text-lg text-gray-600">{guide.description}</p>
                            </div>
                            <ChevronRight className="w-8 h-8 text-gray-400 group-hover:text-green-600 group-hover:translate-x-2 transition-transform duration-300 ml-4" />
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {matchingCourses.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                  Matching Courses
                </h2>
                <div className="space-y-4">
                  {matchingCourses.map((course, index) => (
                    <motion.div key={course.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, x: 5 }} className="group">
                      <Link to={createPageUrl(`Courses`)}>
                        <Card className="cursor-pointer bg-white border-4 border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6 flex items-center">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">{course.title}</h3>
                              <p className="text-lg text-gray-600">{course.description}</p>
                            </div>
                            <ChevronRight className="w-8 h-8 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-transform duration-300 ml-4" />
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {terms.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <BookText className="w-8 h-8 text-purple-600" />
                  Matching Dictionary Terms
                </h2>
                <div className="space-y-4">
                  {terms.map((term, index) => (
                    <motion.div key={term.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, x: 5 }} className="group">
                       <Link to={createPageUrl(`Glossary`)}>
                        <Card className="cursor-pointer bg-white border-4 border-transparent hover:border-purple-200 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">{term.term}</h3>
                            <p className="text-lg text-gray-600">{term.simple_definition}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}