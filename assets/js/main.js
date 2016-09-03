'use strict'

var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
var particles = {};
var particWidth = 2;
var particHeight = 2;
var particleId = 0;
var particleCount = 0;
var maxParticleCount = 13;
var emitterSquare = 150;
canvas.id = 'canvas';

var resize = function () {
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
};

resize();

window.addEventListener('resize', resize);

document.body.appendChild(canvas);
canvas.addEventListener("mousedown", getPosition, false);
document.querySelector('.links').addEventListener("mousedown", getPosition, false);

function getPosition(event){
	var x = new Number();
	var y = new Number();

	if (event.x != undefined && event.y != undefined){
		x = event.x;
		y = event.y;
	} else {
		x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	spawnParticle(x, y);
}


c.fillStile = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

function randomRange(min, max) {
	return min + Math.random() * (max - min)
}

function Particle(x, y) {
	this.x = x || (canvas.width/2 - emitterSquare/2) + (Math.random() * emitterSquare);
	this.y = y || (canvas.height/2 - emitterSquare/2) + (Math.random() * emitterSquare);

	this.vx = Math.random() * randomRange(-2, 2);
	this.vy = Math.random() * randomRange(-2, 2);

	this.width = particWidth;
	this.height = particHeight;

	particleId++;
	particles[particleId] = this;
	this.id = particleId;

	this.life = 0;
	this.maxLife = randomRange(50, 700);
}

Particle.prototype.draw = function(){
	this.x += this.vx;
	this.y += this.vy;

	var xRnd = randomRange(-2, 2);
	var yRnd = randomRange(-2, 2);

	if ( Math.abs(xRnd) < 0.5){
		this.vx += xRnd;
	}

	if ( Math.abs(yRnd) < 0.5){
		this.vy += yRnd;
	}

	this.life++;

	if (
		this.life >= this.maxLife
		|| this.x < 0
		|| this.x > canvas.width
		|| this.y < 0
		|| this.y > canvas.height
		){
		particleCount--;
		delete particles[this.id];
	}

	c.fillStyle = "rgba(255, 255, 255, 1)";
	c.strokeStyle = "rgba(255, 255, 255, 1)";
	c.beginPath();
	c.arc(this.x, this.y, this.width, 0, 2*Math.PI);
	c.fill();
	c.stroke();
}

function spawnParticle(x, y){
	new Particle(x, y);
	particleCount++;
}

function step(event){
	c.fillStyle = "rgba(0, 0, 0, 0.07)";
	c.fillRect(0, 0, canvas.width, canvas.height);

	if ( particleCount < maxParticleCount){
		spawnParticle();
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
