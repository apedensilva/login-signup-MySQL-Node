const { db } = require('../database/dbconnection'); // Import the connection object

const User = {
  findByUsername: (fldUsername, callback) => {
    const query = 'SELECT * FROM accounts WHERE fldUsername = ?';
    db.query(query, [fldUsername], (err, results) => {
      if (err) {
        console.error('Database query failed: ', err);
        return callback(err, null); // Handle database error
      }

      // Check if any user was found
      if (results.length === 0) {
        return callback(null, null); // No user found
      }

      return callback(null, results[0]); // Return the first matched user
    });
  }
};

module.exports = User;
