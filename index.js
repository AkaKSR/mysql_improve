const mysql = require('./lib/improve/conn');

exports.dbConfig = function dbConfig(fileName) {
    mysql.dbConfig(fileName);
    return mysql;
}

exports.dbConfigJSON = function dbConfigJSON(jsonData) {
    mysql.dbConfigJSON(jsonData);
    return mysql;
}

exports.getSQLFile = function getSQLFile(sqlJSONFile) {
    return require('./lib/improve/sql').getJSONFile(sqlJSONFile);
}

exports.query = async function query(queryString, isEnd) {
    if (isEnd == null) {
        isEnd = false;
    }
    var result = await mysql.query(queryString, isEnd);
    return result;
}