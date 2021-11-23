const fs = require('fs');

var sql = {};

function getJSONFile(filePath) {
    var file = fs.readFileSync(filePath);
    sql = JSON.parse(file.toString('utf8'));

    return sql;
}

module.exports = { getJSONFile }