(function ($, undefined) {
	
	var Cookie = $.Sports.Cookie;


	var
		Sports = $.Sports,
		Cookie	= Sports.Cookie,
		Control	= Sports.Control,
		Template = Sports.Template,
		tpl = SnickersTemplates;

	var cache = function(selector, $context) {
		var c = $context || document.body;

		if(typeof cache[c] == 'undefined') {
			cache[c] = {};
			cache[c][selector] = $(selector, $context);
		} else if (typeof[c][selector] == 'undefined') {
			cache[c][selector] = $(selector, $context);
		}

		return cache[c][selector];
	};

	var Widget = function() {
		var $context = $('<div id="snickersContext"></div>').prependTo(document.body);

		this._currentSlide = 0;
		this._selectOpened = false;

		this
			.init($context, {
				selectors	: {
					scrollLeft			: '.widget-foot .browse.left',
					scrollRight			: '.widget-foot .browse.right',
					flagSelect			: '.send-snickers .flag-select',
					scrollChunks		: '.widget-foot .scrollable-flag .items-f .chunk',
					chunksContainer	: '.widget-foot .scrollable-flag .items-f',
					flagsDropdown		: '.send-snickers .flag-select-dropdown',
					currentFlag			: '.send-snickers .flag-select .flag-s',
					flagsInDropdown	: '.send-snickers .flag-select-dropdown .flag-s',
					save					: '.send-s-but'
				},
				classes		: {
				},
				templates	: {
				},
				services		: {
					countries	: '/countries.json',
					star			: Template('/star/:id:').compile()
				}
			});
	};

	Widget.prototype = Control({
		
		listen: function() {			
			with(this.config) {
				with(this.elements) {

					$
						.when($.getJSON(services.countries))
						.then(function(countries) {
							this.countries = countries;

							this.getCountry = function(id) {
								var country;

								$.each(countries, function(i, e) {
									if(e._id == id) {
										country = e;
										return false;
									}
								});

								return country;
							}

							if(Cookie.get('client_voted')) {
								this.$context.html(tpl['widget-results.jade']({
									country	: this.getCountry(Cookie.get('client_voted')),
									enc		: encodeURIComponent
								}));

								return this;
							}

							this.$context.html(tpl['widget-vote.jade']({
								countries	: countries,
								random		: Math.floor(Math.random() * 1000) % 16
							}));

							var
								$items = cache(selectors.chunksContainer),
								$first = cache(selectors.scrollChunks, this.$context).first(),
								$right = cache(selectors.scrollRight, this.$context),
								$flagsDropdown = cache(selectors.flagsDropdown, this.$context),
								$left = cache(selectors.scrollLeft, this.$context);

							this
								.on('click', selectors.scrollRight + ':not(.disabled)', function(e) {
									this.lock();

									$items
										.animate({
											marginLeft	: '-=' + $first.width() + 'px'
										}, 800, 'easeOutBounce');

									if(++this._currentSlide == cache(selectors.scrollChunks, this.$context).length - 1) {
										$(e.currentTarget).addClass('disabled');
									} else {
										$(e.currentTarget).removeClass('disabled');
									}

									$left.removeClass('disabled');

									$
										.when($items)
										.then(this.unlock.bind(this));
								})
								.on('click', selectors.scrollLeft + ':not(.disabled)', function(e) {
									this.lock();

									$items
										.animate({
											marginLeft	: '+=' + $first.width() + 'px'
										}, 800, 'easeOutBounce');
									
									if(--this._currentSlide == 0) {
										$(e.currentTarget).addClass('disabled');
									} else {
										$(e.currentTarget).removeClass('disabled');
									}

									$right.removeClass('disabled');

									$
										.when($items)
										.then(this.unlock.bind(this));
								})
								.on('click', this.$context, function(e) {
									if(this._selectOpened) {
										var $dropdown = cache(selectors.flagsDropdown, this.$context);

										if($dropdown.is(e.target) || $dropdown.has(e.target)) {
											this.lock();

											this._selectOpened = false;

											$
												.when($flagsDropdown.fadeOut(100))
												.then(this.unlock.bind(this));

											return false;
										}
									}
								})
								.on('click', selectors.flagSelect, function(e) {
									this.lock();

									this._selectOpened = !this._selectOpened;

									$
										.when($flagsDropdown.fadeToggle(100))
										.then(this.unlock.bind(this));
								})
								.on('click', selectors.flagsInDropdown, function(e) {
									this.$context
										.find(selectors.currentFlag)
										.replaceWith($(e.currentTarget).clone())

									$flagsDropdown.hide();
								})
								.on('click', selectors.save, function(e) {
									this.lock();

									var id = this.$context.find(selectors.currentFlag).data('id');

									$
										.ajax({
											url			: services.star.eval({id:id}),
											dataType		: 'json',
											type			: 'post'
										})
										.then(function(data, status) {
											if(data.success) {
												Cookie.set('client_voted', id, 86400);

												this.$context.html(tpl['widget-results.jade']({
													country	: this.getCountry(id),
													enc		: encodeURIComponent
												}));
											}
										}.bind(this))
										.fail(function(data, status) {
											alert('Вы уже проголосовали!');
											this.unlock();
										}.bind(this));
								});



						}.bind(this))

				}
			}
			
			return this;
		}
		
	});

	$(function () {
		$.SnickersWidget = new Widget();
	})


})(jQuery);