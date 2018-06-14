import WebSocket from 'ws';

export default (app, basePort) => {

    const WEBSOCKET_PORT = basePort + 2;

    const socketServer = new WebSocket.Server({port: WEBSOCKET_PORT, perMessageDeflate: false});
    socketServer.connectionCount = 0;
    socketServer.on('connection', (socket, upgradeReq) => {
        socketServer.connectionCount++;
        console.log(
            'New WebSocket Connection: ', 
            (upgradeReq || socket.upgradeReq).socket.remoteAddress,
            (upgradeReq || socket.upgradeReq).headers['user-agent'],
            '('+socketServer.connectionCount+' total)'
        );
        socket.on('close', function(code, message){
            socketServer.connectionCount--;
            console.log(
                'Disconnected WebSocket (' + socketServer.connectionCount+  ' total)'
            );
        });
    });

    socketServer.broadcast = function(data) {
        socketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    app.use('/stream', (request, response) => {
        response.connection.setTimeout(0);
        console.log(
            'Stream Connected: ' + 
            request.socket.remoteAddress + ':' +
            request.socket.remotePort
        );
        request.on('data', function(data){
            socketServer.broadcast(data);
            if (request.socket.recording) {
                request.socket.recording.write(data);
            }
        });
        request.on('end',function(){
            console.log('close');
            if (request.socket.recording) {
                request.socket.recording.close();
            }
        });
    });

    console.log('Listening for incomming MPEG-TS Stream on http://127.0.0.1:' + basePort + '/stream');
    console.log('Awaiting WebSocket connections on ws://127.0.0.1:' + WEBSOCKET_PORT);
}