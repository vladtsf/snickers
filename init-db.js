#!/usr/bin/env node

var
	program = require('commander'),
	ProgressBar = require('progress'),
	Db = require('mongodb').Db,
	connect = require('mongodb').connect;

program
  .version(require('./package.json').version)
  .usage('mongodb://localhost/default')
  .parse(process.argv);

connect(program.args[0] || Db.DEFAULT_URL, function(err, db) {
	db.collection('countries', function(err, collection) {

		function end() {
			db.close();
			console.log('\n');
		};

		var
			countries = require('./data/countries'),
			length = countries.length;

		var bar = new ProgressBar(':percent [:bar]', {
				complete: '.'
			,	incomplete: ' '
			,	width: length*3
			,	total: length
		});

		countries.forEach(function (data, index) {
			collection.find({name : data.name})
				.toArray(function (err, docs) {
					if(docs.length === 0) {
						collection.save(data, function() {
							bar.tick(1);

							if(--length == 0) {
								end();
							}
						});
					} else {
						bar.tick(1);

						if(--length == 0) {
							end();
						}
					}
				});
		});
	})
});