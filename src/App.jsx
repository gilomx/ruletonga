import { useState } from 'react'
import './App.css'
import Roulette from './components/Roulette'

function App() {
  const [count, setCount] = useState(0)
  // const [users, setUsers] =useState([])

  

  return (
    <>
      <Roulette />
    </>
  )
}

export default App
