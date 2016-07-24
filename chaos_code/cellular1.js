window.onload = function() {
	var currentRow,
		nextRow,
		interval,
		y = 0;


	init();

	function init() {
		var index;

		chaos.init();

		index = Math.round(chaos.width / 2);
		currentRow = [];
		currentRow[index] = true;

		interval = setInterval(iterate, 0);

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

	function iterate() {
		var cell, i;

		renderCurrentRow();

		// apply rule 
		nextRow = [];
		for(i = 0; i < chaos.width; i += 1) {
			if(currentRow[i - 1] && !currentRow[i + 1]){
				nextRow[i] = true;
			}
			else if(!currentRow[i - 1] && currentRow[i + 1]){
				nextRow[i] = true;
			}
		}
		currentRow = nextRow;
		y += 1;
		if(y >= chaos.height) {
			clearInterval(interval);
		}
	}

	function renderCurrentRow() {
		for(var x = 0; x < chaos.width; x += 1) {
			if(currentRow[x]) {
				chaos.context.fillRect(x, y, 1, 1);
			}
		}
	}

}
