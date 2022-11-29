const mysql = require('mysql');

const myUsername = process.env['db_username'];
const myPassword = process.env['db_password'];
const myHost = "sql.ucode.com";   //The name of the server hosting MySQL
const myDB = "uc_uc_newstudent"; //The database you are using

 let sqlCon = mysql.createConnection ({
 host: myHost,
 user: myUsername,
 password: myPassword,
 database:myDB});

sqlCon.connect((err) => {
 if (err) throw err;
console.log("Connected!");
});


sqlCon.query('select * from genre',(err,result)=>{
if(err){
throw err;
} else {
//  console.log (result);
}
});

module.exports = sqlCon;