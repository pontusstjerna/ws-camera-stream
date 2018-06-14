import sys
import time
import L298NHBridge as HBridge

print('Python controller ready.')

inp = ""

while inp != 'quit':
    for line in sys.stdin:
        inp = line
        try:
            eval(inp)
        except Exception, err:
            print('Unable to execute')
            print Exception, err
            pass
        if(inp != 'quit'):
            print('Received: ' + inp)
            sys.stdout.flush()
        time.sleep(1)

print('User quit')
HBridge.exit()
