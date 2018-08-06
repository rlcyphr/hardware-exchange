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
var pool = new pg.Pool(config);
var app = express();

app.get("/componenttypes", (req, res) => {
    
    var sql = 'select * from public."componentType";';
    
    // call database
    
    pool.connect((error, client, done) => {
        
        client.query(sql, (error, result) => {
            
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