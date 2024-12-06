const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASS,
    database: process.env.DBNAME
})

const connectDB = ()=>{
    db.connect(err=>{
        if(err){
            console.error('Database connection failed: ',err.stack)
            return;
        }
        console.log('Connected to Database!');
    })
}

module.exports = {connectDB,db}