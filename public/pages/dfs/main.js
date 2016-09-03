var labEl = document.querySelector('.lab');
var lab = [];
var labX = 27;
var labY = 15;

var player = {};
var playerPos = 0;

var exit = {};
var exitPos = 0;

var exitFound = false;

var spriteArr = ['x', ' ', 'o', 'E', '.'];

restart();

function restart(){
	lab = [];

	player = {};
	playerPos = 0;

	exit = {};
	exitPos = 0;

	exitFound = false;

	generateLab(); // Генерация лабиринта
	spawnPlayer(); // Спаун игрока
	spawnExit(); // Спаун выхода
	renderLab(); // Рендеринг лабиринта
	searchPath();
}

function searchPath(){
	dfs(player.y, player.x);

}

function dfs(y, x){
	setTimeout(function(){
		renderLab();
		if (!exitFound){
			console.info( '-> dfs', x, y );

			if (
				lab[y-1] != undefined &&
				lab[y-1][x] != undefined &&
				lab[y-1][x] != 4 &&
				!exitFound &&
				lab[y-1][x] == 1 || lab[y-1][x] == 3
			) {
				if (lab[y-1][x] == 3){
					setExitFound( y-1, x);
				} else {
					// console.info( ' Есть свободная клетка сверху!');
					lab[y-1][x] = 4;
					
					dfs( y-1, x );
					// dfs( y-1, x );
				}
			}

			if (
				lab[y+1] != undefined &&
				lab[y+1][x] != undefined &&
				lab[y+1][x] != 4 &&
				!exitFound &&
				lab[y+1][x] == 1 || lab[y+1][x] == 3
			) {
				if (lab[y+1][x] == 3){
					setExitFound(y+1, x);
				} else {
					// console.info( ' Есть свободная клетка сверху!');
					lab[y+1][x] = 4;
					dfs( y+1, x );
					// dfs( y+1, x );
				}
			}

			if (
				lab[y] != undefined &&
				lab[y][x-1] != undefined &&
				lab[y][x-1] != 4 &&
				!exitFound &&
				lab[y][x-1] == 1 || lab[y][x-1] == 3
			) {
				if (lab[y][x-1] == 3){
					setExitFound( y, x- 1);
				} else {
					// console.info( ' Есть свободная клетка сверху!');
					lab[y][x-1] = 4;
					
					dfs( y, x-1 );
					// dfs( y, x-1 );
				}
			}

			if (
				lab[y] != undefined &&
				lab[y][x+1] != undefined &&
				lab[y][x+1] != 4 &&
				!exitFound &&
				lab[y][x+1] == 1 || lab[y][x+1] == 3
			) {
				if (lab[y][x+1] == 3){
					setExitFound(y, x+1);
				} else {
					// console.info( ' Есть свободная клетка сверху!');
					lab[y][x+1] = 4;
					dfs( y, x+1 );
					// dfs( y, x+1 );
				}
			}
		}
		return false;
	}, 30)
}

function setExitFound(y, x){
	exitFound = true;
	console.info( 'Выход найден!', y, x);

	setTimeout(function(){
		restart();
	}, 3000);
}

function renderLab(){
	var y = 0;
	var x = 0;
	labEl.innerHTML = '';

	for (y = 0; y<labY; y++){
		for (x = 0; x<labX; x++){
			labEl.innerHTML += spriteArr[lab[y][x]];
		}
		labEl.innerHTML += '<br>';
	}
}

function spawnExit(){
	while(exitPos == 0 && exitPos != 3){
		var yx = randomYX();
		exit.y = yx[0];
		exit.x = yx[1];
		exitPos = lab[exit.y][exit.x]
	}

	lab[exit.y][exit.x] = 3;
	console.info( 'Exit', exit );
}

function spawnPlayer(){
	while(playerPos == 0){
		var yx = randomYX();
		player.y = yx[0];
		player.x = yx[1];
		playerPos = lab[player.y][player.x]
	}

	lab[player.y][player.x] = 2;
	console.info( 'Player', player );
}

function randomYX(){
	var y = parseInt(Math.random() * labY);
	var x = parseInt(Math.random() * labX);

	return [y, x];
}

function generateLab(){
	for (y = 0; y<labY; y++){
		var line = [];
		for (x = 0; x<labX; x++){
			var cell = (
				x == 0 || y == 0 || x == labX-1 || y == labY-1
			) ?
			0:
			parseInt(Math.random() * 9);
			if (cell != 0) cell = 1;
			line.push(cell);
		}
		lab.push(line);
	}
}
