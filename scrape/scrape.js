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


request('https://fantasyfootballers.org/qb-quarterback-nfl-stats/', function (error, response, body) {

  // console.log(body);

    var $ = cheerio.load(body);

    var tableRows = $('tr')

    //Player, Team, Comp, Att, Yards, Tds, interceptions

    //skip first row
    tableRows.slice(1).each(function(i, element) {
      "use strict";
      let cleanRow = [];
      let justThese = [1, 2, 3, 4, 5, 6, 8, 9, 13, 14, 15];
      let tds = $(element).children('td');
      
      tds.each(function(tdIndex, td){
        cleanRow.push($(this).text().trim());
      });

      let filteredRow = cleanRow.filter(function(el, i){
        if (justThese.indexOf(i) >= 0) return el;
      });

      connection.query("INSERT INTO quarterbacks (player, team, passydsgm, att, comp, passcomp, tds, interceptions, rushyds, rushtds, games) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
              filteredRow[0],
              filteredRow[1],
              filteredRow[2],
              filteredRow[3],
              filteredRow[4],
              filteredRow[5],
              filteredRow[6],
              filteredRow[7],
              filteredRow[8],
              filteredRow[9],
              filteredRow[10]
            ], function(err, res) {
              if (err) return console.log(err);
              else console.log('done')
            });
    });
});