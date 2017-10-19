let width = 320;
let height = 0;
let streaming = false;
let video = null;
let canvas = null;
let text = null;
let photo = null;
let startbutton = null;
let body = document.body;
let readButton = null;
let colorThief = new ColorThief();
let d = ['red', 'green', 'blue'];
let nav = (navigator.userAgent||navigator.vendor||window.opera);
let isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(nav)

let decoded = [];
let prev = 2;
let watch = true;
let readed = false;

var ABC = {}

ABC.toAscii = function(bin) {
	return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
		return String.fromCharCode(parseInt(bin, 2))
	})
}

ABC.zeroPad =function(num) {
	return "00000000".slice(String(num).length) + num
}

ABC.toBinary = function(str, spaceSeparatedOctets) {
	return str.replace(/[\s\S]/g, function(str) {
		str = ABC.zeroPad(str.charCodeAt().toString(2));
		return !1 == spaceSeparatedOctets ? str : str + " "
	})
}

function startup() {
	text = document.querySelector('.text');
	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
	photo = document.getElementById('photo');
	startbutton = document.getElementById('startbutton');
	readButton = document.getElementById('readButton');

	navigator.getMedia = (
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia
	);

	navigator.getMedia(
		{
			video: isMobile ? { facingMode: { exact: "environment" } } : true,
			audio: false
		},
		function(stream) {
			if (navigator.mozGetUserMedia) {
				video.mozSrcObject = stream;
			} else {
				let vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL.createObjectURL(stream);
			}
			video.play();
		},
		function(err) {
			console.log("An error occured! " + err);
		}
	);

	video.addEventListener('canplay', function(ev){
		if (!streaming) {
			height = video.videoHeight / (video.videoWidth/width);

			if (isNaN(height)) {
				height = width / (4/3);
			}

			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;

			if (isMobile){
				readButton.addEventListener('touchend', readCode);
			} else {
				readButton.addEventListener('click', readCode);
			}
			
		}
	}, false);

}

function readCode() {
	text.innerText = ABC.toAscii(text.innerText)
	body.style.backgroundColor = 'rgb(255, 255 , 255)';
	readed = true
}

function step() {
	if (streaming && !readed) {
		let rgb = colorThief.getColor(video, 1024);
		let indexOfMaxValue = rgb.reduce( (indexMAx, x, i, rgb) => x > rgb[indexMAx] ? i : indexMAx, 0);
		// text.innerText = d[indexOfMaxValue].toUpperCase();
		// text.style.color = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
		// 
		body.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';

		if (prev == 2 && watch) {
			if (indexOfMaxValue != 2){
				decoded.push(indexOfMaxValue);
				text.innerText = decoded.join("").replace(/(.{8})/g,"$1 ");
				watch = false;
			}
		} else {
			watch = true;
			prev = indexOfMaxValue;
		}

	};
	requestAnimationFrame(step);
}

requestAnimationFrame(step);

window.addEventListener('load', startup, false);