//connecting to postgre
var pg = require('pg');
var conString = "postgres://postgres:12345678@localhost/postgres";
var db = require('./../lib/postgresql');

console.log(db);

pg.connect(conString, function(err, client, done) {
	if (err) {
		return console.error('error fetching client from pool', err);
	}
});

exports.index = function(req, res, next){
	res.render("index.html");
};

exports.login = function(req, res, next){
	res.render("login.html");
};

exports.homepage = function (req, res, next){
	res.render('homepage.html');
};

/*code from http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#server-side-routes*/
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

exports.getJobs = function(req, res) {
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

exports.getJob = function(req, res) {
    pg.connect(conString, function (err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

				// fix please, sql injectable
        var query = client.query("SELECT * FROM JOB where name=\'"+req.params.id+"\';");
        query.on('row', function(row) {
					done();
        	return res.json(row);
        });
    });
};
