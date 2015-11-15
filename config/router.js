// config/router.js
var PageController = require('./../controllers/PageController');
module.exports = function (router) {
	router.route('/')
		.get(PageController.index);

	router.route('/api/users')
		.get(PageController.getUsers);

	router.route('/job')
		.get(PageController.getJob)
		.post(PageController.createJob);

	router.route('/job/:id')
		.get(PageController.searchJob);

	router.route('/searchUser')
		.get(PageController.searchUsers);

	router.route('/search')
		.get(PageController.search);

	router.route('/searchJob')
		.get(PageController.searchJob);

	router.route('/whoami')
		.get(PageController.whoami);

	router.route('/login')
		.get(PageController.loginPage)
		.post(PageController.login);

	router.route('/logout')
		.post(PageController.logout);

	router.route('/*')
		.get(PageController.homepage);

	return router;
};
