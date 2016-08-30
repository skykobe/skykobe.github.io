musicIniter.end()
root.style = ''
root.className = ''
root.style.background = '#e1fffa'
root.style.color = 'black'
document.body.style.background = '#e1fffa'
var musicplayer = '<div class="musicFrame"><div class="player"><div class="playerTop"><img src="/image/music/m-4.png"><img src="/image/music/m-5.png"></div>' + 
				  '<div class="playBody">player</div>' + 
				  '<div class="playerBottom"><div class="progress"><div class="progressBar"></div>' +
				  '<span style="color: white;background: grey"><span id="nowTime">0:00</span>/<span id="totalTime">0:00</span></span></div>'+ 
				  '<div class="col"><img src="/image/music/m-7.png" style="height: 20px;"></div><div class="col">' + 
				  '<img src="/image/music/m-8.png" id="last"></div>' + 
				  '<div class="col"><img src="/image/music/m-10.png" id="playOrPause"></div>' + 
				  '<div class="col"><img src="/image/music/m-8R.png" id="next"></div>' + 
				  '<div class="col"><img src="/image/music/m-11.png" style="height: 20px; transition: 0.8s" id="volume" />' + 
				  '<div class="volChoice blur" id="volChoice"><div class="volPick"></div></div></div></div></div>' +
				  '<div class="test"></div><div class="songer">' + 
				  '<div class="songerTop"><img src="/image/music/m-13.png"></div>' + 
				  '<div class="songerBody"><div id="tb"></div></div></div></div>'

