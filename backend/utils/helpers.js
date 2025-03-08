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
        valueParams.push(query.status);
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
    return {conditions, valueParams}
}

module.exports = { buildFilterConditions }