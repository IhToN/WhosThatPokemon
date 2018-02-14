var express = require('express');
var path = require('path');
var formidable = require("formidable");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const pokemon = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle',
  'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata',
  'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina',
  'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff',
  'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth',
  'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra',
  'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel',
  'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch’d', 'Doduo',
  'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno',
  'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung',
  'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu',
  'Starmie', 'Mr.Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto',
  'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno',
  'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew', 'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava',
  'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Spinarak',
  'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic', 'Natu', 'Xatu', 'Mareep', 'Flaaffy',
  'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern',
  'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking', 'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig',
  'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross',
  'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 'Remoraid', 'Octillery', 'Delibird',
  'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue',
  'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar',
  'Lugia', 'Ho-Oh', 'Celebi', 'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert',
  'Poochyena', 'Mightyena', 'Zigzagoon', 'Linoone', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Lotad', 'Lombre',
  'Ludicolo', 'Seedot', 'Nuzleaf', 'Shiftry', 'Taillow', 'Swellow', 'Wingull', 'Pelipper', 'Ralts', 'Kirlia', 'Gardevoir', 'Surskit',
  'Masquerain', 'Shroomish', 'Breloom', 'Slakoth', 'Vigoroth', 'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Whismur', 'Loudred',
  'Exploud', 'Makuhita', 'Hariyama', 'Azurill', 'Nosepass', 'Skitty', 'Delcatty', 'Sableye', 'Mawile', 'Aron', 'Lairon', 'Aggron',
  'Meditite', 'Medicham', 'Electrike', 'Manectric', 'Plusle', 'Minun', 'Volbeat', 'Illumise', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha',
  'Sharpedo', 'Wailmer', 'Wailord', 'Numel', 'Camerupt', 'Torkoal', 'Spoink', 'Grumpig', 'Spinda', 'Trapinch', 'Vibrava', 'Flygon',
  'Cacnea', 'Cacturne', 'Swablu', 'Altaria', 'Zangoose', 'Seviper', 'Lunatone', 'Solrock', 'Barboach', 'Whiscash', 'Corphish',
  'Crawdaunt', 'Baltoy', 'Claydol', 'Lileep', 'Cradily', 'Anorith', 'Armaldo', 'Feebas', 'Milotic', 'Castform', 'Kecleon', 'Shuppet',
  'Banette', 'Duskull', 'Dusclops', 'Tropius', 'Chimecho', 'Absol', 'Wynaut', 'Snorunt', 'Glalie', 'Spheal', 'Sealeo', 'Walrein',
  'Clamperl', 'Huntail', 'Gorebyss', 'Relicanth', 'Luvdisc', 'Bagon', 'Shelgon', 'Salamence', 'Beldum', 'Metang', 'Metagross',
  'Regirock', 'Regice', 'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys', 'Turtwig', 'Grotle',
  'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor', 'Bidoof',
  'Bibarel', 'Kricketot', 'Kricketune', 'Shinx', 'Luxio', 'Luxray', 'Budew', 'Roserade', 'Cranidos', 'Rampardos', 'Shieldon',
  'Bastiodon', 'Burmy', 'Wormadam', 'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel', 'Floatzel', 'Cherubi', 'Cherrim',
  'Shellos', 'Gastrodon', 'Ambipom', 'Drifloon', 'Drifblim', 'Buneary', 'Lopunny', 'Mismagius', 'Honchkrow', 'Glameow', 'Purugly',
  'Chingling', 'Stunky', 'Skuntank', 'Bronzor', 'Bronzong', 'Bonsly', 'Mime Jr.', 'Happiny', 'Chatot', 'Spiritomb', 'Gible', 'Gabite',
  'Garchomp', 'Munchlax', 'Riolu', 'Lucario', 'Hippopotas', 'Hippowdon', 'Skorupi', 'Drapion', 'Croagunk', 'Toxicroak', 'Carnivine',
  'Finneon', 'Lumineon', 'Mantyke', 'Snover', 'Abomasnow', 'Weavile', 'Magnezone', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire',
  'Magmortar', 'Togekiss', 'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine', 'Porygon-Z', 'Gallade', 'Probopass', 'Dusknoir',
  'Froslass', 'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia', 'Phione',
  'Manaphy', 'Darkrai', 'Shaymin', 'Arceus', 'Victini', 'Snivy', 'Servine', 'Serperior', 'Tepig', 'Pignite', 'Emboar', 'Oshawott',
  'Dewott', 'Samurott', 'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland', 'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear',
  'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna', 'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika', 'Roggenrola',
  'Boldore', 'Gigalith', 'Woobat', 'Swoobat', 'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr', 'Conkeldurr', 'Tympole',
  'Palpitoad', 'Seismitoad', 'Throh', 'Sawk', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede', 'Whirlipede', 'Scolipede', 'Cottonee',
  'Whimsicott', 'Petilil', 'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile', 'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble',
  'Crustle', 'Scraggy', 'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus', 'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish',
  'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino', 'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion', 'Reuniclus',
  'Ducklett', 'Swanna', 'Vanillite', 'Vanillish', 'Vanilluxe', 'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast', 'Escavalier', 'Foongus',
  'Amoonguss', 'Frillish', 'Jellicent', 'Alomomola', 'Joltik', 'Galvantula', 'Ferroseed', 'Ferrothorn', 'Klink', 'Klang', 'Klinklang',
  'Tynamo', 'Eelektrik', 'Eelektross', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent', 'Chandelure', 'Axew', 'Fraxure', 'Haxorus', 'Cubchoo',
  'Beartic', 'Cryogonal', 'Shelmet', 'Accelgor', 'Stunfisk', 'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk', 'Pawniard',
  'Bisharp', 'Bouffalant', 'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz', 'Heatmor', 'Durant', 'Deino', 'Zweilous', 'Hydreigon',
  'Larvesta', 'Volcarona', 'Cobalion', 'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom ', 'Landorus', 'Kyurem',
  'Keldeo', 'Meloetta', 'Genesect', 'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin', 'Braixen', 'Delphox', 'Froakie', 'Frogadier',
  'Greninja', 'Bunnelby', 'Diggersby', 'Fletchling', 'Fletchinder', 'Talonflame', 'Scatterbug', 'Spewpa', 'Vivillon', 'Litleo', 'Pyroar',
  'Flabebe', 'Floette', 'Florges', 'Skiddo', 'Gogoat', 'Pancham', 'Pangoro', 'Furfrou', 'Espurr', 'Meowstic', 'Honedge', 'Doublade',
  'Aegislash', 'Spritzee', 'Aromatisse', 'Swirlix', 'Slurpuff', 'Inkay', 'Malamar', 'Binacle', 'Barbaracle', 'Skrelp', 'Dragalge',
  'Clauncher', 'Clawitzer', 'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura', 'Aurorus', 'Sylveon', 'Hawlucha', 'Dedenne',
  'Carbink', 'Goomy', 'Sliggoo', 'Goodra', 'Klefki', 'Phantump', 'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Bergmite', 'Avalugg', 'Noibat',
  'Noivern', 'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion', 'Rowlet', 'Dartrix', 'Decidueye', 'Litten', 'Torracat',
  'Incineroar', 'Popplio', 'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon', 'Yungoos', 'Gumshoos', 'Grubbin', 'Charjabug',
  'Vikavolt', 'Crabrawler', 'Crabominable', 'Oricorio', 'Cutiefly', 'Ribombee', 'Rockruff', 'Lycanroc', 'Wishiwashi', 'Mareanie',
  'Toxapex', 'Mudbray', 'Mudsdale', 'Dewpider', 'Araquanid', 'Fomantis', 'Lurantis', 'Morelull', 'Shiinotic', 'Salandit', 'Salazzle',
  'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena', 'Comfey', 'Oranguru', 'Passimian', 'Wimpod', 'Golisopod', 'Sandygast',
  'Palossand', 'Pyukumuku', 'Type: Null', 'Silvally', 'Minior', 'Komala', 'Turtonator', 'Togedemaru', 'Mimikyu', 'Bruxish', 'Drampa',
  'Dhelmise', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Cosmog', 'Cosmoem', 'Solgaleo',
  'Lunala', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 'Necrozma', 'Magearna', 'Marshadow'];

getPokeName = (id) => {
  const name = pokemon[id - 1];
  if (!name) {
    throw new Error(`Pokémon with ID '${id}' does not exist.`);
  }
  return name;
};

getPokeId = (name) => {
  const index = pokemon.findIndex(pokemon => name.toLowerCase() === pokemon.toLowerCase());
  if (index === -1) {
    throw new Error(`Pokémon with name '${name}' does not exist.`);
  }
  return index + 1;
};

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
  return Math.floor(Math.random() * pokemon.length) + 1;
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
