#include <MFRC522.h>
#include <SPI.h>

/*
    RFID.RST = 4
    RFID.SCK = 18
    RFID.MISO = 19
    RFID.SDA = 21
    RFID.MOSI = 23
*/

#define RST_PIN 4
#define SS_PIN 5
#define BAUD_RATE 115200

MFRC522 rfid(SS_PIN, RST_PIN); // Create MFRC522 instance
void printDec(byte *buffer, byte bufferSize);

void setup() {
  Serial.begin(BAUD_RATE); // Initialize serial communications with the PC
  while (!Serial)
    ; // Do nothing if no serial port is opened (added for Arduinos based on
      // ATMEGA32U4)
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
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    delay(10);
    if (cardStartTime == 0)
      return;
    unsigned long currTime = millis();
    unsigned long timeSinceLastRead = currTime - lastReadTime;
    if (timeSinceLastRead > 50) {
      // means that we have been here since quite a while since the last read,
      // and it means that our card has probably been left.
      unsigned long totalTime = currTime - cardStartTime;
      Serial.print("Stayed for ");
      Serial.println(totalTime);
      cardStartTime = 0;
    }
    return;
  }
  if (cardStartTime == 0) {
    cardStartTime = millis();
    Serial.print("UID: ");
    printDec(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
  }
  lastReadTime = millis();
}

void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : "");
    Serial.print(buffer[i], DEC);
  }
}
