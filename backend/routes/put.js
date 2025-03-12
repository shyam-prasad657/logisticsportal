const express = require('express');
const db = require('../config/db');
const router = express.Router();
const tableName = '`test_userdb`';
const { fetchStatus } = require('./get')
  
  // API to update status
  router.put('/update-status', (req, res) => {
    const  { accountId, remarks, updatedStatus} = req.body;
    console.log('Request Body:', req.body);
    if(!accountId, !updatedStatus) {
        return res.status(400).json({ message: 'Account ID and Status are required'});
    }
    const query = `UPDATE ${tableName} SET status = ? , remarks = ? WHERE accountid = ?`;
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

//Import Excel - update-status
router.put('/import-excel/update', async (req, res) => {
    const update = req.body.update;
    if(!update || update.length === 0) {
        return res.status(400).json({message : "No Data Received"})
    }
    for (let line of update){
        if(!line["Account ID"] || !line["Status"]) {
            return res.status(400).json({message : "Please fill all the mandatory"})
        }
    }
    const accountIds = update.map((e) => e['Account ID']);
    const checkQuery = `SELECT accountid FROM ${tableName} WHERE accountid IN (?)`;
    const statusData = await fetchStatus();
    console.log(statusData);
    db.query(checkQuery, [accountIds], (err, results) => {
        if(err) {
            console.error("Error checking Account IDs", err);
            return res.status(500).json({ message : "Database error while checking account id"});
        }
        const dbAccountid = results.map((e) => e.accountid)
        let x = [];
        accountIds.map((e) => dbAccountid.map((map) => {
            if(!map.includes(e)) {
                x.push(e)
            }
        }))
        if(x.length > 0) {
            return res.status(500).json({ message : "Account ID does not exists", accountid : x});
        }
        return res.status(400).json({message : "Data Inserted"})
    })
})

module.exports = { putRoutes : router }