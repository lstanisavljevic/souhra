const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 8081; //Port from environment variable or default - 8081
const endpoint = process.env.ENDPOINT;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser'); // import body parser (to use in req.body)
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express(); // Setting up express and adding socketIo middleware
app.use(helmet());
app.use(cors());

app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 100 requests per windowMs
});
//  apply to all requests
app.use(limiter);

const server = http.Server(app);
const io = socketIo(server);
const labelData = require('./data.json');

const _state = {
  allActiveUsers: [], // usernames which are currently connected to the chat
  rooms: {} // active rooms with active users
};

const { serverMessages, appStatus } = labelData;

// Start server listening on specified port
server.listen(port, endpoint, () => {
  console.log('Well done, now I am listening on ', server.address().port);
});
app.use(bodyParser.json()); // body parser to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// define directories which are exposed to web
app.use(express.static(`${__dirname}/node_modules`));
// serve files from the public build directory
const options = {
  setHeaders: function(res, path, stat) {
    res.set('Service-Worker-Allowed', '/');
  }
};
app.use(express.static(path.join(__dirname, 'client'), options));
app.use(express.static(path.join(__dirname, 'client/build'), options));

/* 
TODO FOR PWA, so https is not required in development
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true })); <==== Right here
  app.use(express.static(path.join(__dirname, 'client/build')));
 
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} */

app.get('/api/activeRooms/:roomName', (req, res) => {
  isRoomNameAvailable = io.sockets.adapter.rooms[req.params.roomName]
    ? false
    : true;
  const areNamesAvailable = {
    isRoomNameAvailable
  };
  res.send(areNamesAvailable);
});

app.get('/api/activeUsers/:roomName/:username', (req, res) => {
  const activeUsername = _state.allActiveUsers.map(user =>
    user.username.toLowerCase()
  );
  const areNamesAvailable = {
    isUsernameAvailable: !activeUsername.includes(
      req.params.username.toLowerCase()
    )
  };
  res.send(areNamesAvailable);
});

app.get('*', (req, res) => {
  console.log('get *: ' + __dirname);
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/service-worker.js', (req, res) => {
  console.log('get service worker : ' + __dirname);
  res.sendFile(path.resolve(__dirname, 'client/build', 'service-worker.js'));
});

// get minimal poker value
const getMinValue = data => {
  const minValue = Math.min(...data.map(item => item.pokerValue));
  return data.filter(item => Number(item.pokerValue) === minValue);
};

// get maximal poker value
const getMaxValue = data => {
  const maxValue = Math.max(...data.map(item => item.pokerValue));
  return data.filter(item => Number(item.pokerValue) === maxValue);
};

// get mode poker value
const getModeValue = data => {
  // get selected poker values
  const arr = data.map(item => item.pokerValue);

  // find mode value
  const mode = [...new Set(arr)]
    .map(value => [value, arr.filter(v => v === value).length])
    .sort((a, b) => b[1] - a[1])
    .filter((v, i, a) => v[1] === a[0][1])
    .map(v => v[0]);

  // return results that selected mode value
  const dataResult = data.filter(
    item => Number(item.pokerValue) === Number(mode)
  );
  return dataResult;
};

// calculate and return poker results
const calculatePokerWinners = data => {
  const filteredData = data
    .filter(item => item.pokerValue !== null)
    .filter(item => item.pokerValue !== '?');
  const minValue = getMinValue(filteredData);
  const modeValue = getModeValue(filteredData);
  const maxValue = getMaxValue(filteredData);
  let hideMode = false;
  if (modeValue.length > 0) {
    if (
      modeValue[0].pokerValue === minValue[0].pokerValue ||
      modeValue[0].pokerValue === maxValue[0].pokerValue
    ) {
      hideMode = true;
    }
  }
  return {
    minValue,
    modeValue,
    maxValue,
    hideMode
  };
};
// get list of users in a room
const getCurrentRoomUsers = (users, roomInfo) => {
  return Object.keys(roomInfo)
    .map(socketId => users.find(user => user.id === socketId))
    .filter(id => typeof id !== 'undefined');
};

// admin creates room
const createRoom = (admin, socket) => {
  // create a room
  socket.join(admin.roomName);
  // store the username and roomName in the socket session for this client
  socket.username = admin.username;
  socket.roomName = admin.roomName;
  socket.role = 'admin';
  console.info(`Admin connected ${admin.username}`);

  socket.emit(
    'user_connection_changed',
    serverMessages.waiting,
    appStatus.initial
  );
  if (_state.rooms[socket.roomName]) {
    io.sockets
      .in(socket.roomName)
      .emit('updateusers', _state.rooms[socket.roomName]);
  } else {
    _state.rooms[socket.roomName] = [];
  }
  //io.sockets.emit("room_created", {roomNames: Object.keys(_state.rooms)});
};

