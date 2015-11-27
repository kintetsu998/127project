//connecting to postgre
var pg = require('pg');
var async = require('async');
var c = require('../config/config.js');
var conString = "postgres://" + c.username +":" + c.password + "@localhost/" + c.database + "";

var userColumns = "users.username, users.fname, users.mname, users.lname, users.occupation, users.college, users.degree, users.picture, users.isadmin, users.country, users.fieldofinterest, users.company";

pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
});

/*code from http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#server-side-routes */
exports.getApprovedUsers = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT " + userColumns + " from users where approvedat is not null");
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

exports.getPendingUsers = function(req, res) {
    var results = [];
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT username, fname, mname, lname, picture from users where approvedat is null");
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

exports.getOneUser = function(req, res) {
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT " + userColumns + " from users where username=$1", [req.params.username]);
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

exports.createUser = function(req, res) {

    var results = [];
    var path = (typeof req.file != "undefined")? '/' + req.file.path.substring(7): null;

    if(req.body.password == ""){
        return res.status(404).json({ succes: false, msg: "Password cannot be null!"});
    }

    // serialize experience data
    req.body.experiences = JSON.parse(req.body.experiences);

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        var create = client.query("INSERT INTO USERS(username, password, fname, mname, lname, isadmin, createdat, country, occupation, company, college, degree, fieldofinterest, picture) values($1, $2, $3, $4, $5, $6, now(), $7, $8, $9, $10, $11, $12, $13)",
            [req.body.username, req.body.password, req.body.fname, req.body.mname, req.body.lname, 0, req.body.country, req.body.occupation, req.body.company, req.body.college, req.body.degree, req.body.fieldofinterest, path]);

        create.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });

        create.on('end', function(){
            // add experiences
            async.each(req.body.experiences,
              function(experience, callback){
                // SQL Query > Insert Data
                client.query("INSERT INTO user_experience(title, company, username) values($1, $2, $3)", [experience.occupation, experience.company, req.body.username]);

                callback(null);
              },
              function(err){
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

                query.on('error', function(err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err});
                });
              });
        });
    });
}

exports.updateUser = function(req, res) {

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
        var update = client.query("UPDATE users SET fname=($2), mname=($3), lname=($4), occupation=($5), college=($6), degree=($7), country=($8), company=($9), fieldofinterest=($10) WHERE username=($1)",
            [req.body.username, req.body.fname, req.body.mname, req.body.lname, req.body.occupation, req.body.college, req.body.degree, req.body.country, req.body.company, req.body.fieldofinterest]);

        update.on('error', function(err) {
            done();
            console.log(err);
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

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.deleteUser = function(req, res) {
    var results = [];

    if(!req.session.isadmin){
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
        var query = client.query("DELETE FROM users WHERE username=($1)", [req.body.username]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

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

exports.approveUser = function(req, res) {

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
        var query = client.query("UPDATE users SET approvedat=now() WHERE username=($1)",
            [req.body.username]);

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
        client.query("INSERT INTO user_experience(title, company, username) values($1, $2, $3)", [req.body.title, req.body.company, req.body.username]
            , function (err, rows, res){

        });

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

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.getUsersByApprovedDate = function(req, res){
  var results = [];

  pg.connect(conString, function (err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query("SELECT username, picture, fname, mname, lname from users where approvedat=$1", [req.query.date]);

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

exports.getAllUserExperience = function(req, res) {
    var results = [];

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * from user_experience");

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

exports.getUserExperience = function(req, res) {
    var results = [];

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * from user_experience where username=$1", [req.query.username]);

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
        client.query("UPDATE user_experience SET title=($1) company=($2) where company=($3) and title=($4)", [req.body.title, req.body.company, req.body.oldCompany, req.body.oldTitle]);

        // SQL Query > Select Data
        var query = client.query("SELECT * from user_experience where company=$1 and title = $2", [req.body.company, req.body.title]);

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

exports.deleteUserExperience = function(req, res) {

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
        var query = client.query("DELETE FROM user_experience WHERE company=($1) and title = ($2)", [req.body.company, req.body.title]);

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

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.connectUser = function(req, res){
    var results = [];

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("INSERT INTO user_connection(username1, username2, approvedat) values($1, $2, now())", [req.body.username1, req.body.username2]);

        query.on('end', function() {
            done();
            return res.status(200).json({ success: true});
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.approveConnectUser = function(req, res){
    var results = [];

    if(req.session.isadmin != '1'){
        return res.status(403).json({success: false})
    }

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("UPDATE user_connection set approvedat = now() where (username1=$1 and username2=$2) or (username1=$2 and username2=$1)",
            [req.body.username1, req.body.username2]);

        query.on('end', function() {
            done();
            return res.status(200).json({ success: true });
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.unconnect = function(req, res){
    var results = [];

    if(req.session.username != req.body.username1){
        return res.status(403).json({success: false})
    }

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("DELETE FROM user_connection where (username1=$1 and username2=$2) or (username1=$2 and username2=$1)",
            [req.body.username1, req.body.username2]);

        query.on('end', function() {
            done();
        });

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.showConnections = function(req, res){
    var results = [];

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT distinct users.username, users.picture, users.fname, users.mname, users.lname from user_connection join users on user_connection.username1 = users.username or user_connection.username2 = users.username where (username1 = $1 or username2 = $1) and users.username != $1", [req.query.username]);

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

exports.checkConnection = function(req, res){
    var results = [];

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * from user_connection where (username1=$1 and username2=$2) or (username1=$2 and username2=$1)", [req.query.username1, req.query.username2]);

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

exports.showMostInterestUser = function(req, res){
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT fieldofinterest, count(fieldofinterest) from users join user_connection on users.username = user_connection.username2 where user_connection.username1 = $1 or user_connection.username2 = $1 group by fieldofinterest having count(fieldofinterest) >= ALL(SELECT count(fieldofinterest) from users join user_connection on users.username = user_connection.username2 where user_connection.username1 = $1 or user_connection.username2 = $1 group by fieldofinterest) limit 1;", [req.session.username]);

        query.on('row', function(row) {
            done();
            return res.json(row);
        });

        query.on('end', function(){
          done();
          return {};
        })

        query.on('error', function(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        });
    });
}

exports.showMostOccupationUser = function(req, res){
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT occupation, count(occupation) from users join user_connection on users.username = user_connection.username2 where user_connection.username1 = $1 or user_connection.username2 = $1 group by occupation having count(occupation) >= ALL(SELECT count(occupation) from users join user_connection on users.username = user_connection.username2 where user_connection.username1 = $1 or user_connection.username2 = $1  group by occupation) limit 1", [req.session.username]);

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
}

exports.showMostOccupation = function(req, res){
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT occupation, count(occupation) from users group by occupation having count(occupation) >= ALL(SELECT count(occupation) from users group by occupation) limit 1;");

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
}

exports.showMostInterest = function(req, res){
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT fieldofinterest, count(fieldofinterest) from users group by fieldofinterest having count(fieldofinterest) >= ALL(SELECT count(fieldofinterest) from users group by fieldofinterest) limit 1;");

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
}
