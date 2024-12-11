const express = require('express')
const router = express.Router();
const {db} = require('../database/dbconnection')
const {createUSER,getallUSER, getcurrentUSER, createPROFILE, getQRCODE} = require('../controllers/accountctrl');
const { verifyToken } = require('../middleware/authentication');

//POST REQUEST
router.post('/add_user',createUSER)
router.post('/add_profile', verifyToken,createPROFILE)

//GET REQUEST
router.get('/get_all',getallUSER)

//GET A USER REQUEST
router.get('/user',verifyToken,getcurrentUSER)

router.get('/qrcode',verifyToken,getQRCODE)

module.exports = router