window.onload = function() {
	var	currentX = 0, 
		imageData,
		stripWidth = 50,
		minR = -2,
		maxR = 1,
		minI = -1.2,
		maxI = 1.2,
		maxIter = 100,
		interval,
		dr, di,
		aspectRatio;

	init();

	function init() {

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
