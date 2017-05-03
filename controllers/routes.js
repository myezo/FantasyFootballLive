var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('../config/connection.js')

var stats = {};

router.get('/', function(req, res){
	//res.send('hi')
	connection.query('SELECT * FROM tophundred;', function(err, data){
        stats.tophundred=data;
        res.render('index', {tophundred:data});
        connection.query('SELECT * FROM runningbacks;', function(err, data){
            stats.runningbacks=data;
            res.render('index', {runningbacks:data});
            //do the running backs here and so on
        })
    })

})


module.exports = router;