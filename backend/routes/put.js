const express = require('express');
const db = require('../config/db');
const { fetchStatus } = require('./get');
const { updateImportQuery, checkDuplicates } = require('../utils/helpers');
const router = express.Router();
const tableName = '`test_userdb`';
  
  // API to update status
  router.put('/update-status', async (req, res) => {
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
            if(result.affectedRows > 0) {
                const historyQuery = "INSERT INTO order_history (accountid, action, remarks, status, created_at) VALUES (?, ?, ?, ?, NOW())"
                db.query(historyQuery, [accountId, 'UPDATE', remarks, updatedStatus], (historyError, historyResult) => {
                    if(historyError) {
                        console.log('history error',historyError);
                        return res.status(500).json({ message : 'Error while inserting history data'})
                    }
                    if(historyResult) {
                        console.log('history result',historyResult)
                        return res.status(200).json({ message : 'Status snd history updated successfully!'});
                    }
                })
            }
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
    const temp = checkDuplicates(accountIds);
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
        const insert_query = updateImportQuery(tableName, update);
        let id = [];
        update.forEach((e) => {
            if(e["Account ID"]) {
                id.push(e["Account ID"])
            }
            if(e["Status"] && status.includes(e["Status"])) {
                const status_id = statusData.find((x) => x.status_name === e["Status"]);
                id.push(status_id.id);
            }
        });
        update.forEach((e) => {
            if(e["Account ID"]) {
                id.push(e["Account ID"])
            }
            if(e["Remarks"]) {
                id.push(e["Remarks"]);
            } else if(e["Remarks"] === undefined) {
                id.push('');
            }
        })
        const historyValues  = update.map((e) => {
            if(e["Status"]) {
                const status_id = statusData.find((x) => x.status_name === e["Status"]);
                e["Status"] = status_id.id;
            }
            const valuesArray = Object.values(e);
            valuesArray.push('IMPORT UPDATE', new Date());
            return valuesArray;
        })
        console.log(historyValues);
        db.query(insert_query,[...id, ...update.map((e) => e["Account ID"])], (err,result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({ message : 'Database error.'});
            }
            if(result.affectedRows > 0) {
                const historyQuery = "INSERT INTO order_history (accountid, status, remarks, action, created_at) VALUES ?"
                db.query(historyQuery, [historyValues], async(historyError, historyResult) => {
                    if(historyError) {
                        console.log(historyError);
                        return res.status(500).json({ message : 'Error while inserting history data'})
                    }
                    if(historyResult) {
                        console.log('history result',historyResult)
                        return res.status(200).json({ message : 'Status snd history Imported successfully!'});
                    }
                })
            }
        })
    })
})

module.exports = { putRoutes : router }