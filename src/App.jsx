import { useState, useRef, useEffect } from 'react'
import './App.css'
import Roulette from './components/Roulette'
import Tmi from "tmi.js";

function App() {
  // const [count, setCount] = useState(0)

  const [users, setUsers] =useState([])
  const usersRef = useRef(users);
  usersRef.current = users;
  // const [users, setUsers] =useState([
  //   { color: '#DC84F3', label: 'OrlandoGN' },
  //   { color: '#0bf', label: 'yeiandjake' },
  //   { color: '#0b2', label: 'Success47tv' },
  //   { color: '#f82', label: 'ElCochinomg' },
  //   { color: '#FF6868', label: 'Lechuga_Numeritos' },
  //   { color: '#FFBB64', label: 'ElMocsi' },
  //   { color: '#83C0C1', label: 'ElFurro' }
  // ])
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
  
  const userExists = (userName) => {
    return users.some(user => user.userName === userName);
  }
  
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

      if(message.toLowerCase() === '!participar') {
        let userName = tags['display-name'] + Math.floor(Math.random() * 5)

        if(!usersRef.current.some(user => user.userName === userName)){
          setUsers(users => [...users, { userName: userName}]);
          tmiClient.current.say(channel, `@${tags.username}, Listo, ya estás participando :)`);
          console.log("user agregado")
          console.log(users)
        }else{
          tmiClient.current.say(channel, `@${tags.username}, Cálmate, tu ya estás participando`);
          console.log("El usuario ya existe", userName)
        }
        console.log(tags);
        
      }

    });
    return () => {
      tmiClient.current.disconnect();
    };
  }, []);
  
  const selectColor = () => {
    // Si no hay usuarios, simplemente elige un color aleatorio y retorna
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
    return randomColor; // Devuelve un color válido
  };

  return (
    <>
      <Roulette users={users} />
    </>
  )
}

export default App