// app.js

(function($){

	function CountDownApp(el, options) {
		this.el = el;
		this.$el = $(el);

		this.options = $.extend({}, CountDownApp.DefaultOptions, options);
		var opts = this.options,
			$el = this.$el;

		$(opts.startBtn).hide(opts.showStartBtn);
		
		this.start();
		
		this.addEventHandlers();
	}

	CountDownApp.DefaultOptions = {
		countdown_sec: 30,
		startTime: function() { return new Date(Date.now() + this.countdown_sec * 1000);}, // 30 seconds count down //'2016/01/01',
		timeFormat: '%M:%S', //'%D days %H:%M:%S',
		autoStart: true,
		showStartBtn: true,
		startBtn: '#start',
		resetBtn: '#reset',
		autoHideReset: true,
		autoHideTime: 10 * 1000, // 10 000 milliseconds = 10 seconds
		animationSpeed: 'slow'
	}

	CountDownApp.prototype = {
		addEventHandlers: function() {
			$(this.options.resetBtn).click(this.reset.bind(this));
			$(this.options.startBtn).click(this.startClick.bind(this));
		},
		start: function() {
			if ( this.options.autoStart ) {
				this.startCountdown();
     		}
     		else {
     			// here init count-down value and stop count-down
     			this.startCountdown();
     			this.$el.countdown('stop');
     			this.$el.countdown('update'); //trigger update manually to change the DOM
     		}
		},
		startCountdown: function() {
			this.$el.countdown(this.options.startTime())
				.bind('update.countdown', {context: this}, this.update)
	     		.bind('finish.countdown', {context: this}, this.finish);
		},
		update: function(event) {
			var self = event.data.context; //get the context
			//console.log(event);
			$(this).val(
				event.strftime(self.options.timeFormat)
			);
		},
		finish: function(event) {
			var self = event.data.context; //get the context
			console.log('finished', event);
			$(this).val(
				event.strftime(self.options.timeFormat)
			); // update time input to have 00:00 displayed instead of 00:01

			$(self.options.resetBtn).fadeIn(self.options.animationSpeed);
			if ( self.options.autoHideReset ) {
				setTimeout(self.autohideReset.bind(self), self.options.autoHideTime);
			}
		},
		autohideReset: function() {
			$(this.options.resetBtn).fadeOut(this.options.animationSpeed);
		}
	};

	CountDownApp.EventHandlers = function() {

	};

	CountDownApp.EventHandlers.prototype = {
		reset: function() {
			console.log('reset clicked');
			this.$el.countdown(this.options.startTime());
		},
		startClick: function() {
			this.startCountdown();
		}
	};

	$.extend(CountDownApp.prototype, CountDownApp.EventHandlers.prototype);

	$(function() {
		var countDownApp = new CountDownApp('#timer');
	});

})(jQuery);