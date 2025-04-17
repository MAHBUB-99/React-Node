import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function App() {
  const [response_get, setResponse_get] = useState('');
  const [response_get_read, setResponse_get_read] = useState([]);

  const [input, setInput] = useState({
    name: '',
    pass: '',
    email: ''
  });

  const [response_post, setResponse_post] = useState('');
  const [delete_data,setDelete_data] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then((res) => {
        setResponse_get(res.data);
      })
      .catch((error) => {
        console.log(error);
      });


    axios.get('http://localhost:3000/read')
      .then((res) => {
        setResponse_get_read(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [input]);


  const handleChange = (e, key) => {
    setInput({
      ...input,
      [key]: e.target.value
    });
  }

  const handleSubmit = () => {
    axios.post('http://localhost:3000/', input)
      .then((res) => {
        setResponse_post(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setInput({
      name: '',
      pass: '',
      email: ''
    });
  }

  const handleDelete = () =>{
    axios.delete('http://localhost:3000/delete',delete_data)
    .then( (res) => {
      

    })
    .catch( (error)=>{
      console.log(error)
    })
  }




  return (
    <div>
      <strong>Your Name: <input type="text" placeholder="Enter your Name" value={input.name} onChange={(e) => handleChange(e, 'name')} /></strong> <br />
      <strong>Your Password: <input type="password" placeholder="Enter your Password" value={input.pass} onChange={(e) => handleChange(e, 'pass')} /></strong><br />
      <strong>Your Email: <input type="email" placeholder="Enter your Email" value={input.email} onChange={(e) => handleChange(e, 'email')} /></strong><br />

      <button onClick={handleSubmit}> <strong> Submit</strong> </button>

      <h3>Get req: (/) ::  {response_get}</h3>


      <h3>Get req: (/read) :: </h3> {response_get_read}<br />
      <br />

      <br />
      <h3>Post req: (/) ::  {response_post}</h3>

      <strong>Delete: <input type="text" placeholder="Enter name to delete" value={delete_data} onChange={(e)=> setDelete_data(e.target.value)} /></strong> <button onClick={handleDelete}>Delete</button>

    </div>
  );
}