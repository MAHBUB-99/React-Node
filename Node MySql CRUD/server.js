const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const port = process.env.PORT || 8000;

// ✅ Check MySQL Connection and Start Server
mySqlPool
    .query('SELECT 1')
    .then(() => {
        console.log('✅ MySQL Database connected');
        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    })
    .catch((error) => console.log('❌ Database Connection Failed:', error));

/* ===========================
📌 ROUTES
=========================== */

// 🌍 **Root Route**
app.get('/', (req, res) => {
    res.status(200).send('🎉 Welcome to the Student API!');
});

// 📌 **1️⃣ Get All Students**
app.get('/students', async (req, res) => {
    try {
        const [students] = await mySqlPool.query('SELECT * FROM STUDENTS');
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 **2️⃣ Get Student by ID**
app.get('/students/:id', async (req, res) => {
    try {
        const [student] = await mySqlPool.query('SELECT * FROM STUDENTS WHERE id = ?', [req.params.id]);
        if (student.length === 0)
            return res.status(404).json({ message: 'Student not found' });
        res.json(student[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 **3️⃣ Create New Student**
app.post('/students', async (req, res) => {
    try {
        const { name, roll_no, fees, class: studentClass, medium } = req.body;
        const [result] = await mySqlPool.query(
            'INSERT INTO STUDENTS (name, roll_no, fees, class, medium) VALUES (?, ?, ?, ?, ?)',
            [name, roll_no, fees, studentClass, medium]
        );
        res.json({ message: '✅ Student added successfully!', studentId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 **4️⃣ Update Student by ID**
app.put('/students/:id', async (req, res) => {
    try {
        const { name, roll_no, fees, class: studentClass, medium } = req.body;
        const [existing] = await mySqlPool.query('SELECT * FROM STUDENTS WHERE id = ?', [req.params.id]);
        if (existing.length === 0) return res.status(404).json({ message: 'Student not found' });

        await mySqlPool.query(
            'UPDATE STUDENTS SET name = ?, roll_no = ?, fees = ?, class = ?, medium = ? WHERE id = ?',
            [name, roll_no, fees, studentClass, medium, req.params.id]
        );

        const [updatedStudent] = await mySqlPool.query('SELECT * FROM STUDENTS WHERE id = ?', [req.params.id]);
        res.json({ message: '✅ Student updated successfully!', student: updatedStudent[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 **5️⃣ Delete Student by ID**
app.delete('/students/:id', async (req, res) => {
    try {
        const [existing] = await mySqlPool.query('SELECT * FROM STUDENTS WHERE id = ?', [req.params.id]);
        if (existing.length === 0) return res.status(404).json({ message: 'Student not found' });

        await mySqlPool.query('DELETE FROM STUDENTS WHERE id = ?', [req.params.id]);
        res.json({ message: `✅ Student with ID ${req.params.id} deleted successfully!` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
