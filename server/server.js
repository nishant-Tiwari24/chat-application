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
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on("connection",(socket) => {
    socket.on('join', ({name,room}, callback) => {
        const {user, error} = addUser({id: socket.id, name, room});
        if(error) callback(console.log(error));
        socket.emit('message', {user : 'admin', text: `${user.name}, welcome to the room ${user.room}`})
        socket.join(user.room)
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined`})
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text:message})
        callback();
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
