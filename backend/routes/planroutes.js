const express = require('express');
const planrouter = express.Router();
const {getAllPlans,getPlanByID, AssignPlanToUser} = require('../controllers/planctrl')
const { verifyToken } = require('../middleware/authentication'); // Ensure user is authenticated


planrouter.get('/plans', getAllPlans);  
planrouter.get('/plans/:planID', getPlanByID);  
planrouter.post('/plans/assign', verifyToken, AssignPlanToUser); 

module.exports = planrouter;