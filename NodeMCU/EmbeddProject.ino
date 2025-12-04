#define RXD1 44
#define TXD1 43

#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "yoyok";
const char* password = "yooooooo9";

const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_client_id = "dormsense-embed12";

const char* topic_send = "dormsense/telemetry";
const char* topic_receive = "dormsense/cmd";

WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial1.begin(115200, SERIAL_8N1, RXD1, TXD1);
  Serial.println("\n\nDormSense NodeMCU Starting...");

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != 3) {
    delay(500);
    Serial.print(".");
    int s = WiFi.status();
    Serial.printf("WiFi.status() = %d\n", s);
  }
  Serial.println("\nWiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  mqtt.setServer(mqtt_server, mqtt_port);
  mqtt.setCallback(onReceiveCommand);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!mqtt.connected()) {
    reconnectMQTT();
  }
  mqtt.loop();

  if (Serial1.available()) {
    String jsonFromSTM32 = Serial1.readStringUntil('\n');
    jsonFromSTM32.trim();

    if (jsonFromSTM32.length() > 0) {
      Serial.print("📥 From STM32: ");
      Serial.println(jsonFromSTM32);

      if (mqtt.publish(topic_send, jsonFromSTM32.c_str())) {
        Serial.println("✅ Sent to Cloud");
      } else {
        Serial.println("❌ Send failed");
      }
    }
  }
}

void reconnectMQTT() {
  while (!mqtt.connected()) {
    Serial.print("Connecting to MQTT...");

    if (mqtt.connect(mqtt_client_id)) {
      Serial.println("Connected!");

      mqtt.subscribe(topic_receive);
      Serial.println("📡 Ready to receive commands");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(mqtt.state());
      Serial.println(" Retry in 5s...");
      delay(5000);
    }
  }
}

void onReceiveCommand(char* topic, byte* payload, unsigned int length) {
  Serial.print("📩 Command from Dashboard: ");

  String command = "";
  for (int i = 0; i < length; i++) {
    command += (char)payload[i];
  }
  Serial.println(command);

  Serial1.println(command);
}