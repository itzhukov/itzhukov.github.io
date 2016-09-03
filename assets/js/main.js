'use strict'

var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
var particles = {};
var particleId = 0;
var particleLife = randomRange(150, 750);
var particleCount = 1;
var emitterSquare = 700;
canvas.id = 'canvas';

var resize = function () {
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
};

resize();

window.addEventListener('resize', resize);

document.body.appendChild(canvas);

c.fillStile = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

function randomRange(min, max) {
	return min + Math.random() * (max - min)
}

function Particle() {
	this.x = (canvas.width/2 - emitterSquare/2) + (Math.random() * emitterSquare);
	this.y = (canvas.height/2 - emitterSquare/2) + (Math.random() * emitterSquare);

	this.vx = Math.random() * randomRange(-2, 2);
	this.vy = Math.random() * randomRange(-2, 2);

	this.width = 4;
	this.height = 4;

	particleId++;
	particles[particleId] = this;
	this.id = particleId;

	this.life = 0;
	this.maxLife = particleLife;
}


Particle.prototype.draw = function(){
	this.x += this.vx;
	this.y += this.vy;

	if ( Math.random() < 0.1 && this.vx > - 0.7 && this.vx < 0.7 ){
		this.vx += randomRange(-2, 2);
	}

	if ( Math.random() < 0.1 && this.vy > - 0.7 && this.vy < 0.7 ){
		this.vy += randomRange(-2, 2);
	}

	this.life++;

	if (this.life >= this.maxLife){
		delete particles[this.id];
	}

	c.fillStyle = "rgba(255, 255, 255, 0.5)";
	c.fillRect(this.x, this.y, this.width, this.height);
}

for (var i = 0; i < particleCount; i++){
	new Particle();
}

function step(event){
	c.fillStyle = "rgba(0, 0, 0, 0.1)";
	c.fillRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < particleCount; i++){
		new Particle();
	}

	for (var i in particles){
		particles[i].draw();
	}

	requestAnimationFrame(step);
}

step();


/* ================================= exports ================================= */

module.exports = {

}
