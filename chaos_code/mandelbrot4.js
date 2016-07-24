window.onload = function() {
	var	currentX = 0, 
		imageData,
		stripWidth = 50,
		minR = -2,
		maxR = 1,
		minI = -1.4,
		maxI = 1.4,
		maxIter = 100,
		interval,
		dr, di,
		aspectRatio,
		zoomDiv,
		zoomX,
		zoomY,
		colors,
		colorA = [255, 196, 0],
		colorB = [0, 0, 0],
		numColors = 20;

	init();

	function init() {

		chaos.init();

		initColors();
		zoomDiv = document.getElementById("zoom");
		aspectRatio = chaos.width / chaos.height;
		imageData = chaos.context.getImageData(0, 0, chaos.width, chaos.height);
		renderFull();

		document.body.addEventListener("mousedown", onMouseDown);

		document.body.addEventListener("keyup", function(event) {
			// console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					chaos.popImage();
					break;

				case 38: // up
					maxIter += 20;
					clearInterval(interval);
					renderFull();
					break;

				case 40: // down
					maxIter -= 20;
					clearInterval(interval);
					renderFull();
					break;

				case 67: // c
					clearInterval(interval);
					randomizeColors();
					renderFull();
					break;

				case 90: // z
					clearInterval(interval);
					numColors -= 2;
					numColors = Math.max(numColors, 2);
					initColors();
					renderFull();
					break;

				case 88: // x
					clearInterval(interval);
					numColors += 2;
					initColors();
					renderFull();
					break;

				case 71: // g
					clearInterval(interval);
					grayScale();
					renderFull();
					break;

				default: 
					break;
			}
		});
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
		};

		maxR = minR + dr * x;
		maxI = minI + di * y;
		minR = minR + dr * zoomX;
		minI = minI + di * zoomY;
		renderFull();
	}

	function randomizeColors() {
		colorA = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
		colorB = [Math.random() * 32, Math.random() * 32, Math.random() * 32];
		initColors();
	}

	function grayScale() {
		colorA = [255, 255, 255];
		colorB = [0, 0, 0];
		initColors();
	}

	function initColors() {
		var redRange = colorB[0] - colorA[0],
			greenRange = colorB[1] - colorA[1],
			blueRange = colorB[2] - colorA[2];
			
		colors = [];
		for(i = 0; i < numColors; i += 1) {
			colors.push({
				red: colorA[0] + Math.floor(redRange / numColors * i),
				green: colorA[1] + Math.floor(greenRange / numColors * i),
				blue: colorA[2] + Math.floor(blueRange / numColors * i)
			})
		}
	}

	function renderFull() {
		currentX = 0;
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
			iter, zr1, zi1;

		for(iter = 0; iter < maxIter; iter += 1) {
			zr1 = zr * zr -  zi * zi + cr;
			zi1 = 2 * zr * zi + ci;
			zr = zr1;
			zi = zi1;
			if(zr * zr + zi * zi > 4) {
				return colors[iter % numColors];
			}
		}

		return {
			red: 0,
			green: 0,
			blue: 0
		}
	}
}
