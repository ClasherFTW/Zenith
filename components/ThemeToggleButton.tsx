'use client';

import React from 'react';

interface ThemeToggleButtonProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggleButton({ isDarkMode, toggleTheme }: ThemeToggleButtonProps) {
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}
