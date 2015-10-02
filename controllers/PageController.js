exports.index = function(req,res,next){
	res.render("index.html");
};

exports.homepage = function (req, res, next){
	res.render('homepage.html');
};
