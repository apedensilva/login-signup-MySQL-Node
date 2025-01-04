const allowedOrigins = require('./allowedOrigins')

const corsoptions ={
  origin: (origin, callback) => {
    console.log("Cors Origin : ", origin);
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,  // Allow cookies to be sent

};

module.exports = corsoptions