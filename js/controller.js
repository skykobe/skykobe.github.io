var test = document.querySelector('.FirstView');
test.addEventListener('mouseover', function() {
	document.body.style.backgroundSize = '180%' 
	//document.body.style.background = 'url("/image/12881944.jpg")'
})
test.addEventListener('mouseout', function() {
	document.body.style.backgroundSize = '100%' 
})
