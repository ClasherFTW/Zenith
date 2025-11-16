'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/lib/theme-context';

interface WellnessArticle {
  id: number;
  title: string;
  category: string;
  content: string;
  emoji: string;
}

const wellnessTips: WellnessArticle[] = [
  {
    id: 1,
    title: '10 Foods for Better Heart Health',
    category: 'nutrition',
    content: 'Discover foods that support cardiovascular health including berries, leafy greens, and fatty fish.',
    emoji: '🥗'
  },
  {
    id: 2,
    title: 'Daily Exercise Routine',
    category: 'fitness',
    content: 'A simple 30-minute daily exercise routine to improve your overall fitness and well-being.',
    emoji: '💪'
  },
  {
    id: 3,
    title: 'Meditation for Mental Health',
    category: 'mental-health',
    content: 'Learn how meditation can reduce stress and improve your mental well-being.',
    emoji: '🧘'
  },
  {
    id: 4,
    title: 'Sleep Hygiene Tips',
    category: 'sleep',
    content: 'Improve your sleep quality with these scientifically-backed sleep hygiene practices.',
    emoji: '😴'
  },
  {
    id: 5,
    title: 'Stress Management Techniques',
    category: 'stress',
    content: 'Effective techniques to manage daily stress and improve your quality of life.',
    emoji: '🧘‍♀️'
  },
  {
    id: 6,
    title: 'Hydration and Health',
    category: 'nutrition',
    content: 'Why staying hydrated is crucial for your health and how much water you should drink daily.',
    emoji: '💧'
  }
];

export default function WellnessPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = wellnessTips.filter(article => {
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    const searchMatch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const categories = ['all', 'nutrition', 'fitness', 'mental-health', 'sleep', 'stress'];

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Wellness Tips</h1>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Discover articles to improve your health and well-being</p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search wellness tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-all capitalize whitespace-nowrap ${selectedCategory === cat ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}
              >
                {cat === 'mental-health' ? 'Mental Health' : cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div key={article.id} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}>
                <div className="text-4xl mb-3">{article.emoji}</div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.title}
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {article.content}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm capitalize ${isDarkMode ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                  {article.category === 'mental-health' ? 'Mental Health' : article.category}
                </span>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className={`text-center p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No wellness tips found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
