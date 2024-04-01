import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

import Favorites from './pages/Favorites'
import PhotoDetails from './pages/PhotoDetails'
import Saved from './pages/Saved'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/photos" element={<Home />} />
                <Route path="/photos/:id" element={<PhotoDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/saved" element={<Saved />} />
            </Routes>
        </Router>
    )
}

export default App
