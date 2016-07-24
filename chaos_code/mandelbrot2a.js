window.onload = function() {
	var	currentX = 0, 
		imageData,
		stripWidth = 50,
		minR = -2,
		maxR = 1,
		minI = -1.2,
		maxI = 1.2,
		interval,
		newMinR, newMinI,
		dr, di,
		aspectRatio,
		zoomDiv,
		zoomX,
		zoomY;

	init();

	function init() {
		zoomDiv = document.getElementById("zoom");
		chaos.init();

		aspectRatio = chaos.width / chaos.height;
		imageData = chaos.context.getImageData(0, 0, chaos.width, chaos.height);
		renderFull();

		document.body.addEventListener("keyup", function(event) {
			// console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					chaos.popImage();
					break;

				default: 
					break;
			}
		});

		document.body.addEventListener("mousedown", function(event) {
			clearInterval(interval);
			zoomX = event.clientX;
			zoomY = event.clientY;
			newMinR = minR + dr * zoomX;
			newMinI = minI + di * zoomY;
			zoomDiv.style.left = zoomX + "px";
			zoomDiv.style.top = zoomY + "px";
			document.body.addEventListener("mousemove", onMouseMove);
		});

		document.body.addEventListener("mouseup", function(event) {
			var x = event.clientX,
				y = event.clientY;
			document.body.removeEventListener("mousemove", onMouseMove);
			zoomDiv.style.width = "0px";
			zoomDiv.style.height = "0px";
			maxR = minR + dr * x;
			maxI = minI + di * y;
			if (maxR < newMinR || maxI < newMinI) {
				return;
			};
			minR = newMinR;
			minI = newMinI;
			console.log(minI, maxI, minR, maxR);
			currentX = 0;
			adjustWidth();
			renderFull();
		});


	}

	function onMouseMove(event) {
		zoomDiv.style.width = event.clientX - zoomX + "px";
		zoomDiv.style.height = event.clientY - zoomY + "px";
	}

	function renderFull() {
		adjustWidth();
		dr = (maxR - minR) / chaos.width;	// one pixel's width on complex plane
		di = (maxI - minI) / chaos.height;	// one pixel's height on complex plane

		interval = setInterval(renderStrip, 0);
	}

	function adjustWidth() {
		var w = maxR - minR,		// width on complex plane
			h = maxI - minI,		// height on complex plane
			newW = h * aspectRatio,	// width with correct aspect ratio
			diff = newW - w;		// difference to equal new width

		minR -= diff / 2;			// add half difference to left
		maxR += diff / 2;			// and half to right
	}

	function renderStrip() {
		var x, y, h, color, index,
			w4 = chaos.width * 4,
			iData = imageData.data;
		
		// work across the strip horizontally
		for(x = currentX; x < currentX + stripWidth; x += 1) {
			index = x * 4;
			// render all the pixels in this vertical column
			for(y = 0, h = chaos.height; y < h; y += 1) {
				color = mandel(x, y);
				iData[index    ] = color.red;
				iData[index + 1] = color.green;
				iData[index + 2] = color.blue;
				iData[index + 3] = 255;
				index += w4;
			}
			if(x > chaos.width) {
				clearInterval(interval);
				break;
			}
		}
		chaos.context.putImageData(imageData, 0, 0, currentX, 0, stripWidth, chaos.height);
		currentX += stripWidth;
	}

	function mandel(x, y) {
		var cr = minR + x * dr,
			ci = minI + y * di,
			zr = 0,
			zi = 0,
			maxIter = 100,
			i, zr1, zi1;

		for(iter = 0; iter < maxIter; iter += 1) {
			zr1 = zr * zr - zi * zi + cr;
			zi1 = 2 * zr * zi + ci;
			zr = zr1;
			zi = zi1;
			if(zr * zr + zi * zi > 4) {
				var shade = 255 - Math.floor(iter / maxIter * 255);
				return {
					red: shade,
					green: shade,
					blue: shade
				}
			}
		}

		return {
			red: 0,
			green: 0,
			blue: 0
		}


	}


}
