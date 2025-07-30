import React from 'react';

interface PopupContentProps {
  title: string;
  description: string;
  features?: string[];
  status?: {
    label: string;
    value: string;
    type?: 'success' | 'warning' | 'error' | 'info';
  };
  loading?: boolean;
  error?: string | null;
}

export const PopupContent: React.FC<PopupContentProps> = ({
  title,
  description,
  features = [],
  status,
  loading = false,
  error
}) => {
  if (loading) {
    return (
      <div className="easy-popup-content">
        <div className="animate-pulse">
          <div className="mb-4 h-6 bg-gray-200 rounded"></div>
          <div className="mb-2 h-4 bg-gray-200 rounded"></div>
          <div className="mb-2 h-4 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="easy-popup-content">
        <h2 className="text-red-600">Error</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="easy-popup-content">
      <h2>{title}</h2>
      <p>{description}</p>
      
      {features.length > 0 && (
        <div style={{marginTop: '20px'}}>
          <h3>Features:</h3>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
      {status && (
        <div style={{
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: getStatusColor(status.type),
          borderRadius: '5px'
        }}>
          <strong>{status.label}:</strong> {status.value}
        </div>
      )}
    </div>
  );
};

const getStatusColor = (type?: string) => {
  switch (type) {
    case 'success':
      return '#d4edda';
    case 'warning':
      return '#fff3cd';
    case 'error':
      return '#f8d7da';
    case 'info':
      return '#d1ecf1';
    default:
      return '#f5f5f5';
  }
}; 