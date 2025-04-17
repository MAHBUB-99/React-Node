import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <button id='Hover' onMouseEnter={() => setCount((c) => c + 1)}>
          Hover Me
        </button>
        <h1 id='counter'>{count}</h1>
      </div>
    </>
  )
}
export default App
