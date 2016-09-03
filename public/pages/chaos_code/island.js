window.onload = function() {
	var points = [],
		offset = 0,
		scaleFactor = .6;

	init();

	function init() {
		chaos.init();

		var initialPoints = 8,
			radius = chaos.height / 3,
			angle = 0;

		offset = chaos.height / 6;

		for(var i = 0; i < initialPoints; i += 1) {
			angle = Math.PI * 2 / initialPoints * i;
			points.push({
				x: Math.cos(angle) * radius,
				y: Math.sin(angle) * radius
			});
		}

		// put the first point back into the array as the last point
		points.push(points[0]);

		drawCoast();

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 32: // space
					iterate();
					drawCoast();
					break;

				case 80: // p
					chaos.popImage();
					break;

				default: 
					break;
			}
		});


	}

	function drawCoast() {
		chaos.clear("#0033CC");
		chaos.context.save();
		chaos.context.translate(chaos.width / 2, chaos.height / 2);
		chaos.context.fillStyle = "#00CC00";
		chaos.context.beginPath();
		chaos.context.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < points.length; i += 1) {
			chaos.context.lineTo(points[i].x, points[i].y);
		}
		chaos.context.fill();
		chaos.context.restore();
	}

	function iterate() {
		var newPoints = [];
		for(var i = 0; i < points.length - 1; i += 1) {
			var p0 = points[i],
				p1 = points[i + 1],
				newPoint = {
					x: (p0.x + p1.x) / 2,
					y: (p0.y + p1.y) / 2
				};

			newPoint.x += Math.random() * offset * 2 - offset;
			newPoint.y += Math.random() * offset * 2 - offset;
			newPoints.push(p0, newPoint);
		}
		newPoints.push(points[points.length - 1]);
		points = newPoints;
		offset *= scaleFactor;
	}
}
