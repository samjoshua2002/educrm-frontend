'use client';
import { useState } from 'react';
import LeadCard from './LeadCard';

interface Lead {
  id: number;
  name: string;
  roll_number: string;
  phone_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface LeadTabsProps {
  leads: Lead[];
  selectedLeads: Set<number>;
  onLeadSelect: (leadId: number) => void;
  onStatusUpdate: (leadId: number, status: string) => void;
}

export default function LeadTabs({ leads, selectedLeads, onLeadSelect, onStatusUpdate }: LeadTabsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredLeads = leads.filter(lead => {
    if (activeTab === 'selected') {
      return selectedLeads.has(lead.id);
    }
    return true;
  });

  const selectedLeadsList = leads.filter(lead => selectedLeads.has(lead.id));

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All Students ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('selected')}
            className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
              activeTab === 'selected'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Selected ({selectedLeads.size})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'all' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">All Student Leads</h2>
              {selectedLeads.size > 0 && (
                <span className="text-sm text-blue-600 font-medium">
                  {selectedLeads.size} selected
                </span>
              )}
            </div>
            {leads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No student leads found.</p>
                <p className="text-gray-400 mt-2">Add some students to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {leads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={selectedLeads.has(lead.id)}
                    onSelect={() => onLeadSelect(lead.id)}
                    onStatusUpdate={onStatusUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'selected' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Selected Students</h2>
              {selectedLeads.size > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  {selectedLeads.size} students selected
                </span>
              )}
            </div>
            {selectedLeads.size === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No students selected.</p>
                <p className="text-gray-400 mt-2">Select students from the "All Students" tab to see them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedLeadsList.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={true}
                    onSelect={() => onLeadSelect(lead.id)}
                    onStatusUpdate={onStatusUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}