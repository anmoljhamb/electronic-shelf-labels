#include "config.h"
#include <ArduinoWebsockets.h>
#include <WiFi.h>

using namespace websockets;

WebsocketsClient client;
String host = "ws://192.168.1.7:8080/api/v1/products/sockets";
String PRODUCT_ID = "pid-1";
int TIMEOUT = 2000;

void onMessageCallback(WebsocketsMessage message);
void onEventsCallback(WebsocketsEvent event, String data);
void connectClient();

void setup() {
  Serial.begin(115200);
  while (!Serial)
    ;
  delay(2000);

  Serial.println();
  Serial.println("******************************************************");
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);

  client.addHeader("product_id", PRODUCT_ID);
  connectClient();
  client.send("Hi Server!");
  client.ping();
}

void loop() { client.poll(); }

void onMessageCallback(WebsocketsMessage message) {
  Serial.print("Got Message: ");
  Serial.println(message.data());
}

void onEventsCallback(WebsocketsEvent event, String data) {
  if (event == WebsocketsEvent::ConnectionOpened) {
    Serial.println("Connnection Opened");
  } else if (event == WebsocketsEvent::ConnectionClosed) {
    Serial.print("Connnection Closed. Retring in ");
    Serial.println(TIMEOUT);
    delay(TIMEOUT);
    connectClient();
  } else if (event == WebsocketsEvent::GotPing) {
    Serial.println("Got a Ping!");
  } else if (event == WebsocketsEvent::GotPong) {
    Serial.println("Got a Pong!");
  }
}

void connectClient() {
  delay(TIMEOUT);
  Serial.println("Connecting to the client...");
  bool status = client.connect(host);
  if (!status)
    connectClient();
}
