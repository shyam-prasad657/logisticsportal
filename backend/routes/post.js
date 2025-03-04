const express = require('express');
const db = require('../config/db');
const router = express.Router();

// API Route to Handle Data Submission
const tableName = '`test-userdb`';
router.post('/submit', (req, res) => {
    const {name, phone, accountid, date, clientid, mfi, branch, state, vendor, issue} = req.body;
  
    if (!name || !phone || !accountid || !name || !phone || !accountid || !date || !clientid || !mfi || !branch || !state || !vendor) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }
    const query = `INSERT INTO ${tableName} (customerName, customerPhone, accountid, complaintDate, clientid, mfi, branch, state, vendorName, issue) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, phone, accountid, date, clientid, mfi, branch, state, vendor, issue], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Database error.' });
      }
  
      res.status(200).json({ message: 'Data saved successfully!' });
    });
  });

  //import(excel) - Add Complaint
router.post('/import-excel', (req, res) => {
    const users = req.body.users;
    if(!users || users.length === 0){
        return res.status(400).json({message : "No Data Received" });
    }
    // Check for missing mandatory fields in each user entry
    for (let user of users) {
        if (!user["Complaint Date*"] || !user["Customer Name*"] || !user["Client ID*"] || !user["Account ID*"] || !user["Customer Phone Number*"] || !user["MFI*"] || !user["Branch*"] || !user["State*"] || !user["Vendor Name*"]) {
            return res.status(400).json({ message: 'Please fill in all mandatory fields (marked with *)' });
        }
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
    const stateMapping = {
        "Tamil Nadu" : 1,
        "Kerala" : 2,
        "Telangana" : 3,
        "Karnataka" : 4
    }
    const vendorMapping = {
        "Prestige" : 1,
        "Preethi" : 2,
        "Bajaj" : 3,
        "Rico" : 4,
        "Vivo" : 5,
        "Samsung" : 6,
        "Whirlpool" : 7,
        "Haier" : 8,
        "Hero" : 9,
    }
    const branchMapping = {	
        "Mylapore" : 1,
        "Ernakulam" : 2,
        "Madhapur" : 3,
        "Kochi" : 4,
        "Coimbatore" : 5,
        "Mysore" : 6,
        "Madurai" : 7,
        "Salem" : 8,
        "Hyderabad" : 9,
        "Thiruvananthapuram" : 10
    }
    const mfiMapping = {
        "SBIK" : 1,	
        "KVBK" : 2,	
        "HDFK" : 3,	
        "ICIK" : 4,	
        "AXIK" : 5,	
        "SYNK" : 6,	
        "FDRK" : 7,	
        "PNBK" : 8,	
        "UBIK" : 9,	
        "IDFK" : 10
    }
    let validationErrors = [];
    users.forEach((user, index) => {
        //check if State is valid
        if(user["State*"] && !stateMapping[user["State*"]]) {
            validationErrors.push({
                row : index + 1,
                field : "State*",
                value : user["State*"],
                message : `Invalid State: '${user["State*"]} not found in master table`
            })
        }
        //check if Branch is valid
        if(user["Branch*"] && !branchMapping[user["Branch*"]]) {
            validationErrors.push({
                row : index + 1,
                field : "Branch*",
                value : user["Branch*"],
                message : `Invalid Branch: '${user["Branch*"]} not found in master table`
            })
        }
        //check if MFI is valid
        if(user["MFI*"] && !mfiMapping[user["MFI*"]]) {
            validationErrors.push({
                row : index + 1,
                field : "MFI*",
                value : user["MFI*"],
                message : `InvalidMFI: '${user["MFI*"]} not found in master table`
            })
        }
        //check if Vendor Name is valid
        if(user["Vendor Name*"] && !vendorMapping[user["Vendor Name*"]]) {
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
            if(excelCol === "State*" && stateMapping[value]) {
                return stateMapping[value]
            }
            //Convert Branch Name to id
            if(excelCol === "Branch*" && branchMapping[value]) {
                return branchMapping[value]
            }
            //Convert MFI Name to id
            if(excelCol === "MFI*" && mfiMapping[value]) {
                return mfiMapping[value]
            }
            //Convert Vendor Name to id
            if(excelCol === "Vendor Name*" && vendorMapping[value]) {
                return vendorMapping[value]
            }
            return value;
        })
    )
    console.log(values)
    const sql = `INSERT INTO ${tableName} (${Object.values(columnMapping).join(", ")}) VALUES ?`;

    db.query(sql, [values], (err, result) => {
        if(err) {
            console.error("Error inserting Data: ", err);
            return res.status(500).json({ message : "Database error"});
        }
        res.json({ message: "Data imported Succesfully", inserted: result.affectedRows})
    })
})

module.exports = { postRoutes : router }