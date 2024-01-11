#include <LiquidCrystal_I2C.h>

/*
  LCD.SDA -> ESP32.SDA ( 21 )
  LCD.SCL -> ESP32.SCL ( 22 )
*/

/* Constants */ 
const int BAUD_RATE = 115200;

/* Global Variables */
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(BAUD_RATE);
  while(!Serial);
  delay(3000);

  Serial.println("init app");
  
  lcd.init();
  lcd.clear();
  lcd.backlight(); // Make sure backlight is on
  lcd.setCursor(1, 0);
  lcd.print("Initializing...");
}

void loop() {
}
