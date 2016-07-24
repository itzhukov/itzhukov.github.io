window.onload = function() {
	var p = 0.5,
		minR = 2,
		maxR = 4,
		minP = 0,
		maxP = 1,
		dr, dp,
		x,
		interval,
		zoomDiv,
		zoomX,
		zoomY,
		maxIter = 200;


	init();

	function init() {

		chaos.init();

		zoomDiv = document.getElementById("zoom");
		renderFull();

		document.body.addEventListener("mousedown", onMouseDown);


		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					chaos.popImage();
					break;

				case 38: // up
					clearInterval(interval);
					maxIter += 500;
					renderFull();
					break;

				case 40: // down
					clearInterval(interval);
					maxIter += 100;
					renderFull();
					break;

				default: 
					break;
			}
		});
	}

	function renderFull() {
		chaos.clear();
		x = 0;
		dr = (maxR - minR) / chaos.width;	// one pixel's width on complex plane
		dp = (maxP - minP) / chaos.height;	// one pixel's height on complex plane
		interval = setInterval(iterate, 0);
	}

	function iterate() {
		p = .5;
		for(var i = 0; i < maxIter; i += 1) {
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

	function onMouseDown(event) {
		clearInterval(interval);
		zoomX = event.clientX;
		zoomY = event.clientY;
		zoomDiv.style.left = zoomX + "px";
		zoomDiv.style.top = zoomY + "px";
		document.body.addEventListener("mousemove", onMouseMove);
		document.body.addEventListener("mouseup", onMouseUp);
	}

	function onMouseMove(event) {
		zoomDiv.style.width = event.clientX - zoomX + "px";
		zoomDiv.style.height = event.clientY - zoomY + "px";
	}

	function onMouseUp(event) {
		var x = event.clientX,
			y = event.clientY;

		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
		zoomDiv.style.width = "0px";
		zoomDiv.style.height = "0px";
		if(x < zoomX || y < zoomY) {
			return;
		}

		maxR = minR + dr * x;
		maxP = minP + dp * (chaos.height - zoomY);
		minR = minR + dr * zoomX;
		minP = minP + dp * (chaos.height - y);

		console.log(minP, maxP);
		console.log(minR, maxR);
		renderFull();
	}

}
