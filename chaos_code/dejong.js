window.onload = function() {
	var x, y, a, b, c, d,
		scale = 150,
		maxPoints = 300000,
		pointCount = 0,
		interval;


	init();

	function init() {

		chaos.init();
		chaos.context.translate(chaos.width *.5, chaos.height * .5);
		chaos.context.lineWidth = 0.35;

		x = Math.random() - .5;
		y = Math.random() - .5;

		a = Math.random() * 4 - 2;
		b = Math.random() * 4 - 2;
		c = Math.random() * 4 - 2;
		d = Math.random() * 4 - 2;
		console.log("a:", a);
		console.log("b:", b);
		console.log("c:", c);
		console.log("d:", d);
		interval = setInterval(iterate, 0);

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


	function iterate() {
		for(var i = 0; i < 100; i += 1) {
			dejong();
			chaos.context.fillRect(x * scale, y * scale, .25, .25);
			pointCount += 1;
			if(pointCount > maxPoints) {
				clearInterval(interval);
				alert("done");
				return;
			}
		}
	}

	function dejong() {
		var x1, y1, z1;

		x1 = Math.sin(a * y) + c * Math.cos(b * x);
		y1 = Math.sin(c * x) + d * Math.cos(d * y);
		x = x1;
		y = y1;
	}
}