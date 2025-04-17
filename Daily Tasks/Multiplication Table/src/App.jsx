import React, { useState } from "react";
function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);

  const GenerateMultiplicationTable = (input) => {
    let newTable = [];
    for (let i = 1; i <= 20; i++) {
      newTable.push(`${input} x ${i} = ${input * i}`);
    }
    setOutput(newTable);
    setInput("");
    console.log(newTable);

  }


  return (
    <div>
      <input
        id="input"
        type="number"
        value={input ?? ""}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text here"
      />
      <button
        id="submit"
        onClick={() => {
          GenerateMultiplicationTable(input);
        }}
      >
        Submit
      </button>

      {output &&
        <div>
          <h2>Multiplication Table</h2>
          <ul>
            {output.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}
export default App;