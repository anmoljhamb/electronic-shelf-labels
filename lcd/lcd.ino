#include <LiquidCrystal_I2C.h>
#include <Wire.h>

/*
  LCD.SDA -> ESP32.SDA ( 21 )
  LCD.SCL -> ESP32.SCL ( 22 )
*/

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(115200);
  delay(3000);

  while (!Serial) {
  }

  Serial.println();
  Serial.println("I2C scanner. Scanning ...");
  byte count = 0;

  Wire.begin();
  for (byte i = 8; i < 120; i++) {
    Wire.beginTransmission(i);
    if (Wire.endTransmission() == 0) {
      Serial.print("Found address: ");
      Serial.print(i, DEC);
      Serial.print(" (0x");
      Serial.print(i, HEX);
      Serial.println(")");
      count++;
      delay(1); // maybe unneeded?
    }           // end of good response
  }             // end of for loop
  Serial.println("Done.");
  Serial.print("Found ");
  Serial.print(count, DEC);
  Serial.println(" device(s).");

  lcd.init();
  lcd.clear();
  lcd.backlight(); // Make sure backlight is on

  // Print a message on both lines of the LCD.
  lcd.setCursor(2, 0); // Set cursor to character 2 on line 0
  lcd.print("Hello world!");

  lcd.setCursor(2, 1); // Move cursor to character 2 on line 1
  lcd.print("LCD Tutorial");
}

void loop() { lcd.backlight(); }
