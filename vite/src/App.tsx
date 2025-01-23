
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './style.css'
import LoginPage from './LoginPage/LoginPage'
import { HashRouter as Router, Route, Routes} from 'react-router-dom'
import RegisterPage from './Register/RegisterPage'
import FlashcardPage from './Flashcard/FlashcardPage'
import ProfileEditorPage from './ProfileEditor/ProfileEditorPage'
import DeckHomePage from './EditorPage/DeckHomePage'
import DeckCreatePage from './EditorPage/DeckCreatePage.tsx'


function App() {
  return (
    <Router basename={import.meta.env.PUBLIC_URL}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/card" element={<FlashcardPage/>} />
        <Route path="/profile" element={<ProfileEditorPage />} />
        <Route path="/deckhome" element={<DeckHomePage/>}/>
        <Route path="/deckcreate" element={<DeckCreatePage/>}/>
        <Route path="/" element={<LoginPage/>} />
      </Routes>
    </Router>
  )
}

export default App
