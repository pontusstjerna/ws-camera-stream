var socket = io();

socket.emit('started');

socket.on('started', started => $('#txtStarted').text('The server was last started ' + started));

var url = 'ws://' + document.location.hostname + ':8082/';
var canvas = $('#video-canvas')[0];
var player = new JSMpeg.Player(url, {canvas: canvas});