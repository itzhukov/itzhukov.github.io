window.onload = function() {
	var points = [],
		offset = 0,
		scaleFactor = .45;

	init();

	function init() {

		chaos.init();

		offset = chaos.height / 2;

		points.push({
			x: Math.random() * chaos.width,
			y: 0
		});

		points.push({
			x: Math.random() * chaos.width,
			y: chaos.height
		});

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
		chaos.clear("black");
		chaos.context.strokeStyle = "rgb(220, 200, 255)";
		chaos.context.lineWidth = 4;
		chaos.context.shadowColor = "rgb(255, 255, 255)";
		chaos.context.shadowOffsetX = 0;
		chaos.context.shadowOffsetY = 0;
		chaos.context.shadowBlur = 20;
		chaos.context.beginPath();
		chaos.context.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < points.length; i += 1) {
			chaos.context.lineTo(points[i].x, points[i].y);
		}
		chaos.context.stroke();
	}

	function iterate() {
		for(var i = points.length - 1; i > 0; i -= 1) {
			var p0 = points[i],
				p1 = points[i - 1],
				newPoint = {
					x: (p0.x + p1.x) / 2,
					y: (p0.y + p1.y) / 2
				};

			newPoint.x += Math.random() * offset * 2 - offset;
			newPoint.y += Math.random() * offset * 2 - offset;
			points.splice(i, 0, newPoint);
		}

		offset *= scaleFactor;
	}
}
