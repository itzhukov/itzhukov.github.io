window.onload = function() {
	var maxDepth = 0,
		angles = [
			-Math.PI / 2 * Math.random(),
			Math.PI / 2 * Math.random()
		],
		baseSize = 0;

	init();

	function init() {

		chaos.init();

		baseSize = chaos.height * .8;
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
		drawTree(maxDepth, baseSize, 0);
		chaos.context.restore();		
	}

	function drawTree(depth, size, angle) {
		// draw trunk
		chaos.context.save();
		chaos.context.rotate(angle);
		chaos.context.beginPath();
		chaos.context.moveTo(0, 0);
		chaos.context.lineTo(0, -size / 2);
		chaos.context.stroke();
		chaos.context.translate(0, -size / 2);

		if(depth === 0) {
			// we're done. draw branches.
			drawBranch(size / 2, angles[0]);
			drawBranch(size / 2, angles[1]);
		}
		else {
			// more iteration to be done. 
			// draw two mini trees instead of branches.
			drawTree(depth - 1, size / 2, angles[0]);
			drawTree(depth - 1, size / 2, angles[1]);
		}
		chaos.context.restore();
	}

	function drawBranch(size, angle) {
		chaos.context.save();
		chaos.context.rotate(angle);
		chaos.context.beginPath();
		chaos.context.moveTo(0, 0);
		chaos.context.lineTo(0, -size);
		chaos.context.stroke();
		chaos.context.restore();
	}

}
