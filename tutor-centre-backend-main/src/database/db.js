const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: process.env.SQLHOST,
  database: process.env.DATABASE,
  user: process.env.SQLUSER,
  password: process.env.SQLPASSWORD,
  port: process.env.SQLPORT
});

connection.connect((err) => {
  if(err){
    console.log('Error connecting to the MySQL Database'+ err.stack) ;
    return;
  }
  console.log('SQL Connected!');
});
// connection.end((err) => {
// });


 module.exports = connection;
