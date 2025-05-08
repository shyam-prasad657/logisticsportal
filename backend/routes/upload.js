const express = require('express');
const db = require('../config/db');
const router = express.Router();
const multer = require('multer');
const tableName = '`test_userdb`';

//Multer setup
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'uploads/dc/');
    },
    filename : function (req, file, cb) {
        const accountId = req.params.accountId;
        const uniqueName = Date.now() + '-' + accountId + '-' + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage : storage})

router.put('/upload/:accountId', upload.single('file'), (req,res) => {
    const accountId = req.params.accountId;
    const filePath = `uploads/dc/${req.file.filename}`;
    console.log('backend console filepath: ',filePath);
    const dbQuery = `UPDATE ${tableName} SET dc_path = ?, status = ? WHERE accountid = ?`;
    db.query(dbQuery, [filePath, 6, accountId], (err, result) => {
        if(err) {
            return res.status(500).json({message : 'Error while updating DC'})
        }
        if(result.affectedRows > 0) {
        const historyQuery = `INSERT INTO order_history (accountid, action, status, created_at) VALUES (?, ?, ?, NOW())`;
            db.query(historyQuery, [accountId, 'UPDATE', 6], (historyErr, historyResult) => {
                if(historyErr) {
                    return res.status(500).json({message : 'Error while updating history'})
                }
                return res.status(200).json({message : `DC & history updated against ${accountId}`})
            })
        }
    })
})

module.exports = { uploadRoutes : router }