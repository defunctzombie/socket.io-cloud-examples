$(function() {
  function addSimpleMessage (data) {
      $('ul').append("<li>" + data + "</li>");
  }

  // Socket events

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    //addChatMessage(data);
    addSimpleMessage(data);
  });
});
