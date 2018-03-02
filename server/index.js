const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const _ = require('lodash');
const config = require('./config');


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const routes = require('./routes');
app.use('/', routes);

const allPokemons = config.pokeList;
const wtpsound = 'assets/mp3/wtpsound.mp3';
const opsongs = ['assets/mp3/op_theme.mp3', 'assets/mp3/op_bluered.mp3'];

var pokemons = [];

getPokeName = (id) => {
  const name = pokemons[id - 1];
  if (!name) {
    throw new Error(`Pokémon with ID '${id}' does not exist.`);
  }
  return name;
};

getPokeId = (name) => {
  const index = pokemons.findIndex(pokemon => name.toLowerCase() === pokemon.toLowerCase());
  if (index === -1) {
    throw new Error(`Pokémon with name '${name}' does not exist.`);
  }
  return index + 1;
};


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
        socket.emit('op-song', getRandOpSong());

        /* User Connected on Global Room*/
        socket.on('chat-message', function (msgdata) {
          console.log('Message received', msgdata);
          if (msgdata.message.length > 0) {
            io.emit('chat-message', msgdata);
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
          socket.emit('wtp-sound', wtpsound);

          socket.on('room-chat-message', function (data) {
            if (!_.isEqual(curmatch, matches[joindata.roomid])) {
              curmatch = matches[joindata.roomid];
            }
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
                let pokeid = getPokeId(data.message.trim());
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

              curmatch.users = curmatch.users.filter(user => user.uuid !== userdata.uuid);
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
            socket.emit('wtp-sound', wtpsound);
          });
        });

        socket.on('update-users-list', function () {
          io.emit('users-list', userslist)
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
  return Math.floor(Math.random() * pokemons.length) + 1;
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
  if (pokeid !== curmatch.pokemonid && pokeid === 25) {
    tempuser.pikachus += 1;
  }
  curmatch.round += 1;
  curmatch.pokemonid = choosePokemon();

  console.log('Winner elegido');

  setTimeout(() => {
    io.to(roomid).emit('match-data', curmatch);
  }, 3000);
}

function getRandOpSong() {
  return opsongs[Math.floor(Math.random() * opsongs.length)];
}

/* MongoDB */
const mongoose = require('mongoose');
const dbURI = config.dbURI;

const Schema = mongoose.Schema;

const refreshPokemons = false;

const Pokemon = require('./models/pokemon');
const User = require('./models/user');

mongoose.connect(dbURI);
var dbcon = mongoose.connection;

dbcon.on('error', console.error.bind(console, 'connection error:'));
dbcon.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);

  dbcon.db.collection('pokemons').count(function (err, count) {
    if (count === 0) {
      console.log("No pokemons found.");
      fillPokemonsCollection();
    }
    else {
      console.log("Pokemons found:", count);
      if (refreshPokemons) {
        dbcon.db.collection('pokemons').remove({});
        fillPokemonsCollection();
      }
    }
    loadPokemons();
  });
});

function fillPokemonsCollection() {
  let gen = 1;
  for (let i = 0; i < allPokemons.length; i++) {
    if (i === 151) {
      gen = 2;
    } else if (i === 251) {
      gen = 3
    } else if (i === 386) {
      gen = 4
    } else if (i === 493) {
      gen = 5;
    } else if (i === 649) {
      gen = 6;
    } else if (i === 721) {
      gen = 7;
    }
    const newpok = new Pokemon({id: i + 1, name: allPokemons[i], generation: gen});
    newpok.save().then(/*() => console.log('Pokemon guardado:', newpok)*/);
  }
}

function loadPokemons(...generations) {
  if (generations.length <= 0) {
    generations = [1, 2, 3, 4, 5, 6, 7]
  }
  let cursor = Pokemon.find({generation: generations}).cursor();
  cursor.on('data', function (pokedata) {
    pokemons[pokedata.id - 1] = pokedata.name;
  });
  cursor.on('close', function () {
    console.log('Pokemons from generations', generations, 'loaded:', pokemons.length);
  });
}

http.listen(port, function () {
  console.log('Listening on *:' + port);
});
