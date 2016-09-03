window.onload = function() {
	var vocab,
		initiator,
		string,
		rules = {},
		interval,
		iterations = 0,
		maxIter;


	init();

	function init() {

		chaos.init();

		algae();

		string = initiator;

		interval = setInterval(transform, 1000);

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

	function algae() {
		vocab = "AB";
		initiator = "A";

		rules["A"] = "AB";
		rules["B"] = "A";

		maxIter = 7;
	}

	function transform() {
		var i,
			char,
			rule,
			newString = "";

		console.log(string);

		iterations += 1;
		if(iterations > maxIter) {
			clearInterval(interval);
		}
		
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
	}
}
