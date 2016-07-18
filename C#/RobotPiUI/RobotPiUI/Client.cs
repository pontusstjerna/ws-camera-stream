using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace RobotPiUI
{
    class Client{

        Socket s;
        byte[] bytes;

        public string Connect(String ip, int port){
            bytes = new byte[1024];

            try {
                IPAddress address = IPAddress.Parse(ip);
                IPEndPoint endPoint = new IPEndPoint(address, port);
                s = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

                s.Connect(endPoint);
                return Send("User connected.") + Recieve();

            }catch(ArgumentException ae)
            {
                return "Oops! Invalid IP.";
            }
            catch(SocketException se)
            {
                return "Could not create socket.";
            }
            catch(Exception e)
            {
                return "Oops! Could not connect for some weird reason.";
            }
        }

        public string Send(string message)
        {
            if(s != null)
            {
                //Encode to byte array
                byte[] msg = Encoding.ASCII.GetBytes(message);

                try
                {
                    //Send through socket
                    s.Send(msg);

                    return Recieve();
                }
                catch(Exception e)
                {
                    return "Unable to send. You probably lost connection.";
                }
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

        private string Recieve()
        {
            try
            {
                //The recieved bytes
                int recievedBytes = s.Receive(bytes);

                return Encoding.ASCII.GetString(bytes, 0, recievedBytes);
            }
            catch (Exception e)
            {
                return "Nothing to recieve!";
            }
        }

    }
}
