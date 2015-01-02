
var restful = require('node-restful'),
	ProductSchema = require("../schemas/product"),
	products = require('../controllers/product');


function setUpdatedField (req, res, next) {
	if ( typeof req.body === 'object' ) {
		req.body.updated = Date.now();
	}
	next();
}

function getLatestProducts (req, res, next) {
	products.getLatest(function (err, products) {
		if (err) return next(err);
		res.json(products);
	});
}

module.exports = function (app) {
	var Products = restful.model('products', ProductSchema);

	Products.methods(['get', 'post', 'put', 'delete']);

	Products.before('put', setUpdatedField);

	Products.route('latest.get', getLatestProducts); // GET /api/products/latest

	Products.register(app, '/api/products');
};
