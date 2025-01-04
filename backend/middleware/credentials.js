const allowedOrigins = require('../config/allowedOrigins')

const credentials = (req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*')
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports = credentials