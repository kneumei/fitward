var User = require('../models/user');
var configAuth = require('./auth');

var MisfitStrategy = require('passport-misfit').Strategy;

module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	
	passport.use(new MisfitStrategy({
		clientID: configAuth.misfitAuth.clientID,
		clientSecret: configAuth.misfitAuth.clientSecret,
		callbackURL: configAuth.misfitAuth.callbackURL
		}, 
		function(token, refreshToken, profile, done){
			process.nextTick(function () {
				User.findOne({ 'misfit.id': profile.userId }, function (err, user) {
					if (err)
						return done(err);
					if (user) {
						return done(null, user);
					} else {
						var newUser = new User();
						newUser.misfit.id = profile.userId	;
						newUser.misfit.token = token,
						newUser.misfit.name = profile.name,
						newUser.misfit.email = profile.email;
						
						newUser.goal = {points: 0, goal: 1000, rewards: 0, pointsPeriodBeginDate: new Date(), lastSyncDate: null };
	
						newUser.save(function (err) {
							if (err) throw err;
							return done(null, newUser);
						})
					}
				});
			});
	}));
};