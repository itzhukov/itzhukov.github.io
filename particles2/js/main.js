document.onreadystatechange = function () {
	if (document.readyState == 'complete') {

		var canvas = document.createElement('canvas');
			c = canvas.getContext('2d'),
			particles = {},
			particleId = 0,
			particleCount = 1,
			emitterSquare = 10,
			sequence = [];

		var resize = function () {
			canvas.width = document.documentElement.clientWidth;
			canvas.height = document.documentElement.clientHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		document.body.appendChild(canvas);

		for (var i = 8; i >= 1; i--) {
			var img = new Image();
			img.src = "particle"+i+".png";
			sequence.push(img);
		};

		c.fillStile = "black";
		c.fillRect(0, 0, canvas.width, canvas.height);

		/**
		 * [Particle Particle]
		 * @author Vadim Zhukov
		 * @date   2015-12-24
		 */
		function Particle() {
			this.x = (canvas.width/2 - emitterSquare/2) + (Math.random() * emitterSquare);
			this.y = (canvas.height/2 - emitterSquare/2) + (Math.random() * emitterSquare);

			this.vx = Math.random() * 1 - 2;
			this.vy = Math.random() * 1 - 2;

			this.width = 5;
			this.height = 5;

			this.part = Math.floor(Math.random() * 8-1) + 1;

			this.gravity = 0.3;

			particleId++;
			particles[particleId] = this;
			this.id = particleId;

			this.life = 0;
			this.maxLife = Math.random() * 30 + 120;
			/*
			this.color = "rgba("+ parseInt(Math.random()*255, 10) + "," +
				                + parseInt(Math.random()*255, 10) + "," +
				                + parseInt(Math.random()*255, 10) + ", 0.5)";
			*/
			this.color = "rgba("+ parseInt(Math.random()*255, 10) + ", 0, 0, 0.9)";
		}


		/* Draw particle */
		Particle.prototype.draw = function(){
			this.x += this.vx;
			this.y += this.vy;


			if (Math.random() < 0.1){
				this.vx += Math.random() * 10 - 5;
				this.vy += Math.random() * 10 - 5;
			}


			// this.vy += this.gravity;
			/*
			if (Math.random() > 0.3){
				this.vx += Math.random() * 0.1;
				this.vy += Math.random() * 0.1;
			}
			*/
			this.life++;

			if (this.life >= this.maxLife){
				delete particles[this.id];
			}

			//c.fillStyle = "rgba(255, 0, 0, 0.1)";
			//c.fillStyle = "rgba(255, 255, 255, 0.5)";
			c.fillStyle = this.color;
			// c.fillRect(this.x, this.y, this.width, this.height);
			// c.drawImage(sequence[this.part], this.x, this.y, 75, 75);
			c.drawImage(sequence[4], this.x, this.y, 75, 75);
		};


		// new particles
		for (var i = 0; i < particleCount; i++){
			new Particle();
		}

		/**
		 * [step Шаг анимации]
		 * @author Vadim Zhukov
		 * @date   2015-12-24
		 * @param  {[type]}   event [description]
		 * @return {[type]}         [description]
		 */
		function step(event){
			c.fillStyle = "rgba(0, 0, 0, 0.1)";
			c.fillRect(0, 0, canvas.width, canvas.height);

			for (var i = 0; i < particleCount; i++){
				new Particle();
			}

			for (var i in particles){
				particles[i].draw();
			}

			// next step
			requestAnimationFrame(step);
		}

		step();

	}
}