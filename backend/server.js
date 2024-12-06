// server.js
const express = require('express');
const dotenv = require('dotenv');


const cors = require('cors');
const { connectDB } = require('./database/dbconnection');
const accountrouter = require('./routes/accountroutes');
const loginrouter = require('./routes/loginroutes')

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT;


//calling of database
connectDB();

// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(cors());  // Enable CORS

app.use('/api',accountrouter)
app.use('/auth',loginrouter)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


