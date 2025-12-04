import React from 'react';

const AlertBox = ({ alert, onMute, thresholds, sensorData }) => {
  if (alert === 0) return null;

  const reasons = [];
  if (sensorData.temperature > thresholds.temperature) {
    reasons.push('High Temperature');
  }
  if (sensorData.humidity > thresholds.humidity) {
    reasons.push('High Humidity');
  }
  if (sensorData.lux < thresholds.lux) {
    reasons.push('Low Light');
  }

  const alertMessage = reasons.length 
    ? `⚠️ Alert: ${reasons.join(', ')}` 
    : '⚠️ Alert: Threshold Exceeded';

  return (
    <div className="bg-red-100 border-2 border-red-500 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
      <div className="flex items-center mb-4 md:mb-0">
        <span className="text-4xl mr-4">⚠️</span>
        <span className="text-xl font-bold text-gray-800">
          {alertMessage}
        </span>
      </div>
      <button
        onClick={onMute}
        className="bg-primary hover:bg-secondary text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        🔇 Mute Buzzer
      </button>
    </div>
  );
};

export default AlertBox;