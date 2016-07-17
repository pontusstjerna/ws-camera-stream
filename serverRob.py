#Created by Pontus 17-07-16

import socket

s = socket.socket()

host = '192.168.25.115'
port = 50005
s.bind((host, port))

s.listen(5)
while True:
    client, addr = s.accept()
    print ('Got connection from', addr)
    #client.send('You are connected to RobotPi.')
    client.close()

    
