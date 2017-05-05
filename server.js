var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

console.log('hiiiiiii')
//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 6*1000*1000*1000*1000*1000*1000 }}));
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(methodOverride('_method'));
// Set Handlebars.
var exphbs = require("express-handlebars");

app.use(function(req, res, next){
	var hbs = exphbs.create({
	    // Specify helpers which are only registered on this instance.
	    helpers: {
	        foo: function (a) { return 'FOO!' + a; },
	        isUserLoggedIn: function(){
	        	if (req.session.logged_in) return true;
	        	else return false;
	        },
	        getUserInfo: function(){
	        	if (req.session.logged_in){
	        		return {
	        			user_id: req.session.user_id,
	        			email: req.session.user_email,
	        			username: req.session.username
	        		}
	        	}else {
	        		return false;
	        	}
	        }
	    },
	    defaultLayout: "main"
	});

	app.engine("handlebars", hbs.engine);
	app.set("view engine", "handlebars");

	next();
});



var routes = require('./controllers/routes.js');
var usersController = require("./controllers/usersController.js");

app.use('/', routes);
app.use("/users", usersController);


var port = process.env.PORT || 3000;
app.listen(port);