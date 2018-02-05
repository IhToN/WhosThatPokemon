var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var userlist = [];

io.on('connection', function (socket) {

    socket.on('new user', function (username) {
        userlist.push(username);
        io.emit('connected', {user: username, userlist: userlist});

        socket.on('chat message', function (msg) {
            if (msg.length > 0) {
                io.emit('chat message', msg);
            }
        });

        socket.on('writing', function(user) {
            io.emit('writing', user);
        });
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
