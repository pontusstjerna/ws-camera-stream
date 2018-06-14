import sys
import time

print('I really like juice');

inp = ''

while inp != 'quit':
    inp = sys.stdin.readline()
    inp = inp.split('\n')[0]
    print(inp)
    sys.stdout.flush()
    time.sleep(1)


