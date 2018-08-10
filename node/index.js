console.log("---------------------------------");
console.log("Hardware exchange server started");
console.log("---------------------------------");

var express = require("express");
var pg = require("pg");
var body_parser = require("body-parser");
const config = {
    user: 'postgres',
    database: 'hardware-exchange',
    password: 'layman wizard trials',
    port: 5432
};

var pool = new pg.Pool(config); // creating a connection
var app = express(); // start the web server
app.use(body_parser.json());
app.use(body_parser.urlencoded( {extended:true} )); // tell express server to use the body parser - lets it grab contents of posted form fields



app.get("/componenttypes", (req, res) => { 
    // use web server to get and push to path /componenttypes
    
    var sql = 'select * from public."componentType";'; 
    // instruction for the database to run
    
    // call database
    
    pool.connect((error, client, done) => { 
        // login to the server with credentials
        
        client.query(sql, (error, result) => { 
        // use logged in client to retrieve the results of the database
            
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


app.post("/register", (req, res) => { // use web server to get and push to path /componenttypes
    
    console.log("test,.....");
    console.log(req.body);
   // console.log();
    res.sendStatus(200);

    
    var sql = 'select * from public."componentType";'; 
    // instruction for the database to run
    
    // call database
    
    //pool.connect((error, client, done) => { 
        // login to the server with credentials

        /* client.query(sql, (error, result) => { 
        // use logged in client to retrieve the results of the database
            
            if (error) {
                
                console.log(error);
            } else {
                
                client.end();
                res.send(result);
                done();
            }
            
            
        });    
        */
        
        
    //});
    
});

app.listen(8081, () => {
    
    console.log("Server started");
    
    
});