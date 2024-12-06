const { db } = require('../database/dbconnection'); // Import the connection object

const User = {
  findByUsername: (fldUsername, callback) => {
    // Ensure the database connection is established before querying
    const query = 'SELECT * FROM accounts WHERE fldUsername = ?';
    db.query(query, [fldUsername], (err, results) => {
      if (err) {
        console.error('Database query failed: ', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = User;
