const mysql = require('./lib/improve/conn');

const sql = require('./lib/improve/sql').getJSONFile('./config/sql.json');

async function startApp() {
    mysql.dbConfig('dbConfig.json');
    var result = await mysql.query(sql.getRequest);
    console.log(result);
}

// startApp(); // 개발용 실행 매소드

exports.dbConfig = function dbConfig(fileName) {
    mysql.dbConfig(fileName);
    return mysql;
}

exports.getSQLFile = function getSQLFile(sqlJSONFile) {
    return require('./lib/improve/sql').getJSONFile(sqlJSONFile);
}

exports.query = async function query(queryString) {
    var result = await mysql.query(queryString);
    return result;
}