import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import io from 'socket.io-client'
import QRPage from './pages/QRPage'
import CamPage from './pages/CamPage'
import HomePage from './pages/HomePage'
import './App.css'


const App = () => {

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (!socket) setSocket(io())
    }, [socket])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/qr" element={
                        <QRPage />
                    } />
                    <Route path="/:id" element={
                        <CamPage socket={socket} />
                    } />
                    <Route path="/" element={
                        <HomePage /> 
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
