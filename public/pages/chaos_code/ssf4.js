window.onload = function() {
	var maxDepth = 0,
		numShapes = 3,
		angles = [
			Math.random() * Math.PI * 2,
			Math.random() * Math.PI * 2,
			Math.random() * Math.PI * 2
		],
		size = 0,
		dist = 0,
		scaleFactor = .6,
		colors = [
			"#CC0000",
			"#CC6600",
			"#CCCC00",
			"#66CC00",
			"#00CC00",
			"#00CC66",
			"#00CCCC",
			"#0066CC",
			"#0000CC"
		];

	init();

	function init() {

		chaos.init();

		size = chaos.height / 10;
		dist = [
			size * Math.random() * 3 + 1,
			size * Math.random() * 3 + 1,
			size * Math.random() * 3 + 1
		];

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
			chaos.context.translate(dist[i], 0);
			chaos.context.scale(scaleFactor, scaleFactor);
			drawShape(depth);
			if(depth > 0) {
				iterate(depth - 1);
			}
			chaos.context.restore();
		}
	}

	function drawShape(depth) {
		chaos.context.fillStyle = colors[maxDepth - depth];
		///// circle:
		chaos.context.beginPath();
		chaos.context.arc(0, 0, size, 0, Math.PI * 2, false);
		chaos.context.fill();

		///// rect:
		// chaos.context.beginPath();
		// chaos.context.rect(-size, -size / 4, size * 2, size / 2);
		// chaos.context.fill();

		///// cross:
		// chaos.context.beginPath();
		// chaos.context.lineWidth = 3;
		// chaos.context.moveTo(-size, -size);
		// chaos.context.lineTo(size, size);
		// chaos.context.moveTo(-size, size);
		// chaos.context.lineTo(size, -size);
		// chaos.context.stroke();

		///// random letter:
		// chaos.context.font = (size * 3) + "px Arial";
		// var letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
		// chaos.context.fillText(letter, 0, 0);

		///// word:
		// chaos.context.font = size + "px Arial";
		// chaos.context.fillText("fractal", 0, 0);

	}
}
