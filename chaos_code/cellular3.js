window.onload = function() {
	var currentRow,
		nextRow,
		interval,
		cols,
		cellSize = 2,
		y = 0,
		rule = Math.floor(Math.random() * Math.pow(2, 32));

	console.log("rule: ", rule);


	init();

	function init() {
		var index;

		chaos.init();

		cols = chaos.width / cellSize;

		index = Math.round(cols / 2);
		currentRow = [];
		currentRow[index] = 1;

		// uncomment to enter a specific rule number
		rule = 2123739367;

		// some interesting rules:
		// 988197457 
		// 2530535241 
		// 2123739367 
		// 404545713 
		// 1931232828 
		// 2713874006 
		// 666987049 

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
			i, left2, left1, center, right1, right2;

		renderCurrentRow();


		// apply rule 
		nextRow = [];
		for(i = 0; i < cols; i += 1) {
			if(i === 0) {
				left2 = currentRow[cols - 2] || 0;
				left1 = currentRow[cols - 1] || 0;
			}
			else if(i === 1) {
				left2 = currentRow[cols - 1] || 0;
				left1 = currentRow[0] || 0;
			}
			else {
				left2 = currentRow[i - 2] || 0;
				left1 = currentRow[i - 1] || 0;
			}
			center = currentRow[i];
			if(i === cols - 1) {
				right1 = currentRow[0] || 0;
				right2 = currentRow[1] || 0;
			}
			else if(i === cols - 2) {
				right1 = currentRow[i + 1] || 0;
				right2 = currentRow[0] || 0;
			}
			else {
				right1 = currentRow[i + 1] || 0;
				right2 = currentRow[i + 2] || 0;
			}

			state = left2 << 4 | left1 << 3 | center << 2 | right1 << 1 | right2;
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
