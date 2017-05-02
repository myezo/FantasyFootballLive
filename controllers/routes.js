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

	connection.query('SELECT * FROM runningbacks;', function(err, data){
		//res.json(data);
		res.render('index', {runningbacks:data});
	})
})

/*
router.get('/rb', function(req, res){
	//res.send('hi')
	connection.query('SELECT * FROM runningbacks;', function(err, data){
		//res.json(data);
		res.render('index', {runningbacks:data});
	})
})
*/

module.exports = router;