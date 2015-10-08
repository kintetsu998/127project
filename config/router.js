// config/router.js
var PageController = require('./../controllers/PageController');
module.exports = function (router) {
	router.route('/')
		.get(PageController.index);

	router.route('/homepage')
		.get(PageController.homepage);

	router.route('/test')
		.get(PageController.sampleDB);

	return router;
};
