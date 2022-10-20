import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Camera from './components/Camera'

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/:id" element={
                        <Camera withId={true} />
                    } />
                    <Route path="/" element={
                        <Camera withId={false} />
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
