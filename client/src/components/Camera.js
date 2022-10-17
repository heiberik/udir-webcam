import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { Camera as CameraWidget,  FACING_MODES, IMAGE_TYPES  } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'


const socket = io()

const Camera = () => {

    const { id } = useParams()

    const cameraContainer = {
        backgroundColor: "red",
        position: "absolute",
        top: "0",
        height: "100vh"
    }

    const buttonStyle = {
        padding: "1rem 2rem",
        borderRadius: "1rem",
        border: "solid 1px lightgreen",
        backgroundColor: "lightgreen",
        fontSize: "1.5rem"
    }


    const handleTakePhoto = (dataUri) => {

        console.log(dataUri);

        socket.emit('joinRoom', id);

        socket.once("sendImageToPCI", function(data) {
            console.log("DATA: ", data);
        })

        socket.emit("sendData", { image: dataUri, room: id })
    }

    return (
        <main>
            <div style={cameraContainer}>
                <CameraWidget
                    isFullscreen={true}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    idealResolution={{ width: 640, height: 480 }}
                    isMaxResolution={true}
                    onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                />
            </div>

        </main>
    )
}

export default Camera