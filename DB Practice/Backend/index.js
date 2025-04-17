const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'student_db'
})

database
    .query('select 1')
    .then(() => {
        console.log("Database connected")
        app.listen(3000, () => {
            console.log("Server is running on port : 3000")
        })
    })
    .catch((error) => {
        console.log(error)
    })

app.get('/students',async(req,res)=>{
    const [students] = await database.query('select * from students')
    res.json(students)
})

app.post('/students',async(req,res)=>{
    const {id,name,roll_no,fees,class:studentClass,medium} = req.body;
    await database.query('insert into students (id,name,roll_no,fees,class,medium) values (?,?,?,?,?,?)',[id,name,roll_no,fees,studentClass,medium])
    res.json("Successful")
})

app.put('/students/:id',async(req,res)=>{
    const {name,roll_no,fees,class:studentClass,medium} = req.body;
    await database.query('update students  set name =?,roll_no=?,fees=?,class=?,medium=? where id=?',[name,roll_no,fees,studentClass,medium,req.params.id])
    res.json("Updated")
})

app.delete('/students/:id',async(req,res)=>{
    await database.query('delete from students where id=?',[req.params.id])
    res.json("deleted")
})