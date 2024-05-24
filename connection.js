import mysql from "mysql";
import ip from "ip";
const port=8800;
export const db= mysql.createConnection({
    host :"localhost",
    user:"root",
    password:"root",
    database:"news",
})
db.connect(function (err) {
    if (err) console.error(err, "\nError in database connection.");
    else {
      console.log(
        `System started on local\n host: http://localhost:${port}/ \n server: http://${ip.address()}:${port}/`
      );
      console.log("Database connection is successfull.");
      console.log('API"s',"API'S",`"here is the API's" ${port}`);
    }
  });