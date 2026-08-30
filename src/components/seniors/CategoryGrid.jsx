import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => {
        const targetUrl = category.customUrl || createPageUrl(`Category?id=${category.id}`);
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-full"
          >
            <Link to={targetUrl} className="h-full block">
              <Card 
                className="h-full border-4 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
                style={{ 
                  backgroundColor: category.bgColor,
                  borderColor: category.color + '40'
                }}
              >
                <CardContent className="p-4 sm:p-6 flex-grow flex flex-col justify-between text-center">
                  <div className="flex-1 flex flex-col justify-center">
                    <category.icon 
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" 
                      style={{ color: category.color }}
                    />
                    <h3 
                      className="text-lg font-bold mb-2 leading-tight break-words"
                      style={{ color: category.color }}
                    >
                      {category.title}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center mt-4">
                    <span 
                      className="font-semibold text-base mr-2"
                      style={{ color: category.color }}
                    >
                      Start Learning
                    </span>
                    <ChevronRight 
                      className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ color: category.color }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </div>
  );
}