import { useState, useRef } from 'react'
import './App.css'
import Roulette from './components/Roulette'
import Tmi from "tmi.js";

function App() {
  // const [count, setCount] = useState(0)
  const [users, setUsers] =useState([])
  const channelRef = useRef();

  const tmiClient = useRef(
    new Tmi.Client({
      identity: {
        username: import.meta.env.VITE_TWITCH_USERNAME,
        password: import.meta.env.VITE_TWITCH_OAUTH
      },
      channels: [ import.meta.env.VITE_TWITCH_CHANNEL ]
    })
  );
  

  return (
    <>
      <Roulette />
    </>
  )
}

export default App
