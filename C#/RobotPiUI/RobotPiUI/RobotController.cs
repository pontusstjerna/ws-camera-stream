using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Input;
using System.Threading.Tasks;

namespace RobotPiUI
{
    class RobotController
    {
        HashSet<Key> keyPresses;
        Client client;

        float pwr = 1;

        public RobotController(Client client)
        {
            keyPresses = new HashSet<Key>();
            this.client = client;
        }

        public void AddKeyDown(Key key)
        {
            if (!keyPresses.Contains(key))
            {
                keyPresses.Add(key);

                ChangeRobotState();
            }
        }

        public void AddKeyUp(Key key)
        {
            keyPresses.Remove(key);
            ChangeRobotState();
        }

        //Main controller
        private void ChangeRobotState()
        {
            switch (keyPresses.Count)
            {
                case 0:
                    SetMotorLeft(0);
                    SetMotorRight(0);
                    break;
                case 1:
                    switch (keyPresses.First())
                    {
                        case Key.Up:
                            SetMotorLeft(pwr);
                            SetMotorRight(pwr);
                            break;
                        case Key.Down:
                            SetMotorLeft(-pwr);
                            SetMotorRight(-pwr);
                            break;
                        case Key.Left:
                            SetMotorLeft(pwr);
                            SetMotorRight(-pwr);
                            break;
                        case Key.Right:
                            SetMotorLeft(-pwr);
                            SetMotorRight(pwr);
                            break;
                    }
                    break;
            }
        }

        private void SetMotorLeft(float pwr)
        {
            client.Send("HBridge.setMotorLeft(" + pwr + ")");
        }

        private void SetMotorRight(float pwr)
        {
            client.Send("HBridge.setMotorRight(" + pwr + ")");
        }
    }
}
