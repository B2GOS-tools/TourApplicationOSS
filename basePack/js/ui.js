// Common UI interactions
(function(){

	uiHandlers = function() {

		// Check for touchable mobile devices
		isTouch = ("ontouchstart" in window && navigator.userAgent.search("Mobile") != -1);
		dom = {};
		dom.context = document.getElementById("canvas");
		dom.loading = document.getElementById("loading");

		function bindEvents() {
			dom.loading.classList.add("hidden");
			dom.play = document.querySelectorAll(".play");
			dom.pause = document.querySelectorAll(".pause");

			// Initialize slider
			Slider();

			// Play video
			for (var i = 0; i < dom.play.length; i++) {
				dom.play[i].addEventListener("click", function() {
					uiHandlers.playVideo(this);
				});
			}

			// Pause video
			for (var i = 0; i < dom.pause.length; i++) {
				dom.pause[i].addEventListener("click", function() {
					uiHandlers.finishVideo(this);
				});
			}
		}

		function createSlides(media) {
	  	  	var slides = [];

  	  		var local = utils.config.load(configuration.localSlides+"/slides.json");
		    	local.onload = function(data) {
		  	  	// Local slides
		    		for (var i = 0; i < data.length; i++) {
		    			slides.push(configuration.localSlides+"/"+data[i]);
		    		}

		    		// Remote slides
				if (media) {
				      Object.keys(media).forEach(function(imgSrc) {
				      	slides.push(window.URL.createObjectURL(media[imgSrc]));
				      });
				      window.console.log('Commercials loaded!!!!');
			    	}

			      // Create slides, then set dom stuff
				Variant.createSlides(slides, function() {
					bindEvents();
				});
		    	}

		}

		commercials.init(function() {
		    window.console.log('loaded', commercials.start);
		    commercials.get(function(commercialImgs) {
		    	createSlides(commercialImgs);
		    }, function(error) {
		  	console.log("Descriptor not loaded using local slides")
		  	createSlides();
		  });
		  });

		commercials.onimgsupdated = function() {
			commercials.getNew(function(commercialImgs) {
				createSlides(commercialImgs);
			});
		}

	}

  uiHandlers.playVideo = function(trigger) {
    clearTimeout(Slider.repeat);
    var video = trigger.parentNode.querySelector("video");
    trigger.parentNode.classList.add("active");
    video.play();
  };

  uiHandlers.finishVideo = function(trigger) {
    var video = trigger.parentNode.querySelector("video");
    video.pause();
    trigger.parentNode.classList.remove("active");
    Slider.pausePlay();
  };

})();

