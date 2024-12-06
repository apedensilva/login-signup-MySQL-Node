const express = require('express')
const router = express.Router();
const {db} = require('../database/dbconnection')
const {createUSER,getallUSER, getcurrentUSER} = require('../controllers/accountctrl');
const { verifyToken } = require('../middleware/authentication');

//POST REQUEST
router.post('/add_user',createUSER)

//GET REQUEST
router.get('/get_all',getallUSER)

//GET A USER REQUEST
router.get('/user',verifyToken,getcurrentUSER)

module.exports = router