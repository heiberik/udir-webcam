import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
const socket = io()

const Camera = () => {

    const { id } = useParams()

    const cameraContainer = {
        padding: "5rem"
    }

    const buttonStyle = {
        padding: "1rem 2rem",
        borderRadius: "1rem",
        border: "solid 1px lightgreen",
        backgroundColor: "lightgreen",
        fontSize: "1.5rem"
    }


    const clickHandler = () => {

        socket.emit('joinRoom', id);

        socket.once("sendImageToPCI", function(data){
            console.log("DATA: ", data);
        })

        socket.emit("sendData", {text: "Dette er en melding med data!", room: id})
    }

    return (
        <main style={cameraContainer}>
            <button style={buttonStyle} onClick={clickHandler}> Send message </button>
        </main>
    )
}

export default Camera