// MQTT Configuration - ตรงกับ NodeMCU Code
export const MQTT_CONFIG = {
  // HiveMQ Public Broker
  broker: 'broker.hivemq.com',
  port: 8000,                    // WebSocket port สำหรับ browser (ไม่ใช่ 1883)
  protocol: 'ws',                // WebSocket
  
  // Client ID (จะสุ่มให้อัตโนมัติ)
  clientId: 'dormsense-dashboard-' + Math.random().toString(16).substr(2, 8),
  
  // ไม่ต้องใช้ username/password (HiveMQ Public ไม่ต้องการ)
  
  // Topics ต้องตรงกับ NodeMCU
  topics: {
    data: 'dormsense/telemetry',  
    control: 'dormsense/cmd'        
  }
};

export const DEFAULT_THRESHOLDS = {
  temperature: 30,
  humidity: 70,
  lux: 200
};