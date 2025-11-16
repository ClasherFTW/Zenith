'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/lib/theme-context';

interface Prescription {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  status: 'active' | 'completed';
}

export default function PrescriptionsPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [showModal, setShowModal] = useState(false);
  const [newPrescription, setNewPrescription] = useState({ name: '', dosage: '', frequency: '' });

  useEffect(() => {
    const saved = localStorage.getItem('prescriptions');
    if (saved) {
      setPrescriptions(JSON.parse(saved));
    } else {
      const defaults: Prescription[] = [
        { id: 1, name: 'Aspirin', dosage: '500mg', frequency: 'Twice daily', status: 'active' },
        { id: 2, name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', status: 'active' }
      ];
      setPrescriptions(defaults);
      localStorage.setItem('prescriptions', JSON.stringify(defaults));
    }
  }, []);

  const handleAddPrescription = () => {
    if (newPrescription.name && newPrescription.dosage && newPrescription.frequency) {
      const prescription: Prescription = {
        id: Date.now(),
        name: newPrescription.name,
        dosage: newPrescription.dosage,
        frequency: newPrescription.frequency,
        status: 'active'
      };
      const updated = [...prescriptions, prescription];
      setPrescriptions(updated);
      localStorage.setItem('prescriptions', JSON.stringify(updated));
      setNewPrescription({ name: '', dosage: '', frequency: '' });
      setShowModal(false);
    }
  };

  const handleRefill = (id: number) => {
    const updated = prescriptions.map(p =>
      p.id === id ? { ...p, status: 'completed' as const } : p
    );
    setPrescriptions(updated);
    localStorage.setItem('prescriptions', JSON.stringify(updated));
  };

  const filteredPrescriptions = prescriptions.filter(p => p.status === activeTab);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex justify-between items-center`}>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Prescriptions</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all"
            >
              + Add Prescription
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            {(['active', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-all capitalize ${activeTab === tab ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredPrescriptions.map(rx => (
              <div key={rx.id} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {rx.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Dosage: {rx.dosage} | Frequency: {rx.frequency}
                    </p>
                  </div>
                  {activeTab === 'active' && (
                    <button
                      onClick={() => handleRefill(rx.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                    >
                      Request Refill
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredPrescriptions.length === 0 && (
              <div className={`text-center p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No {activeTab} prescriptions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg w-96 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add Prescription</h3>
            <input
              type="text"
              placeholder="Medication name"
              value={newPrescription.name}
              onChange={(e) => setNewPrescription({ ...newPrescription, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 500mg)"
              value={newPrescription.dosage}
              onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="Frequency (e.g., Twice daily)"
              value={newPrescription.frequency}
              onChange={(e) => setNewPrescription({ ...newPrescription, frequency: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddPrescription}
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
