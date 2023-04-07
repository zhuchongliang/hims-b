const config = require("./config.js")
const mysql = require("mysql2");
const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})
connection.getConnection((err, conn,) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log("数据库启动成功");
  }
})
module.exports = connection.promise();