import WebSocket from 'ws';

export default (app, basePort) => {

    const WEBSOCKET_PORT = parseInt(basePort) + 2;

    const streamingSocketServer = new WebSocket.Server({port: WEBSOCKET_PORT, perMessageDeflate: false});
    streamingSocketServer.connectionCount = 0;
    streamingSocketServer.on('connection', (socket, upgradeReq) => {

        streamingSocketServer.connectionCount++;
        console.log(
            'Video listener connected: ',
            (upgradeReq || socket.upgradeReq).socket.remoteAddress,
            (upgradeReq || socket.upgradeReq).headers['user-agent'],
            '(' + streamingSocketServer.connectionCount + ' total)'
        );

        socket.on('close', () => {
            streamingSocketServer.connectionCount--;
            console.log('Video listener disconnected (' + streamingSocketServer.connectionCount +  ' total)');
        });
    });

    // Broadcast video stream
    streamingSocketServer.broadcast = function(data) {
        streamingSocketServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    // Receive local video stream
    app.use('/stream', (request, response) => {
        response.connection.setTimeout(0);
        console.log(
            'Local stream connected: ' +
            request.socket.remoteAddress + ':' +
            request.socket.remotePort
        );

        // Local stream of data is received, broadcast to all listeners
        request.on('data', data => {

            streamingSocketServer.broadcast(data);

            // Don't know that this does
            if (request.socket.recording) {
                request.socket.recording.write(data);
            }
        });

        request.on('end',() => {
            console.log('Local video stream closed');

            if (request.socket.recording) {
                request.socket.recording.close();
            }
        });
    });

    console.log('Listening for incoming MPEG-TS stream through websocket on localhost:' + basePort + '/stream');
    console.log('Awaiting video listeners on websocket connections on ws://localhost:' + WEBSOCKET_PORT);
}
