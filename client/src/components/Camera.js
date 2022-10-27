import { useNavigate, useParams } from 'react-router-dom'
import { Camera as CameraWidget,  FACING_MODES, IMAGE_TYPES  } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'


const Camera = ({ camActive, setCamActive, socket }) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const stopButtonStyle = {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        zIndex: "99999",
        padding: "1rem 1.5rem",
        borderRadius: "666rem",
        border: "solid 1px lightgreen",
        backgroundColor: "lightgreen"
    }

    const handleTakePhoto = (dataUri) => {
        socket.emit("sendData", { image: dataUri, room: id })
        if (!dataUri) window.alert("Bildet ble ikke sendt.")
        setCamActive(false)
    }

    return (
        <>
            <button style={stopButtonStyle} onClick={() => {setCamActive(false)}}> Tilbake </button>
            <CameraWidget 
                isFullscreen={true}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                imageCompression={0.4}
                imageType={IMAGE_TYPES.JPG}
                isMaxResolution={true}
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
            />
        </>
    )
}

export default Camera