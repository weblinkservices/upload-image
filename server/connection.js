const mysql = require("mysql2");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Bank",
    multipleStatements: true
});


module.exports= con;