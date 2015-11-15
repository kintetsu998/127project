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

        var query = client.query("SELECT users.username, users.fname, users.mname, users.lname, users.occupation, users.college, users.degree, users.picture, users.isadmin, users.country, user_experience.title, user_experience.company, user_fieldofinterest.field from users left join user_experience on user_experience.username = users.username left join user_fieldofinterest on user_experience.username = user_fieldofinterest.username;");
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

exports.createUser = function(req, res) {

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
        var create = client.query("INSERT INTO USERS(username, password, fname, mname, lname, isadmin, createdat, country) values($1, $2, $3, $4, $5, $6, now(), $7)", 
            [req.body.username, req.body.password, req.body.fname, req.body.mname, req.body.lname, req.body.isadmin, req.body.country]);

        create.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });

        create.on('row', function(row){
            var query = client.query("SELECT * from users where username=$1", [req.body.username]);

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
    });
}

exports.updateUser = function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

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
        var update = client.query("UPDATE users SET fname=($2), mname=($3), lname=($4), occupation=($5), college=($6), degree=($7), picture=($8) WHERE username=($1)", 
            [req.body.username, req.body.fname, req.body.mname, req.body.lname, req.body.occupation, req.body.college, req.body.degree, req.body.picture]);

        update.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users where username=$1", [req.body.username]);

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

exports.approveUser = function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

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
        client.query("UPDATE users SET approvedat=now() WHERE username=($1)", 
            [req.body.username]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users where username=$1", [req.body.username]);

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

exports.deleteUser = function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

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
        client.query("DELETE FROM users WHERE username=($1)", [req.body.username]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users where username=$1", [req.body.username]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            if(results.length == 0){
                return res.status(200).json({success: true});
            }else{
                return res.status(404).json({success: false, msg: "User not found."});
            }
        });

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
}

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
        client.query("UPDATE job SET name = ($6), description=($2), fieldsrelated=($3) company=($4), picture=($5) WHERE jobid=($1)", 
            [req.body.jobid, req.body.description, req.body.fieldsrelated, req.body.company, req.body.picture, req.body.name]);

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
        client.query("DELETE FROM jobs WHERE jobid=($1)", [req.body.jobid]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM job where jobid=$1", [req.body.jobid]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

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

    // Grab data from the URL parameters
    var id = req.params.todo_id;

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

    // Grab data from the URL parameters
    var id = req.params.todo_id;

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
        client.query("INSERT INTO NOTIFICATION(text, url, username, created_at) values($1, $2, $3, now())", [req.body.text, req.body.url, req.body.username]);

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

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
}

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

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
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
            var query1 = client.query("SELECT username, fname, mname, lname, occupation, college, degree, picture, isadmin, country, createdat, approvedat from users where LOWER(username)=LOWER($1) OR LOWER(fname)=LOWER($1) OR LOWER(mname)=LOWER($1) OR LOWER(lname)=LOWER($1) OR LOWER(fname::text||' '||lname::text)=LOWER($1) OR LOWER(fname::text||' '||mname::text||' '||lname::text)=LOWER($1) OR LOWER(occupation)=LOWER($1) OR LOWER(college)=LOWER($1) OR LOWER(country)=LOWER($1)", [req.query.keyword]);

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

            query1.on('error', function() {
                done();
                return res.status(500).json({ success: false, data: err});
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

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.createUserExperience = function(req, res){
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
        client.query("INSERT INTO user_experience(title, company, username) values($1, $2, $3)", [req.body.title, req.body.company, req.body.username]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from user_experience where company=$1", [req.body.company]);

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

exports.updateUserExperience = function(req, res){
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
        client.query("UPDATE user_experience SET title=($1) company=($2) where company=($3)", [req.body.title, req.body.company, req.body.oldCompany]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from user_experience where company=$1", [req.body.company]);

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

exports.createFieldOfInterest = function(req, res){
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
        client.query("INSERT INTO user_fieldofinterest(field, username) values($1, $2)", [req.body.field, req.body.username]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from user_fieldofinterest where field=$1", [req.body.field]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users where username=$1 and password=$2", [req.body.username, req.body.password]);

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

exports.updateFieldOfInterest = function(req, res){
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
        client.query("UPDATE user_fieldofinterest SET field=($1) WHERE field=($2)", [req.body.field, req.body.oldField]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from user_experience where field=$1", [req.body.field]);

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

exports.userCount = function(req, res){
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
            return res.json(results.length);
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
    req.session.destroy();
    res.sendStatus(200);
}