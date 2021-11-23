const path = require('path');
const fs = require('fs');
var dbConfig = {
    connectionLimit: null,
    host: null,
    user: null,
    password: null,
    database: null
}

module.exports = {
    setEnv: function (connectionLimit, host, user, password, database) {
        dbConfig.connectionLimit = connectionLimit;
        dbConfig.host = host;
        dbConfig.user = user;
        dbConfig.password = password;
        dbConfig.database = database;
    },
    loadConfigFile: function (filePath) {
        var file = fs.readFileSync(filePath);
        dbConfig = JSON.parse(file.toString('utf8'));
        return dbConfig;
    },
}