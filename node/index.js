console.log("---------------------------------");
console.log("Hardware exchange server started");
console.log("---------------------------------");

var express = require("express");
var pg = require("pg");
const config = {
    user: 'postgres',
    database: 'hardware-exchange',
    password: 'layman wizard trials',
    port: 5432
};

var pool = new pg.Pool(config); // creating a connection
var app = express(); // start the web server

app.get("/componenttypes", (req, res) => { // use web server to get and push to domain /componenttypes
    
    var sql = 'select * from public."componentType";'; // instruction for the database to run
    
    // call database
    
    pool.connect((error, client, done) => { // login to the server with credentials
        
        client.query(sql, (error, result) => { // use logged in client to retrieve the results of the database
            
            if (error) {
                
                console.log(error);
            } else {
                
                client.end();
                res.send(result);
                done();
            }
            
            
        });    
        
        
        
    });
    
});


app.listen(8080, () => {
    
    console.log("Server started");
    
    
});