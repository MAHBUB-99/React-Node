import { useState } from 'react'

function App() {
  const [bill, setBill] = useState(0)
  const [tip, setTip] = useState(0)
  const [total, setTotal] = useState(0)

  const handleCalculation = () => {
    setTotal((bill * (1 + (tip / 100))).toFixed(2))
    console.log(total)
  }

  return (
    <>
      <div>
        <label>Enter Amount of Bill: </label><input id='billAmount' type='number' min={0} value={bill ?? ''} onChange={(e) => setBill(e.target.value)} />
      </div>
      <div>
        <label>Enter Percentage of Tip: </label><input id='tipPercent' type='number' min={0} value={tip ?? ''} onChange={(e) => setTip(e.target.value)} />
      </div>
      <div>
        <button id='calculateAmount' onClick= { handleCalculation }>Calculate
        </button>
      </div>
      <div id='totalAmount'>
        <label>Total Amount: </label> {total}
      </div>
    </>
  )
}

export default App
