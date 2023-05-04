const express = require('express');
const app = express();
const { Server } = require("socket.io");
const http = require('http');
const cors = require('cors');

const server = http.createServer(app);

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');
    socket.emit('message', 'Bienvenue sur le chat !');
    socket.on('joinRoom', (room) => {
        console.log(room)
        socket.join(room);
        console.log(`L'utilisateur ${socket.id} a rejoint la room ${room}`);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`L'utilisateur ${socket.id} a quitté la room ${room}`);
    });

    socket.on('message', (data) => {
        console.log(`Message reçu de l'utilisateur ${socket.id} dans la room ${data.room} : ${data.message.message}`);
        io.to(data.room).emit('message', {
            user: socket.id,
            message: data.message,
            sender: false,
          });
    });

    socket.on('disconnect', () => {
        console.log(`L'utilisateur ${socket.id} s'est déconnecté`);
    });
});

server.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
