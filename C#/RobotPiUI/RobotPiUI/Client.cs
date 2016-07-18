using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace RobotPiUI
{
    class Client{

        Socket s;
        byte[] bytes;

        public bool Connect(String ip, int port){
            bytes = new byte[1024];
            IPAddress address = new IPAddress(Encoding.ASCII.GetBytes(ip));
            IPEndPoint endPoint = new IPEndPoint(address, port);

            try {
                s = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

                s.Connect(endPoint);
                //Send "connected"
                return true;
            }
            catch (Exception e){
                return false;
            }
        }

        public string Send(string message)
        {
            if(s != null)
            {
                //Encode to byte array
                byte[] msg = Encoding.ASCII.GetBytes(message);

                //Send through socket
                s.Send(msg);

                //The recieved bytes
                int recievedBytes = s.Receive(bytes);

                return Encoding.ASCII.GetString(bytes, 0, recievedBytes);
            }
            else
            {
                return "Not connected to anything!";
            }
        }

        public void Close()
        {
            s.Shutdown(SocketShutdown.Both);
            s.Close();
        }

    }
}
