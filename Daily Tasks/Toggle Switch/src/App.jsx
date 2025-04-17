import { useState } from 'react'
function App() {
  const [state, setState] = useState('on')

  return (
    <>
      <div>
        <button
          id='toggle'
          style={{
            backgroundColor: state === 'on' ? 'black' : 'lightgray',
            color: state === 'on' ? 'white' : 'black'
          }}
          onClick={() => {
            setState(state === 'on' ? 'off' : 'on')
          }}>
          {state}
        </button>
      </div>

    </>
  )
}

export default App
