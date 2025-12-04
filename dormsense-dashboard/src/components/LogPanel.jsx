import React from 'react';

const LogPanel = ({ logs }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">
        📋 Recent Logs
      </h2>
      
      <div className="max-h-96 overflow-y-auto space-y-2">
        {logs.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            Waiting for data...
          </p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg border-l-4
                ${log.isAlert 
                  ? 'bg-red-50 border-red-500' 
                  : 'bg-gray-50 border-primary'
                }
              `}
            >
              <div className="text-xs text-gray-500 mb-1">
                {log.timestamp}
              </div>
              <div className="text-gray-800">
                {log.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogPanel;