const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const paginate = require('express-paginate');

const app = express();
app.use(cors())
app.use(bodyParser.json());
// Set default limit to 10 and max limit to 50
app.use(paginate.middleware(10));

const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : 'complaintportal',
})
//get() method
app.get('/', (req, res)=> {
    return res.json("From Backend Side");
})
app.get('/userdb', (req, res)=> {
    const sql = "SELECT * FROM userdb";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
app.get('/status', (req, res)=> {
    const sql = "SELECT * FROM status";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
app.get('/states', (req, res)=> {
    const sql = "SELECT * FROM states";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
app.get('/mfi', (req, res)=> {
    const sql = "SELECT * FROM mfi";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
app.get('/branch', (req, res)=> {
    const sql = "SELECT * FROM branch";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
app.get('/vendor', (req, res)=> {
    const sql = "SELECT * FROM vendor";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})

// API Route to Handle Data Submission
app.post('/submit', (req, res) => {
    const {name, phone, accountid, date, clientid, mfi, branch, state, vendor, issue} = req.body;
  
    if (!name || !phone || !accountid || !name || !phone || !accountid || !date || !clientid || !mfi || !branch || !state || !vendor) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }
  
    const query = 'INSERT INTO userdb (customerName, customerPhone, accountid, complaintDate, clientid, mfi, branch, state, vendorName, issue) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, phone, accountid, date, clientid, mfi, branch, state, vendor, issue], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Database error.' });
      }
  
      res.status(200).json({ message: 'Data saved successfully!' });
    });
  });

  // API to update status
app.put('/update-status', (req, res) => {
    const  { accountId, remarks, updatedStatus} = req.body;
    console.log('Request Body:', req.body);
    if(!accountId, !updatedStatus) {
        return res.status(400).json({ message: 'Account ID and Status are required'});
    }
    const query = `UPDATE userdb SET status = ? , remarks = ? WHERE accountid = ?`;
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

//Delete
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    // Validate the ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID provided' }); // 400 - Bad Request
    }   
    const sql = 'DELETE FROM userdb WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: 'Internal server error'}); // 500 - Internal Server Error
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' }); // 404 - Not Found
        }
        return res.status(200).json({ message: 'Record deleted successfully' }); // 200 - OK
    })
})

//import(excel) - Add Complaint
app.post('/import-excel', (req, res) => {
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
    const sql = `INSERT INTO userdb (${Object.values(columnMapping).join(", ")}) VALUES ?`;

    db.query(sql, [values], (err, result) => {
        if(err) {
            console.error("Error inserting Data: ", err);
            return res.status(500).json({ message : "Database error"});
        }
        res.json({ message: "Data imported Succesfully", inserted: result.affectedRows})
    })
})


// Helper function to build filter conditions based on query parameters.
function buildFilterConditions(query) {
    let conditions = [];
    let valueParams = [];
    if(query.status) {
        conditions.push(`status = ?`);
        valueParams.push(query.status);
    }
    if(query.state) {
        conditions.push(`state = ?`);
        valueParams.push(query.status);
    }
    if(query.accountId) {
        conditions.push(`accountid = ?`);
        valueParams.push(query.accountId);
    }
    if(query.clientid) {
        conditions.push(`clientid = ?`);
        valueParams.push(query.clientId);
    }
    if(query.phoneNumber) {
        conditions.push(`customerPhone = ?`);
        valueParams.push(query.phoneNumber);
    }
    return {conditions, valueParams}
}
//Dynamically calling method
//report.js
app.get('/users', (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 10; //express-paginate
    const offset = (page - 1) * limit; //automatically computed
    const {conditions, valueParams} = buildFilterConditions(req.query);

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const tableName = '`test-userdb`';
    // First, count the total rows matching the filters for pagination
    const countQuery = `SELECT COUNT(*) AS count FROM ${tableName} ${whereClause}`;
    db.query(countQuery,valueParams, (err, countResult) => {
        if (err) return next(err);

        //Get total record count to compute total pages
        const dataQuery = `SELECT * from ${tableName} ${whereClause} LIMIT ? OFFSET ?`;
        db.query(dataQuery,[...valueParams, limit,offset], (err, results) => {
            if (err) return next(err);
            console.log(countResult)
            const itemCount = countResult[0].count;
            const pageCount = Math.ceil(itemCount / limit);

            res.json({
                data : results, 
                itemCount,
                totalPages : pageCount
            })
        })
    })
})

app.listen(8081, ()=> {
    console.log("listening...");
})