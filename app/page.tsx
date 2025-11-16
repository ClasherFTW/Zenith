'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

// Professional Icons
import { 
  FaChartPie, FaCalendarAlt, FaUserCircle, FaPills, FaSpa, FaStar,
  FaHeartbeat, FaUserMd, FaHospital, FaChild, FaBone, FaBrain, FaClinicMedical
} from 'react-icons/fa';
import { MdEmergency } from 'react-icons/md';

export default function Home() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
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

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className={`${isDarkMode ? 'bg-[#1E1A18] text-[#EFEBE9]' : 'bg-[#FAF7F5] text-[#5D4037]'}`}>
        {/* HERO */}
        <section id="hero" className="relative pt-32 pb-16 px-4 overflow-hidden min-h-[600px] flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover brightness-100 dark:brightness-75"
              poster="/placeholder.svg?height=600&width=1200"
              style={{ filter: isDarkMode ? 'brightness(0.75)' : 'none' }}
            >
              <source src="water.mov" type="video/quicktime" />
              <source src="water.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div 
              className={`absolute inset-0 transition-colors duration-300 ${
                isDarkMode ? 'bg-[#3E2723]/80' : 'bg-[#8D6E63]/30'
              }`}
            ></div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10 w-full px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Welcome to <span className="text-[#D7CCC8]">Zenith</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#EFEBE9]">
              Your Comprehensive Healthcare Management Platform
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/dashboard"
                className="bg-[#8D6E63] hover:bg-[#795548] text-white px-8 py-3 rounded-lg transition-all font-semibold shadow-lg hover:shadow-[#A1887F]/20"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/login"
                className="border-2 border-[#D7CCC8] text-[#EFEBE9] px-8 py-3 rounded-lg hover:bg-[#5D4037]/20 hover:border-[#EFEBE9] transition-all font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={`py-16 px-4 ${isDarkMode ? 'bg-[#1E1A18]' : 'bg-[#EFEBE9]'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#5D4037] dark:text-[#D7CCC8]">About Zenith</h2>
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-[#D7CCC8]' : 'text-[#5D4037]'}`}>
              Zenith is a modern healthcare management platform designed to streamline your medical journey. 
              From appointment scheduling to prescription tracking, we provide all the tools you need to manage 
              your health efficiently and effectively.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className={`py-16 px-4 ${isDarkMode ? 'bg-[#2A211F]' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#5D4037] dark:text-[#D7CCC8]">Key Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  icon: <FaChartPie className="text-[#8D6E63] dark:text-[#A1887F]" size={40} />, 
                  title: 'Dashboard', 
                  desc: 'Monitor all your health metrics',
                  link: '/dashboard'
                },
                { 
                  icon: <FaCalendarAlt className="text-[#8D6E63] dark:text-[#A1887F]" size={40} />, 
                  title: 'Appointments', 
                  desc: 'Schedule and manage appointments',
                  link: '/appointments'
                },
                { 
                  icon: <FaUserCircle className="text-[#8D6E63] dark:text-[#A1887F]" size={40} />, 
                  title: 'Profile', 
                  desc: 'Store your complete health info',
                  link: '/profile'
                },
                { 
                  icon: <FaPills className="text-[#8D6E63] dark:text-[#A1887F]" size={40} />, 
                  title: 'Prescriptions', 
                  desc: 'Track your medications',
                  link: '/prescriptions'
                },
                { 
                  icon: <FaSpa className="text-[#8D6E63] dark:text-[#A1887F]" size={40} />, 
                  title: 'Wellness', 
                  desc: 'Personalized wellness tips',
                  link: '/wellness'
                },
                { 
                  icon: <FaStar className="text-[#8D6E63] dark:text-[#A1887F]" size={40} />, 
                  title: 'Feedback', 
                  desc: 'Rate and review services',
                  link: '/feedback'
                }
              ].map((feature, idx) => (
                <Link 
                  key={idx} 
                  href={feature.link}
                  className={`p-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer 
                    ${isDarkMode 
                      ? 'bg-[#2A211F] hover:bg-[#3E2723] border border-[#5D4037]' 
                      : 'bg-[#EFEBE9] hover:bg-white shadow-md hover:shadow-lg'}`}
                >
                  <div className="flex justify-center mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-[#5D4037] dark:text-[#D7CCC8]">
                    {feature.title}
                  </h3>
                  <p className={isDarkMode ? 'text-[#BCAAA4]' : 'text-[#8D6E63]'}>
                    {feature.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DOCTORS */}
        <section id="doctors" className={`py-16 px-4 ${isDarkMode ? 'bg-[#1E1A18]' : 'bg-[#EFEBE9]'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#5D4037] dark:text-[#D7CCC8]">Our Expert Doctors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Dr. Sarah Anderson', 
                  specialty: 'Cardiologist', 
                  qualification: 'MD, Board Certified',
                  image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
                },
                { 
                  name: 'Dr. James Mitchell', 
                  specialty: 'Neurologist', 
                  qualification: 'MD, PhD, Specialist',
                  image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
                },
                { 
                  name: 'Dr. Emily Watson', 
                  specialty: 'Orthopedic Surgeon', 
                  qualification: 'MD, Fellowship Trained',
                  image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
                }
              ].map((doctor, idx) => (
                <div key={idx} className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-[#2A211F]' : 'bg-white'}`}>
                  <div className="w-full h-64 overflow-hidden">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                    <p className="text-[#8D6E63] dark:text-[#A1887F] font-semibold mb-2">{doctor.specialty}</p>
                    <p className={`${isDarkMode ? 'text-[#BCAAA4]' : 'text-[#8D6E63]'} mb-4`}>
                      {doctor.qualification}
                    </p>
                    <button className="w-full bg-[#8D6E63] hover:bg-[#795548] text-white py-2 rounded-lg transition-all font-semibold">
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#2A211F]' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-[#5D4037] dark:text-[#D7CCC8]">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-[#8D6E63] dark:text-[#BCAAA4]">
              Join thousands of users who trust Zenith for their healthcare needs.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-[#8D6E63] hover:bg-[#795548] text-white px-8 py-3 rounded-lg transition-all font-semibold shadow-lg hover:shadow-[#A1887F]/20"
            >
              Sign Up Now
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`py-8 px-4 text-center ${isDarkMode ? 'bg-[#1E1A18] text-[#D7CCC8]' : 'bg-[#5D4037] text-[#EFEBE9]'}`}>
          <p>&copy; 2025 Zenith Healthcare. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
