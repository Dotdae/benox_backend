import express from "express";
import morgan from "morgan";

//Socket Server object.

import {Server as SocketServer} from "socket.io";
import http from "http";
import cors from "cors";

// Set web server.

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

// socket.io server.

const io = new SocketServer(server, {
    cors:{
        origin: '*',
    }
});

// Middlewares.

app.use(cors());

// Check codestatus petitions.

app.use(morgan('dev'));

// Socket listen connections.

io.on('connection', (socket) => {

    // New socket connection.

    console.log(`${socket.id} is connected`);

    // Socket events.

    socket.on('done', () => {
        console.log(`${socket.id} has finished the task!`);

        /*

        // Emit event to all clients.

        socket.broadcast.emit('message', {
            body: message,
            from: socket.id
        });

        */
    })

    socket.on('check', () => {
        console.log(`${socket.id} has checked the task!`);
    })



});

// Server running.

server.listen(PORT);
console.log(`Server running on port ${PORT}`);