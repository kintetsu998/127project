var pg = require('pg');
var conString = "postgres://proj127:jirehlim@localhost/linkdin";
/*
	user: proj127
	password: jirehlim
	database: linkdin
*/
pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
});
