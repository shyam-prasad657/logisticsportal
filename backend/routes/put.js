  const express = require('express');
  const db = require('../config/db');
  const router = express.Router();
  
  // API to update status
  router.put('/update-status', (req, res) => {
    const  { accountId, remarks, updatedStatus} = req.body;
    console.log('Request Body:', req.body);
    if(!accountId, !updatedStatus) {
        return res.status(400).json({ message: 'Account ID and Status are required'});
    }
    const query = 'UPDATE `test-userdb` SET status = ? , remarks = ? WHERE accountid = ?';
    db.query(query, [updatedStatus,  remarks, accountId,], (err,result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({ message : 'Database error.'});
        }
        if(result.affectedRows === 0) {
            return res.status(404).json({ message : 'No user found with the given Account ID'})
        }

        res.status(200).json({ message : 'Status updated successfully!'});
    })
})

module.exports = { putRoutes : router }