$(function() {
  function addSimpleMessage (data) {
      $('ul').append("<li>" + data + "</li>");
  }

  // Socket events

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    //addChatMessage(data);
    console.log("new message is:" + data); 	  
    addSimpleMessage(data);
  });
});
