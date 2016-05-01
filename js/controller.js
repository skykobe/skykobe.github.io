var test = document.querySelector('.word');
// document.body.style.transition = 'background-size 1s'
test.addEventListener('mouseover', function() {
	document.body.style.backgroundSize = '150%';
})
test.addEventListener('mouseout', function() {
	document.body.style.backgroundSize = '100%' 
})
test.addEventListener('click', function() {
	this.style.color = 'white'
	document.body.style.background = 'black'
	document.body.style.backgroundSize = '100%'
	setTimeout(function() {		
		document.body.style.background = 'url(/image/18518352_153416231114_2.jpg) center';
		document.body.style.backgroundSize = '100%';
		var view = document.querySelector('.FirstView')
		document.body.removeChild(view);
		var root = document.createElement('div');
		root.id = 'root';
		root.innerHTML = 'writing now'
		document.body.appendChild(root)
	}, 500);
	//document.querySelector('.FirstView').style.visibility = 'hidden'
	
})