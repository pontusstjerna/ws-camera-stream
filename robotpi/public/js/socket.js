function getAuthorizationHeader() {
    var user = $('#txtUsername').val();
    var password = $('#txtPassword').val();

    return btoa(user + ':' + password);
}

function connectIO() {
    var socket = io('http://localhost:8080', {
        transportOptions: {
            polling: {
              extraHeaders: {
                authorization: 'basic ' + getAuthorizationHeader()
              }
            }
          }
    });
    
    socket.on('unauthorized', function() {
        alert('Unauthorized!');
    });
    
    socket.emit('started');
    
    socket.on('started', function(started) {
        $('#txtStarted').text('The server was last started ' + started);
        $('#content-main').css('display', 'block');
        $('#content-auth').css('display', 'none');
    })
} 

function connectWS() {
    var user = $('#txtUsername').val();
    var password = $('#txtPassword').val();

    var url = 'ws://localhost:8082/?authorization=' + getAuthorizationHeader();
    var canvas = $('#video-canvas')[0];
    var player = new JSMpeg.Player(url, {canvas: canvas});
}