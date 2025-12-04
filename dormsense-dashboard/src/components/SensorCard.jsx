import React from 'react';

const SensorCard = ({ icon, title, value, unit, lastUpdate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform">
      <div className="text-5xl mb-3 text-center">
        {icon}
      </div>
      <h3 className="text-gray-700 text-lg font-semibold text-center mb-4">
        {title}
      </h3>
      <div className="text-5xl font-bold text-primary text-center mb-2">
        {value}
      </div>
      <div className="text-gray-500 text-xl text-center mb-3">
        {unit}
      </div>
      <div className="text-gray-400 text-xs text-center">
        {lastUpdate}
      </div>
    </div>
  );
};

export default SensorCard;