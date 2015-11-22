//connecting to postgre
var pg = require('pg');
var c = require('../config/config.js');
var conString = "postgres://" + c.username +":" + c.password + "@localhost/" + c.database + "";

pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
});

exports.getNotifs = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM NOTIFICATION");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
};

exports.getNotifFromUser = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM NOTIFICATION WHERE username=$1", [req.query.username]);

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
};

exports.getNotifFromJob = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM NOTIFICATION WHERE jobid=$1", [req.query.jobid]);

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
};

exports.createNotifFromUser = function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO NOTIFICATION(text, url, username, created_at) values($1, $2, $3, now())", 
            [req.body.text, req.body.url, req.body.username]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from NOTIFICATION where notification_id=currval('notification_notification_id_seq')");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.createNotifFromJob = function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO NOTIFICATION(text, url, job_id, created_at) values($1, $2, $3, now())", [req.body.text, req.body.url, req.body.jobid]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from NOTIFICATION where notification_id=currval('notification_notification_id_seq')");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
}