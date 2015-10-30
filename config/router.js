// config/router.js
var PageController = require('./../controllers/PageController');
module.exports = function (router) {
	router.route('/')
		.get(PageController.index);

	router.route('/login')
		.get(PageController.login);

	router.route('/api/users')
		.get(PageController.getUsers);

	router.route('/api/job')
		.get(PageController.getJobs);

	router.route('/api/job/:id')
		.get(PageController.getJob);

	router.route('/*')
		.get(PageController.homepage);

	return router;
};
