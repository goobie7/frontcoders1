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
	            strings: ["nowoczesne strony www", "projekty graficzne"],
	            typeSpeed: 100,
	            loop: true,
	            startDelay: 1000,
	        });
    	});

	});


})();