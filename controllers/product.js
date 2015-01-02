
var restful = require('node-restful'),
	mongoose = restful.mongoose,
	ProductSchema = require("../schemas/product"),
	ProductModel = mongoose.model('Product', ProductSchema);

// This returns the two latest updated products
function getLatest (callback) {
	ProductModel.find().sort({updated: -1}).limit(2).exec(callback);
}

module.exports = {
	getLatest : getLatest
};
