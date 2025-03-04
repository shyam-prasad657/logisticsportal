const express = require('express');
const db = require('../config/db');
const { buildFilterConditions } = require('../utils/helpers');
const ExcelJS = require('exceljs');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const router = express.Router();

router.get('/userdb', (req, res)=> {
    const sql = "SELECT * FROM userdb";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
router.get('/test-userdb', (req, res)=> {
    const sql = "SELECT * FROM `test-userdb`";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
router.get('/status', (req, res)=> {
    const sql = "SELECT * FROM status";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
router.get('/states', (req, res)=> {
    const sql = "SELECT * FROM states";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
router.get('/mfi', (req, res)=> {
    const sql = "SELECT * FROM mfi";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
router.get('/branch', (req, res)=> {
    const sql = "SELECT * FROM branch";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})
router.get('/vendor', (req, res)=> {
    const sql = "SELECT * FROM vendor";
    db.query(sql, (err, data)=>{
        if(err) return res.json(data);
        return res.json(data);
    })
})

//Dynamically calling method
//report.js
const tableName = '`test-userdb`';
router.get('/users', (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 10; //express-paginate
    const offset = (page - 1) * limit; //automatically computed
    const {conditions, valueParams} = buildFilterConditions(req.query);

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
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

// GET /export endpoint to export data in Excel, CSV, or PDF formats.
router.get('/export', (req, res) => {
    const type = req.query.type; // Expected values: 'excel', 'csv', 'pdf'
    const {conditions, valueParams} = buildFilterConditions(req.query);
    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : '';

    const exportQuery = `SELECT * FROM ${tableName} ${whereClause}`;
    db.query(exportQuery, valueParams, async(err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (type === 'excel') {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Data');
            if (results.length > 0) {
              worksheet.columns = Object.keys(results[0]).map(key => ({ header: key, key }));
              results.forEach(row => worksheet.addRow(row));
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
            await workbook.xlsx.write(res);
            res.end();
          } else if (type === 'csv') {
            const fields = results.length > 0 ? Object.keys(results[0]) : [];
            const parser = new Parser({ fields });
            const csv = parser.parse(results);
            res.header('Content-Type', 'text/csv');
            res.attachment('data.csv');
            res.send(csv);
          } else if (type === 'pdf') {
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');
            doc.pipe(res);
            doc.fontSize(12);
            if (results.length > 0) {
              const headers = Object.keys(results[0]);
              // Draw header row
              doc.text(headers.join(' | '));
              doc.moveDown();
              // Draw each row
              results.forEach(row => {
                const rowData = headers.map(key => row[key]);
                doc.text(rowData.join(' | '));
              });
            } else {
              doc.text('No data found.');
            }
            doc.end();
          } else {
            res.status(400).json({ error: 'Invalid export type' });
          }
    })
})

module.exports = { getRoutes : router }



