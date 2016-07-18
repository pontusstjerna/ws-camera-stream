using System;
using System.Collections.Generic;
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
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        Client client;

        public MainWindow()
        {
            InitializeComponent();
            client = new Client();
            textBlock.Text = client.Connect("81.170.164.163", 50005);

            System.Diagnostics.Trace.WriteLine("Test");
        }

        private void textBox_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            string recieved = client.Send(textBox.Text);

            textBlock.Text = recieved;
        }
    }
}
