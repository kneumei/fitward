var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	
	misfit: {
		id: String,
		token: String,
		email: String,
		name: String,
	}, 
	
	goal: {
		goal: Number,
		points: Number,
		rewards: Number,
		pointsPeriodBeginDate: Date,
		lastSyncDate: Date, 
	}
	
});

module.exports = mongoose.model('User', userSchema);