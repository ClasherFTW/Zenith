'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { FiMenu, FiChevronDown, FiSearch, FiSun, FiMoon, FiUser, FiX } from 'react-icons/fi';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  Pill, 
  HeartPulse,
  MessageSquare,
  Settings,
  History as HistoryIcon,
  FileText,
  Activity,
  Bell,
  Sun,
  Moon,
  Search as SearchIcon,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  submenu?: { href: string; label: string }[];
}

export default function EnhancedNavigation({ isDarkMode, toggleTheme }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const controls = useAnimation();

  // Navigation links with submenus
  const navLinks: NavLink[] = [
    { 
      href: '/dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    { 
      href: '/appointments', 
      label: 'Appointments', 
      icon: <Calendar className="w-5 h-5" />,
      submenu: [
        { href: '/appointments/upcoming', label: 'Upcoming' },
        { href: '/appointments/history', label: 'History' }
      ]
    },
    { 
      href: '/profile', 
      label: 'Profile', 
      icon: <User className="w-5 h-5" />,
      submenu: [
        { href: '/profile/settings', label: 'Settings' },
        { href: '/profile/medical-history', label: 'Medical History' }
      ]
    },
    { 
      href: '/prescriptions', 
      label: 'Prescriptions', 
      icon: <Pill className="w-5 h-5" />,
      submenu: [
        { href: '/prescriptions/current', label: 'Current' },
        { href: '/prescriptions/history', label: 'History' }
      ]
    },
    { 
      href: '/wellness', 
      label: 'Wellness', 
      icon: <HeartPulse className="w-5 h-5" />,
      submenu: [
        { href: '/wellness/tips', label: 'Health Tips' },
        { href: '/wellness/articles', label: 'Articles' }
      ]
    },
    { 
      href: '/contact', 
      label: 'Contact', 
      icon: <MessageSquare className="w-5 h-5" />,
      submenu: [
        { href: '/contact/support', label: 'Support' },
        { href: '/contact/feedback', label: 'Feedback' }
      ]
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  const isActive = (path: string, exact: boolean = false) => {
    return exact ? pathname === path : pathname.startsWith(path);
  };

  const focusSearch = () => {
    searchRef.current?.focus();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} shadow-lg` 
          : 'bg-transparent'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                isDarkMode ? 'from-emerald-400 to-teal-500' : 'from-emerald-500 to-teal-600'
              } flex items-center justify-center`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-lg">Z</span>
            </motion.div>
            <span className={`font-bold text-xl hidden sm:inline ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              Zenith
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                    isActive(link.href)
                      ? `${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`
                      : `${isDarkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'}`
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                  {link.submenu && (
                    <FiChevronDown className={`w-4 h-4 transition-transform ${
                      activeSubmenu === link.label ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>
                
                {link.submenu && (
                  <div 
                    className={`absolute left-0 mt-1 w-48 rounded-lg shadow-lg py-1 ${
                      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    } opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                  >
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActive(subItem.href, true)
                            ? `${isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`
                            : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side - Search, Theme, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <button 
              onClick={focusSearch}
              className="lg:hidden p-2 rounded-full focus:outline-none"
              aria-label="Search"
            >
              <FiSearch className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>

            {/* Search Bar - Desktop */}
            <motion.form 
              onSubmit={handleSearch}
              className={`hidden lg:flex items-center overflow-hidden rounded-full ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              } ${isSearchFocused ? 'ring-2 ring-emerald-500' : ''}`}
              initial={false}
              animate={{
                width: isSearchFocused ? '240px' : '40px',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <input
                ref={searchRef}
                type="text"
                placeholder={isSearchFocused ? 'Search...' : ''}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => !searchQuery && setIsSearchFocused(false)}
                className={`py-2 px-4 w-full focus:outline-none bg-transparent ${
                  isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
              <button 
                type="submit"
                className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}
              >
                <FiSearch />
              </button>
            </motion.form>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                className={`p-1 rounded-full ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveSubmenu(activeSubmenu === 'profile' ? null : 'profile')}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <FiUser className="w-4 h-4" />
                </div>
              </button>
              
              <AnimatePresence>
                {activeSubmenu === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    } z-50`}
                  >
                    <Link
                      href="/profile"
                      className={`block px-4 py-2 text-sm ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveSubmenu(null)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className={`block px-4 py-2 text-sm ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveSubmenu(null)}
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button
                      className={`w-full text-left px-4 py-2 text-sm ${
                        isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        // Handle sign out
                        setActiveSubmenu(null);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <FiMenu className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden fixed inset-0 mt-16 overflow-y-auto ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className={`relative rounded-lg overflow-hidden border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full py-3 px-4 pr-10 focus:outline-none ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white placeholder-gray-400' 
                        : 'bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button 
                    type="submit"
                    className={`absolute right-0 top-0 h-full px-3 flex items-center ${
                      isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'
                    }`}
                  >
                    <SearchIcon className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <motion.div 
                className="space-y-1"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={link.href}
                    variants={itemVariants}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <div className="flex flex-col">
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-4 py-3 text-base font-medium ${
                          isActive(link.href)
                            ? `${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`
                            : `${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`
                        }`}
                        onClick={() => {
                          if (!link.submenu) {
                            setIsMenuOpen(false);
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <span>{link.icon}</span>
                          <span>{link.label}</span>
                        </div>
                        {link.submenu && (
                          <ChevronDown 
                            className={`w-5 h-5 transition-transform ${
                              activeSubmenu === link.label ? 'rotate-180' : ''
                            }`} 
                          />
                        )}
                      </Link>
                      
                      {link.submenu && (
                        <motion.div 
                          className="overflow-hidden"
                          initial={{ height: 0 }}
                          animate={{ 
                            height: activeSubmenu === link.label ? 'auto' : 0 
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="pl-12 pr-4 py-1 space-y-1">
                            {link.submenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`block py-2 px-2 rounded-md text-sm ${
                                  isActive(subItem.href, true)
                                    ? `${isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`
                                    : `${isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'}`
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Footer */}
              <div className={`mt-8 pt-6 border-t ${
                isDarkMode ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between px-2">
                  <div className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Zenith Health
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-emerald-500">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-emerald-500">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
