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




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// -------- Start web server and get web pages, as well as set renderer
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




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


// parse cookies


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


// -------- generate cookie for browser --------


function genCookie(email, password) {

    let data = bcrypt.hashSync((email + password), 10);
    return data;
}

// -------- check that object is one of the allowed options -------- 

function validOption(item, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == item) {
            return true;
        }
    }

    return false;
}

let componentType = ['cpu', 'motherboard', 'ram', 'case', 'cooler', 'gpu', 'monitor', 'keyboard', 'psu', 'hdd', 'ssd'];


// +++++++++++++++++++++++++++++++
// -------- website calls --------
// +++++++++++++++++++++++++++++++




app.get('/', (req, res) => {res.render('index'); }); 
app.get('/register', (req, res) => {res.render('register'); });
app.get('/thanks', (req, res) => {res.render('thanks'); });
app.get('/login', (req, res) => {res.render('login'); });
app.get('/account', requiresLogin, (req, res) => {res.render('account'); });
app.get('/addItem', requiresLogin, (req, res) => {res.render('addItem'); });
app.get('/added-item', (req, res) => {res.render('added-item'); });




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


// get the user's data from the server


app.get("/userinfo", (req, res) => {

    console.log("I'm here!");

    // what to do here: db call to get the username based on the cookie in the browser
    // use the result to display the user's name on the account page (and perhaps the username as well)
    // also need to create sql command for the server to use

    let cookies = parseCookies(req);

    // get the hash from browser
    let hash = decodeURIComponent(cookies.hash);
    console.log("hash = " + hash);

    // build the sql command

    var sql = '';
    sql += 'SELECT * FROM public."user" ';
    sql += 'WHERE cookie = $1; ';

    pool.connect((error, client, done) => {

        client.query(sql, [hash], (error, result) => {

            if (error) {
                console.log(error);
            } else {
                
                if (result.rows.length == 0) {
                // the cookie provided does not match any user
                    res.json({});

                } else {
                    // user was found - send back the user's details as a JSON string
                    res.json(result);

                }
            }
        });
    });
});


// -------- register new user --------


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


// login post


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

                                    console.log("Setting the cookie to: " + cookie);
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

// post submitted item data to user's account

/*  This needs to return the user ID and component type ID from the database
    e.g. like "SELECT user ID FROM user database, WHERE email is the one stored in the browser cookie"
    and "SELECT ID from componentID table WHERE IDvalue = the one specified by the user"

*/

app.post("/addItem", (req, res) => {

    let item_type = req.body.itemType || '';    
    console.log(item_type);

    if (req.body.title == false) {
        // the user has not sent a title
        res.redirect('/account?msg=noTitle');

    } else if (validOption(item_type, componentType) == false) {
        // user did not choose a valid item type 
        res.redirect('/account?msg=invalidType');

    } else {

        /* 
            connecting to the database to retrieve the user ID and component ID, as well as 
            add the item to the database. This is done by checking the browser cookie for the email,
            then checking that against the user ID in the database.
        */

        let cookies = parseCookies(req);
        let email = decodeURIComponent(cookies.email);

        sql = '';
        sql += 'SELECT * FROM public.user ';
        sql += 'WHERE email = $1; ';


        pool.connect((error, client, done) => {

            client.query(sql, [email], (error, result) => {

                if (error) {

                    console.log(error);

                } else {

                    /* 
                        this page cannot be accessed without a browser cookie, although the user may delete it - hence
                        the need for it to be checked again on the server side
                    */

                    if (result.rows.length == 0) {

                        // the email in the cookie does not match anything in the database
                        // might not be necessary, since the page checks the cookie before allowing a POST request to it

                        res.redirect('/account?msg=bad-cookie');

                    } else {

                        /*  
                            the email is valid and the user's ID can now be returned to the database
                            now the component type ID needs to be returned
                        */

                        let user = result.rows[0];
                        let userID = user.userID;
                        console.log(userID);

                        
                        sql = '';
                        sql += 'SELECT "componentTypeID" FROM public."componentType" ';
                        sql += 'WHERE "componentTypeDescription" = $1; ';


                        client.query(sql, [item_type], (error, result) => {
                            // check the database for the item type ID
                            // check for the ID where the item type provided by the user matches the description in the db

                            if (error) {
                                console.log(error);
                            } else {

                                let itemID = result.rows[0].componentTypeID;
                                console.log(itemID);

                                /* 
                                    We now have the user ID and item ID, so they can be added to the database
                                    along with other data provided by the user
                                */

                                /* 
                                    Build the sql command to add the new item to the database, and grab the description and title from the 
                                    user's form entry
                                */
            
                                sql = '';
                                sql += 'INSERT INTO public.component ( ';
                                sql += '"userID", ';
                                sql += '"imagePath", ';
                                sql += 'description, ';
                                sql += 'title, ';
                                sql += '"componentTypeID" ) ';
                                sql += 'VALUES ($1, $2, $3, $4, $5); ';

                                let description = req.body.description;
                                let title = req.body.title;

                                client.query(sql, [userID, 1, description, title, itemID], (error, result) => {

                                    /* 
                                        run the sql command that adds the data provided by the user, to the database
                                        (this includes some placeholder values which will be added at a later date)

                                    */
                        
                                    if (error) {
                    
                                        console.log(error);
                    
                                    } else {
                    
                                        /* 
                                            The command has been executed successfully, and the user is redirected to a webpage recognising that they
                                            have added an item
                                        */
                    
                                        res.redirect('/added-item');
                                        done();
                    
                                        
                                    }
                        
                                });

                            }


                        });


                    }
                }

            });

        });

    }


});


app.post('/additem2', (req, res) => {

    let cookies = parseCookies(req);

    // get the hash from browser
    let hash = decodeURIComponent(cookies.hash);
    console.log("hash = " + hash);

    // build the sql command

    var sql = '';
    sql += 'SELECT * FROM public."user" ';
    sql += 'WHERE cookie = $1; ';

    pool.connect((error, client, done) => {

        client.query(sql, [hash], (error, result) => {

            if (error) {
                console.log(error);
            } else {
                
                if (result.rows.length == 0) {
                    // the cookie provided does not match any user
                    res.sendStatus(401);


                } else {
                    // user was found 
                    var user = result.rows[0];
                
                    //now we can insert a new item - we know the user.
                    //grab the form fields they submitted in the form..

                    //insert here



                }
            }
        });
    });

});



app.listen(8081, () => {
    
    console.log("Server started");
    
    
});