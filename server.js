const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

//serve the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, + 'public/index.html'));
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('listening on port 3000...');
});

const io = require('socket.io').listen(server);

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  socket.on('message', (message) => {
    console.log('message: ' + message);
    //broadcast message to everyone
    io.emit('message', message);
  });
});