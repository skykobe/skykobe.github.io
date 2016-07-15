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
	setTimeout(function() {		
		afterLoad(['/image/18518352_153416231114_2.jpg', '/image/ricardo.jpg', '/image/music.png'], 'image', function() {
			wait.end(w)
			root.style.background = 'url(/image/18518352_153416231114_2.jpg)'
			root.style.backgroundSize = '100%'
			var menuBar = '<div class="menuOut"><center class="word-menu">Click</center>' +
						  '<div class="r1"><center class="word-menu">M</center></div>' +
						  '<div class="r2"><center class="word-menu">W</center></div>' +
						  '<div class="r3"><center class="word-menu">T</center></div></div>'     
			root.innerHTML = menuBar
			var t = document.querySelector('.menuOut');
		    var url;
		    var bar = ['translate(50%, 0%)', 'translate(50%, -100%)', 'translate(50%, -200%)']
		    t.addEventListener('mousedown', function() {
		      this.style.background = '#7fffd4'
		      var r1 = document.querySelector('.r1');     
		      var r2 = document.querySelector('.r2');      
		      var r3 = document.querySelector('.r3');   
		      r1.style.visibility = ''
      		  r2.style.visibility = ''
      		  r3.style.visibility = ''   
		      r1.style.opacity = 0.7;
		      r1.style.transform = 'translate(-120%, 80%)'
		      r2.style.opacity = 0.7;
		      r2.style.transform = 'translate(220%, -20%)'
		      r3.style.opacity = 0.7;
		      r3.style.transform = 'translate(50%, -380%)'
		      r1.addEventListener('mouseover', function() {
		        this.style.opacity = 1
		        this.style.background = '#7fffef'
		        url = 'music'
		        root.className = 'Mroot'
		      })
		      r1.addEventListener('mouseout', function() {
		        this.style.opacity = 0.7;
		        this.style.background = '#7fffd4';
		        url = 'RicardoPage'
		      })
		      r2.addEventListener('mouseover', function() {
		        this.style.opacity = 1
		        this.style.background = '#f0e6ee'
		        url = 'wall'
		        root.className = 'Wroot'
		      })
		      r2.addEventListener('mouseout', function() {
		        this.style.opacity = 0.7
		        this.style.background = '#f0e68c'
		        url = 'RicardoPage'
		      })
		      r3.addEventListener('mouseover', function() {
		        this.style.opacity = 1;
		        this.style.background = '#fa80bb'
		        url = 'word'
		        root.className = 'Troot'
		      })
		      r3.addEventListener('mouseout', function() {
		        this.style.opacity = 0.7
		        this.style.background = '#fa8072'
		        url = 'RicardoPage'
		      })
		    })

			document.onmouseup = function() {
		      document.onmousemove = null;
		      t.style.background = '#00ffff'
		      var r1 = document.querySelector('.r1');     
		      var r2 = document.querySelector('.r2');      
		      var r3 = document.querySelector('.r3');
		      r1.style.visibility = 'hidden'
		      r1.style.opacity = 0;
		      r1.style.background = '#7fffd4'
		      r1.style.transform = bar[0]
		      r2.style.visibility = 'hidden'
		      r2.style.opacity = 0;
		      r2.style.background = '#f0e68c'
		      r2.style.transform = bar[1]
		      r3.style.visibility = 'hidden'
		      r3.style.opacity = 0;
		      r3.style.transform = bar[2]  
		      if(url != 'RicardoPage') {
		      	location.hash = url
		      	root.style.transform = 'scale(2)'
		      	root.style.background = 'black'
		      } else {
		      	root.className = ''
		      }
		    }

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
		root.style.transform = 'scale(1.2)'
	})
	word.addEventListener('mouseout', function() {
		root.style.transform = ''
	})
	word.addEventListener('click', function() {
		var view = $('.FirstView')
		word.style.opacity = 0 ;
		root.removeChild(view);
	})
}

