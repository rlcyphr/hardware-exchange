console.log("---------------------------------");
console.log("Hardware exchange server started");
console.log("---------------------------------");

var express = require("express");
var app = express();

app.get("/componenttypes", (req, res) => {
    
    res.send("Hello World");
    
});


app.listen(8080, () => {
    
    console.log("Server started");
    
    
});