'use client';

interface StatusDistributionProps {
  data: { status: string; count: number; percentage: number; color: string }[];
}

export function StatusDistribution({ data }: StatusDistributionProps) {
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-500',
      contacted: 'bg-blue-500',
      qualified: 'bg-indigo-500',
      converted: 'bg-green-500',
      rejected: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: 'Pending',
      contacted: 'Contacted',
      qualified: 'Qualified',
      converted: 'Converted',
      rejected: 'Rejected',
    };
    return labels[status] || status;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Status Distribution</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {getStatusLabel(item.status)}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">{item.count} leads</span>
              <span className="text-sm font-semibold text-gray-800 w-12 text-right">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex space-x-1">
        {data.map((item, index) => (
          <div
            key={index}
            className={`h-2 rounded-full ${getStatusColor(item.status)} transition-all duration-500`}
            style={{ width: `${item.percentage}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}