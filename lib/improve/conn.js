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

function query(queryString, isEnd) {
    if (dbConn === null) {
        dbConn = dbConnection();
    }
    return new Promise(async (resolve, reject) => {
        dbConn.getConnection(async (err, conn) => {
            if (err) resolve(Error(err));

            conn.query(queryString, async (err, res, fields) => {
                if (err) resolve(Error(err));

                conn.release();
                
                if (isEnd) {
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


module.exports = {
    query,
    dbConfig: loadConfig
}