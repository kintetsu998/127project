// config/router.js
var hello = require('./../controllers/hello');
module.exports = function (router) {
	router.route('/')
		.get(hello.print);
	router.route('/homepage.html')
		.get(function (req, res, next){
			res.render('homepage.html');
		});
	
	return router;
};