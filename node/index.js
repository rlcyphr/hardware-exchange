console.log("---------------------------------");
console.log("Hardware exchange server started");
console.log("---------------------------------");

// server - request and render pages using handlebars and get/post data to db
// uses port 8081

var express = require("express");
var expressHandlebars = require("express-handlebars");
var pg = require("pg");
var body_parser = require("body-parser");
const config = {
    user: 'postgres',
    database: 'hardware-exchange',
    password: 'layman wizard trials',
    port: 5432
};

var pool = new pg.Pool(config); // creating a connection
const path = require('path');

var app = express(); // start the web server
app.engine('handlebars', expressHandlebars()); // set express to use handlebars renderer
app.set('view engine', 'handlebars'); // set view engine to handlebars

app.set('views', path.join(process.cwd(), 'views')); // set base dir for sites to /node/views  
app.use(body_parser.json()); // allow server to understand and display json on screen
app.use(body_parser.urlencoded( {extended:true} )); // tell express server to use the body parser - 
                                                     // lets it grab contents of posted form fields
app.use('/', express.static(path.join(process.cwd(), 'public'))) // set static assets directory to /public for handlebars renderer

// -------- website calls --------

app.get('/', (req, res) => {res.render('index')} ); // get website page from webpage root (/views) and render them 
app.get('/register', (req, res) => {res.render('register')} );
app.get('/thanks', (req, res) => {res.render('thanks')} );

// -------- api calls --------

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
                done();
                res.send(result);
                
            }
            
            
        });    
        
    });
    
});


app.post("/register", (req, res) => {

    // register new user and insert into table

    var sql = '';
    sql = sql + 'INSERT INTO public."user" ( ';
    sql = sql + 'email, ';
    sql = sql + '"passwordHash", ';
    sql = sql + '"dateCreated", ';
    sql = sql + '"username"';
    sql = sql + ' ) ';
    sql = sql + 'VALUES ($1, $2, $3, $4); ';

    // instruction for the database to run
    // get details from the form based on the names of the included fields 
    
    var email = req.body.email || '';
    var passwordHash = req.body.passwd || '';
    var dateCreated = Date.now();
    var username = req.body.username || '';

    // call database
    
    pool.connect((error, client, done) => { 
        // login to the server with credentials

        client.query(sql, [email, passwordHash, dateCreated, username], (error, result) => { 
        // run sql insert command and provide details - these are returned from the form sent from the client
            
            if (error) {
                
                console.log(error);
            } else {
                
                client.end();
                res.redirect('/thanks');
                done();
            }
            
            
        });    
        
        
        
    });
    
});

app.listen(8081, () => {
    
    console.log("Server started");
    
    
});