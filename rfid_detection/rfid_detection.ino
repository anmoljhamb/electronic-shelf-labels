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
#define SS_PIN 21

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

void setup() {
  Serial.begin(9600); // Initialize serial communications with the PC
  while (!Serial)
    ; // Do nothing if no serial port is opened (added for Arduinos based on
      // ATMEGA32U4)
  SPI.begin();        // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522
  delay(4); // Optional delay. Some board do need more time after init to be
            // ready, see Readme
  mfrc522.PCD_DumpVersionToSerial(); // Show details of PCD - MFRC522 Card
                                     // Reader details
  Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
}
