//connecting to postgre
var pg = require('pg');
var c = require('../config/config.js');
var conString = "postgres://" + c.username +":" + c.password + "@localhost/" + c.database + "";

pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
});

exports.getJob = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM JOB join fieldofinterest on job.fieldofinterestid = fieldofinterest.fieldofinterestid;");
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};

exports.getJobOne = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM JOB join fieldofinterest on job.fieldofinterestid = fieldofinterest.fieldofinterestid where username = $1", [req.query.username]);
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};

exports.createJob = function(req, res) {

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
        client.query("INSERT INTO JOB(name, country, company, username, createdat) values($1, $2, $3, $4, now())", 
            [req.body.name, req.body.country, req.body.company, req.body.username]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from job where jobid=currval('job_jobid_seq')");

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

exports.updateJob = function(req, res) {

    var results = [];

    if(req.session.username != req.body.username){
        return res.status(403).json({success: false})
    }

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE job SET name = ($6), description=($2), fieldofinterestid=($3) company=($4), picture=($5) WHERE jobid=($1)", 
            [req.body.jobid, req.body.description, req.body.fieldofinterestid, req.body.company, req.body.picture, req.body.name]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM job where jobid=$1", [req.body.jobid]);

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

exports.deleteJob = function(req, res) {

    var results = [];

    if(req.session.username != req.body.username){
        return res.status(403).json({success: false})
    }

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        var query = client.query("DELETE FROM jobs WHERE jobid=($1)", [req.body.jobid]);

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true});
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.approveJob = function(req, res) {

    var results = [];

    if(req.session.isadmin != '1'){
        return res.status(403).json({success: false})
    }

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Update Data
        client.query("UPDATE job SET approvedat=now() WHERE jobid=($1)", 
            [req.body.jobid]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM job where jobid=$1", [req.body.jobid]);

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

exports.closeJob = function(req, res) {

    var results = [];

    if(req.session.username != req.body.username){
        return res.status(403).json({success: false})
    }

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Update Data
        client.query("UPDATE job SET closedat=now() WHERE jobid=($1)", 
            [req.body.jobid]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM job where jobid=$1", [req.body.jobid]);

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

exports.addApplicant = function(req, res){
    var results = [];

    if(req.session.username != req.body.username){
        return res.status(403).json({success: false})
    }

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO job_applicant(jobid, username) values($1, $2)", [req.body.jobid, req.body.username]);

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true, username: req.body.username});
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.getApplicants = function(req, res){
    var results = [];

    if(req.session.username != req.body.username){
        return res.status(403).json({success: false})
    }

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * from job_applicant where jobid=$1", [req.query.jobid]);

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

exports.removeApplicant = function(req, res){
    var results = [];

    if(req.session.username != req.body.username){
        return res.status(403).json({success: false})
    }

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        var query = client.query("DELETE FROM job_applicant where jobid = $1 and username = $2", [req.body.jobid, req.body.username]);

        query.on('end', function() {
            done();
            return res.status(200).json({success: true});
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
}