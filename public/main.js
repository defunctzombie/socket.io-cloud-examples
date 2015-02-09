// read application config from config script tag
var APP = JSON.parse($('#config').text());

// setup socket.io connection for our specific app
var socket = io(APP.SOCKET_URL + '/messages');

// Whenever the server emits 'new message', update the chat body
socket.on('new message', function (data) {
  console.log("new chat message is:" + data);
  addSimpleMessage(data);
});

function addSimpleMessage (data) {
    $('ul').append("<li>" + data + "</li>");
}
