import './App.css'
import Profile from './Profile.jsx'
import SpotifyPlayer from './SpotifyPlayer'
import ButtonsContainer from './ButtonsContainer'
import Mailchimp from './Mailchimp'
import Popup from './Popup'
import TestApiMongo from './TestApiMongo'
import YoutubeVideo from './YoutubeVideo'



function App() {

  return (
    <main>
      <div className="overlay">
      <div className="main-card">
      <Profile />
      <SpotifyPlayer/>
      <ButtonsContainer/>
      </div>
      </div>
    </main>

  )
}

export default App


