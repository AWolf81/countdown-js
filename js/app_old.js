// app.js

// count down example
// not used, because it's easier to use jquery countdown plugin
// also there are some point that are not perfect below:
// 1. start_time is a string instead of new Date()
// 2. tick can be improved == 0 is always false inside of > 0

(function($) {
"use strict";

	function Countdown() {
        this.start_time = "00:30";
        this.target_id = "#timer";
        //this.name = "timer";
    }

    Countdown.prototype = {
        init: function () {
            console.log('init called');
            this.reset();
            
            $('#start').click(this.start.bind(this));
            $('#reset').click(this.reset.bind(this));
        },
        reset: function () {
            var time = this.start_time.split(":");
            //this.minutes = parseInt(time[0]);
            this.seconds = parseInt(time[1]);
            this.update_target();
        },
        tick: function () {
            if (this.seconds > 0) //|| this.minutes > 0)
            {
                if (this.seconds == 0) {
                    // this.minutes = this.minutes - 1;
                    this.seconds = 59
                } else {
                    this.seconds = this.seconds - 1;
                }
                this.start();
            }
            else {
                // show reset button
                $('#reset').fadeIn('slow');
                setTimeout(this.autoHideReset, 10 * 1000); // hide in 10 sec.
            }
            this.update_target();
        },
        start: function() {
            console.log('start called');
            //setTimeout(this.name + '.tick()', 1000);
            setTimeout(this.tick.bind(this), 1000);
        },
        update_target: function () {
            var seconds = this.seconds;
            //if (seconds < 10) seconds = "" + seconds;
            $(this.target_id).val(seconds);
        },
        autoHideReset: function() {
        	$('#reset').fadeOut('slow');
        }
    };

$(function() {
    var counter = new Countdown();
    counter.init();
});

})(jQuery);