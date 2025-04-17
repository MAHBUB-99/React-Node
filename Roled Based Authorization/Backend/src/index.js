const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config({ path: '../.env' });
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

//Connect to MongoDB
dbConnect();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

//Listen to the Server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);