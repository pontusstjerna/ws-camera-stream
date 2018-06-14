import sys
import L298NHBridge.py as HBridge

print('Python controller ready.')

inp = ""

while inp != 'quit':
    for line in sys.stdin:
        try:
            eval(inp)
        except Exception:
            pass
        if(inp != 'quit'):
            print('Received: ' + inp)

print('User quit')
HBridge.exit()