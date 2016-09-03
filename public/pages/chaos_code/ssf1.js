window.onload = function() {
	var maxDepth = 0,
		numShapes = 3,
		angles = [
			0,					// 0 degrees
			Math.PI * 2 / 3,	// 120 degrees
			Math.PI * 4 / 3 	// 240 degrees
		],
		size = 0,
		dist = 0, 
		scaleFactor = .6;

	init();

	function init() {

		chaos.init();

		size = chaos.height / 8;
		dist = size * 1.5;

		draw();

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 32: // space
					maxDepth += 1;
					draw();
					break;

				case 80: // p
					chaos.popImage();
					break;

				default: 
					break;
			}
		});


	}

	function draw() {
		chaos.clear();
		chaos.context.save();
		chaos.context.translate(chaos.width * 0.5, chaos.height * 0.5);
		drawShape();
		iterate(maxDepth);
		chaos.context.restore();		
	}

	function iterate(depth) {
		for(var i = 0; i < numShapes; i += 1) {
			chaos.context.save();
			chaos.context.rotate(angles[i]);
			chaos.context.translate(dist, 0);
			chaos.context.scale(scaleFactor, scaleFactor);
			drawShape();
			if(depth > 0) {
				iterate(depth - 1);
			}
			chaos.context.restore();
		}
	}

	function drawShape() {
		chaos.context.fillStyle = "rgba(0, 0, 0, .5)";
		chaos.context.beginPath();
		chaos.context.arc(0, 0, size, 0, Math.PI * 2, false);
		chaos.context.fill();
	}
}
