
# Client Server 

A simple chat example. 

## How to use

```
$ cd socket.io-cloud-examples
$ npm install
$ node bin/chat
```

And point your browser to `http://localhost:3001`. Optionally, specify
a port by supplying the `PORT` env variable.

The browser should load the socket.io script from the cloud server

----
$ <script src="http://localhost:3000/socket.io/socket.io.js"></script>
-----

Note: Cloud Server is running on port 3000 and the Client Server is running on 3001
## Features
General Features of the Chat
- Multiple users can join a chat room by each entering a unique username
on website load.
- Users can type chat messages to the chat room.
- A notification is sent to all users when a user joins or leaves
the chatroom.


Features of the Client Server
- This is responsible for initial commmunication with the client
- Any POST messages from the client are redirected to the Cloud Server ( part of the repository socket.io-cloud) 


