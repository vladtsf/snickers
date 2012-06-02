var
	util = require('util'),
	app = require('../../app'),
	Country = require('../../models/country');

var
	rating = new Array(16),
	ids = {},
	idxs = {};

Country.find({}, ['_id'], function(err, countries) {

	countries.forEach(function(country, idx) {
		ids[country._id] = idx + 1;
		idxs[idx] = country._id;
	});

	app.get(/star\/([\w\d]+)\/?/, function(req, res) {
		var id = req.route.params[0];

		if(req.cookies.voted) {
			res.json({
				success	: false,
				error		: 'you have already voted'
			}, 403)
		} else if(ids[id]) {
			var idx = ids[id]-1;

			res
				.cookie('voted', 1, {
					expires: new Date(Date.now() + 864e5),  // 1 day
					httpOnly: true
				});
			res
				.json({
					success	: true
				});

			rating[idx] = rating[idx] + 1 || 1;
		} else {
			res.json({
				success	: false,
				error		: 'unknown team'
			}, 403)
		}
	});

	app.get('/countries.json', function(req, res) {
		Country
			.find({})
			.desc('rating')
			.run(function (err, countries) {
				if(err) {
					res.json([]);
				} else {
					res.json(countries);
				}
			});
	});

	setInterval(function() {
		rating.forEach(function(value, idx) {
			var id = idxs[idx];

			if(value > 0) {
				Country.update(
					{
						_id	: id
					},
					{ 
						$inc: {
							rating: value 
						}
					},
					function() {
						console.log(util.format('[%d]: %s +%d', idx, id, value));
					}
				);
			}
		});

		rating = new Array(16);

	}, 60e3);

});
