const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'online_ad_management_db',
    password: ''
});
connection.connect();

module.exports = connection;