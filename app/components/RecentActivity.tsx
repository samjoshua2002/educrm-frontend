'use client';
import { Clock, Phone, CheckCircle, XCircle, User } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  roll_number: string;
  phone_number: string;
  status: string;
  created_at: string;
}

interface RecentActivityProps {
  leads: Lead[];
}

export function RecentActivity({ leads }: RecentActivityProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'contacted':
        return Phone;
      case 'converted':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return User;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'text-yellow-600 bg-yellow-50',
      contacted: 'text-blue-600 bg-blue-50',
      qualified: 'text-indigo-600 bg-indigo-50',
      converted: 'text-green-600 bg-green-50',
      rejected: 'text-red-600 bg-red-50',
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {leads.slice(0, 6).map((lead) => {
          const StatusIcon = getStatusIcon(lead.status);
          return (
            <div
              key={lead.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getStatusColor(lead.status)}`}>
                  <StatusIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.roll_number}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">{formatDate(lead.created_at)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}