$(document).ready(function() {

	/*============================================
	ScrollTo Links
	==============================================*/
	$('a.scrollto').click(function(e){
		$('html,body').scrollTo(this.hash, this.hash, {gap:{y:-80}});
		e.preventDefault();

		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});

	/*============================================
	Header Functions
	==============================================*/

	// resize jumbotron

	var jtfs = $('.home-slider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: false,
		direction: "vertical",
		slideshowSpeed: 1500,
		animationSpeed: 1000,
		smoothHeight: true
	});
	var jtfs2 = $('.citations-slider').flexslider({
		animation: "fade",
		directionNav: false,
		controlNav: false,
		slideshowSpeed: 6000,
		animationSpeed: 1000,
		smoothHeight: true
	});

	/*============================================
	Resize Functions
	==============================================*/
	$(window).resize(function(){
		// resize jumbotron
		$('.message-box').css({'marginTop':$(window).height()*0.6});
		scrollSpyRefresh();
		waypointsRefresh();
	});

	/*============================================
	Project Hover mask on IE
	==============================================*/
	$('.no-csstransitions .hover-mask').hover(
		function() {
			$( this ).stop(true,true).animate({opacity: 1});
		}, function() {
			$( this ).stop(true,true).animate({opacity: 0});
		}
	);
	
	/*============================================
	Placeholder Detection
	==============================================*/
	if (!Modernizr.input.placeholder) {
		$('#contact-form').addClass('no-placeholder');
	}

	/*============================================
	Scrolling Animations
	==============================================*/
	$('.scrollimation').waypoint(function(){
		$(this).toggleClass('in');
	},{offset:'90%'});

	/*============================================
	Refresh scrollSpy function
	==============================================*/
	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
	}

	/*============================================
	Refresh waypoints function
	==============================================*/
	function waypointsRefresh(){
		setTimeout(function(){
			$.waypoints('refresh');
		},1000);
	}

	/*============================================
	Display Google Map
	==============================================*/
	function displayMap(){
		if($('.map').length > 0) {

			$('.map').each(function(i,e){
				$map = $(e);
				$map_id = $map.attr('id');
				$map_lat = $map.attr('data-mapLat');
				$map_lon = $map.attr('data-mapLon');
				$map_zoom = parseInt($map.attr('data-mapZoom'));
				$map_title = $map.attr('data-mapTitle');
				
				var latlng = new google.maps.LatLng($map_lat, $map_lon);			
				var options = { 
					scrollwheel: false,
					draggable: false, 
					zoomControl: false,
					disableDoubleClickZoom: false,
					disableDefaultUI: true,
					zoom: $map_zoom,
					center: latlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				var styles = [ 
								{
								  stylers: [
									{ hue: "#2F3238" },
									{ saturation: -20 }
								  ]
								}, {
									featureType: "road",
									elementType: "geometry",
									stylers: [
										{ lightness: 100 },
										{ visibility: "simplified" }
								  ]
								}, {
									featureType: "road",
									elementType: "labels",
									stylers: [
										{ visibility: "off" }
								  ]
								}
							];
				
				var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
				
				var map = new google.maps.Map(document.getElementById($map_id), options);
			
				var image = 'assets/marker.png';
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					title: $map_title,
					icon: image
				});
				
				map.mapTypes.set('map_style', styledMap);
	  			map.setMapTypeId('map_style');
				
				var contentString = '<p><strong>Delphine Lissajoux</strong><br>9, avenue Frederic Le Play, 87110 Le Vigen</p>';
	       
				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});
				
				google.maps.event.addListener(marker, 'click', function() {
	      			infowindow.open(map,marker);
	    		});

			});
		}	
	}

	$('.panel-heading a').on('click',function(e){
	    if($(this).parents('.panel').children('.panel-collapse').hasClass('in')){
			e.stopPropagation();
		}
	});

});	