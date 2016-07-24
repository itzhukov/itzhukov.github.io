window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};
})();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;

canvas.width = W;
canvas.height = H;

var seed = prompt("Введите seed:");
var generator = new MersenneTwister(seed);
var rooms = [];
var maxRooms = 500;

var roomMinW = 20;
var roomMaxW = 20;

var roomMinH = 20;
var roomMaxH = 20;

ctx.fillStyle = '#fff';
ctx.strokeStyle = '#fff';

function getRandomInt(min, max) {
	return Math.floor(generator.random() * (max - min)) + min;
}

function generate(){
	// console.info('-> generate');

	var rndW = getRandomInt(roomMinW, roomMaxW);
	var rndH = getRandomInt(roomMinH, roomMaxH);

	var rndX = getRandomInt(0, W - rndW);
	var rndY = getRandomInt(0, H - rndH);

	console.info(rndX, rndY, rndW, rndH);
	ctx.fillRect(rndX, rndY, rndW, rndH);

	rooms.push({
		x: rndX,
		y: rndY,
		w: rndW,
		h: rndH
	})
}

function step() {
	// console.info('-> step');

	if (rooms.length < maxRooms){
		generate();
	}
}

function render() {
	// console.info('-> render');

	step();
	requestAnimFrame(render);
}

render();