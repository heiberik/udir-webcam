import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { Camera as CameraWidget,  FACING_MODES, IMAGE_TYPES  } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import { QrReader } from 'react-qr-reader'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import DeviceOrientation, { Orientation } from 'react-screen-orientation'


const Camera = ({ withId }) => {

    const [active, setActive] = useState(false)
    const [scanningQr, setScanningQr] = useState(false)
    const [socket, setSocket] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) setSocket(io())
        if (withId && socket) socket.emit('joinRoom', id);
    }, [socket, withId, id])


    const containerStyle = {
        backgroundColor: "ghostwhite",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    const buttonStyle = {
        padding: "1rem 2rem",
        borderRadius: "1rem",
        border: "solid 2px lightgreen",
        backgroundColor: "lightgreen",
        fontSize: "1.5rem",
        width: "80vw",
        margin: "1rem",
        height: "fit-content"
    }

    const buttonNewCandStyle = {
        padding: "1rem 2rem",
        borderRadius: "1rem",
        border: "solid 2px lightgreen",
        backgroundColor: "ghostwhite",
        fontSize: "1.5rem",
        width: "80vw",
        margin: "1rem",
        height: "fit-content"
    }
    
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

    const qrContainer = {
        backgroundColor: "lightgreen",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw"
    }

    const videoStyle = {
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        position: "absolute"
    }

    const qrTextStyle = {
        zIndex: "99999",
        position: "absolute",
        bottom: "10%",
        backgroundColor: "lightgreen",
        padding: "1rem",
        borderRadius: "1rem",
        width: "100vw",
        textAlign: "center"
    }

    const handleTakePhoto = (dataUri) => {

        setActive(false)
        socket.emit("sendData", { image: dataUri, room: id })
    }

    const handleScan = (data) => {
        if (data) {
            const url = data.text 
            const split = url.split("/")
            const id = split[split.length - 1]
            if (id) {
                setActive(false)
                setScanningQr(false)
                navigate("/" + id)
            }
        }
    }

    if (scanningQr){
        return (
            <DeviceOrientation lockOrientation={'portrait'}>
                <div style={qrContainer}>
                    <button style={stopButtonStyle} onClick={() => {setActive(false); setScanningQr(false)}}> Tilbake </button>
                    <p style={qrTextStyle}> Scan QR-koden.</p>
                    <QrReader 
                        containerStyle={qrContainer}
                        videoContainerStyle={qrContainer}
                        onResult={(data) => handleScan(data)}
                        videoStyle={videoStyle}
                        constraints={{ facingMode: 'environment' }} />
                </div>
            </DeviceOrientation>
        )
    }
    if (!withId){
        return (
            <div style={containerStyle}>
                <button style={buttonStyle} onClick={() => setScanningQr(true)}> Skan QR-kode </button>
            </div>
        )
    }
    return (
        <>
            <DeviceOrientation lockOrientation={'portrait'}>
                {!active && <div style={containerStyle}>
                    <button style={buttonStyle} onClick={() => setActive(a => !a)}> Legg til bilde </button>
                    <button style={buttonNewCandStyle} onClick={() => setScanningQr(true)}> Skan ny QR-kode </button>
                </div>}
                {active && <>
                <button style={stopButtonStyle} onClick={() => {setActive(false); setScanningQr(false)}}> Tilbake </button>
                <CameraWidget 
                    isFullscreen={true}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    imageCompression={0.4}
                    imageType={IMAGE_TYPES.JPG}
                    isMaxResolution={true}
                    onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                />
            </>}
            </DeviceOrientation>
        </>
    )
}

export default Camera