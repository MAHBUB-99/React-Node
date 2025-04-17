const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const morgan = require('morgan')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


const secret_key = "Billionaire"

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'posts'
})

database
    .query('select 1')
    .then(() => {
        console.log("Database is connected.")
        app.listen(3000, () => {
            console.log("Server is running on port: 3000")
        })
    })
    .catch((error) => {
        console.log(error)
    })


app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const [existinguser] = await database.query('select * from users where email = ?', [email])
    if (existinguser.length > 0) {
        return res.json({ message: "user already exists" })
    }
    else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            const [row] = await database.query('select max(userid) as max from posts.users')
            const max = row[0].max;
            await database.query(
                'INSERT INTO posts.users (userid, name, email, password) VALUES (?, ?, ?, ?)',
                [max + 1, name, email, hashedPassword]
            );
            res.json("Registration successfull")
        } catch (error) {
            res.send(error)
        }
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const [user] = await database.query('select * from users where email = ?', email)
    if (user.length !== 0) {
        const isMatched = await bcrypt.compare(password, user[0].password)
        // res.json({message: isMatched})
        if (isMatched) {
            const token = jwt.sign({ name: user[0].name, email: user[0].email }, secret_key, { expiresIn: "1h" })
            const [posts] = await database.query(`
                select p.title,p.content from
                posts.users as u join posts.post as p 
                on u.userid = p.userid 
                where u.email = ? `, [email])
            res.json({
                Message: "Login Successfull.",
                token: token,
                posts: [posts]
            })
        }
        else {
            res.json({ Message: "Login Unsuccessfull." })
        }
    }
    else {
        res.json({ message: "email or password is not correct" })
    }
})

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]
    if (!token) {
        return res.status(403).json({ message: "Token required" })
    }
    jwt.verify(token, secret_key, (error, decoded) => {
        if (error) {
            return res.json({ message: "Invalid token", Error: error })
        }
        req.user = decoded;
        console.log({ decoded })
        next();
    })
}


app.get('/users', verifyToken, async (req, res) => {
    const [users] = await database.query('select * from users')
    res.json(users)
})

app.get('/users/:id', verifyToken, async (req, res) => {
    const [user] = await database.query('select * from users where userid = ?', [req.params.id])
    res.json(user)
})

app.get('/posts', async (req, res) => {
    const [posts] = await database.query(
        'select * from users join post on users.userid = post.userid'
    )
    res.json(posts)
})

app.get('/posts/:userid', verifyToken, async (req, res) => {
    const [posts] = await database.query(
        'select * from post where userid = ?', [req.params.userid]
    )
    res.json(posts)
})

app.post('/posts', verifyToken, async (req, res) => {
    const email = req.user.email;
    const [maxPostId] = await database.query('select MAX(postid) as max from post');
    const nextpostid = (maxPostId[0].max || 0) + 1;
    const { title, content } = req.body;
    const [userid] = await database.query('select userid from users where email =? ', [email])
    // res.json(userid[0].userid)
    await database.query('insert into post (postid,userid,title,content,time) values (?,?,?,?,Now())', [nextpostid, userid[0].userid, title, content])
    res.json({ message: "Post Created Successfuly" })
    // console.log(Now())
})

app.put('/posts/:postid', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const [userid] = await database.query('select userid from users where email = ? ', [req.user.email])
    // res.json({userid: userid[0],email: req.user.email})
    await database.query('update post set title = ? , content = ? where userid = ? and postid = ?', [title, content, userid[0].userid, req.params.postid])
    res.json("Updated successfully")
})

app.delete('/posts/:postid', verifyToken, async (req, res) => {
    // const email = req.user.email
    // console.log(email)
    const [userid] = await database.query('select userid from users where email = ? ', [req.user.email])
    await database.query('delete from post where postid = ? AND userid = ? ', [req.params.postid, userid[0].userid])
    res.json({ message: "Deleted Successfuly" })
})

