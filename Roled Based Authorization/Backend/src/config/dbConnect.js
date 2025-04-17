const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: '../.env' });

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Connected to : ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = dbConnect;