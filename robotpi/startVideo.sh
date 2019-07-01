avconv -s 640x480 -f video4linux2 -i /dev/video0 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 1000k -r 30 http://localhost:4000/stream
