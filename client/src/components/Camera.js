import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { Camera as CameraWidget,  FACING_MODES, IMAGE_TYPES  } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import { useEffect, useState } from 'react'


const socket = io()

const Camera = () => {

    const [active, setActive] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        socket.emit('joinRoom', id);
    }, [])

    const containerStyle = {
        backgroundColor: "ghostwhite",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const buttonStyle = {
        padding: "1rem 2rem",
        borderRadius: "1rem",
        border: "solid 1px lightgreen",
        backgroundColor: "lightgreen",
        fontSize: "1.5rem",
        height: "fit-content"
    }


    const handleTakePhoto = (dataUri) => {

        setActive(false)

        socket.emit("sendData", { image: dataUri, room: id })
    }

    return (
        <>

                {!active && <div style={containerStyle}>

                    <button style={buttonStyle} onClick={() => setActive(a => !a)}> Legg til bilde </button></div>}
                {active && <CameraWidget
                    isFullscreen={true}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    idealResolution={{ width: 640, height: 480 }}
                    imageCompression={0.4}
                    imageType={IMAGE_TYPES.JPG}
                    isMaxResolution={true}
                    onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                />}

        </>
    )
}

export default Camera