root.innerHTML = musicplayer
var pbm = document.querySelector('.playerBottom');
var pby = document.querySelector('.playBody');
var height = pby.clientHeight + 129
pbm.style.transform = 'translateY(-' + height + 'px)'
window.onresize = function() {
	pbm = document.querySelector('.playerBottom');
	pby = document.querySelector('.playBody');
	height = pby.clientHeight + 129
	pbm.style.transform = 'translateY(-' + height + 'px)'
}
var tb = document.querySelector('#tb')
var playingSong = document.createElement('audio'), pp = document.querySelector('#playOrPause')
var oldSong, songList = [];
fetch('test.json').then(function(res) {
	return res.json()
}).then(function(data) {
	data.songs.forEach(function (data, index) {
		songList.push(data.name)
		if((index+1) % 2 == 0) {
		var song = '<div class="song_o"><div class="songUD">' + 
					'<img src="/image/music/m-15.png" width="21px"></div>' + 
				    '<div class="songUD"><img src="/image/music/m-15.png" width="21px" style="transform: rotateZ(180deg)">' + 
				    '</div><div class="songName">' + data.name + '</div></div>'				
		} else {
		var song = '<div class="song_j"><div class="songUD">' + 
					'<img src="/image/music/m-15.png" width="21px"></div>' + 
				    '<div class="songUD"><img src="/image/music/m-15.png" width="21px" style="transform: rotateZ(180deg)">' + 
				    '</div><div class="songName">' + data.name + '</div></div>'				
		}
		tb.innerHTML += song
	})
})
/*
歌曲函数
*/
var progressLen, timeUpdateCtl = true; //于进度条相关
var musicCreate = function (url, num) {
	playingSong.src = url
	playingSong.oncanplaythrough = function() {	
		pby.innerHTML = 'playing'
		if(oldSong) {
			oldSong.className = oldSong.className.slice(0,7)
		}
		playingSong.play()
		oldSong = (num == 1? oldSong.previousElementSibling : oldSong.nextElementSibling) 
		oldSong.className += ' songActive'
		progressLen = ($('.progress').clientWidth-15)/this.duration
		console.log(progressLen.toFixed(2))
		var Tmin = parseInt(this.duration/60)
		var Tsec = parseInt(this.duration%60)			
		$('#totalTime').innerHTML = Tmin + ':' + Tsec
	}
	playingSong.onended = function() { // 结束后跳到下一首
		toggleMusic(2)
	}
	playingSong.ontimeupdate = function(e) {
		var Nmin = parseInt(this.currentTime/60)
		var Nsec = parseInt(this.currentTime%60)
		if(timeUpdateCtl) {
			$('.progressBar').style.left = this.currentTime*progressLen + 'px'
		}
		$('#nowTime').innerHTML = Nmin + ':' + (Nsec < 10 ? '0'+Nsec:Nsec)
	}
}
tb.addEventListener('dblclick',function(e) {
	console.log(e)
	pby.innerHTML = 'loading'
	if(e.target.className == 'song_o' || e.target.className == 'song_j') {

	} else {
		var url = '/resources/' + e.target.innerHTML + '.mp3'
		playingSong.src = url
		playingSong.oncanplaythrough = function() {	
			pby.innerHTML = 'playing'
			if(oldSong) {
				oldSong.className = oldSong.className.slice(0,7)
			}
			playingSong.play()
			pp.src = '/image/music/m-9.png'
			oldSong = e.target.parentNode;
			console.log('oldsong', oldSong)
			e.target.parentNode.className += ' songActive'
			progressLen = ($('.progress').clientWidth-15)/this.duration // 每秒对应的进度条长度
			console.log(progressLen.toFixed(2))
			var Tmin = parseInt(this.duration/60)
			var Tsec = parseInt(this.duration%60)			
			$('#totalTime').innerHTML = Tmin + ':' + Tsec
		}
		playingSong.onended = function() {
			toggleMusic(2)
			pp.src = '/image/music/m-9.png'
		}
		playingSong.ontimeupdate = function(e) {
			var Nmin = parseInt(this.currentTime/60)
			var Nsec = parseInt(this.currentTime%60)
			if(timeUpdateCtl) {
				$('.progressBar').style.left = this.currentTime*progressLen + 'px'
			}
			$('#nowTime').innerHTML = Nmin + ':' + (Nsec < 10 ? '0'+Nsec:Nsec)
		}
	}
}) 
pp.addEventListener('click', function() {
	if(playingSong.paused) {
		pp.src = '/image/music/m-9.png'
		playingSong.play()
	} else {
		pp.src = '/image/music/m-10.png'
		playingSong.pause()
	}
})
var toggleMusic = function(num) {
	var nowSong = oldSong.children[2].innerHTML
	var adre = songList.indexOf(nowSong)
	if(num == 2) {
		var url = '/resources/' + songList[adre + 1] + '.mp3'
		console.log(url);
		if(adre + 1 == songList.length) {
			alert('已经是列表的最后一首')
		} else {		
			pby.innerHTML = 'loading'
			musicCreate(url, num)
		}
	} else {
		var url = '/resources/' + songList[adre - 1] + '.mp3'
		console.log(url);
		if(adre - 1 == -1) {
			alert('已经是列表的第一首')
		} else {	
			pby.innerHTML = 'loading'
			musicCreate(url, num)
		}
	}
}
var next = $('#next')
next.addEventListener('click', function (argument) {
	toggleMusic(2)
})
var last = $('#last')
last.addEventListener('click', function() {
	toggleMusic(1)
})
$('.progressBar').addEventListener('mousedown' , function(e) {
	timeUpdateCtl = false
	var that = this
	var M_x = e.clientX
	console.log(that.offsetLeft, that.parentNode.offsetLeft)
	document.onmousemove = function(e) {		
		var tttt = e.clientX-that.parentNode.offsetLeft-that.parentNode.parentNode.offsetLeft
		if(tttt < 0) {
			tttt = 0
		}
		if(tttt > that.parentNode.clientWidth - 15) {
			tttt = that.parentNode.clientWidth-15
		}
		that.style.left = tttt + 'px'
		playingSong.currentTime = tttt/progressLen	
	}
	document.onmouseup = function() {
		this.onmousemove = null
		timeUpdateCtl = true
	}
})
var volPickIn = function() {
	this.style.left = '20%';
	$('.volChoice').classList.remove('blur')
}
$('#volume').addEventListener('mouseover', volPickIn)
$('#volume').addEventListener('click', function () {	
	 this.style.left = '50%';
	 $('.volChoice').classList.add('blur')
})
$('.volPick').addEventListener('mousedown', function(e) {
	var that = this
	var oldX = e.clientY
	var volLen = 100/$('#volChoice').clientHeight
	document.onmousemove = function(e) {
		var Len = 30 + (e.clientY-oldX)
		if(Len < 6) {
			Len = 6
		} else if(Len > 54) {
			Len = 54
		}
		that.style.top = Len + 'px'
		Len = (Len == 6? 0 : Len)
		console.log(Math.ceil(Len*(100/54))/100)
		playingSong.volume = Math.ceil(Len*volLen)/100
	}
	document.onmouseup = function() {
		this.onmousemove = null
	}
})