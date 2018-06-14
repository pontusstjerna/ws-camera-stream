var socket = io();

socket.emit('started');

socket.on('started', started => $('#txtStarted').text('The server was last started ' + started));

var url = 'ws://' + document.location.hostname + ':8082/';
var canvas = document.getElementById('videoCanvas');
var player = new JSMpeg.Player(url, {canvas: canvas});

const input = {
    'up': false,
    'down': false,
    'left': false,
    'right': false
};

$('#btnForward').bind('touchstart mousedown', function() {
    forward();
});

$('#btnBackward').bind('touchstart mousedown', function() {
    reverse();
    forward();
});

$('#btnLeft').bind('touchstart mousedown', function() {
    left();
});

$('#btnRight').bind('touchstart mousedown', function() {
    right();
});

$('#btnRotLeft').bind('touchstart mousedown', function() {
    rotLeft();
});

$('#btnRotRight').bind('touchstart mousedown', function() {
    rotRight();
});

$('#btnBackward').bind('touchend mouseup', function() {
    stop();
    reverse();
});

$('#btnForward, #btnLeft, #btnRight, #btnRotLeft, #btnRotRight').bind('touchend mouseup', function() {
    stop();
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            if (!input['left']) {
                input['left'] = true;
                
                if (input['up']) {
                    left();
                } else if (input['down']) {
                    right();
                } else {
                    rotLeft();
                }
            }
        break;

        case 38: // up
            if (!input['up']) {
                input['up'] = true;

                if (input['left']) {
                    left();
                } else if (input['right']) {
                    right();
                } else {
                    forward();
                }
            }
        break;

        case 39: // right
        if (!input['right']) {
            input['right'] = true;
            
            if (input['up']) {
                right();
            } else if (input['down']) {
                left();
            } else {
                rotRight();
            }
        }
        break;

        case 40: // down
        if (!input['down']) {
            input['down'] = true;

            reverse();

            if (input['left']) {
                right();
            } else if (input['right']) {
                left();
            } else {
                forward();
            }
        }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).keyup(function(e) {
    switch(e.which) {
        case 37: // left
            input['left'] = false;
            
            if (input['up'] || input['down']) {
                forward();
            } else {
                stop();
            }
        break;

        case 38: // up
            input['up'] = false;

            if (input['left']) {
                rotLeft();
            } else if (input['right']) {
                rotRight();
            } else {
                stop();
            }

        break;

        case 39: // right
            input['right'] = false;
            
            if (input['up'] || input['down']) {
                forward();
            } else {
                stop();
            }
        break;

        case 40: // down
        input['down'] = false;
        reverse();

        if (input['left']) {
            rotRight();
        } else if (input['right']) {
            rotLeft();
        } else {
            stop();
        }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

function forward() {
    socket.emit('forward');
}

function reverse() {
    socket.emit('reverse');
}

function left() {
    socket.emit('left');
}

function right() {
    socket.emit('right');
}

function rotLeft() {
    socket.emit('rotLeft');
}

function rotRight() {
    socket.emit('rotRight');
}

function stop() {
    socket.emit('stop');
}