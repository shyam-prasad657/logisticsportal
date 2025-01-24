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

app.listen(8081, ()=> {
    console.log("listening...");
})