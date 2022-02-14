const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'StudentManagementSystem',
    user: 'root',
    password: 'mysql'
});

module.exports = connection;