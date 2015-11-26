// config/router.js
var PageController = require('./../controllers/PageController');
var user = require('./../controllers/user');
var job = require('./../controllers/job');
var notif = require('./../controllers/notification');
var post = require('./../controllers/post');
var project = require('./../controllers/project');

/*code from: https://github.com/expressjs/multer/issues/170*/
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
	destination: function (req, file, cb) { //destination folder
		cb(null, './public/uploads/')
	},
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if (err) return cb(err);
			var name = raw.toString('hex') + path.extname(file.originalname);
			cb(null, name);
		});
	}
});
var upload = multer({ storage: storage });
var type = upload.single('image'); //name of the input file: <input type="file" name="image" />

module.exports = function (router) {
	router.route('/')
		.get(PageController.index);

	//----------------------- USERS -----------------------
	router.route('/api/users/')
		.get(user.getApprovedUsers)
		.post(type, user.createUser) //body: username, password, fname, mname, lname, isadmin, country
		.put(type, user.updateUser) //body: username, password, fname, mname, lname, occupation, college, degree, picture country
		.delete(user.deleteUser); //body: username

	router.route('/api/users/:username')
		.get(user.getOneUser); //params: username

	//----------------------- USERS PENDING -----------------------
	router.route('/api/user-pending/')
		.get(user.getPendingUsers)
		.post(user.approveUser); //body: username

	//----------------------- USERS EXPERIENCE ----------------------
	router.route('/api/user-experience/')
		.get(user.getUserExperience) //query: username
		.post(user.createUserExperience) //body: title, company, username
		.put(user.updateUserExperience) //body: username, title, company, oldCompany, oldTitle
		.delete(user.deleteUserExperience); //body: username, company, title

	router.route('/api/user-experience/all')
		.get(user.getAllUserExperience);

	//----------------------- USERS CONNECTION ----------------------
	router.route('/api/user-connection/')
		.get(user.showConnections) //query: username
		.post(user.connectUser) //body: username1, username2
		.put(user.approveConnectUser) //body: username1, username2
		.delete(user.unconnect); //body: username1, username2

	//----------------------- USERS NOTIF ----------------------
	router.route('/api/user-notif/')
		.get(notif.getNotifFromUser) //query: username
		.post(notif.createNotifFromUser); //body: text, url, username

	//----------------------- USERS COUNT ----------------------
	router.route('/api/user-count/')
		.get(user.userCount);

	//----------------------- JOB ----------------------
	router.route('/api/job-approved/')
		.get(job.getApprovedJobs);

	router.route('/api/job/')
		.get(job.getJobOne) //query: jobid
		.post(type, job.createJob) //body: name, country, company, username
		.put(type, job.updateJob) //body: jobid, description, fieldofinterestid, company, picture, name
		.delete(job.deleteJob); //body: jobid

	//----------------------- JOB VIEW INCREMENT ----------------------
	router.route('/api/job-increment')
		.put(job.updateJobView);

	//----------------------- RECOMMENDED JOBS ----------------------
	router.route('/api/job-recommended')
		.get(job.getRecommendedJobs);

	//----------------------- JOB NOTIFICATION ----------------------
	router.route('/api/job-notif/')
		.get(notif.getNotifFromJob) //query: jobid
		.post(notif.createNotifFromJob); //body: text, url, jobid

	//----------------------- JOB APPLICANT ----------------------
	router.route('/api/job-applicant/')
		.get(job.getApplicants) //query: jobid
		.post(job.addApplicant) //body: jobid, username
		.delete(job.removeApplicant); //body: jobid, username

	//----------------------- APPROVE JOB ----------------------
	router.route('/api/job-approve/')
		.post(job.approveJob); //body: jobid

	//----------------------- CLOSE JOB ----------------------
	router.route('/api/job-close/')
		.post(job.closeJob); //body: jobid

	//-------------------STATS-------------------
	router.route('/api/user-connection-interest')
		.get(user.showMostInterestUser); //session: username

	router.route('/api/user-connection-occupation')
		.get(user.showMostOccupationUser); //session: username

	router.route('/api/user-most-interest')
		.get(user.showMostInterest);

	router.route('/api/user-most-occupation')
		.get(user.showMostOccupation);

	router.route('/api/job-hottest/')
		.get(job.getHottestJobs);

	//----------------------- NOTIF ----------------------
	router.route('/api/notif/')
		.get(notif.getNotifs);

	//----------------------- FIELD OF INTEREST ----------------------
	router.route('/api/field-of-interest')
		.get(PageController.fieldOfInterest);

	//----------------------- POST ----------------------
	router.route('/api/post/')
		.get(post.getPosts) //query: username
		.post(post.createPost) //body: content, username
		.put(post.updatePost) //body: content, postid
		.delete(post.deletePost); //body: postid

	//----------------------- LIKE ----------------------
	router.route('/api/post-like/')
		.get(post.getLikes) //query: postid
		.post(post.likePost) //body: postid
		.delete(post.unlike); //body: postid

	//----------------------- COMMENT ----------------------
	router.route('/api/post-comment/')
		.get(post.showComment) //query: postid
		.post(post.comment) //body: postid, username, comment
		.delete(post.removeComment); //body: postid, username, comment, createdat

	//----------------------- PROJECT ----------------------
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

	router.route('/success') //test upload for user
		.get(PageController.successPage);

	router.route('/*')
		.get(PageController.homepage);

	return router;
};
