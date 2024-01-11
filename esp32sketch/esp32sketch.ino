#include "config.h"
#include <ArduinoWebsockets.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>

using namespace websockets;

/*
  LCD.SDA -> ESP32.SDA ( 21 )
  LCD.SCL -> ESP32.SCL ( 22 )
*/

/* Constants */
const int BAUD_RATE = 115200;
const String HOST = "ws://192.168.1.7:8080/api/v1/products/sockets";
const String PRODUCT_ID = "pid-1";
const int TIMEOUT = 2000;

/* Global Variables */
LiquidCrystal_I2C lcd(0x27, 16, 2);
WebsocketsClient client;

/* Function Prototypes */
void connectClient();
void onMessageCallback(WebsocketsMessage message);
void onEventsCallback(WebsocketsEvent event, String data);

void setup() {
  Serial.begin(BAUD_RATE);
  while (!Serial)
    ;
  delay(3000);

  Serial.println("init app");

  lcd.init();
  lcd.clear();
  lcd.backlight(); // Make sure backlight is on
  lcd.setCursor(1, 0);
  lcd.print("Initializing...");

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

  lcd.clear();
  lcd.setCursor(2, 0);

  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);

  client.addHeader("product_id", PRODUCT_ID);
  connectClient();
  client.send("Hi Server!");
  client.ping();
}

void loop() { client.poll(); }

void connectClient() {
  delay(TIMEOUT);
  Serial.println("Connecting to the client...");
  bool status = client.connect(HOST);
  if (!status) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Connecting...");
    connectClient();
  } else {
    lcd.clear();
    lcd.setCursor(2, 0);
    lcd.print("Connected...");
  }
}

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
