const mysql = require('./lib/improve/conn');

const sql = require('./lib/improve/sql').getJSONFile('./config/sql.json');

async function startApp() {
    mysql.dbConfig('./config/dbConfig.json');
    var result = await mysql.query(sql.getRequest, false);
    console.log(result);
}

startApp(); // 개발용 실행 매소드