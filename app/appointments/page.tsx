'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

interface Appointment {
  id: number;
  doctor: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function AppointmentsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ doctor: '', date: '', time: '' });
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

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

  const handleAddAppointment = () => {
    if (newAppointment.doctor && newAppointment.date && newAppointment.time) {
      const appointment: Appointment = {
        id: Date.now(),
        doctor: newAppointment.doctor,
        date: newAppointment.date,
        time: newAppointment.time,
        status: 'upcoming'
      };
      const updated = [...appointments, appointment];
      setAppointments(updated);
      localStorage.setItem('appointments', JSON.stringify(updated));
      setNewAppointment({ doctor: '', date: '', time: '' });
      setShowModal(false);
    }
  };

  const handleCancelAppointment = (id: number) => {
    const updated = appointments.map(a =>
      a.id === id ? { ...a, status: 'cancelled' as const } : a
    );
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const filteredAppointments = appointments.filter(a =>
    filter === 'all' ? true : a.status === filter
  );

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex justify-between items-center">
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                📅 Appointments
              </h1>
              <button
                onClick={() => setShowModal(true)}
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all"
              >
                + Book Appointment
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {(['all', 'upcoming', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg transition-all capitalize ${filter === f ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.map(apt => (
              <div key={apt.id} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex justify-between items-center`}>
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    👨‍⚕️ Dr. {apt.doctor}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    📅 {apt.date} at {apt.time}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[apt.status]}`}>
                    {apt.status}
                  </span>
                  {apt.status === 'upcoming' && (
                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredAppointments.length === 0 && (
              <div className={`text-center p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No appointments found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg w-96 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Book Appointment</h3>
            <input
              type="text"
              placeholder="Doctor name"
              value={newAppointment.doctor}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddAppointment}
                className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600"
              >
                Book
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
