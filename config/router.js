// config/router.js
var PageController = require('./../controllers/PageController');
module.exports = function (router) {
	router.route('/')
		.get(PageController.index);

	router.route('/api/users')
		.get(PageController.getUsers)
		.post(PageController.createUser)
		.put(PageController.updateUser)
		.delete(PageController.deleteUser);

	router.route('/api/users/experience')
		.post(PageController.createUserExperience)
		.put(PageController.updateUserExperience);

	router.route('/api/users/interest')
		.post(PageController.createFieldOfInterest)
		.put(PageController.updateFieldOfInterest);

	router.route('/api/users/notif')
		.post(PageController.createNotifFromUser);

	router.route('/api/users/count')
		.get(PageController.userCount);

	router.route('/api/job')
		.get(PageController.getJob)
		.post(PageController.createJob)
		.put(PageController.updateJob)
		.delete(PageController.deleteJob);

	router.route('/api/job/notif')
		.post(PageController.createNotifFromJob);

	router.route('/api/notif')
		.get(PageController.getNotifs)

	router.route('/search')
		.get(PageController.search);

	router.route('/login')
		.get(PageController.loginPage)
		.post(PageController.login);

	router.route('/logout')
		.post(PageController.logout);

	router.route('/*')
		.get(PageController.homepage);

	return router;
};
