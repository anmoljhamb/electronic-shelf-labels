#include "config.h"
#include <ArduinoWebsockets.h>
#include <LiquidCrystal_I2C.h>
#include <MFRC522.h>
#include <SPI.h>
#include <WiFi.h>

using namespace websockets;

class Response {
private:
  bool status;
  unsigned int duration;
  String uid;

public:
  Response(bool s, unsigned int d = 0, String u = "") {
    this->status = s;
    this->duration = d;
    this->uid = u;
  }

  bool getStatus() { return this->status; }
  unsigned int getDuration() { return this->duration; }
  String getUid() { return this->uid; }
};

/*
  RFID.RST -> ESP32.D4
  RFID.SDA -> ESP32.D5
  RFID.SCK -> ESP32.D18
  RFID.MOSI -> ESP32.D19
  LCD.SDA -> ESP32.SDA ( 21 )
  LCD.SCL -> ESP32.SCL ( 22 )
  RFID.MISO -> ESP32.D23
*/

/* Constants */
const int BAUD_RATE = 115200;
const String HOST = "ws://192.168.1.7:8080/api/v1/products/sockets";
const String PRODUCT_ID = "pid-1";
const int TIMEOUT = 2000;
const byte RST_PIN = 4;
const byte SS_PIN = 5;

/* Global Variables */
LiquidCrystal_I2C lcd(0x27, 16, 2);
WebsocketsClient client;
MFRC522 rfid(SS_PIN, RST_PIN); // Create MFRC522 instance

/* Prototypes */
void connectClient();
void onMessageCallback(WebsocketsMessage message);
void onEventsCallback(WebsocketsEvent event, String data);
String getUid(byte *buffer, byte bufferSize);
unsigned long lastReadTime = 0;
unsigned long cardStartTime = 0;
Response getRfidResponse();

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

  delay(3000);
  SPI.begin();     // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522
  delay(4); // Optional delay. Some board do need more time after init to be
            // ready, see Readme
  rfid.PCD_DumpVersionToSerial(); // Show details of PCD - MFRC522 Card
                                  // Reader details
  Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}

void loop() {
  client.poll();
  Response resp = getRfidResponse();
  if (resp.getStatus()) {
    Serial.print("UID:");
    Serial.print(resp.getUid());
    Serial.print(" stayed for ");
    Serial.println(resp.getDuration());
  }
}

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

String getUid(byte *buffer, byte bufferSize) {
  String uid = "";
  for (byte i = 0; i < bufferSize; i++) {
    uid += String(buffer[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}

Response getRfidResponse() {
  String uid;
  while (true) {
    if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
      delay(10);
      if (cardStartTime == 0) {
        // this part happens when nothing is going on
        // Serial.println("happens when nothing is going on");
        delay(50);
        return Response(false);
      }
      unsigned long currTime = millis();
      unsigned long timeSinceLastRead = currTime - lastReadTime;
      if (timeSinceLastRead > 50) {
        // means that we have been here since quite a while since the last read,
        // and it means that our card has probably been left.
        // ending our function
        unsigned long totalTime = currTime - cardStartTime;
        cardStartTime = 0;
        return Response(true, totalTime, uid);
      }
      return Response(false);
    }
    if (cardStartTime == 0) {
      cardStartTime = millis();
      // happens when the card is bought near for the first time;
      uid = getUid(rfid.uid.uidByte, rfid.uid.size);
      Serial.println("Started detecting RFID");
    }
    lastReadTime = millis();
  }
  return Response(false);
};
