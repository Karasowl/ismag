import { useState } from 'react'
import './App.css'
import Profile from './Profile.jsx'
import SpotifyPlayer from './SpotifyPlayer'
import ButtonsContainer from './ButtonsContainer'



function App() {

  return (
    <main>
      <div className="main-card">
      <Profile />
      <SpotifyPlayer/>
      <ButtonsContainer/>
      </div>
    </main>

  )
}

export default App
