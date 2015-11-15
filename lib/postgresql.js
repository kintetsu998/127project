var pg = require('pg');

var conString = "postgres://postgres:12345678@localhost/cmsc127";
pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
});
