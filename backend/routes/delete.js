const express = require('express');
const db = require('../config/db');
const router = express.Router();
const tableName = '`test_userdb`';

//Delete
router.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    // Validate the ID
    if (!id) {
        return res.status(400).json({ message: 'Invalid ID provided' }); // 400 - Bad Request
    }   
    const sql = `DELETE FROM ${tableName} WHERE accountid = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: 'Internal server error'}); // 500 - Internal Server Error
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' }); // 404 - Not Found
        }
        if(result.affectedRows > 0) {
            const podSQL = `DELETE FROM pod_files WHERE accountid = ?`;
            db.query(podSQL, [id], (podErr, podResult) => {
                if (podErr) {
                    console.error(err);
                    return res.status(500).json({message: 'Error while deleting PODs'}); // 500 - Internal Server Error
                }
                if(podResult.affectedRows >= 0) {
                    const historySQL = `DELETE FROM order_history WHERE accountid = ?`;
                    db.query(historySQL, [id], (historyError, historyPod) => {
                        if(historyError) {
                            console.error(err);
                            return res.status(500).json({message: 'Error while deleting order history'}); // 500 - Internal Server Error
                        }
                        return res.status(200).json({ message: 'Record deleted successfully' }); // 200 - OK   
                    })
                }
            })
        }
    })
})

module.exports = { deleteRoutes : router }