// config/router.js
var PageController = require('./../controllers/PageController');
module.exports = function (router) {
	router.route('/')
		.get(PageController.index);

	router.route('/homepage')
		.get(PageController.homepage);

	router.route('/users')
		.get(PageController.getUsers);

	router.route('/job')
		.get(PageController.getJob);

	return router;
};
