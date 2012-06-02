var
	mongoose = require('../lib/db'), 
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


var Country = new Schema({
		name		: String
	,	rating	: { type: Number, index: true, default: 0 }
	,	flag		: Number
});

var Model = module.exports = mongoose.model('Country', Country);