import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import io from 'socket.io-client'
import QRPage from './pages/QRPage'
import CamPage from './pages/CamPage'
import HomePage from './pages/HomePage'
import './App.css'
import Message from './components/Message'


const App = () => {

    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!socket) setSocket(io())
    }, [socket])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/qr" element={
                        <QRPage setMessage={setMessage}/>
                    } />
                    <Route path="/:id" element={
                        <CamPage socket={socket} setMessage={setMessage} />
                    } />
                    <Route path="/" element={
                        <HomePage /> 
                    } />
                </Routes>
            </BrowserRouter>
            {message && <Message message={message} setMessage={setMessage} />}
        </div>
    );
}

export default App;
