window.onload = function() {
	var vocab,
		initiator,
		string,
		rules = {},
		commands = {},
		system,
		angle,
		turnAngle,
		x, y,
		stack,
		size = 10,
		maxIter = 1;


	init();


	function dragon() {
		vocab = "+-FXY";
		initiator = "FX";

		rules["X"] = "X+YF+";
		rules["Y"] = "-FX-Y";

		commands["F"] = draw;
		commands["+"] = right;
		commands["-"] = left;
		turnAngle = 90;

		angle = 0;
		x = chaos.width * .5;
		y = chaos.height * .5;
	}

	function tree() {
		vocab = "AB[]";
		initiator = "A";

		rules["A"] = "B[-A]+A";
		rules["B"] = "BB";

		commands["A"] = draw;
		commands["B"] = draw;
		commands["["] = push;
		commands["]"] = pop;
		commands["+"] = right;
		commands["-"] = left;
		turnAngle = 45;

		angle = -90;
		x = chaos.width * .5;
		y = chaos.height;
	}


	function sierpinski() {
		vocab = "AB+-";
		initiator = "A+B+B";

		rules["A"] = "A+B-A-B+A";
		rules["B"] = "BB";

		commands["A"] = draw;
		commands["B"] = draw;
		commands["+"] = right;
		commands["-"] = left;
		turnAngle = 120;

		angle = 0;
		x = chaos.width * .333;
		y = chaos.height * .1;
	}

	function plant() {
		vocab = "XF+-[]";
		initiator = "X";

		rules["X"] = "F-[[X]+X]+F[+FX]-X";
		rules["F"] = "FF";

		commands["X"] = draw;
		commands["F"] = draw;
		commands["+"] = right;
		commands["-"] = left;
		commands["["] = push;
		commands["]"] = pop;
		turnAngle = 25;

		angle = -90;
		x = chaos.width * .5;
		y = chaos.height;
	}

	function koch() {
		vocab = "FX+-";
		initiator = "F++F++F";

		rules["F"] = "F-F++F-F";
		rules["X"] = "FF";

		commands["X"] = draw;
		commands["F"] = draw;
		commands["+"] = right;
		commands["-"] = left;

		turnAngle = 60;

		angle = 0;

		x = chaos.width * .2;
		y = chaos.height * .3;
	}

	function hilbert() {
		vocab = "ABF+-";
		initiator = "A";

		rules["A"] = "+BF-AFA-FB+";
		rules["B"] = "-AF+BFB+FA-";

		commands["F"] = draw;
		commands["+"] = right;
		commands["-"] = left;

		turnAngle = 90;

		angle = 0;

		x = chaos.width * .1;
		y = chaos.height * .1;
	}

	function gosper() {
		vocab = "XYF+-";
		initiator = "X";

		rules["X"] = "X+YF++YF-FX--FXFX-YF+";
		rules["Y"] = "-FX+YFYF++YF+FX--FX-Y";

		commands["F"] = draw;
		commands["+"] = right;
		commands["-"] = left;

		turnAngle = 60;

		angle = 0;

		x = chaos.width * .8;
		y = chaos.height * .2;
	}

	function init() {

		chaos.init();

		system = sierpinski;
		iterate();
		render();

		document.body.addEventListener("keyup", function(event) {
			// console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					chaos.popImage();
					break;

				case 38: // up
					maxIter += 1;
					iterate();
					render();
					break;

				case 40: // down
					maxIter -= 1;
					maxIter = Math.max(1, maxIter);
					iterate();
					render();
					break;

				case 90: // z
					size -= 1;
					size = Math.max(1, size);
					iterate();
					render();
					break;

				case 88: // x
					size += 1;
					iterate();
					render();
					break;

				default: 
					break;
			}
		});
	}

	function iterate() {
		stack = [];
		system();
		string = initiator;
		for(var i = 0; i < maxIter; i += 1) {
			transform();
		}
	}

	function transform() {
		var i,
			char,
			rule,
			newString = "";

		for(i = 0; i < string.length; i += 1) {
			char = string.charAt(i);
			rule = rules[char];
			if(rule) {
				newString += rule;
			}
			else {
				newString += char;
			}
		}
		string = newString;
		console.log(string);
	}

	function render() {
		var i, char, command;

		chaos.clear();
		chaos.context.beginPath();
		chaos.context.moveTo(x, y);
		for(i = 0; i < string.length; i += 1) {
			char = string.charAt(i);
			command = commands[char];
			if(command) {
				command();
			}
		}
		chaos.context.stroke();
	}

	function move() {
		x += Math.cos(angle * Math.PI / 180) * size;
		y += Math.sin(angle * Math.PI / 180) * size;
		chaos.context.moveTo(x, y);
	}

	function draw() {
		x += Math.cos(angle * Math.PI / 180) * size;
		y += Math.sin(angle * Math.PI / 180) * size;
		chaos.context.lineTo(x, y);
	}

	function left() {
		angle -= turnAngle;
	}

	function right() {
		angle += turnAngle;
	}

	function push() {
		stack.push({
			x: x,
			y: y,
			angle: angle
		})
	}

	function pop() {
		var state = stack.pop();
		if(state) {
			x = state.x;
			y = state.y;
			angle = state.angle;
			chaos.context.moveTo(x, y);
		}
	}
}
