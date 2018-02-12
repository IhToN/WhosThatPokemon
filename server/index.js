var express = require('express');
var path = require('path');
var formidable = require("formidable");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const pokemon = require('pokemon');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/upload', function (req, res) {
  let form = new formidable.IncomingForm();


  form.parse(req);

  form.on('fileBegin', function (name, file) {
    var fileType = file.type.split('/').pop();
    if (fileType === 'jpg' || fileType === 'png' || fileType === 'jpeg' || fileType === 'gif') {
      file.path = path.join(__dirname, 'public', 'uploads', file.name);

      form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
      });
    } else {
      res.end();
    }
  });
});


var userslist = [];
/*
  {
    uuid: '0000-0000-0000',
    name: 'Username',
    color: '#FFFFFF',
    avatar: 'http://...',
    ingame: false
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
        userdata.ingame = false;
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

        socket.on('join-room', function (joindata) {
          socket.join(joindata.roomid);

          console.log(userdata.name, 'connected to room', joindata.roomid);
          userdata.ingame = true;


          let curmatch = matches[joindata.roomid];
          if (!curmatch || joindata.restart) {
            userdata.points = 0;
            userdata.pikachus = 0;
            curmatch = {
              timeCreated: Date.now(),
              round: 1,
              pokemonid: choosePokemon(),
              users: [userdata]
            };
            matches[joindata.roomid] = curmatch;
          } else {
            if (!getUserInMatch(userdata, curmatch)) {
              userdata.points = 0;
              userdata.pikachus = 0;
              curmatch.users.push(userdata);
            }
          }

          io.to(joindata.roomid).emit('user-joined-game', userdata);
          io.to(joindata.roomid).emit('match-data', curmatch);

          socket.on('room-chat-message', function (data) {
            if (curmatch.users.length < 2) {
              io.to(data.room).emit('room-chat-message', {
                user: {name: 'Sistema', color: 'red'},
                message: 'Tenéis que ser dos jugadores o más, aprovecha para recordar qué pokemon es.'
              });
              return;
            }
            console.log(data.user.name, 'send a message to room', data.room, ':', data.message);
            if (countWords(data.message) > 1) {
              io.to(data.room).emit('room-chat-message', data)
            } else {
              try {
                let pokeid = pokemon.getId(data.message, 'en');
                let tempuser = getUserInMatch(data.user, curmatch);

                if (pokeid === curmatch.pokemonid) {
                  console.log(data.user.name, 'found the pokemon!', data.message);

                  winner(tempuser, data.room, curmatch, pokeid, 5);
                } else if (data.message.toLowerCase() === 'pikachu' && tempuser.pikachus < 2) {
                  console.log(data.user.name, 'es una madre!', data.message);

                  winner(tempuser, data.room, curmatch, 25, 1);
                } else {
                  console.log(tempuser);
                  io.to(data.room).emit('room-chat-message', data);
                }

              } catch (err) {
                console.log(err);
                io.to(data.room).emit('room-chat-message', data);
              }
            }
          });

          socket.on('leave-room', function (roomid) {
            socket.leave(roomid, (data) => {
              userdata.ingame = false;

              console.log('User leaved the room');

              curmatch.users = match.users.filter(user => user.uuid !== userdata.uuid);
              io.to(roomid).emit('user-leaved-game', userdata);
            });
          });

          socket.on('restart-room', function (notused) {
            curmatch.users.forEach(user => {
              user.points = 0;
              user.pikachus = 0;
            });
            newmatch = {
              timeCreated: Date.now(),
              round: 1,
              pokemonid: choosePokemon(),
              users: curmatch.users
            };
            matches[joindata.roomid] = newmatch;
            curmatch = newmatch;
            io.to(joindata.roomid).emit('match-data', curmatch);
          });
        });

        /* User Disconnects */
        socket.on('disconnect', function () {
          userslist = userslist.filter(user => user.uuid !== userdata.uuid);

          console.log('Limpiando partidas');
          matches.forEach((match, roomid) => {
            match.users = match.users.filter(user => user.uuid !== userdata.uuid);
            match.users.filter(user => user.uuid === userdata.uuid).forEach(user => user.ingame = false);
            io.to(roomid).emit('match-data', match);
          });

          io.emit('user-disconnected', userdata);
          io.emit('users-list', userslist);
        });
      }
    }
  );
});

function choosePokemon() {
  return Math.floor(Math.random() * pokemon.all().length) + 1;
}

function getUserInMatch(user, match) {
  for (let muser of match.users) {
    if (user.uuid === muser.uuid) {
      return muser;
    }
  }
  return false;
}

function countWords(s) {
  s = s.replace(/(^\s*)|(\s*$)/gi, "");//exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi, " ");//2 or more space to 1
  s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
  return s.split(' ').length;
}

function winner(tempuser, roomid, curmatch, pokeid, points = 5) {
  io.to(roomid).emit('pokemon-found', {user: tempuser, pokemon: pokeid});
  if (tempuser) {
    tempuser.points += points;
  }
  if (pokeid) {
    tempuser.pikachus += 1;
  }
  curmatch.round += 1;
  curmatch.pokemonid = choosePokemon();

  console.log('Winner elegido');

  setTimeout(() => {
    io.to(roomid).emit('match-data', curmatch);
  }, 3000);
}

http.listen(port, function () {
  console.log('listening on *:' + port);
});
