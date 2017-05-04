var connection = require('./connection.js');
mysql = require('mysql');

var orm = {
	tophundred:function(tableInput, cb){
		connection.query('SELECT * FROM tophundred;', function(err, data){
			if(err)throw err;
			cb(result);
		};
	},

	runningbacks:function(tableInput, cb){
		connection.query('SELECT * FROM runningbacks;', function(err, data){
			if(err)throw err;
			cb(result);
		}
	}
}

module.exports = orm;