var wait = new waitEnd();

var word = document.querySelector('.word');
word.addEventListener('mouseover', function() {
	document.body.style.backgroundSize = '150%';
})
word.addEventListener('mouseout', function() {
	document.body.style.backgroundSize = '100%' 
})
word.addEventListener('click', function() {
	this.style.opacity = 0 ;
	var view = document.querySelector('.FirstView')
	document.body.removeChild(view);
	document.body.style.background = 'threedface'
	document.body.style.backgroundSize = '120%'
	wait.start()
	setTimeout(function() {		
		afterLoad('/image/18518352_153416231114_2.jpg', 'image', function() {
			wait.end()
			document.body.style.background = 'url(/image/18518352_153416231114_2.jpg)'
			document.body.style.backgroundSize = '100%'
			var video = document.createElement('audio')
			video.src = '/resources/bgMusic.mp3' 
			video.controls = 'controls'
			video.autoplay = "autoplay"
			document.body.appendChild(video)
			
		})
	}, 500);	
})