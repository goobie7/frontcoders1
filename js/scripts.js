	function init() {

		function toggleClass(elem) {
			let target = elem.querySelector('.works_description');
			target.classList.toggle('hide_this');
		}

		var section = document.getElementById('our_works');
		var items = section.querySelectorAll('.works_tile');

		for(i=0; i <items.length; i++) {
			items[i].addEventListener('mouseenter', toggleClass.bind(this, items[i]) );
			items[i].addEventListener('mouseleave', toggleClass.bind(this, items[i]) );
		}
	}

window.onload = init;

(function(){

		$(document).ready(function() {
			var $body = $('body'),
				$mainNav = $('.main_navigation'),
				$navOpenBtn = $('.btn_toggle_menu'),
				$navCloseBtn = $('.main_navigation-close-btn');


			$mainNav.find('li a').on('click', function(e){
				$body.toggleClass('nav-visible');
				e.preventDefault();
				var target = $($(this).attr('href'));
				$('html, body').animate({
					scrollTop : target.offset().top + 200
				}, 1000);
			});

			$navOpenBtn.on('click', function() {
				$body.addClass('nav-visible');
			});

			$navCloseBtn.on('click', function(){
				$body.removeClass('nav-visible');
			});

			// Script resposible for typing effect on site

			
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

	        function showFixedNavbar() {
	        	var windowScroll = $(window).scrollTop();
	        	var headerHeight = $('header').height();
	        	if (windowScroll > headerHeight) {
	        		console.log('hehawoidjaodawiuhdwiauhdiauwhdiawhdi');
	        		$('.logo_btn-wrapper').addClass('fixed-position');
	        	} else {
	        		$('.logo_btn-wrapper').removeClass('fixed-position');
	        	}
	        }

	        $(window).scroll(showFixedNavbar);
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
