var request = require('request')

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
	  res.render('index', {title: 'Fitward'}); 
	});
	
	app.get('/auth/misfit', passport.authenticate('misfit', {scope: ['profile', 'device']}));
 
	app.get('/auth/misfit/callback',
		passport.authenticate('misfit', {successRedirect: '/profile', failureRedirect: '/'}) 
	);
	
	app.get('/profile', isLoggedIn, function(req, res) {
		var options = {
			url:'https://api.misfitwearables.com/move/resource/v1/user/me/activity/summary?start_date=2015-11-03&end_date=2015-11-05',
			headers: {
				'access_token': req.user.misfit.token
			}
		}
		request(options, function(err, response, body){
			if(err){
				console.log(err);
			}else{
			 console.log(body);   
			}
			
			res.render('profile', {
				user : req.user
			});	
		})
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}