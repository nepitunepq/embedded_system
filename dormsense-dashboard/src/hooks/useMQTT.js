import { useState, useEffect, useCallback } from 'react';
import mqtt from 'mqtt';
import { MQTT_CONFIG } from '../config/mqtt';  // ← เปลี่ยนตรงนี้

export const useMQTT = () => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    lux: 0,
    alert: 0
  });
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message, isAlert = false) => {
    const timestamp = new Date().toLocaleTimeString('th-TH');
    setLogs(prev => [{
      timestamp,
      message,
      isAlert
    }, ...prev].slice(0, 20));
  }, []);

  useEffect(() => {
    // สร้าง connection URL
    const connectUrl = `${MQTT_CONFIG.protocol}://${MQTT_CONFIG.broker}:${MQTT_CONFIG.port}/mqtt`;
    
    const options = {
      clientId: MQTT_CONFIG.clientId,
      clean: true,
      reconnectPeriod: 5000,
    };

    // เพิ่ม username/password ถ้ามี
    if (MQTT_CONFIG.username) {
      options.username = MQTT_CONFIG.username;
      options.password = MQTT_CONFIG.password;
    }

    console.log('🔌 Connecting to MQTT Broker:', connectUrl);
    const mqttClient = mqtt.connect(connectUrl, options);

    mqttClient.on('connect', () => {
      console.log('✅ Connected to MQTT Broker');
      setIsConnected(true);
      
      // Subscribe to data topic
      mqttClient.subscribe(MQTT_CONFIG.topics.data, (err) => {
        if (!err) {
          console.log('📡 Subscribed to:', MQTT_CONFIG.topics.data);
          addLog('System connected successfully');
        } else {
          console.error('❌ Subscribe error:', err);
          addLog('Failed to subscribe: ' + err.message, true);
        }
      });
    });

    mqttClient.on('error', (err) => {
      console.error('❌ MQTT Error:', err);
      addLog(`Connection error: ${err.message}`, true);
    });

    mqttClient.on('reconnect', () => {
      console.log('🔄 Reconnecting...');
      setIsConnected(false);
      addLog('Reconnecting to broker...');
    });

    mqttClient.on('offline', () => {
      console.warn('📴 Offline');
      setIsConnected(false);
      addLog('Broker offline', true);
    });

    mqttClient.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('📩 Received:', data);
        
        setSensorData({
          temperature: data.t || data.temperature || 0,
          humidity: data.h || data.humidity || 0,
          lux: data.lux || data.light || 0,
          alert: data.alert || 0
        });

        if (data.alert === 1) {
          addLog('⚠️ ALERT: Threshold exceeded!', true);
        }
      } catch (error) {
        console.error('❌ Parse error:', error);
        addLog('Failed to parse message', true);
      }
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [addLog]);

  const sendCommand = useCallback((command) => {
    if (client && isConnected) {
      const message = JSON.stringify(command);
      client.publish(MQTT_CONFIG.topics.control, message);
      console.log('📤 Sent to', MQTT_CONFIG.topics.control, ':', message);
      addLog(`Command sent: ${JSON.stringify(command)}`);
      return true;
    } else {
      console.warn('⚠️ Not connected to broker');
      return false;
    }
  }, [client, isConnected, addLog]);

  return {
    isConnected,
    sensorData,
    logs,
    sendCommand,
  };
};