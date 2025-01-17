( function( $, elementor ) {

	"use strict";

	var WprElements = {

		init: function() {

			var widgets = {
				'wpr-nav-menu.default' : WprElements.widgetNavMenu,
				'wpr-mega-menu.default' : WprElements.widgetMegaMenu,
				'wpr-onepage-nav.default' : WprElements.OnepageNav,
				'wpr-grid.default' : WprElements.widgetGrid,
				'wpr-magazine-grid.default' : WprElements.widgetMagazineGrid,
				'wpr-media-grid.default' : WprElements.widgetGrid,
				'wpr-woo-grid.default' : WprElements.widgetGrid,
				'wpr-woo-category-grid-pro.default' : WprElements.widgetGrid,
				'wpr-featured-media.default' : WprElements.widgetFeaturedMedia,
				'wpr-countdown.default' : WprElements.widgetCountDown,
				'wpr-google-maps.default' : WprElements.widgetGoogleMaps,
				'wpr-before-after.default' : WprElements.widgetBeforeAfter,
				'wpr-mailchimp.default' : WprElements.widgetMailchimp,
				'wpr-advanced-slider.default' : WprElements.widgetAdvancedSlider,
				'wpr-testimonial.default' : WprElements.widgetTestimonialCarousel,
				'wpr-search.default' : WprElements.widgetSearch,
				'wpr-advanced-text.default' : WprElements.widgetAdvancedText,
				'wpr-progress-bar.default' : WprElements.widgetProgressBar,
				'wpr-image-hotspots.default' : WprElements.widgetImageHotspots,
				'wpr-flip-box.default' : WprElements.widgetFlipBox,
				'wpr-content-ticker.default' : WprElements.widgetContentTicker,
				'wpr-tabs.default' : WprElements.widgetTabs,
				'wpr-content-toggle.default' : WprElements.widgetContentToogle,
				'wpr-back-to-top.default': WprElements.widgetBackToTop,
				'wpr-lottie-animations.default': WprElements.widgetLottieAnimations,
				'wpr-posts-timeline.default' : WprElements.widgetPostsTimeline,
				'wpr-sharing-buttons.default' : WprElements.widgetSharingButtons,
				'wpr-flip-carousel.default': WprElements.widgetFlipCarousel,
				'wpr-feature-list.default' : WprElements.widgetFeatureList,
				'wpr-advanced-accordion.default' : WprElements.widgetAdvancedAccordion,
                'wpr-image-accordion.default' : WprElements.widgetImageAccordion,
				'wpr-product-media.default' : WprElements.widgetProductMedia,
				'wpr-product-add-to-cart.default' : WprElements.widgetProductAddToCart,
				'wpr-product-mini-cart.default' : WprElements.widgetProductMiniCart,
				'wpr-product-filters.default' : WprElements.widgetProductFilters,
				'wpr-page-cart.default' : WprElements.widgetPageCart,
				'wpr-my-account-pro.default' : WprElements.widgetPageMyAccount,
				'wpr-reading-progress-bar.default' : WprElements.widgetReadingProgressBar,
				'wpr-data-table.default' : WprElements.widgetDataTable,
				'wpr-charts.default': WprElements.widgetCharts,
				'global': WprElements.widgetSection,

				// Single
				'wpr-post-media.default' : WprElements.widgetPostMedia,
			};
			
			$.each( widgets, function( widget, callback ) {
				window.elementorFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});

			// Remove Mega Menu Templates from "Edit with Elementor"
			WprElements.changeAdminBarMenu();
		},

		widgetPostMedia: function( $scope ) {
			// var gallery = $scope.find( '.wpr-gallery-slider' ),
			// 	gallerySettings = gallery.attr( 'data-slick' );
			
			// gallery.animate({ 'opacity' : '1' }, 1000 );//tmp

			// if ( '[]' !== gallerySettings ) {
			// 	gallery.slick({
			// 		appendDots : $scope.find( '.wpr-gallery-slider-dots' ),
			// 		customPaging : function ( slider, i ) {
			// 			var slideNumber = (i + 1),
			// 				totalSlides = slider.slideCount;

			// 			return '<span class="wpr-gallery-slider-dot"></span>';
			// 		}
			// 	});
			// }

			// Lightbox
			var lightboxSettings = $( '.wpr-featured-media-image' ).attr( 'data-lightbox' );

			if ( typeof lightboxSettings !== typeof undefined && lightboxSettings !== false && ! WprElements.editorCheck() ) {
				var MediaWrap = $scope.find( '.wpr-featured-media-wrap' );
					lightboxSettings = JSON.parse( lightboxSettings );

				// Init Lightbox
				MediaWrap.lightGallery( lightboxSettings );

				// Show/Hide Controls
				MediaWrap.on( 'onAferAppendSlide.lg, onAfterSlide.lg', function( event, prevIndex, index ) {
					var lightboxControls = $( '#lg-actual-size, #lg-zoom-in, #lg-zoom-out, #lg-download' ),
						lightboxDownload = $( '#lg-download' ).attr( 'href' );

					if ( $( '#lg-download' ).length ) {
						if ( -1 === lightboxDownload.indexOf( 'wp-content' ) ) {
							lightboxControls.addClass( 'wpr-hidden-element' );
						} else {
							lightboxControls.removeClass( 'wpr-hidden-element' );
						}
					}

					// Autoplay Button
					if ( '' === lightboxSettings.autoplay ) {
						$( '.lg-autoplay-button' ).css({
							 'width' : '0',
							 'height' : '0',
							 'overflow' : 'hidden'
						});
					}
				});
			}
		}, // End widgetFeaturedMedia

		widgetSection: function( $scope ) {

			if ( $scope.attr('data-wpr-particles') || $scope.find('.wpr-particle-wrapper').attr('data-wpr-particles-editor') ) {
				particlesEffect();
            }

			if ( $scope.hasClass('wpr-jarallax') || $scope.hasClass('wpr-jarallax-yes') ) {
				parallaxBackground();
			}

			if ( $scope.hasClass('wpr-parallax-yes') ) {
				parallaxMultiLayer();
			}

			if ( $scope.hasClass('wpr-sticky-section-yes') ) {
						
			    var positionType = !WprElements.editorCheck() ? $scope.attr('data-wpr-position-type') : $scope.find('.wpr-sticky-section-yes-editor').attr('data-wpr-position-type'),
				    positionLocation = !WprElements.editorCheck() ? $scope.attr('data-wpr-position-location') : $scope.find('.wpr-sticky-section-yes-editor').attr('data-wpr-position-location'),
				    positionOffset = !WprElements.editorCheck() ? $scope.attr('data-wpr-position-offset') : $scope.find('.wpr-sticky-section-yes-editor').attr('data-wpr-position-offset'),
				    viewportWidth = $('body').prop('clientWidth') + 17,
				    availableDevices = !WprElements.editorCheck() ? $scope.attr('data-wpr-sticky-devices') : $scope.find('.wpr-sticky-section-yes-editor').attr('data-wpr-sticky-devices'),
				    activeDevices = !WprElements.editorCheck() ? $scope.attr('data-wpr-active-breakpoints') : $scope.find('.wpr-sticky-section-yes-editor').attr('data-wpr-active-breakpoints'),
				    stickySectionExists = $scope.hasClass('wpr-sticky-section-yes') || $scope.find('.wpr-sticky-section-yes-editor') ? true : false,
				    positionStyle, 
                    adminBarHeight,
				    stickyHeaderFooter = $scope.closest('div[data-elementor-type="wp-post"]').length ? $scope.closest('div[data-elementor-type="wp-post"]') : '',
					headerFooterZIndex = !WprElements.editorCheck() ? $scope.attr('data-wpr-z-index') : $scope.find('.wpr-sticky-section-yes-editor').attr('data-wpr-z-index');

			    if ( !$scope.find('.wpr-sticky-section-yes-editor').length) {
			        positionType = $scope.attr('data-wpr-position-type');
			        positionLocation = $scope.attr('data-wpr-position-location');
			        positionOffset = $scope.attr('data-wpr-position-offset');
			        availableDevices = $scope.attr('data-wpr-sticky-devices');
			        activeDevices = $scope.attr('data-wpr-active-breakpoints');
					headerFooterZIndex = $scope.attr('data-wpr-z-index');
			    }

                if ( 'top' === positionLocation && 'auto' === $scope.css('top') ) {
                    var offsetTop = 0;
                    $scope.css('top', 0);
                } else {
                    var offsetTop = +$scope.css('top').slice(0, -2);
                }

			    if ( 0 == availableDevices.length ) {
			        positionType = 'static';
			    }

			    if ( WprElements.editorCheck() && availableDevices ) {
			        var attributes = $scope.find('.wpr-sticky-section-yes-editor').attr('data-wpr-sticky-devices');
			        $scope.attr('data-wpr-sticky-devices', attributes);
			        availableDevices = $scope.attr('data-wpr-sticky-devices');
			    }

			    changePositionType();
			    changeAdminBarOffset();

			    $(window).resize(function() { 
			        viewportWidth = $('body').prop('clientWidth') + 17,
			        changePositionType();
			    });
			    
			    if (!stickySectionExists) {
			        positionStyle = 'static';
			    }

			    function changePositionType() {
			        if ( !$scope.hasClass('wpr-sticky-section-yes') || !$scope.find('.wpr-sticky-section-yes-editor') ) {
			            positionStyle = 'static';
			            return;
			        }

			        var checkDevices = [['mobile_sticky', 768], ['mobile_extra_sticky', 881], ['tablet_sticky', 1025], ['tablet_extra_sticky', 1201], ['laptop_sticky', 1216],  ['desktop_sticky', 2400], ['widescreen_sticky', 4000]];
			        var emptyVariables = [];

			        var checkedDevices = checkDevices.filter((item, index) => {
			            return activeDevices.indexOf(item[0]) != -1;
			        }).reverse();
			        
			        checkedDevices.forEach((device, index) => {
			            if ( (device[1] > viewportWidth) && availableDevices.indexOf(device[0]) === -1 ) {
			                positionStyle = activeDevices?.indexOf(device[0]) !== -1 ? 'static' : (emptyVariables[index - 1] ? emptyVariables[index - 1] : positionType);
			                // positionStyle = activeDevices && activeDevices.indexOf(device[0]) !== -1 ? 'static' : (emptyVariables[index - 1] ? emptyVariables[index - 1] : positionType);
			                emptyVariables[index] = positionStyle;
			            } else if ( ( device[1] > viewportWidth) && availableDevices.indexOf(device[0]) !== -1 ) {
			                positionStyle = positionType;
			            }
			        });
			        
			        applyPosition();
			    }
			    
			    function applyPosition() {
			        var bottom = +window.innerHeight - (+$scope.css('top').slice(0, -2) + $scope.height());
			        var top = +window.innerHeight - (+$scope.css('bottom').slice(0, -2) + $scope.height());
			        if ( 'top'  ===  positionLocation ) {
			            $scope.css({'position': positionStyle });
			            if ( '' !== stickyHeaderFooter ) {
			                // stickyHeaderFooter = stickyHeaderFooter.find('.wpr-sticky-section-yes');
			                stickyHeaderFooter.css({'position': positionStyle, 'top': positionOffset + 'px', 'bottom': 'auto', 'z-index': headerFooterZIndex, 'width': '100%' });
			            }
			        }
			        else {
			            $scope.css({'position': positionStyle });
			            if ( '' !== stickyHeaderFooter ) {
			                stickyHeaderFooter = stickyHeaderFooter.find('.wpr-sticky-section-yes');
			                stickyHeaderFooter.css({'position': positionStyle, 'bottom': positionOffset + 'px', 'top': 'auto', 'z-index': headerFooterZIndex, 'width': '100%' }); 
			            }
			        }
			    }

			    function changeAdminBarOffset() {	
			        if ( $('#wpadminbar').length ) {
			            adminBarHeight = $('#wpadminbar').css('height').slice(0, $('#wpadminbar').css('height').length - 2);
			            if ( 'top'  ===  positionLocation && ( 'fixed' == $scope.css('position')  || 'sticky' == $scope.css('position') ) ) {
			                $scope.css('top', +adminBarHeight + offsetTop + 'px');
			                $scope.css('bottom', 'auto');
			            } 
			        }
			    }

			}

			function particlesEffect() {
				var elementType = $scope.data('element_type'),
					sectionID = $scope.data('id'),
					particlesJSON = ! WprElements.editorCheck() ? $scope.attr('data-wpr-particles') : $scope.find('.wpr-particle-wrapper').attr('data-wpr-particles-editor');

				if ( 'section' === elementType && undefined !== particlesJSON ) {
					// Frontend
					if ( ! WprElements.editorCheck() ) {
						$scope.prepend('<div class="wpr-particle-wrapper" id="wpr-particle-'+ sectionID +'"></div>');
	
						particlesJS('wpr-particle-'+ sectionID, $scope.attr('particle-source') == 'wpr_particle_json_custom' ? JSON.parse(particlesJSON) : modifyJSON(particlesJSON));
					// Editor
					} else {
						if ( $scope.hasClass('wpr-particle-yes') ) {
							particlesJS( 'wpr-particle-'+ sectionID, $scope.find('.wpr-particle-wrapper').attr('particle-source') == 'wpr_particle_json_custom' ? JSON.parse(particlesJSON) : modifyJSON(particlesJSON));
	
							$scope.find('.elementor-column').css('z-index', 9);
	
							$(window).trigger('resize');
						} else {
							$scope.find('.wpr-particle-wrapper').remove();
						}
					}
				}
			}

			function modifyJSON(json) {
				var wpJson = JSON.parse(json),
					particles_quantity = ! WprElements.editorCheck() ? $scope.attr('wpr-quantity') : $scope.find('.wpr-particle-wrapper').attr('wpr-quantity'),
					particles_color = ! WprElements.editorCheck() ? $scope.attr('wpr-color') || '#000000' : $scope.find('.wpr-particle-wrapper').attr('wpr-color') ? $scope.find('.wpr-particle-wrapper').attr('wpr-color') : '#000000',
					particles_speed = ! WprElements.editorCheck() ? $scope.attr('wpr-speed') : $scope.find('.wpr-particle-wrapper').attr('wpr-speed'),
					particles_shape = ! WprElements.editorCheck() ? $scope.attr('wpr-shape') : $scope.find('.wpr-particle-wrapper').attr('wpr-shape'),
					particles_size = ! WprElements.editorCheck() ? $scope.attr('wpr-size')  : $scope.find('.wpr-particle-wrapper').attr('wpr-size');
				
				wpJson.particles.size.value = particles_size;
				wpJson.particles.number.value = particles_quantity;
				wpJson.particles.color.value = particles_color;
				wpJson.particles.shape.type = particles_shape;
				wpJson.particles.line_linked.color = particles_color;
				wpJson.particles.move.speed = particles_speed;
				
				return wpJson;
			}

			function parallaxBackground() {
				if ( $scope.hasClass('wpr-jarallax-yes') ) {
					if ( ! WprElements.editorCheck() && $scope.hasClass('wpr-jarallax') ) {
						$scope.css('background-image', 'url("' + $scope.attr('bg-image') + '")');
						$scope.jarallax({
							type: $scope.attr('scroll-effect'),
							speed: $scope.attr('speed-data'),
						});
					} else if ( WprElements.editorCheck() ) {
						$scope.css('background-image', 'url("' + $scope.find('.wpr-jarallax').attr('bg-image-editor') + '")');
						$scope.jarallax({
							type: $scope.find('.wpr-jarallax').attr('scroll-effect-editor'),
							speed: $scope.find('.wpr-jarallax').attr('speed-data-editor')
						});
					}
				} 
			}

			function parallaxMultiLayer() {
				if ( $scope.hasClass('wpr-parallax-yes') ) {
					var scene = document.getElementsByClassName('wpr-parallax-multi-layer');

					var parallaxInstance = Array.from(scene).map(item => {
						return new Parallax(item, {
							invertY: item.getAttribute('direction') == 'yes' ? true : false,
							invertX: item.getAttribute('direction') == 'yes' ? true : false,
							scalarX: item.getAttribute('scalar-speed'),
							scalarY: item.getAttribute('scalar-speed'),
							hoverOnly: true,
							pointerEvents: true
						});
					});
	
					parallaxInstance.forEach(parallax => {
						parallax.friction(0.2, 0.2);
					});
				}
				if ( ! WprElements.editorCheck() ) {						
					var newScene = [];

					document.querySelectorAll('.wpr-parallax-multi-layer').forEach((element, index) => {
						element.parentElement.style.position = "relative";
						element.style.position = "absolute";
						newScene.push(element);
						element.remove();
					});

					document.querySelectorAll('.wpr-parallax-ml-children').forEach((element, index) => {
						element.style.position = "absolute";
						element.style.top = element.getAttribute('style-top');
						element.style.left = element.getAttribute('style-left');
					});

					$('.wpr-parallax-yes').each(function(index) {
						$(this).append(newScene[index]);
					});
				}
			}
		}, // end widgetSection

		widgetNavMenu: function( $scope ) {

			var $navMenu = $scope.find( '.wpr-nav-menu-container' ),
				$mobileNavMenu = $scope.find( '.wpr-mobile-nav-menu-container' );

			// Menu
			var subMenuFirst = $navMenu.find( '.wpr-nav-menu > li.menu-item-has-children' ),
				subMenuDeep = $navMenu.find( '.wpr-sub-menu li.menu-item-has-children' );

			if ( $navMenu.attr('data-trigger') === 'click' ) {
				// First Sub
				subMenuFirst.children('a').on( 'click', function(e) {
					var currentItem = $(this).parent(),
						childrenSub = currentItem.children('.wpr-sub-menu');

					// Reset
					subMenuFirst.not(currentItem).removeClass('wpr-sub-open');
					if ( $navMenu.hasClass('wpr-nav-menu-horizontal') || ( $navMenu.hasClass('wpr-nav-menu-vertical') && $scope.hasClass('wpr-sub-menu-position-absolute') ) ) {
						subMenuAnimation( subMenuFirst.children('.wpr-sub-menu'), false );
					}

					if ( ! currentItem.hasClass( 'wpr-sub-open' ) ) {
						e.preventDefault();
						currentItem.addClass('wpr-sub-open');
						subMenuAnimation( childrenSub, true );
					} else {
						currentItem.removeClass('wpr-sub-open');
						subMenuAnimation( childrenSub, false );
					}
				});

				// Deep Subs
				subMenuDeep.on( 'click', function(e) {
					var currentItem = $(this),
						childrenSub = currentItem.children('.wpr-sub-menu');

					// Reset
					if ( $navMenu.hasClass('wpr-nav-menu-horizontal') ) {
						subMenuAnimation( subMenuDeep.find('.wpr-sub-menu'), false );
					}

					if ( ! currentItem.hasClass( 'wpr-sub-open' ) ) {
						e.preventDefault();
						currentItem.addClass('wpr-sub-open');
						subMenuAnimation( childrenSub, true );

					} else {
						currentItem.removeClass('wpr-sub-open');
						subMenuAnimation( childrenSub, false );
					}
				});

				// Reset Subs on Document click
				$( document ).mouseup(function (e) {
					if ( ! subMenuFirst.is(e.target) && subMenuFirst.has(e.target).length === 0 ) {
						subMenuFirst.not().removeClass('wpr-sub-open');
						subMenuAnimation( subMenuFirst.children('.wpr-sub-menu'), false );
					}
					if ( ! subMenuDeep.is(e.target) && subMenuDeep.has(e.target).length === 0 ) {
						subMenuDeep.removeClass('wpr-sub-open');
						subMenuAnimation( subMenuDeep.children('.wpr-sub-menu'), false );
					}
				});
			} else {
				// Mouse Over
				subMenuFirst.on( 'mouseenter', function() {
					if ( $navMenu.hasClass('wpr-nav-menu-vertical') && $scope.hasClass('wpr-sub-menu-position-absolute') ) {
						$navMenu.find('li').not(this).children('.wpr-sub-menu').hide();
						// BUGFIX: when menu is vertical and absolute positioned, lvl2 depth sub menus wont show properly on hover
					}

					subMenuAnimation( $(this).children('.wpr-sub-menu'), true );
				});

				// Deep Subs
				subMenuDeep.on( 'mouseenter', function() {
					subMenuAnimation( $(this).children('.wpr-sub-menu'), true );
				});


				// Mouse Leave
				if ( $navMenu.hasClass('wpr-nav-menu-horizontal') ) {
					subMenuFirst.on( 'mouseleave', function() {
						subMenuAnimation( $(this).children('.wpr-sub-menu'), false );
					});

					subMenuDeep.on( 'mouseleave', function() {
						subMenuAnimation( $(this).children('.wpr-sub-menu'), false );
					});	
				} else {

					$navMenu.on( 'mouseleave', function() {
						subMenuAnimation( $(this).find('.wpr-sub-menu'), false );
					});
				}
			}


			// Mobile Menu
			var mobileMenu = $mobileNavMenu.find( '.wpr-mobile-nav-menu' );

			// Toggle Button
			$mobileNavMenu.find( '.wpr-mobile-toggle' ).on( 'click', function() {
				$(this).toggleClass('wpr-mobile-toggle-fx');

				if ( ! $(this).hasClass('wpr-mobile-toggle-open') ) {
					$(this).addClass('wpr-mobile-toggle-open');

					if ( $(this).find('.wpr-mobile-toggle-text').length ) {
						$(this).children().eq(0).hide();
						$(this).children().eq(1).show();
					}
				} else {
					$(this).removeClass('wpr-mobile-toggle-open');
					$(this).trigger('focusout');

					if ( $(this).find('.wpr-mobile-toggle-text').length ) {
						$(this).children().eq(1).hide();
						$(this).children().eq(0).show();
					}
				}

				// Show Menu
				$(this).parent().next().stop().slideToggle();

				// Fix Width
				fullWidthMobileDropdown();
			});

			// Sub Menu Class
			mobileMenu.find('.sub-menu').removeClass('wpr-sub-menu').addClass('wpr-mobile-sub-menu');

			// Sub Menu Dropdown
			mobileMenu.find('.menu-item-has-children').children('a').on( 'click', function(e) {
				var parentItem = $(this).closest('li');

				// Toggle
				if ( ! parentItem.hasClass('wpr-mobile-sub-open') ) {
					e.preventDefault();
					parentItem.addClass('wpr-mobile-sub-open');
					parentItem.children('.wpr-mobile-sub-menu').first().stop().slideDown();
				} else {
					parentItem.removeClass('wpr-mobile-sub-open');
					parentItem.children('.wpr-mobile-sub-menu').first().stop().slideUp();
				}
			});

			// Run Functions
			fullWidthMobileDropdown();

			// Run Functions on Resize
			$(window).smartresize(function() {
				fullWidthMobileDropdown();
			});

			// Full Width Dropdown
			function fullWidthMobileDropdown() {
				if ( ! $scope.hasClass( 'wpr-mobile-menu-full-width' ) || ! $scope.closest('.elementor-column').length ) {
					return;
				}

				var eColumn   = $scope.closest('.elementor-column'),
					mWidth 	  = $scope.closest('.elementor-top-section').outerWidth() - 2 * mobileMenu.offset().left,
					mPosition = eColumn.offset().left + parseInt(eColumn.css('padding-left'), 10);

				mobileMenu.css({
					'width' : mWidth +'px',
					'left' : - mPosition +'px'
				});
			}

			// Sub Menu Animation
			function subMenuAnimation( selector, show ) {
				if ( show === true ) {
					if ( $scope.hasClass('wpr-sub-menu-fx-slide') ) {
						selector.stop().slideDown();
					} else {
						selector.stop().fadeIn();
					}
				} else {
					if ( $scope.hasClass('wpr-sub-menu-fx-slide') ) {
						selector.stop().slideUp();
					} else {
						selector.stop().fadeOut();
					}
				}
			}

		}, // End widgetNavMenu

		widgetMegaMenu: function( $scope ) {

			var $navMenu = $scope.find( '.wpr-nav-menu-container' ),
				$mobileNavMenu = $scope.find( '.wpr-mobile-nav-menu-container' );

			// Menu
			var subMenuFirst = $navMenu.find( '.wpr-nav-menu > li.menu-item-has-children' ),
				subMenuDeep = $navMenu.find( '.wpr-sub-menu li.menu-item-has-children' );

			// Click
			if ( $navMenu.attr('data-trigger') === 'click' ) {
				// First Sub
				subMenuFirst.children('a').on( 'click', function(e) {
					var currentItem = $(this).parent(),
						childrenSub = currentItem.children('.wpr-sub-menu, .wpr-sub-mega-menu');

					// Reset
					subMenuFirst.not(currentItem).removeClass('wpr-sub-open');
					if ( $navMenu.hasClass('wpr-nav-menu-horizontal') || ( $navMenu.hasClass('wpr-nav-menu-vertical') ) ) {
						subMenuAnimation( subMenuFirst.children('.wpr-sub-menu, .wpr-sub-mega-menu'), false );
					}

					if ( ! currentItem.hasClass( 'wpr-sub-open' ) ) {
						e.preventDefault();
						currentItem.addClass('wpr-sub-open');
						subMenuAnimation( childrenSub, true );
					} else {
						currentItem.removeClass('wpr-sub-open');
						subMenuAnimation( childrenSub, false );
					}
				});

				// Deep Subs
				subMenuDeep.on( 'click', function(e) {
					var currentItem = $(this),
						childrenSub = currentItem.children('.wpr-sub-menu');

					// Reset
					if ( $navMenu.hasClass('wpr-nav-menu-horizontal') ) {
						subMenuAnimation( subMenuDeep.find('.wpr-sub-menu'), false );
					}

					if ( ! currentItem.hasClass( 'wpr-sub-open' ) ) {
						e.preventDefault();
						currentItem.addClass('wpr-sub-open');
						subMenuAnimation( childrenSub, true );

					} else {
						currentItem.removeClass('wpr-sub-open');
						subMenuAnimation( childrenSub, false );
					}
				});

				// Reset Subs on Document click
				$( document ).mouseup(function (e) {
					if ( ! subMenuFirst.is(e.target) && subMenuFirst.has(e.target).length === 0 ) {
						subMenuFirst.not().removeClass('wpr-sub-open');
						subMenuAnimation( subMenuFirst.children('.wpr-sub-menu, .wpr-sub-mega-menu'), false );
					}
					if ( ! subMenuDeep.is(e.target) && subMenuDeep.has(e.target).length === 0 ) {
						subMenuDeep.removeClass('wpr-sub-open');
						subMenuAnimation( subMenuDeep.children('.wpr-sub-menu'), false );
					}
				});
			
			// Hover
			} else {
				// Mouse Over
				subMenuFirst.on( 'mouseenter', function() {
					subMenuAnimation( $(this).children('.wpr-sub-menu, .wpr-sub-mega-menu'), true );
				});

				subMenuDeep.on( 'mouseenter', function() {
					subMenuAnimation( $(this).children('.wpr-sub-menu'), true );
				});

				// Mouse Leave
				subMenuFirst.on( 'mouseleave', function() {
					subMenuAnimation( $(this).children('.wpr-sub-menu, .wpr-sub-mega-menu'), false );
				});

				subMenuDeep.on( 'mouseleave', function() {
					subMenuAnimation( $(this).children('.wpr-sub-menu'), false );
				});	
			}

			// Mobile Menu
			var mobileMenu = $mobileNavMenu.find( '.wpr-mobile-nav-menu' );

			// Toggle Button
			$mobileNavMenu.find( '.wpr-mobile-toggle' ).on( 'click', function() {
				// Change Toggle Text
				if ( ! $(this).hasClass('wpr-mobile-toggle-open') ) {
					$(this).addClass('wpr-mobile-toggle-open');

					if ( $(this).find('.wpr-mobile-toggle-text').length ) {
						$(this).children().eq(0).hide();
						$(this).children().eq(1).show();
					}
				} else {
					$(this).removeClass('wpr-mobile-toggle-open');
					$(this).trigger('focusout');

					if ( $(this).find('.wpr-mobile-toggle-text').length ) {
						$(this).children().eq(1).hide();
						$(this).children().eq(0).show();
					}
				}

				// Show Menu
				if ( $scope.hasClass('wpr-mobile-menu-display-offcanvas') ) {
					$('body').css('overflow', 'hidden');
					$(this).parent().siblings('.wpr-mobile-mega-menu-wrap').toggleClass('wpr-mobile-mega-menu-open');
				} else {
					$(this).parent().siblings('.wpr-mobile-mega-menu-wrap').stop().slideToggle();
				}

				// Hide Off-Canvas Menu
				$scope.find('.mobile-mega-menu-close').on('click', function() {
					$(this).closest('.wpr-mobile-mega-menu-wrap').removeClass('wpr-mobile-mega-menu-open');
					$('body').css('overflow', 'visible');
				});
				$scope.find('.wpr-mobile-mega-menu-overlay').on('click', function() {
					$(this).siblings('.wpr-mobile-mega-menu-wrap').removeClass('wpr-mobile-mega-menu-open');
					$('body').css('overflow', 'visible');
				});

				// Fix Width
				fullWidthMobileDropdown();
			});

			// Sub Menu Class
			mobileMenu.find('.sub-menu').removeClass('wpr-sub-menu').addClass('wpr-mobile-sub-menu');

			// Add Submenu Icon
			let mobileSubIcon = mobileMenu.find('.wpr-mobile-sub-icon'),
				mobileSubIconClass = 'fas ';

			if ( $scope.hasClass('wpr-sub-icon-caret-down') ) {
				mobileSubIconClass += 'fa-caret-down';
			} else if ( $scope.hasClass('wpr-sub-icon-angle-down') ) {
				mobileSubIconClass += 'fa-angle-down';
			} else if ( $scope.hasClass('wpr-sub-icon-chevron-down') ) {
				mobileSubIconClass += 'fa-chevron-down';
			} else if ( $scope.hasClass('wpr-sub-icon-plus') ) {
				mobileSubIconClass += 'fa-plus';
			}

			mobileSubIcon.addClass(mobileSubIconClass);

			// Sub Menu Dropdown
			mobileMenu.find('.menu-item-has-children > a .wpr-mobile-sub-icon, .menu-item-has-children > a[href="#"]').on( 'click', function(e) {
				e.preventDefault();
				e.stopPropagation();

				var parentItem = $(this).closest('li.menu-item');

				// Toggle
				if ( ! parentItem.hasClass('wpr-mobile-sub-open') ) {
					e.preventDefault();
					parentItem.addClass('wpr-mobile-sub-open');

					if ( ! $scope.hasClass('wpr-mobile-menu-display-offcanvas') ) {
						$(window).trigger('resize');
						parentItem.children('.wpr-mobile-sub-menu').first().stop().slideDown();
					}

					// Mega Menu
					if ( parentItem.hasClass('wpr-mega-menu-true') ) {
						if ( parentItem.hasClass('wpr-mega-menu-ajax') && ! parentItem.find('.wpr-mobile-sub-mega-menu').find('.elementor').length  ) {
							let subIcon = parentItem.find('.wpr-mobile-sub-icon');

							$.ajax({
								type: 'GET',
								url: WprConfig.resturl + '/wprmegamenu/',
								data: {
									item_id: parentItem.data('id')
								},
								beforeSend:function() {
									subIcon.removeClass(mobileSubIconClass).addClass('fas fa-circle-notch fa-spin');
								},
								success: function( response ) {
									subIcon.removeClass('fas fa-circle-notch fa-spin').addClass(mobileSubIconClass);

									if ( $scope.hasClass('wpr-mobile-menu-display-offcanvas') ) {
										parentItem.find('.wpr-menu-offcanvas-back').after(response);
										offCanvasSubMenuAnimation( parentItem );
									} else {
										parentItem.find('.wpr-mobile-sub-mega-menu').html(response);
										parentItem.children('.wpr-mobile-sub-mega-menu').slideDown();
									}

									parentItem.find('.wpr-mobile-sub-mega-menu').find('.elementor-element').each(function() {
										elementorFrontend.elementsHandler.runReadyTrigger($(this));
									});
								}
							});
						} else {
							if ( $scope.hasClass('wpr-mobile-menu-display-offcanvas') ) {
								offCanvasSubMenuAnimation( parentItem );
							} else {
								parentItem.children('.wpr-mobile-sub-mega-menu').slideDown();
							}
						}
					} else {
						if (  $scope.hasClass('wpr-mobile-menu-display-offcanvas') ) {
							offCanvasSubMenuAnimation( parentItem );
						}	
					}
				
				} else {
					// SlideUp
					parentItem.removeClass('wpr-mobile-sub-open');

					if ( ! $scope.hasClass('wpr-mobile-menu-display-offcanvas') ) {
						parentItem.children('.wpr-mobile-sub-menu').slideUp();
						parentItem.children('.wpr-mobile-sub-mega-menu').slideUp();
					}
				}
			});

			// Off-Canvas Back Button
			$scope.find('.wpr-menu-offcanvas-back').on('click', function() {
				$(this).closest('.wpr-mobile-mega-menu').removeClass('wpr-mobile-sub-offcanvas-open');
				$(this).closest('.menu-item').removeClass('wpr-mobile-sub-open');
				$scope.find('.wpr-mobile-mega-menu-wrap').removeAttr('style');
                $scope.find('.wpr-mobile-sub-mega-menu').removeAttr('style');
			});

			// Run Functions
			MegaMenuCustomWidth();
			fullWidthMobileDropdown();

			// Run Functions on Resize
			$(window).smartresize(function() {
				MegaMenuCustomWidth();
				fullWidthMobileDropdown();
			});

			// Mega Menu Full or Custom Width
			function MegaMenuCustomWidth() {
				let megaItem = $scope.find('.wpr-mega-menu-true');

				megaItem.each(function() {
					let megaSubMenu = $(this).find('.wpr-sub-mega-menu')

					if ( $(this).hasClass('wpr-mega-menu-width-full') ) {
						megaSubMenu.css({
							'max-width' : $(window).width() +'px',
							'left' : - $scope.find('.wpr-nav-menu-container').offset().left +'px'
						});	
					} else if ( $(this).hasClass('wpr-mega-menu-width-stretch') ) {
						let elContainer = $(this).closest('.elementor-section');
							elContainer = elContainer.hasClass('elementor-inner-section') ? elContainer : elContainer.children('.elementor-container');

						let elWidgetGap = !elContainer.hasClass('elementor-inner-section') ? elContainer.find('.elementor-element-populated').css('padding') : '0';
							elWidgetGap = parseInt(elWidgetGap.replace('px', ''), 10);

						let elContainerWidth = elContainer.outerWidth() - (elWidgetGap * 2),
							offsetLeft = -($scope.offset().left - elContainer.offset().left) + elWidgetGap;

						megaSubMenu.css({
							'width' : elContainerWidth +'px',
							'left' : offsetLeft +'px'
						});
					} else if ( $(this).hasClass('wpr-mega-menu-width-custom') ) {
						megaSubMenu.css({
							'width' : $(this).data('custom-width') +'px',
						});	
					}
				});
			}

			// Full Width Dropdown
			function fullWidthMobileDropdown() {
				if ( ! $scope.hasClass( 'wpr-mobile-menu-full-width' ) || ! $scope.closest('.elementor-column').length ) {
					return;
				}

				var eColumn   = $scope.closest('.elementor-column'),
					mWidth 	  = $scope.closest('.elementor-top-section').outerWidth() - 2 * mobileMenu.offset().left,
					mPosition = eColumn.offset().left + parseInt(eColumn.css('padding-left'), 10);

				mobileMenu.parent('div').css({
					'width' : mWidth +'px',
					'left' : - mPosition +'px'
				});
			}

			// Sub Menu Animation
			function subMenuAnimation( selector, show ) {
				if ( show === true ) {
					selector.stop().addClass('wpr-animate-sub');
			} else {
					selector.stop().removeClass('wpr-animate-sub');
				}
			}

			// Off-Canvas Sub Menu Animation
			function offCanvasSubMenuAnimation( selector ) {
				let title = selector.children('a').clone().children().remove().end().text();

				selector.closest('.wpr-mobile-mega-menu').addClass('wpr-mobile-sub-offcanvas-open');
				selector.find('.wpr-menu-offcanvas-back').find('h3').text(title);

				let parentItem = $scope.find('.wpr-mobile-mega-menu').children('.wpr-mobile-sub-open'),
				    subSelector = parentItem.children('ul').length ? parentItem.children('ul') : parentItem.children('.wpr-mobile-sub-mega-menu'),
				    subHeight = subSelector.outerHeight();

				if ( subHeight > $(window).height() ) {
                    $scope.find('.wpr-mobile-sub-mega-menu').not(selector.find('.wpr-mobile-sub-mega-menu')).hide();
					$scope.find('.wpr-mobile-mega-menu-wrap').css('overflow-y', 'scroll');
				}
			}

		}, // End widgetMegaMenu

		OnepageNav: function( $scope ) {
			$scope.find( '.wpr-onepage-nav-item' ).on( 'click', function(event) {
				event.preventDefault();

				var section = $( $(this).find( 'a' ).attr( 'href' ) ),
					scrollSpeed = parseInt( $(this).parent().attr( 'data-speed' ), 10 );

				$( 'html, body' ).animate({ scrollTop: section.offset().top }, scrollSpeed );
				// $( 'body' ).animate({ scrollTop: section.offset().top }, scrollSpeed );

				// Active Class
				getSectionOffset( $(window).scrollTop() );
			});

			// Trigger Fake Scroll
			if ( 'yes' === $scope.find( '.wpr-onepage-nav' ).attr( 'data-highlight' ) ) {
				setTimeout(function() {
					$(window).scroll();
				}, 10 );
			}
			
			// Active Class
			$(window).scroll(function() {
				getSectionOffset( $(this).scrollTop() );
			});

			// Get Offset
			function getSectionOffset( scrollTop ) {
				if ( 'yes' !== $scope.find( '.wpr-onepage-nav' ).attr( 'data-highlight' ) ) {
					return;
				}
				// Reset Active
				$scope.find( '.wpr-onepage-nav-item' ).children( 'a' ).removeClass( 'wpr-onepage-active-item' );

				// Set Active
				$( '.elementor-section' ).each(function() {
					var secOffTop = $(this).offset().top,
						secOffBot = secOffTop + $(this).outerHeight();

					if ( scrollTop >= secOffTop && scrollTop < secOffBot ) {
						$scope.find( '.wpr-onepage-nav-item' ).children( 'a[href="#'+ $(this).attr('id') +'"]' ).addClass( 'wpr-onepage-active-item' );
					}
				});
			}

		}, // End OnepageNav

		widgetGrid: function( $scope ) {
			var iGrid = $scope.find( '.wpr-grid' );
			var loadedItems;

			if ( ! iGrid.length ) {
				return;
			}

			if ( $scope.find('.woocommerce-result-count').length ) {
				var resultCountText = $scope.find('.woocommerce-result-count').text();
				resultCountText = resultCountText.replace( /\d\u2013\d+/, '1\u2013' + $scope.find('.wpr-grid-item').length );

				$scope.find('.woocommerce-result-count').text(resultCountText);
			}

			// Settings
			var settings = iGrid.attr( 'data-settings' );
			
			if ( $scope.find(".wpr-grid-orderby form").length ) {
				var select = $scope.find(".wpr-grid-orderby form");
				$scope.find(".orderby").on("change", function () {
					select.trigger("submit");
				});
			}

			// Grid
			if ( typeof settings !== typeof undefined && settings !== false ) {
				settings = JSON.parse( iGrid.attr( 'data-settings' ) );

				// Init Functions
				isotopeLayout( settings );
				setTimeout(function() {
					isotopeLayout( settings );
				}, 100 );

				if ( WprElements.editorCheck() ) {
					setTimeout(function() {
						isotopeLayout( settings );
					}, 500 );
					setTimeout(function() {
						isotopeLayout( settings );
					}, 1000 );
				}

				$( window ).on( 'load', function() {
					setTimeout(function() {
						isotopeLayout( settings );
					}, 100 );
				});

				$(window).smartresize(function(){
					setTimeout(function() {
						isotopeLayout( settings );
					}, 200 );
				});

				isotopeFilters( settings );

				var initialItems = 0;

				// Filtering Transitions
				iGrid.on( 'arrangeComplete', function( event, filteredItems ) {
					var deepLinkStager = 0,
						filterStager = 0,
						initStager = 0,
						duration = settings.animation_duration,
						filterDuration = settings.filters_animation_duration;

					if ( iGrid.hasClass( 'grid-images-loaded' ) ) {
						initStager = 0;
					} else {
						iGrid.css( 'opacity', '1' );

						// Default Animation
						if ( 'default' === settings.animation && 'default' === settings.filters_animation ) {
							return;
						}
					}

					for ( var key in filteredItems ) {
						if ( initialItems == 0 || key > initialItems - 1 ) {
							initStager += settings.animation_delay;
							$scope.find( filteredItems[key]['element'] ).find( '.wpr-grid-item-inner' ).css({
								'opacity' : '1',
								'top' : '0',
								'transform' : 'scale(1)',
								'transition' : 'all '+ duration +'s ease-in '+ initStager +'s',
							});
						}

						filterStager += settings.filters_animation_delay;
						if ( iGrid.hasClass( 'grid-images-loaded' ) ) {
							$scope.find( filteredItems[key]['element'] ).find( '.wpr-grid-item-inner' ).css({
								'transition' : 'all '+ filterDuration +'s ease-in '+ filterStager +'s',
							});
						}

						// DeepLinking
						var deepLink = window.location.hash;

						if ( deepLink.indexOf( '#filter:' ) >= 0 && deepLink.indexOf( '#filter:*' ) < 0 ) {
							deepLink = deepLink.replace( '#filter:', '' );

							$scope.find( filteredItems[key]['element'] ).filter(function() {
								if ( $(this).hasClass( deepLink ) ) {
									deepLinkStager += settings.filters_animation_delay;
									return $(this);
								}
							}).find( '.wpr-grid-item-inner' ).css({
								'transition-delay' : deepLinkStager +'s'
							});
						}
					}

					initialItems = filteredItems.length;
				});

				// Grid Images Loaded
				iGrid.imagesLoaded().progress( function( instance, image ) {
					if ( '1' !== iGrid.css( 'opacity' ) ) {
						iGrid.css( 'opacity', '1' );
					}
					
					setTimeout(function() {
						iGrid.addClass( 'grid-images-loaded' );
					}, 500 );
				});

				// Infinite Scroll / Load More
				if ( ( 'load-more' === settings.pagination_type || 'infinite-scroll' === settings.pagination_type ) && ( $scope.find( '.wpr-grid-pagination' ).length && ! WprElements.editorCheck() ) ) {
					
					var pagination = $scope.find( '.wpr-grid-pagination' ),
						scopeClass = '.elementor-element-'+ $scope.attr( 'data-id' );

					var navClass = false,
						threshold = false;

					if ( 'infinite-scroll' === settings.pagination_type ) {
						threshold = 300;
						navClass = scopeClass +' .wpr-load-more-btn';
					}

					iGrid.infiniteScroll({
						path: scopeClass +' .wpr-grid-pagination a',
						hideNav: navClass,
						append: false,
		  				history: false,
		  				scrollThreshold: threshold,
		  				status: scopeClass +' .page-load-status',
		  				onInit: function() {
							this.on( 'load', function() {
								iGrid.removeClass( 'grid-images-loaded' );
							});
						}
					});

					// Request
					iGrid.on( 'request.infiniteScroll', function( event, path ) {
						pagination.find( '.wpr-load-more-btn' ).hide();
						pagination.find( '.wpr-pagination-loading' ).css( 'display', 'inline-block' );
					});

					// Load
					var pagesLoaded = 0;

					iGrid.on( 'load.infiniteScroll', function( event, response ) {
						pagesLoaded++;

						// get posts from response
						var items = $( response ).find( scopeClass ).find( '.wpr-grid-item' );

						if ( $scope.find('.woocommerce-result-count').length ) {
							var resultCount = $scope.find('.woocommerce-result-count').text();
							var updatedResultCount = resultCount.replace( /\d\u2013\d+/, '1\u2013' + ( $scope.find('.wpr-grid-item').length + items.length ) );
							$scope.find('.woocommerce-result-count').text(updatedResultCount);
						}

						iGrid.infiniteScroll( 'appendItems', items );
						iGrid.isotopewpr( 'appended', items );

						items.imagesLoaded().progress( function( instance, image ) {
							isotopeLayout( settings );

							// Fix Layout
							setTimeout(function() {
								isotopeLayout( settings );
								isotopeFilters( settings );
							}, 10 );
				
							setTimeout(function() {
								iGrid.addClass( 'grid-images-loaded' );
							}, 500 );
						});

						// Loading
						pagination.find( '.wpr-pagination-loading' ).hide();

						if ( settings.pagination_max_pages - 1 !== pagesLoaded ) {
							if ( 'load-more' === settings.pagination_type ) {
								pagination.find( '.wpr-load-more-btn' ).fadeIn();

								if ( '*' !== $scope.find('.wpr-active-filter').attr('data-filter') ) {
									let dataFilterClass = $scope.find('.wpr-active-filter').attr('data-filter').substring(1);
									items.each(function() {
										if ( !$(this).hasClass(dataFilterClass) ) {
											loadedItems = false;
										} else {
											loadedItems = true;
											return false;
										}
									});
		
									if ( !loadedItems ) {
										$scope.find( '.wpr-grid' ).infiniteScroll( 'loadNextPage' );
									}
								}
							}
						} else {
							pagination.find( '.wpr-pagination-finish' ).fadeIn( 1000 );
							pagination.delay( 2000 ).fadeOut( 1000 );
							setTimeout(function() {
								pagination.find( '.wpr-pagination-loading' ).hide();
							}, 500 );
						}

						// Init Likes
						setTimeout(function() {
							postLikes( settings );
						}, 300 );

						// Init Lightbox
						lightboxPopup( settings );

						// Fix Lightbox
						iGrid.data( 'lightGallery' ).destroy( true );
						iGrid.lightGallery( settings.lightbox );

						// Init Media Hover Link
						mediaHoverLink();

						// Init Post Sharing
						postSharing();
					});

					pagination.find( '.wpr-load-more-btn' ).on( 'click', function() {
						iGrid.infiniteScroll( 'loadNextPage' );
						return false;
					});

				}

			// Slider
			} else {
				iGrid.animate({ 'opacity': '1' }, 1000);

				var sliderClass = $scope.attr('class'),
					sliderColumnsDesktop = sliderClass.match(/wpr-grid-slider-columns-\d/) ? sliderClass.match(/wpr-grid-slider-columns-\d/).join().slice(-1) : 2,
					sliderColumnsWideScreen = sliderClass.match(/columns--widescreen\d/) ? sliderClass.match(/columns--widescreen\d/).join().slice(-1) : sliderColumnsDesktop,
					sliderColumnsLaptop = sliderClass.match(/columns--laptop\d/) ? sliderClass.match(/columns--laptop\d/).join().slice(-1) : sliderColumnsDesktop,
					sliderColumnsTabletExtra = sliderClass.match(/columns--tablet_extra\d/) ? sliderClass.match(/columns--tablet_extra\d/).join().slice(-1) : sliderColumnsTablet,
					sliderColumnsTablet = sliderClass.match(/columns--tablet\d/) ? sliderClass.match(/columns--tablet\d/).join().slice(-1) : 2,
					sliderColumnsMobileExtra = sliderClass.match(/columns--mobile_extra\d/) ? sliderClass.match(/columns--mobile_extra\d/).join().slice(-1) : sliderColumnsTablet,
					sliderColumnsMobile = sliderClass.match(/columns--mobile\d/) ? sliderClass.match(/columns--mobile\d/).join().slice(-1) : 1,
					sliderSlidesToScroll = sliderClass.match(/wpr-grid-slides-to-scroll-\d/) ? +(sliderClass.match(/wpr-grid-slides-to-scroll-\d/).join().slice(-1)) : 1;

				iGrid.slick({
					appendDots : $scope.find( '.wpr-grid-slider-dots' ),
					customPaging : function ( slider, i ) {
						var slideNumber = (i + 1),
							totalSlides = slider.slideCount;

						return '<span class="wpr-grid-slider-dot"></span>';
					},
					slidesToShow: sliderColumnsDesktop,
					responsive: [
						{
							breakpoint: 10000,
							settings: {
								slidesToShow: sliderColumnsWideScreen,
								slidesToScroll: sliderSlidesToScroll > sliderColumnsWideScreen ? 1 : sliderSlidesToScroll
							}
						},
						{
							breakpoint: 2399,
							settings: {
								slidesToShow: sliderColumnsDesktop,
								slidesToScroll: sliderSlidesToScroll > sliderColumnsDesktop ? 1 : sliderSlidesToScroll
							}
						},
						{
							breakpoint: 1221,
							settings: {
								slidesToShow: sliderColumnsLaptop,
								slidesToScroll: sliderSlidesToScroll > sliderColumnsLaptop ? 1 : sliderSlidesToScroll
							}
						},
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: sliderColumnsTabletExtra,
								slidesToScroll: sliderSlidesToScroll > sliderColumnsTabletExtra ? 1 : sliderSlidesToScroll
							}
						},
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: sliderColumnsTablet,
								slidesToScroll: sliderSlidesToScroll > sliderColumnsTablet ? 1 : sliderSlidesToScroll
							}
						},
						{
							breakpoint: 880,
							settings: {
								slidesToShow: sliderColumnsMobileExtra,
							 	slidesToScroll: sliderSlidesToScroll > sliderColumnsMobileExtra ? 1 : sliderSlidesToScroll
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: sliderColumnsMobile,
								slidesToScroll: sliderSlidesToScroll > sliderColumnsMobile ? 1 : sliderSlidesToScroll
							}
						}
					],
				});

				// Adjust Horizontal Pagination
				if ( $scope.find( '.slick-dots' ).length && $scope.hasClass( 'wpr-grid-slider-dots-horizontal') ) {
					// Calculate Width
					var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

					// on Load
					if ( $scope.find( '.slick-dots' ).length ) {
						$scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
					}

					// on Resize // TODO: Change all resize functions to smartresize (debounce)
					$(window).on( 'resize', function() {
						setTimeout(function() {
							// Calculate Width
							var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

							// Set Width
							$scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
						}, 300 );
					});
				}

				settings = JSON.parse( iGrid.attr( 'data-slick' ) );
			}

			// Add To Cart AJAX
			if ( iGrid.find( '.wpr-grid-item-add-to-cart' ).length ) {
				var addCartIcon = iGrid.find( '.wpr-grid-item-add-to-cart' ).find( 'i' ),
					addCartIconClass = addCartIcon.attr( 'class' );

				if ( addCartIcon.length ) {
					addCartIconClass = addCartIconClass.substring( addCartIconClass.indexOf('fa-'), addCartIconClass.length );
				}

				$( 'body' ).on( 'adding_to_cart', function( ev, button, data ) {
					button.fadeTo( 'slow', 0 );
				});

				$( 'body' ).on( 'added_to_cart', function(ev, fragments, hash, button) {
						button.next().fadeTo( 700, 1 );

						button.css('display', 'none');

					if ( 'sidebar' === button.data('atc-popup') ) {
						if ( $('.wpr-mini-cart-toggle-wrap a').length ) {
							$('.wpr-mini-cart-toggle-wrap a').each(function() {
								if ( 'none' === $(this).closest('.wpr-mini-cart-inner').find('.wpr-mini-cart').css('display') ) {
									$(this).trigger('click');
								}
							});
						}
					} else if ( 'popup' === button.data('atc-popup') ) {
						var popupItem = button.closest('.wpr-grid-item'),
							popupText = popupItem.find('.wpr-grid-item-title').text(),
							popupLink = button.next().attr('href'),
							popupImageSrc = popupItem.find('.wpr-grid-image-wrap').length ? popupItem.find('.wpr-grid-image-wrap').data('src') : '',
							popupAnimation = button.data('atc-animation'),
							fadeOutIn = button.data('atc-fade-out-in'),
							animTime = button.data('atc-animation-time'),
							popupImage,
							animationClass = 'wpr-added-to-cart-default',
							removeAnimationClass;

						if ( 'slide-left' === popupAnimation ) {
							animationClass = 'wpr-added-to-cart-slide-in-left';
							removeAnimationClass = 'wpr-added-to-cart-slide-out-left';
						} else if ( 'scale-up' === popupAnimation ) {
							animationClass = 'wpr-added-to-cart-scale-up';
							removeAnimationClass = 'wpr-added-to-cart-scale-down';
						} else if ( 'skew' === popupAnimation ) {
							animationClass = 'wpr-added-to-cart-skew';
							removeAnimationClass = 'wpr-added-to-cart-skew-off';
						} else if ( 'fade' === popupAnimation ) {
							animationClass = 'wpr-added-to-cart-fade';
							removeAnimationClass = 'wpr-added-to-cart-fade-out';
						} else {
							removeAnimationClass = 'wpr-added-to-cart-popup-hide';
						}

						if ( '' !== popupImageSrc ) {
							popupImage = '<div class="wpr-added-tc-popup-img"><img src='+popupImageSrc+' alt="" /></div>';
						} else {
							popupImage = '';
						}

						$(this).find('.wpr-grid').append('<div class="wpr-added-to-cart-popup ' + animationClass + '">'+ popupImage +'<div class="wpr-added-tc-title"><p>'+ popupText +' was added to cart</p><p><a href='+popupLink+'>View Cart</a></p></div></div>');

						setTimeout(() => {
							$(this).find('.wpr-added-to-cart-popup').addClass(removeAnimationClass);
							setTimeout(() => {
								$(this).find('.wpr-added-to-cart-popup').remove();
							}, animTime * 1000);
						}, fadeOutIn * 1000);
					}

					if ( addCartIcon.length ) {
						button.find( 'i' ).removeClass( addCartIconClass ).addClass( 'fa-check' );
						setTimeout(function() {
							button.find( 'i' ).removeClass( 'fa-check' ).addClass( addCartIconClass );
						}, 3500 );
					}
				});
			}

			// Init Post Sharing
			postSharing();

			// Post Sharing
			function postSharing() {
				if ( $scope.find( '.wpr-sharing-trigger' ).length ) {
					var sharingTrigger = $scope.find( '.wpr-sharing-trigger' ),
						sharingInner = $scope.find( '.wpr-post-sharing-inner' ),
						sharingWidth = 5;

					// Calculate Width
					sharingInner.first().find( 'a' ).each(function() {
						sharingWidth += $(this).outerWidth() + parseInt( $(this).css('margin-right'), 10 );
					});

					// Calculate Margin
					var sharingMargin = parseInt( sharingInner.find( 'a' ).css('margin-right'), 10 );

					// Set Positions
					if ( 'left' === sharingTrigger.attr( 'data-direction') ) {
						// Set Width
						sharingInner.css( 'width', sharingWidth +'px' );

						// Set Position
						sharingInner.css( 'left', - ( sharingMargin + sharingWidth ) +'px' );
					} else if ( 'right' === sharingTrigger.attr( 'data-direction') ) {
						// Set Width
						sharingInner.css( 'width', sharingWidth +'px' );

						// Set Position
						sharingInner.css( 'right', - ( sharingMargin + sharingWidth ) +'px' );
					} else if ( 'top' === sharingTrigger.attr( 'data-direction') ) {
						// Set Margins
						sharingInner.find( 'a' ).css({
							'margin-right' : '0',
							'margin-top' : sharingMargin +'px'
						});

						// Set Position
						sharingInner.css({
							'top' : -sharingMargin +'px',
							'left' : '50%',
							'-webkit-transform' : 'translate(-50%, -100%)',
							'transform' : 'translate(-50%, -100%)'
						});
					} else if ( 'right' === sharingTrigger.attr( 'data-direction') ) {
						// Set Width
						sharingInner.css( 'width', sharingWidth +'px' );

						// Set Position
						sharingInner.css({
							'left' : sharingMargin +'px',
							// 'bottom' : - ( sharingInner.outerHeight() + sharingTrigger.outerHeight() ) +'px',
						});
					} else if ( 'bottom' === sharingTrigger.attr( 'data-direction') ) {
						// Set Margins
						sharingInner.find( 'a' ).css({
							'margin-right' : '0',
							'margin-bottom' : sharingMargin +'px'
						});

						// Set Position
						sharingInner.css({
							'bottom' : -sharingMargin +'px',
							'left' : '50%',
							'-webkit-transform' : 'translate(-50%, 100%)',
							'transform' : 'translate(-50%, 100%)'
						});
					}

					if ( 'click' === sharingTrigger.attr( 'data-action' ) ) {
						sharingTrigger.on( 'click', function() {
							var sharingInner = $(this).next();

							if ( 'hidden' === sharingInner.css( 'visibility' ) ) {
								sharingInner.css( 'visibility', 'visible' );
								sharingInner.find( 'a' ).css({
									'opacity' : '1',
									'top' : '0'
								});

								setTimeout( function() {
									sharingInner.find( 'a' ).addClass( 'wpr-no-transition-delay' );
								}, sharingInner.find( 'a' ).length * 100 );
							} else {
								sharingInner.find( 'a' ).removeClass( 'wpr-no-transition-delay' );

								sharingInner.find( 'a' ).css({
									'opacity' : '0',
									'top' : '-5px'
								});
								setTimeout( function() {
									sharingInner.css( 'visibility', 'hidden' );
								}, sharingInner.find( 'a' ).length * 100 );
							}
						});
					} else {
						sharingTrigger.on( 'mouseenter', function() {
							var sharingInner = $(this).next();

							sharingInner.css( 'visibility', 'visible' );
							sharingInner.find( 'a' ).css({
								'opacity' : '1',
								'top' : '0',
							});
							
							setTimeout( function() {
								sharingInner.find( 'a' ).addClass( 'wpr-no-transition-delay' );
							}, sharingInner.find( 'a' ).length * 100 );
						});
						$scope.find( '.wpr-grid-item-sharing' ).on( 'mouseleave', function() {
							var sharingInner = $(this).find( '.wpr-post-sharing-inner' );

							sharingInner.find( 'a' ).removeClass( 'wpr-no-transition-delay' );

							sharingInner.find( 'a' ).css({
								'opacity' : '0',
								'top' : '-5px'
							});
							setTimeout( function() {
								sharingInner.css( 'visibility', 'hidden' );
							}, sharingInner.find( 'a' ).length * 100 );
						});
					}
				}				
			}

			// Init Media Hover Link
			mediaHoverLink();

			// Media Hover Link
			function mediaHoverLink() {
				if ( 'yes' === iGrid.find( '.wpr-grid-media-wrap' ).attr( 'data-overlay-link' ) && ! WprElements.editorCheck() ) {
					iGrid.find( '.wpr-grid-media-wrap' ).css('cursor', 'pointer');

					iGrid.find( '.wpr-grid-media-wrap' ).on( 'click', function( event ) {
						var targetClass = event.target.className;

						if ( -1 !== targetClass.indexOf( 'inner-block' ) || -1 !== targetClass.indexOf( 'wpr-cv-inner' ) || 
							 -1 !== targetClass.indexOf( 'wpr-grid-media-hover' ) ) {
							event.preventDefault();

							var itemUrl = $(this).find( '.wpr-grid-media-hover-bg' ).attr( 'data-url' ),
								itemUrl = itemUrl.replace('#new_tab', '');

							if ( '_blank' === iGrid.find( '.wpr-grid-item-title a' ).attr('target') ) {
								window.open(itemUrl, '_blank').focus();
							} else {
								window.location.href = itemUrl;
							}
						}
					});
				}				
			}

			// Init Lightbox
			if ( !$scope.hasClass('elementor-widget-wpr-woo-category-grid-pro') ) {
				lightboxPopup( settings );
			}

			// Lightbox Popup
			function lightboxPopup( settings ) {
				if ( -1 === $scope.find( '.wpr-grid-item-lightbox' ).length ) {
					return;
				}

				var lightbox = $scope.find( '.wpr-grid-item-lightbox' ),
					lightboxOverlay = lightbox.find( '.wpr-grid-lightbox-overlay' ).first();

				// Set Src Attributes
				lightbox.each(function() {
					var source = $(this).find('.inner-block > span').attr( 'data-src' ),
						gridItem = $(this).closest( 'article' ).not('.slick-cloned');

					if ( ! iGrid.hasClass( 'wpr-media-grid' ) ) {
						gridItem.find( '.wpr-grid-image-wrap' ).attr( 'data-src', source );
					}

					var dataSource = gridItem.find( '.wpr-grid-image-wrap' ).attr( 'data-src' );

					if ( typeof dataSource !== typeof undefined && dataSource !== false ) {
						if ( -1 === dataSource.indexOf( 'wp-content' ) ) {
							gridItem.find( '.wpr-grid-image-wrap' ).attr( 'data-iframe', 'true' );
						}
					}
				});

				// Init Lightbox
				iGrid.lightGallery( settings.lightbox );

				// Fix LightGallery Thumbnails
				iGrid.on('onAfterOpen.lg',function() {
					if ( $('.lg-outer').find('.lg-thumb-item').length ) {
					    $('.lg-outer').find('.lg-thumb-item').each(function() {
					    	var imgSrc = $(this).find('img').attr('src'),
					    		newImgSrc = imgSrc,
					    		extIndex = imgSrc.lastIndexOf('.'),
					    		imgExt = imgSrc.slice(extIndex),
					    		cropIndex = imgSrc.lastIndexOf('-'),
					    		cropSize = /\d{3,}x\d{3,}/.test(imgSrc.substring(extIndex,cropIndex)) ? imgSrc.substring(extIndex,cropIndex) : false;
					    	
					    	if ( 42 <= imgSrc.substring(extIndex,cropIndex).length ) {
					    		cropSize = '';
					    	}

					    	if ( cropSize !== '' ) {
					    		if ( false !== cropSize ) {
					    			newImgSrc = imgSrc.replace(cropSize, '-150x150');
					    		} else {
					    			newImgSrc = [imgSrc.slice(0, extIndex), '-150x150', imgSrc.slice(extIndex)].join('');
					    		}
					    	}

					    	// Change SRC
					    	$(this).find('img').attr('src', newImgSrc);
					    });
				    }
				});

				// Show/Hide Controls
				$scope.find( '.wpr-grid' ).on( 'onAferAppendSlide.lg, onAfterSlide.lg', function( event, prevIndex, index ) {
					var lightboxControls = $( '#lg-actual-size, #lg-zoom-in, #lg-zoom-out, #lg-download' ),
						lightboxDownload = $( '#lg-download' ).attr( 'href' );

					if ( $( '#lg-download' ).length ) {
						if ( -1 === lightboxDownload.indexOf( 'wp-content' ) ) {
							lightboxControls.addClass( 'wpr-hidden-element' );
						} else {
							lightboxControls.removeClass( 'wpr-hidden-element' );
						}
					}

					// Autoplay Button
					if ( '' === settings.lightbox.autoplay ) {
						$( '.lg-autoplay-button' ).css({
							 'width' : '0',
							 'height' : '0',
							 'overflow' : 'hidden'
						});
					}
				});

				// Overlay
				if ( lightboxOverlay.length ) {
					$scope.find( '.wpr-grid-media-hover-bg' ).after( lightboxOverlay.remove() );

					$scope.find( '.wpr-grid-lightbox-overlay' ).on( 'click', function() {
						if ( ! WprElements.editorCheck() ) {
							$(this).closest( 'article' ).find( '.wpr-grid-image-wrap' ).trigger( 'click' );
						} else {
							alert( 'Lightbox is Disabled in the Editor!' );
						}
					});
				} else {
					lightbox.find( '.inner-block > span' ).on( 'click', function() {
						if ( ! WprElements.editorCheck() ) {
							var imageWrap = $(this).closest( 'article' ).find( '.wpr-grid-image-wrap' );
								imageWrap.trigger( 'click' );
						} else {
							alert( 'Lightbox is Disabled in the Editor!' );
						}
					});
				}
			}

			// Init Likes
			postLikes( settings );

			// Likes
			function postLikes( settings ) {
				if ( ! $scope.find( '.wpr-post-like-button' ).length ) {
					return;
				}

				$scope.find( '.wpr-post-like-button' ).on( 'click', function() {
					var current = $(this);

					if ( '' !== current.attr( 'data-post-id' ) ) {

					$.ajax({
						type: 'POST',
						url: current.attr( 'data-ajax' ),
						data: {
							action : 'wpr_likes_init',
							post_id : current.attr( 'data-post-id' ),
							nonce : current.attr( 'data-nonce' )
						},
						beforeSend:function() {
							current.fadeTo( 500, 0.5 );
						},	
						success: function( response ) {
							// Get Icon
							var iconClass = current.attr( 'data-icon' );

							// Get Count
							var countHTML = response.count;

							if ( '' === countHTML.replace(/<\/?[^>]+(>|$)/g, "") ) {
								countHTML = '<span class="wpr-post-like-count">'+ current.attr( 'data-text' ) +'</span>';

								if ( ! current.hasClass( 'wpr-likes-zero' ) ) {
									current.addClass( 'wpr-likes-zero' );
								}
							} else {
								current.removeClass( 'wpr-likes-zero' );
							}

							// Update Icon
							if ( current.hasClass( 'wpr-already-liked' ) ) {
								current.prop( 'title', 'Like' );
								current.removeClass( 'wpr-already-liked' );
								current.html( '<i class="'+ iconClass +'"></i>' + countHTML );
							} else {
								current.prop( 'title', 'Unlike' );
								current.addClass( 'wpr-already-liked' );
								current.html( '<i class="'+ iconClass.replace( 'far', 'fas' ) +'"></i>' + countHTML );
							}

							current.fadeTo( 500, 1 );
						}
					});

					}

					return false;
				});
			}

			// Isotope Layout
			function isotopeLayout( settings ) {
				var grid = $scope.find( '.wpr-grid' ),
					item = grid.find( '.wpr-grid-item' ),
					itemVisible = item.filter( ':visible' ),
					layout = settings.layout,
					mediaAlign = settings.media_align,
					mediaWidth = settings.media_width,
					mediaDistance = settings.media_distance,
					columns = 3,
					columnsMobile = 1,
					columnsMobileExtra,
					columnsTablet = 2,
					columnsTabletExtra,
					columnsDesktop = parseInt(settings.columns_desktop, 10),
					columnsLaptop,
					columnsWideScreen,
					gutterHr = settings.gutter_hr,
					gutterVr = settings.gutter_vr,
					contWidth = grid.width() + gutterHr - 0.3,
					viewportWidth = $( 'body' ).prop( 'clientWidth' ),
					transDuration = 400;

				// Get Responsive Columns
				var prefixClass = $scope.attr('class'),
					prefixClass = prefixClass.split(' ');

				for ( var i=0; i < prefixClass.length - 1; i++ ) {

					if ( -1 !== prefixClass[i].search(/mobile\d/) ) {
						columnsMobile = prefixClass[i].slice(-1);
					}

					if ( -1 !== prefixClass[i].search(/mobile_extra\d/) ) {
						columnsMobileExtra = prefixClass[i].slice(-1);
					}

					if ( -1 !== prefixClass[i].search(/tablet\d/) ) {
						columnsTablet = prefixClass[i].slice(-1);
					}

					if ( -1 !== prefixClass[i].search(/tablet_extra\d/) ) {
						columnsTabletExtra = prefixClass[i].slice(-1);
					}

					if ( -1 !== prefixClass[i].search(/widescreen\d/) ) {
						columnsWideScreen = prefixClass[i].slice(-1);
					}

					if ( -1 !== prefixClass[i].search(/laptop\d/) ) {
						columnsLaptop = prefixClass[i].slice(-1);
					}
				}

				// Mobile
				if ( 440 >= viewportWidth ) {
					columns = columnsMobile;
				// Mobile Extra
				} else if ( 768 >= viewportWidth ) {
					columns = (columnsMobileExtra) ? columnsMobileExtra : columnsTablet;

				// Tablet
				} else if ( 881 >= viewportWidth ) {
					columns = columnsTablet;
				// Tablet Extra
				} else if ( 1025 >= viewportWidth ) {
					columns = (columnsTabletExtra) ? columnsTabletExtra : columnsTablet;

				// Laptop
				} else if ( 1201 >= viewportWidth ) {
					columns = (columnsLaptop) ? columnsLaptop : columnsDesktop;

				// Desktop
				} else if ( 1920 >= viewportWidth ) {
					columns = columnsDesktop;

				// Larger Screens
				} else if ( 2300 >= viewportWidth ) {
					columns = columnsDesktop;
				} else if ( 2650 >= viewportWidth ) {
					columns = (columnsWideScreen) ? columnsWideScreen : columnsDesktop;
				} else if ( 3000 >= viewportWidth ) {
					columns = (columnsWideScreen) ? columnsWideScreen : columnsDesktop;
				} else {
					columns = (columnsWideScreen) ? columnsWideScreen : columnsDesktop;
				}

				// Limit Columns for Higher Screens
				if ( columns > 8 ) {
					columns = 8;
				}

				if ( 'string' == typeof(columns) && -1 !== columns.indexOf('pro') ) {
					columns = 3;
				}

				// Calculate Item Width
				item.outerWidth( Math.floor( contWidth / columns - gutterHr ) );

				// Set Vertical Gutter
				item.css( 'margin-bottom', gutterVr +'px' );

				// Reset Vertical Gutter for 1 Column Layout
				if ( 1 === columns ) {
					item.last().css( 'margin-bottom', '0' );
				}

				// add last row & make all post equal height
				var maxTop = -1;
				itemVisible.each(function ( index ) {

					// define
					var thisHieght = $(this).outerHeight(),
						thisTop = parseInt( $(this).css( 'top' ) , 10 );

					// determine last row
					if ( thisTop > maxTop ) {
						maxTop = thisTop;
					}
					
				});

				if ( 'fitRows' === layout ) {
					itemVisible.each(function() {
						if ( parseInt( $(this).css( 'top' ) ) === maxTop  ) {
							$(this).addClass( 'rf-last-row' );
						}
					});
				}

				// List Layout
				if ( 'list' === layout ) {
					var imageHeight = item.find( '.wpr-grid-image-wrap' ).outerHeight();
						item.find( '.wpr-grid-item-below-content' ).css( 'min-height', imageHeight +'px' );

					if ( $( 'body' ).prop( 'clientWidth' ) < 480 ) {

						item.find( '.wpr-grid-media-wrap' ).css({
							'float' : 'none',
							'width' : '100%'
						});

						item.find( '.wpr-grid-item-below-content' ).css({
							'float' : 'none',
							'width' : '100%',
						});

						item.find( '.wpr-grid-image-wrap' ).css( 'padding', '0' );

						item.find( '.wpr-grid-item-below-content' ).css( 'min-height', '0' );

						if ( 'zigzag' === mediaAlign ) {
							item.find( '[class*="elementor-repeater-item"]' ).css( 'text-align', 'center' );
						}

					} else {

						if ( 'zigzag' !== mediaAlign ) {

							item.find( '.wpr-grid-media-wrap' ).css({
								'float' : mediaAlign,
								'width' : mediaWidth +'%'
							});

							var listGutter = 'left' === mediaAlign ? 'margin-right' : 'margin-left';
								item.find( '.wpr-grid-media-wrap' ).css( listGutter, mediaDistance +'px' );

							item.find( '.wpr-grid-item-below-content' ).css({
								'float' : mediaAlign,
								'width' : 'calc((100% - '+ mediaWidth +'%) - '+ mediaDistance +'px)',
							});

						// Zig-zag
						} else {
							// Even
							item.filter(':even').find( '.wpr-grid-media-wrap' ).css({
								'float' : 'left',
								'width' : mediaWidth +'%'
							});
							item.filter(':even').find( '.wpr-grid-item-below-content' ).css({
								'float' : 'left',
								'width' : 'calc((100% - '+ mediaWidth +'%) - '+ mediaDistance +'px)',
							});
							item.filter(':even').find( '.wpr-grid-media-wrap' ).css( 'margin-right', mediaDistance +'px' );

							// Odd
							item.filter(':odd').find( '.wpr-grid-media-wrap' ).css({
								'float' : 'right',
								'width' : mediaWidth +'%'
							});
							item.filter(':odd').find( '.wpr-grid-item-below-content' ).css({
								'float' : 'right',
								'width' : 'calc((100% - '+ mediaWidth +'%) - '+ mediaDistance +'px)',
							});
							item.filter(':odd').find( '.wpr-grid-media-wrap' ).css( 'margin-left', mediaDistance +'px' );

							// Fix Elements Align
							if ( ! grid.hasClass( 'wpr-grid-list-ready' ) ) {
								item.each( function( index ) {
									var element = $(this).find( '[class*="elementor-repeater-item"]' );

									if ( index % 2 === 0 ) {
										element.each(function() {
											if ( ! $(this).hasClass( 'wpr-grid-item-align-center' ) ) {
												if ( 'none' === $(this).css( 'float' ) ) {
													$(this).css( 'text-align', 'left' );
												} else {
													$(this).css( 'float', 'left' );
												}

												var inner = $(this).find( '.inner-block' );
											}
										});
									} else {
										element.each(function( index ) {
											if ( ! $(this).hasClass( 'wpr-grid-item-align-center' ) ) {
												if ( 'none' === $(this).css( 'float' ) ) {
													$(this).css( 'text-align', 'right' );
												} else {
													$(this).css( 'float', 'right' );
												}

												var inner = $(this).find( '.inner-block' );

												if ( '0px' !== inner.css( 'margin-left' ) ) {
													inner.css( 'margin-right', inner.css( 'margin-left' ) );
													inner.css( 'margin-left', '0' );
												}

												// First Item
												if ( 0 === index ) {
													if ( '0px' !== inner.css( 'margin-right' ) ) {
														inner.css( 'margin-left', inner.css( 'margin-right' ) );
														inner.css( 'margin-right', '0' );
													}
												}
											}
										});
									}
								});

							}

							setTimeout(function() {
								if ( ! grid.hasClass( 'wpr-grid-list-ready' ) ) {
									grid.addClass( 'wpr-grid-list-ready' );
								}
							}, 500 );
						}

					}
				}

				// Set Layout
				if ( 'list' === layout ) {
					layout = 'fitRows';
				}

				// No Transition
				if ( 'default' !== settings.filters_animation ) {
					transDuration = 0;
				}

				// Run Isotope
				var iGrid = grid.isotopewpr({
					layoutMode: layout,
					masonry: {
						comlumnWidth: contWidth / columns,
						gutter: gutterHr
					},
					fitRows: {
						comlumnWidth: contWidth / columns,
						gutter: gutterHr
					},
					transitionDuration: transDuration,
  					percentPosition: true
				});

				// return iGrid;//tmp
			}

			// Isotope Filters
			function isotopeFilters( settings ) {

				// Count
				if ( 'yes' === settings.filters_count ) {
					$scope.find( '.wpr-grid-filters a, .wpr-grid-filters span' ).each(function() {
						if ( '*' === $(this).attr( 'data-filter') ) {
							$(this).find( 'sup' ).text( $scope.find( '.wpr-grid-filters' ).next().find('article').length );
						} else {
							$(this).find( 'sup' ).text( $scope.find( $(this).attr( 'data-filter' ) ).length );
						}
					});
				}

				// Return if Disabled
				if ( 'yes' === settings.filters_linkable ) {
					return;
				}

				// Deeplinking on Load
				if ( 'yes' === settings.deeplinking ) {
					var deepLink = window.location.hash.replace( '#filter:', '.' );

					if ( window.location.hash.match( '#filter:all' ) ) {
						deepLink = '*';
					}

					var activeFilter = $scope.find( '.wpr-grid-filters span[data-filter="'+ deepLink +'"]:not(.wpr-back-filter)' ),
						activeFilterWrap = activeFilter.parent();

					// Sub Filters
					if ( 'parent' === activeFilter.parent().attr( 'data-role' ) ) {
						if ( activeFilterWrap.parent( 'ul' ).find( 'ul[data-parent="'+ deepLink +'"]').length ) {
							activeFilterWrap.parent( 'ul' ).children( 'li' ).css( 'display', 'none' );
							activeFilterWrap.siblings( 'ul[data-parent="'+ deepLink +'"]' ).css( 'display', 'block' );
						}
					} else if ( 'sub' === activeFilter.parent().attr( 'data-role' ) ) {
						activeFilterWrap.closest( '.wpr-grid-filters' ).children( 'li' ).css( 'display', 'none' );
						activeFilterWrap.parent( 'ul' ).css( 'display', 'inline-block' );
					}

					// Active Filter Class
					$scope.find( '.wpr-grid-filters span' ).removeClass( 'wpr-active-filter' );
					activeFilter.addClass( 'wpr-active-filter' );

					$scope.find( '.wpr-grid' ).isotopewpr({ filter: deepLink });

					// Fix Lightbox
					if ( '*' !== deepLink ) {
						settings.lightbox.selector = deepLink +' .wpr-grid-image-wrap';
					} else {
						settings.lightbox.selector = ' .wpr-grid-image-wrap';
					}

					lightboxPopup( settings );
				}

				// Hide Empty Filters
				if ( 'yes' === settings.filters_hide_empty ) {
					$scope.find( '.wpr-grid-filters span' ).each(function() {
						var searchClass = $(this).attr( 'data-filter' );

						if ( '*' !== searchClass ) {
							if ( 0 === iGrid.find(searchClass).length ) {
								$(this).parent( 'li' ).addClass( 'wpr-hidden-element' );
							} else {
								$(this).parent( 'li' ).removeClass( 'wpr-hidden-element' );
							}
						}
					});
				}

				// Set a Default Filter
				if ( !$scope.hasClass('elementor-widget-wpr-woo-category-grid-pro') ) {
					if ( '' !== settings.filters_default_filter ) {
						setTimeout(function() {
							$scope.find( '.wpr-grid-filters' ).find('span[data-filter*="-'+ settings.filters_default_filter +'"]')[0].click();
						}, 100)
					}
				}

				// Click Event
				$scope.find( '.wpr-grid-filters span' ).on( 'click', function() {
					initialItems = 0;
					var filterClass = $(this).data( 'filter' ),
						filterWrap = $(this).parent( 'li' ),
						filterRole = filterWrap.attr( 'data-role' );

					// Active Filter Class
					$scope.find( '.wpr-grid-filters span' ).removeClass( 'wpr-active-filter' );
					$(this).addClass( 'wpr-active-filter' );

					// Sub Filters
					if ( 'parent' === filterRole ) {
						if ( filterWrap.parent( 'ul' ).find( 'ul[data-parent="'+ filterClass +'"]').length ) {
							filterWrap.parent( 'ul' ).children( 'li' ).css( 'display', 'none' );
							filterWrap.siblings( 'ul[data-parent="'+ filterClass +'"]' ).css( 'display', 'block' );
						}
					} else if ( 'back' === filterRole ) {
						filterWrap.closest( '.wpr-grid-filters' ).children( 'li' ).css( 'display', 'inline-block' );
						filterWrap.parent().css( 'display', 'none' );
					}

					// Deeplinking
					if ( 'yes' === settings.deeplinking ) {
						var filterHash = '#filter:'+ filterClass.replace( '.', '' );

						if ( '*' === filterClass ) {
							filterHash = '#filter:all';
						}

						window.location.href = window.location.pathname + window.location.search + filterHash;
					}

					// Infinite Scroll
					if ( 'infinite-scroll' === settings.pagination_type ) {
						if ( 0 === iGrid.find($(this).attr('data-filter')).length ) {
							$scope.find( '.wpr-grid' ).infiniteScroll( 'loadNextPage' );
						}
					}

					// Load More
					if ( 'load-more' === settings.pagination_type ) {
						if ( 0 === iGrid.find($(this).attr('data-filter')).length ) {
							$scope.find( '.wpr-grid' ).infiniteScroll( 'loadNextPage' );
						}
					}

					// Filtering Animation
					if ( 'default' !== settings.filters_animation ) {
						$scope.find( '.wpr-grid-item-inner' ).css({
							'opacity' : '0',
							'transition' : 'none'
						});
					}

					if ( 'fade-slide' === settings.filters_animation ) {
						$scope.find( '.wpr-grid-item-inner' ).css( 'top', '20px' );
					} else if ( 'zoom' === settings.filters_animation ) {
						$scope.find( '.wpr-grid-item-inner' ).css( 'transform', 'scale(0.01)' );
					} else {
						$scope.find( '.wpr-grid-item-inner' ).css({
							'top' : '0',
							'transform' : 'scale(1)'
						});
					}

					// Filter Grid Items
					$scope.find( '.wpr-grid' ).isotopewpr({ filter: filterClass });

					// Fix Lightbox
					if ( '*' !== filterClass ) {
						settings.lightbox.selector = filterClass +' .wpr-grid-image-wrap';
					} else {
						settings.lightbox.selector = ' .wpr-grid-image-wrap';
					}

					// Destroy Lightbox
					iGrid.data('lightGallery').destroy( true );
					// Init Lightbox
					iGrid.lightGallery( settings.lightbox );
				});

			}

		}, // End widgetGrid

		widgetMagazineGrid: function( $scope ) {
			// Settings
			var iGrid = $scope.find( '.wpr-magazine-grid-wrap' ),
				settings = iGrid.attr( 'data-slick' ),
				dataSlideEffect = iGrid.attr('data-slide-effect');

			// Slider
			if ( typeof settings !== typeof undefined && settings !== false ) {
				iGrid.slick({
					fade: 'fade' === dataSlideEffect ? true : false
				});
			}

			// Media Hover Link
			if ( 'yes' === iGrid.find( '.wpr-grid-media-wrap' ).attr( 'data-overlay-link' ) && ! WprElements.editorCheck() ) {
				iGrid.find( '.wpr-grid-media-wrap' ).css('cursor', 'pointer');
				
				iGrid.find( '.wpr-grid-media-wrap' ).on( 'click', function( event ) {
					var targetClass = event.target.className;

					if ( -1 !== targetClass.indexOf( 'inner-block' ) || -1 !== targetClass.indexOf( 'wpr-cv-inner' ) || 
						 -1 !== targetClass.indexOf( 'wpr-grid-media-hover' ) ) {
						event.preventDefault();
						window.location.href = $(this).find( '.wpr-grid-media-hover-bg' ).attr( 'data-url' );
					}
				});
			}

			// Sharing
			if ( $scope.find( '.wpr-sharing-trigger' ).length ) {
				var sharingTrigger = $scope.find( '.wpr-sharing-trigger' ),
					sharingInner = $scope.find( '.wpr-post-sharing-inner' ),
					sharingWidth = 5;

				// Calculate Width
				sharingInner.first().find( 'a' ).each(function() {
					sharingWidth += $(this).outerWidth() + parseInt( $(this).css('margin-right'), 10 );
				});

				// Calculate Margin
				var sharingMargin = parseInt( sharingInner.find( 'a' ).css('margin-right'), 10 );

				// Set Positions
				if ( 'left' === sharingTrigger.attr( 'data-direction') ) {
					// Set Width
					sharingInner.css( 'width', sharingWidth +'px' );

					// Set Position
					sharingInner.css( 'left', - ( sharingMargin + sharingWidth ) +'px' );
				} else if ( 'right' === sharingTrigger.attr( 'data-direction') ) {
					// Set Width
					sharingInner.css( 'width', sharingWidth +'px' );

					// Set Position
					sharingInner.css( 'right', - ( sharingMargin + sharingWidth ) +'px' );
				} else if ( 'top' === sharingTrigger.attr( 'data-direction') ) {
					// Set Margins
					sharingInner.find( 'a' ).css({
						'margin-right' : '0',
						'margin-top' : sharingMargin +'px'
					});

					// Set Position
					sharingInner.css({
						'top' : -sharingMargin +'px',
						'left' : '50%',
						'-webkit-transform' : 'translate(-50%, -100%)',
						'transform' : 'translate(-50%, -100%)'
					});
				} else if ( 'right' === sharingTrigger.attr( 'data-direction') ) {
					// Set Width
					sharingInner.css( 'width', sharingWidth +'px' );

					// Set Position
					sharingInner.css({
						'left' : sharingMargin +'px',
						// 'bottom' : - ( sharingInner.outerHeight() + sharingTrigger.outerHeight() ) +'px',
					});
				} else if ( 'bottom' === sharingTrigger.attr( 'data-direction') ) {
					// Set Margins
					sharingInner.find( 'a' ).css({
						'margin-right' : '0',
						'margin-bottom' : sharingMargin +'px'
					});

					// Set Position
					sharingInner.css({
						'bottom' : -sharingMargin +'px',
						'left' : '50%',
						'-webkit-transform' : 'translate(-50%, 100%)',
						'transform' : 'translate(-50%, 100%)'
					});
				}

				if ( 'click' === sharingTrigger.attr( 'data-action' ) ) {
					sharingTrigger.on( 'click', function() {
						var sharingInner = $(this).next();

						if ( 'hidden' === sharingInner.css( 'visibility' ) ) {
							sharingInner.css( 'visibility', 'visible' );
							sharingInner.find( 'a' ).css({
								'opacity' : '1',
								'top' : '0'
							});

							setTimeout( function() {
								sharingInner.find( 'a' ).addClass( 'wpr-no-transition-delay' );
							}, sharingInner.find( 'a' ).length * 100 );
						} else {
							sharingInner.find( 'a' ).removeClass( 'wpr-no-transition-delay' );

							sharingInner.find( 'a' ).css({
								'opacity' : '0',
								'top' : '-5px'
							});
							setTimeout( function() {
								sharingInner.css( 'visibility', 'hidden' );
							}, sharingInner.find( 'a' ).length * 100 );
						}
					});
				} else {
					sharingTrigger.on( 'mouseenter', function() {
						var sharingInner = $(this).next();

						sharingInner.css( 'visibility', 'visible' );
						sharingInner.find( 'a' ).css({
							'opacity' : '1',
							'top' : '0',
						});
						
						setTimeout( function() {
							sharingInner.find( 'a' ).addClass( 'wpr-no-transition-delay' );
						}, sharingInner.find( 'a' ).length * 100 );
					});
					$scope.find( '.wpr-grid-item-sharing' ).on( 'mouseleave', function() {
						var sharingInner = $(this).find( '.wpr-post-sharing-inner' );

						sharingInner.find( 'a' ).removeClass( 'wpr-no-transition-delay' );

						sharingInner.find( 'a' ).css({
							'opacity' : '0',
							'top' : '-5px'
						});
						setTimeout( function() {
							sharingInner.css( 'visibility', 'hidden' );
						}, sharingInner.find( 'a' ).length * 100 );
					});
				}
			}

			// Likes
			if ( $scope.find( '.wpr-post-like-button' ).length ) {

				$scope.find( '.wpr-post-like-button' ).on( 'click', function() {
					var current = $(this);

					if ( '' !== current.attr( 'data-post-id' ) ) {

					$.ajax({
						type: 'POST',
						url: current.attr( 'data-ajax' ),
						data: {
							action : 'wpr_likes_init',
							post_id : current.attr( 'data-post-id' ),
							nonce : current.attr( 'data-nonce' )
						},
						beforeSend:function() {
							current.fadeTo( 500, 0.5 );
						},	
						success: function( response ) {
							// Get Icon
							var iconClass = current.attr( 'data-icon' );

							// Get Count
							var countHTML = response.count;

							if ( '' === countHTML.replace(/<\/?[^>]+(>|$)/g, "") ) {
								countHTML = '<span class="wpr-post-like-count">'+ current.attr( 'data-text' ) +'</span>';

								if ( ! current.hasClass( 'wpr-likes-zero' ) ) {
									current.addClass( 'wpr-likes-zero' );
								}
							} else {
								current.removeClass( 'wpr-likes-zero' );
							}

							// Update Icon
							if ( current.hasClass( 'wpr-already-liked' ) ) {
								current.prop( 'title', 'Like' );
								current.removeClass( 'wpr-already-liked' );
								current.html( '<i class="'+ iconClass +'"></i>' + countHTML );
							} else {
								current.prop( 'title', 'Unlike' );
								current.addClass( 'wpr-already-liked' );
								current.html( '<i class="'+ iconClass.replace( 'far', 'fas' ) +'"></i>' + countHTML );
							}

							current.fadeTo( 500, 1 );
						}
					});

					}

					return false;
				});

			}

		}, // End widgetMagazineGrid

		widgetFeaturedMedia: function( $scope ) {
			var gallery = $scope.find( '.wpr-gallery-slider' ),
				gallerySettings = gallery.attr( 'data-slick' );
			
			gallery.animate({ 'opacity' : '1' }, 1000 );

			if ( '[]' !== gallerySettings ) {
				gallery.slick({
					appendDots : $scope.find( '.wpr-gallery-slider-dots' ),
					customPaging : function ( slider, i ) {
						var slideNumber = (i + 1),
							totalSlides = slider.slideCount;

						return '<span class="wpr-gallery-slider-dot"></span>';
					}
				});
			}

			// Lightbox
			var lightboxSettings = $( '.wpr-featured-media-image' ).attr( 'data-lightbox' );

			if ( typeof lightboxSettings !== typeof undefined && lightboxSettings !== false && ! WprElements.editorCheck() ) {
				var MediaWrap = $scope.find( '.wpr-featured-media-wrap' );
					lightboxSettings = JSON.parse( lightboxSettings );

				// Init Lightbox
				MediaWrap.lightGallery( lightboxSettings );

				// Show/Hide Controls
				MediaWrap.on( 'onAferAppendSlide.lg, onAfterSlide.lg', function( event, prevIndex, index ) {
					var lightboxControls = $( '#lg-actual-size, #lg-zoom-in, #lg-zoom-out, #lg-download' ),
						lightboxDownload = $( '#lg-download' ).attr( 'href' );

					if ( $( '#lg-download' ).length ) {
						if ( -1 === lightboxDownload.indexOf( 'wp-content' ) ) {
							lightboxControls.addClass( 'wpr-hidden-element' );
						} else {
							lightboxControls.removeClass( 'wpr-hidden-element' );
						}
					}

					// Autoplay Button
					if ( '' === lightboxSettings.autoplay ) {
						$( '.lg-autoplay-button' ).css({
							 'width' : '0',
							 'height' : '0',
							 'overflow' : 'hidden'
						});
					}
				});
			}
		}, // End widgetFeaturedMedia

		// widgetProductMedia: function( $scope ) {
		// 	if ( $scope.find('.wpr-gallery-slider-arrows-wrap') ) {
		// 		var sliderIcons = $scope.find('.wpr-gallery-slider-arrows-wrap');
	
		// 		sliderIcons.remove();
	
		// 		$scope.find('.flex-viewport').append(sliderIcons);
				
		// 		$scope.find('.wpr-gallery-slider-arrow').on('click', function() {
		// 			if ($(this).hasClass('wpr-gallery-slider-prev-arrow')) {
		// 				$scope.find('a.flex-prev').trigger('click');
		// 			} else if ($(this).hasClass('wpr-gallery-slider-next-arrow')) {
		// 				$scope.find('a.flex-next').trigger('click');
		// 			}
		// 		});
		// 	}
		// }, // End widgetProductMedia
        
        widgetProductMedia: function( $scope ) {

			var sliderIcons = $scope.find('.wpr-gallery-slider-arrows-wrap');

			sliderIcons.remove();

			if ( $scope.find('.woocommerce-product-gallery__trigger').length ) {
				$scope.find('.woocommerce-product-gallery__trigger').remove();
			}

			$scope.find('.flex-viewport').append(sliderIcons);
			
			$scope.find('.wpr-gallery-slider-arrow').on('click', function() {
				if ($(this).hasClass('wpr-gallery-slider-prev-arrow')) {
					$scope.find('a.flex-prev').trigger('click');
				} else if ($(this).hasClass('wpr-gallery-slider-next-arrow')) {
					$scope.find('a.flex-next').trigger('click');
				}
			});
		
			// Lightbox
			var lightboxSettings = $( '.wpr-product-media-wrap' ).attr( 'data-lightbox' );
		
			if ( typeof lightboxSettings !== typeof undefined && lightboxSettings !== false && ! WprElements.editorCheck() ) {
				
				$scope.find('.woocommerce-product-gallery__image').each(function() {
					$(this).attr('data-lightbox', lightboxSettings);
					$(this).attr('data-src', $(this).find('a').attr('href'));
				});


				$scope.find('.woocommerce-product-gallery__image').on('click', function(e) {
					e.stopPropagation();
				});

				$scope.find('.wpr-product-media-lightbox').on('click', function() {
					$scope.find('.woocommerce-product-gallery__image').trigger('click');
				});

				var MediaWrap = $scope.find( '.woocommerce-product-gallery__wrapper' );
					lightboxSettings = JSON.parse( lightboxSettings );
		
				// Init Lightbox
				MediaWrap.lightGallery( lightboxSettings );
		
				// Show/Hide Controls
				MediaWrap.on( 'onAferAppendSlide.lg, onAfterSlide.lg', function( event, prevIndex, index ) {
					var lightboxControls = $( '#lg-actual-size, #lg-zoom-in, #lg-zoom-out, #lg-download' ),
						lightboxDownload = $( '#lg-download' ).attr( 'href' );
		
					if ( $( '#lg-download' ).length ) {
						if ( -1 === lightboxDownload.indexOf( 'wp-content' ) ) {
							lightboxControls.addClass( 'wpr-hidden-element' );
						} else {
							lightboxControls.removeClass( 'wpr-hidden-element' );
						}
					}
		
					// Autoplay Button
					if ( '' === lightboxSettings.autoplay ) {
						$( '.lg-autoplay-button' ).css({
							 'width' : '0',
							 'height' : '0',
							 'overflow' : 'hidden'
						});
					}
				});
			}

			if ( $scope.hasClass('wpr-product-media-thumbs-slider') && $scope.hasClass('wpr-product-media-thumbs-vertical') ) {

				var thumbsToShow = $scope.find('.wpr-product-media-wrap').data('slidestoshow');
				var thumbsToScroll = +$scope.find('.wpr-product-media-wrap').data('slidestoscroll');
	
				$scope.find('.flex-control-nav').css('height', `${((100/thumbsToShow) * $scope.find('.flex-control-nav li').length)}%`);

				$scope.find('.flex-control-nav').wrap('<div class="wpr-fcn-wrap"></div>');

				var thumbIcon1 = $scope.find('.wpr-thumbnail-slider-prev-arrow');
				var thumbIcon2 = $scope.find('.wpr-thumbnail-slider-next-arrow');
	
				thumbIcon1.remove();
				thumbIcon2.remove();

				$scope.find('.wpr-fcn-wrap').prepend(thumbIcon1);
				$scope.find('.wpr-fcn-wrap').append(thumbIcon2);
			}

			if ( $scope.hasClass('wpr-product-media-thumbs-slider') && $scope.hasClass('wpr-product-media-thumbs-horizontal') ) {

				var thumbsToShow = $scope.find('.wpr-product-media-wrap').data('slidestoshow');
				var thumbsToScroll = +$scope.find('.wpr-product-media-wrap').data('slidestoscroll');
	
				$scope.find('.flex-control-nav').css('width', `${((100/thumbsToShow) * $scope.find('.flex-control-nav li').length)}%`);

				$scope.find('.flex-control-nav').wrap('<div class="wpr-fcn-wrap"></div>');

				var thumbIcon1 = $scope.find('.wpr-thumbnail-slider-prev-arrow');
				var thumbIcon2 = $scope.find('.wpr-thumbnail-slider-next-arrow');
	
				thumbIcon1.remove();
				thumbIcon2.remove();

				if ( $scope.find('.wpr-product-media-wrap').data('slidestoshow') < $scope.find('.flex-control-nav li').length ) {
					$scope.find('.wpr-fcn-wrap').prepend(thumbIcon1);
					$scope.find('.wpr-fcn-wrap').append(thumbIcon2);
				}

				var posx = 0;
				var slideCount = 0;
				$scope.find('.wpr-thumbnail-slider-prev-arrow').attr('disabled', true);
	
				$scope.find('.wpr-thumbnail-slider-next-arrow').on('click', function() {
						// var currTrans =  $scope.find('.flex-control-nav').css('transform') != 'none' ? $scope.find('.flex-control-nav').css('transform').split(/[()]/)[1] : 0;
						// posx = currTrans ? currTrans.split(',')[4] : 0;
						if ( (slideCount + thumbsToScroll) < $scope.find('.flex-control-nav li').length - 1 ) {
							posx++;
							slideCount = slideCount + thumbsToScroll;
							$scope.find('.flex-control-nav').css('transform', `translateX(${parseInt(-posx) *(parseInt($scope.find('.flex-control-nav li:last-child').css('width').slice(0, -2)) + parseInt($scope.find('.flex-control-nav li').css('margin-right'))) * thumbsToScroll}px)`);
							if ( posx >= 1 ) {
								$scope.find('.wpr-thumbnail-slider-prev-arrow').attr('disabled', false);
							} else {
								$scope.find('.wpr-thumbnail-slider-prev-arrow').attr('disabled', true);
							}
						} else {
							posx = 0;
							slideCount = 0;
							$scope.find('.flex-control-nav').css('transform', `translateX(0)`);
							$scope.find('.wpr-thumbnail-slider-prev-arrow').attr('disabled', true);
						}
				});
	
				$scope.find('.wpr-thumbnail-slider-prev-arrow').on('click', function() {
						if ( posx >= 1 ) {
							posx--;
							if ( posx == 0 ) {
								$(this).attr('disabled', true);
							}
							slideCount = slideCount - thumbsToScroll;
							$scope.find('.flex-control-nav').css('transform', `translateX(${parseInt(-posx) * (parseInt($scope.find('.flex-control-nav li').css('width').slice(0, -2)) + parseInt($scope.find('.flex-control-nav li:last-child').css('margin-right'))) * thumbsToScroll}px)`);
							if ( slideCount < $scope.find('.flex-control-nav li').length - 1 ) {
								$scope.find('.wpr-thumbnail-slider-next-arrow').attr('disabled', false);
							} else {
								$scope.find('.wpr-thumbnail-slider-next-arrow').attr('disabled', true);
							}
						} else {
							// slideCount = $scope.find('.flex-control-nav li').length - 1;
							// $scope.find('.flex-control-nav').css('transform', `translateX(0)`);
							$(this).attr('disabled', true);
						}
				});

			}
		}, // End widgetProductMedia

		widgetCountDown: function( $scope ) {
			var countDownWrap = $scope.children( '.elementor-widget-container' ).children( '.wpr-countdown-wrap' ),
				countDownInterval = null,
				dataInterval = countDownWrap.data( 'interval' ),
				dataShowAgain = countDownWrap.data( 'show-again' ),
				endTime = new Date( dataInterval * 1000);

			// Evergreen End Time
			if ( 'evergreen' === countDownWrap.data( 'type' ) ) {
				var evergreenDate = new Date(),
					widgetID = $scope.attr( 'data-id' ),
					settings = JSON.parse( localStorage.getItem( 'WprCountDownSettings') ) || {};

				// End Time
				if ( settings.hasOwnProperty( widgetID ) ) {
					if ( Object.keys(settings).length === 0 || dataInterval !== settings[widgetID].interval ) {
						endTime = evergreenDate.setSeconds( evergreenDate.getSeconds() + dataInterval );
					} else {
						endTime = settings[widgetID].endTime;
					}
				} else {
					endTime = evergreenDate.setSeconds( evergreenDate.getSeconds() + dataInterval );
				}

				if ( endTime + dataShowAgain < evergreenDate.setSeconds( evergreenDate.getSeconds() ) ) {
					endTime = evergreenDate.setSeconds( evergreenDate.getSeconds() + dataInterval );
				}

				// Settings
				settings[widgetID] = {
					interval: dataInterval,
					endTime: endTime
				};

				// Save Settings in Browser
				localStorage.setItem( 'WprCountDownSettings', JSON.stringify( settings ) );
			}

			// Init on Load
			initCountDown();

			// Start CountDown
			if ( ! WprElements.editorCheck() ) { //tmp
				countDownInterval = setInterval( initCountDown, 1000 );
			}

			function initCountDown() {
				var timeLeft = endTime - new Date();

				var numbers = {
					days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
					hours: Math.floor(timeLeft / (1000 * 60 * 60) % 24),
					minutes: Math.floor(timeLeft / 1000 / 60 % 60),
					seconds: Math.floor(timeLeft / 1000 % 60)
				};

				if ( numbers.days < 0 || numbers.hours < 0 || numbers.minutes < 0 ) {
					numbers = {
						days: 0,
						hours: 0,
						minutes: 0,
						seconds: 0
					};
				}

				$scope.find( '.wpr-countdown-number' ).each(function() {
					var number = numbers[ $(this).attr( 'data-item' ) ];

					if ( 1 === number.toString().length ) {
						number = '0' + number;
					}

					$(this).text( number );

					// Labels
					var labels = $(this).next();

					if ( labels.length ) {
						if ( ! $(this).hasClass( 'wpr-countdown-seconds' ) ) {
							var labelText = labels.data( 'text' );

							if ( '01' == number ) {
								labels.text( labelText.singular );
							} else {
								labels.text( labelText.plural );
							}
						}
					}
				});

				// Stop Counting
				if ( timeLeft < 0 ) {
					clearInterval( countDownInterval );

					// Actions
					expiredActions();
				}
			}

			function expiredActions() {
				var dataActions = countDownWrap.data( 'actions' );

				if ( ! WprElements.editorCheck() ) {
					
					if ( dataActions.hasOwnProperty( 'hide-timer' ) ) {
						countDownWrap.hide();
					}
					
					if ( dataActions.hasOwnProperty( 'hide-element' ) ) {
						$( dataActions['hide-element'] ).hide();
					}
					
					if ( dataActions.hasOwnProperty( 'message' ) ) {
						if ( ! $scope.children( '.elementor-widget-container' ).children( '.wpr-countdown-message' ).length ) {
							countDownWrap.after( '<div class="wpr-countdown-message">'+ dataActions['message'] +'</div>' );
						}
					}
					
					if ( dataActions.hasOwnProperty( 'redirect' ) ) {
						window.location.href = dataActions['redirect'];
					}

					if ( dataActions.hasOwnProperty( 'load-template' ) ) {
						countDownWrap.parent().find( '.elementor-inner' ).parent().show();
					}

				}
				
			}

		}, // End widgetCountDown

		widgetGoogleMaps: function( $scope ) {
			var googleMap = $scope.find( '.wpr-google-map' ),
				settings = googleMap.data( 'settings' ),
				controls = googleMap.data( 'controls' ),
				locations = googleMap.data( 'locations' ),
				gMarkers = [],
				bounds = new google.maps.LatLngBounds();

			// Create Map
			var map = new google.maps.Map( googleMap[0], {
				mapTypeId: settings.type,
				styles: get_map_style( settings ),
				zoom: settings.zoom_depth,
				gestureHandling: settings.zoom_on_scroll,

				// UI
				mapTypeControl: controls.type,
				fullscreenControl: controls.fullscreen,
                zoomControl: controls.zoom,
                streetViewControl: controls.streetview,
			} );

			// Set Markers
			for ( var i = 0; i < locations.length; i++ ) {
				var data = locations[i],
					iconOptions = '',
					iconSizeW = data.gm_marker_icon_size_width.size,
					iconSizeH = data.gm_marker_icon_size_height.size;

				// Empty Values
				if ( '' == data.gm_latitude || '' == data.gm_longtitude ) {
					continue;
				}

				// Custom Icon
				if ( 'yes' === data.gm_custom_marker ) {
					iconOptions = {
						url: data.gm_marker_icon.url,
						scaledSize: new google.maps.Size( iconSizeW, iconSizeH ),
					};
				}

				// Marker
				var marker = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng( parseFloat( data.gm_latitude ), parseFloat( data.gm_longtitude ) ),
					animation: google.maps.Animation[data.gm_marker_animation],
					icon: iconOptions
				});

				// Info Window
				if ( 'none' !== data.gm_show_info_window ) {
					infoWindow( marker, data );
				}

				gMarkers.push(marker);
				bounds.extend(marker.position);
			}

			// Center Map
			if ( locations.length > 1 ) {
				map.fitBounds(bounds);
			} else {
				map.setCenter( bounds.getCenter() );
			}

			// Marker Clusters
			if ( 'yes' === settings.cluster_markers ) {
				var markerCluster = new MarkerClusterer(map, gMarkers, {
					imagePath: settings.clusters_url
				});
			}

			// Info Wondow
			function infoWindow( marker, data ) {
				var content = '<div class="wpr-gm-iwindow"><h3>'+ data.gm_location_title +'</h3><p>'+ data.gm_location_description +'</p></div>',
					iWindow = new google.maps.InfoWindow({
						content: content,
						maxWidth: data.gm_info_window_width.size
					});

				if ( 'load' === data.gm_show_info_window ) {
					iWindow.open( map, marker );
				} else {
					marker.addListener( 'click', function() {
						iWindow.open( map, marker );
					});
				}
			}

			// Map Styles
			function get_map_style( settings ) {
				var style;

				switch ( settings.style ) {
					case 'simple':
						style = JSON.parse('[{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#fffffa"}]},{"featureType":"water","stylers":[{"lightness":50}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"lightness":40}]}]');
						break;
					case 'white-black':
						style = JSON.parse('[{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"weight":1}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"weight":0.8}]},{"featureType":"landscape","stylers":[{"color":"#ffffff"}]},{"featureType":"water","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels.text","stylers":[{"visibility":"on"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"elementType":"labels.icon","stylers":[{"visibility":"on"}]}]');
						break;
					case 'light-silver':
						style = JSON.parse('[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]');
						break;
					case 'light-grayscale':
						style = JSON.parse('[{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]');
						break;
					case 'subtle-grayscale':
						style = JSON.parse('[{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]');
						break;
					case 'mostly-white':
						style = JSON.parse('[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}]');
						break;
					case 'mostly-green':
						style = JSON.parse('[{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}]');
						break;
					case 'neutral-blue':
						style = JSON.parse('[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}]');
						break;
					case 'blue-water':
						style = JSON.parse('[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]');
						break;
					case 'blue-essense':
						style = JSON.parse('[{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]');
						break;
					case 'golden-brown':
						style = JSON.parse('[{"featureType":"all","elementType":"all","stylers":[{"color":"#ff7000"},{"lightness":"69"},{"saturation":"100"},{"weight":"1.17"},{"gamma":"2.04"}]},{"featureType":"all","elementType":"geometry","stylers":[{"color":"#cb8536"}]},{"featureType":"all","elementType":"labels","stylers":[{"color":"#ffb471"},{"lightness":"66"},{"saturation":"100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"lightness":"-8"},{"gamma":"0.98"},{"weight":"2.45"},{"saturation":"26"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20},{"color":"#ecc080"}]}]');
						break;
					case 'midnight-commander':
						style = JSON.parse('[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]');
						break;
					case 'shades-of-grey':
						style = JSON.parse('[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]');
						break;
					case 'yellow-black':
						style = JSON.parse('[{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#e5c163"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#e5c163"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]');
						break;
					case 'custom':
						style = JSON.parse( settings.custom_style );
						break;
					default:
						style = '';
				}

				return style;
			}

		}, // End widgetGoogleMaps

		widgetBeforeAfter: function( $scope ) {
			var imagesWrap = $scope.find( '.wpr-ba-image-container' ),
				imageOne = imagesWrap.find( '.wpr-ba-image-1' ),
				imageTwo = imagesWrap.find( '.wpr-ba-image-2' ),
				divider = imagesWrap.find( '.wpr-ba-divider' ),
				startPos = imagesWrap.attr( 'data-position' );

			// Horizontal
			if ( imagesWrap.hasClass( 'wpr-ba-horizontal' ) ) {
				// On Load
				divider.css( 'left', startPos +'%' );
				imageTwo.css( 'left', startPos +'%' );
				imageTwo.find( 'img' ).css( 'right', startPos +'%' );

				// On Move
				divider.on( 'move', function(e) {
					var overlayWidth = e.pageX - imagesWrap.offset().left;

					// Reset
					divider.css({
						'left' : 'auto',
						'right' : 'auto'
					});
					imageTwo.css({
						'left' : 'auto',
						'right' : 'auto'
					});

					if ( overlayWidth > 0  && overlayWidth < imagesWrap.outerWidth() ) {
						divider.css( 'left', overlayWidth );
						imageTwo.css( 'left', overlayWidth );
						imageTwo.find( 'img' ).css( 'right', overlayWidth );
					} else {
						if ( overlayWidth <= 0 ) {
							divider.css( 'left', 0 );
							imageTwo.css( 'left', 0 );
							imageTwo.find( 'img' ).css( 'right', 0 );
						} else if ( overlayWidth >= imagesWrap.outerWidth() ) {
							divider.css( 'right', - divider.outerWidth() / 2 );
							imageTwo.css( 'right', 0 );
							imageTwo.find( 'img' ).css( 'right', '100%' );
						}
					}

					hideLabelsOnTouch();
				});

			// Vertical
			} else {
				// On Load
				divider.css( 'top', startPos +'%' );
				imageTwo.css( 'top', startPos +'%' );
				imageTwo.find( 'img' ).css( 'bottom', startPos +'%' );

				// On Move
				divider.on( 'move', function(e) {
					var overlayWidth = e.pageY - imagesWrap.offset().top;

					// Reset
					divider.css({
						'top' : 'auto',
						'bottom' : 'auto'
					});
					imageTwo.css({
						'top' : 'auto',
						'bottom' : 'auto'
					});

					if ( overlayWidth > 0  && overlayWidth < imagesWrap.outerHeight() ) {
						divider.css( 'top', overlayWidth );
						imageTwo.css( 'top', overlayWidth );
						imageTwo.find( 'img' ).css( 'bottom', overlayWidth );
					} else {
						if ( overlayWidth <= 0 ) {
							divider.css( 'top', 0 );
							imageTwo.css( 'top', 0 );
							imageTwo.find( 'img' ).css( 'bottom', 0 );
						} else if ( overlayWidth >= imagesWrap.outerHeight() ) {
							divider.css( 'bottom', - divider.outerHeight() / 2 );
							imageTwo.css( 'bottom', 0 );
							imageTwo.find( 'img' ).css( 'bottom', '100%' );
						}
					}

					hideLabelsOnTouch();
				});
			}

			// Mouse Hover
			if ( 'mouse' === imagesWrap.attr( 'data-trigger' ) ) {

				imagesWrap.on( 'mousemove', function( event ) {

					// Horizontal
					if ( imagesWrap.hasClass( 'wpr-ba-horizontal' ) ) {
						var overlayWidth = event.pageX - $(this).offset().left;
						divider.css( 'left', overlayWidth );
						imageTwo.css( 'left', overlayWidth );
						imageTwo.find( 'img' ).css( 'right', overlayWidth );

					// Vertical
					} else {
						var overlayWidth = event.pageY - $(this).offset().top;
						divider.css( 'top', overlayWidth );
						imageTwo.css( 'top', overlayWidth );
						imageTwo.find( 'img' ).css( 'bottom', overlayWidth );
					}

					hideLabelsOnTouch();
				});

			}

			// Hide Labels
			hideLabelsOnTouch();

			function hideLabelsOnTouch() {
				var labelOne = imagesWrap.find( '.wpr-ba-label-1 div' ),
					labelTwo = imagesWrap.find( '.wpr-ba-label-2 div' );

				if ( ! labelOne.length && ! labelTwo.length ) {
					return;
				}

				// Horizontal
				if ( imagesWrap.hasClass( 'wpr-ba-horizontal' ) ) {
					var labelOneOffset = labelOne.position().left + labelOne.outerWidth(),
						labelTwoOffset = labelTwo.position().left + labelTwo.outerWidth();

					if ( labelOneOffset + 15 >= parseInt( divider.css( 'left' ), 10 ) ) {
						labelOne.stop().css( 'opacity', 0 );
					} else {
						labelOne.stop().css( 'opacity', 1 );
					}

					if ( (imagesWrap.outerWidth() - (labelTwoOffset + 15)) <= parseInt( divider.css( 'left' ), 10 ) ) {
						labelTwo.stop().css( 'opacity', 0 );
					} else {
						labelTwo.stop().css( 'opacity', 1 );
					}

				// Vertical
				} else {
					var labelOneOffset = labelOne.position().top + labelOne.outerHeight(),
						labelTwoOffset = labelTwo.position().top + labelTwo.outerHeight();

					if ( labelOneOffset + 15 >= parseInt( divider.css( 'top' ), 10 ) ) {
						labelOne.stop().css( 'opacity', 0 );
					} else {
						labelOne.stop().css( 'opacity', 1 );
					}

					if ( (imagesWrap.outerHeight() - (labelTwoOffset + 15)) <= parseInt( divider.css( 'top' ), 10 ) ) {
						labelTwo.stop().css( 'opacity', 0 );
					} else {
						labelTwo.stop().css( 'opacity', 1 );
					}
				}
			}

		}, // End widgetBeforeAfter

		widgetMailchimp: function( $scope ) {
			var mailchimpForm = $scope.find( 'form' );

			mailchimpForm.on( 'submit', function(e) {
				e.preventDefault();

				var buttonText = $(this).find('button').text();

				// Change Text
				$(this).find('button').text( $(this).find('button').data('loading') );

				$.ajax({
					url: WprConfig.ajaxurl,
					type: 'POST',
					data: {
						action: 'mailchimp_subscribe',
						fields: $(this).serialize(),
						apiKey: mailchimpForm.data( 'api-key' ),
						listId: mailchimpForm.data( 'list-id' )
					},
					success: function(data) {
						mailchimpForm.find('button').text( buttonText );

						if ( 'subscribed' === data.status ) {
							$scope.find( '.wpr-mailchimp-success-message' ).show();
						} else {
							$scope.find( '.wpr-mailchimp-error-message' ).show();
						}
						
						$scope.find( '.wpr-mailchimp-message' ).fadeIn();
					}
				});

			});

		}, // End widgetMailchimp

		widgetAdvancedSlider: function( $scope ) {
			var $advancedSlider = $scope.find( '.wpr-advanced-slider' ),
			sliderData = $advancedSlider.data('slick');

			// Slider Columns
			var sliderClass = $scope.attr('class'),
				sliderColumnsDesktop = sliderClass.match(/wpr-adv-slider-columns-\d/) ? sliderClass.match(/wpr-adv-slider-columns-\d/).join().slice(-1) : 2,
				sliderColumnsWideScreen = sliderClass.match(/columns--widescreen\d/) ? sliderClass.match(/columns--widescreen\d/).join().slice(-1) : sliderColumnsDesktop,
				sliderColumnsLaptop = sliderClass.match(/columns--laptop\d/) ? sliderClass.match(/columns--laptop\d/).join().slice(-1) : sliderColumnsDesktop,
				sliderColumnsTabletExtra = sliderClass.match(/columns--tablet_extra\d/) ? sliderClass.match(/columns--tablet_extra\d/).join().slice(-1) : sliderColumnsTablet,
				sliderColumnsTablet = sliderClass.match(/columns--tablet\d/) ? sliderClass.match(/columns--tablet\d/).join().slice(-1) : 2,
				sliderColumnsMobileExtra = sliderClass.match(/columns--mobile_extra\d/) ? sliderClass.match(/columns--mobile_extra\d/).join().slice(-1) : sliderColumnsTablet,
				sliderColumnsMobile = sliderClass.match(/columns--mobile\d/) ? sliderClass.match(/columns--mobile\d/).join().slice(-1) : 1,
				sliderSlidesToScroll = +(sliderClass.match(/wpr-adv-slides-to-scroll-\d/).join().slice(-1)),
				dataSlideEffect = $advancedSlider.attr('data-slide-effect');

			$advancedSlider.slick({
				appendArrows :  $scope.find('.wpr-slider-controls'),
				appendDots :  $scope.find('.wpr-slider-dots'),
				customPaging : function (slider, i) {
					var slideNumber = (i + 1),
						totalSlides = slider.slideCount;
					return '<span class="wpr-slider-dot"></span>';
				},
				slidesToShow: sliderColumnsDesktop,
				responsive: [
					{
						breakpoint: 10000,
						settings: {
							slidesToShow: sliderColumnsWideScreen,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsWideScreen ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsWideScreen && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 2399,
						settings: {
							slidesToShow: sliderColumnsDesktop,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsDesktop ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsDesktop && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1221,
						settings: {
							slidesToShow: sliderColumnsLaptop,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsLaptop ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsLaptop && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: sliderColumnsTabletExtra,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsTabletExtra ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsTabletExtra && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: sliderColumnsTablet,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsTablet ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsTablet && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 880,
						settings: {
							slidesToShow: sliderColumnsMobileExtra,
						 	slidesToScroll: sliderSlidesToScroll > sliderColumnsMobileExtra ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsMobileExtra && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: sliderColumnsMobile,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsMobile ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsMobile && 'fade' === dataSlideEffect) ? true : false
						}
					}
				],
			});

			function sliderVideoSize(){
				  
				var sliderWidth = $advancedSlider.find('.wpr-slider-item').outerWidth(),
					sliderHeight = $advancedSlider.find('.wpr-slider-item').outerHeight(),
					sliderRatio = sliderWidth / sliderHeight,
					iframeRatio = (16/9),
					iframeHeight,
					iframeWidth,
					iframeTopDistance = 0,
					iframeLeftDistance = 0;

				if ( sliderRatio > iframeRatio ) {
					iframeWidth = sliderWidth;
					iframeHeight = iframeWidth / iframeRatio;
					iframeTopDistance = '-'+ ( iframeHeight - sliderHeight ) / 2 +'px';
				} else {
					iframeHeight = sliderHeight;
					iframeWidth = iframeHeight * iframeRatio;
					iframeLeftDistance = '-'+ ( iframeWidth - sliderWidth ) / 2 +'px';
				}

				$advancedSlider.find('iframe').css({
					'width': iframeWidth +'px',
					'height': iframeHeight +'px',
					'max-width': 'none',
					'position': 'absolute',
					'left': iframeLeftDistance +'',
					'top': iframeTopDistance +'',
					'display': 'block',
					'text-align': 'inherit',
					'line-height':'0px',
					'border-width': '0px',
					'margin': '0px',
					'padding': '0px',
				});
			}

			$(window).on('load resize', function(){
				sliderVideoSize();
			});

			function autoplayVideo() {
				$advancedSlider.find('.slick-active').each(function() {
					var videoSrc = $(this).attr('data-video-src'),
						videoAutoplay = $(this).attr('data-video-autoplay');
					
					if ( $(this).find( '.wpr-slider-video' ).length !== 1 && videoAutoplay === 'yes' ) {
						if ( sliderColumnsDesktop == 1 ) {
							$(this).find('.wpr-cv-inner').prepend('<div class="wpr-slider-video"><iframe src="'+ videoSrc +'" width="100%" height="100%"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');  
						} else {
							$(this).find('.wpr-cv-container').prepend('<div class="wpr-slider-video"><iframe src="'+ videoSrc +'" width="100%" height="100%"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');  
						}
						sliderVideoSize();
					}
				});
			}

			autoplayVideo();

			function slideAnimationOff() {
				if ( sliderColumnsDesktop == 1 ) {
					$advancedSlider.find('.wpr-slider-item').not('.slick-active').find('.wpr-slider-animation').removeClass( 'wpr-animation-enter' );
				}
			}

			function slideAnimationOn() {
				$advancedSlider.find('.slick-active').find('.wpr-slider-content').fadeIn(0);
				if ( sliderColumnsDesktop == 1 ) {
					$advancedSlider.find('.slick-active').find('.wpr-slider-animation').addClass( 'wpr-animation-enter' );
				}
			}
			
			slideAnimationOn();

			$advancedSlider.find('.wpr-slider-video-btn').on( 'click', function() {

				var currentSlide = $(this).closest('.slick-active'),
					videoSrc = currentSlide.attr('data-video-src');

				if ( currentSlide.find( '.wpr-slider-video' ).length !== 1 ) {
					currentSlide.find('.wpr-cv-container').prepend('<div class="wpr-slider-video"><iframe src="'+ videoSrc +'" width="100%" height="100%"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');  
					sliderVideoSize();
					currentSlide.find('.wpr-slider-content').fadeOut(300); 
				}
			   
			});
			
			$advancedSlider.on( {
				beforeChange: function() {
					$advancedSlider.find('.wpr-slider-item').not('.slick-active').find('.wpr-slider-video').remove();
					$advancedSlider.find('.wpr-animation-enter').find('.wpr-slider-content').fadeOut(300);
					slideAnimationOff();
				},
				afterChange: function( event, slick, currentSlide ) {
					slideAnimationOn();
					autoplayVideo();
				}
			});

			// Adjust Horizontal Pagination
			if ( $scope.find( '.slick-dots' ).length && $scope.hasClass( 'wpr-slider-dots-horizontal') ) {
				// Calculate Width
				var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

				// on Load
				if ( $scope.find( '.slick-dots' ).length ) {
					$scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
				}

				// on Resize
				$(window).on( 'resize', function() {
					setTimeout(function() {
						// Calculate Width
						var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

						// Set Width
						$scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
					}, 300 );
				});
			}

		}, // End widgetAdvancedSlider

		widgetTestimonialCarousel: function( $scope ) {
			var testimonialCarousel = $scope.find( '.wpr-testimonial-carousel' );
			// Slider Columns
			var sliderClass = $scope.attr('class'),
				sliderColumnsDesktop = sliderClass.match(/wpr-testimonial-slider-columns-\d/) ? sliderClass.match(/wpr-testimonial-slider-columns-\d/).join().slice(-1) : 2,
				sliderColumnsWideScreen = sliderClass.match(/columns--widescreen\d/) ? sliderClass.match(/columns--widescreen\d/).join().slice(-1) : sliderColumnsDesktop,
				sliderColumnsLaptop = sliderClass.match(/columns--laptop\d/) ? sliderClass.match(/columns--laptop\d/).join().slice(-1) : sliderColumnsDesktop,
				sliderColumnsTabletExtra = sliderClass.match(/columns--tablet_extra\d/) ? sliderClass.match(/columns--tablet_extra\d/).join().slice(-1) : sliderColumnsTablet,
				sliderColumnsTablet = sliderClass.match(/columns--tablet\d/) ? sliderClass.match(/columns--tablet\d/).join().slice(-1) : 2,
				sliderColumnsMobileExtra = sliderClass.match(/columns--mobile_extra\d/) ? sliderClass.match(/columns--mobile_extra\d/).join().slice(-1) : sliderColumnsTablet,
				sliderColumnsMobile = sliderClass.match(/columns--mobile\d/) ? sliderClass.match(/columns--mobile\d/).join().slice(-1) : 1,
				sliderSlidesToScroll = +(sliderClass.match(/wpr-adv-slides-to-scroll-\d/).join().slice(-1)),
				dataSlideEffect = testimonialCarousel.attr('data-slide-effect');

			testimonialCarousel.slick({
				appendArrows: $scope.find('.wpr-testimonial-controls'),
				appendDots: $scope.find('.wpr-testimonial-dots'),
				customPaging: function (slider, i) {
					var slideNumber = (i + 1),
						totalSlides = slider.slideCount;

					return '<span class="wpr-testimonial-dot"></span>';
				},
				slidesToShow: sliderColumnsDesktop,
				responsive: [
					{
						breakpoint: 10000,
						settings: {
							slidesToShow: sliderColumnsWideScreen,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsWideScreen ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsWideScreen && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 2399,
						settings: {
							slidesToShow: sliderColumnsDesktop,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsDesktop ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsDesktop && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1221,
						settings: {
							slidesToShow: sliderColumnsLaptop,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsLaptop ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsLaptop && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: sliderColumnsTabletExtra,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsTabletExtra ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsTabletExtra && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: sliderColumnsTablet,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsTablet ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsTablet && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 880,
						settings: {
							slidesToShow: sliderColumnsMobileExtra,
						 	slidesToScroll: sliderSlidesToScroll > sliderColumnsMobileExtra ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsMobileExtra && 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: sliderColumnsMobile,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsMobile ? 1 : sliderSlidesToScroll,
							fade: (1 == sliderColumnsMobile && 'fade' === dataSlideEffect) ? true : false
						}
					}
				],
			});

			// Show Arrows On Hover
			if ( $scope.hasClass( 'wpr-testimonial-nav-fade' ) ) {
				$scope.on( 'mouseover', function() {
					$scope.closest( 'section' ).find( '.wpr-testimonial-arrow' ).css({
						'opacity' : 1,
					});
				} );
				$scope.closest( 'section' ).on( 'mouseout', function() {
					$scope.find( '.wpr-testimonial-arrow' ).css({
						'opacity' : 0,
					});
				} );
			}

			// on Load
			if ( $scope.find( '.slick-dots' ).length ) {
				// Calculate Width
				var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

				// Set Width
				$scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
			}

			// on Resize
			$(window).on( 'resize', function() {
				setTimeout(function() {
					if ( $scope.find( '.slick-dots' ).length ) {
						// Calculate Width
						var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

						// Set Width
						$scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
					}
				}, 300 );
			});

		}, // End widgetTestimonialCarousel

		widgetSearch: function( $scope ) {

			$scope.find('.wpr-search-form-input').on( {
				focus: function() {
					$scope.addClass( 'wpr-search-form-input-focus' );
				},
				blur: function() {
					$scope.removeClass( 'wpr-search-form-input-focus' );
				}
			} );

			var prevData;
			var searchTimeout = null;

			function ajaxSearchCall(thisObject, postsOffset, e) {
				if ( e.which === 13 ) {
					return false;
				}

				if (searchTimeout != null) {
					clearTimeout(searchTimeout);
				}
				searchTimeout = setTimeout(() => {
					var thisValue = thisObject.val();
					$.ajax({
						type: 'POST',
						url: WprConfig.ajaxurl,
						data: { 
							action: 'wpr_data_fetch',
							nonce: WprConfig.nonce,
							wpr_keyword: $scope.find('.wpr-search-form-input').val(),
							wpr_query_type: $scope.find('.wpr-search-form-input').attr('wpr-query-type'),
							wpr_number_of_results: $scope.find('.wpr-search-form-input').attr('number-of-results'),
							wpr_search_results_offset: postsOffset,
							wpr_number_of_words: $scope.find('.wpr-search-form-input').attr('number-of-words'),
							wpr_show_ajax_thumbnail: $scope.find('.wpr-search-form-input').attr('show-ajax-thumbnails'),
							wpr_show_view_result_btn: $scope.find('.wpr-search-form-input').attr('show-view-result-btn'),
							wpr_view_result_text: $scope.find('.wpr-search-form-input').attr('view-result-text'),
							wpr_exclude_without_thumb: $scope.find('.wpr-search-form-input').attr('exclude-without-thumb'),
							wpr_ajax_search_link_target: $scope.find('.wpr-search-form-input').attr('link-target'),
							// wpr_ajax_search_img_size: $scope.find('.wpr-search-form-input').attr('ajax-search-img-size')
						},
						success: function(data) {
							if ( $scope.find('.wpr-data-fetch ul').html() === '' ) {
								$scope.find( '.wpr-pagination-loading' ).hide();
								$scope.find('.wpr-data-fetch ul').html( data );
								$scope.find('.wpr-no-more-results').fadeOut(100);
								setTimeout(function() {
									if (!data.includes('wpr-no-results')) {
										$scope.find('.wpr-ajax-search-pagination').css('display', 'flex');
										if ( $scope.find('.wpr-data-fetch ul').find('li').length < $scope.find('.wpr-search-form-input').attr('number-of-results') ||
											$scope.find('.wpr-data-fetch ul').find('li').length == $scope.find('.wpr-data-fetch ul').find('li').data('number-of-results')) {
											$scope.find('.wpr-ajax-search-pagination').css('display', 'none');
											$scope.find('.wpr-load-more-results').fadeOut(100);
										} else {
											$scope.find('.wpr-ajax-search-pagination').css('display', 'flex');
											$scope.find('.wpr-load-more-results').fadeIn(100);
										}
									} else {
										$scope.find('.wpr-ajax-search-pagination').css('display', 'none');
									}
								}, 100);
								prevData = data;
							} else {
								if ( data != prevData ) {
									prevData = data;
									if (data.includes('wpr-no-results')) {
										$scope.find('.wpr-ajax-search-pagination').css('display', 'none');
										$scope.find('.wpr-data-fetch ul').html('');
									} else {
										$scope.find('.wpr-ajax-search-pagination').css('display', 'flex');
									}

									$scope.find('.wpr-data-fetch ul').append( data );

									if (data == '') {
										$scope.find('.wpr-load-more-results').fadeOut(100);
										setTimeout(function() {
											$scope.find( '.wpr-pagination-loading' ).hide();
											$scope.find('.wpr-no-more-results').fadeIn(100);
										}, 100);
									} else {
										$scope.find( '.wpr-pagination-loading' ).hide();
										$scope.find('.wpr-load-more-results').show();
									}

									if ($scope.find('.wpr-data-fetch ul').find('li').length < $scope.find('.wpr-search-form-input').attr('number-of-results')) {
										$scope.find('.wpr-load-more-results').fadeOut(100);
										setTimeout(function() {
											$scope.find( '.wpr-pagination-loading' ).hide();
											$scope.find('.wpr-no-more-results').fadeIn(100);
										}, 100);
									} else {
										$scope.find('.wpr-load-more-results').show();
									}

									if ( $scope.find('.wpr-data-fetch ul').find('li').length == $scope.find('.wpr-data-fetch ul').find('li').data('number-of-results') ) {
										$scope.find('.wpr-load-more-results').fadeOut(100);
										setTimeout(function() {
											$scope.find( '.wpr-pagination-loading' ).hide();
											$scope.find('.wpr-no-more-results').fadeIn(100);
										}, 100);
									} else {
										$scope.find('.wpr-load-more-results').show();
									}
									// $scope.find( '.wpr-pagination-loading' ).hide();
								}
							}

							if (data.includes('wpr-no-results')) {
								$scope.find('.wpr-ajax-search-pagination').css('display', 'none');
								$scope.find('.wpr-load-more-results').fadeOut();
							} else {
								$scope.find('.wpr-ajax-search-pagination').css('display', 'flex');
							}
							
							if (thisValue.length > 2) {
								$scope.find('.wpr-data-fetch').slideDown(200);
								$scope.find('.wpr-data-fetch ul').fadeTo(200, 1);
							} else {
								$scope.find('.wpr-data-fetch').slideUp(200);
								$scope.find('.wpr-data-fetch ul').fadeTo(200, 0);
								setTimeout(function() {
									$scope.find('.wpr-data-fetch ul').html('');
									$scope.find('.wpr-no-results').remove();
								}, 600);
								postsOffset = 0;
							}
						},
						error: function(error) {
							console.log(error);
						}
					});
				}, 400);
			}

			if ($scope.find('.wpr-search-form-input').attr('ajax-search') === 'yes') {

				$scope.find('.wpr-search-form').attr('autocomplete', 'off');
				
				var postsOffset = 0;
				// $scope.find('.wpr-data-fetch ul').on('scroll', function(e) { 
				// 	if ( $(this).scrollTop() + $(this).innerHeight() >=  $(this)[0].scrollHeight ) {
				// 		postsOffset += +$scope.find('.wpr-search-form-input').attr('number-of-results');
				// 		ajaxSearchCall($scope.find('.wpr-search-form-input'), postsOffset, e);
				// 	}
				// });

				$scope.find('.wpr-load-more-results').on('click', function(e) {
					postsOffset += +$scope.find('.wpr-search-form-input').attr('number-of-results');
					$scope.find('.wpr-load-more-results').hide();
					$scope.find( '.wpr-pagination-loading' ).css( 'display', 'inline-block' );
					ajaxSearchCall($scope.find('.wpr-search-form-input'), postsOffset, e);
				});

				$scope.find('.wpr-search-form-input').on('keyup', function(e) {
					postsOffset = 0;
					$scope.find('.wpr-data-fetch').hide();
					$scope.find('.wpr-data-fetch ul').html('');
					ajaxSearchCall($(this), postsOffset, e);
				});
	
				$scope.find('.wpr-data-fetch').on('click', '.wpr-close-search', function() {
					$scope.find('.wpr-search-form-input').val('');
					$scope.find('.wpr-data-fetch').slideUp(200);
					setTimeout(function() {
						$scope.find('.wpr-data-fetch ul').html('');
						$scope.find('.wpr-no-results').remove();
					}, 400);
					postsOffset = 0;
				});

				$('body').on('click', function(e) {
					if ( !e.target.classList.value.includes('wpr-data-fetch') && !e.target.closest('.wpr-data-fetch') ) {
						if ( !e.target.classList.value.includes('wpr-search-form') && !e.target.closest('.wpr-search-form') ) {
							$scope.find('.wpr-search-form-input').val('');
							$scope.find('.wpr-data-fetch').slideUp(200);
							setTimeout(function() {
								$scope.find('.wpr-data-fetch ul').html('');
								$scope.find('.wpr-no-results').remove();
							}, 400);
							postsOffset = 0;
						}
					}
				});

				

				var mutationObserver = new MutationObserver(function(mutations) {
					$scope.find('.wpr-data-fetch li').on('click', function() {
						var itemUrl = $(this).find('a').attr('href');
						var itemUrlTarget = $(this).find('a').attr('target');
						window.open(itemUrl, itemUrlTarget).focus();
					});
				});

				// Listen to Mini Cart Changes
				mutationObserver.observe($scope[0], {
					childList: true,
					subtree: true,
				});
			}

		}, // End widgetSearch

		widgetAdvancedText: function( $scope ) {

			if ( $scope.hasClass('wpr-advanced-text-style-animated') ) {
				var animText = $scope.find( '.wpr-anim-text' ),
					animLetters = $scope.find( '.wpr-anim-text-letters' ),
					animDuration = animText.attr( 'data-anim-duration' ),
					animDurationData = animDuration.split( ',' ),
					animLoop = animText.attr( 'data-anim-loop' ),
					animTextLength = animText.find('b').length,
					animTextCount = 0;

				animText.find('b').first().addClass('wpr-anim-text-visible');
					
				// set animation timing
				var animDuration = parseInt( animDurationData[0], 10),
					animDelay = parseInt( animDurationData[1], 10),
					//type effect
					selectionDuration = 500,
					typeAnimationDelay = selectionDuration + 800;

				initHeadline();
			}

			function loadLongShadow() {

				var $clippedText = $scope.find( '.wpr-clipped-text' ),
					clippedOption = $clippedText.data('clipped-options'),
					currentDeviceMode = elementorFrontend.getCurrentDeviceMode();

				if ( clippedOption ) {
					var longShadowSize = clippedOption.longShadowSize,
						longShadowSizeTablet = clippedOption.longShadowSizeTablet,
						longShadowSizeMobile = clippedOption.longShadowSizeMobile;

					if ('desktop' === currentDeviceMode ) {
					   longShadowSize = clippedOption.longShadowSize;
					}

					if ('tablet' === currentDeviceMode && longShadowSizeTablet ) {
					   longShadowSize = longShadowSizeTablet;
					}

					if ('mobile' === currentDeviceMode && longShadowSizeMobile ) {
					   longShadowSize = longShadowSizeMobile;
					}

					$clippedText.find('.wpr-clipped-text-long-shadow').attr('style','text-shadow:'+longShadow( clippedOption.longShadowColor, longShadowSize, clippedOption.longShadowDirection ));
				}
			}

			loadLongShadow();

			$(window).on( 'resize', function(){
				loadLongShadow();
			});

			function initHeadline() {
				//insert <i> element for each letter of a changing word
				singleLetters(animLetters.find('b'));
				//initialise headline animation
				animateHeadline(animText);
			}

			function singleLetters($words) {
				$words.each(function() {
					var word = $(this),
						letters = word.text().split(''),
						selected = word.hasClass('wpr-anim-text-visible');
					for (var i in letters) {
						var letter = letters[i].replace(/ /g, '&nbsp;');
					
						letters[i] = (selected) ? '<i class="wpr-anim-text-in">' + letter + '</i>': '<i>' + letter + '</i>';
					}
					var newLetters = letters.join('');
					word.html(newLetters).css('opacity', 1);
				});
			}

			function animateHeadline($headlines) {
				var duration = animDelay;
				$headlines.each(function(){
					var headline = $(this),
						spanWrapper = headline.find('.wpr-anim-text-inner');
					
					if (headline.hasClass('wpr-anim-text-type-clip')){
						var newWidth = spanWrapper.outerWidth();
							spanWrapper.css('width', newWidth);
					}

					//trigger animation
					setTimeout(function(){
						hideWord( headline.find('.wpr-anim-text-visible').eq(0) );
					}, duration);

					// Fix Bigger Words Flip
					if ( headline.hasClass( 'wpr-anim-text-type-rotate-1' ) ) {
						spanWrapper.find( 'b' ).each(function() {
							if ( $(this).outerWidth() > spanWrapper.outerWidth() ) {
								spanWrapper.css( 'width', $(this).outerWidth() );
							}
						});
					}
				});
			}

			function hideWord($word) {
				var nextWord = takeNext($word);
				
				if ( animLoop !== 'yes' ) {

					animTextCount++;
					if ( animTextCount === animTextLength ) {
						return;
					}

				}
			   
				if ( $word.parents('.wpr-anim-text').hasClass('wpr-anim-text-type-typing') ) {
					var parentSpan = $word.parent('.wpr-anim-text-inner');
					parentSpan.addClass('wpr-anim-text-selected').removeClass('waiting'); 
					setTimeout(function(){ 
						parentSpan.removeClass('wpr-anim-text-selected'); 
						$word.removeClass('wpr-anim-text-visible').addClass('wpr-anim-text-hidden').children('i').removeClass('wpr-anim-text-in').addClass('wpr-anim-text-out');
					}, selectionDuration);
					setTimeout(function(){ showWord(nextWord, animDuration) }, typeAnimationDelay);
				
				} else if ( $word.parents('.wpr-anim-text').hasClass('wpr-anim-text-letters') ) {

					var bool = ( $word.children( 'i' ).length >= nextWord.children( 'i' ).length ) ? true : false;
						hideLetter($word.find('i').eq(0), $word, bool, animDuration);
						showLetter(nextWord.find('i').eq(0), nextWord, bool, animDuration);

				}  else if ( $word.parents('.wpr-anim-text').hasClass('wpr-anim-text-type-clip') ) {
					$word.parents('.wpr-anim-text-inner').animate({ width : '2px' }, animDuration, function(){
						switchWord($word, nextWord);
						showWord(nextWord);
					});

				} else {
					switchWord($word, nextWord);
					setTimeout(function(){ hideWord(nextWord) }, animDelay);
				}

			}

			function showWord($word, $duration) {
				if ( $word.parents( '.wpr-anim-text' ).hasClass( 'wpr-anim-text-type-typing' ) ) {
					showLetter( $word.find( 'i' ).eq(0), $word, false, $duration );
					$word.addClass( 'wpr-anim-text-visible' ).removeClass( 'wpr-anim-text-hidden' );

				} else if ( $word.parents( '.wpr-anim-text' ).hasClass( 'wpr-anim-text-type-clip' ) ) {
					$word.parents( '.wpr-anim-text-inner' ).animate({ 'width' : $word.outerWidth() }, animDuration, function() { 
						setTimeout( function() {
							hideWord($word);
						}, animDelay ); 
					});
				}
			}

			function hideLetter($letter, $word, $bool, $duration) {
				$letter.removeClass('wpr-anim-text-in').addClass('wpr-anim-text-out');
				
				if ( !$letter.is(':last-child') ) {
					setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
				} else if ( $bool ) { 
					setTimeout(function(){ hideWord(takeNext($word)) }, animDelay);
				}

				if ( $letter.is(':last-child') ) {
					var nextWord = takeNext($word);
					switchWord($word, nextWord);
				} 
			}

			function showLetter($letter, $word, $bool, $duration) {
				$letter.addClass('wpr-anim-text-in').removeClass('wpr-anim-text-out');
				
				if(!$letter.is(':last-child')) { 
					setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
				} else { 
					if($word.parents('.wpr-anim-text').hasClass('wpr-anim-text-type-typing')) { setTimeout(function(){ $word.parents('.wpr-anim-text-inner').addClass('waiting'); }, 200);}
					if(!$bool) { setTimeout(function(){ hideWord($word) }, animDelay) }
				}
			}

			function takeNext($word) {
				return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
			}

			function takePrev($word) {
				return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
			}

			function switchWord($oldWord, $newWord) {
				$oldWord.removeClass('wpr-anim-text-visible').addClass('wpr-anim-text-hidden');
				$newWord.removeClass('wpr-anim-text-hidden').addClass('wpr-anim-text-visible');
			}

			function longShadow( shadowColor, shadowSize, shadowDirection ) {
			 
				var textshadow = '';

				for ( var i = 0, len = shadowSize; i < len; i++ ) {
					switch ( shadowDirection ) {
						case 'top':
							textshadow += '0 -'+ i +'px 0 '+ shadowColor +',';
						break;

						case 'right':
							textshadow += i +'px 0 0 '+ shadowColor +',';
						break;

						case 'bottom':
							textshadow += '0 '+ i +'px 0 '+ shadowColor +',';
						break;

						case 'left':
							textshadow += '-'+ i +'px 0 0 '+ shadowColor +',';
						break;

						case 'top-left':
							textshadow += '-'+ i +'px -'+ i +'px 0 '+ shadowColor +',';
						break;

						case 'top-right':
							textshadow += i +'px -'+ i +'px 0 '+ shadowColor +',';
						break;

						case 'bottom-left':
							textshadow += '-'+ i +'px '+ i +'px 0 '+ shadowColor +',';
						break;

						case 'bottom-right':
							textshadow += i +'px '+ i +'px 0 '+ shadowColor +',';
						break;

						default:
							textshadow += i +'px '+ i +'px 0 '+ shadowColor +',';
						break;
					}
				}

				textshadow = textshadow.slice(0, -1);

				return textshadow;
			}

		}, // End widgetAdvancedText

		widgetProgressBar: function( $scope ) {

			var $progressBar = $scope.find( '.wpr-progress-bar' ),
				prBarCircle = $scope.find( '.wpr-prbar-circle' ),
				$prBarCircleSvg = prBarCircle.find('.wpr-prbar-circle-svg'),
				$prBarCircleLine =  $prBarCircleSvg.find('.wpr-prbar-circle-line'),
				$prBarCirclePrline = $scope.find( '.wpr-prbar-circle-prline' ),
				prBarHrLine = $progressBar.find('.wpr-prbar-hr-line-inner'),
				prBarVrLine = $progressBar.find('.wpr-prbar-vr-line-inner'),
				prBarOptions = $progressBar.data('options'),
				prBarCircleOptions = prBarCircle.data('circle-options'),
				prBarCounter = $progressBar.find('.wpr-prbar-counter-value'),
				prBarCounterValue = prBarOptions.counterValue,
				prBarCounterValuePersent = prBarOptions.counterValuePersent,
				prBarAnimDuration = prBarOptions.animDuration,
				prBarAnimDelay = prBarOptions.animDelay,
				prBarLoopDelay = +prBarOptions.loopDelay,
				currentDeviceMode = elementorFrontend.getCurrentDeviceMode(),
				numeratorData = {
					toValue: prBarCounterValue,
					duration: prBarAnimDuration,
				};

			if ( 'yes' === prBarOptions.counterSeparator ) {
				numeratorData.delimiter = ',';
			}


			function isInViewport( $selector ) {
				if ( $selector.length ) {
					var elementTop = $selector.offset().top,
					elementBottom = elementTop + $selector.outerHeight(),
					viewportTop = $(window).scrollTop(),
					viewportBottom = viewportTop + $(window).height();

					if ( elementTop > $(window).height() ) {
						elementTop += 50;
					}

					return elementBottom > viewportTop && elementTop < viewportBottom;
				}
			};

			function progressBar() {

				if ( isInViewport( prBarVrLine ) ) {
					prBarVrLine.css({
						'height': prBarCounterValuePersent + '%'
					});
				}

				if ( isInViewport( prBarHrLine ) ) {
					prBarHrLine.css({
						'width': prBarCounterValuePersent + '%'
					});
				}

				if ( isInViewport( prBarCircle ) ) {
					var circleDashOffset = prBarCircleOptions.circleOffset;
					
					$prBarCirclePrline.css({
						'stroke-dashoffset': circleDashOffset
					});
				}

				// Set Delay
				if ( isInViewport( prBarVrLine ) || isInViewport( prBarHrLine ) || isInViewport( prBarCircle ) ) {
					setTimeout(function() {
						prBarCounter.numerator( numeratorData );
					}, prBarAnimDelay );
				}
			
			}

			progressBar();

			if (prBarOptions.loop === 'yes') {
				setInterval(function() {

					if ( isInViewport( prBarVrLine ) ) {
						prBarVrLine.css({
							'height': 0 + '%'
						});
					}
	
					if ( isInViewport( prBarHrLine ) ) {
						prBarHrLine.css({
							'width': 0 + '%'
						});
					}
	
					if ( isInViewport( prBarCircle ) ) {
						var circleDashOffset = prBarCircleOptions.circleOffset;
						
						$prBarCirclePrline.css({
							'stroke-dashoffset': $prBarCirclePrline.css('stroke-dasharray')
						});
					}

					// Set Delay
					if ( isInViewport( prBarVrLine ) || isInViewport( prBarHrLine ) || isInViewport( prBarCircle ) ) {
						setTimeout(function() {
							prBarCounter.numerator( {
								toValue: 0,
								duration: prBarAnimDuration,
							} );
						}, prBarAnimDelay);
					}

					setTimeout(function() {
						progressBar();
					}, prBarAnimDuration + prBarAnimDelay);
				}, (prBarAnimDuration + prBarAnimDelay) * prBarLoopDelay);
			}

			 $(window).on('scroll', function() {
				progressBar();
			});
				  
		}, // End widgetProgressBar

		widgetImageHotspots: function( $scope ) {

			var $imgHotspots = $scope.find( '.wpr-image-hotspots' ),
				hotspotsOptions = $imgHotspots.data('options'),
				$hotspotItem = $imgHotspots.find('.wpr-hotspot-item'),
				tooltipTrigger = hotspotsOptions.tooltipTrigger;

			if ( 'click' === tooltipTrigger ) {
				$hotspotItem.on( 'click', function() {
					if ( $(this).hasClass('wpr-tooltip-active') ) {
						$(this).removeClass('wpr-tooltip-active');
					} else {
						$hotspotItem.removeClass('wpr-tooltip-active');
						$(this).addClass('wpr-tooltip-active');
					}
					 event.stopPropagation();
				});

				$(window).on( 'click', function () {
					$hotspotItem.removeClass('wpr-tooltip-active');
				});
		   
			} else if ( 'hover' === tooltipTrigger ) {
				$hotspotItem.hover(function () {
					$(this).toggleClass('wpr-tooltip-active');
				});

			} else {
				$hotspotItem.addClass('wpr-tooltip-active');
			}

		}, // End widgetImageHotspots

		widgetFlipBox: function( $scope ) {
			
			var $flipBox = $scope.find('.wpr-flip-box'),
				flipBoxTrigger = $flipBox.data('trigger');

			 if ( 'box' === flipBoxTrigger ) {

				$flipBox.find('.wpr-flip-box-front').on( 'click', function() {
					$(this).closest('.wpr-flip-box').addClass('wpr-flip-box-active'); 
				});

				$(window).on( 'click', function () {
					if( $(event.target).closest('.wpr-flip-box').length === 0 ) {
						$flipBox.removeClass('wpr-flip-box-active');
					}
				});
		   
			} else if ( 'btn' == flipBoxTrigger ) {
		  
				$flipBox.find('.wpr-flip-box-btn').on( 'click', function() {
					$(this).closest('.wpr-flip-box').addClass('wpr-flip-box-active');		   
				});

				$(window).on( 'click', function () {
					if( $(event.target).closest('.wpr-flip-box').length === 0 ) {
						$flipBox.removeClass('wpr-flip-box-active');
					}
				});

			  
			} else if ( 'hover' == flipBoxTrigger ) {
		  
				$flipBox.hover(function () {
					$(this).toggleClass('wpr-flip-box-active');
				});

			}

		}, // End widgetFlipBox

		widgetContentTicker: function( $scope ) {
			var $contentTickerSlider = $scope.find( '.wpr-ticker-slider' ),
				$contentTickerMarquee = $scope.find( '.wpr-ticker-marquee' ),
				marqueeData = $contentTickerMarquee.data('options');
			// Slider Columns
			var sliderClass = $scope.attr('class'),
				sliderColumnsDesktop = sliderClass.match(/wpr-ticker-slider-columns-\d/) ? sliderClass.match(/wpr-ticker-slider-columns-\d/).join().slice(-1) : 2,
				sliderColumnsWideScreen = sliderClass.match(/columns--widescreen\d/) ? sliderClass.match(/columns--widescreen\d/).join().slice(-1) : sliderColumnsDesktop,
				sliderColumnsLaptop = sliderClass.match(/columns--laptop\d/) ? sliderClass.match(/columns--laptop\d/).join().slice(-1) : sliderColumnsDesktop,
				sliderColumnsTabletExtra = sliderClass.match(/columns--tablet_extra\d/) ? sliderClass.match(/columns--tablet_extra\d/).join().slice(-1) : sliderColumnsTablet,
				sliderColumnsTablet = sliderClass.match(/columns--tablet\d/) ? sliderClass.match(/columns--tablet\d/).join().slice(-1) : 2,
				sliderColumnsMobileExtra = sliderClass.match(/columns--mobile_extra\d/) ? sliderClass.match(/columns--mobile_extra\d/).join().slice(-1) : sliderColumnsTablet,
				sliderColumnsMobile = sliderClass.match(/columns--mobile\d/) ? sliderClass.match(/columns--mobile\d/).join().slice(-1) : 1,
				dataSlideEffect = $contentTickerSlider.attr('data-slide-effect'),
				sliderSlidesToScroll = 'hr-slide' === dataSlideEffect && sliderClass.match(/wpr-ticker-slides-to-scroll-\d/) ? +(sliderClass.match(/wpr-ticker-slides-to-scroll-\d/).join().slice(-1)) : 1;

			$contentTickerSlider.slick({
				appendArrows : $scope.find('.wpr-ticker-slider-controls'),
				slidesToShow: sliderColumnsDesktop,
				responsive: [
					{
						breakpoint: 10000,
						settings: {
							slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsWideScreen,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsWideScreen ? 1 : sliderSlidesToScroll,
							fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 2399,
						settings: {
							slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsDesktop,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsDesktop ? 1 : sliderSlidesToScroll,
							fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1221,
						settings: {
							slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsLaptop,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsLaptop ? 1 : sliderSlidesToScroll,
							fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsTabletExtra,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsTabletExtra ? 1 : sliderSlidesToScroll,
							fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsTablet,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsTablet ? 1 : sliderSlidesToScroll,
							fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 880,
						settings: {
							slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsMobileExtra,
						 	slidesToScroll: sliderSlidesToScroll > sliderColumnsMobileExtra ? 1 : sliderSlidesToScroll,
							fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsMobile,
							slidesToScroll: sliderSlidesToScroll > sliderColumnsMobile ? 1 : sliderSlidesToScroll,
							fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
						}
					}
				],
			});

			$contentTickerMarquee.marquee(marqueeData);

		}, // End widgetContentTicker

		widgetTabs: function( $scope ) {

			var $tabs = $( '.wpr-tabs', $scope ).first(),
				$tabList = $( '.wpr-tabs-wrap', $tabs ).first(),
				$contentWrap = $( '.wpr-tabs-content-wrap', $tabs ).first(),
				$tabList = $( '> .wpr-tab', $tabList ),
				$contentList = $( '> .wpr-tab-content', $contentWrap ),
				tabsData = $tabs.data('options');

			// Active Tab
			var activeTabIndex = tabsData.activeTab - 1;
				$tabList.eq( activeTabIndex ).addClass( 'wpr-tab-active' );
				$contentList.eq( activeTabIndex ).addClass( 'wpr-tab-content-active wpr-animation-enter' );

			if ( tabsData.autoplay === 'yes' ) {
				
				var startIndex = tabsData.activeTab - 1;

				var autoplayInterval = setInterval( function() {

					if ( startIndex < $tabList.length - 1 ) {
						startIndex++;
					} else {
						startIndex = 0;
					}

					wprTabsSwitcher( startIndex );

				}, tabsData.autoplaySpeed );
			}

			if ( 'hover' === tabsData.trigger ) {
				wprTabsHover();
			} else {
				wprTabsClick();
			}

			// Tab Switcher
			function wprTabsSwitcher( index ) {

				var activeTab = $tabList.eq( index ),
					activeContent = $contentList.eq( index ),
					activeContentHeight = 'auto';

				$contentWrap.css( { 'height': $contentWrap.outerHeight( true ) } );

				$tabList.removeClass( 'wpr-tab-active' );
				activeTab.addClass( 'wpr-tab-active' );

				$contentList.removeClass( 'wpr-tab-content-active wpr-animation-enter' );

				activeContentHeight = activeContent.outerHeight( true );
				activeContentHeight += parseInt( $contentWrap.css( 'border-top-width' ) ) + parseInt( $contentWrap.css( 'border-bottom-width' ) );


				activeContent.addClass( 'wpr-tab-content-active wpr-animation-enter' );

				$contentWrap.css({ 'height': activeContentHeight });

				setTimeout( function() {  
					$contentWrap.css( { 'height': 'auto' } );
				}, 500 );

			}

			// Tab Click Event
			function wprTabsClick() {

				$tabList.on( 'click', function() {

					var tabIndex = $( this ).data( 'tab' ) - 1;
					
					clearInterval( autoplayInterval );
					wprTabsSwitcher( tabIndex );

				});

			}

			// Tab Hover Event
			function wprTabsHover() {
			   $tabList.hover( function () {

					var tabIndex = $( this ).data( 'tab' ) - 1;

					clearInterval( autoplayInterval );
					wprTabsSwitcher( tabIndex );
				  
				});
			}

		}, // End widgetTabs

		widgetContentToogle: function( $scope ) {

			var $contentToggle = $( '.wpr-content-toggle', $scope ).first(),
				$switcherContainer = $( '.wpr-switcher-container', $contentToggle ).first(),
				$switcherWrap = $( '.wpr-switcher-wrap', $contentToggle ).first(),
				$contentWrap = $( '.wpr-switcher-content-wrap', $contentToggle ).first(),
				$switcherBg = $( '> .wpr-switcher-bg', $switcherWrap ),
				$switcherList = $( '> .wpr-switcher', $switcherWrap ),
				$contentList = $( '> .wpr-switcher-content', $contentWrap );

			// Active Tab
			var activeSwitcherIndex = parseInt( $switcherContainer.data('active-switcher') ) - 1;
			
			$switcherList.eq( activeSwitcherIndex ).addClass( 'wpr-switcher-active' );
			$contentList.eq( activeSwitcherIndex ).addClass( 'wpr-switcher-content-active wpr-animation-enter' );
	  
			function wprSwitcherBg( index ) {
				
				if ( ! $scope.hasClass( 'wpr-switcher-label-style-outer' ) ) {
				
					var switcherWidth = 100 / $switcherList.length,
						switcherBgDistance = index * switcherWidth;

					$switcherBg.css({
						'width' : switcherWidth + '%',
						'left': switcherBgDistance + '%'
					});
				}
			  
			}

			wprSwitcherBg( activeSwitcherIndex );

			// Tab Switcher
			function wprTabsSwitcher( index ) {
				var activeSwitcher = $switcherList.eq( index ),
					activeContent = $contentList.eq( index ),
					activeContentHeight = 'auto';

				// Switcher
				wprSwitcherBg( index );

				if ( ! $scope.hasClass( 'wpr-switcher-label-style-outer' ) ) {
					$switcherList.removeClass( 'wpr-switcher-active' );
					activeSwitcher.addClass( 'wpr-switcher-active' );

					if ( $scope.hasClass( 'wpr-switcher-style-dual' ) ) {
						$switcherContainer.attr( 'data-active-switcher', index + 1 );
					}
				}

				// Tabs
				$contentWrap.css( { 'height': $contentWrap.outerHeight( true ) } );

				$contentList.removeClass( 'wpr-switcher-content-active wpr-animation-enter' );

				activeContentHeight = activeContent.outerHeight( true );
				activeContentHeight += parseInt( $contentWrap.css( 'border-top-width' ) ) + parseInt( $contentWrap.css( 'border-bottom-width' ) );

				activeContent.addClass( 'wpr-switcher-content-active wpr-animation-enter' );

				$contentWrap.css({ 'height': activeContentHeight });

				setTimeout( function() {  
					$contentWrap.css( { 'height': 'auto' } );
				}, 500 );

			}

			// Tab Click Event
			function wprTabsClick() {

				// Outer Labels
				if ( $scope.hasClass( 'wpr-switcher-label-style-outer' ) ) {
					$switcherWrap.on( 'click', function() {
						var activeSwitcher = $switcherWrap.find( '.wpr-switcher-active' );

						if ( 1 === parseInt( activeSwitcher.data( 'switcher'), 10 ) ) {
							// Reset
							$switcherWrap.children( '.wpr-switcher' ).eq(0).removeClass( 'wpr-switcher-active' );

							// Set Active
							$switcherWrap.children( '.wpr-switcher' ).eq(1).addClass( 'wpr-switcher-active' );
							$switcherWrap.closest( '.wpr-switcher-container' ).attr( 'data-active-switcher', 2 );
							wprTabsSwitcher( 1 );

						} else if ( 2 === parseInt( activeSwitcher.data( 'switcher'), 10 ) ) {
							// Reset
							$switcherWrap.children( '.wpr-switcher' ).eq(1).removeClass( 'wpr-switcher-active' );

							// Set Active
							$switcherWrap.children( '.wpr-switcher' ).eq(0).addClass( 'wpr-switcher-active' );
							$switcherWrap.closest( '.wpr-switcher-container' ).attr( 'data-active-switcher', 1 );
							wprTabsSwitcher( 0 );
						}
					 
						// wprTabsSwitcher( switcherIndex );

					});

				// Inner Labels / Multi Labels
				} else {
					$switcherList.on( 'click', function() {

						var switcherIndex = $( this ).data( 'switcher' ) - 1;
					 
						wprTabsSwitcher( switcherIndex );

					});
				}
			}

			wprTabsClick();

		}, // End widgetContentToogle

		widgetBackToTop: function($scope) {
			var sttBtn = $scope.find( '.wpr-stt-btn' ),
				settings = sttBtn.attr('data-settings');
			
			// Get Settings	
			settings = JSON.parse(settings);

			if ( settings.fixed === 'fixed' ) {

				if ( 'none' !== settings.animation ) {
					sttBtn.css({
						'opacity' : '0'
					});

					if ( settings.animation ==='slide' ) {
						sttBtn.css({
							'margin-bottom': '-100px',
						});
					}
				}

				// Run on Load
				scrollToTop($(window).scrollTop(), sttBtn, settings);

				// Run on Scroll
				$(window).scroll(function() {
					scrollToTop($(this).scrollTop(), sttBtn, settings);
				});
			} // end fixed check
			 
			// Click to Scroll Top
			sttBtn.on('click', function() {
				$('html, body').animate({ scrollTop : 0}, settings.scrolAnim );
				return false;
			});

			function scrollToTop( scrollTop, button, settings ) {
				// Show
				if ( scrollTop > settings.animationOffset ) {
					
					if ( 'fade' === settings.animation ) {
	 					sttBtn.stop().css('visibility', 'visible').animate({
	 						'opacity' : '1'
	 					}, settings.animationDuration);
					} else if ( 'slide' === settings.animation ){
						sttBtn.stop().css('visibility', 'visible').animate({
							'opacity' : '1',
							'margin-bottom' : 0
						}, settings.animationDuration);
					} else {
						sttBtn.css('visibility', 'visible');
					}

				// Hide
				} else {

					if ( 'fade' === settings.animation ) {
						sttBtn.stop().animate({'opacity': '0'}, settings.animationDuration);
					} else if (settings.animation === 'slide') {
						sttBtn.stop().animate({
							'margin-bottom' : '-100px',
							'opacity' : '0'
						}, settings.animationDuration);
					} else {
						sttBtn.css('visibility', 'hidden');
					}

				}
			}

		}, // End of Back to Top
        
        widgetLottieAnimations: function($scope) {
			var lottieAnimations = $scope.find('.wpr-lottie-animations'),
				lottieAnimationsWrap = $scope.find('.wpr-lottie-animations-wrapper'),
				lottieJSON = JSON.parse(lottieAnimations.attr('data-settings'));

			var animation = lottie.loadAnimation({
			  container: lottieAnimations[0], // Required
			  path: lottieAnimations.attr('data-json-url'), // Required
			  renderer: lottieJSON.lottie_renderer, // Required
			  loop: 'yes' === lottieJSON.loop ? true : false, // Optional
			  autoplay: 'yes' === lottieJSON.autoplay ? true : false
			});

			animation.setSpeed(lottieJSON.speed);

			if( lottieJSON.reverse ) {
				animation.setDirection(-1);
			} 

			animation.addEventListener('DOMLoaded', function () {
				
				if ( 'hover' !== lottieJSON.trigger && 'none' !== lottieJSON.trigger ) {
				
				// if ( 'viewport' === lottieJSON.trigger ) {
					initLottie('load');
					$(window).on('scroll', initLottie);
				}
				
                if ( 'hover' === lottieJSON.trigger ) {
                    animation.pause();
                    lottieAnimations.hover(function () {
                        animation.play();
                    }, function () {
                        animation.pause();
                    });
                }

				function initLottie(event) {
					animation.pause();

					if (typeof lottieAnimations[0].getBoundingClientRect === "function") {
											
						var height = document.documentElement.clientHeight;
						var scrollTop = (lottieAnimations[0].getBoundingClientRect().top)/height * 100;
						var scrollBottom = (lottieAnimations[0].getBoundingClientRect().bottom)/height * 100;
						var scrollEnd = scrollTop < lottieJSON.scroll_end;
						var scrollStart = scrollBottom > lottieJSON.scroll_start;

						if ( 'viewport' === lottieJSON.trigger ) {
							scrollStart && scrollEnd ? animation.play() : animation.pause();
						}
						
						if ( 'scroll' === lottieJSON.trigger ) {
							if( scrollStart && scrollEnd) {
								animation.pause();
								
								// $(window).scroll(function() {
									// calculate the percentage the user has scrolled down the page
									var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
								 
									var scrollPercentRounded = Math.round(scrollPercent);
							
									animation.goToAndStop( (scrollPercentRounded / 100) * 4000); // why 4000
								// });
							}
						};
					}
				}
			});
		}, // End of widgetLottieAnimations

		widgetCharts: function($scope) {
			var chartSettings = JSON.parse($scope.find('.wpr-charts-container').attr('data-settings'));
			var labels = chartSettings.chart_labels;
			var customDatasets = chartSettings.chart_datasets ? JSON.parse(chartSettings.chart_datasets) : '';
			
			var newLegendClickHandler = function (e, legendItem, legend) {
				if ( (chartTypesArray.includes(chartSettings.chart_type) || chartSettings.chart_type === 'radar') ) {
					const index = legendItem.datasetIndex;
					const ci = legend.chart;
					if (ci.isDatasetVisible(index)) {
						ci.hide(index);
						legendItem.hidden = true;
					} else {
						ci.show(index);
						legendItem.hidden = false;
					}
				}
			}
			
			const footer = (tooltipItems) => {
				let sum = 0;
			  
				tooltipItems.forEach(function(tooltipItem) {
				  sum += tooltipItem.parsed.y;
				});
				
				if ( 'bar_horizontal' === chartSettings.chart_type ) {
					sum = 0;
					tooltipItems.forEach(function(tooltipItem) {
						sum += tooltipItem.parsed.x;
					});
				}

				if ( "radar" == chartSettings.chart_type || "pie" == chartSettings.chart_type || "doughnut" == chartSettings.chart_type || "polarArea" == chartSettings.chart_type ) {
					return false;
				}
				return 'Sum: ' + sum;
			};

			var lineDotsWidth = window.innerWidth >= 768 ? chartSettings.line_dots_radius 
									: window.innerWidth <= 767 ? chartSettings.line_dots_radius_mobile : 0;
			var tooltipCaretSize = window.innerWidth >= 768 ? chartSettings.tooltip_caret_size 
									:  window.innerWidth <= 767 ? chartSettings.chart_tooltip_caret_size_mobile : 0;

			var myChart = '';
			var config = '';
			var chartTypesArray = ['bar', 'bar_horizontal', 'line'];
			var globalOptions = {
				responsive: true,
				// layout: { // needs other approach
				// 	padding: chartPadding,
				// },
				showLine: chartSettings.show_lines,
				animation: chartSettings.chart_animation === 'yes' ? true : false,
				animations: {
				  tension: {
					duration: chartSettings.chart_animation_duration,
					easing: chartSettings.animation_transition_type,
					from: 1,
					to: 0,
					loop: chartSettings.chart_animation_loop == 'yes' ? true : false,
				  },
				}, // specify exact inserting way
				events: [chartSettings.trigger_tooltip_on, chartSettings.exclude_dataset_on_click === 'yes' ? 'click' : '',],
				interaction: {
					// Overrides the global setting
					mode: chartSettings.chart_interaction_mode !== undefined ? chartSettings.chart_interaction_mode : 'nearest',
				},
				elements: {
					point: {
						radius: chartSettings.line_dots === 'yes' ? lineDotsWidth : 0 // default to disabled in all datasets
					}
				},
				scales: { // remove if corrupts other chart_types data
					x: {
						reverse: chartSettings.reverse_x == 'yes' ? true : false,
						stacked: chartSettings.stacked_bar_chart == 'yes' ? true : false,
						type: 'bar_horizontal' === chartSettings.chart_type ? chartSettings.data_type : 'category',
						min: chartSettings.min_value !== undefined ? chartSettings.min_value : null,
						max: chartSettings.max_value !== undefined ? chartSettings.max_value : null,
						grid: {
							display: chartSettings.display_x_axis,
							drawBorder: chartSettings.display_x_axis,
							drawOnChartArea: chartSettings.display_x_axis,
							drawTicks: chartSettings.display_x_axis,
							color: chartSettings.axis_grid_line_color_x,
							// borderColor: 'green',
							// borderWidth: 5,
							borderDash: [chartSettings.border_dash_length, chartSettings.border_dash_spacing],
							borderDashOffset: chartSettings.border_dash_offset,
							lineWidth: chartSettings.grid_line_width_x,
						},
						title: {
							display: chartSettings.display_x_axis_title,
							text: chartSettings.x_axis_title,
							color: chartSettings.axis_title_color_x,
							font: {
								size: chartSettings.axis_title_font_size_x,
								family: chartSettings.axis_title_font_family_x,
								style: chartSettings.axis_title_font_style_x,
								weight: chartSettings.axis_title_font_weight_x,
							}
						},
						ticks: {
							stepSize: 'bar_horizontal' === chartSettings.chart_type ? chartSettings.x_step_size : '',
							display: chartSettings.display_x_ticks,
							padding: chartSettings.ticks_padding_x,
							autoSkip: false,
							maxRotation: chartSettings.rotation_x,
							minRotation: chartSettings.rotation_x,
							color: chartSettings.ticks_color_x,
							// backdropColor: 'rgb(128,0,128)',
							font: {
								size: chartSettings.ticks_font_size_x,
								family: chartSettings.ticks_font_family_x,
								style: chartSettings.ticks_font_style_x,
								weight: chartSettings.ticks_font_weight_x,
							}
						},
					},
					y: {
						reverse: chartSettings.reverse_y == 'yes' ? true : false,
						stacked: chartSettings.stacked_bar_chart == 'yes' ? true : false,
						type: 'bar' === chartSettings.chart_type || 'line' === chartSettings.chart_type ? chartSettings.data_type : 'category',
						min: chartSettings.min_value !== undefined ? chartSettings.min_value : null,
						max: chartSettings.max_value !== undefined ? chartSettings.max_value : null,
						grid: {
							display: chartSettings.display_y_axis,
							drawBorder: chartSettings.display_y_axis,
							drawOnChartArea: chartSettings.display_y_axis,
							drawTicks: chartSettings.display_y_axis,
							color: chartSettings.axis_grid_line_color_y,
							// borderColor: 'green',
							// borderWidth: 5,
							borderDash: [chartSettings.border_dash_length, chartSettings.border_dash_spacing],
							borderDashOffset: chartSettings.border_dash_offset,
							lineWidth: chartSettings.grid_line_width_y,
						},
						title: {
							display: chartSettings.display_y_axis_title,
							text: chartSettings.y_axis_title,
							color: chartSettings.axis_title_color_y,
							font: {
								size: chartSettings.axis_title_font_size_y,
								family: chartSettings.axis_title_font_family_y,
								style: chartSettings.axis_title_font_style_y,
								weight: chartSettings.axis_title_font_weight_y,
							}
						},
						ticks: {
							stepSize: chartSettings.y_step_size,
							display: chartSettings.display_y_ticks,
							padding: chartSettings.ticks_padding_y,
							autoSkip: false,
							maxRotation: chartSettings.rotation_y,
							minRotation: chartSettings.rotation_y,
							color: chartSettings.ticks_color_y,
							// backdropColor: 'rgb(128,0,128)',
							font: {
								size: chartSettings.ticks_font_size_y,
								family: chartSettings.ticks_font_family_y,
								style: chartSettings.ticks_font_style_y,
								weight: chartSettings.ticks_font_weight_y,
							}
						},
					},
				},
				plugins: {
					datalabels: {
						color: chartSettings.inner_datalabels_color,
						// backgroundColor: chartSettings.inner_datalabels_bg_color,
						font: {
							// family: chartSettings.inner_datalabels_font_family,
							size: chartSettings.inner_datalabels_font_size,
							style: chartSettings.inner_datalabels_font_style,
							weight: chartSettings.inner_datalabels_font_weight,
						},
					},
					legend: {
						onHover: (event, chartElement) => {
							event.native.target.style.cursor = 'pointer';
						},
						onLeave: (event, chartElement) => {
							event.native.target.style.cursor = 'default';
						},
						onClick: newLegendClickHandler,
						reverse: chartSettings.reverse_legend === 'yes' ? true : false,
						display: chartSettings.show_chart_legend == 'yes' ? true : false,
						position: chartSettings.legend_position !== undefined ? chartSettings.legend_position : 'top',
						align: chartSettings.legend_align !== undefined ? chartSettings.legend_align : 'center',
						labels: {
							usePointStyle: chartSettings.legend_shape == 'point' ? true : false,
							padding: chartSettings.legend_padding,
							boxWidth: chartSettings.legend_box_width,
							boxHeight: chartSettings.legend_font_size,
							color: chartSettings.legend_text_color,
							font: {
								family: chartSettings.legend_font_family,
								size: chartSettings.legend_font_size,
								style: chartSettings.legend_font_style,
								weight: chartSettings.legend_font_weight,
							},
						}
					},
					title: {
						display: 'yes' === chartSettings.show_chart_title ? true : false,
						text: chartSettings.chart_title,
						align: chartSettings.chart_title_align !== undefined ? chartSettings.chart_title_align : 'center',
						position: chartSettings.chart_title_position !== undefined ? chartSettings.chart_title_position : 'top',
						color: chartSettings.chart_title_color !== undefined ? chartSettings.chart_title_color : '#000',
						padding: chartSettings.title_padding,
						font: {
							family: chartSettings.title_font_family,
							size: chartSettings.title_font_size,
							style: chartSettings.title_font_style,
							weight: chartSettings.title_font_weight,
						},
					},
					tooltip: {
						callbacks: {
						  footer: footer,
						},
						enabled: 'yes' === chartSettings.show_chart_tooltip ? true : false,
						position: chartSettings.tooltip_position !== undefined ? chartSettings.tooltip_position : 'nearest',
						padding: chartSettings.tooltip_padding !== undefined ? chartSettings.tooltip_padding : 10,
						caretSize: tooltipCaretSize,
						backgroundColor: chartSettings.chart_tooltip_bg_color !== undefined ? chartSettings.chart_tooltip_bg_color : 'rbga(0, 0, 0, 0.2)',
						titleColor: chartSettings.chart_tooltip_title_color !== undefined ? chartSettings.chart_tooltip_title_color : '#FFF',
						titleFont: {
							family: chartSettings.chart_tooltip_title_font,
							size: chartSettings.chart_tooltip_title_font_size,
						},
						titleAlign: chartSettings.chart_tooltip_title_align,
						titleMarginBottom: chartSettings.chart_tooltip_title_margin_bottom,
						bodyColor: chartSettings.chart_tooltip_item_color !== undefined ? chartSettings.chart_tooltip_item_color : '#FFF',
						bodyFont: {
							family: chartSettings.chart_tooltip_item_font,
							size: chartSettings.chart_tooltip_item_font_size,
						},
						bodyAlign: chartSettings.chart_tooltip_item_align,
						bodySpacing: chartSettings.chart_tooltip_item_spacing,
						boxPadding: 3
					}
				},
			};

			!chartTypesArray.includes(chartSettings.chart_type) && delete globalOptions.scales;

			if ( !chartTypesArray.includes(chartSettings.chart_type) && (chartSettings.chart_type !== 'doughnut' && chartSettings.chart_type !== 'pie') ) {
				
				globalOptions.scales = {
					r: {
						angleLines: {
						  color: chartSettings.angle_lines_color,
						},
						pointLabels: {
							color: chartSettings.point_labels_color_r,
							font: {
								size: chartSettings.point_labels_font_size_r,
								family: chartSettings.point_labels_font_family_r,
								style: chartSettings.point_labels_font_style_r,
								weight: chartSettings.point_labels_font_weight_r,
							}
						},
						ticks: {
							stepSize: chartSettings.r_step_size,
							display: chartSettings.display_r_ticks,
							backdropColor: chartSettings.axis_labels_bg_color,
							backdropPadding: +chartSettings.axis_labels_padding,
							color: chartSettings.axis_labels_color,
						},
						grid: {
							display: chartSettings.display_r_axis,
							drawBorder: chartSettings.display_r_axis,
							drawOnChartArea: chartSettings.display_r_axis,
							drawTicks: chartSettings.display_r_axis,
							color: chartSettings.axis_grid_line_color_r,
							borderDash: [chartSettings.border_dash_length_r, chartSettings.border_dash_spacing_r],
							borderDashOffset: chartSettings.border_dash_offset_r,
							lineWidth: chartSettings.grid_line_width_r,
						}
					},
				}
			}

			if ('custom' === chartSettings.data_source) {
				  const data = {
					labels: labels,
					datasets: JSON.parse(chartSettings.chart_datasets),
				  }; // todo apply conditions if not suitable for other chart_types
				
				  config = {
					plugins: [chartSettings.inner_datalabels ? ChartDataLabels : ''],
					type: chartSettings.chart_type == 'bar_horizontal' ? 'bar' : chartSettings.chart_type,
					data: data,
					options: globalOptions
				   };

				  chartSettings.chart_type == 'bar_horizontal' ? config.options.indexAxis = 'y' : '';

				  if (chartSettings.tooltips_percent || "pie" == chartSettings.chart_type || "doughnut" == chartSettings.chart_type || "polarArea" == chartSettings.chart_type) {
					config.options.plugins.tooltip.callbacks.label = function (data) {
						var prefixString = data.dataset.label + ": ";
	  
						if ("pie" == chartSettings.chart_type || "doughnut" == chartSettings.chart_type || "polarArea" == chartSettings.chart_type) {
							prefixString = data.label + ' ('+data.dataset.label+') ' + ": ";
						}
		
						var dataset = data.dataset;
		
						var total = dataset.data.reduce(function (previousValue, currentValue) {
							return parseFloat(previousValue) + parseFloat(currentValue);
						});
		
						var currentValue = data.formattedValue;
		
						var percentage = ((currentValue / total) * 100).toPrecision(3);
	  
						return (
							prefixString + (chartSettings.tooltips_percent ? percentage + "%" : data.formattedValue)
						);
					} 
				  }
	
				  myChart = new Chart(
					$scope.find('.wpr-chart'),
					config
				  );
			} else {
				if ( chartSettings.url && (chartTypesArray.includes(chartSettings.chart_type) || chartSettings.chart_type === 'radar') ) {
					$.ajax({
						url: chartSettings.url,
						type: "GET",
						success: function (res) {
							$scope.find(".wpr-rotating-plane").remove();
							renderCSVChart(res, chartSettings);
						},
						error: function (err) {
							console.log(err);
						}
					});
				} else if (!chartSettings.url && (chartTypesArray.includes(chartSettings.chart_type) || chartSettings.chart_type === 'radar')) {
					$scope.find(".wpr-rotating-plane").remove();
					$scope.find('.wpr-charts-container').html('<p class="wpr-charts-error-notice">Provide a csv file or remote URL</p>');
				} else {
					$scope.find(".wpr-rotating-plane").remove();
					$scope.find('.wpr-charts-container').html('<p class="wpr-charts-error-notice">doughnut, pie and polareArea charts only work with custom data source</p>');
				}
			}

			$(window).resize(function() {
				lineDotsWidth = window.innerWidth >= 768 ? chartSettings.line_dots_radius 
									: window.innerWidth <= 767 ? chartSettings.line_dots_radius_mobile : 0;
				config.options.elements.point.radius = lineDotsWidth;
				config.options.plugins.tooltip.caretSize = tooltipCaretSize;
			});

			function renderCSVChart (res, chartSettings) {
				var ctx = $scope.find('.wpr-chart'),
				rowsData = res.split(/\r?\n|\r/),
				labels = (rowsData.shift()).split(chartSettings.separator),
				data = {
					labels: labels,
					datasets: []
				};
			
				config = {
					type: chartSettings.chart_type == 'bar_horizontal' ? 'bar' : chartSettings.chart_type,
					data: data,
					options: globalOptions,
					plugins: [chartSettings.inner_datalabels ? ChartDataLabels : '', {
						beforeInit: function(chart, options) {
						  chart.legend.afterFit = function() {
							this.height = this.height + 50;
						  };
						}
					  }],
				};

				chartSettings.chart_type == 'bar_horizontal' ? config.options.indexAxis = 'y' : '';

				if (chartSettings.tooltips_percent) {
				  config.options.plugins.tooltip.callbacks.label = function (data) {
					  var prefixString = data.dataset.label + ": ";
	
					  if ("pie" == chartSettings.chart_type || "doughnut" == chartSettings.chart_type || "polarArea" == chartSettings.chart_type) {
						  prefixString = data.label + ' ('+data.dataset.label+') ' + ": ";
					  }
	  
					  var dataset = data.dataset;
	  
					  var total = dataset.data.reduce(function (previousValue, currentValue) {
						  return parseFloat(previousValue) + parseFloat(currentValue);
					  });
	  
					  var currentValue = data.formattedValue;
	  
					  var percentage = ((currentValue / total) * 100).toPrecision(3);
	
					  return (
						  prefixString + (chartSettings.tooltips_percent ? percentage + "%" : data.formattedValue)
					  );
				  } 
				}

				myChart = new Chart(ctx,
					config
				);
		
				rowsData.forEach(function (row, index) {
					if (row.length !== 0) {
						var colData = {};

						
						colData.data = row.split(chartSettings.separator);
						//add properties only if repeater element exists
						if (customDatasets[index]) {
							colData.borderColor = customDatasets[index].borderColor;
							colData.borderWidth = customDatasets[index].borderWidth;
							colData.backgroundColor = customDatasets[index].backgroundColor;
							colData.hoverBackgroundColor = customDatasets[index].hoverBackgroundColor;
							colData.label = customDatasets[index].label;
							colData.fill = customDatasets[index].fill
						}
		
						data.datasets.push(colData);
						myChart.update();
		
					}
				});
			}
		}, // End of widgetCharts

		widgetPostsTimeline: function($scope) { // goback
			var iScrollTarget = $scope.find( '.wpr-timeline-centered' ).length > 0 ? $scope.find( '.wpr-timeline-centered' ) : '',
			    element = $scope.find('.wpr-timeline-centered').length > 0 ? $scope.find('.wpr-timeline-centered') : '',
				pagination = $scope.find( '.wpr-grid-pagination' ).length > 0 ? $scope.find( '.wpr-grid-pagination' ) : '',
				middleLine = $scope.find('.wpr-middle-line').length > 0 ? $scope.find('.wpr-middle-line') : '',
				timelineFill = $scope.find(".wpr-timeline-fill").length > 0 ? $scope.find(".wpr-timeline-fill") : '',
				lastIcon = $scope.find('.wpr-main-line-icon.wpr-icon:last').length > 0 ? $scope.find('.wpr-main-line-icon.wpr-icon:last') : '',
				firstIcon = $scope.find('.wpr-main-line-icon.wpr-icon').length > 0 ? $scope.find('.wpr-main-line-icon.wpr-icon').first() : '',
				scopeClass = '.elementor-element-'+ $scope.attr( 'data-id' ),
				aosOffset = $scope.find('.wpr-story-info-vertical').attr('data-animation-offset') ? +$scope.find('.wpr-story-info-vertical').attr('data-animation-offset') : '',
				aosDuration = $scope.find('.wpr-story-info-vertical').attr('data-animation-duration') ? +$scope.find('.wpr-story-info-vertical').attr('data-animation-duration') : '';


			if ( $scope.find('.wpr-timeline-centered').length > 0 ) {
				
				$(window).resize(function() {
					removeLeftAlignedClass();
				});

				$(window).smartresize(function() {
					removeLeftAlignedClass();
				});

				setTimeout(function() {
					removeLeftAlignedClass();
					$(window).trigger('resize');
				}, 500);

				adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
				
				setTimeout(function() {
					adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
					$(window).trigger('resize');
				}, 500);

				$(window).smartresize(function() {
					adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
				});

				$(window).resize(function() {
					adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
				});
	
				if ( 'load-more' !== iScrollTarget.attr('data-pagination') ) {
					$scope.find('.wpr-grid-pagination').css('visibility', 'hidden');
				}

				AOS.init({
					offset: parseInt(aosOffset),
					duration: aosDuration,
					once: true,
				});

				postsTimelineFill(lastIcon, firstIcon);

				$(window).on('scroll',  function() {
					postsTimelineFill(lastIcon, firstIcon);
				});

				// init Infinite Scroll
				if ( !$scope.find('.elementor-repeater-items').length && !WprElements.editorCheck() && ('load-more' === $scope.find('.wpr-timeline-centered').data('pagination') || 'infinite-scroll' === $scope.find('.wpr-timeline-centered').data('pagination')) ) {
					var threshold = iScrollTarget !== undefined && 'load-more' === iScrollTarget.attr('data-pagination') ? false : 10;
					// var navClass = scopeClass +' .wpr-load-more-btn';
					
					iScrollTarget.infiniteScroll({
						path: scopeClass +' .wpr-grid-pagination a',
						hideNav: false,
						append:  scopeClass +'.wpr-timeline-entry',
						history: false,
						scrollThreshold: threshold,
						status: scopeClass + ' .page-load-status',
					});
					// Request
					iScrollTarget.on( 'request.infiniteScroll', function( event, path ) {
						$scope.find( '.wpr-load-more-btn' ).hide();
						$scope.find( '.wpr-pagination-loading' ).css( 'display', 'inline-block' );
					});
					
					var pagesLoaded = 0;

					iScrollTarget.on( 'load.infiniteScroll', function( event, response ) {
						pagesLoaded++;
						
						// get posts from response
						var items = $( response ).find(scopeClass).find( '.wpr-timeline-entry' );
						iScrollTarget.infiniteScroll( 'appendItems', items );

						if ( !$scope.find('.wpr-one-sided-timeline').length && !$scope.find('.wpr-one-sided-timeline-left').length ) {
							$scope.find('.wpr-timeline-entry').each(function(index, value){
								$(this).removeClass('wpr-right-aligned wpr-left-aligned');
								if ( 0 == index % 2 ) {
									$(this).addClass('wpr-left-aligned');
									$(this).find('.wpr-story-info-vertical').attr('data-aos', $(this).find('.wpr-story-info-vertical').attr('data-aos-left'));
								} else {
									$(this).addClass('wpr-right-aligned');
									$(this).find('.wpr-story-info-vertical').attr('data-aos', $(this).find('.wpr-story-info-vertical').attr('data-aos-right'));
								}
							});
						}

						AOS.init({
							offset: parseInt(aosOffset),
							duration: aosDuration,
							once: true,
						});

						$(window).scroll();

						$scope.find( '.wpr-pagination-loading' ).hide();
						// $scope.find( '.wpr-load-more-btn' ).fadeIn();
						if ( iScrollTarget.data('max-pages') - 1 !== pagesLoaded ) { // $pagination_max_pages
							if ( 'load-more' === iScrollTarget.attr('data-pagination') ) {
								$scope.find( '.wpr-load-more-btn' ).fadeIn();
							}
						} else {
							$scope.find( '.wpr-pagination-finish' ).fadeIn( 1000 );
							pagination.delay( 2000 ).fadeOut( 1000 );
						}

						middleLine = $scope.find('.wpr-middle-line');
						timelineFill = $scope.find(".wpr-timeline-fill");
						lastIcon = $scope.find('.wpr-main-line-icon.wpr-icon:last');
						firstIcon = $scope.find('.wpr-main-line-icon.wpr-icon').first();
						element = $scope.find('.wpr-timeline-centered');

						adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
						$(window).trigger('resize');
						postsTimelineFill(lastIcon, firstIcon);
					});

					if ( !WprElements.editorCheck() ) {
						$scope.find( '.wpr-load-more-btn' ).on( 'click', function() {
							iScrollTarget.infiniteScroll( 'loadNextPage' );
							return false;
						});

						if ( 'infinite-scroll' == iScrollTarget.attr('data-pagination') ) {
								iScrollTarget.infiniteScroll('loadNextPage');
						}
					}
				}
			}

			if ( $scope.find('.swiper-wrapper').length ) {

				var swiperLoader = function swiperLoader(swiperElement, swiperConfig) {
					if ('undefined' === typeof Swiper) {
						var asyncSwiper = elementorFrontend.utils.swiper;     
						return new asyncSwiper(swiperElement, swiperConfig).then( function (newSwiperInstance) {
							return newSwiperInstance;
						});  
					 } else {
						  return swiperPromise(swiperElement, swiperConfig);  
					  }
				};  
				
				var swiperPromise = function swiperPromise(swiperElement, swiperConfig) {    
					return new Promise(function (resolve, reject) {  
							var swiperInstance = new Swiper(swiperElement, swiperConfig); 
							resolve(swiperInstance); 
					}); 
				};
			
				var horizontal = $scope.find('.wpr-horizontal-bottom').length ? '.wpr-horizontal-bottom' : '.wpr-horizontal';
				var swiperSlider = $scope.find(horizontal +".swiper-container");
							
				var slidestoshow = swiperSlider.data("slidestoshow");

				swiperLoader(swiperSlider, {
					spaceBetween: +swiperSlider.data('swiper-space-between'),
					autoplay: swiperSlider.data("autoplay") !== 'yes' ? false : {
						delay: +swiperSlider.attr('data-swiper-delay'),
						// disableOnInteraction: true,
						// pauseOnMouseEnter: true,
					},
					speed: +swiperSlider.attr('data-swiper-speed'),
					slidesPerView: swiperSlider.data("slidestoshow"),
					direction: 'horizontal',
					pagination: {
					  el: '.wpr-swiper-pagination',
					  type: 'progressbar',
					},
					navigation: {
					  nextEl: '.wpr-button-next',
					  prevEl: '.wpr-button-prev',
					},
					// Responsive breakpoints
					breakpoints: {
					  // when window width is >= 320px
					  320: {
						slidesPerView: 1,
					  },
					  // when window width is >= 480px
					  480: {
						slidesPerView: 2,
					  },
					  // when window width is >= 640px
					  769: { // 640
						slidesPerView: slidestoshow,
					  }
					},
				  });

				//   swiperSlider.data('pause-on-hover') === 'yes' && swiperSlider.hover(function() {
				// 	  (this).swiper.autoplay.stop();
				//   }, function() {
				// 	  (this).swiper.autoplay.start();
				//   });
			}

			function removeLeftAlignedClass() {
				if ( $scope.find('.wpr-centered').length ) {
					if ( window.innerWidth <= 767 ) {
						$scope.find('.wpr-wrapper .wpr-timeline-centered').removeClass('wpr-both-sided-timeline').addClass('wpr-one-sided-timeline').addClass('wpr-remove-one-sided-later');
						$scope.find('.wpr-wrapper .wpr-left-aligned').removeClass('wpr-left-aligned').addClass('wpr-right-aligned').addClass('wpr-remove-right-aligned-later');
					} else {
						$scope.find('.wpr-wrapper .wpr-timeline-centered.wpr-remove-one-sided-later').removeClass('wpr-one-sided-timeline').addClass('wpr-both-sided-timeline').removeClass('wpr-remove-one-sided-later');
						$scope.find('.wpr-wrapper .wpr-remove-right-aligned-later').removeClass('wpr-right-aligned').addClass('wpr-left-aligned').removeClass('wpr-remove-right-aligned-later');
					}
				}
			}

		  function postsTimelineFill(lastIcon, firstIcon) {
			if ( !$scope.find('.wpr-timeline-fill').length ) {
				return;
			}

			if ( $scope.find('.wpr-timeline-entry:eq(0)').prev('.wpr-year-wrap').length > 0 ) {
				firstIcon = $scope.find('.wpr-year-label').eq(0);
			}

			  if ( timelineFill.length ) {
				var fillHeight = timelineFill.css('height').slice(0, -2),
					docScrollTop = document.documentElement.scrollTop,
					clientHeight = document.documentElement.clientHeight/2;
				  
				if ( !((docScrollTop + clientHeight - (firstIcon.offset().top)) > lastIcon.offset().top - firstIcon.offset().top + parseInt(lastIcon.css('height').slice(0, -2))) ) {
					timelineFill.css('height', (docScrollTop  + clientHeight - (firstIcon.offset().top)) + 'px');
				}

				$scope.find('.wpr-main-line-icon.wpr-icon').each(function () {
					if ( $(this).offset().top < parseInt( firstIcon.offset().top + parseInt(fillHeight) ) ) {
						$(this).addClass('wpr-change-border-color');
					} else {
						$(this).removeClass('wpr-change-border-color');
					}
				});
			  }
		  }

		  function adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element) {
			  	element = $scope.find('.wpr-timeline-centered');
				if ( !$scope.find('.wpr-both-sided-timeline').length && !$scope.find('.wpr-one-sided-timeline').length && !$scope.find('.wpr-one-sided-timeline-left').length ) {
					return;
				}

				if ( $scope.find('.wpr-timeline-entry:eq(0)').prev('.wpr-year-wrap').length > 0 ) {
					firstIcon = $scope.find('.wpr-year-label').eq(0);
				}
				
				var firstIconOffset = firstIcon.offset().top;
				var lastIconOffset = lastIcon.offset().top;
				var middleLineTop = (firstIconOffset - element.offset().top) + 'px';
				// var middleLineHeight = (lastIconOffset - (lastIcon.css('height').slice(0, -2)/2 + (firstIconOffset - firstIcon.css('height').slice(0, -2)))) + 'px';
				var middleLineHeight = lastIconOffset - firstIconOffset + parseInt(lastIcon.css('height').slice(0, -2));
				var middleLineMaxHeight = firstIconOffset - lastIconOffset + 'px !important';

				middleLine.css('top', middleLineTop);
				middleLine.css('height', middleLineHeight);
				// middleLine.css('maxHeight', middleLineMaxHeight);
				timelineFill !== '' ? timelineFill.css('top', middleLineTop) : '';
		  }
		}, // end widgetPostsTimeline

        widgetSharingButtons: function($scope) {
			$scope.find('.wpr-sharing-print').on('click', function(e) {
				e.preventDefault();
				window.print();
			});
        }, // end widgetSharingButtons

		widgetFlipCarousel: function($scope) {
			var flipsterSettings = JSON.parse($scope.find('.wpr-flip-carousel').attr('data-settings'));

			$scope.find('.wpr-flip-carousel').css('opacity', 1);
			
			$scope.find('.wpr-flip-carousel').flipster({
				itemContainer: 'ul',
				itemSelector: 'li',
				fadeIn: 400,
				start: flipsterSettings.starts_from_center === 'yes' ? 'center' : 0,
				style: flipsterSettings.carousel_type,
				loop: flipsterSettings.loop === 'yes' ? true : false,
				autoplay: flipsterSettings.autoplay === 'no' ? false : flipsterSettings.autoplay_milliseconds,
				pauseOnHover: flipsterSettings.pause_on_hover === 'yes' ? true : false,
				click: flipsterSettings.play_on_click === 'yes' ? true : false,
				scrollwheel: flipsterSettings.play_on_scroll === 'yes' ? true : false,
				touch: true,
				nav: 'true' === flipsterSettings.pagination_position ? true : flipsterSettings.pagination_position ? flipsterSettings.pagination_position : false,
				spacing: flipsterSettings.spacing,
				buttons: 'custom',
				buttonPrev: flipsterSettings.button_prev,
				buttonNext: flipsterSettings.button_next
			});
			
			var paginationButtons = $scope.find('.wpr-flip-carousel').find('.flipster__nav__item').find('.flipster__nav__link');
			
			paginationButtons.each(function() {
				$(this).text(parseInt($(this).text()) + 1);
			});
		}, // end widgetFlipCarousel

		widgetFeatureList: function($scope) {
			$scope.find('.wpr-feature-list-item:not(:last-of-type)').find('.wpr-feature-list-icon-wrap').each(function(index) {
				var offsetTop = $scope.find('.wpr-feature-list-item').eq(index + 1).find('.wpr-feature-list-icon-wrap').offset().top;
				
				$(this).find('.wpr-feature-list-line').height(offsetTop - $(this).offset().top + 'px');
			});

			$(window).resize(function() {
				$scope.find('.wpr-feature-list-item:not(:last-of-type)').find('.wpr-feature-list-icon-wrap').each(function(index) {
					var offsetTop = $scope.find('.wpr-feature-list-item').eq(index + 1).find('.wpr-feature-list-icon-wrap').offset().top;
					
					$(this).find('.wpr-feature-list-line').height(offsetTop - $(this).offset().top + 'px');
				});
			})
		}, // end widgetFeatureList

		widgetAdvancedAccordion: function($scope) {
            var acc = $scope.find('.wpr-acc-button');
            var accItemWrap = $scope.find('.wpr-accordion-item-wrap');
			var accordionType = $scope.find('.wpr-advanced-accordion').data('accordion-type');
			var activeIndex = +$scope.find('.wpr-advanced-accordion').data('active-index') - 1;
			var accordionTrigger = $scope.find('.wpr-advanced-accordion').data('accordion-trigger');
			var interactionSpeed = +$scope.find('.wpr-advanced-accordion').data('interaction-speed') * 1000;

			if ('click' === accordionTrigger) {

				if ( accordionType == 'accordion' ) {
					acc.on("click", function() {
						var thisIndex = acc.index(this);
						acc.each(function(index){
							index != thisIndex ? $(this).removeClass('wpr-acc-active') : '';
						});
						$scope.find('.wpr-acc-panel').each(function(index) {
							index != thisIndex ? $(this).removeClass('wpr-acc-panel-active') && $(this).slideUp(interactionSpeed) : '';
						});
						$(this).toggleClass("wpr-acc-active");
						var panel = $(this).next();
						if ( !panel.hasClass('wpr-acc-panel-active') ) {
							panel.slideDown(interactionSpeed);
							panel.addClass('wpr-acc-panel-active');
						} else {
							panel.slideUp(interactionSpeed);
							panel.removeClass('wpr-acc-panel-active');
						}
					});
				} else {
					acc.each(function() {
						$(this).on("click", function() {
							$(this).toggleClass("wpr-acc-active");
							var panel = $(this).next();
							if ( !panel.hasClass('wpr-acc-panel-active') ) {
								panel.slideDown(interactionSpeed);
								panel.addClass('wpr-acc-panel-active');
							} else {
								panel.slideUp(interactionSpeed);
								panel.removeClass('wpr-acc-panel-active');
							}
						});
					});
				}

				acc && (activeIndex > -1 && acc.eq(activeIndex).trigger('click'));
			} else if ( accordionTrigger == 'hover' ) {
				accItemWrap.on("mouseenter", function() {
						var thisIndex = accItemWrap.index(this);

						$(this).find('.wpr-acc-button').addClass("wpr-acc-active");

						var panel = $(this).find('.wpr-acc-panel');
							panel.slideDown(interactionSpeed);
							panel.addClass('wpr-acc-panel-active');

						accItemWrap.each(function(index) {
							if (index != thisIndex) {
								$(this).find('.wpr-acc-button').removeClass("wpr-acc-active");
								var panel = $(this).find('.wpr-acc-panel');
								panel.slideUp(interactionSpeed);
								panel.removeClass('wpr-acc-panel-active');
							}
						});
				});
				
				accItemWrap &&  (activeIndex > -1 && accItemWrap.eq(activeIndex).trigger('mouseenter'));
			}

			$scope.find('.wpr-acc-search-input').on( {
				focus: function() {
					$scope.addClass( 'wpr-acc-search-input-focus' );
				},
				blur: function() {
					$scope.removeClass( 'wpr-search-form-input-focus' );
				}
			} );
			
			let allInAcc = $scope.find('.wpr-advanced-accordion > *');

			$scope.find('i.fa-times').on('click', function() {
				$scope.find('.wpr-acc-search-input').val('');
				$scope.find('.wpr-acc-search-input').trigger('keyup');
			});

			var iconBox = $scope.find('.wpr-acc-icon-box');

			iconBox.each(function() {
				$(this).find('.wpr-acc-icon-box-after').css({
					'border-top': $(this).height()/2 + 'px solid transparent', 
					'border-bottom': $(this).height()/2 + 'px solid transparent'
				});	
			});

			$(window).resize(function() {
				iconBox.each(function() {
					$(this).find('.wpr-acc-icon-box-after').css({
						'border-top': $(this).height()/2 + 'px solid transparent', 
						'border-bottom': $(this).height()/2 + 'px solid transparent'
					});	
				});
			});

			$scope.find('.wpr-acc-search-input').on('keyup', function() {
				setTimeout( () => {
					let thisValue = $(this).val();
					if ( thisValue.length > 0 ) {
						$scope.find('.wpr-acc-search-input-wrap').find('i.fa-times').css('display', 'inline-block');
						allInAcc.each(function() {
							// console.log($(this), $(this).text().toUpperCase().indexOf(thisValue.toUpperCase()));
							if ( $(this).hasClass('wpr-accordion-item-wrap') ) {
								var itemWrap = $(this);
								if ( itemWrap.text().toUpperCase().indexOf(thisValue.toUpperCase()) == -1 ) {
									itemWrap.hide();
									if ( itemWrap.find('.wpr-acc-button').hasClass('wpr-acc-active') && itemWrap.find('.wpr-acc-panel').hasClass('wpr-acc-panel-active') ) {
										itemWrap.find('.wpr-acc-button').removeClass('wpr-acc-active');
										itemWrap.find('.wpr-acc-panel').removeClass('wpr-acc-panel-active');
									}
								} else {
									itemWrap.show();
									if ( !itemWrap.find('.wpr-acc-button').hasClass('wpr-acc-active') && !itemWrap.find('.wpr-acc-panel').hasClass('wpr-acc-panel-active') ) {
										itemWrap.find('.wpr-acc-button').addClass('wpr-acc-active');
										itemWrap.find('.wpr-acc-panel').addClass('wpr-acc-panel-active');
										itemWrap.find('.wpr-acc-panel').slideDown(interactionSpeed);
									}
								}
							}
						});
					} else {
						$scope.find('.wpr-acc-search-input-wrap').find('i.fa-times').css('display', 'none');
						allInAcc.each(function() {
							if ( $(this).hasClass('wpr-accordion-item-wrap') ) {
								$(this).show();
								if ( $(this).find('.wpr-acc-panel').hasClass('wpr-acc-panel-active') ) {
									$(this).find('.wpr-acc-panel').removeClass('wpr-acc-panel-active');
								}
								if ( $(this).find('.wpr-acc-button').hasClass('wpr-acc-active') ) {
									$(this).find('.wpr-acc-button').removeClass('wpr-acc-active')
								}
								$(this).find('.wpr-acc-panel').slideUp(interactionSpeed);
							}
						});
						// if ('click' === accordionTrigger) {
						// 	acc && (activeIndex > -1 && acc.eq(activeIndex).trigger('click'));
						// } else if ( 'hover' === accordionTrigger ) {
						// 	accItemWrap &&  (activeIndex > -1 && accItemWrap.eq(activeIndex).trigger('mouseenter'));
						// }
					}
				}, 1000);
			});
			
		}, // end widgetAdvancedAccordion

        widgetImageAccordion: function($scope) {
			var settings = JSON.parse($scope.find( '.wpr-img-accordion-media-hover' ).attr( 'data-settings' ));

			// var MediaWrap = $scope.find( '.wpr-img-accordion-media-hover' );
			var MediaWrap = $scope.find( '.wpr-image-accordion' );
			// var	lightboxSettings = settings.lightbox;
			var lightboxSettings = $scope.find('.wpr-image-accordion').attr('lightbox') ? JSON.parse($scope.find('.wpr-image-accordion').attr('lightbox')) : '';

			var thisTargetHasClass = false;

			if ( $scope.find('.wpr-image-accordion-wrap').hasClass('wpr-acc-no-column') ) {
				if ( !$scope.hasClass('wpr-image-accordion-row') );
				$scope.removeClass('wpr-image-accordion-column').addClass('wpr-image-accordion-row');
				$scope.find('.wpr-image-accordion').css('flex-direction', 'row');
			}

			if ( '' !== lightboxSettings ) {
			
				// Init Lightbox
				MediaWrap.lightGallery( lightboxSettings );
	
				// Fix LightGallery Thumbnails
				MediaWrap.on('onAfterOpen.lg',function() {
					if ( $('.lg-outer').find('.lg-thumb-item').length ) {
						$('.lg-outer').find('.lg-thumb-item').each(function() {
							var imgSrc = $(this).find('img').attr('src'),
								newImgSrc = imgSrc,
								extIndex = imgSrc.lastIndexOf('.'),
								imgExt = imgSrc.slice(extIndex),
								cropIndex = imgSrc.lastIndexOf('-'),
								cropSize = /\d{3,}x\d{3,}/.test(imgSrc.substring(extIndex,cropIndex)) ? imgSrc.substring(extIndex,cropIndex) : false;
							
							if ( 42 <= imgSrc.substring(extIndex,cropIndex).length ) {
								cropSize = '';
							}
	
							if ( cropSize !== '' ) {
								if ( false !== cropSize ) {
									newImgSrc = imgSrc.replace(cropSize, '-150x150');
								} else {
									newImgSrc = [imgSrc.slice(0, extIndex), '-150x150', imgSrc.slice(extIndex)].join('');
								}
							}
	
							// Change SRC
							$(this).find('img').attr('src', newImgSrc);
	
							if ( false == cropSize || '-450x450' === cropSize ) {
								$(this).find('img').attr('src', imgSrc);
							}
						});
					}
				});
	
				// Show/Hide Controls
				$scope.find( '.wpr-image-accordion' ).on( 'onAferAppendSlide.lg, onAfterSlide.lg', function( event, prevIndex, index ) {
					var lightboxControls = $( '#lg-actual-size, #lg-zoom-in, #lg-zoom-out, #lg-download' ),
						lightboxDownload = $( '#lg-download' ).attr( 'href' );
	
					if ( $( '#lg-download' ).length ) {
						if ( -1 === lightboxDownload.indexOf( 'wp-content' ) ) {
							lightboxControls.addClass( 'wpr-hidden-element' );
						} else {
							lightboxControls.removeClass( 'wpr-hidden-element' );
						}
					}
	
					// Autoplay Button
					if ( '' === lightboxSettings.autoplay ) {
						$( '.lg-autoplay-button' ).css({
							 'width' : '0',
							 'height' : '0',
							 'overflow' : 'hidden'
						});
					}
				});

			}

			MediaWrap.css('cursor', 'pointer');

			// Init Media Hover Link

			var accordionItem = $scope.find('.wpr-image-accordion-item');

			// Media Hover Link
			function mediaHoverLink() {
				if ( ! WprElements.editorCheck() ) {

					$scope.find('.wpr-img-accordion-media-hover').on( 'click', function( event ) {
						var thisSettings = event.target.className.includes('wpr-img-accordion-media-hover') ? JSON.parse($(this).attr('data-settings')) : JSON.parse($(this).closest('.wpr-img-accordion-media-hover').attr( 'data-settings' ));
						
						if ( !$(event.target).hasClass('wpr-img-accordion-item-lightbox') && 0 === $(event.target).closest('.wpr-img-accordion-item-lightbox').length ) {
							var itemUrl = thisSettings.activeItem.overlayLink;
							if (itemUrl != '') {
	
								if ( '_blank' === thisSettings.activeItem.overlayLinkTarget ) {
									window.open(itemUrl, '_blank').focus();
								} else {
									window.location.href = itemUrl;
								}
	
							}
						}
					});
				}				
			}

			if ( 'hover' === settings.activeItem.interaction) {

				mediaHoverLink();
				
				accordionItem.on('mouseenter', function() {
					accordionItem.removeClass('wpr-image-accordion-item-grow');
					accordionItem.find('.wpr-animation-wrap').removeClass('wpr-animation-wrap-active');
					$(this).addClass('wpr-image-accordion-item-grow');
					$(this).find('.wpr-animation-wrap').addClass('wpr-animation-wrap-active');
				});

				accordionItem.on('mouseleave', function() {
					$(this).removeClass('wpr-image-accordion-item-grow');
					$(this).find('.wpr-animation-wrap').removeClass('wpr-animation-wrap-active');
				});

			} else if ( 'click' === settings.activeItem.interaction ) {
				$scope.find('.wpr-img-accordion-media-hover').removeClass('wpr-animation-wrap');
				accordionItem.on('click', '.wpr-img-accordion-media-hover', function(event) {
					thisTargetHasClass = event.target.className.includes('wpr-img-accordion-media-hover') ? event.target.className.includes('wpr-animation-wrap-active') : $(this).closest('.wpr-img-accordion-media-hover').hasClass('wpr-animation-wrap-active');
					if (thisTargetHasClass && !WprElements.editorCheck()) {
						var thisSettings = event.target.className.includes('wpr-img-accordion-media-hover') ? JSON.parse($(this).attr('data-settings')) : JSON.parse($(this).closest('.wpr-img-accordion-media-hover').attr( 'data-settings' ));
						
						if ( !$(event.target).hasClass('wpr-img-accordion-item-lightbox') && 0 === $(event.target).closest('.wpr-img-accordion-item-lightbox').length ) {
							var itemUrl = thisSettings.activeItem.overlayLink;
							if (itemUrl != '') {
								if ( '_blank' === thisSettings.activeItem.overlayLinkTarget ) {
									window.open(itemUrl, '_blank').focus();
								} else {
									window.location.href = itemUrl;
								}
							}
						}
					} else {
						$scope.find('.wpr-img-accordion-media-hover').removeClass('wpr-animation-wrap').removeClass('wpr-animation-wrap-active');
						accordionItem.removeClass('wpr-image-accordion-item-grow');
						$(this).closest('.wpr-image-accordion-item').addClass('wpr-image-accordion-item-grow');
						$(this).closest('.wpr-img-accordion-media-hover').addClass('wpr-animation-wrap-active');
					}
				});
			} else {
				$scope.find('.wpr-img-accordion-media-hover').removeClass('wpr-animation-wrap');
			}

			accordionItem.each(function() {
				if ( $(this).index() === settings.activeItem.defaultActive - 1 ) {
					if ( 'click' === settings.activeItem.interaction) {
						setTimeout(() => {
							$(this).find('.wpr-img-accordion-media-hover').trigger('click');
						}, 400);
					} else {
						setTimeout(() => {
							$(this).find('.wpr-img-accordion-media-hover').trigger('mouseenter');
						}, 400);
					}
				}
			});
			
			$scope.find('.wpr-image-accordion-wrap').css('opacity', 1); 
        }, // end widgetImageAccordion
		
		widgetProductAddToCart: function($scope) {
			var qtyInput = jQuery('.woocommerce .wpr-quantity-wrapper'),
				qtyInputInStock = qtyInput.find('input.qty').attr('max') ? qtyInput.find('input.qty').attr('max') : 99999999,
				qtyLayout = $scope.find('.wpr-product-add-to-cart').attr('layout-settings'),
				qtyWrapper = $scope.find('.wpr-add-to-cart-icons-wrap'),
				plusIconChild = !$scope.find('.wpr-add-to-cart-icons-wrap').length ? 'last-child' : 'first-child',
				minusIconChild = !$scope.find('.wpr-add-to-cart-icons-wrap').length ? 'first-child' : 'last-child';

			$scope.find('input.qty').each(function() {
				if (!$(this).val()) {
					$(this).val(0);
				}
			});
			
			$scope.find('.variations').find('select').on('change', function () {
				var resetButtonDisplay = false;
				$scope.find('.variations').find('select').each(function () {
					if ( 'choose an option' !== $(this).find('option:selected').text().toLowerCase() ) {
						resetButtonDisplay = true;
					}
				});

				if ( resetButtonDisplay == false ) {
					$scope.find('.reset_variations').css('display', 'none');
				} else {
					$scope.find('.reset_variations').css('display', 'inline-block');
				}
			});

			// convert to text input
			if (qtyLayout !== 'default' ) {
				qtyInput.find('input.qty').attr('type', 'text').removeAttr('step').removeAttr('min').removeAttr('max');
			}
		
			// plus
			qtyInput.on('click', 'i:'+plusIconChild, function() {

				if ( parseInt(jQuery(this).prev('.quantity').find('input.qty').val(), 10) < qtyInputInStock && qtyLayout == 'both' ) {
					jQuery(this).prev('.quantity').find('input.qty').val( parseInt(jQuery(this).prev('.quantity').find('input.qty').val(), 10) + 1);
					jQuery('input[name="update_cart"]').removeAttr('disabled');
				} else if ( parseInt(jQuery(this).parent().siblings('.quantity').find('input.qty').val(), 10) < qtyInputInStock && qtyLayout !== 'both' && qtyLayout !== 'default' ) {
					jQuery(this).parent().siblings('.quantity').find('input.qty').val( parseInt(jQuery(this).parent().siblings('.quantity').find('input.qty').val(), 10) + 1);
					jQuery('input[name="update_cart"]').removeAttr('disabled');
				}
			});
		
			// minus
			qtyInput.on('click', 'i:'+minusIconChild, function() {
				if ( parseInt(jQuery(this).next('.quantity').find('input.qty').val(), 10) > 0 && qtyLayout == 'both' ) {
					jQuery(this).next('.quantity').find('input.qty').val( parseInt(jQuery(this).next('.quantity').find('input.qty').val(), 10) - 1);
					jQuery('input[name="update_cart"]').removeAttr('disabled');
				} else if ( parseInt(jQuery(this).parent().siblings('.quantity').find('input.qty').val(), 10) > 0 && qtyLayout !== 'both' && qtyLayout !== 'default' ) {
					jQuery(this).parent().siblings('.quantity').find('input.qty').val( parseInt(jQuery(this).parent().siblings('.quantity').find('input.qty').val(), 10) - 1);
					jQuery('input[name="update_cart"]').removeAttr('disabled');
				}
			});
		
			// in stock range check
			qtyInput.find('input.qty').keyup(function() {
				if ( jQuery(this).val() > qtyInputInStock ) {
					jQuery(this).val( qtyInputInStock );
				}
			});

			if ( 'yes' === $scope.find('.wpr-product-add-to-cart').data('ajax-add-to-cart') ) {
				$scope.find('.single_add_to_cart_button').on('click', ajaxAddToCart);
			}

			function ajaxAddToCart(e) {
				e.preventDefault();
			
				let $form = $( this ).closest('form');
			
				if ( ! $form[0].checkValidity() ) {
					$form[0].reportValidity();
			
					return false;
				}
			
				let $thisBtn = $( this ),
					product_id = $thisBtn.val() || '',
					cartFormData = $form.serialize();
			
				$.ajax( {
					type: 'POST',
					url: WprConfig.ajaxurl,
					data: 'action=wpr_addons_add_cart_single_product&add-to-cart=' + product_id + '&' + cartFormData,
					beforeSend: function () {
						$thisBtn.removeClass( 'added' ).addClass( 'loading' );
					},
					complete: function () {
						$thisBtn.addClass( 'added' ).removeClass( 'loading' );
					},
					success: function ( response ) {
						if ( response.error && response.product_url ) {
							window.location = response.product_url;
			
							return;
						}
			
						setTimeout( function () {
							$thisBtn.removeClass( 'added' );
						}, 1000 );
			
						$( document.body ).trigger( 'wc_fragment_refresh' );
						$( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $thisBtn ] );
			
						if ( typeof wc_add_to_cart_params === 'undefined' ) {
							return false;
						}

						var currentCartCount = parseInt($('.wpr-mini-cart-icon-count').text());
						var updatedCartCount = parseInt($scope.find('.wpr-quantity-wrapper .qty').val());
						$('.wpr-mini-cart-icon-count').text(currentCartCount + updatedCartCount);
					},
				} );
			}
		}, // End of widgetProductAddToCart

		widgetProductMiniCart: function($scope) {
				$scope.find('.wpr-mini-cart').css({"display": "none"});
			
				// $( document.body ).trigger( 'wc_fragment_refresh' );

				var animationSpeed = $scope.find('.wpr-mini-cart-wrap').data('animation');

				$('body').on('click', function(e) {
					if ( !e.target.classList.value.includes('wpr-mini-cart') && !e.target.closest('.wpr-mini-cart') ) {
						if ( $scope.hasClass('wpr-mini-cart-slide') ) {
							$scope.find('.wpr-mini-cart').slideUp(animationSpeed);
						} else {
							$scope.find('.wpr-mini-cart').fadeOut(animationSpeed);
						}
					}
				});

				if ( 0 !== $scope.hasClass('wpr-mini-cart-sidebar').length ) {
					if ( $('#wpadminbar').length ) {
						$scope.find('.wpr-mini-cart').css({
							// 'top': $('#wpadminbar').css('height'),
							// 'height': $scope.find('.wpr-shopping-cart-wrap').css('height') -  $('#wpadminbar').css('height')
							'z-index': 999999
						});
					}

					closeSideBar();

					$scope.find('.wpr-shopping-cart-wrap').on('click', function(e) {
						// if ( !e.target.classList.value.includes('widget_shopping_cart_content') && !e.target.closest('.widget_shopping_cart_content') ) {
						if ( !e.target.classList.value.includes('wpr-shopping-cart-inner-wrap') && !e.target.closest('.wpr-shopping-cart-inner-wrap') ) {
							// $scope.find('.widget_shopping_cart_content').addClass('wpr-mini-cart-slide-out');
							$scope.find('.wpr-shopping-cart-inner-wrap').addClass('wpr-mini-cart-slide-out');
							$scope.find('.wpr-mini-cart-slide-out').css('animation-speed', animationSpeed);
							$scope.find('.wpr-shopping-cart-wrap').fadeOut(animationSpeed);
							$('body').removeClass('wpr-mini-cart-sidebar-body');
							setTimeout(function() {
								// $scope.find('.widget_shopping_cart_content').removeClass('wpr-mini-cart-slide-out');
								$scope.find('.wpr-shopping-cart-inner-wrap').removeClass('wpr-mini-cart-slide-out');
								$scope.find('.wpr-mini-cart').css({"display": "none"});
							}, animationSpeed + 100);
						}
					});
				}

				if ( $scope.find('.wpr-mini-cart').length ) {
					$scope.find('.wpr-mini-cart-toggle-btn').on('click', function(e) {
						e.stopPropagation();
						e.preventDefault();
						if ( 'none' === $scope.find('.wpr-mini-cart').css("display") ) {
							if ( $scope.hasClass('wpr-mini-cart-slide') ) {
								$scope.find('.wpr-mini-cart').slideDown(animationSpeed);
							} else {
								$scope.find('.wpr-mini-cart').fadeIn(animationSpeed);
							}
							if ( $scope.hasClass('wpr-mini-cart-sidebar') ) {
								$scope.find('.wpr-shopping-cart-wrap').fadeIn(animationSpeed);
								// $scope.find('.widget_shopping_cart_content').addClass('wpr-mini-cart-slide-in');
								$scope.find('.wpr-shopping-cart-inner-wrap').addClass('wpr-mini-cart-slide-in');
								$scope.find('.wpr-mini-cart-slide-in').css('animation-speed', animationSpeed);
								$('body').addClass('wpr-mini-cart-sidebar-body');
							}
							setTimeout(function() {
								// $scope.find('.widget_shopping_cart_content').removeClass('wpr-mini-cart-slide-in');
								$scope.find('.wpr-shopping-cart-inner-wrap').removeClass('wpr-mini-cart-slide-in');
								if ( $scope.hasClass('wpr-mini-cart-sidebar') ) {
									$scope.find('.wpr-woo-mini-cart').trigger('resize');
								}
							}, animationSpeed + 100);
						} else {
							if ( $scope.hasClass('wpr-mini-cart-slide') ) {
								$scope.find('.wpr-mini-cart').slideUp(animationSpeed);
							} else {
								$scope.find('.wpr-mini-cart').fadeOut(animationSpeed);
							}
						}
					});
				}

				var mutationObserver = new MutationObserver(function(mutations) {
					if (  0 !== $scope.hasClass('wpr-mini-cart-sidebar').length ) {
						closeSideBar();

						// if ( $scope.find('.wpr-mini-cart').data('close-cart-heading') ) {
						// 	$scope.find('.wpr-close-cart h2').text($scope.find('.wpr-mini-cart').data('close-cart-heading').replace(/-/g, ' '));
						// }
					}
					
					$scope.find('.woocommerce-mini-cart-item').on('click', '.wpr-remove-item-from-mini-cart', function() {
						$(this).closest('li').addClass('wpr-before-remove-from-mini-cart');
					});
				});

				// Listen to Mini Cart Changes
				mutationObserver.observe($scope[0], {
					childList: true,
					subtree: true,
				});

				function closeSideBar() {
					$scope.find('.wpr-close-cart span').on('click', function(e) {
						// $scope.find('.widget_shopping_cart_content').addClass('wpr-mini-cart-slide-out');
						$scope.find('.wpr-shopping-cart-inner-wrap').addClass('wpr-mini-cart-slide-out');
						$scope.find('.wpr-mini-cart-slide-out').css('animation-speed', animationSpeed);
						$scope.find('.wpr-shopping-cart-wrap').fadeOut(animationSpeed);
						$('body').removeClass('wpr-mini-cart-sidebar-body');
						setTimeout(function() {
							// $scope.find('.widget_shopping_cart_content').removeClass('wpr-mini-cart-slide-out');
							$scope.find('.wpr-shopping-cart-inner-wrap').removeClass('wpr-mini-cart-slide-out');
							$scope.find('.wpr-mini-cart').css({"display": "none"});
						}, animationSpeed + 100);
					});
				}

		}, // End of widgetProductMiniCart

		widgetProductFilters: function($scope) {
			if ( 0 !== $scope.find('.wpr-search-form-input').length ) {
				$scope.find('.wpr-search-form-input').on( {
					focus: function() {
						$scope.addClass( 'wpr-search-form-input-focus' );
					},
					blur: function() {
						$scope.removeClass( 'wpr-search-form-input-focus' );
					}
				} );
			}
		}, // End of widgetProductFilters

		widgetPageCart: function($scope) {
			// $scope.find('.shipping-calculator-button').trigger('click');
		}, // End of widgetPageCart

		widgetPageMyAccount: function($scope) {

			if ( WprElements.editorCheck() ) {
			
				$scope.find(".woocommerce-MyAccount-content").each(function() {
					if ( $(this).index() !== 1 ) {
						$(this).css('display', 'none');
					}
				});

				$scope.find('.woocommerce-MyAccount-navigation-link').on('click', function() {
					var tabContent, tabLinks, pageName;

					tabContent = $scope.find(".woocommerce-MyAccount-content");
					tabContent.each(function() {
							$(this).css('display', 'none');
					});

					tabLinks = $scope.find(".woocommerce-MyAccount-navigation-link");
					tabLinks.each(function() {
						$(this).removeClass('is-active');
					});

					pageName = $(this).attr('class').slice($(this).attr('class').indexOf('--') + 2);
					$(this).addClass('is-active');

					$scope.find('[wpr-my-account-page="'+ pageName +'"]').css('display', 'block');

				});
			}	
			
		}, // End of widgetPageMyAccount

		widgetReadingProgressBar: function($scope) {

			if ( $scope.find('.wpr-reading-progress-bar-container').length != 0 ) {
				var rpbContainer = $scope.find('.wpr-reading-progress-bar-container');
				readingProgressBar($scope, rpbContainer);
			}

			function readingProgressBar($scope, rpbContainer) {

				var initialPaddingTop = $('body').css('paddingTop');
				var initialPaddingBottom = $('body').css('paddingBottom');

				if ( '0px' === rpbContainer.css('top') ) {
					if ( 'colored' == rpbContainer.data('background-type') ) {
						$('body').css('paddingTop', $scope.find('.wpr-reading-progress-bar').css('height'));
					}
					if ( $('#wpadminbar').length ) {
						rpbContainer.css('top', $('#wpadminbar').height());
					}
					$('body').css('paddingBottom', initialPaddingBottom);
				} else if ( '0px' === rpbContainer.css('bottom') && 'colored' == rpbContainer.data('background-type') ) {
					$('body').css('paddingBottom', $scope.find('.wpr-reading-progress-bar').css('height'));
					$('body').css('paddingTop', initialPaddingTop);
				}

				readingProgressBarFill($scope);
				window.onscroll = function() {
					readingProgressBarFill($scope);
				};

			}

			function readingProgressBarFill($scope) {
				if ( $scope.find('.wpr-reading-progress-bar').length ) {
					var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
					var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
					var scrolled = (winScroll / height) * 100;
					$scope.find(".wpr-reading-progress-bar").css('width', scrolled + "%");
				}
			}

		},

		widgetDataTable: function($scope) {
			
			var beforeFilter = $scope.find("tbody .wpr-table-row"),
				itemsPerPage = +$scope.find('.wpr-table-inner-container').attr('data-rows-per-page'),
				paginationListItems = $scope.find('.wpr-table-custom-pagination-list-item'),
				initialRows = $scope.find('.wpr-table-inner-container tbody tr'),
				table = $scope.find('.wpr-table-inner-container tbody'),
				pageIndex, value, paginationIndex;

			// Table Custom Pagination
			if ( 'yes' === $scope.find('.wpr-table-inner-container').attr('data-custom-pagination') ) {

				var tableRows = initialRows.filter(function(index) {
					return index < $scope.find('.wpr-table-inner-container').attr('data-rows-per-page');
				});

				table.html(tableRows);

				adjustPaginationList();

				$scope.on('click', '.wpr-table-custom-pagination-list-item', function() {
						paginationListItems.removeClass('wpr-active-pagination-item');
						$(this).addClass('wpr-active-pagination-item');
						adjustPaginationList();
						table.hide();
						pageIndex = +$(this).text();
						itemsPerPage = +$scope.find('.wpr-table-inner-container').attr('data-rows-per-page');

						table.html(initialRows.filter(function(index) {
								index++;
								return index > itemsPerPage * (pageIndex - 1) && index <= itemsPerPage * pageIndex;
						}));

						table.show();
						beforeFilter = $scope.find("tbody .wpr-table-row");
						beforeFilter.find('.wpr-table-tr-before-remove').each(function() {
							$(this).removeClass('wpr-table-tr-before-remove');
						});

						entryInfo();
				});

				$scope.find('.wpr-table-prev-next').each(function() {
					pageIndex = +$scope.find('.wpr-active-pagination-item').text();

					if ( $(this).hasClass('wpr-table-custom-pagination-prev')) {

						$(this).on('click', function() {

							if ( 1 < pageIndex ) {
								paginationListItems.removeClass('wpr-active-pagination-item');
								pageIndex--;

								paginationListItems.each(function(index) {
									index++;
									if ( index === pageIndex) {
										$(this).addClass('wpr-active-pagination-item');
										pageIndex = +$(this).text();
									}
								});
								adjustPaginationList();
	
								table.html(initialRows.filter(function(index) {
									index++;
									return index > itemsPerPage * (pageIndex - 1) && index <= itemsPerPage * pageIndex;
								}));

								beforeFilter = $scope.find("tbody .wpr-table-row");

								if ( '' == value ) {
									table.html(beforeFilter);
								}
							}

							entryInfo();
						});

					} else {

						$(this).on('click', function() {

							if (  paginationListItems.length > pageIndex ) {
								paginationListItems.removeClass('wpr-active-pagination-item');
								pageIndex++;
								
								paginationListItems.each(function(index) {
									index++;
									if ( index === pageIndex) {
										$(this).addClass('wpr-active-pagination-item');
										pageIndex = +$(this).text();
									}
								});
								adjustPaginationList();
	
								table.html(initialRows.filter(function(index) {
									index++;
									return index > itemsPerPage * (pageIndex - 1) && index <= itemsPerPage * pageIndex;
								}));

								beforeFilter = $scope.find("tbody .wpr-table-row");
													
								if ( '' == value ) {
									table.html(beforeFilter);
								}
							}

							entryInfo();
						});
					}
	
					beforeFilter.find('.wpr-table-tr-before-remove').each(function() {
						$(this).removeClass('wpr-table-tr-before-remove');
					});

				});

			}

			$scope.find('.wpr-table-inner-container').removeClass('wpr-hide-table-before-arrange');

			entryInfo();

			// Table Live Search
			beforeFilter = $scope.find("tbody .wpr-table-row");
			$scope.find(".wpr-table-live-search").keyup(function () {
				if ( this.value !== '' ) {
					$scope.find('.wpr-table-pagination-cont').addClass('wpr-hide-pagination-on-search');
				} else {
					$scope.find('.wpr-table-pagination-cont').removeClass('wpr-hide-pagination-on-search');
				}
				value = this.value.toLowerCase().trim();

				var afterFilter = [];

				initialRows.each(function (index) {
					// if (!index) return; // TODO: restore if better
					$(this).find("td").each(function () {
						var id = $(this).text().toLowerCase().trim();
						var not_found = (id.indexOf(value) == -1);
						// $(this).closest('tr').toggle(!not_found);
						// return not_found;
						if ( !not_found ) {
							afterFilter.push($(this).closest('tr'));
						}
					});
				});

				table.html(afterFilter);

				if ( '' == value ) {
					table.html(beforeFilter);
				}

				entryInfo();
			});

			// Table Sorting
			if ( 'yes' === $scope.find('.wpr-table-inner-container').attr('data-table-sorting') ) {
				$(window).click(function(e) {
					if ( !$(e.target).hasClass('wpr-table-th') && 0 === $(e.target).closest('.wpr-table-th').length ) {
						if ( !$(e.target).hasClass('wpr-active-td-bg-color') && 0 === $(e.target).closest('.wpr-active-td-bg-color').length ) {
							$scope.find('td').each(function() {
								if($(this).hasClass('wpr-active-td-bg-color')) {
									$(this).removeClass('wpr-active-td-bg-color');
								}
							});
						}
					}
				});

				$scope.find('th').click(function(){

					var indexOfTr = $(this).index();

					$scope.find('td').each(function() {
						if($(this).index() === indexOfTr) {
							$(this).addClass('wpr-active-td-bg-color');
						} else {
							$(this).removeClass('wpr-active-td-bg-color');
						}
					});

					$scope.find('th').each(function() {
						$(this).find('.wpr-sorting-icon').html('<i class="fas fa-sort" aria-hidden="true"></i>');
					});

					var table = $(this).parents('table').eq(0);
					var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))

					this.asc = !this.asc
					if ($scope.hasClass('wpr-data-table-type-custom') ? !this.asc : this.asc) {
						if ($scope.hasClass('wpr-data-table-type-custom')) {
							$(this).find('.wpr-sorting-icon').html('<i class="fas fa-sort-down" aria-hidden="true"></i>');
						} else {
							$(this).find('.wpr-sorting-icon').html('<i class="fas fa-sort-up" aria-hidden="true"></i>');
						}
						rows = rows.reverse() 
					} 
	
					if($scope.hasClass('wpr-data-table-type-custom') ? this.asc : !this.asc) {
						
						if ($scope.hasClass('wpr-data-table-type-custom')) {
							$(this).find('.wpr-sorting-icon').html('<i class="fas fa-sort-up" aria-hidden="true"></i>');
						} else {

							$(this).find('.wpr-sorting-icon').html('<i class="fas fa-sort-down" aria-hidden="true"></i>');
						}
					}
	
					for (var i = 0; i < rows.length; i++) {
						table.append(rows[i])
					}
	
					beforeFilter.find('.wpr-table-tr-before-remove').each(function() {
						$(this).closest('.wpr-table-row').next('.wpr-table-appended-tr').remove();
						$(this).removeClass('wpr-table-tr-before-remove');
					});
				});
			}

			if ( $scope.find('.wpr-table-inner-container').attr('data-row-pagination') === 'yes' ) {
				$scope.find('.wpr-table-head-row').prepend('<th class="wpr-table-th-pag" style="vertical-align: middle;">' + '#' + '</th>')
				initialRows.each(function(index) {
						$(this).prepend('<td class="wpr-table-td-pag" style="vertical-align: middle;"><span style="vertical-align: middle;">'+ (index + 1) +'</span></td>')
				})	
			}

			if ( $scope.find('.wpr-table-export-button-cont').length ) {
				var exportBtn = $scope.find('.wpr-table-export-button-cont .wpr-button');;
				exportBtn.each(function() {
					if ( $(this).hasClass('wpr-xls')) {
						$(this).on('click', function() {    
							let table = $scope.find('table');
							TableToExcel.convert(table[0], { // html code may contain multiple tables so here we are refering to 1st table tag
								name: `export.xlsx`, // fileName you could use any name
								sheet: {
									name: 'Sheet 1' // sheetName
								}
							});
						});
					} else if ( $(this).hasClass('wpr-csv')) {
						$(this).on('click', function() {
							htmlToCSV('why-this-arg?', "placeholder.csv", $scope.find('.wpr-data-table'));
						});
					}
				});
			}

			// if('yes' === $scope.find('.wpr-table-inner-container').attr('data-enable-tr-link')) {
			// 	$scope.find('tbody tr:eq('+ $scope.find('.wpr-table-inner-container').attr('data-tr-index') +')').click(function() {
			// 		window.location.href = 'https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage';
			// 		// window.open('https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage', '_blank');
			// 	});
			// }

			function entryInfo() {

				if ( 'yes' !== $scope.find('.wpr-table-inner-container').attr('data-entry-info') ) {
					return;
				}

				var entryPage = +$scope.find('.wpr-active-pagination-item').text(),
					lastEntry = itemsPerPage * entryPage - (itemsPerPage - $scope.find('tbody tr').length),
					firstEntry = lastEntry - $scope.find('tbody tr').length + 1;

				$scope.find('.wpr-entry-info').html('Showing ' + firstEntry + ' to ' + lastEntry + ' of ' + initialRows.length + ' Entries.');
			}

			function adjustPaginationList() {
				
				paginationIndex = $scope.find('.wpr-active-pagination-item').index();
				paginationListItems.each(function(index) {
					if (index == 0 || index == paginationListItems.length - 1 || index <= paginationIndex && index >= paginationIndex - 2) {
						$(this).css('display', 'flex');
					} else {
						$(this).css('display', 'none');
					}
				});
			}
			
			function comparer(index) {
				return function(a, b) {
					var valA = getCellValue(a, index), valB = getCellValue(b, index)
					return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
				}
			}

			function getCellValue (row, index) { 
				return $(row).children('td').eq(index).text() 
			}

			function htmlToCSV(html, filename, view) {
				var data = [];
				var rows = view.find(".wpr-table-row");
						
				for (var i = 0; i < rows.length; i++) {
					var row = [], cols = rows[i].querySelectorAll(".wpr-table-text");
							
					for (var j = 0; j < cols.length; j++) {
							row.push(cols[j].innerText);
					}
					
					data.push(row.join(",")); 		
				}
			
				downloadCSVFile(data.join("\n"), filename);
			}
		
			function downloadCSVFile(csv, filename) {
				var csv_file, download_link;
			
				csv_file = new Blob([csv], {type: "text/csv"});
			
				download_link = document.createElement("a");
			
				download_link.download = filename;
			
				download_link.href = window.URL.createObjectURL(csv_file);
			
				download_link.style.display = "none";
			
				document.body.appendChild(download_link);
			
				download_link.click();
			} // Data Table CSV export

		}, // End widgetDataTable

		// Editor Check
		editorCheck: function() {
			return $( 'body' ).hasClass( 'elementor-editor-active' ) ? true : false;
		},

		// Edith with Elementor - Admin Bar Menu
		changeAdminBarMenu: function() {
			let editLinks = $('#wp-admin-bar-elementor_edit_page-default');

			editLinks.children('li').each(function(){
				let $this = $(this),
					template = $this.children('a').children('span').first().text();

				if ( 0 === template.indexOf('wpr-mega-menu-item') ) {
					$this.remove();
				}
			});
		},
	
	} // End WprElements

	$( window ).on( 'elementor/frontend/init', WprElements.init );

}( jQuery, window.elementorFrontend ) );


// Resize Function - Debounce
(function($,sr){

  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');