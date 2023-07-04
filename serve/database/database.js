exports.databaseInit = function () {
  let mysql      = require('mysql2');
  let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'todo_db',
  });
   
  connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + connection.threadId);
    });
   
  // connection.query('SELECT * FROM todo_tbl', function (error, results, fields) {
  //   if (error) throw error;
  //   console.log('The data are: ', results);
  // });
  return connection
}
