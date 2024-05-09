import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import router from './router.js';
import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';

const app = express();
app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

io.on("connection",(socket) => {
    socket.on('join', ({name,room}) => {
        const {user, error} = addUser({id: socket.id, name, room});
        if(error) console.log(error);
        socket.emit('message', {user : 'admin', text: `${user.name}, welcome to the room ${user.room}`})
        socket.join(user.room)
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined`})
    });

    socket.on('sendMessage', (message) => {
        const user = getUser(socket.id)
        io.to(user.name).emit('message', {user: user.name, text:message})
    })

    socket.on('disconnect',() => {
        console.log("User had left")
    })
})

app.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
