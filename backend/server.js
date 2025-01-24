const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : 'complaintportal',
})

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
app.listen(8081, ()=> {
    console.log("listening...");
})