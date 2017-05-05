var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('../config/connection.js')



router.get('/', function(req, res){
	var stats = {};
	connection.query('SELECT * FROM quarterbacks;', function(err, data){
		stats.quarterbacks = data;
		connection.query('SELECT * FROM runningbacks;', function(err, data){
			stats.runningbacks = data;
			connection.query('SELECT * FROM widereceivers', function(err, data){
				stats.widereceivers = data;
				connection.query('SELECT * FROM tightends', function(err, data){
					stats.tightends = data;
					connection.query('SELECT * FROM defense', function(err, data){
						stats.defense = data;
						connection.query('SELECT * FROM offensiveline', function(err, data){
							stats.offensiveline = data;
							connection.query('SELECT * FROM tophundred', function(err, data){
								stats.tophundred = data;
								stats.logged_in = req.session.logged_in;
								stats.user_id = req.session.user_id;
								stats.user_email = req.session.user_email;
								stats.username = req.session.username;
								res.render('index', stats);
							})
						})
					})
				})
			})
		})
	})
})

/*
Promise.all([
    db.query('select * from foo where ...'),
    db.query('select * from bar where ...')
])
.spread(function(foo, bar) {
    /* prepare data as you need them 
    res.render('./index', { foo_table: foo, bar_table: bar});
});
*/

/*
function getQuarterbacks(req, res, next, data) {
    var dbRequest = 'SELECT * FROM quarterbacks';
        connection.query(dbRequest, function(error, rows) {
            Add selected data to previous saved data. 
            stats.quarterbacks=data;
            res.render('index', {quarterbacks:data});
    	});
}
*/


module.exports = router;