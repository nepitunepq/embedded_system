import React, { useState, useEffect } from 'react';
import { useMQTT } from './hooks/useMQTT';
import { DEFAULT_THRESHOLDS } from './config/mqtt';
import Header from './components/Header';
import SensorCard from './components/SensorCard';
import AlertBox from './components/AlertBox';
import ControlPanel from './components/ControlPanel';
import LogPanel from './components/LogPanel';

function App() {
  const { isConnected, sensorData, logs, sendCommand } = useMQTT();
  const [thresholds, setThresholds] = useState(DEFAULT_THRESHOLDS);
  const [lastUpdate, setLastUpdate] = useState('--');

  // Update timestamp when data changes
  useEffect(() => {
    if (sensorData.temperature > 0 || sensorData.humidity > 0 || sensorData.lux > 0) {
      setLastUpdate(`Updated: ${new Date().toLocaleTimeString('th-TH')}`);
    }
  }, [sensorData]);

  const handleMute = () => {
    const success = sendCommand({ mute: 1 });
    if (!success) {
      alert('Not connected to NETPIE!');
    }
  };

  const handleUpdateThresholds = (newThresholds) => {
    setThresholds(newThresholds);
    const success = sendCommand({
      temp_threshold: newThresholds.temperature,
      humid_threshold: newThresholds.humidity,
      lux_threshold: newThresholds.lux
    });
    
    if (success) {
      alert('Thresholds updated successfully!');
    } else {
      alert('Not connected to NETPIE!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header isConnected={isConnected} />

        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SensorCard
            icon="🌡️"
            title="Temperature"
            value={sensorData.temperature.toFixed(1)}
            unit="°C"
            lastUpdate={lastUpdate}
          />
          <SensorCard
            icon="💧"
            title="Humidity"
            value={sensorData.humidity.toFixed(1)}
            unit="%"
            lastUpdate={lastUpdate}
          />
          <SensorCard
            icon="💡"
            title="Light Level"
            value={sensorData.lux}
            unit="lux"
            lastUpdate={lastUpdate}
          />
        </div>

        {/* Alert Box */}
        <AlertBox
          alert={sensorData.alert}
          onMute={handleMute}
          thresholds={thresholds}
          sensorData={sensorData}
        />

        {/* Control Panel */}
        <ControlPanel onUpdateThresholds={handleUpdateThresholds} />

        {/* Log Panel */}
        <LogPanel logs={logs} />
      </div>
    </div>
  );
}

export default App;