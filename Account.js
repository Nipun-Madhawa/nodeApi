var mongoose = require('mongoose');

// note: your host/port number may be different!
mongoose.connect('mongodb://localhost:27017/Accounts');

var Schema = mongoose.Schema;

var accountsSchema = new Schema( {
	firstName: {type: String, required: true, },
	lastName: {type: String,required: true},
	companyName:{type: String,required: true},
	phone: {type: String, required: true},
	conutry: {type:String},
	userName: {type: String, required: true,unique: true},
	password: {type: String, required: true},
	
    } );


module.exports = mongoose.model('Account', accountsSchema);
