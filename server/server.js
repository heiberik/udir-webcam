import express from 'express'
import cors from 'cors'
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer()


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const io = new Server(httpServer, { cors: { origin: '*' } })

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

