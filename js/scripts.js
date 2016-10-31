(function(){


	$(document).ready(function() {
		var $body = $('body'),
			$mainNav = $('.main_navigation'),
			$navOpenBtn = $('.btn_toggle_menu'),
			$navCloseBtn = $('.main_navigation-close-btn');

		$navOpenBtn.on('click', function() {
			$body.addClass('nav-visible');
		});

		$navCloseBtn.on('click', function(){
			$body.removeClass('nav-visible');
		});


		// Script resposible for typing effect on site

		$(function(){
	        $(".text_typed").typed({
	            strings: [
								"nowoczesne strony www",
								"projekty graficzne",
								"szablony Wordpress",
								"fotografie",
								"dobry klimat <br> współpracy ;)"
							],
	            typeSpeed: 100,
	            loop: true,
	            startDelay: 1000,
	        });
    	});

	});


})();









// ### Funny Facts Launcher
// using waypoints
$("#funny_facts").waypoint(function(){

	// Counting jQ script
	$('.counting').each(function() {

	  var $this = $(this);
	  var startNum = $this.text();
	  var countTo = $this.attr('count-target');

	  $({ countNum: startNum }).animate({ countNum: countTo },
	    {
	      duration: 10000,
	      easing:'swing',
	      step: function() { $this.text(Math.floor(this.countNum)); },
	      complete: function() { $this.text(this.countNum ); }
	    }
	  );
	});
	this.destroy();

}, {offset : '60%', triggerOnce: false});
