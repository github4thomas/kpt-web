var slideWrapper = jQuery(".banner-slider"),
iframes = slideWrapper.find('.embed-player'),
lazyCounter = 0;
const sections = document.querySelectorAll("section[id]");
jQuery(function () {
	
	//email js
	emailjs.init('user_kVW71BDLCqrTPVJy9WUmp');
	document.getElementById("contact-form").reset();
	document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm('service_3k9c63p', 'template_h9p2cko', this)
            .then(function() {
                console.log('SUCCESS!');
                document.getElementById("contact-form").reset();
                $('#success').show();
                document.getElementById("success").innerHTML = "Thank you for contacting us – we will get back to you soon!";
            }, function(error) {
                console.log('FAILED...', error);
                $('#error').show();
                document.getElementById("error").innerHTML  = "Something went wrong, please try again.";
            });
    });

	// menu 
    if (jQuery.fn.meanmenu) {
		jQuery('.main-menu nav').meanmenu({
			meanMenuContainer:'.main-menu',
			meanScreenWidth:'767',
			meanMenuCloseSize: "14px",
			onePage: true
		});
	}  
	 
	// imgLiquid
    if (jQuery.fn.imgLiquid) {
		jQuery(".tab-list-col .img-blk, .project-img, .icon-blk, .prod-img").imgLiquid({fill:true});
	}
	
	//scroll down
	jQuery(".scroll-div a").click(function (e) {
		e.preventDefault();
		var target = jQuery(this).attr('href');
		var HeaderHeight;
		
		if (jQuery('.header-container').length) {
			HeaderHeight = jQuery('.header-container').outerHeight();	
		} 
		
		if($('.mobile-div').is(':visible')){
			jQuery('html, body').animate({
				scrollTop: jQuery(target).offset().top
			}, 1500);
		} else {
			jQuery('html, body').animate({
				scrollTop: jQuery(target).offset().top-HeaderHeight
			}, 1500);
		}
	});

	//menu scroll
	window.addEventListener("scroll", navHighlighter);
	
	jQuery(".main-menu ul li a").click(function (e) {
		e.preventDefault();
		var target = jQuery(this).attr('href');
		var HeaderHeight;
		
		if (jQuery('.header-container').length) {
			HeaderHeight = jQuery('.header-container').outerHeight();	
		} 
		
		if($('.mobile-div').is(':visible')){
			jQuery('html, body').animate({
				scrollTop: jQuery(target).offset().top
			}, 1500);
		} else {
			jQuery('html, body').animate({
				scrollTop: jQuery(target).offset().top-HeaderHeight
			}, 1500);
		}
	});
	
	
	//slick
	if (jQuery.fn.slick) {
		jQuery('.project-slider').slick({
			speed: 1500,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			infinite:true,
			arrows: true,
			dots: false,
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 2,
					dots: true,
					arrows: false,
				  }
				}
			  ]
		});
	}
	
	
	//debouncedresize
	jQuery(window).bind("debouncedresize", function() {
		
		// imgLiquid
		if (jQuery.fn.imgLiquid) {
			jQuery(".tab-list-col .img-blk, .project-img, .icon-blk, .prod-img").imgLiquid({fill:true});
		}
		
	});		

	resizePlayer(iframes, 16/9);
	
}); 

// Resize player
function resizePlayer(iframes, ratio) {
  	if (!iframes[0]) return;
  		var win = jQuery(".banner-slider"),
		width = win.width(),
		playerWidth,
		height = win.height(),
		playerHeight,
		ratio = ratio || 16/9;

	  	iframes.each(function(){
		    var current = jQuery(this);
		    if (width / ratio < height) {
		      playerWidth = Math.ceil(height * ratio);
		      current.width(playerWidth).height(height).css({
		        left: (width - playerWidth) / 2,
		         top: 0
		        });
		    } else {
		      playerHeight = Math.ceil(width / ratio);
		      current.width(width).height(playerHeight).css({
		        left: 0,
		        top: (height - playerHeight) / 2
		      });
		    }
	  	});
}



// Resize event
jQuery(window).on("resize.slickVideoPlayer", function(){  
  	resizePlayer(iframes, 16/9);
});
 
 

function navHighlighter() {
	// Get current scroll position
	let scrollY = window.pageYOffset;
	var HeaderHeight;
		
	// Now we loop through sections to get height, top and ID values for each
	sections.forEach(current => {
		if (jQuery('.header-container').length) {
			HeaderHeight = jQuery('.header-container').outerHeight()+10;	
		} 
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - HeaderHeight;
		sectionId = current.getAttribute("id");

		/*
		- If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
		- To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
		*/
		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			document.querySelector(".main-menu ul li a[href*=" + sectionId + "]").classList.add("active");
		} else {
			document.querySelector(".main-menu ul li a[href*=" + sectionId + "]").classList.remove("active");
		}
	});
}