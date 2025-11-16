'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Navigation({ isDarkMode, toggleTheme }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/dashboard', label: '📊 Dashboard' },
    { href: '/appointments', label: '📅 Appointments' },
    { href: '/profile', label: '👤 Profile' }
  ];

  const moreLinks = [
    { href: '/prescriptions', label: '💊 Prescriptions' },
    { href: '/wellness', label: '🌿 Wellness' },
    { href: '/feedback', label: '⭐ Feedback' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b backdrop-blur-md bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${isDarkMode ? 'from-emerald-400 to-emerald-600' : 'from-emerald-500 to-emerald-700'} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className={`font-bold text-lg hidden sm:inline ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Zenith</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive(link.href) ? `${isDarkMode ? 'bg-emerald-900 text-emerald-400' : 'bg-emerald-100 text-emerald-700'} border-b-2 border-emerald-500` : `${isDarkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'}`}`}
              >
                {link.label}
              </Link>
            ))}

            <div 
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isDarkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'}`}
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              >
                ⋯ More
              </button>
              {isMoreOpen && (
                <div 
                  className={`absolute right-0 mt-0 w-48 rounded-md shadow-lg py-1 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} z-10`}
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  {moreLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-emerald-900 hover:text-emerald-400' : 'text-gray-700 hover:bg-emerald-100'}`}
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Hamburger Menu for Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12M4 6h16M4 12h16M4 18h16' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden pb-4 space-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            {[...navLinks, ...moreLinks].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:bg-emerald-900' : 'text-gray-700 hover:bg-emerald-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
