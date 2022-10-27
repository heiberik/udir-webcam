import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import io from 'socket.io-client'


const HomePage = () => {

    const navigate = useNavigate()

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

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    }

    return (
       <div style={containerStyle}>
            <button style={buttonNewCandStyle} onClick={() => {navigate("/qr")}}> Skan ny QR-kode </button>
       </div>
    )
}

export default HomePage