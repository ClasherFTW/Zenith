'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/lib/theme-context';

export default function ThankYouPage() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`min-h-screen pt-20 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`max-w-md w-full px-4 py-12 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
          <div className="text-6xl mb-4">🎉</div>
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Thank You!</h1>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Thank you for using Zenith Healthcare. Your trust means everything to us.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
