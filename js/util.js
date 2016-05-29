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

function $(dom) {
	return document.querySelector(dom);
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
	if(type == 'music') {
		if(url instanceof Array) {

		} else {
			musicLoad(url, callback)
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

function musicLoad(url, fn) {
	var bgm = document.createElement('audio')
	bgm.src = url
	bgm.id = 'bgm'
	bgm.addEventListener('canplaythrough', function() {
		if(fn) {
			bgm.loop = 'loop'
			$("#root").appendChild(bgm)
			bgm.play()
			fn()
		}
	})
}

function waitEnd () {
	var wait = $('.stage');
	this.happend = function (node) {
		node.style.visibility = ''
	}
	this.end = function (node) {
		$("#root").removeChild(node)
	}

}

function Router () {
	this.start = function(obj) {
		var fn = location.hash.split('#')[1];
		fn = ( fn ? fn : '' );
		obj[fn]()
		window.onhashchange = function() {
			var url = location.hash;
			if(url) {
				url = url.split('#')[1]
			} else {
				url = ''
			}
			for(var route in obj) {
				if(route == url) {
					obj[route]()
				}
			}
		}
	}
}
