window.onload = function() {
	var points = [],
		numPoints = 3,
		r = .5,
		pointSize = 1,
		currentPoint,
		interval;


	init();

	function init() {

		chaos.init();

		doTransforms();

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					chaos.popImage();
					break;

				default: 
					break;
			}
		});

	}

	function doTransforms() {
		drawSquare("default");

		doScale();
		doRotate();
		doTranslate();
		doRotateTranslate();
		doTranslateRotate();
	}

	function doScale() {
		// scale by 2 on the x-axis and 3 on the y-axis
		chaos.context.setTransform(
			2, 0, 
			0, 3, 
			0, 0
		);
		drawSquare("scaled");
	}

	function doRotate() {
		// rotate 22.5 degrees (Math.PI / 8 radians)
		var angle = Math.PI / 8;
		chaos.context.setTransform(
			 Math.cos(angle), Math.sin(angle),
			-Math.sin(angle), Math.cos(angle),
			 0,               0
		);
		drawSquare("rotated");
	}

	function doTranslate() {
		// translate 300 on x-axis, 200 on y-axis
		chaos.context.setTransform(
			  1,   0,
			  0,   1,
			300, 200
		);
		drawSquare("translated");
	}

	function doRotateTranslate() {
		// rotate 22.5 degrees (Math.PI / 8 radians)
		var angle = Math.PI / 8;
		chaos.context.setTransform(
			 Math.cos(angle), Math.sin(angle),
			-Math.sin(angle), Math.cos(angle),
			 0,               0
		);

		// translate 300 on x-axis
		chaos.context.transform(
			  1,   0,
			  0,   1,
			300,   0
		);
		drawSquare("rot + trans");

	}

	function doTranslateRotate() {
		// translate 300 on x-axis
		chaos.context.setTransform(
			  1,   0,
			  0,   1,
			300,   0
		);

		// rotate 22.5 degrees (Math.PI / 8 radians)
		var angle = Math.PI / 8;
		chaos.context.transform(
			 Math.cos(angle), Math.sin(angle),
			-Math.sin(angle), Math.cos(angle),
			 0,               0
		);
		drawSquare("trans + rot");

	}
	
	function drawSquare(label) {
		chaos.context.beginPath();
		chaos.context.rect(10, 10, 100, 100);
		chaos.context.stroke();

		chaos.context.font = "20px Arial";
		chaos.context.fillText(label, 20, 30);
	}
}
