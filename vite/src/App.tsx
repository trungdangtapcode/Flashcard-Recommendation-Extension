
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './style.css'
import LoginPage from './LoginPage/LoginPage'
import { HashRouter as Router, Route, Routes} from 'react-router-dom'
import RegisterPage from './Register/RegisterPage'
import FlashcardPage from './Flashcard/FlashcardPage'


function App() {
  return (
    <Router basename={import.meta.env.PUBLIC_URL}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/card" element={<FlashcardPage/>} />
      </Routes>
    </Router>
  )
}

export default App
