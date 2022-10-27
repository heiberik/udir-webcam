import { useState } from "react"
import Buttons from "../components/Buttons"
import Camera from "../components/Camera"


const CamPage = ({ socket, setMessage }) => {

    const [camActive, setCamActive] = useState(false)

    return (
        <>
            {camActive && <Camera 
                camActive={camActive} 
                setCamActive={setCamActive} 
                socket={socket} 
                setMessage={setMessage} />}
                
            {!camActive && <Buttons 
                camActive={camActive} 
                setCamActive={setCamActive} />}
        </>  
    )
}

export default CamPage