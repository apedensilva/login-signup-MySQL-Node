const {db} = require('../database/dbconnection')

const getAllPlans = async (req,res) => {
    try {
        const sql = 'SELECT * FROM plantbl'; //sql query
        const [results] = await db.promise().query(sql); // results database message if successful
        res.status(200).send({
            Status_code:200,
            Message: 'Plans fetched successfully',
            Plans: results
        });

    } catch (err) { 
        console.error('Error fetching plans: ',err) //catch error message if unsuccessful
        return res.status(500).send({
            Status_code:500,
            Message:'Failed to fetch plans',
            Error: err.message
        });
    }
}

const getPlanByID = async (req,res) => {
    const {planID} = req.params;
    try {
        const sql = 'SELECT * from plantbl WHERE plan_id = ?'
        const [results] = await db.promise().query(sql,[planID]);

        if(results.length===0){
            return res.status(404).send({
                Status_code:404,
                Message: 'Plan not found'
            });
        }
        res.status(200).send({
            Status_code:200,
            Message: 'Plan Found',
            Plan: results[0]
        });
    } catch (err) {
        console.error('Error Fetching Plan: ',err);
        return res.status(500).send({
            Status_code:500,
            Message:'Error fetching plan',
            Error: err.message
        });
    }
}

const AssignPlanToUser = async (req,res) => {
    const {planID} = req.body; // contains the data that is sent to the body when making post req
    const accountID = req.user.fldAccountID 

    // Validation: check if the plan exists
    try {
        const [planExists] = await db.promise().query('SELECT * FROM plantbl WHERE plan_id = ?', [planID]);
        if (planExists.length === 0) {
            return res.status(400).send({
                Status_code: 400,
                Message: 'Plan does not exist'
            });
        }

        // Update the user's plan
        const updateSql = 'UPDATE accountdetails SET fldPlanID = ? WHERE fldAccountID = ?';
        const [updateResult] = await db.promise().query(updateSql, [planID, accountID]);

        if (updateResult.affectedRows === 0) {
            return res.status(400).send({
                Status_code: 400,
                Message: 'Failed to assign plan to the user'
            });
        }

        return res.status(200).send({
            Status_code: 200,
            Message: 'Plan assigned successfully'
        });
    } catch (err) {
        console.error('Error assigning plan:', err);
        return res.status(500).send({
            Status_code: 500,
            Message: 'Error assigning plan',
            Error: err.message
        });
    }
}

module.exports = {
    getAllPlans,
    getPlanByID,
    AssignPlanToUser
};