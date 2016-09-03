window.onload = function() {

	var triangles = [];

	init();

	function init() {
		var i,
			angle = - Math.PI / 2;

		chaos.init();
		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 32: // space
					subdivide();
					draw();
					break;

				case 80: // p
					chaos.popImage();
					break;

				default: 
					break;
			}
		});

		triangles[0] = [];
		for(i = 0; i < 3; i += 1) {
			triangles[0].push({
				x: chaos.width * .5 + Math.cos(angle) * chaos.height * .5,
				y: chaos.height * .65 + Math.sin(angle) * chaos.height * .5
			});
			angle += Math.PI * 2 / 3;
		}

		draw();
	}

	function draw() {
		var i;

		chaos.clear();
		chaos.context.fillStyle = "rgba(255, 0, 0, 0.5)";
		chaos.context.strokeStyle = "black";
		chaos.context.beginPath();
		for(i = 0; i < triangles.length; i += 1) {
			drawTriangle(triangles[i]);
		}
		chaos.context.stroke();
	}

	function drawTriangle(triangle) {
		chaos.context.moveTo(triangle[0].x, triangle[0].y);
		chaos.context.lineTo(triangle[1].x, triangle[1].y);
		chaos.context.lineTo(triangle[2].x, triangle[2].y);
		chaos.context.lineTo(triangle[0].x, triangle[0].y);

	}

	function subdivide() {
		var i,
			triangle,
			p0, p1, p2, p3, p4, p5;

		for(i = triangles.length - 1; i >= 0; i -= 1) {
			triangle = triangles[i];

			p0 = triangle[0];
			p1 = triangle[1];
			p2 = triangle[2];
			p3 = {
				x: (p0.x + p1.x) * .51,
				y: (p0.y + p1.y) * .5
			};
			p4 = {
				x: (p1.x + p2.x) * .5,
				y: (p1.y + p2.y) * .51
			};
			p5 = {
				x: (p2.x + p0.x) * .49,
				y: (p2.y + p0.y) * .51
			};
			triangles.push([p0, p3, p5]);
			triangles.push([p3, p1, p4]);
			triangles.push([p5, p4, p2]);

			triangles.splice(i, 1);
		}
	}

}
