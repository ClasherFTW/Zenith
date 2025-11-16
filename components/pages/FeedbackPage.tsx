'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

interface Feedback {
  id: number;
  name: string;
  rating: number;
  type: string;
  message: string;
  date: string;
}

interface FeedbackPageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function FeedbackPage({ isDarkMode, toggleTheme }: FeedbackPageProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedbackType, setFeedbackType] = useState('doctor');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('feedbacks');
    if (saved) {
      setFeedbacks(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = () => {
    if (name && message) {
      const feedback: Feedback = {
        id: Date.now(),
        name,
        rating,
        type: feedbackType,
        message,
        date: new Date().toLocaleDateString()
      };
      const updated = [...feedbacks, feedback];
      setFeedbacks(updated);
      localStorage.setItem('feedbacks', JSON.stringify(updated));
      setName('');
      setMessage('');
      setRating(5);
      setShowForm(false);
    }
  };

  const renderStars = (count: number, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            onClick={() => onRate && onRate(i)}
            className={`text-2xl transition-all ${i <= count ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}
            disabled={!onRate}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex justify-between items-center`}>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>⭐ Feedback & Ratings</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all"
            >
              {showForm ? 'Cancel' : '+ Leave Feedback'}
            </button>
          </div>

          {/* Feedback Form */}
          {showForm && (
            <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="doctor">Doctor</option>
                <option value="service">Service</option>
                <option value="facility">Facility</option>
              </select>
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rating</label>
                {renderStars(rating, setRating)}
              </div>
              <textarea
                placeholder="Your feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} resize-none h-24`}
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600"
              >
                Submit Feedback
              </button>
            </div>
          )}

          {/* Feedbacks List */}
          <div className="space-y-4">
            {feedbacks.map(feedback => (
              <div key={feedback.id} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {feedback.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feedback.type} • {feedback.date}
                    </p>
                  </div>
                  {renderStars(feedback.rating)}
                </div>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feedback.message}</p>
              </div>
            ))}
            {feedbacks.length === 0 && (
              <div className={`text-center p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No feedbacks yet. Be the first to leave one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
