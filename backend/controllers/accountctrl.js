const bcrypt = require('bcryptjs'); // For password hashing
const { db } = require('../database/dbconnection');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authentication');
const QRcode = require('qrcode')
const path = require('path')
const fs = require('fs')

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
    console.log('Account ID from token:', req.user.fldAccountID);
    const sql = 'SELECT accountdetails.* FROM accounts JOIN accountdetails ON accounts.fldAccountID = accountdetails.fldAccountID WHERE accounts.fldAccountID = ?'
    //get current user from account table to accountdetails table
    const accountID = req.user.fldAccountID;

   try{
    const[results] = await db.promise().query(sql,[accountID]);
    if(results.length === 0 ){
        return res.status(404).send({
            Status_code:404,
            Message:'User not found'
        })
    }

    console.log('First name fetched from database:', results[0].fldFirstName);
    console.log('Last name fetched from database:', results[0].fldLastName);

    return res.status(200).send({
        Status_code: 200,
        Message: 'User found',
        FirstName: results[0].fldFirstName,
        LastName: results[0].fldLastName
    });
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

const createPROFILE = async(req,res)=>{
    const {fldFirstName,fldLastName,fldAge} = req.body;
    const accountID = req.user.fldAccountID

    // Validation for required profile fields
  if (!fldFirstName || !fldLastName || !fldAge) {
    return res.status(400).json({ message: 'Name, email, and age are required to create profile' });
  }

  try {
    // Check if the profile already exists for the logged-in user
    const [existingProfile] = await db.promise().query('SELECT * FROM accountdetails WHERE fldAccountID = ?', [accountID]);
    if (existingProfile.length > 0) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    // Insert the profile into the database
    const [insertResult] = await db.promise().query(
      'INSERT INTO accountdetails (fldAccountID,fldFirstName, fldLastName, fldAge) VALUES ( ?,?, ?, ?)',
      [accountID,fldFirstName, fldLastName, fldAge]
    );

    const profile = { fldProfileID: insertResult.insertId, fldAccountID: accountID, fldFirstName, fldLastName, fldAge };

    return res.status(201).json({
      message: 'Profile created successfully',
      profile
    });

  } catch (err) {
    console.error('Error creating profile:', err);
    return res.status(500).json({ message: 'Error creating profile', error: err.message });
  }
};


    // Get QR Code for the logged-in user
const getQRCODE = async (req, res) => {
    const accountID = req.user.fldAccountID;  // Get account ID from the JWT token

    try {
        // Fetch the user's username based on account ID
        const [userResults] = await db.promise().query(
            'SELECT fldFirstName FROM accountdetails WHERE fldAccountID = ?', [accountID]
        );

        if (userResults.length === 0) {
            return res.status(404).send({
                Status_code: 404,
                Message: 'User Not Found'
            });
        }

        const name = userResults[0].fldFirstName;
        const qrData = `User: ${name}`;  // Data to be encoded into QR code

        // Define the path where the QR code image will be stored
        const qrCodePath = path.join(__dirname, '..', 'public', 'qrcodes', `user_${accountID}.png`);
        const qrCodeURL = `/qrcodes/user_${accountID}.png`;

        // Check if the QR code already exists
        if (fs.existsSync(qrCodePath)) {
            return res.status(200).send({
                Status_code: 200,
                Message: 'QR Code already generated',
                QRCodeURL: qrCodeURL
            });
        }

        // Generate and save the QR code as a PNG file
        await QRcode.toFile(qrCodePath, qrData);

        const updateSQL = 'UPDATE accountdetails SET fldQrUrl = ? WHERE fldAccountID = ?';
        await db.promise().query(updateSQL, [qrCodeURL, accountID]);

        return res.status(200).send({
            Status_code: 200,
            Message: 'QR Code generated successfully',
            QRCodeURL: qrCodeURL  // URL where the QR code can be accessed
        });
    } catch (err) {
        console.error('Error generating QR code:', err);
        return res.status(500).send({
            Status_code: 500,
            Message: 'Error generating QR code',
            Error: err.message
        });
    }
};





module.exports = {
    createUSER,
    getallUSER,
    getcurrentUSER,
    createPROFILE,
    getQRCODE
};
