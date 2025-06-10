const express = require('express');
const db = require('../config/db');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../utils/helpers');
const tableName = '`test_userdb`';

//Multer setup
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        let folder = '';
        switch(file.fieldname) {
            case 'pod1':
                folder = 'uploads/pod1/';
                break;
            case 'pod2':
                folder = 'uploads/pod2/';
                break;
            case 'pod3':
                folder = 'uploads/pod3/';
                break;
            case 'dcfile':
                folder = 'uploads/dc/';
                break;
            default:
                folder = 'uploads/others/';
        }
        cb(null, folder);
    },
    filename : function (req, file, cb) {
        const accountId = req.body.accountId;
        let uniqueName = '';
        const extension = file.originalname.split('.').pop(); //Get original extension
        switch(file.fieldname) {
            case 'pod1':
                uniqueName = `${Date.now()}-${accountId}-pod1.${extension}`;
                break;
            case 'pod2':
                uniqueName = `${Date.now()}-${accountId}-pod2.${extension}`;
                break;
            case 'pod3':
                uniqueName = `${Date.now()}-${accountId}-pod3.${extension}`;
                break;
            case 'dcfile':
                uniqueName = `${Date.now()}-${accountId}-dc.${extension}`;
                break;
            default:
                uniqueName = `${Date.now()}-${accountId}-others.${extension}`;
        }
        cb(null, uniqueName);
    },
});

const upload = multer({ storage : storage})

router.put('/upload',authenticateToken, upload.single('dcfile'), (req,res) => {
    const accountId = req.body.accountId;
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
});

const multiUpload = upload.fields([
    { name : 'pod1', maxCount:1 },
    { name : 'pod2', maxCount:1 },
    { name : 'pod3', maxCount:1 }
])
router.post('/upload-pod',authenticateToken, multiUpload, (req, res) => {
    const accountId = req.body.accountId;
    const remarks = req.body.remarks;
    let deliveryDate = req.body.deliveryDate;
    const files = req.files;
    const pod1 = `uploads/pod1/${files.pod1[0].filename}`;
    const pod2 = `uploads/pod2/${files.pod2[0].filename}`;
    const pod3 = `uploads/pod3/${files.pod3[0].filename}`;
    if(!deliveryDate) {
        deliveryDate = new Date();
    }

    if( !files || !accountId) {
        return res.status(400).json({message : 'Missing Account ID or POD files'})
    }
    const query = `INSERT INTO pod_files (accountid, pod_1, pod_2, pod_3, delivery_date) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [accountId, pod1, pod2, pod3, deliveryDate], (err, result) => {
        if(err) {
            console.log(err)
            return res.status(500).json({message : 'Error while uploading images'})
        }
        if(result.affectedRows > 0) {
            const historyQuery = `INSERT INTO order_history (accountid, action, remarks, status, created_at) VALUES (?, ?, ?, ?, NOW())`;
            db.query(historyQuery, [accountId, 'UPDATE', remarks, 3], (historyErr, historyResult) => {
                if(historyErr) {
                    return res.status(500).json({message : 'Error while updating history'})
                }
                if(historyResult.affectedRows > 0) {
                    const orderQuery = `UPDATE ${tableName} SET status = ? , remarks = ? WHERE accountid = ?`
                    db.query(orderQuery, [3, remarks, accountId], (orderErr, orderResult) => {
                        if(orderErr) {
                            return res.status(500).json({message : 'Error while updating user table'})
                        }
                        if(orderResult) {
                        return res.status(200).json({message : 'POD & history updated'});
                        }
                    })
                }
            })
        }
    })
    
})

module.exports = { uploadRoutes : router }