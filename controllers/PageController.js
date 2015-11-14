//connecting to postgre
var pg = require('pg');
var conString = "postgres://proj127:jirehlim@localhost/linkdin";

pg.connect(conString, function(err, client, done) {
	if (err) {
		return console.error('error fetching client from pool', err);
	}
});

exports.index = function(req, res, next){
	res.render("index.html");
};

exports.homepage = function (req, res, next){
	res.render('homepage.html');
};

/*code from http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#server-side-routes */
exports.getUsers = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM USERS;");
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};

exports.getJob = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM JOB;");
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};

exports.searchJob = function(req, res) {
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
        var query = client.query("SELECT * FROM JOB WHERE jobid='"+req.params.id+"';");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
}

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
        client.query("INSERT INTO JOB(country, company, username, createdat) values($1, $2, $3, now())", [req.body.country, req.body.company, req.body.username]);

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
    });
}

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
        var query = client.query("SELECT * from job where LOWER(country)=LOWER($1) OR LOWER(description)=LOWER($1) OR LOWER(fieldsrelated)=LOWER($1) OR LOWER(company)=LOWER($1) OR LOWER(username)=LOWER($1)", [req.query.keyword], function (err, qry){
            var query1 = client.query("SELECT * from users where LOWER(username)=LOWER($1) OR LOWER(fname)=LOWER($1) OR LOWER(mname)=LOWER($1) OR LOWER(lname)=LOWER($1) OR LOWER(fname::text||' '||lname::text)=LOWER($1) OR LOWER(fname::text||' '||mname::text||' '||lname::text)=LOWER($1) OR LOWER(occupation)=LOWER($1) OR LOWER(college)=LOWER($1) OR LOWER(country)=LOWER($1)", [req.query.keyword]);

            query1.on('row', function(row) {
                console.log("1");
                console.log(row);
                results.push(row);
            });

            query1.on('end', function() {
                console.log("q1 is done.");
                done();
                return res.json(results);
            });
        });

        query.on('row', function(row) {
            console.log("2");
            console.log(row);
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            console.log("q is done.");
            done();
        });
    }); 
}

exports.searchJob = function(req, res) {
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
        var query = client.query("SELECT * from job where LOWER(country)=LOWER($1) OR LOWER(description)=LOWER($1) OR LOWER(fieldsrelated)=LOWER($1) OR LOWER(company)=LOWER($1) OR LOWER(username)=LOWER($1)", [req.query.keyword]);

        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
}

exports.searchUsers = function(req, res) {
    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * from users where LOWER(username)=LOWER($1) OR LOWER(fname)=LOWER($1) OR LOWER(mname)=LOWER($1) OR LOWER(lname)=LOWER($1) OR LOWER(fname::text||' '||lname::text)=LOWER($1) OR LOWER(fname::text||' '||mname::text||' '||lname::text)=LOWER($1) OR LOWER(occupation)=LOWER($1) OR LOWER(college)=LOWER($1) OR LOWER(country)=LOWER($1)", [req.query.keyword]);
        
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
}

exports.login = function(req, res) {
    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

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
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            if(results.length == 1){
                req.session.username = req.body.username;
                return res.status(200).json({ success: true});
            }else{
                return res.status(404).json({ success: false});
            }
        });
    });
}

exports.logout = function(req, res) {
    if(req.session.username == req.body.username){
        req.session.destroy(function (err){
            if(err){
                return res.status(401).json({success: false, data: err});
            }else{
                return res.status(200).json({success: true});
            }
        });
    }else{
        return res.status(404).json({success: false, message: "Session not found."});
    }
}