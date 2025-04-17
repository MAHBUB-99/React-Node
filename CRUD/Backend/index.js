const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

let array = [
    { name: 'Alice', result: 95 },
    { name: 'Bob', result: 95 },
    { name: 'Charlie', result: 95 }
];

app.get('/',(req,res) =>{
    res.json({array});
})

app.post('/create',(req,res) =>{
    const {name,result} = req.body;
    array.push({name,result});
    res.json({array});
})

app.put('/update',(req,res)=>{
    const {oldName,newName} = req.body;
    const index = array.findIndex(item => item.name === oldName);
    array[index].name = newName;
    res.json(array);
})

app.delete('/delete',(req,res)=>{
    const del = req.body.name;
    const new_array = array.filter(item => item.name !== del);
    array = new_array;
    res.json({array});
})