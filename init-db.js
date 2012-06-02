#!/usr/bin/env node

var
	program = require('commander'),
	Db = require('mongodb').Db,
	connect = require('mongodb').connect;

program
  .version(require('./package.json').version)
  .usage('mongodb://localhost/default')
  .parse(process.argv);

connect(program.args[0] || Db.DEFAULT_URL, function(err, db) {
	db.collection('countries', function(err, collection) {

		var
			countries = require('./data/countries'),
			length = countries.length;

		countries.forEach(function (data, index) {
			collection.find({name : data.name})
				.toArray(function (err, docs) {
					if(docs.length === 0) {
						collection.save(data, function() {
							console.log('Added: ' + data.name);

							if(--length == 0) {
								db.close();
							}
						});
					} else {
						console.log('Exists: ' + data.name);

						if(--length == 0) {
							db.close();
						}
					}
				});
		});
	})
});