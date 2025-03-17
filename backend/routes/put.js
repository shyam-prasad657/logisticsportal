const express = require('express');
const db = require('../config/db');
const { fetchStatus } = require('./get');
const { updateImportQuery } = require('../utils/helpers');
const router = express.Router();
const tableName = '`test_userdb`';
  
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
    const accountIds = update.map((e) => e['Account ID'].toString());

    let temp = [];
    for (let i = 0; i < accountIds.length; i++) {
        for (let j = i + 1; j < accountIds.length; j++) {
            if (accountIds[i] === accountIds[j]) {
                temp.push(accountIds[i]);
            }
        }
    }
    if (temp.length > 0) {
        return res.status(500).json({message : 'Duplicate Account Ids', duplicates : temp})
    }
    const checkQuery = `SELECT accountid FROM ${tableName} WHERE accountid IN (?)`;
    db.query(checkQuery, [accountIds], async (err, results) => {
        if(err) {
            console.error("Error checking Account IDs", err);
            return res.status(500).json({ message : "Database error while checking account id"});
        }
        const dbAccountid = results.map((e) => e.accountid);
        let x = [];
        accountIds.forEach((e) => {
            if(!dbAccountid.includes(e)) {
                x.push(e);
            }
        })
        if(x.length > 0) {
            return res.status(500).json({ message : "Account ID does not exists", accountid : x});
        }
        const statusData = await fetchStatus();
        const status = statusData.map((e) => e.status_name);
        let stateError = [];
        update.forEach((lineItem, index) => {
            if(lineItem["Status"] && !status.includes(lineItem["Status"])) {
                stateError.push({
                    row : index + 1,
                    value : lineItem["Status"],
                    message : `${lineItem["Status"]} not found in masters`
                })
            }
        })
        if(stateError.length > 0) {
            return res.status(400).json({
                message :'Status Validation',
                value : stateError
            });
        }
        const values = update.map((e) => {
            if(e["Status"] && status.includes(e["Status"])) {
                const status_id = statusData.find((x) => x.status_name === e["Status"]);
                return status_id.id;
            }
        })
        const insert_query = updateImportQuery(tableName, values, update);
        db.query(insert_query, (err,result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({ message : 'Database error.'});
            }
            return res.status(200).json({message : "Data Inserted"})
        })
    })
})

module.exports = { putRoutes : router }