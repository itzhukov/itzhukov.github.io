window.onload = function() {
	var table = [];
	var percent = 1,
		a, b, c, d, tx, ty, p;
	for(var i = 0; i < 4; i += 1) {
		a = Math.round((Math.random() * 2 - 1) * 100) / 100;
		b = Math.round((Math.random() * 2 - 1) * 100) / 100;
		c = Math.round((Math.random() * 2 - 1) * 100) / 100;
		d = Math.round((Math.random() * 2 - 1) * 100) / 100;
		tx = Math.round((Math.random() * 4 - 2) * 100) / 100;
		ty = Math.round((Math.random() * 4 - 2) * 100) / 100;
		if(i < 3) {
			p = Math.round(Math.random() * percent * 100) / 100;
			percent -= p;
		}
		else {
			p = Math.round(percent * 100) / 100;
		}
		table.push([a, b, c, d, tx, ty, p]);
		console.log("[" + [a, b, c, d, tx, ty, p].join(", ") + "]");
	}
	var currentPoint,
		scale = 70,
		pointSize = .5 / scale,
		interval;


	init();

	function init() {

		chaos.init();

		chaos.context.translate(chaos.width / 2, chaos.height / 2);
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
				chaos.context.fillStyle = ["red", "green", "blue", "orange"][i];
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
