var connection = require('./connection.js');
mysql = require('mysql');

var orm = {
	all:function(tableInput, cb){
		connection.query('SELECT * FROM tophundred;', function(err, data){
			if(err)throw err;
			cb(result);
		}
	}
}

module.exports = orm;