var express = require("express");
//https://www.npmjs.com/package/method-override
//method overide middelwre 
var methodOverride = require('method-override');
// Handlebars.
var exphbs = require("express-handlebars");
//bodyparser middleware 
var bodyParser = require("body-parser");


// var something mysql  = require("mysql");

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_Controller.js");

app.use("/", routes);

app.listen(port);