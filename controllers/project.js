//connecting to postgre
var pg = require('pg');
var c = require('../config/config.js');
var conString = "postgres://" + c.username +":" + c.password + "@localhost/" + c.database + "";

pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
});

exports.getProjects = function(req, res) {
    var results = [];

    if(!username in req.session){
        return res.status(403).json({success: false})
    }

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * from project where username=$1", [req.query.username]);
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

exports.createProject = function(req, res) {

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
        var create = client.query("INSERT INTO project(projectname, createdat, username) VALUES ($1, now(), $2)", 
        	[req.body.projectname, req.body.username]);

        create.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });

        create.on('row', function(row){
            var query = client.query("SELECT * from post where projectid=currval('project_projectid_seq')");

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

exports.updateProject = function(req, res) {

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
        client.query("UPDATE project SET projectname = ($2), description = ($3), picture = ($4) WHERE projectid=($1)", 
            [req.body.projectid, req.body.projectname, req.body.description, req.body.picture]);

        // SQL Query > Select Data
        var query = client.query("SELECT * project post where projectid=$1", [req.body.projectid]);

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

exports.deleteProject = function(req, res) {

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
        var query = client.query("DELETE FROM project WHERE projectid=($1)", [req.body.projectid]);

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

exports.getProjectFieldRelated = function(req, res) {
    var results = [];

    if(!username in req.session){
        return res.status(403).json({success: false})
    }

    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * from project_fieldrelated join fieldofineterstwhere projectid=$1", 
        	[req.query.projectid]);
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

exports.createProjectFieldRelated = function(req, res) {
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
        var create = client.query("INSERT INTO project_fieldrelated(fieldofinterestid, projectid) VALUES ($1, $2)", 
        	[req.body.fieldofinterestid, req.body.projectid]);

        create.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });

       	query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });

         // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true});
        }); 
    });
}

exports.updateProjectFieldRelated = function(req, res) {

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
        client.query("UPDATE project_fieldrelated SET fieldofinterestid = ($2), projectid = ($1)WHERE projectid=($1) and fieldofinterestid=($3)", 
            [req.body.projectid, req.body.fieldofinterestid, req.body.oldfieldofinterestid]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });

         // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true});
        }); 
    });
}

exports.deleteProjectFieldRelated = function(req, res) {
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
        var query = client.query("DELETE FROM project_fieldrelated WHERE fieldofinterestid = $1 and projectid = $2", 
        	[req.body.fieldofinterestid, req.body.projectid]);	

        query.on('error', function() {
            done();
            return res.status(500).json({ success: false, data: err});
        });

         // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(200).json({success: true});
        }); 
    });
}