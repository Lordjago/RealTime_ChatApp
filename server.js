const express = require('express');

const http = require('http');

const socketio = require('socket.io');

const config = require('./config');

const path = require('path');

const app = express();

const messageFormat = require('./utils/messageFormat');

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chat-Bot';
//Run when client connects

io.on('connection', socket => {
    // console.log('New WS connection...');

    socket.on('joinRoom', {username, room});

    //Welcome client

    socket.emit('message', messageFormat(botName, 'Welcome to ChatDev!!!', ));

    //Run when a user join the chat 

    socket.broadcast.emit('message', messageFormat(botName,'A user joined the chat!'));

    //RUn when a user disconnect

    socket.on('disconnect', () => {
        io.emit('message', messageFormat(botName,'A user has left the chat'));
    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', messageFormat('USER', msg));
    });
});

app.set('view engine', 'ejs');

app.set('views', 'public')

app.get('/chat', (req, res) =>{
    res.render('chat', {
        pageTitle: 'Chat'
    });
});

app.get('/', (req, res) => {
    res.render('index',{
        pageTitle: "Login"
   } );
});


server.listen(config.port, console.log(`Real