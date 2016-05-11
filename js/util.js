var loopResult = false, loopCheck = false;
function test () {
	if(!loopCheck) {
	   	var img = new Image();
	   	img.src = 'rina.jpg' ;
	   	img.addEventListener('load', function() {
	   		loopResult = true;	   					   				
	   	})
	}
	if(loopResult) {
	   	console.log('loaded')
	   	return true
	} else {
	   	setTimeout(test, 100);
	   	console.log('loading')
	}
	loopCheck = true
}

function afterLoad (url, type, callback) {
	if(type == 'image') {		
		if(url instanceof Array) {
			url.forEach(function(item, index) {
				if(index == (url.length - 1) ) {
					imageLoad(item, callback)
				} else {
					imageLoad(item)
				}
			})
		} else {
			imageLoad(url, callback)
		}

	}
	if(type == 'js') {
		if(url instanceof Array) {

		} else {

		}
	}
}

function imageLoad(url, fn) {
	var img = new Image();
	img.src = url;
	img.addEventListener('load', function() {
		if(fn) {
			fn();
		}
	})
}
function jsLoad(url, fn) {
	var script = document.createElement('script');
	script.src = url;
	script.addEventListener('load', function() {
		if(fn) {
			fn()
		}
	})
}

function waitEnd () {
	// this.start = function () {
	// 	var wait = '<div class="stage">'
	// 			+ '<div class="star1"></div>'
	// 			+ '<div class="star2"></div>'
	// 			+ '<div class="star3"></div>'
	// 			+ '<div class="wait_body">'
	// 			+ '<span class="wait_word">loading</span>'
	// 			+ '<span class="shadow"></span>'
	// 			+ '</div>'+'</div>'
	// 	document.body.innerHTML = wait;		
	// }	
	// this.end = function() {
	// 	document.body.innerHTML = ''
	var wait = document.querySelector('.stage');
	this.start = function () {
		wait.style.visibility = ''
	}
	this.end = function () {
		document.body.removeChild(wait);
	}

}