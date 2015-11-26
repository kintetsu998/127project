// config/router.js
var PageController = require('./../controllers/PageController');
var user = require('./../controllers/user');
var job = require('./../controllers/job');
var notif = require('./../controllers/notification');
var post = require('./../controllers/post');
var project = require('./../controllers/project');

var multer = require('multer')({ dest: './uploads/'}); //destination folder
var type = multer.single('image'); //name of the input file: <input type="file" name="image" />

module.exports = function (router) {
	router.route('/')
		.get(PageController.index);

	router.route('/api/users/')
		.get(user.getApprovedUsers)
		.post(type, user.createUser) //body: username, password, fname, mname, lname, isadmin, country
		.put(type, user.updateUser) //body: username, password, fname, mname, lname, occupation, college, degree, picture country
		.delete(user.deleteUser); //body: username


	router.route('/api/users/:username')
		.get(user.getOneUser); //params: username

	router.route('/api/user-pending/')
		.get(user.getPendingUsers)
		.post(user.approveUser); //body: username

	router.route('/api/user-experience/')
		.get(user.getUserExperience) //query: username
		.post(user.createUserExperience) //body: title, company, username
		.put(user.updateUserExperience) //body: username, title, company, oldCompany, oldTitle
		.delete(user.deleteUserExperience); //body: username, company, title

	router.route('/api/user-experience/all')
		.get(user.getAllUserExperience);

	router.route('/api/user-connection/')
		.get(user.showConnections) //query: username
		.post(user.connectUser) //body: username1, username2
		.delete(user.unconnect); //body: username1, username2

	router.route('/api/user-connection-interest')
		.get(user.showMostInterestUser); //session: username

	router.route('/api/user-connection-occupation')
		.get(user.showMostOccupationUser); //session: username

	router.route('/api/user-most-interest')
		.get(user.showMostInterest);

	router.route('/api/user-most-occupation')
		.get(user.showMostOccupation);

	router.route('/api/user-notif/')
		.get(notif.getNotifFromUser) //query: username
		.post(notif.createNotifFromUser); //body: text, url, username

	router.route('/api/user-count/')
		.get(user.userCount);

	router.route('/api/job-approved/')
		.get(job.getApprovedJobs);

	router.route('/api/job/')
		.get(job.getJobOne) //query: jobid
		.post(type, job.createJob) //body: name, country, company, username
		.put(type, job.updateJob) //body: jobid, description, fieldofinterestid, company, picture, name
		.delete(job.deleteJob); //body: jobid

	router.route('/api/job-increment')
		.put(job.updateJobView);

	router.route('/api/job-notif/')
		.get(notif.getNotifFromJob) //query: jobid
		.post(notif.createNotifFromJob); //body: text, url, jobid

	router.route('/api/job-hottest/')
		.get(job.getHottestJobs);

	router.route('/api/job-applicant/')
		.get(job.getApplicants) //query: jobid
		.post(job.addApplicant) //body: jobid, username
		.delete(job.removeApplicant); //body: jobid, username

	router.route('/api/job-approve/')
		.post(job.approveJob); //body: jobid

	router.route('/api/job-close/')
		.post(job.closeJob); //body: jobid

	router.route('/api/notif/')
		.get(notif.getNotifs);

	router.route('/api/post/')
		.get(post.getPosts) //query: username
		.post(post.createPost) //body: content, username
		.put(post.updatePost) //body: content, postid
		.delete(post.deletePost); //body: postid

	router.route('/api/post-like/')
		.get(post.getLikes) //query: postid
		.post(post.likePost) //body: postid
		.delete(post.unlike); //body: postid

	router.route('/api/post-comment/')
		.get(post.showComment) //query: postid
		.post(post.comment) //body: postid, username, comment
		.delete(post.removeComment); //body: postid, username, comment, createdat

	router.route('/api/project/')
		.get(project.getProjects) //body: username
		.post(type, project.createProject) //body: name, username
		.put(type, project.updateProject) //body: projectid, projectname, description, picture
		.delete(project.deleteProject); //body: projectid

	router.route('/api/whoami/')
		.get(PageController.whoami);

	router.route('/search/')
		.get(PageController.search);

	router.route('/log/')
		.get(PageController.getLogs)
		.post(PageController.createLog);

	router.route('/create/')
		.get(PageController.createPage);

	router.route('/login/')
		.get(PageController.loginPage)
		.post(PageController.login);

	router.route('/logout/')
		.post(PageController.logout);

	router.route('/upload/') //test upload for user
		.get(PageController.uploadPage);


	router.route('/*')
		.get(PageController.homepage);

	return router;
};
