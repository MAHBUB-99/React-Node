import { useState } from 'react'

function App() {
  const [count, setCount] = useState([
    { option: 'js', count: 0 },
    { option: 'c', count: 0 },
    { option: 'c++', count: 0 },
    { option: 'r', count: 0 }
  ])

  const handleVote = (optionName) => {
    setCount((prevCount) =>
      prevCount.map((item) =>
        item.option === optionName
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };
  
const Button = (prop) => {
  return (
    <div>
      <button
        id='option'
        onClick={() => handleVote(prop.option)}
      >
        <span>{prop.option}</span> - <span>{prop.count}</span>
      </button>
    </div>
  )
}

const PollComponent = () => {
  return (
    <div>
      <h4 id='question'>What’s your favorite programming language?</h4>
      {count.map((item) => {
        return (
          <Button
            key={item.option}
            option={item.option}
            count={item.count}
          />
        )
      }
      )}
    </div>
  )
}

return (
  <>
    <PollComponent />
  </>
)
}

export default App
