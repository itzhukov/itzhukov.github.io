window.onload = function() {
	var p = 0.25,
		r = 1.5,
		year = 0,
		interval,
		xRes = 5;


	init();

	function init() {

		chaos.init();

		interval = setInterval(oneYear, 0);
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

	function oneYear() {
		var oldX,
			newX,
			oldY,
			newY;

		oldX = year * xRes;
		oldY = chaos.height - p * chaos.height,
		
		p = p * r * (1 - p);
		year += 1;

		newX = year * xRes;
		newY = chaos.height - p * chaos.height;

		chaos.context.beginPath();
		chaos.context.moveTo(oldX, oldY);
		chaos.context.lineTo(newX, newY);
		chaos.context.stroke();
		console.log(p);

		if(newX >= chaos.width) {
			clearInterval(interval);
			console.log("done");
		}

	}

}
