jQuery(document).ready(function($){


	$(function(){
		"use strict";
			$('.home-section').css({'height':($(window).height())+'px'});
			$(window).resize(function(){
			$('.home-section').css({'height':($(window).height())+'px'});
			});
	});

	//Check IE11

    

	//change this value if you want to change the speed of the scale effect
	var	scaleSpeed = 0.3,
	//change this value if you want to set a different initial opacity for the .cd-half-block
	boxShadowOpacityInitialValue = 0.7,
	animating = false; 
	
	//check the media query 
	var MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	$(window).on('resize', function(){
		MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	});

	//bind the animation to the window scroll event
	triggerAnimation();
	$(window).on('scroll', function(){
		triggerAnimation();
	});

	//move to next/previous section
	$('.cd-vertical-nav .cd-prev').on('click', function(){
		prevSection();
	});
	$('.cd-vertical-nav .cd-next').on('click', function(){
		nextSection();
	});
	$(document).keydown(function(event){
		if( event.which=='38' ) {
			prevSection();
			event.preventDefault();
		} else if( event.which=='40' ) {
			nextSection();
			event.preventDefault();
		}
	});

	function triggerAnimation(){
		if(MQ == 'desktop') {
			//if on desktop screen - animate sections
			(!window.requestAnimationFrame) ? animateSection() : window.requestAnimationFrame(animateSection);
		} else {
			//on mobile - remove the style added by jQuery 
			$('.cd-section').find('.cd-block').removeAttr('style').find('.cd-half-block').removeAttr('style');
		}
		//update navigation arrows visibility
		checkNavigation();
	}
	
	
	
		
	    //Set each section's height equals to the window height
    $('section').width($(window).width());
    /*set the class 'active' to the first element 
     this will serve as our indicator*/
	 
    $('section:first').addClass('active');

    /* handle the mousewheel event together with 
     DOMMouseScroll to work on cross browser */
    $(document).on('mousewheel DOMMouseScroll', function (e) {
        e.preventDefault();//prevent the default mousewheel scrolling
        var active = $('section.active');
        //get the delta to determine the mousewheel scrol UP and DOWN
        var delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;

        //if the delta value is negative, the user is scrolling down
		
					
        if (delta < 0) {
			
            //mousewheel down handler
            next = active.next();
            //check if the next section exist and animate the anchoring
            if (next.length) {
               /*setTimeout is here to prevent the scrolling animation
                to jump to the topmost or bottom when 
                the user scrolled very fast.*/
                var timer = setTimeout(function () {
                    /* animate the scrollTop by passing 
                    the elements offset top value */
                    $('body, html').animate({
                        scrollTop: next.offset().top
                    }, 'slow');
                    
                    // move the indicator 'active' class
                    next.addClass('active')
                        .siblings().removeClass('active');
                    
                    clearTimeout(timer);
                }, 100);
            }

        } else {
            //mousewheel up handler
            /*similar logic to the mousewheel down handler 
            except that we are animate the anchoring 
            to the previous sibling element*/
            prev = active.prev();
		          
            

            if (prev.length) {
                var timer = setTimeout(function () {
                    $('body, html').animate({
                        scrollTop: prev.offset().top
                    }, 'slow');

                    prev.addClass('active')
                        .siblings().removeClass('active');
                    
                    clearTimeout(timer);
                }, 100);
            }

        }
    });



	
	
	
	function animateSection () {
		var scrollTop = $(window).scrollTop(),
		windowHeight = $(window).height(),
		windowWidth = $(window).width();
		
		$('.cd-section').each(function(){
			var actualBlock = $(this),
			offset = scrollTop - actualBlock.offset().top,
			scale = 1,
			translate = windowWidth/2+'px',
			opacity,
			boxShadowOpacity;

			if( offset >= -windowHeight && offset <= 0 ) {
				//move the two .cd-half-block toward the center - no scale/opacity effect
				scale = 1,
				opacity = 1,
				translate = (windowWidth * 0.5 * (- offset/windowHeight)).toFixed(0)+'px';

			} else if( offset > 0 && offset <= windowHeight ) {
				//the two .cd-half-block are in the center - scale the .cd-block element and reduce the opacity
				translate = 0+'px',
				scale = (1 - ( offset * scaleSpeed/windowHeight)).toFixed(5),
				opacity = ( 1 - ( offset/windowHeight) ).toFixed(5);

			} else if( offset < -windowHeight ) {
				//section not yet visible
				scale = 1,
				translate = windowWidth/2+'px',
				opacity = 1;

			} else {
				//section not visible anymore
				opacity = 0;
			}
			
			boxShadowOpacity = parseInt(translate.replace('px', ''))*boxShadowOpacityInitialValue/20;
			
			//translate/scale section blocks
			scaleBlock(actualBlock.find('.cd-block'), scale, opacity);

			var directionFirstChild = ( actualBlock.is(':nth-of-type(even)') ) ? '-': '+';
			var directionSecondChild = ( actualBlock.is(':nth-of-type(even)') ) ? '+': '-';
			if(actualBlock.find('.cd-half-block')) {
				translateBlock(actualBlock.find('.cd-half-block').eq(0), directionFirstChild+translate, boxShadowOpacity);
				translateBlock(actualBlock.find('.cd-half-block').eq(1), directionSecondChild+translate, boxShadowOpacity);	
			}
			//this is used to navigate through the sections
			( offset >= 0 && offset < windowHeight ) ? actualBlock.addClass('active') : actualBlock.removeClass('active');		
		});
}

function translateBlock(elem, value, shadow) {
	var position = Math.ceil(Math.abs(value.replace('px', '')));
	
	if( position >= $(window).width()/2 ) {
		shadow = 0;	
	} else if ( position > 20 ) {
		shadow = boxShadowOpacityInitialValue;
	}

	elem.css({
		'-moz-transform': 'translateX(' + value + ')',
		'-webkit-transform': 'translateX(' + value + ')',
		'-ms-transform': 'translateX(' + value + ')',
		'-o-transform': 'translateX(' + value + ')',
		'transform': 'translateX(' + value + ')',
		'box-shadow' : '0px 0px 40px rgba(0,0,0,'+shadow+')'
	});
}

function scaleBlock(elem, value, opac) {
	elem.css({
		'-moz-transform': 'scale(' + value + ')',
		'-webkit-transform': 'scale(' + value + ')',
		'-ms-transform': 'scale(' + value + ')',
		'-o-transform': 'scale(' + value + ')',
		'transform': 'scale(' + value + ')',
		'opacity': opac
	});
}

function nextSection() {
	if (!animating) {
		if ($('.cd-section.active').next().length > 0) smoothScroll($('.cd-section.active').next());
	}
}

function prevSection() {
	if (!animating) {
		var prevSection = $('.cd-section.active');
		if(prevSection.length > 0 && $(window).scrollTop() != prevSection.offset().top) {
			smoothScroll(prevSection);
		} else if(prevSection.prev().length > 0 && $(window).scrollTop() == prevSection.offset().top) {
			smoothScroll(prevSection.prev('.cd-section'));
		}
	}
}

function checkNavigation() {
	// ( $(window).scrollTop() < $(window).height()/2 ) ? $('.cd-vertical-nav .cd-prev').addClass('inactive') : $('.cd-vertical-nav .cd-prev').removeClass('inactive');
	// ( $(window).scrollTop() > $(document).height() - 3*$(window).height()/2 ) ? $('.cd-vertical-nav .cd-next').addClass('inactive') : $('.cd-vertical-nav .cd-next').removeClass('inactive');
	( $(window).scrollTop() < $(window).height()/2 ) ? $('.cd-vertical-nav .cd-prev').addClass('inactive') : $('.cd-vertical-nav .cd-prev').removeClass('inactive');
	( $(window).scrollTop() < $(window).height()/2 ) ? $('.cd-vertical-nav .cd-next').addClass('inactive1') : $('.cd-vertical-nav .cd-next').removeClass('inactive1');
	( $(window).scrollTop() > $(document).height() - 3*$(window).height()/2 ) ? $('.cd-vertical-nav .cd-next').addClass('inactive') : $('.cd-vertical-nav .cd-next').removeClass('inactive');
}

function smoothScroll(target) {
	animating = true;
	$('body,html').animate({'scrollTop': target.offset().top}, 500, function(){ animating = false; });
}


/*----------- Animated Headlines --------------*/

	//set animation timing
	var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 600,
		revealAnimationDelay = 1500;
		
		initHeadline();
		

		function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.cd-headline.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.cd-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
			letters = word.text().split(''),
			selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
			var newLetters = letters.join('');
			word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.cd-words-wrapper'),
				newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ) {
				//assign to .cd-words-wrapper the width of its longest word
				var words = headline.find('.cd-words-wrapper b'),
				width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
					if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.cd-headline').hasClass('type')) {
			var parentSpan = $word.parent('.cd-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');	
			setTimeout(function(){ 
				parentSpan.removeClass('selected'); 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
			
		} else if($word.parents('.cd-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.cd-headline').hasClass('loading-bar')){
			$word.parents('.cd-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.cd-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');
		
		if(!$letter.is(':last-child')) {
			setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
		} else if($bool) { 
			setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		} 
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');
		
		if(!$letter.is(':last-child')) { 
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
		} else { 
			if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
}

function takeNext($word) {
	return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}

function takePrev($word) {
	return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
}

function switchWord($oldWord, $newWord) {
	$oldWord.removeClass('is-visible').addClass('is-hidden');
	$newWord.removeClass('is-hidden').addClass('is-visible');
}

/*-------------------------- Portfolio Item Filter -----------------------*/

var $portfolio = $('#portfolio-item'),
colWidth = function () {
  var w = $portfolio.width(), 
  columnNum = 1,
  columnWidth = 0;
  if (w > 960) {
    columnNum  = 4;
  } 
  else if (w > 768) {
    columnNum  = 3;
  }   
  else if (w > 640) {
    columnNum  = 3;
  }
   else if (w > 600) {
    columnNum  = 2;
  } 
  else if (w > 480) {
    columnNum  = 1;
  }  
  else if (w > 360) {
    columnNum  = 1;
  } 
  columnWidth = Math.floor(w/columnNum);
  $portfolio.find('.item').each(function() {
    var $item = $(this),
    multiplier_w = $item.attr('class').match(/item-w(\d)/),
    multiplier_h = $item.attr('class').match(/item-h(\d)/),
    width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
    height = multiplier_h ? columnWidth*multiplier_h[1]*0.7-10 : columnWidth*0.6-10;
    $item.css({
      width: width,
      height: height
    });
  });
  return columnWidth;
},
isotope = function () {
  $portfolio.isotope({
    resizable: true,
    itemSelector: '.item',
    masonry: {
      columnWidth: colWidth(),
      gutterWidth: 10
    }
  });
};
isotope();
$(window).smartresize(isotope);

$('.portfolioFilter a').click(function(){
  $('.portfolioFilter .current').removeClass('current');
  $(this).addClass('current');

  var selector = $(this).attr('data-filter');
  $portfolio.isotope({
    filter: selector,
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false
    }
  });
  return false;
}); 


});





(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };
		s = Snap( overlay.querySelector( 'svg' ) ), 
		path = s.select( 'path' ),
		steps = overlay.getAttribute( 'data-steps' ).split(';'),
		stepsTotal = steps.length;

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			var pos = stepsTotal-1;
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			
			var onEndTransitionFn = function( ev ) {
					classie.remove( overlay, 'close' );
				},
				nextStep = function( pos ) {
					pos--;
					if( pos < 0 ) return;
					path.animate( { 'path' : steps[pos] }, 60, mina.linear, function() { 
						if( pos === 0 ) {
							onEndTransitionFn();
						}
						nextStep(pos);
					} );
				};

			nextStep(pos);
		}
		else if( !classie.has( overlay, 'close' ) ) {
			var pos = 0;
			classie.add( overlay, 'open' );
			
			var nextStep = function( pos ) {
				pos++;
				if( pos > stepsTotal - 1 ) return;
				path.animate( { 'path' : steps[pos] }, 60, mina.linear, function() { nextStep(pos); } );
			};

			nextStep(pos);
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
})();


	$('#contactlink').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#contact').offset().top - 0}, 750);
	});

	$('#homelink').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#home-section').offset().top - 0}, 750);
	});

	$('#aboutlink').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#about').offset().top - 0}, 750);
	});
	$('#aboutlink-m').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#about').offset().top - 0}, 750);
	});

	$('#serviceslink').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#service').offset().top - 0}, 750);
	});
	$('#serviceslink-m').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#service').offset().top - 0}, 750);
	});

	$('#teamlink').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#team').offset().top - 0}, 750);
	});
	$('#teamlink-m').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#team').offset().top - 0}, 750);
	});
	
	$('#portfoliolink').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#portfolio').offset().top - 0}, 750);
	});
	$('#portfoliolink-m').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#portfolio').offset().top - 0}, 750);
	});

	$('#bloglink').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#blog').offset().top - 0}, 750);
	});
	$('#bloglink-m').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#blog').offset().top - 0}, 750);
	});
	$('#blog1link').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#blog').offset().top - 0}, 750);
	});

	$('#contactlink').click(function() {
		$(".overlay").removeClass('open');
		$('html,body').animate({scrollTop:$('#contact').offset().top - 0}, 750);
	});


// --------------Contact Form Ajax request-----------------------

    $('.contact_form').on('submit', function(event){
    event.preventDefault();

    // $this = $(this);

    var data = {
      name: $('#name').val(),
      phone: $('#phone').val(),
      email: $('#email').val(),
      // subject: $('#subject').val(),
      message: $('#message').val()
    };

    $.ajax({
      type: "POST",
      url: "email.php",
      data: data,
      success: function(msg){
      $('.contact-success').fadeIn().delay(3000).fadeOut();
      }
    });
  });