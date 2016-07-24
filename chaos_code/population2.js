window.onload = function() {
	var p = 0.25,
		r = 3.7,
		year = 0,
		interval,
		xRes = 1;


	init();

	function init() {

		chaos.init();

		while(year < chaos.width / xRes) {
			oneYear();
		}
		chaos.context.translate(0, chaos.height / 2);
		p = 0.25001;
		year = 0;
		while(year < chaos.width / xRes) {
			oneYear();
		}
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
		oldY = chaos.height / 2 - p * chaos.height / 2,
		
		p = p * r * (1 - p);
		year += 1;

		newX = year * xRes;
		newY = chaos.height / 2 - p * chaos.height / 2;

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
