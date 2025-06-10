require("dotenv").config(); // Load secret key from .env

// Helper function to build filter conditions based on query parameters.
function buildFilterConditions(query) {
    let conditions = [];
    let valueParams = [];
    if(query.status) {
        conditions.push(`status = ?`);
        valueParams.push(query.status);
    }
    if(query.state) {
        conditions.push(`state = ?`);
        valueParams.push(query.state);
    }
    if(query.accountId) {
        conditions.push(`accountid = ?`);
        valueParams.push(query.accountId);
    }
    if(query.clientId) {
        conditions.push(`clientid = ?`);
        valueParams.push(query.clientId);
    }
    if(query.phoneNumber) {
        conditions.push(`customerPhone = ?`);
        valueParams.push(query.phoneNumber);
    }
    if(query.from && query.to) {
        conditions.push(`complaintDate >= ? AND complaintDate <= ?`);
        valueParams.push(query.from, query.to);
    }
    return {conditions, valueParams}
}

function updateImportQuery(tableName, param) {
    let caseStatus = '';
    let caseRemarks = '';

    param.forEach(() => {
        caseStatus += ' WHEN ? THEN ? ';
        caseRemarks += ' WHEN ? THEN ? ';
    })
    const accountIdlist = param.map(() => '?').join(",");

    return `
    UPDATE ${tableName}
    SET status = CASE accountid ${caseStatus} END,
    remarks = CASE accountid ${caseRemarks} END
    WHERE accountid IN (${accountIdlist});
    `;
}

function checkDuplicates (input) {
    let temp = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] === input[j]) {
                temp.push(input[i]);
            }
        }
    }
    return temp;
}

function authenticateToken(req, res, next) {
    const header = req.headers['authorization'];
    console.log(header)
    if (!header) {
        return res.status(401).send('Authorization header missing');
    }
    //Authorization header format 'Bearer <token>'
    const token = header.split(' ')[1];
    if(!token) {
        return res.status(401).send('No Token Used ')
    }
    if(process.env.AUTH_KEY === token) {
        return next();
    } else {
        return res.status(401).json({message : 'Invalid Token'});
    }
}

module.exports = { buildFilterConditions, updateImportQuery, checkDuplicates, authenticateToken }