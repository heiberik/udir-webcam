import express from 'express'
import cors from 'cors'
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const httpServer = createServer()

const io = new Server(httpServer, { cors: { origin: '*' } })

app.use(cors())
app.use(express.json())

console.log("DIRNAME: ", __dirname);
app.use(express.static(path.resolve(__dirname, "build")));


io.on("connection", (socket) => {

    console.log("Connected!");
    socket.on('joinRoom', function(room) {
        console.log("WANT TO JOIN: ", room);
        socket.join(room);
    });

    socket.on('sendData', function(data) {

        console.log("Server got data: ", data);
        io.to(data.room).emit("sendImageToPCI", {image: data.text})
    });

    socket.on("disconnect", () => { })
})


const port = process.env.PORT || 3002
httpServer.listen(port, () => console.log(`Server started, listening on port ${port}`))

