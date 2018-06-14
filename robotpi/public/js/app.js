var socket = io();

socket.emit('started');

socket.on('started', started => $('#txtStarted').text('The server was last started ' + started));

$('#btnForward').click(function() {
    forward();
});

$('#btnBackward').click(function() {
    backward();
});

$('#btnLeft').click(function() {
    left();
});

$('#btnRight').click(function() {
    right();
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            left();
        break;

        case 38: // up
            forward();
        break;

        case 39: // right
            right();
        break;

        case 40: // down
            backward();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

function forward() {
    socket.emit('forward');
}

function backward() {
    socket.emit('backward');
}

function left() {
    socket.emit('left');
}

function right() {
    socket.emit('right');
}