window.onload = function() {
	var	imageData,
		minR = -2,
		maxR = 1,
		minI = -1.2,
		maxI = 1.2,
		maxIter = 2000,
		dr, di,
		aspectRatio,
		counts = {},
		renderCount = 0,
		maxCount = 100000000,
		size;

	init();

	function init() {

		chaos.init();
		chaos.setSize(1200, 800);
		size = chaos.width * chaos.height;
		aspectRatio = chaos.width / chaos.height;
		imageData = chaos.context.getImageData(0, 0, chaos.width, chaos.height);
		chaos.context.fillStyle = "#cccccc";
		chaos.context.fillRect(0, 0, chaos.width, 5);
		chaos.context.fillStyle = "#000000";
		render();

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

	function render() {
		adjustWidth();
		dr = (maxR - minR) / chaos.width;	// one pixel's width on complex plane
		di = (maxI - minI) / chaos.height;	// one pixel's height on complex plane

		interval = setInterval(function() {
			console.log(renderCount);
			for(var i = 0; i < 10000; i += 1) {
				mandel();
			}
		}, 0);
	}

	function adjustWidth() {
		var w = maxR - minR,		// width on complex plane
			h = maxI - minI,		// height on complex plane
			newW = h * aspectRatio,	// width with correct aspect ratio
			diff = newW - w;		// difference to equal new width

		minR -= diff / 2;			// add half difference to left
		maxR += diff / 2;			// and half to right
	}

	function mandel() {
		var cr = minR + Math.random() * (maxR - minR),
			ci = minI + Math.random() * (maxI - minI),
			zr = 0,
			zi = 0,
			x, y, index, i, zr1, zi1,
			tempCounts = {};

		if(renderCount > maxCount) {
			clearInterval(interval);
			renderBuddha();
			return;
		}
		renderCount += 1;
		chaos.context.fillRect(0, 0, chaos.width * renderCount / maxCount, 5);
		for(iter = 0; iter < maxIter; iter += 1) {
			zr1 = zr * zr - zi * zi + cr;
			zi1 = 2 * zr * zi + ci;
			zr = zr1;
			zi = zi1;
			if(zr * zr + zi * zi > 4) {
				for(i in tempCounts) {
					counts[i] = (counts[i] || 0) + tempCounts[i];
				}
				return;
			}
			x = Math.round((zr - minR) / dr);
			y = Math.round((zi - minI) / di);
			index = y * chaos.width + x;
			tempCounts[index] = (tempCounts[index] || 0) + 1;
		}


	}

	function renderBuddha() {
		console.log("rendering buddha");
		var max = 0;
		for(var i = 0; i < size; i += 1) {
			if(counts[i] > max) {
				max = counts[i];
			}
		}
		for(i = 0; i < size; i += 1) {
			var index = i * 4,
				shade = Math.floor((counts[i] || 0) / max * 255);

			imageData.data[index    ] = shade;
			imageData.data[index + 1] = shade;
			imageData.data[index + 2] = shade;
			imageData.data[index + 3] = 255;
		}

		chaos.context.putImageData(imageData, 0, 0);
	}
}
