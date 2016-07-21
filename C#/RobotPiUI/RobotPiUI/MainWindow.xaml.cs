using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace RobotPiUI
{
    /// <summary>
    /// Interaction logic for CustomCommands.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        Client client;

        public MainWindow()
        {
            InitializeComponent();

           // System.Diagnostics.Trace.WriteLine("Test");
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            string recieved = client.Send(textBox.Text);

            console.Text = recieved;

            CheckLeds();
        }

        private void Connect_Click(object sender, RoutedEventArgs e)
        {
            client = new Client();
            console.Text = client.Connect(IpAddress.Text, int.Parse(Port.Text));
            CheckLeds();
        }

        private void Disconnect_Click(object sender, RoutedEventArgs e)
        {
            console.Text = client.Send("quit");
            CheckLeds();
            client.Close();
        }

        private void CheckLeds()
        {
            //Is connected
            if (client != null && client.IsConnected())
            {
                RedLed.Fill = new SolidColorBrush(System.Windows.Media.Colors.DarkRed);
                GreenLed.Fill = new SolidColorBrush(System.Windows.Media.Colors.LightGreen);
            }else
            {
                RedLed.Fill = new SolidColorBrush(System.Windows.Media.Colors.Red);
                GreenLed.Fill = new SolidColorBrush(System.Windows.Media.Colors.DarkGreen);
            }
        }

        private void Window_Closing(object sender, CancelEventArgs e)
        {
            if(client != null)
            {
                client.Send("quit");
                client.Close();
            }
        }
    }
}
