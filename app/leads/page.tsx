'use client';
import { useState, useEffect } from 'react';
import LeadTabs from '../components/LeadTabs';
import Navigation from '../components/Navigation';
import AddLeadForm from '../components/AddLeadForm';

interface Lead {
  id: number;
  name: string;
  roll_number: string;
  phone_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());

  // Load selected leads from localStorage on component mount
  useEffect(() => {
    const savedSelectedLeads = localStorage.getItem('selectedLeads');
    if (savedSelectedLeads) {
      try {
        const parsed = JSON.parse(savedSelectedLeads);
        setSelectedLeads(new Set(parsed));
      } catch (error) {
        console.error('Error loading selected leads from localStorage:', error);
      }
    }
  }, []);

  // Save selected leads to localStorage whenever they change
  useEffect(() => {
    if (selectedLeads.size > 0 || localStorage.getItem('selectedLeads')) {
      localStorage.setItem('selectedLeads', JSON.stringify(Array.from(selectedLeads)));
    }
  }, [selectedLeads]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/leads');
      const data = await response.json();
      setLeads(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const toggleLeadSelection = (leadId: number) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const updateLeadStatus = async (leadId: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:5050/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchLeads(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  // Clear all selected leads
  const clearSelectedLeads = () => {
    setSelectedLeads(new Set());
    localStorage.removeItem('selectedLeads');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Student Leads Management</h1>
          <AddLeadForm onLeadAdded={fetchLeads} />
        </div>
        
        {/* Selected Leads Actions */}
        {selectedLeads.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-blue-800 font-medium">
                {selectedLeads.size} student{selectedLeads.size > 1 ? 's' : ''} selected
              </span>
              <button
                onClick={clearSelectedLeads}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        <LeadTabs 
          leads={leads}
          selectedLeads={selectedLeads}
          onLeadSelect={toggleLeadSelection}
          onStatusUpdate={updateLeadStatus}
        />
      </div>
    </div>
  );
}