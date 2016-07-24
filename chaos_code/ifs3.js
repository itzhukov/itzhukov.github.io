window.onload = function() {
	var table = [
		// fern
		// [ 0,     0, 	0,    0.16, 0, 0,    0.01],
		// [ 0.85,  0.04, -0.04, 0.85, 0, 1.6,  0.85],
		// [ 0.2,  -0.26,  0.23, 0.22, 0, 1.6,  0.07],
		// [-0.15,  0.28,  0.26, 0.24, 0, 0.44, 0.07]];

		// tree
		// [ 0,     0, 	0,    0.50, 0, 0,   0.05],
		// [ 0.42, -0.42,  0.42, 0.42, 0, 0.2, 0.4 ],
		// [ 0.42,  0.42, -0.42, 0.42, 0, 0.2, 0.4 ],
		// [-0.10,  0,     0,    0.1,  0, 0.2, 0.15]];

		// tree 2
		[ 0.05,  0,      0,     0.6,   0, 0,   0.17],
		[ 0.05,  0,      0,    -0.5,   0, 1,   0.17],
		[ 0.46, -0.321,  0.386, 0.383, 0, 0.6, 0.17],
		[ 0.47, -0.154,  0.171, 0.423, 0, 1.1, 0.17],
		[ 0.433, 0.275, -0.25,  0.476, 0, 1,   0.16],
		[ 0.421, 0.257, -0.353, 0.306, 0, 0.7, 0.16]];

		// sierpinski
		// [0.5, 0, 0, 0.5,  1,  1, 0.33],
		// [0.5, 0, 0, 0.5,  1, 50, 0.33],
		// [0.5, 0, 0, 0.5, 50, 50, 0.34]];

	var currentPoint,
		scale = 750,
		pointSize = .5 / scale,
		interval;


	init();

	function init() {

		chaos.init();

		chaos.context.translate(chaos.width / 2, chaos.height);
		chaos.context.scale(scale, -scale);

		currentPoint = {
			x: Math.random() * 2 - 1,
			y: Math.random() * 2 - 1
		};

		setPoint(currentPoint);

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 32: // space
					nextPoint();
					break;

				case 187: // +
					clearInterval(interval);
					interval = setInterval(function() {
						for(var i = 0; i < 10; i += 1) {
							nextPoint();
						}
					}, 0);
					break;

				case 189: // -
					clearInterval(interval);
					break;

				case 80: // p
					chaos.popImage();
					break;

				default: 
					break;
			}
		});
	}

	function nextPoint() {
		var t = getRandomTransform(),
			x = currentPoint.x * t[0] + currentPoint.y * t[1] + t[4];
			y = currentPoint.x * t[2] + currentPoint.y * t[3] + t[5];
		currentPoint.x = x;
		currentPoint.y = y;
		setPoint(currentPoint);
	}

	function getRandomTransform() {
		var randomNumber = Math.random();
		for(var i = 0; i < table.length; i += 1) {
			var row = table[i];
			if(randomNumber <= row[6]) {
				// chaos.context.fillStyle = ["red", "green", "blue", "black"][i];
				return row;
			}
			randomNumber -= row[6];
		}
}


	function setPoint(p) {
		chaos.context.beginPath();
		chaos.context.arc(p.x, p.y, pointSize, 0, Math.PI * 2, false);
		chaos.context.fill();
	}

}
