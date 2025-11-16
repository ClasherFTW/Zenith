'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

interface ThankYouPageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function ThankYouPage({ isDarkMode, toggleTheme }: ThankYouPageProps) {
  const navigate = useNavigate();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`min-h-screen pt-20 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`text-center p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md`}>
          <div className="text-6xl mb-6">✓</div>
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Thank You!
          </h1>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your form has been successfully submitted. We'll get back to you soon.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
