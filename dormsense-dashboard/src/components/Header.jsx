import React from 'react';

const Header = ({ isConnected }) => {
  return (
    <header className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h1 className="text-4xl font-bold text-primary text-center mb-2">
        🏠 DormSense Dashboard
      </h1>
      <p className="text-gray-600 text-center text-lg mb-4">
        Real-time Room Monitoring System
      </p>
      <div className="flex justify-center">
        <span className={`
          px-6 py-2 rounded-full font-semibold text-sm
          ${isConnected 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
          }
        `}>
          {isConnected ? '✅ Connected' : '⚠️ Disconnected'}
        </span>
      </div>
    </header>
  );
};

export default Header;