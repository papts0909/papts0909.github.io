; (function () {

	'use strict';



	// iPad and iPod detection	
	var isiPad = function () {
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function () {
		return (
			(navigator.platform.indexOf("<i></i>Phone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	};

	var fullHeight = function () {
		if (!isiPad() && !isiPhone()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			})
		}
	};

	var sliderMain = function () {

		$('#fh5co-home .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000
		});

		$('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
		$(window).resize(function () {
			$('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
		});

		$('.js-fh5co-next').on('click', function (event) {

			event.preventDefault();
			$('html, body').animate({
				scrollTop: $(this).closest('#fh5co-home').next().offset().top
			}, 800, 'easeOutExpo');

		});

	};

	var sliderTestimony = function () {

		$('#fh5co-testimony .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			smoothHeight: true,
			reverse: true
		});

	}

	var offcanvasMenu = function () {

		$('body').prepend('<div id="fh5co-offcanvas" />');
		$('#fh5co-offcanvas').append($('#fh5co-main-nav').clone());

		setTimeout(function () {
			$('#fh5co-offcanvas').prepend('<a href="#" class="js-fh5co-offcanvas-close fh5co-offcanvas-close" />');
			$('#fh5co-offcanvas #fh5co-main-nav').attr('id', '');
		}, 200);

	};

	var mainMenuSticky = function () {

		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function () {
			sticky.css('height', sticky.height());
		});

		var $section = $('.fh5co-main-nav');

		$section.waypoint(function (direction) {

			if (direction === 'down') {

				$section.css({
					'position': 'fixed',
					'top': 0,
					'width': '100%',
					'z-index': 99999
				}).addClass('fh5co-shadow');;

			}

		}, {
			offset: '0px'
		});

		$('.js-sticky').waypoint(function (direction) {
			if (direction === 'up') {
				$section.attr('style', '').removeClass('fh5co-shadow');
			}
		}, {
			offset: function () { return -$(this.element).height() + 69; }
		});

	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function () {

		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle, .js-fh5co-offcanvas-close");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-visible')) {

					$('body').removeClass('fh5co-overflow offcanvas-visible');

					$('.js-fh5co-nav-toggle').removeClass('active');
				}
			}
		});

		$('body').on('click', '.js-fh5co-offcanvas-close', function (event) {

			if ($('body').hasClass('offcanvas-visible')) {
				$('body').removeClass('fh5co-overflow offcanvas-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}

			event.preventDefault();

		});

	};

	// Parallax
	var parallax = function () {

		$(window).stellar();

	};


	// Redirect page 
	var redirectPage = function (url) {

		window.location = url;

	}

	var pageTransition = function () {

		$("body").css("display", "none");


		$("body").fadeIn(2000);

		$("a.transition").click(function (event) {
			event.preventDefault();
			var linkLocation = this.href;

			$("body").fadeOut(2000, redirectPage);

			redirectPage(linkLocation);
		});

	};


	// Burger Menu
	var burgerMenu = function () {

		$('body').on('click', '.js-fh5co-nav-toggle', function (event) {

			var $this = $(this);

			$('body').toggleClass('fh5co-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

	};

	var scrolledWindow = function () {

		$(window).scroll(function () {

			var header = $('#fh5co-header'),
				scrlTop = $(this).scrollTop();

			if (scrlTop > 500 && scrlTop <= 2000) {
				header.addClass('navbar-fixed-top fh5co-animated slideInDown');
			} else if (scrlTop <= 500) {
				if (header.hasClass('navbar-fixed-top')) {
					header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
					setTimeout(function () {
						header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
					}, 100);
				}
			}

			$('#fh5co-home .flexslider .fh5co-overlay').css({
				'opacity': (.5) + (scrlTop / 2000)
			});

			if ($('body').hasClass('offcanvas-visible')) {
				$('body').removeClass('offcanvas-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}

		});

		$(window).resize(function () {
			if ($('body').hasClass('offcanvas-visible')) {
				$('body').removeClass('offcanvas-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});

	};


	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);

			return false;
		});

	};


	// Page Nav
	var clickMenu = function () {
		var topVal = ($(window).width() < 769) ? 0 : 58;

		$(window).resize(function () {
			topVal = ($(window).width() < 769) ? 0 : 58;
		});

		if ($(this).attr('href') != "#") {
			$('#fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function (event) {
				var section = $(this).data('nav-section');


				if ($('div[data-section="' + section + '"]').length) {

					$('html, body').animate({
						scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
					}, 500);

				}
				event.preventDefault();

			});
		}




	};

	// Reflect scrolling in navigation
	var navActive = function (section) {

		$('#fh5co-main-nav li, #fh5co-offcanvas li').removeClass('active');
		$('#fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');

	};

	var navigationSection = function () {

		var $section = $('div[data-section]');

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}

		}, {
			offset: '150px'
		});

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () { return -$(this.element).height() + 155; }
		});

	};



	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '85%' });


	};

	var loadnanoGallery2 = function () {

		jQuery("#nanogallery").nanogallery2({

			// CONTENT SOURCE
			// The optional add-on nanoPhotosProvider is used for this example - this is not mandatory and can easily be replaced by a list of medias
			items: [
				{ src: 'images/albums/DTL03675.jpg', srct: 'images/albums/thumbnail/DTL03675.jpg' },
				{ src: 'images/albums/DTL03691.jpg', srct: 'images/albums/thumbnail/DTL03691.jpg' },
				{ src: 'images/albums/DTL03719.jpg', srct: 'images/albums/thumbnail/DTL03719.jpg' },
				{ src: 'images/albums/DTL03732.jpg', srct: 'images/albums/thumbnail/DTL03732.jpg' },
				{ src: 'images/albums/DTL03772.jpg', srct: 'images/albums/thumbnail/DTL03772.jpg' },
				{ src: 'images/albums/DTL03805.jpg', srct: 'images/albums/thumbnail/DTL03805.jpg' },
				{ src: 'images/albums/DTL03859.jpg', srct: 'images/albums/thumbnail/DTL03859.jpg' },
				{ src: 'images/albums/DTL03966.jpg', srct: 'images/albums/thumbnail/DTL03966.jpg' },
				{ src: 'images/albums/DTL04019.jpg', srct: 'images/albums/thumbnail/DTL04019.jpg' },
				{ src: 'images/albums/DTL04057.jpg', srct: 'images/albums/thumbnail/DTL04057.jpg' },
				{ src: 'images/albums/DTL04086.jpg', srct: 'images/albums/thumbnail/DTL04086.jpg' },
				{ src: 'images/albums/DTL04118.jpg', srct: 'images/albums/thumbnail/DTL04118.jpg' },
				{ src: 'images/albums/DTL04126.jpg', srct: 'images/albums/thumbnail/DTL04126.jpg' },
				{ src: 'images/albums/DTL04158.jpg', srct: 'images/albums/thumbnail/DTL04158.jpg' },
				{ src: 'images/albums/DTL04203.jpg', srct: 'images/albums/thumbnail/DTL04203.jpg' },
				{ src: 'images/albums/DTL04219.jpg', srct: 'images/albums/thumbnail/DTL04219.jpg' },
				{ src: 'images/albums/DTL04224.jpg', srct: 'images/albums/thumbnail/DTL04224.jpg' },
				{ src: 'images/albums/DTL04258.jpg', srct: 'images/albums/thumbnail/DTL04258.jpg' },
				{ src: 'images/albums/DTL04281.jpg', srct: 'images/albums/thumbnail/DTL04281.jpg' },
				{ src: 'images/albums/DTL04302.jpg', srct: 'images/albums/thumbnail/DTL04302.jpg' },
				{ src: 'images/albums/DTL04341.jpg', srct: 'images/albums/thumbnail/DTL04341.jpg' },
				{ src: 'images/albums/DTL04346.jpg', srct: 'images/albums/thumbnail/DTL04346.jpg' },
				{ src: 'images/albums/DTL04373.jpg', srct: 'images/albums/thumbnail/DTL04373.jpg' },
				{ src: 'images/albums/DTL04396.jpg', srct: 'images/albums/thumbnail/DTL04396.jpg' },
				{ src: 'images/albums/DTL04408.jpg', srct: 'images/albums/thumbnail/DTL04408.jpg' },
				{ src: 'images/albums/DTL04415.jpg', srct: 'images/albums/thumbnail/DTL04415.jpg' },
				{ src: 'images/albums/DTL04474.jpg', srct: 'images/albums/thumbnail/DTL04474.jpg' },
				{ src: 'images/albums/DTL04529.jpg', srct: 'images/albums/thumbnail/DTL04529.jpg' },
				{ src: 'images/albums/DTL04538.jpg', srct: 'images/albums/thumbnail/DTL04538.jpg' },
				{ src: 'images/albums/DTL04604.jpg', srct: 'images/albums/thumbnail/DTL04604.jpg' },
				{ src: 'images/albums/DTL04627.jpg', srct: 'images/albums/thumbnail/DTL04627.jpg' },
				{ src: 'images/albums/DTL04635.jpg', srct: 'images/albums/thumbnail/DTL04635.jpg' },
				{ src: 'images/albums/DTL04645.jpg', srct: 'images/albums/thumbnail/DTL04645.jpg' },
				{ src: 'images/albums/DTL04680.jpg', srct: 'images/albums/thumbnail/DTL04680.jpg' },
				{ src: 'images/albums/DTL04696.jpg', srct: 'images/albums/thumbnail/DTL04696.jpg' }
			],
			// album: 'people',

			// GALLERY AND THUMBNAIL LAYOUT
			galleryMosaic: [                       // default layout
				{ w: 2, h: 2, c: 1, r: 1 },
				{ w: 1, h: 1, c: 3, r: 1 },
				{ w: 1, h: 1, c: 3, r: 2 },
				{ w: 1, h: 2, c: 4, r: 1 },
				{ w: 2, h: 1, c: 5, r: 1 },
				{ w: 2, h: 2, c: 5, r: 2 },
				{ w: 1, h: 1, c: 4, r: 3 },
				{ w: 2, h: 1, c: 2, r: 3 },
				{ w: 1, h: 2, c: 1, r: 3 },
				{ w: 1, h: 1, c: 2, r: 4 },
				{ w: 2, h: 1, c: 3, r: 4 },
				{ w: 1, h: 1, c: 5, r: 4 },
				{ w: 1, h: 1, c: 6, r: 4 }
			],
			galleryMosaicXS: [                     // layout for XS width
				{ w: 2, h: 2, c: 1, r: 1 },
				{ w: 1, h: 1, c: 3, r: 1 },
				{ w: 1, h: 1, c: 3, r: 2 },
				{ w: 1, h: 2, c: 1, r: 3 },
				{ w: 2, h: 1, c: 2, r: 3 },
				{ w: 1, h: 1, c: 2, r: 4 },
				{ w: 1, h: 1, c: 3, r: 4 }
			],
			galleryMosaicSM: [                     // layout for SM width
				{ w: 2, h: 2, c: 1, r: 1 },
				{ w: 1, h: 1, c: 3, r: 1 },
				{ w: 1, h: 1, c: 3, r: 2 },
				{ w: 1, h: 2, c: 1, r: 3 },
				{ w: 2, h: 1, c: 2, r: 3 },
				{ w: 1, h: 1, c: 2, r: 4 },
				{ w: 1, h: 1, c: 3, r: 4 }
			],
			galleryMaxRows: 1,
			galleryDisplayMode: 'rows',
			gallerySorting: 'random',
			thumbnailDisplayOrder: 'random',

			thumbnailHeight: '180', thumbnailWidth: '220',
			thumbnailAlignment: 'scaled',
			thumbnailGutterWidth: 0, thumbnailGutterHeight: 0,
			thumbnailBorderHorizontal: 0, thumbnailBorderVertical: 0,

			thumbnailToolbarImage: null,
			thumbnailToolbarAlbum: null,
			thumbnailLabel: { display: false },

			// DISPLAY ANIMATION
			// for gallery
			galleryDisplayTransitionDuration: 1500,
			// for thumbnails
			thumbnailDisplayTransition: 'imageSlideUp',
			thumbnailDisplayTransitionDuration: 1200,
			thumbnailDisplayTransitionEasing: 'easeInOutQuint',
			thumbnailDisplayInterval: 60,

			// THUMBNAIL HOVER ANIMATION
			thumbnailBuildInit2: 'image_scale_1.15',
			thumbnailHoverEffect2: 'thumbnail_scale_1.00_1.05_300|image_scale_1.15_1.00',
			touchAnimation: true,
			touchAutoOpenDelay: 500,

			// LIGHTBOX
			viewerToolbar: { display: false },
			viewerTools: {
				topLeft: 'label',
				topRight: 'shareButton, rotateLeft, rotateRight, fullscreenButton, closeButton'
			},

			// GALLERY THEME
			galleryTheme: {
				thumbnail: { background: '#111' },
			},

			// DEEP LINKING
			locationHash: true
		});

	}


	// Document on load.
	$(function () {

		pageTransition();
		fullHeight();
		sliderMain();
		sliderTestimony();
		offcanvasMenu();
		mainMenuSticky();
		mobileMenuOutsideClick();
		parallax();
		burgerMenu();
		scrolledWindow();
		clickMenu();
		navigationSection();
		goToTop();



		// Animations
		contentWayPoint();
		loadnanoGallery2();



	});


}());