var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('../config/connection.js')

router.get('/', function(req, res){
	//res.send('hi')
	connection.query('SELECT * FROM tophundred;', function(err, data){
		//res.json(data);
		res.render('index', {tophundred:data});
	})
})


module.exports = router;