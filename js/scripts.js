window.onload = init;

function init() {

// ###### Our Works TOGGLE
	var section = document.getElementById('our_works');
	var items = section.querySelectorAll('.works_tile');

		for(a=0; a<items.length; a++) {

			function toggle() {
					var target = this.querySelector('.works_description');
					target.classList.toggle('hide_this');
			}

			items[a].addEventListener('mouseenter', toggle );
			items[a].addEventListener('mouseleave', toggle );
			console.log(items[a]);
	}
}


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
								"fotografie...",
								"dobry klimat współpracy ;)"
							],
	            typeSpeed: 100,
	            loop: true,
	            startDelay: 1000,
	        });
    	});

	});


})();









// ###### Funny Facts Launcher
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
