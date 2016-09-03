window.onload = function() {
	var currentRow,
		nextRow,
		interval,
		cols,
		cellSize = 1,
		y = 0,
		rule = 30;

	init();

	function init() {
		var index;

		chaos.init();

		cols = chaos.width / cellSize;

		index = Math.round(cols / 2);
		currentRow = [];
		currentRow[index] = 1;

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
		var state,
			i, left, center, right;

		renderCurrentRow();

		// apply rule 
		nextRow = [];
		for(i = 0; i < cols; i += 1) {
			
			// left neighbor
			if(i === 0) {
				left = currentRow[cols - 1] || 0;
			}
			else {
				left = currentRow[i - 1] || 0;
			}

			// the cell itself 
			center = currentRow[i];

			// right neighbor
			if(i === cols - 1) {
				right = currentRow[0] || 0;
			}
			else {
				right = currentRow[i + 1] || 0;
			}

			state = left << 2 | center << 1 | right;
			if(rule & (1 << state)) {
				nextRow[i] = true;
			}
		}
		currentRow = nextRow;
		y += 1;
		if(y >= chaos.height / cellSize) {
			clearInterval(interval);
		}
	}

	function renderCurrentRow() {
		for(var x = 0; x < cols; x += 1) {
			if(currentRow[x]) {
				chaos.context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
			}
		}
	}

}
