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
