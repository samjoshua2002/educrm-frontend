'use client';
import { useState } from 'react';

interface Lead {
  id: number;
  name: string;
  roll_number: string;
  phone_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface LeadCardProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: () => void;
  onStatusUpdate: (leadId: number, status: string) => void;
}

const statusColors: { [key: string]: string } = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  contacted: 'bg-blue-100 text-blue-800 border-blue-200',
  qualified: 'bg-green-100 text-green-800 border-green-200',
  converted: 'bg-purple-100 text-purple-800 border-purple-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
};

const statusLabels: { [key: string]: string } = {
  pending: 'Pending',
  contacted: 'Contacted',
  qualified: 'Qualified',
  converted: 'Converted',
  rejected: 'Rejected',
};

export default function LeadCard({ lead, isSelected, onSelect, onStatusUpdate }: LeadCardProps) {
  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const statuses = ['pending', 'contacted', 'qualified', 'converted', 'rejected'];
    const currentIndex = statuses.indexOf(lead.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    onStatusUpdate(lead.id, nextStatus);
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
          : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      {/* Selection Indicator */}
      <div className="flex justify-between items-start mb-3">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300'
          }`}
        >
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        
        {/* Status Badge - Click to cycle through statuses */}
        <button
          onClick={handleStatusClick}
          className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status] || statusColors.pending} hover:opacity-80 transition-opacity`}
        >
          {statusLabels[lead.status] || lead.status}
        </button>
      </div>

      {/* Student Info */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-gray-800 truncate">{lead.name}</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">Roll No:</span>
            <span className="ml-1 font-semibold">{lead.roll_number}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">Phone:</span>
            <span className="ml-1 font-semibold">{lead.phone_number}</span>
          </div>
        </div>
      </div>

      {/* Click instruction */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Click status to cycle • Click card to select
      </div>
    </div>
  );
}