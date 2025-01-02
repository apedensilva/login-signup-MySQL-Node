const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDB } = require('./database/dbconnection');
const accountrouter = require('./routes/accountroutes');
const loginrouter = require('./routes/loginroutes');
const planrouter = require('./routes/planroutes')
const path = require('path'); // Add this line
const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.29:3000','http://192.168.1.23:3000'];

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT;

// Calling the database
connectDB();

// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(cookieParser());  // For parsing cookies
app.use(cors({
  origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,  // Allow cookies to be sent
}));
app.use('/qrcodes',express.static(path.join(__dirname,'public','qrcodes')))


// Routes
app.use('/api', accountrouter);  // Assuming your API routes are under /api
app.use('/auth', loginrouter);  // Your login route
app.use('/api', planrouter)

// Start the server
app.listen(PORT,'192.168.1.29',() => {
  console.log(`Server is running on http://192.168.1.29:${PORT}`);
});
