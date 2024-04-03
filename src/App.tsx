import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { gapi } from 'gapi-script'
import PhotoDetails from './pages/PhotoDetails'
import Favorites from './pages/Favorites'
import Saved from './pages/Saved'
import Login from './pages/Login'
import Home from './pages/Home'

const App: React.FC = () => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_CLIENT_ID || '',
                scope: '',
            })
        }

        gapi.load('client:auth2', start)
    })

    return (
        <Router>
            <Routes>
                <Route path="/photos" element={<Home />} />
                <Route path="/photos/:id" element={<PhotoDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
