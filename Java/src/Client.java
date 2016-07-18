import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Scanner;

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
        try{
            //Catch user input
            Scanner localInScanner = new Scanner(System.in);

            //Catch the output from the client
            PrintWriter outWriter = new PrintWriter(s.getOutputStream());

            //First, send the username
            outWriter.println("User connected at " + new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime()));
            outWriter.flush();

            //Start a listener thread
            new Thread(){
                @Override
                public void run(){
                    try{
                        //Catch the input from the socket with the scanner
                        Scanner inScanner = new Scanner(s.getInputStream());

                        boolean running = true;

                        while(running){
                            if(inScanner.hasNext()){

                                //The input from the server to the client
                                String input = inScanner.nextLine();

                                if(input == "quit"){
                                    running = false;
                                }

                                //Print the input received
                                System.out.println(input);

                            }else{ //If there is no input means we are disconnected
                                running = false;
                            }
                        }
                    }catch(IOException e){
                        System.out.println("Unable to read any input from server!");
                    }
                }
            }.start();

            boolean running = true;

            //Read inputs from local user
            while(running){
                // System.out.print(userName + ": ");

                String localInput = localInScanner.nextLine();

                if(localInput.equals("quit")){
                    running = false;
                }

                outWriter.println(localInput);
                outWriter.flush();
            }

        }catch(IOException e){
            System.out.println("Ooops! Could not read or write for this reason: ");
            e.printStackTrace();
        }
    }
}
