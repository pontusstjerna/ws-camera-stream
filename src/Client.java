import java.io.IOException;
import java.net.Socket;

/**
 * Created by Pontus on 2016-07-17.
 */
public class Client implements Runnable {

    private Socket s;

    public static void main(String[] args){
        new Thread(new Client(args[0], Integer.valueOf(args[1]))).run();
    }

    public Client(String ip, int port){
        try{
            s = new Socket(ip, port);
        }catch(IOException e){
            System.out.println("Failed to connect to " + ip + ":" + port);
        }

    }

    @Override
    public void run() {

    }
}
