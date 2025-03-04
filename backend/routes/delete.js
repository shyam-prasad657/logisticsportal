  const express = require('express');
  const db = require('../config/db');
  const router = express.Router();

//Delete
router.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    // Validate the ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID provided' }); // 400 - Bad Request
    }   
    const sql = 'DELETE FROM `test-userdb` WHERE id = ?';
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

module.exports = { deleteRoutes : router }