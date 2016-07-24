window.onload = function() {
	var x, y, z, a, b, c,
		scale = 8,
		points = [],
		numPoints = 5000;


	init();

	function init() {

		chaos.init();
		chaos.context.lineWidth = 0.35;

		x = Math.random() - 5;
		y = Math.random() - 5;
		z = Math.random() - 5;

		a = .1;
		b = .1;
		c = 14;

		createPoints();
		requestAnimationFrame(display);


		document.body.addEventListener("keyup", function(event) {
			// console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					chaos.popImage();
					break;

				default: 
					break;
			}
		});
	}

	function createPoints() {
		for(var i = 0; i < numPoints; i += 1) {
			rossler();
			points.push({
				x: x,
				y: y,
				z: z
			});
		}
	}

	function display() {
		var p,
			pers,
			fl = 300,
			sx, sy;

		chaos.clear();
		chaos.context.save();
		chaos.context.translate(chaos.width *.5, chaos.height * .5);

		for(var i = 0; i < numPoints; i += 1) {
			p = points[i];
			rotate(p);
			pers = fl / (fl + p.z);
			sx = p.x * pers * scale;
			sy = p.y * pers * scale;
			chaos.context.fillRect(sx, sy, pers * 2, pers * 2);
		}
		chaos.context.restore();
		requestAnimationFrame(display);
	}

	function rotate(p) {
		var 
			sinx = Math.sin(.002),
			cosx = Math.cos(.002),
			siny = Math.sin(0.01),
			cosy = Math.cos(0.01),
			y1 = p.y * cosx - p.z * sinx,
			z1 = p.z * cosx + p.y * sinx;
			x1 = p.x * cosy - z1 *  siny,
			z2 = z1 *  cosy + p.x * siny;
		p.x = x1;
		p.y = y1;
		p.z = z2;
	}

	function rossler() {
		var x1, y1, z1,
			dt = .01;

		x1 = x + (-y - z) * dt;
		y1 = y + (x + a * y) * dt;
		z1 = z + (b + z * (x - c)) * dt;
		x = x1;
		y = y1;
		z = z1;
	}
}
