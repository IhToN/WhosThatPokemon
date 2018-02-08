var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const pokemon = require('pokemon');

app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});*/

var userslist = [];
/*
  {
    uuid: '0000-0000-0000',
    name: 'Username',
    color: '#FFFFFF',
    avatar: 'http://...'
  }
*/
var matches = [];
/*
  {
    timeCreated: 115354351,
    round: 1,
    pokemonid: 15,
    users: [
      {
        uuid: '0000-0000-0000',
        name: 'Username',
        color: '#FFFFFF',
        avatar: 'http://...',
        points: 0
      }
    ]
  }
*/


io.on('connection', function (socket) {

  socket.on('new-user', function (userdata) {
      console.log('User connected', userdata);
      if (!userdata) return;
      if (userdata.hasOwnProperty('uuid') && userdata.hasOwnProperty('name')
        && userdata.hasOwnProperty('color') && userdata.hasOwnProperty('avatar')) {
        userslist.push(userdata);
        io.emit('user-connected', userdata);
        io.emit('users-list', userslist);

        /* User Connected on Global Room*/
        socket.on('chat-message', function (msg) {
          console.log('Message received', msg);
          if (msg.length > 0) {
            io.emit('chat-message', {user: userdata, message: msg});
          }
        });

        socket.on('join-room', function (roomid) {
          var room = io.sockets.in(roomid);
          socket.join(roomid);

          console.log(userdata.name, 'connected to room', roomid);


          let curmatch = matches[roomid];
          if (!curmatch) {
            userdata.points = 0;
            curmatch = {
              timeCreated: Date.now(),
              round: 1,
              pokemonid: Math.floor(Math.random() * pokemon.all().length) + 1,
              users: [userdata]
            };
            matches[roomid] = curmatch;
          } else {
            if (!userinmatch(userdata, curmatch)) {
              userdata.points = 0;
              curmatch.users.push(userdata);
            }
          }

          console.log(curmatch);

          io.to(roomid).emit('user-joined-game', userdata);
          io.to(roomid).emit('match-data', curmatch);

          socket.on('room-chat-message', function (data) {
            console.log('Message received', data.message);
            io.to(data.room).emit('room-chat-message', data)
          });
        });

        /* User Disconnects */
        socket.on('disconnect', function () {
          userslist = userslist.filter(user => user.uuid !== userdata.uuid);

          console.log('Limpiando partidas');
          matches.forEach((match, roomid) => {
            match.users = match.users.filter(user => user.uuid !== userdata.uuid);
            io.to(roomid).emit('match-data', match);
          });

          io.emit('user-disconnected', userdata);
          io.emit('users-list', userslist);
        });
      }
    }
  );
});

function userinmatch(user, match) {
  for (let muser of match.users) {
    if (user.uuid === muser.uuid) {
      return true;
    }
  }
  return false;
}

http.listen(port, function () {
  console.log('listening on *:' + port);
});
