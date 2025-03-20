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

function updateImportQuery(tableName,values, param) {
    let caseStatus = '';
    let caseRemarks = '';
    let accountIds = [];

    param.forEach((entry) => {
        accountIds.push(entry["Account ID"]);
        values.map((e) => {caseStatus += `WHEN ${entry["Account ID"]} THEN ${e} `});
        if(entry["Remarks"] === undefined) {
        caseRemarks += `WHEN ${entry["Account ID"]} THEN NULL `;
        } else {
            caseRemarks += `WHEN ${entry["Account ID"]} THEN '${entry["Remarks"]}'`;
        }
    })
    const accountIdlist = accountIds.join(", ");

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

module.exports = { buildFilterConditions, updateImportQuery, checkDuplicates }