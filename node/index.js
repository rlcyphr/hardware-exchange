console.log("---------------------------------");
console.log("Hardware exchange server started");
console.log("---------------------------------");

// server - request and render pages using handlebars and get/post data to db
// uses port 8081

var express = require("express");
var expressHandlebars = require("express-handlebars");
var pg = require("pg");
var body_parser = require("body-parser");
const bcrypt = require('bcrypt');
const config = {
    user: 'postgres',
    database: 'hardware-exchange',
    password: 'layman wizard trials',
    port: 5432
};

var pool = new pg.Pool(config); // creating a connection
const path = require('path');
const validator = require('email-validator');
const cookie_parser = require('cookie-parser');


// -------- Start web server and get web pages, as well as set renderer

var app = express(); // start the web server
app.engine('handlebars', expressHandlebars()); // set express to use handlebars renderer
app.set('view engine', 'handlebars'); // set view engine to handlebars

app.set('views', path.join(process.cwd(), 'views')); // set base dir for sites to /node/views  
app.use(body_parser.json()); // allow server to understand and display json on screen
app.use(body_parser.urlencoded( {extended:true} )); // tell express server to use the body parser - 
                                                     // lets it grab contents of posted form fields
app.use('/', express.static(path.join(process.cwd(), 'public'))) // set static assets directory to /public for handlebars renderer
app.use(cookie_parser());

// ++++++++++++++++++++++++++++++++++++++++
// -------- verification functions --------
// ++++++++++++++++++++++++++++++++++++++++


function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}

// for pages that require login to access, check the value of the cookie

function requiresLogin(req, res, next) {

    let cookies = parseCookies(req);

    try {
        let email = decodeURIComponent(cookies.email);
        let hash = decodeURIComponent(cookies.hash);
        
        sql = '';
        sql += 'SELECT * FROM public."user" ';
        sql += 'WHERE cookie = $1 ';
        sql += 'AND email = $2 ';

        pool.connect((error, client, done) => { 

            // use logged in client to retrieve the results of the database
            client.query(sql, [hash, email], (error, result) => { 

                if (error) {
                    
                    console.log(error);
                } else {
                    // result is returned as an array
                    if (result.rows.length > 0) {
                        // hashed cookie is valid (matched email in db) - login 
                        done();
                        return next();

                    } else {
                        // client's cookie is bad/missing
                        done();
                        res.redirect('/login?msg=bad-token');
                        
                    }

                }
                            
            });
            
        });

    } catch(err) {
        // eat the error
        res.redirect('/login?msg=bad-token');
    }
    
};

// get info like username 

function getUserInfo(hash, callback) {

    sql = '';
    sql += 'SELECT * FROM public."user" ';
    sql += 'WHERE cookie = $1';

    pool.connect((error, client, done) => {

        client.query(sql, [hash], (error, result) => {

            if (error) {

                console.log(error);
            } else {

                callback(result.rows[0].username);
                done();

            }

        });

    });

}

// -------- check for issues with submitted emails --------

function emailExists(email, callback) {
    // build sql command
    var sql = '';
    sql = sql + 'SELECT * FROM public."user" ';
    sql = sql + 'WHERE email = $1';

    // login to the server with credentials
    pool.connect((error, client, done) => { 
        
        // run sql insert command and provide details - these are returned from the form sent from the client
        client.query(sql, [email], (error, result) => { 
        
            if (error) {         

                console.log(error);

            } else {
                // if there is no matching email that has already been used, return false
                if (result.rows.length == 0) {  
                    callback(false);    

                } else {

                    callback(true);
                }
            }
            
            
        });    
   
    });

}

// generate cookie for browser

function genCookie(email, password) {

    let data = bcrypt.hashSync((email + password), 10);
    return data;
}

// +++++++++++++++++++++++++++++++
// -------- website calls --------
// +++++++++++++++++++++++++++++++

app.get('/', (req, res) => {res.render('index'); }); 
app.get('/register', (req, res) => {res.render('register'); });
app.get('/thanks', (req, res) => {res.render('thanks'); });
app.get('/login', (req, res) => {res.render('login'); });
app.get('/account', requiresLogin, (req, res) => {res.render('account'); });

// +++++++++++++++++++++++++++
// -------- api calls --------
// +++++++++++++++++++++++++++


