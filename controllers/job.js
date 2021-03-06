//connecting to postgre
var pg = require('pg');
var c = require('../config/config.js');
var conString = "postgres://" + c.username +":" + c.password + "@localhost/" + c.database + "";

pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
});

exports.getApprovedJobs = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT jobid, jobname, fname, mname, lname, job.fieldofinterest FROM JOB right join users on job.username = users.username where approvedat is not null");
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

exports.getPendingJobs = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT jobid, jobname, fname, mname, lname, job.fieldofinterest FROM JOB join users on job.username = users.username where job.approvedat is null");
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

exports.getJobOne = function(req, res) {
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM JOB where jobid = $1 and approvedat is not null", [req.query.jobid]);
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

exports.getJobsFromUsername = function(req, res) {
    var results = [];

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM JOB where username = $1 and approvedat is not null", [req.query.username]);
        query.on('row', function(row) {
          results.push(row);
        });

        query.on('end', function(){
          done();
          res.send(results);
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
};


exports.createJob = function(req, res) {

    var results = [];
    var path = null;
    if(typeof req.file != "undefined"){
        path = req.file.path;
        path = path.replace("public", "");
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
        client.query("INSERT INTO JOB(jobname, description, country, company, username, fieldofinterest, createdat) values($1, $2, $3, $4, $5, $6, now())",
            [req.body.jobname, req.body.description, req.body.country, req.body.company, req.body.username, req.body.fieldofinterest]);

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

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.updateJob = function(req, res) {

    var results = [];
    var path = null;
    if(typeof req.file != "undefined"){
        path = req.file.path;
        path = path.replace("public", "");
    }

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
        client.query("UPDATE job SET jobname = ($5), description=($2), company=($3), picture=($4) WHERE jobid=($1)",
            [req.body.jobid, req.body.description, req.body.company, path, req.body.jobname]);

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

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.deleteJob = function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        var query = client.query("DELETE FROM job WHERE jobid=($1)", [req.body.jobid]);

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true});
        });

        query.on('error', function(err) {
            done();
            console.log(err);
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

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.closeJob = function(req, res) {

    var results = [];

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

        query.on('error', function(err) {
            done();
            console.log(err);
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

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.getApplicants = function(req, res){
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
        var query = client.query("SELECT job_applicant.jobid, job_applicant.username, users.fname, users.mname, users.lname from job_applicant, users where job_applicant.username=users.username and jobid=$1", [req.query.jobid]);

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

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.getRecommendedJobs = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT jobid, jobname FROM JOB where approvedat is not null and job.fieldofinterest = (SELECT fieldofinterest from users where username = $1) limit 6", [req.session.username]);
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
}

exports.updateJobView = function(req, res) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        var query = client.query("UPDATE job SET numberofviews = numberofviews+1 WHERE jobid=($1)",
            [req.body.jobid]);

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({ success: true });
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        });
    });
}

exports.getHottestJobs = function(req, res) {
    if(req.session.isadmin != '1'){
        return res.status(403).json({success: false})
    }

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT jobid, jobname, fieldofinterest, numberofviews as count FROM job where numberofviews = (select MAX(numberofviews) from job) limit 1");
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
