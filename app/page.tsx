'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [leadsCount, setLeadsCount] = useState(0);

  useEffect(() => {
    fetchLeadsCount();
  }, []);

  const fetchLeadsCount = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/leads');
      const leads = await response.json();
      setLeadsCount(leads.length);
    } catch (error) {
      console.error('Error fetching leads count:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to EduCRM
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your student leads effectively and efficiently
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get Started
            </h2>
            <p className="text-gray-600 mb-6">
              Currently managing <span className="font-bold text-blue-600">{leadsCount}</span> student leads
            </p>
            <Link 
              href="/leads" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Manage Leads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}