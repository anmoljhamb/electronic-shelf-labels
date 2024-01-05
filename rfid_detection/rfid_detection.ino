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

MFRC522 rfid(SS_PIN, RST_PIN); // Create MFRC522 instance
void printDec(byte *buffer, byte bufferSize);

void core1() {
  /*
    code for the core which will focus on the RFID sensor, and the LCD
    1. See if a card is present or not.
    2. if it's present, trigger an interrupt, and start the timer, or basically
       keep a count, init the start time
    3. Then, constantly check for a loop, and check if the the same card was
    still present or not.
    4. also add debouncing, along with it. an interval of 100ms, works
    5. the moment it becomes false, the while condition, we check the current
    time using millis, and we find out the total duration for which the card was
    held
    6. Add a time out of 4s, if it's any longer than that, we're good, and we
    can just say no, and exit out.
    7. Based on durations, decide an action, and show progress, and send request
       to backend.
    8. That will be handled by another core.
  */
}

void setup() {
  Serial.begin(9600); // Initialize serial communications with the PC
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

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) {
    return;
  }

  if (!rfid.PICC_ReadCardSerial()) {
    return;
  }

  printDec(rfid.uid.uidByte, rfid.uid.size);
  Serial.println();
}

void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : "");
    Serial.print(buffer[i], DEC);
  }
}
