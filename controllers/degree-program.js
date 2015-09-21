// controllers/degree-program.js
var db = require(__dirname + './../lib/mysql');

// Find all degrees.
exports.find = function (req, res, next) {
	db.query("SELECT * FROM degree", function (err, rows) {
		if(err) return(err);
		res.send(rows);
	});
};

// Find one degree program.
exports.findOne = function (req, res, next) {
	//console.log(req.params.id);
	db.query("SELECT * FROM degree WHERE degree_id='"+req.params.id+"'", function (err, rows) {
		if(err) return(err);
		if(rows.length === 0)
			res.send(404, {message: 'Degree program not found.'});
		else res.send(rows[0]);
	});
};

// Insert a degree program.
exports.insert = function (req, res, next) {
	db.query("INSERT INTO degree(degree_code,description) VALUES (?,?)", [req.body.code,req.body.name], function (err, rows) {
		if(err) return(err);
	});
	db.query("SELECT * FROM degree WHERE degree_id=LAST_INSERT_ID()", function (err, rows) {
		if(err) return(err);
		if(rows.length === 0)
			res.send(404, {message: 'Degree program not found.'});
		else res.send(rows[0]);
	});
}

// Delete a degree program.
exports.remove = function (req, res, next) {
	db.query("DELETE FROM degree WHERE degree_id='"+req.body.id+"'", function (err, rows) {
		if(err) return(err);
		if(rows.length === 0)
			res.send(404, {message: 'Degree program not found.'});
		else res.send(rows);
	});
};

// Update a degree program.
exports.update = function (req, res, next) {
	db.query("UPDATE degree SET total_units='"+req.body.units+"', degree_code='"+req.body.code+"', description='"+req.body.name+"' WHERE degree_id='"+req.params.id+"'", function (err, rows) {
		if(err) return(err);
		if(rows.length === 0)
			res.send(404, {message: 'Degree program not found.'});
		else res.send(rows);
	});
};