// listen to a namespace 'adduser' from client and manage connected users
const joinRoom = (user, socket) => {
  // join or create a room if a room with given name doesn't exist
  socket.join(user.roomName);
  // store the username and roomName in the socket session for this client
  socket.username = user.username;
  socket.roomName = user.roomName;
  const allUsersVoted = false;

  console.info(`New client connected ${user.username}`);
  // echo to client they've connected
  socket.emit(
    'user_connection_changed',
    `${serverMessages.connected} ${user.username}`,
    appStatus.activeUserChange,
    serverMessages.waiting,
    allUsersVoted
  );
  // echo globally (all clients) that a new user has connected
  socket.broadcast
    .to(socket.roomName)
    .emit(
      'user_connection_changed',
      `${user.username} has connected`,
      appStatus.activeUserChange,
      allUsersVoted
    );
  // add the client username to the global active users list
  _state.allActiveUsers.push(user);
  // add active users to a room
  _state.rooms[socket.roomName] = getCurrentRoomUsers(
    _state.allActiveUsers,
    io.sockets.adapter.rooms[socket.roomName].sockets
  );
  // update the list of users in chat, client-side
  io.sockets
    .in(socket.roomName)
    .emit('updateusers', _state.rooms[socket.roomName]);
};

// when the client emits 'poker', this listens and executes
const pokerSelected = (pokervalue, socket) => {
  console.log(socket.username);
  // store the pokervalue in the socket session for this client
  socket.pokervalue = pokervalue;
  // update poker value for a user in a room
  _state.rooms[socket.roomName].find(
    ({ username }) => username === socket.username
  ).pokerValue = pokervalue;
  // echo to client they've made a choice
  socket.emit('updatechat', `${pokerSelected} ${pokervalue}`, appStatus.voting);
  //emit that all users voted and results can be released
  if (checkIfAllUsersVoted(socket)) {
    socket.broadcast.to(socket.roomName).emit('all_users_voted', true);
  }

  io.sockets
    .in(socket.roomName)
    .emit('updateusers', _state.rooms[socket.roomName]);
};

// When user moves, this listens and executes
const userMoved = (position, socket) => {
  console.log(socket.username);
  // store the pokervalue in the socket session for this client
  socket.position = position;
  // update poker value for a user in a room
  _state.rooms[socket.roomName].find(
    ({ username }) => username === socket.username
  ).position = position;

  io.sockets
    .in(socket.roomName)
    .emit('updateusers', _state.rooms[socket.roomName]);
};

const checkIfAllUsersVoted = socket =>
  !_state.rooms[socket.roomName].some(u => u.pokerValue === null);

// when the 'server' client emits 'reset', reset all poker choices to empty
const resetPoker = socket => {
  // empty the pokervalues for users in a given roon
  _state.rooms[socket.roomName].map(user => (user.pokerValue = null));
  // Emit the reset choices command to users
  socket.broadcast.to(socket.roomName).emit('resetchoices');
  // Inform users about reset
  io.sockets
    .in(socket.roomName)
    .emit('updatechat', serverMessages.newRound, appStatus.voting);
  // Emit active users with reseted poker values
  io.sockets
    .in(socket.roomName)
    .emit('updateusers', _state.rooms[socket.roomName]);
};

// when the 'server' client emits 'release', Update the log with chosen poker values
const releaseResults = socket => {
  // Calculate and emit the poker results to all users
  const pokerResults = calculatePokerWinners(_state.rooms[socket.roomName]);
  io.sockets
    .in(socket.roomName)
    .emit(
      'releasechoices',
      pokerResults,
      serverMessages.discussion,
      appStatus.results
    );
};

// Listen to namespace 'disconnect' when a client disconnects
const disconnect = socket => {
  console.info(`Client disconnected: ${socket.username} ${socket.id}`);
  // remove the username from global usernames list
  _state.allActiveUsers = _state.allActiveUsers.filter(
    user => user.id !== socket.id
  );

  // update list of users in chat, client-side
  _state.rooms[socket.roomName] = io.sockets.adapter.rooms[socket.roomName]
    ? getCurrentRoomUsers(
        _state.allActiveUsers,
        io.sockets.adapter.rooms[socket.roomName].sockets
      )
    : [];

  if (socket.role === 'admin') {
    resetPoker(socket);
  }

  io.sockets
    .in(socket.roomName)
    .emit('updateusers', _state.rooms[socket.roomName]);

  // echo globally that this client has left
  socket.broadcast
    .to(socket.roomName)
    .emit(
      'user_connection_changed',
      `${socket.username} ${serverMessages.disconnected}`,
      appStatus.activeUserChange,
      checkIfAllUsersVoted(socket)
    );
};

// Setting up a new socket with the namespace 'connection'
io.on('connection', socket => {
  socket.on('createRoom', admin => createRoom(admin, socket));
  socket.on('joinRoom', user => joinRoom(user, socket));
  socket.on('poker', pokervalue => pokerSelected(pokervalue, socket));
  socket.on('move', position => userMoved(position, socket));
  socket.on('reset', () => resetPoker(socket));
  socket.on('release', () => releaseResults(socket));
  socket.on('disconnect', () => disconnect(socket));
});
