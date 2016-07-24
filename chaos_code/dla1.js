window.onload = function() {
	var particles = [],
		numParticles = 5000,
		pCanvas = document.getElementById("particleCanvas"),
		pContext = pCanvas.getContext("2d"),
		imageData;


	init();

	function init() {

		chaos.init();

		// set the canvas smaller than full size
		chaos.setSize(500, 500);

		// set the particle canvas to the same size
		pCanvas.width = chaos.width;
		pCanvas.height = chaos.height;

		// draw the seed
		chaos.context.fillRect(chaos.width / 2 - 2, chaos.height / 2 - 2, 4, 4);

		makeParticles();

		setInterval(update, 0);

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

	function makeParticles() {
		for(var i = 0; i < numParticles; i += 1) {
			var p = {
				x: Math.random() * chaos.width, 
				y: Math.random() * chaos.height,
				vx: 0,
				vy: 0
			}
			particles.push(p);
		}
	}

	function update() {
		// grab the current pixels of the aggregate canvas
		imageData = chaos.context.getImageData(0, 0, chaos.width, chaos.height).data;

		// clear the particle canvas
		pContext.clearRect(0, 0, chaos.width, chaos.height);

		// update all particles
		for(var i = 0; i < numParticles; i += 1) {
			var p = particles[i];
			updateParticle(p);
		}
	}

	function updateParticle(p) {
		// check if this particle is hitting the aggregate (see text)
		var x = Math.round(p.x),
			y = Math.round(p.y),
			pixel = imageData[(y * chaos.width + x) * 4 + 3],
			hit = pixel > 0;

		if(hit) {
			// draw this particle on the aggregate and respawn it
			chaos.context.fillRect(p.x, p.y, 1, 1);
			respawn(p);
		}
		else {
			// randomize velocity a bit
			p.vx += Math.random() * .1 - .05;
			p.vy += Math.random() * .1 - .05;
			// update position
			p.x += p.vx;
			p.y += p.vy;
			// dampen motion
			p.vx *= .99;
			p.vy *= .99;

			// if offscreen, wrap around to the other side
			if(p.x > chaos.width) {
				p.x -= chaos.width;
			}
			else if(p.x < 0) {
				p.x += chaos.width;
			}
			if(p.y > chaos.height) {
				p.y -= chaos.height;
			}
			else if(p.y < 0) {
				p.y += chaos.height;
			}

			// draw current particle on particle canvas
			pContext.fillRect(p.x, p.y, 1, 1);
		}
	}

	function respawn(p) {
		// reset to a random position, either along top edge or left side
		if(Math.random() < .5) {
			p.x = Math.random() * chaos.width;
			p.y = 0;
		}
		else {
			p.x = 0;
			p.y = Math.random() * chaos.height;
		}
	}
}
