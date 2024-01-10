#include <MFRC522.h>
#include <SPI.h>

/*
    RFID.RST = 4
    RFID.MOSI = 5
    RFID.SCK = 18
    RFID.MISO = 19
    RFID.SDA = 21
*/

#define RST_PIN 4
#define SS_PIN 5
#define BAUD_RATE 115200

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

MFRC522 rfid(SS_PIN, RST_PIN); // Create MFRC522 instance
void printDec(byte *buffer, byte bufferSize);

void setup() {
  Serial.begin(BAUD_RATE); // Initialize serial communications with the PC
  while (!Serial)
    ; // Do nothing if no serial port is opened (added for Arduinos based on
      // ATMEGA32U4)
  delay(3000);
  SPI.begin();     // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522
  delay(4); // Optional delay. Some board do need more time after init to be
            // ready, see Readme
  rfid.PCD_DumpVersionToSerial(); // Show details of PCD - MFRC522 Card
                                  // Reader details
  Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}

unsigned long lastReadTime = 0;
unsigned long cardStartTime = 0;

void loop() {
  Response resp = printDuration();
  if (resp.getStatus()) {
    Serial.print("UID:");
    Serial.print(resp.getUid());
    Serial.print(" stayed for ");
    Serial.println(resp.getDuration());
  }
}

Response printDuration() {
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
}

String getUid(byte *buffer, byte bufferSize) {
  String uid = "";
  for (byte i = 0; i < bufferSize; i++) {
    uid += String(buffer[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}

void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : "");
    Serial.print(buffer[i], DEC);
  }
}
