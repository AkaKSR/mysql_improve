const mysql = require('mysql');
const dbConfig = require('../../env/env');
const { Error } = require('./handler');
const path = require('path');
var env = {};
var dbConn;

function dbConnection() {
    return mysql.createPool({
        connectionLimit: env.connectionLimit,
        host: env.host,
        user: env.user,
        password: env.password,
        database: env.database
    });
}

async function query(queryString, isEnd) {
    dbConn = await dbConnection();

    return new Promise(async (resolve, reject) => {
        dbConn.getConnection(async (err, conn) => {
            if (err) resolve(Error(err));

            conn.query(queryString, async (err, res, fields) => {
                conn.release();
                
                if (err) resolve(Error(err));
                
                if (isEnd) {
                    conn.release();
                    dbConn.end();
                }

                resolve(res);
            });
        });
    });
}

function loadConfig(fileName) {
    env = dbConfig.loadConfigFile(fileName);
}

function loadConfigJSON(jsonData) {
    env = dbConfig.loadConfigJSON(jsonData);
}


module.exports = {
    query,
    dbConfig: loadConfig,
    dbConfigJSON: loadConfigJSON
}