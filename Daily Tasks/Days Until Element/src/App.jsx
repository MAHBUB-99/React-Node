import { useState } from 'react'

function App() {
  const [date, setDate] = useState()
  const [dayDiff, setDayDiff] = useState(0)
  return (
    <>
      <input
      id='datePicker'
        type='date'
        onChange={(e) => {
          const date = new Date(e.target.value)
          setDate(date)
        }
        }
      />
      <button
        id='findDays'
        onClick={()=>{
          const today = new Date()
          const timeDiff = date.getTime() - today.getTime()
          setDayDiff( Math.ceil(timeDiff / (1000 * 3600 * 24)))
        }}
      >
        Find Days
      </button>
      <div>
        { dayDiff >= 0 ? 
          (<span id='daysLeft'> {dayDiff}</span>)
          :
          (<div id='error'> Error: Past Date Entered </div>)
        }
      </div>
      
    </>
  )
}

export default App
