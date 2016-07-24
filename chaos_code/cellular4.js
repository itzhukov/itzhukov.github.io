window.onload = function() {
	var currentGrid,
		nextGrid,
		cols,
		rows,
		cellSize = 5,
		rule = Math.floor(Math.random() * 1024); // out of 1024

	console.log("rule: ", rule);


	init();

	function init() {

		chaos.init();

		// uncomment to set a specific rule
		rule = 210;

		// interesting rules
		// 50
		// 621
		// 146
		// 210

		cols = Math.floor(chaos.width / cellSize);
		rows = Math.floor(chaos.height / cellSize);

		currentGrid = createGrid();

		currentGrid[Math.round(cols / 2)][Math.round(rows / 2)] = 1;

		renderCurrentGrid();

		document.body.addEventListener("keyup", function(event) {
			// console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					chaos.popImage();
					break;

				case 32: // space
					iterate();
					break;

				default: 
					break;
			}
		});
	}

	function iterate() {
		var state,
			x, y;

		renderCurrentGrid();

		nextGrid = createGrid();

		for(x = 0; x < cols; x += 1) {
			for(y = 0; y < rows; y += 1) {
				state = getState(x, y);
				if(rule & (1 << state)) {
					nextGrid[x][y] = 1;
				}
			}
		}
		currentGrid = nextGrid;
	}

	function createGrid() {
		var grid = [];
		for(var i = 0; i < cols; i += 1) {
			grid[i] = [];
		}
		return grid;
	}

	function getState(x, y) {
		var state = 0;
		// left
		if(x === 0) {
			state += currentGrid[cols - 1][y] || 0;
		}
		else {
			state += currentGrid[x - 1][y] || 0;
		}
		// right
		if(x === cols - 1) {
			state += currentGrid[0][y] || 0;
		}
		else {
			state += currentGrid[x + 1][y] || 0;
		}
		// top
		if(y === 0) {
			state += currentGrid[x][rows - 1] || 0;
		}
		else {
			state += currentGrid[x][y - 1] || 0;
		}
		// bottom
		if(y === rows - 1) {
			state += currentGrid[x][0] || 0;
		}
		else {
			state += currentGrid[x][y + 1] || 0;
		}
		if(currentGrid[x][y]) {
			state += 5;
		}
		return state;
	}

	function renderCurrentGrid() {
		chaos.clear();
		for(var x = 0; x < cols; x += 1) {
			for(var y = 0; y < rows; y += 1) {
				if(currentGrid[x][y]) {
					chaos.context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
				}
			}
		}
	}

}
