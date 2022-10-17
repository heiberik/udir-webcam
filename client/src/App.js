import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Camera from './components/Camera';
import Header from './components/Header';
import Hello from './components/Hello';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/:id" element={
                        <Camera />
                    } />
                    <Route path="/" element={
                        <Hello />
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
