const bcrypt = require('bcryptjs'); // For password hashing
const { db } = require('../database/dbconnection');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authentication');

// POST controller
const createUSER = async (req, res) => {
    const { fldUsername, fldPassword } = req.body;

    // Validation for request body
    if (!fldUsername || !fldPassword) {
        return res.status(400).send({
            Status_code: 400,
            Message: 'Username and password are required'
        });
    }

    // Check if the username already exists in the DB
    const checksql = 'SELECT * FROM accounts WHERE fldUsername = ?';
    try {
        const [results] = await db.promise().query(checksql, [fldUsername]); // Use promise() to handle async query with await
        if (results.length > 0) {
            return res.status(400).send({
                Status_code: 400,
                Message: 'Username already exists'
            });
        }

        // Hashing of password
        const hashedPassword = await bcrypt.hash(fldPassword, 10);

        // Inserting new user in the database
        const insertsql = 'INSERT INTO accounts (fldUsername, fldPassword) VALUES (?, ?)';
        const [insertResult] = await db.promise().query(insertsql, [fldUsername, hashedPassword]);

        // Send success response
        const responseData = { fldAccountID: insertResult.insertId, fldUsername };
        return res.status(200).send({
            Status_code: 200,
            Message: 'Account Created Successfully',
            User: responseData
        });

    } catch (err) {
        console.error('Error during user creation process', err);
        return res.status(500).send({
            Status_code: 500,
            Message: 'Error in user creation process',
            Error: err.message
        });
    }
};

const getallUSER = async (req,res)=>{
    
    const sql = 'SELECT * FROM accounts';
   

    db.query(sql,(err,results)=>{
        if(err){
            console.error('Error fetching all data', err)
            return res.status(500).send({
                Status_code:500,
                Message:"Error fetching all the data",
                Error:err.message
            });
        }
        res.status(200).send(results)
    })

}

const getcurrentUSER = async(req,res)=>{
    const sql = 'SELECT fldUsername FROM accounts WHERE fldUsername = ?'

    const username = req.user.fldUsername;

   try{
    const[results] = await db.promise().query(sql,[username]);
    if(results.length === 0 ){
        return res.status(404).send({
            Status_code:404,
            Message:'User not found'
        })
    }
   }
   catch(err){
    console.error('Error fetching data', err)
    return res.status(500).send({
        Status_code:500,
        Message: 'Error fetching data',
        Error: err.message
    })
   }
}

module.exports = {
    createUSER,
    getallUSER,
    getcurrentUSER
};
