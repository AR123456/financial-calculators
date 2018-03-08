var express = require("express");
//https://www.npmjs.com/package/method-override
//method overide middelwre 
var methodOverride = require('method-override');

//bodyparser middleware 
var bodyParser = require("body-parser");
//moment JS for  date
var moment = require('moment');

// var  mysql  = require("mysql");
var port = process.env.PORT || 3000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
// Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(port);