#Made by Pontus 2016-07-07

import L298NHBridge as HBridge
import sys, tty, termios, os

def getch():
    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)
    try:
        tty.setraw(sys.stdin.fileno())
        ch = sys.stdin.read(1)
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
    return ch

def run():
    pwr = 1
    
    key = getch()

    while key != "m":
        if key == "w":
            HBridge.setMotorRight(pwr)
            HBridge.setMotorLeft(pwr)
        elif key == "e":
            HBridge.setMotorRight(pwr)
            HBridge.setMotorLeft(-pwr)
        elif key == "q":
            HBridge.setMotorLeft(pwr)
            HBridge.setMotorRight(-pwr)
        elif key == "d":
            HBridge.setMotorRight(pwr)
            HBridge.setMotorLeft(pwr*0.1)
        elif key == "a":
            HBridge.setMotorLeft(pwr)
            HBridge.setMotorRight(pwr*0.1)
        elif key == "+" and pwr < 1:
            pwr += 0.1
            print(pwr)
        elif key == "-" and pwr > -1:
            pwr -= 0.1
            print(pwr)
        elif key == "r":
            pwr = -pwr
            print("Reversed.")
        else:
            HBridge.setMotorRight(0)
            HBridge.setMotorLeft(0)

        key = getch()

print("Welcome to RobotPi control program made by Pontus!\nChoices: \n")
print("1. Start the robot.")
print("2. Switch the usb power off")
print("3. Switch the usb power on")
print("0. Quit the program.")

uInput = int(input(":> "))

while(uInput != 0):
    if uInput == 1:
        print("Starting robot. Controls are: ")
        print("w - Forward\ns - Stop\nd - Right\na - Left\nr - Reverse")
        print("q - Sharp left turn\ne - Sharp right turn")
        print("+ - Increase speed\n- - Decrease speed\nm - Main menu")
        run()
    elif uInput == 2:
        os.system("sudo ./hub-ctrl -h 0 -P 2 -p 0")
    elif uInput == 3:
        os.system("sudo ./hub-ctrl -h 0 -P 2 -p 1")

    print("\n\nMain menu\nChoices: \n")
    print("1. Start the robot.")
    print("2. Switch the usb power off")
    print("3. Switch the usb power on")
    print("0. Quit the program.")

    uInput = int(input(":> "))
            

HBridge.exit()
