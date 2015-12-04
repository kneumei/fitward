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
		name: String,
		goal: Number,
		goalBeginDate: Date,
		deviceSync: {
			lastSyncDate: Date,
			runningTotal: Number,
			deviceType: String,
			deviceCurrency: String
		} 
	}
	
});

module.exports = mongoose.model('User', userSchema);