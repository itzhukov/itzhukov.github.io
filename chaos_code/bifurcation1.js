window.onload = function() {
	var p = 0.5,
		minR = 2,
		maxR = 4,
		minP = 0,
		maxP = 1,
		dr, dp,
		interval,
		x;


	init();

	function init() {

		chaos.init();

		renderFull();

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					chaos.popImage();
					break;

				default: 
					break;
			}
		});
	}

	function renderFull() {
		chaos.clear();
		x = 0;
		dr = (maxR - minR) / chaos.width;	// one pixel's width on the r axis
		dp = (maxP - minP) / chaos.height;	// one pixel's height on the p axis
		interval = setInterval(iterate, 0);
	}

	function iterate() {
		p = .5;
		for(var i = 0; i < 200; i += 1) {
			oneYear(i);
		}
		x += 1;
		if(x >= chaos.width) {
			clearInterval(interval);
		}
	}

	function oneYear(year) {
		var r = minR + x * dr,
			y;
		p = p * r * (1 - p);
		if(year > 100) {
			y = chaos.height - (p - minP) / dp;
			chaos.context.fillRect(x, y, 1, 1);
		}

	}

}
