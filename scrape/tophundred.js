var request = require('request');
var cheerio = require('cheerio')

var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "Mastermind315",
  database: "fantasy_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


request('https://www.landof10.com/big-ten/2017-fantasy-football-rankings', function (error, response, body) {

  // console.log(body);

    var $ = cheerio.load(body);

    var tableRows = $('tr')

    //Player, Team, Comp, Att, Yards, Tds, interceptions

    //skip first row
    tableRows.slice(1).each(function(i, element) {
      "use strict";
      let cleanRow = [];
      let justThese = [0, 1, 2];
      let tds = $(element).children('td');
      
      tds.each(function(tdIndex, td){
        cleanRow.push($(this).text().trim());
      });

      let filteredRow = cleanRow.filter(function(el, i){
        if (justThese.indexOf(i) >= 0) return el;
      });
      //player, team, pos, rec, yards, avg, ydsg, tds
      connection.query("INSERT INTO tophundred (num, player, posrank) VALUES (?, ?, ?)", [
              filteredRow[0],
              filteredRow[1],
              filteredRow[2]
            ], function(err, res) {
              if (err) return console.log(err);
              else console.log('done')
            });
    });
});