// use web server to get and push to path /componenttypes
app.get("/componenttypes", (req, res) => { 
    
    
    // instruction for the database to run
    var sql = 'select * from public."componentType";'; 
    
    
    // call database
    
    // login to the server with credentials
    pool.connect((error, client, done) => { 
        
        // use logged in client to retrieve the results of the database
        client.query(sql, (error, result) => { 
        
            
            if (error) {
                
                console.log(error);
            } else {
                
                done();
                res.send(result);
                
            }
            
            
        });    
        
    });
    
});


// +++++++++++++++++++++++++++++++++++
// -------- register new user --------
// +++++++++++++++++++++++++++++++++++


app.post("/register", (req, res) => {

    var email = req.body.email || '';
    var password = req.body.passwd || '';
    var dateCreated = Date.now();
    var username = req.body.username || '';
    var passwordHash = bcrypt.hashSync(password, 10);

    let cookie = genCookie(email, password);


    // -------- verify email - only necessary if user modifies code in console screen --------

    if (!validator.validate(email)) {

        res.redirect('/register?msg=bad-email');

    }

    // -------- check for email dupes --------

    if ( emailExists(email, (exists) => {

        if (exists) {

            res.redirect('/register?msg=dupe-email');

        } else {

            // -------- add the new user's details into the server if they match the criteria needed --------

            var sql = '';
            sql = sql + 'INSERT INTO public."user" ( ';
            sql = sql + 'email, ';
            sql = sql + '"passwordHash", ';
            sql = sql + '"dateCreated", ';
            sql = sql + 'username, ';
            sql = sql + 'cookie';
            sql = sql + ' ) ';
            sql = sql + 'VALUES ($1, $2, $3, $4, $5); ';


            // -------- call database --------
            

            // login to the server with credentials
            pool.connect((error, client, done) => { 
                
                // run sql insert command and provide details - these are returned from the form sent from the client
                client.query(sql, [email, passwordHash, dateCreated, username, cookie], (error, result) => { 
                
                    if (error) {
                        console.log(error);
                    } else {

                        // set a cookie that contains the hashed password and email of the user, the email address, and the username for privileged
                        // pages, such as the account page, to use in order to show the personalised page to the logged in user
                        // the username cookie could be changed if the user decides to change their username later

                        res.cookie('hash', cookie);
                        res.cookie('email',email);
                        res.cookie('username',username);
                        
                        // redirect the user to the thanks page after a successful registration

                        res.redirect('/thanks');
                        done();
                    }
                });    
            });
            

        }

    }));


    

});

// ++++++++++
// login post
// ++++++++++


app.post("/login", (req, res) => {

    // -------- instruction for the database to run --------

    
    var sql = '';
    sql = sql + 'SELECT * FROM public."user" ';
    sql = sql + 'WHERE email = $1; ';


    
    // get details from the form based on the names of the included fields 
    
    var email = req.body.email || '';
    var password = req.body.passwd || '';
    
    

    let cookie = genCookie(email, password);

    var passwordHash = bcrypt.hashSync(password, 10);
    console.log("The hash is " + passwordHash);


    // call database
    


    pool.connect((error, client, done) => { 
        // login to the server with credentials

        client.query(sql, [email], (error, result) => { 
        // run sql insert command and provide details - these are returned from the form sent from the client
            
            if (error) {
                
                console.log(error);

            } else {

                // the email that the user entered is not valid

                if (result.rows.length == 0) {
                    res.redirect('/login?msg=invalid-email');        
                    done();
                    return false;    


                // user's email is valid

                } else {

                    // compare the password entered by the user with the password hash that is stored in the 
                    // database entry that also includes their email address

                    bcrypt.compare(password, result.rows[0].passwordHash, (err, result) => {

                        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                        // password matches the email given - write a new cookie hash to the user in the database
                        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                        if (result) {

                            sql = '';
                            sql = sql + 'UPDATE public."user" SET ';
                            sql = sql + 'cookie = $1 ';
                            sql += 'WHERE email = ($2)';

                            // update the cookie 

                            client.query(sql, [cookie, email], (error, result) => { 

                                if (error) {
                
                                    console.log(error);
                    
                                } else { 

                                    // login ok, hash updated, send back to user
                                    // set the cookie to send back to the user

                                    res.cookie('hash', cookie);
                                    res.cookie('email', email);
                                    res.redirect('/account');        
                                    done();
                                    return true;
                                }

                            });

                        // ++++++++++++++++
                        // password invalid
                        // ++++++++++++++++

                        } else {
                            
                            res.redirect('/login?msg=invalid');        
                            done();
                            return false;
                        }

                    });
                }
            }
            
            
        });    
   
    });


    
});




app.listen(8081, () => {
    
    console.log("Server started");
    
    
});