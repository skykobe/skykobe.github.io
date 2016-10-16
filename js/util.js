var loopResult = false, loopCheck = false;
var root = $("#root")
var url = {
	hash: 'RicardoPage'
};
var timer
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
			jsLoad(url, callback)
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
	$("#root").appendChild(script)
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

function Router () { // 简易路由
	this.start = function(obj) {
		var fn = location.hash.split('#')[1];
		try {
			fn = ( fn ? fn : '' );
			obj[fn]()
		} catch (err) {
			console.log('没有对应的路由哦')
		}
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

function backgroundChange(node, url, delay) {
	var num = 0;
	setInterval(function() {
		if(num == url.length) num = 0;
		node.style.background = 'url(' + url[num] + ')'
	}, delay)
}

//开始习惯一下匿名函数的定义
var M_overChange = function() {
    this.style.opacity = 1;
    this.style.background = '#7fffef';
    url.hash = 'music';
    root.className = 'Mroot';
}
var M_outChange = function() {
	this.style.opacity = 0.7;
    this.style.background = '#7fffd4';
    url.hash = 'RicardoPage';
    root.className = '';
}
var W_overChange = function() {
	this.style.opacity = 1;
    this.style.background = '#f0e6ee';
    url.hash = 'wall';
    root.className = 'Wroot';
}
var W_outChange = function() {
    this.style.opacity = 0.7;
    this.style.background = '#f0e68c';
    url.hash = 'RicardoPage';
    root.className = '';
}
var T_overChange = function() {
	this.style.opacity = 1;
    this.style.background = '#fa80bb';
    url.hash = 'word';
    root.className = 'Troot';
}
var T_outChange = function() {
    this.style.opacity = 0.7;
    this.style.background = '#fa8072';
    url.hash = 'RicardoPage';
    root.className = '';
}

// 音乐播放器的等待
var musicPlayerInit = function() {	
	var timer;
	this.init = function () {
		var node = '<div class="m_wait">' + 
				   '<div class="m">i</div>' + 
				   '<div class="m">n</div>' + 
				   '<div class="m">i</div>' + 
				   '<div class="m">t</div>' + 
				   '<div class="m">.</div>' + 
		           '<div class="m">.</div>' +
				   '<div class="m">.</div>' +
				   '<div class="m">.</div>' +
				   '<div class="m">.</div>' +
				   '</div>'
		root.innerHTML = node;
		var nodeList = document.querySelectorAll('.m')
		var wait = function() {
			for(var i = 0; i < nodeList.length; i++) {
				(function(i) {
					setTimeout(function() { // 上浮
						nodeList[i].style.transform = 'translateY(-50px)'	
					}, 800 + i * 350)
					setTimeout(function() { // 下浮
						nodeList[i].style.transform = 'translateY(0px)'	
					}, 1300 + i * 400)
				})(i)
			} 
		}
		wait()
		timer = setInterval(wait, 4500)
	}
	this.end = function() {
		clearInterval(timer)
		root.innerHTML = ''
	}
}
/* 不想再用字符串拼接了，试写一个用起来类似require的text的 */
var loadHtml = function (url, fn) {
	fetch(url).then(function(res) {
		return res.text()
	}).then(function(data) {
		var o = new Object()
		fn.call(o, data)
	})
}