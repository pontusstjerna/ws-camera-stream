npm start
avconv -s 320x240 -f video4linux2 -i /dev/video0 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 1000k -r 24 http://192.168.0.209:8080/stream