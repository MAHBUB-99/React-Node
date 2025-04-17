const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


app.listen(4000, () => {
    console.log("Server is running on port: 4000");
})

app.get('/', (req, res) => {
    res.send("Hello GET-HOME");
})

// app.get('/:id', (req, res) => {
//     res.send(`Hello from backend: Get request- with id: ${req.params.id}`);
// })

app.get('/success',(req,res)=>{
    res.redirect(`/`);
})


app.post('/', (req, res) => {
    const pass = 111;  
    const name = req.body.data.name;
    const c_pass = parseInt(req.body.data.pass);

    console.log(req.body);
    // console.log({reqBody:req.body});

    if (pass === c_pass && name === "admin") {
        res.redirect(`/success`);
    } else {
        res.send("Wrong id");
    }
});