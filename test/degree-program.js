/* test/degree-program.js */
var supertest = require("supertest");
var should = require("should-http");

// This agent refers to PORT where program is running.
var server = supertest.agent("http://localhost:5000");

describe('Degree Program', function () {
	var insertedId = 1;

	// Test the find() degrees web service
	describe('find()', function () {
		it('should retrieve all degree program records', function (done) {
			server
				.get('/degree-programs')
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});
	});

	// Test the findOne() degree web service
	describe('findOne()', function () {
		it('should retrieve a degree program record', function (done) {
			server
				.get('/degree-programs/'+insertedId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['degree_id','degree_code','description','total_units']);
					done();
				});
		});

		it('should return error trying to retrieve a degree program record that does not exist', function (done) {
			server
				.get('/degree-programs/0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else{
						throw new Error({'message': 'Able to retrieve a non-existent degree program'});
					}
				});
		});
	});

	/* 
		INSERT should return the newly created row in JSON format.
		OK lang kahit mali :D
	*/
	describe('insert()', function () {
		it('should create a new degree program record', function (done) {
			var degreeProgram = {
				'code': 'BSDC',
				'name': 'BS Development Communication'
			};
			server
				.post('/degree-programs')
				.send(degreeProgram)
				.end(function (err, res) {
					if(err){
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['degree_id','degree_code','description','total_units']);
					insertId = res.body.id;
					done();
				});
		});
	});
	
	// Test update web service
	describe('update()', function () {
		it('should update a specific degree program record: total_units field only', function () {
			var update = {
				'units': 150
			};
			server
				.put('/degree-programs/'+insertedId)
				.send(update)
				.end(function(err, res) {
					if(err){
						throw err;
					}
					else{
						res.should.have.status(200);
						res.body.should.have.property('total_units',150);
						res.body.should.have.property('degree_code','BSCS');
						done();
					}
				})
		});
	});

	describe('remove()', function () {
		it('should remove a specific degree program record', function (done) {
			var deleteId = {
				'id': 4
			}
			server
				.delete('/degree-programs')
				.send(deleteId)
				.end(function(err, res) {
					if(err){
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});
	});
});
