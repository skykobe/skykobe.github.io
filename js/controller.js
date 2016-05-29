var wait = new waitEnd();
var body = document.body;
var root = $("#root")
var router = new Router()
router.start({
	'RicardoPage': RicardoPage,
	'': FirstPage
})

function RicardoPage() {
	var Wait =  '<div class="stage" style="visibility: hidden">' +
				'<div class="star1"></div><div class="star2"></div>' +
				'<div class="star3"></div><div class="wait_body">' +
				'<span class="wait_word">loading</span>' +			  				 
				'</div><span style="color: black">include music, Patience...</span></div>' 

	root.innerHTML = Wait
	var w = $('.stage')
	root.style.background = 'threedface'
	root.style.backgroundSize = '120%'
	wait.happend(w)
	console.log(wait)
	setTimeout(function() {		
		afterLoad(['/image/18518352_153416231114_2.jpg', '/image/ricardo.jpg', '/image/music.png'], 'image', function() {
			afterLoad('/resources/bgMusic.mp3', 'music', function() {
				wait.end(w)
				root.style.background = 'url(/image/18518352_153416231114_2.jpg)'
				root.style.backgroundSize = '100%'
				inserBgm()
				var num = 3;
				var div = document.createElement('div')
				var p = document.createElement('p')
				p.innerText = 'Now wait ' + num + ' Second'
				var userLogo = new Image()
				userLogo.src = '/image/ricardo.jpg'
				userLogo.style.width = '200px'
				div.className = 'class1'
				div.innerHTML = 'I am front-end dog<br />'
				div.appendChild(userLogo)
				div.appendChild(p)
				waitWordCss(p, num)
				root.appendChild(div)
			})		
		})
	}, 500);	
}

function FirstPage () {
	root.style = ''
	var element = '<div class="FirstView"><hr/><a href="#RicardoPage">' +
				  '<div class="word"><span class="Ricardo">Ricardo</span>' +
				  '</div></a><hr /></div>' 			 
	root.innerHTML = element
	var word = $('.word');
	word.addEventListener('mouseover', function() {
		root.style.backgroundSize = '150%';
	})
	word.addEventListener('mouseout', function() {
		root.style.backgroundSize = '100%' 
	})
	word.addEventListener('click', function() {
		var view = $('.FirstView')
		word.style.opacity = 0 ;
		root.removeChild(view);
	})
}

function inserBgm() {
	// var MusicBox =	'<div style="width: 60px; height: 60px;">'+
	// 				'<div class="musicPlay" id="MusicCtl">'+
	// 				'<img src="/image/music.png" width="80%">'+
	// 				'</div>'+
	// 				'</div>'
	var div1 = document.createElement('div'), div2 = document.createElement('div')
	var img = new Image();
	img.src = '/image/music.png'
	img.style.width = '80%'
	div1.style.width = '60px'
	div1.style.height = '60px'
	div2.className = 'musicPlay'
	div2.id = 'MusicCtl' 
	div2.appendChild(img)
	div1.appendChild(div2)
	root.appendChild(div1)
	$('#MusicCtl').addEventListener('click', function() {
	this.className = this.className == 'musicPlay' ? 'musicPause' : 'musicPlay'		
	if($('#bgm').paused) {
		$('#bgm').play()
	} else {
		$('#bgm').pause()
	}
})
				
}

function waitWordCss (p, num) {
	if(num != 0) {
		setTimeout(function() {
			num--;
			p.style.color = (num == 2? 'highlight' : '#7fffd4' )
			p.innerText = 'Now wait ' + num + ' Second'
			waitWordCss(p, num)
		}, 1000)
	} else {
		p.style.color = '#dc143c'
		p.innerText = 'Now Go ahead to see my page'
	}
	
}