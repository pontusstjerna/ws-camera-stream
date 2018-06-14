import sys
import time
import L298NHBridge as HBridge

print('Python controller ready.')

inp = ""

while inp != 'quit':
    inp = sys.stdin.readline().split('\n')[0]
    if (inp != 'quit'):
        print ('py: ' + inp)
        sys.stdout.flush()

        try:
            eval(inp)
        except Exception, err:
            print('Unable to execute')
            print Exception, err
            pass

print('User quit')
HBridge.exit()
