const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(bodyParser.json());

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
    const { name, phone ,id } = req.body;
  
    if (!name || !phone || !id) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }
  
    const query = 'INSERT INTO userdb (customerName, customerPhone, accountid) VALUES (?, ?, ?)';
    db.query(query, [name, phone, id], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Database error.' });
      }
  
      res.status(200).json({ message: 'Data saved successfully!' });
    });
  });

  // API to update status
app.put('/update-status', (req, res) => {
    const  { accountId, updatedStatus } = req.body;
    console.log('Request Body:', req.body);
    if(!accountId, !updatedStatus) {
        return res.status(400).json({ message: 'Account ID and Status are required'});
    }
    const query = `UPDATE userdb SET status = ? WHERE accountid = ?`;
    db.query(query, [updatedStatus, accountId], (err,result) => {
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
app.listen(8081, ()=> {
    console.log("listening...");
})