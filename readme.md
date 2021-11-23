<h1>Mysql Improve</h1>
Node.js용 MySQL 모듈 사용 간편화(Connection Pool 전용)

[필수 항목]

* Node.js v12 above



[사용 방법]

* mysql_improve 모듈 폴더를 복사하여 프로젝트에 붙여넣는다.
* DB 설정파일(dbConfig.json)과 SQL 파일(sql.json)을 작성하여 프로젝트 내부에 위치 시킨다.
* 아래의 JavaScript 항목의 코드를 참고하여 모듈 사용



[모듈 추가 예시]

```
your-project
    └ config/
    	└ dbConfig.json
    	└ sql.json
    └ node_modules/
    └ libs/
    	└ mysql_improve/
    └ index.js
    └ package-lock.json
    └ package.json
```



[dbConfig.json]

```json
{
	"connectionLimit": 50,
    "host": "Your MySQL Addresss",
    "user": "MySQL User Account",
    "password": "MySQL User Password",
    "database": "MySQL DataBase Name"
}
```



[sql.json]

```json
{
    "getNow": "SELECT NOW()"
}
```



[JavaScript]

```javascript
const mysql = require('./libs/mysql_improve');

async function startApp() {
    // MySQL Connection Settings
    mysql.dbConfig('./config/dbConfig.json'); // dbConfig.json FilePath
    
    // Read SQL JSON File
    var sql = mysql.getSQLFile('./config/sql.json'); // sql.json FilePath
    
    // SQL Query Start
    var result = await mysql.query(sql.getNow); // Return Array()
    /**
    * [ RowDataPacket { 'NOW()': 2021-11-23T08:11:43.000Z } ]
    */
}
```



[모듈 빌드 방법]

```bash
# node_modules Install
npm install

# Module Build
npm run build

# 모듈 빌드 시 dist 폴더 생성
```

