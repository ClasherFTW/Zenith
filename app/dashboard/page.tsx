'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Reminder {
  id: number;
  title: string;
  time: string;
  completed: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: '', time: '' });
  const [stats, setStats] = useState({
    reminders: 0,
    appointments: 0,
    consultations: 0,
    healthScore: 85
  });
  const [user, setUser] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));

    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [router]);

  useEffect(() => {
    setStats(prev => ({
      ...prev,
      reminders: reminders.length
    }));
  }, [reminders]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now(),
        title: newReminder.title,
        time: newReminder.time,
        completed: false
      };
      const updated = [...reminders, reminder];
      setReminders(updated);
      localStorage.setItem('reminders', JSON.stringify(updated));
      setNewReminder({ title: '', time: '' });
      setShowModal(false);
    }
  };

  const handleDeleteReminder = (id: number) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
  };

  const slides = [
    { id: 'reminders', label: 'Reminders', icon: '🔔' },
    { id: 'stats', label: 'Stats', icon: '📊' },
    { id: 'consultations', label: 'Consultations', icon: '👨‍⚕️' }
  ];

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex justify-between items-center">
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Welcome, {user?.name || 'Patient'}! 👋
                </h1>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Here's your health dashboard overview
                </p>
              </div>
              <Link
                href="/"
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all"
              >
                ← Back to Home
              </Link>
            </div>
          </div>

          {/* Mobile Slider View */}
          {isMobile && (
            <div className="mb-8">
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                {/* Slider Content */}
                {slides[currentSlide].id === 'reminders' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {slides[currentSlide].label}
                    </h2>
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 mb-4 transition-all"
                    >
                      + Add Reminder
                    </button>
                    <div className="space-y-2">
                      {reminders.map(reminder => (
                        <div key={reminder.id} className={`p-3 rounded-lg flex justify-between items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <div>
                            <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{reminder.title}</p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{reminder.time}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteReminder(reminder.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {slides[currentSlide].id === 'stats' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {slides[currentSlide].label}
                    </h2>
                    <div className="space-y-3">
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Reminders</p>
                        <p className="text-2xl font-bold text-emerald-500">{stats.reminders}</p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Appointments</p>
                        <p className="text-2xl font-bold text-blue-500">{stats.appointments}</p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Health Score</p>
                        <p className="text-2xl font-bold text-amber-500">{stats.healthScore}/100</p>
                      </div>
                    </div>
                  </div>
                )}

                {slides[currentSlide].id === 'consultations' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {slides[currentSlide].label}
                    </h2>
                    <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>No upcoming consultations</p>
                    </div>
                  </div>
                )}

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-emerald-500 w-6' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Grid View */}
          {!isMobile && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Reminders Card */}
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>🔔 Reminders</h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 mb-4 transition-all"
                >
                  + Add Reminder
                </button>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {reminders.map(reminder => (
                    <div key={reminder.id} className={`p-3 rounded-lg flex justify-between items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div>
                        <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{reminder.title}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{reminder.time}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📊 Stats</h2>
                <div className="space-y-3">
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Reminders</p>
                    <p className="text-2xl font-bold text-emerald-500">{stats.reminders}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Appointments</p>
                    <p className="text-2xl font-bold text-blue-500">{stats.appointments}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Health Score</p>
                    <p className="text-2xl font-bold text-amber-500">{stats.healthScore}/100</p>
                  </div>
                </div>
              </div>

              {/* Consultations Card */}
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>👨‍⚕️ Consultations</h2>
                <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>No upcoming consultations</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg w-96 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add New Reminder</h3>
              <button onClick={() => setShowModal(false)} className="text-2xl">✕</button>
            </div>
            <input
              type="text"
              placeholder="Reminder title"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddReminder}
                className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={`flex-1 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
