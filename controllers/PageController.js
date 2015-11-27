//connecting to postgre
var pg = require('pg');
var async = require('async');
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

exports.successPage = function(req, res, next){
	res.render("success.html");
};

exports.homepage = function (req, res, next){
  if(req.session.username){
    res.render('homepage.html');
  }
  else{
    return next();
  }
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

        async.parallel({
          users: function(callback){
            var results = [];

            var query = client.query("SELECT fname, mname, lname, occupation, fieldofinterest, picture, username, company FROM users where (LOWER(username) = LOWER($1) or LOWER(fieldofinterest) = LOWER($1) or LOWER(occupation) = LOWER($1) or LOWER(fname) = LOWER($1) or LOWER(mname) = LOWER($1) or LOWER(lname) = LOWER($1) or LOWER(company) = LOWER($1) or LOWER(college) = LOWER($1) or LOWER(degree) = LOWER($1)) and approvedat is not null", [req.query.keyword]);

            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                callback(null, results)
            });

            query.on('error', function(err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err});
            });
          },
          jobs: function(callback){
            var results = [];

            var query = client.query("SELECT jobname, jobid FROM job where (LOWER(company) = LOWER($1) or LOWER(username) = LOWER($1) or LOWER(jobname) = LOWER($1) or LOWER(fieldofinterest) = LOWER($1)) and approvedat is not null", [req.query.keyword]);

            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                callback(null, results)
            });

            query.on('error', function(err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err});
            });
          }
        }, function(err, results){
          res.send(results);
        })
    });
};

exports.fieldsOfInterest = function(req, res) {
    pg.connect(conString, function (err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("select fieldofinterest from job union select fieldofinterest from users");

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
        var query = client.query("SELECT * FROM users where username=$1 and password=$2 and approvedat is not null", [req.body.username, req.body.password]);

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

exports.fieldsOfInterest = function(req, res) {
    pg.connect(conString, function (err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("select fieldofinterest from job union select fieldofinterest from users");

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

exports.logout = function(req, res) {
    req.session.destroy();
    res.sendStatus(200);
};
