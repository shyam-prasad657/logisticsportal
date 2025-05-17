const express = require('express');
const db = require('../config/db');
const router = express.Router();
const tableName = '`test_userdb`';
const { fetchStates, fetchMFI, fetchBranch, fetchVendor } = require('./get');
const { checkDuplicates } = require('../utils/helpers');

// API Route to Handle Data Submission
router.post('/submit', (req, res) => {
    // const {name, phone, accountid, date, clientid, mfi, branch, state, vendor, issue} = req.body;
    const {formData} = req.body
    
    if (!formData.name || !formData.phone || !formData.accountid || !formData.phone || !formData.accountid || !formData.date || !formData.clientid || !formData.mfi || !formData.branch || !formData.state || !formData.vendor) {
        return res.status(400).json({ message: 'Name and phone number are required.' });
    }
    const checkQuery = `SELECT accountid FROM ${tableName} WHERE accountid = ?`;
    db.query(checkQuery, [formData.accountid], (err, result) => {
        if (err) {
            console.error("Error checking Account IDs", err);
            return res.status(500).json({ message : "Database error while checking account id"});
        }
        if(result.length > 0) {
            return res.status(400).json({
                message : "Account ID already exists",
                duplicate : formData.account
            })
        }

    const query = `INSERT INTO ${tableName} (customerName, customerPhone, accountid, complaintDate, clientid, mfi, branch, state, vendorName, issue) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [formData.name, formData.phone, formData.accountid, formData.date, formData.clientid, formData.mfi, formData.branch, formData.state, formData.vendor, formData.issue], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Database error.' });
        }
        if(result.affectedRows > 0) {
            const historyQuery = 'INSERT INTO order_history (accountid, action, created_at) VALUES (?, ?, NOW())';
            db.query(historyQuery, [formData.accountid, 'CREATE'], (historyError,  historyResult) => {
                if(historyError) {
                    console.log(historyError);
                    return res.status(500).json({ message : 'Error while inserting history data'})
                }
                if(historyResult) {
                    console.log('result', historyResult)
                    return res.status(200).json({ message : 'Order Created and added in history successfully!'});
                }
            })
        }
    })})
});

//import(excel) - Add Complaint
router.post('/import-excel/add', async (req, res) => {
    const users = req.body.users;
    const states = await fetchStates();
    const vendor = await fetchVendor();
    const mfi = await fetchMFI();
    const branch = await fetchBranch();
    const state_name = states.map((e) => e.state_name);
    const branch_name = branch.map((e) => e.branch_name);
    const mfi_name = mfi.map((e) => e.mfi_name);
    const vendor_name = vendor.map((e) => e.vendor_name);

    // console.log(states.state_name['Karnataka'].id)
    if(!users || users.length === 0){
        return res.status(400).json({message : "No Data Received" });
    }
    // Check for missing mandatory fields in each user entry
    for (let user of users) {
        if (!user["Complaint Date*"] || !user["Customer Name*"] || !user["Client ID*"] || !user["Account ID*"] || !user["Customer Phone Number*"] || !user["MFI*"] || !user["Branch*"] || !user["State*"] || !user["Vendor Name*"]) {
            return res.status(400).json({ message: 'Please fill in all mandatory fields (marked with *)' });
        }
    }
    const accountids = users.map((e) => e['Account ID*']);
    const temp = checkDuplicates(accountids);
    if( temp.length > 0) {
        return res.status(500).json({message : 'Duplicate Account IDs in input file', duplicates : temp})
    }
    const checkQuery = `SELECT accountid FROM ${tableName} WHERE accountid IN (?)`;
    db.query(checkQuery, [accountids], (err, result) => {
        if (err) {
            console.error("Error checking Account IDs", err);
            return res.status(500).json({ message : "Database error while checking account id"});
        }
        const existingAccountIds = result.map(row => row.accountid);
        if(result.length > 0) {
            return res.status(400).json({
                message : "Account ID already exists",
                duplicates : existingAccountIds
            })
        }
    
    //Column Mapping: Excel -> SQL Fields
    const columnMapping = {
        "Complaint Date*" : "complaintDate",
        "Customer Name*" : "customerName",
        "Client ID*" : "clientid",
        "Account ID*" : "accountid",
        "Customer Phone Number*" : "customerPhone",
        "MFI*" : "mfi",
        "Branch*" : "branch",
        "State*" : "state",
        "Vendor Name*" : "vendorName",
        "Issue" : "issue"
    }
    let validationErrors = [];
    users.forEach((user, index) => {
        //check if State is valid
        if(user["State*"] && !state_name.includes(user["State*"])) {
            validationErrors.push({
                row : index + 1,
                field : "State*",
                value : user["State*"],
                message : `Invalid State: '${user["State*"]} not found in master table`
            })
        }
        //check if Branch is valid
        if(user["Branch*"] && !branch_name.includes(user["Branch*"])) {
            validationErrors.push({
                row : index + 1,
                field : "Branch*",
                value : user["Branch*"],
                message : `Invalid Branch: '${user["Branch*"]} not found in master table`
            })
        }
        //check if MFI is valid
        if(user["MFI*"] && !mfi_name.includes(user["MFI*"])) {
            validationErrors.push({
                row : index + 1,
                field : "MFI*",
                value : user["MFI*"],
                message : `InvalidMFI: '${user["MFI*"]} not found in master table`
            })
        }
        //check if Vendor Name is valid
        if(user["Vendor Name*"] && !vendor_name.includes(user["Vendor Name*"])) {
            validationErrors.push({
                row : index + 1,
                field : "Vendor Name*",
                value : user["Vendor Name*"],
                message : `Invalid Vendor Name: '${user["Vendor Name*"]} not found in master table`
            })
        }
    })
    // If there are validation errors, return them
    if (validationErrors.length > 0) {
        return res.status(400).json({
            message: "Validation errors found",
            errors: validationErrors
        });
    }
    // Convert Excel data into SQL-compatible format
    const values = users.map((val) => 
        Object.keys(columnMapping).map((excelCol) => {
            let value = val[excelCol]; // Get the value from Excel

            //Convert State Name to id
            if(excelCol === "State*" && state_name.includes(value)) {
                const temp_state = states.find((e) => e.state_name === value);
                return temp_state.id
            }
            //Convert Branch Name to id
            if(excelCol === "Branch*" && branch_name.includes(value)) {
                const temp_branch = branch.find((e) => e.branch_name === value);
                return temp_branch.id
            }
            //Convert MFI Name to id
            if(excelCol === "MFI*" && mfi_name.includes(value)) {
                const temp_mfi = mfi.find((e) => e.mfi_name === value);
                return temp_mfi.id
            }
            //Convert Vendor Name to id
            if(excelCol === "Vendor Name*" && vendor_name.includes(value)) {
                const temp_vendor = vendor.find((e) => e.vendor_name === value);
                return temp_vendor.id
            }
            return value;
        })
    )
    console.log('Values: ',values)
    const sql = `INSERT INTO ${tableName} (${Object.values(columnMapping).join(", ")}) VALUES ?`;

    db.query(sql, [values], (err, result) => {
        if(err) {
            console.error("Error inserting Data: ", err);
            return res.status(500).json({ message : "Database error"});
        }
        if(result.affectedRows > 0) {
            const accountidHistory = users.map((e) => e["Account ID*"]);
            const id = accountidHistory.map((e) => [e, 'IMPORT CREATE', new Date()])
            console.log('id',id)
            const historyQuery = 'INSERT INTO order_history (accountid, action, created_at) VALUES ?';
            db.query(historyQuery, [id], (historyError, historyValues) => {
                if(historyError) {
                    console.log('history error',historyError);
                    return res.status(500).json({ message : 'Error while inserting history data'})
                }
            if(historyValues) {
                console.log('result', historyValues)
                return res.status(200).json({ message: "Data imported and history updated Succesfully", inserted: result.affectedRows});
            }
            })
        }
    })
})
})

//Update Master Table
router.post('/master/mfi', (req, res) => {
    const mfi = req.query.value;
    if(!mfi) {
        return res.status(400).json({ message: 'MFI not entered' }); // 400 - Bad Request
    }
    let trimmedName = mfi.trim();
    const query = 'INSERT into mfi (mfi_name) VALUES (?)';
    db.query(query, [trimmedName], (err, result) => {
        if(err) {
            console.log('mfi error',err);
            if(err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: `${mfi} already exist in master` });
            } else {
            return res.status(500).json({ message : 'Error while inserting MFI'});
            }
        }
        return res.status(200).json({message : 'MFI added succesfully'})
    })
})

module.exports = { postRoutes : router }