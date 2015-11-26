//connecting to postgre
var pg = require('pg');
var c = require('../config/config.js');
var conString = "postgres://" + c.username +":" + c.password + "@localhost/" + c.database + "";

pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
});

exports.index = function(req, res, next){
	if(req.session.username) return next();

	res.render("index.html");
};

exports.loginPage = function(req, res, next){
	res.render("login.html");
};

exports.uploadPage = function(req, res, next){
    res.render("test-upload.html");
};

exports.createPage = function(req, res, next){
	res.render("create.html");
};

exports.homepage = function (req, res, next){
	res.render('homepage.html');
};

exports.whoami = function(req, res) {
    pg.connect(conString, function (err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT users.username, users.fname, users.mname, users.lname, users.occupation, users.college, users.degree, users.picture, users.isadmin, users.country, users.fieldofinterest from users where users.username=$1", [req.session.username]);
        query.on('row', function(row) {
            done();
            return res.json(row);
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
};

exports.getLogs = function(req, res) {
    var results = [];

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM LOG");
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
};

exports.createLog = function(req, res) {

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
        client.query("INSERT INTO Log(text, created_at) values($1, now())", [req.body.text]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from LOG where notification_id=currval('log_log_id_seq')");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
};

exports.search = function(req, res) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT name, fieldofinterest from job where LOWER(name)=LOWER($1) OR LOWER(fieldofinterest)=LOWER($1)",
            [req.query.keyword], function (err, qry){
            var query1 = client.query("SELECT fname, mname, lname, occupation, fieldofinterest from users where LOWER(fname)=LOWER($1) OR LOWER(mname)=LOWER($1) OR LOWER(lname)=LOWER($1) OR LOWER(fname::text||' '||lname::text)=LOWER($1) OR LOWER(fname::text||' '||mname::text||' '||lname::text)=LOWER($1) OR LOWER(occupation)=LOWER($1) OR LOWER(fieldofinterest)=LOWER($1)", 
                [req.query.keyword]);

            query1.on('row', function(row) {
                console.log(row);
                results.push(row);
            });

            query1.on('end', function() {
                done();
                return res.json(results);
            });

            query1.on('error', function(err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err});
            });
        });

        query.on('row', function(row) {
            console.log(row);
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
};

exports.login = function(req, res) {
    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};
    var isadmin;
    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users where username=$1 and password=$2", [req.body.username, req.body.password]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            isadmin = row.isadmin;
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            if(results.length == 1){
                req.session.username = req.body.username;
                req.session.isadmin = isadmin;
                return res.status(200).json({ success: true});
            }else{
                return res.status(404).json({ success: false});
            }
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.sendStatus(200);
};
