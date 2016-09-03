window.onload = function() {
	var maxDepth = 0,
		angle = Math.random() * Math.PI / 2,
		baseSize = 0;

	init();

	function init() {

		chaos.init();

		baseSize = chaos.height * .2;
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
		chaos.context.lineWidth = 2;
		chaos.context.save();
		chaos.context.translate(chaos.width * 0.5, chaos.height * 0.9);

		// move a bit to the left to ensure the tree is centered
		chaos.context.translate(-baseSize / 2, 0);
		drawPyTree(maxDepth, baseSize, 0);
		chaos.context.restore();		
	}

	function drawPyTree(depth, size) {
		angle = Math.random() * Math.PI / 2;
		chaos.context.save();

		// draw trunk
		drawSquare(size);

		// calculate sizes of two branches
		var branch0Size = size * Math.cos(angle);
		var branch1Size = size * Math.sin(angle);

		// move to top left of big square.
		// rotate and draw branch 0
		chaos.context.translate(0, -size);
		chaos.context.rotate(-angle);
		if(depth === 0) {
			drawSquare(branch0Size);
		}
		else {
			drawPyTree(depth - 1, branch0Size);
		}

		// move to bottom right of branch 0
		// rotate 90 and draw branch 1
		chaos.context.translate(branch0Size, 0);
		chaos.context.rotate(Math.PI / 2);
		if(depth === 0) {
			drawSquare(branch1Size);
		}
		else {
			drawPyTree(depth - 1, branch1Size);
		}
		chaos.context.restore();
	}

	function drawSquare(size) {
		chaos.context.beginPath();
		chaos.context.rect(0, 0, size, -size);
		chaos.context.fill();
	}

}
