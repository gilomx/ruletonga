import { useState, useRef, useEffect } from 'react'
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
  
  //Listen Chat
  useEffect(() => {
    tmiClient.current.connect();
    // console.log(import.meta.env.VITE_TWITCH_USERNAME)
    tmiClient.current.on("message", (channel, tags, message, self) => {
      // if (self) return;
      channelRef.current = channel;

      if(message.toLowerCase() === '!hola') {
        console.log(tags);
        tmiClient.current.say(channel, `@${tags.username}, Que pues!`);
      }
    });
    return () => {
      tmiClient.current.disconnect();
    };
  }, []);

  return (
    <>
      <Roulette />
    </>
  )
}

export default App
