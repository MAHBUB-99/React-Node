import React, { useEffect, useState } from "react";
import axios from "axios";


export default function App() {
  const [data, setData] = useState({
    name: '',
    pass: '',
  });
  const [response, setResponse] = useState(null);
  const [postResponse, setPostResponse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/`)
    .then(response => {
      console.log("data");
      setResponse(response.data);
    })
    .catch(error =>{
      console.log(error);
    }) 
  }
  , []);  

  const handleData = (value, key) => {
    setData({
      ...data, [key]: value
    })
  }

  const handlePost = () => {
    axios.post(`http://localhost:4000/`, { data })
      .then(response => {
        setPostResponse(response.data);
      })
      .catch(error => {
        console.log(error);
      })

    setData({
      name: '',
      pass: '',
    })

  }

  return (
    <div>
      <h1>Get req: {response}</h1>

      <input
        type="text"
        value={data.name}
        placeholder="Enter name"
        onChange={(e) => handleData(e.target.value, "name")}
      />
      <br />

      <input
        type="number" 
        value={data.pass} 
        placeholder="Enter pass" 
        onChange={(e) => handleData(e.target.value, "pass")} 
      />
      <br />
      <button onClick={handlePost}>Post</button>
      <h1>Post req: {postResponse}</h1>
    </div>
  );
}