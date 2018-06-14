import sys
import time

print('I really like juice');

inp = ''

while inp != 'quit':
    for line in sys.stdin:
        print(line)
        sys.stdout.flush()
        inp = line
        time.sleep(1)


