var pg = require('pg');
var c = require('../config/config.js');

var conString = "postgres://" + c.username +":" + c.password + "@localhost/" + c.database + "";
pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
});
