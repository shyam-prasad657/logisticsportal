const express = require('express');
const db = require('../config/db');
const { buildFilterConditions, authenticateToken } = require('../utils/helpers');
const ExcelJS = require('exceljs');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const router = express.Router();
const tableName = '`test_userdb`';

// Function to fetch data from the database
const fetchData = (tableName) => {
    return new Promise((resolve, reject) => {
        let sql = '';
        if(tableName === 'branch') {
            sql = `
                SELECT 
                    branch.id, 
                    branch.branch_name, 
                    st.state_name AS state,
                    branch.state_id
                FROM branch
                JOIN states st ON branch.state_id = st.id
            `;
        } else {
        sql = `SELECT * FROM ${tableName} ORDER BY id ASC`;
        }
        db.query(sql, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

// Define routes
router.get('/test-userdb',authenticateToken, async (req, res) => {
    try {
        const data = await fetchData('test_userdb');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/status',authenticateToken, async (req, res) => {
    try {
        const data = await fetchData('status');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/states',authenticateToken, async (req, res) => {
    try {
        const data = await fetchData('states');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/mfi',authenticateToken, async (req, res) => {
    try {
        const data = await fetchData('mfi');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/branch',authenticateToken, async (req, res) => {
    try {
        const data = await fetchData('branch');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/vendor',authenticateToken, async (req, res) => {
    try {
        const data = await fetchData('vendor');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Dynamically calling method
//report.js
router.get('/users',authenticateToken, (req, res, next) => {
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
        const dataQuery = `
        SELECT 
            DATE_FORMAT(complaintDate, '%d/%m/%Y') AS frontend_date,
            customerName,
            clientid,
            accountid,
            customerPhone,
            s.status_name AS status,
            m.mfi_name AS mfi,
            b.branch_name AS branch,
            st.state_name AS state,
            issue,
            v.vendor_name AS vendor,
            remarks,
            dc_path
            FROM 
                ${tableName} 
            JOIN 
                status s ON test_userdb.status = s.id
            JOIN 
                states st ON test_userdb.state = st.id
            JOIN 
                vendor v ON test_userdb.vendorName = v.id
            JOIN 
                mfi m ON test_userdb.mfi = m.id
            JOIN 
                branch b ON test_userdb.branch = b.id
            ${whereClause} 
        LIMIT ? OFFSET ?`;
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
router.get('/export',authenticateToken, (req, res) => {
    const type = req.query.type; // Expected values: 'excel', 'csv', 'pdf'
    const {conditions, valueParams} = buildFilterConditions(req.query);
    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : '';

    const exportQuery = `
    SELECT 
    DATE_FORMAT(complaintDate, '%d/%m/%Y') AS Date,
    customerName AS Name,
    clientid AS 'client id',
    accountid AS 'account id',
    customerPhone AS Phone,
    s.status_name AS status,
    m.mfi_name AS mfi,
    b.branch_name AS branch,
    st.state_name AS state,
    issue,
    v.vendor_name AS vendor,
    remarks 
    FROM 
        test_userdb 
    JOIN 
        status s ON test_userdb.status = s.id
    JOIN 
        states st ON test_userdb.state = st.id
    JOIN 
        vendor v ON test_userdb.vendorName = v.id
    JOIN 
        mfi m ON test_userdb.mfi = m.id
    JOIN 
        branch b ON test_userdb.branch = b.id
    ${whereClause}`;
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

//Used under update.js
router.get('/getValue',authenticateToken, (req, res) => {
    const id = req.query.id;
    // console.log(id)
    const query = `SELECT
        customerName,
        clientid,
        customerPhone,
        s.status_name AS status,
        m.mfi_name AS mfi,
        b.branch_name AS branch,
        st.state_name AS state,
        issue
        FROM 
            test_userdb 
        JOIN 
            status s ON test_userdb.status = s.id
        JOIN 
            states st ON test_userdb.state = st.id
        JOIN 
            vendor v ON test_userdb.vendorName = v.id
        JOIN 
            mfi m ON test_userdb.mfi = m.id
        JOIN 
            branch b ON test_userdb.branch = b.id
        WHERE accountid = ?`;
        db.query(query, [id], (err, result) => {
            if(err) {
                return res.status(500).json({error : err.message, message : 'no such data found'})
            }
            if (result.length > 0) {
                return res.status(200).json({data : result})
            }
            if(result.length === 0) {
                return res.status(500).json({message : 'No such data found'})
            }
            console.log(result)
        });
        
})

//Under report.js to fetch order wise history
router.get('/reports/history' ,authenticateToken,(req, res) => {
    const id = req.query.id;
    console.log('ID : ',id);
    const query = `SELECT DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as created_at,
    action,remarks,
    s.status_name 
    FROM
        order_history 
    JOIN
        status s ON order_history.status = s.id 
    WHERE accountid = ? ORDER BY order_history.id DESC`;
    db.query(query, [id], (err, result) => {
        if(err) {
            return res.status(500).json({message : 'Database Error while fetching history'})
        }
        if(result.length > 0) {
            const podQuery =   `SELECT *,DATE_FORMAT(delivery_date, '%d/%m/%Y %H:%i:%s') as delivery_date from pod_files WHERE accountid = ?`;
            db.query(podQuery, [id], (PODerr, PODResult) => {
                if(PODerr) {
                    return res.status(500).json({message : 'Database Error while fetching POD'})
                }
                return res.status(200).json({list : result, pod : PODResult[0]})
            })
        }
    });
})

// Export functions to be used in `post.js`
module.exports = {
    fetchTestUserDB: () => fetchData('test_userdb'),
    fetchStatus: () => fetchData('status'),
    fetchStates: () => fetchData('states'),
    fetchMFI: () => fetchData('mfi'),
    fetchBranch: () => fetchData('branch'),
    fetchVendor: () => fetchData('vendor'),
    getRoutes : router // Exporting router as well
};



