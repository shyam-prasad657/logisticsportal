const express = require('express');
const db = require('../config/db');
const router = express.Router();
const tableName = '`test_userdb`';

//Delete Order
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

//Delete Master
//MFI
router.delete('/master/mfi/delete', (req, res) => {
    const { mfi } = req.body;
    console.log(mfi);
    db.query('SELECT * from test_userdb WHERE mfi = ?',[mfi.id], (err, result) => {
        if(err) {
            return res.status(500).json({message : 'Error while checking mfi'})
        }
        console.log(result);
        if(result.length > 0) {
            return res.status(200).json({message : `MFI ${mfi.mfi_name} already used`})
        } else {
            const deleteQuery = 'DELETE FROM mfi WHERE id = ?';
            db.query(deleteQuery, [mfi.id], (deleteErr, deleteResult) => {
                if(deleteErr) {
                    return res.status(500).json({message : 'Error while deleting MFI'})
                }
                return res.status(200).json({message : `MFI ${mfi.mfi_name} deleted succesfully`})
            })
        }
    });
})

//Branch
router.delete('/master/branch/delete', (req, res) => {
    const { branch } = req.body;
    console.log(branch);
    db.query('SELECT * from test_userdb WHERE branch = ?',[branch.id], (err, result) => {
        if(err) {
            return res.status(500).json({message : 'Error while checking branch'})
        }
        console.log(result);
        if(result.length > 0) {
            return res.status(200).json({message : `Branch ${branch.branch_name} already used`})
        } else {
            const deleteQuery = 'DELETE FROM branch WHERE id = ?';
            db.query(deleteQuery, [branch.id], (deleteErr, deleteResult) => {
                if(deleteErr) {
                    return res.status(500).json({message : 'Error while deleting branch'})
                }
                return res.status(200).json({message : `Branch ${branch.branch_name} deleted succesfully`})
            })
        }
    });
})

//State
router.delete('/master/state/delete', (req, res) => {
    const { state } = req.body;
    console.log(state);
    db.query('SELECT * from branch WHERE state_id = ?',[state.id], (err, result) => {
        if(err) {
            return res.status(500).json({message : 'Error while checking state'})
        }
        console.log(result);
        if(result.length > 0) {
            return res.status(200).json({message : `State ${state.state_name} already used in branch table`})
        } else {
            const deleteQuery = 'DELETE FROM states WHERE id = ?';
            db.query(deleteQuery, [state.id], (deleteErr, deleteResult) => {
                if(deleteErr) {
                    return res.status(500).json({message : 'Error while deleting state'})
                }
                return res.status(200).json({message : `State ${state.state_name} deleted succesfully`})
            })
        }
    });
})

//Vendor
router.delete('/master/vendor/delete', (req, res) => {
    const { vendor } = req.body;
    console.log(vendor);
    db.query('SELECT * from test_userdb WHERE vendorName = ?',[vendor.id], (err, result) => {
        if(err) {
            return res.status(500).json({message : 'Error while checking vendor'})
        }
        console.log(result);
        if(result.length > 0) {
            return res.status(200).json({message : `Vendor ${vendor.vendor_name} already used`})
        } else {
            const deleteQuery = 'DELETE FROM vendor WHERE id = ?';
            db.query(deleteQuery, [vendor.id], (deleteErr, deleteResult) => {
                if(deleteErr) {
                    return res.status(500).json({message : 'Error while deleting vendor'})
                }
                return res.status(200).json({message : `Vendor ${vendor.vendor_name} deleted succesfully`})
            })
        }
    });
})

//Status
router.delete('/master/status/delete', (req, res) => {
    const { status } = req.body;
    console.log(status);
    db.query('SELECT * from order_history WHERE status = ?',[status.id], (err, result) => {
        if(err) {
            return res.status(500).json({message : 'Error while checking status'})
        }
        console.log(result);
        if(result.length > 0) {
            return res.status(200).json({message : `status ${status.status_name} already used`})
        } else {
            const deleteQuery = 'DELETE FROM status WHERE id = ?';
            db.query(deleteQuery, [status.id], (deleteErr, deleteResult) => {
                if(deleteErr) {
                    return res.status(500).json({message : 'Error while deleting status'})
                }
                return res.status(200).json({message : `Status ${status.status_name} deleted succesfully`})
            })
        }
    });
})

module.exports = { deleteRoutes : router }