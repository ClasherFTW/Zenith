'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

interface IndexPageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function IndexPage({ isDarkMode, toggleTheme }: IndexPageProps) {
  const navigate = useNavigate();
  const [scrollActive, setScrollActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'features', 'services'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setScrollActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <section id="hero" className={`pt-32 pb-16 px-4 ${isDarkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-emerald-50 to-white'}`}>
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-emerald-500">Zenith</span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your Comprehensive Healthcare Management Platform
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-all font-semibold"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/login')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all border-2 ${isDarkMode ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-900' : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'}`}
              >
                Sign In
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-16 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">About Zenith</h2>
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Zenith is a modern healthcare management platform designed to streamline your medical journey. 
              From appointment scheduling to prescription tracking, we provide all the tools you need to manage 
              your health efficiently and effectively.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={`py-16 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '📊', title: 'Dashboard', desc: 'Monitor all your health metrics in one place' },
                { icon: '📅', title: 'Appointments', desc: 'Schedule and manage medical appointments' },
                { icon: '👤', title: 'Profile', desc: 'Store your complete health information' },
                { icon: '💊', title: 'Prescriptions', desc: 'Track and manage your medications' },
                { icon: '🌿', title: 'Wellness', desc: 'Get personalized health tips and articles' },
                { icon: '⭐', title: 'Feedback', desc: 'Share your experiences and rate services' }
              ].map((feature, idx) => (
                <div key={idx} className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'}`}>
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={`py-16 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Services</h2>
            <div className="space-y-6">
              {[
                'Real-time health monitoring and alerts',
                'Secure document storage and sharing',
                'Appointment scheduling with reminders',
                'Prescription management and refills',
                'Personalized health insights and recommendations',
                'Community feedback and ratings system'
              ].map((service, idx) => (
                <div key={idx} className={`flex items-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <span className="text-2xl mr-4">✓</span>
                  <span className="text-lg">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        // Update the image paths in your doctors array to match the exact filenames:
{/* Meet the Doctors Section */}
<section id="doctors" className={`py-16 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Expert Doctors</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { 
          name: 'Dr. Sarah Johnson', 
          specialty: 'Cardiologist',
          image: '/cardiology.jpeg',  // This matches your public directory
          bio: 'Specializes in heart health and cardiovascular diseases with over 10 years of experience.'
        },
        { 
          name: 'Dr. Michael Chen', 
          specialty: 'Neurologist',
          image: '/neurology.jpg',  // This matches your public directory
          bio: 'Expert in treating disorders of the nervous system and brain-related conditions.'
        },
        { 
          name: 'Dr. Emily Rodriguez', 
          specialty: 'Pediatrician',
          image: '/pediatrics.jpeg',  // This matches your public directory
          bio: 'Dedicated to providing compassionate care for children of all ages.'
        }
      ].map((doctor, idx) => (
        <div key={idx} className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <img 
            src={doctor.image} 
            alt={doctor.name}
            className="w-full h-64 object-cover"
            onError={(e) => {
              // This will help debug if the image fails to load
              console.error(`Failed to load image: ${doctor.image}`);
              // You can set a fallback image here if needed
              // e.currentTarget.src = '/placeholder-user.jpg';
            }}
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
            <p className={`text-emerald-500 font-medium mb-3`}>{doctor.specialty}</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{doctor.bio}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* CTA Section */}
        <section className={`py-16 px-4 ${isDarkMode ? 'bg-gradient-to-r from-emerald-900 to-emerald-800' : 'bg-gradient-to-r from-emerald-500 to-emerald-600'}`}>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of users managing their health with Zenith</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all font-semibold"
            >
              Sign Up Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 px-4 text-center ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-900 text-gray-300'}`}>
          <p>&copy; 2025 Zenith Healthcare. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
