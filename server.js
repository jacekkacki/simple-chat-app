const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const messages = [];
let users = [];

app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('join', (name) => {
    console.log('Join new user ' + name);
    const user = {name: name, id: socket.id};
    users.push(user);
    socket.broadcast.emit('join', name);
  });

  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left')
    const removeUser = users.find(user => user.id === socket.id);
    users.splice(removeUser, 1);
    socket.broadcast.emit('leave', removeUser.name);
    console.log(users);
});

  console.log('I\'ve added a listener on message and disconnect events \n');
});
