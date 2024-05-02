const mongoose = require('mongoose');

require('dotenv').config();
const mongodbURL = process.env.DB_URL;

mongoose.connect(mongodbURL)

const db = mongoose.connection;

db.on('connected', () =>{
    console.log('MongoDB connected')
})
db.on('error', (err) =>{
    console.log('MongoDB connection error: ' + err)
})
db.on('disconnected', () =>{
    console.log('MongoDB disconnected')
})

module.exports = db;