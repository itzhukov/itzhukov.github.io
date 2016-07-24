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
// var seed = 30;
var generator = new MersenneTwister(seed) || 0;
var chunkCount = 60;
var chunks = [];

var chunkMinxR = 5;
var chunkMaxR = 30;

ctx.fillStyle = '#fff';
ctx.strokeStyle = '#fff';

function getRandomInt(min, max) {
	return Math.floor(generator.random() * (max - min)) + min;
}

function getDistance(p0, p1) {
	var dx = p1.x - p0.x;
	var dy = p1.y - p0.y;

	return Math.sqrt(dx * dx + dy * dy);
}

function Chunk(x, y, r, color){
	this.r = r || getRandomInt(chunkMinxR, chunkMaxR);
	this.x = x || getRandomInt(this.r, W - this.r);
	this.y = y || getRandomInt(this.r, H - this.r);
	this.color = color || '#fff';
}

function generate(){
	// console.info('-> generate');

	var chunksLength = chunks.length;
	var chunk = new Chunk;
	chunks.push(chunk);

	for(var num = 0; num <= chunksLength; num++) {
		var chunk = chunks[num];

		for(var num2 = num+1; num2 <= chunksLength; num2++) {
			chunk2 = chunks[num2];

			var distance = getDistance(chunk, chunk2);
			// console.log('distance:' + distance);
			if ( chunk.r + chunk2.r >= distance){
				chunk.color = "rgba(255, 0, 0, 0.5)";
				chunk2.color ="rgba(255, 0, 0, 0.5)";
			}
		}
	}
}

function clearCanvas() {
	// console.info('-> clearCanvas');

	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(0, 0, W, H);

}

function draw() {
	// console.info('-> draw');

	clearCanvas();
	ctx.fillStyle = "#fff";
	var chunksLength = chunks.length;

	for (var num = chunksLength-1; num >= 0; num--) {
		var chunk = chunks[num];

		ctx.fillStyle = chunk.color;
		ctx.beginPath();
		ctx.arc(chunk.x, chunk.y, chunk.r, 0, Math.PI*2, false);
		ctx.fill();
	}
}

function render() {
	// console.info('-> render');

	if (chunks.length < chunkCount){
		generate();
	}

	draw();
	requestAnimFrame(render);
}

render();