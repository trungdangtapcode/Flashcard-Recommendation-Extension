
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './style.css'
import LoginPage from './LoginPage/LoginPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterPage from './Register/RegisterPage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
