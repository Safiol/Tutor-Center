const connection  = require("./db");

// this was just a test to see if this works, which did and as intended. So other queries can go here.  
// if this doenst work, it is because the funciton at line 6 in server.studentController is not being called
// to fix this issue, go to serverAPI in front end repository, and change, in line 8, LOCALHOST to localhost (remove brackets and everything) 
// a fucntion to return current date and time would be usefull for the insert query
function insertData (ID, course, problem){
    const result = connection.query('INSERT INTO session (session_id, session_DATE, session_TIME, problem_summary, course_subject) VALUES (?, ?, ?, ?, ?)', [ID, "2023-01-01", "00:01:23", problem, course]);
    
   return result; 
};

module.exports = { insertData };