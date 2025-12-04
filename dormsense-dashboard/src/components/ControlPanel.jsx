import React, { useState } from 'react';
import { DEFAULT_THRESHOLDS } from '../config/mqtt';

const ControlPanel = ({ onUpdateThresholds }) => {
  const [thresholds, setThresholds] = useState(DEFAULT_THRESHOLDS);

  const handleChange = (key, value) => {
    setThresholds(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  };

  const handleUpdate = () => {
    onUpdateThresholds(thresholds);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-primary mb-6">
        ⚙️ Control Panel
      </h2>
      
      <div className="space-y-6">
        {/* Temperature Threshold */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Temperature Threshold (°C):
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={thresholds.temperature}
              onChange={(e) => handleChange('temperature', e.target.value)}
              min="20"
              max="40"
              step="0.5"
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
            <span className="text-2xl font-bold text-primary w-16 text-center">
              {thresholds.temperature}
            </span>
          </div>
        </div>

        {/* Humidity Threshold */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Humidity Threshold (%):
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={thresholds.humidity}
              onChange={(e) => handleChange('humidity', e.target.value)}
              min="40"
              max="90"
              step="5"
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
            <span className="text-2xl font-bold text-primary w-16 text-center">
              {thresholds.humidity}
            </span>
          </div>
        </div>

        {/* Light Threshold */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Light Threshold (lux):
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={thresholds.lux}
              onChange={(e) => handleChange('lux', e.target.value)}
              min="0"
              max="1000"
              step="50"
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
            <span className="text-2xl font-bold text-primary w-16 text-center">
              {thresholds.lux}
            </span>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Update Thresholds
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;