const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello From backend- (GET)');
});

app.get('/read', (req, res) => {
    // res.send('Hello From backend- (GET) - Test');
    fs.readFile('data.txt','utf8',(error,data)=>
    {
        if(error)
        {
            return res.status(500).send('Something went wrong');
        }
        // console.log(data);
        const array_data = [data];
        console.log(array_data);
        res.send(data);
    })
});

app.post('/', (req, res) => {
    const data = req.body;
    console.log({data});
    if(!data)
    {
        return res.status(400).send('Data is required');
    }
    fs.appendFile('data.txt',JSON.stringify(data) +'\n', (error)=>{
        if(error)
        {
            return res.status(500).send("Error in saving data");
        }

        res.send('Data is saved');
    })
});

app.delete('/delete',(req,res)=>{
    const {name} = req.body;
    console.log(req.body);
    if(!name)
    {
        return res.status(400).send('Name is required');
    }

    fs.readFile('data.txt','utf8',(error,data)=>{
        if(error)
        {
            return res.status(500).send('Something went wrong');
        }

        const lines = data.split('\n');

        const updatedData = lines.filter(line => {
            if(line.trim() === "")
            {
                console.log("Empty Line");
                return false;
            }
            try{
                const parsedLine = JSON.parse(line);
                // console.log("test");
                console.log(parsedLine);
                return parsedLine.name !== name;
            }
            catch(error)
            {
                console.log("Error in parsing line: ");
                return false;
            }
        })
        fs.writeFile('data.txt',updatedData.join('\n')+ '\n','utf-8',(error)=>{
            if(error)
            {
                return res.status(500).send('Something went wrong on overwriting file');
            }
            console.log("File is overwritten successfully"); 
        })

        res.send(updatedData);

    })
})