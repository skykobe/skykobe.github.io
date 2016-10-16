root.style = ''
root.className = ''
root.style.background = '#eeeeee'
root.style.color = 'black'
document.body.style.background = '#eeeeee'
var album = $('#photoAlbum')
var modal = $('#modal')
var newFront = $('#newFront')
var newBack = $('#newBack')
var newLeft = $('#newLeft')
var newRight = $('#newRight')
var newTop = $('#newTop')
var newBottom = $('#newBottom')
var modalOut = function() {
  modal.style.opacity = 0
  setTimeout(function(){
    modal.style.display = 'none'
  }, 600)  
}
var newPicClick = function(e) {
  var that = this
  modal.style.display = 'block'
  setTimeout(function(){
    modal.style.opacity = 1
  }, 0)
  $('#picUrl').focus()
  $('#picUrl').value = this.src
  $('#picUrl').onkeyup = function(e) {
    console.log(e.key)
    if(e.key == 'Enter') {
      that.src = this.value
      modalOut()
    } else if(e.key == 'Escape') {
      modalOut()
    }
  }
}
modal.addEventListener('click', function(e) {
  if(e.target.id == 'modal') {
    this.style.opacity = 0
    var that = this
    setTimeout(function(){
      that.style.display = 'none'
    }, 600)
  }
}, false)
album.addEventListener('click', function(e) {
  var node = e.target.parentNode
  if(node.className != 'cube') {
    node = node.parentNode
  }
  var t = Array.prototype.slice.call(node.children)
  t.forEach(function(n, index) {
    var img = n.getElementsByTagName('img')
    switch(index) {
      case 0: 
        newFront.src = img[0].currentSrc;
        newFront.onclick = newPicClick
        break;
      case 1:
        newBack.src = img[0].currentSrc;
        newBack.onclick = newPicClick
        break;
      case 2:
        newLeft.src = img[0].currentSrc;
        newLeft.onclick = newPicClick
        break;
      case 3: 
        newRight.src = img[0].currentSrc;
        newRight.onclick = newPicClick
        break;
      case 4:   
        newTop.src = img[0].currentSrc;
        newTop.onclick = newPicClick
        break;
      case 5: 
        newBottom.src = img[0].currentSrc;
        newBottom.onclick = newPicClick
        break;
    }
  })
})
album.addEventListener('dblclick', function(e) {
  var node = e.target.parentNode
  if(node.className != 'cube') {
    node = node.parentNode
  }
  var t = Array.prototype.slice.call(node.children)
  var picList = []
  t.forEach(function(n, index) {
    var img = n.getElementsByTagName('img')
    picList.push(img[0].currentSrc)
  })
  loadHtml('template/3Dpic.html', function(data) {
    root.innerHTML = data
    location.hash = 'see'
    var pic = $('#test')
    var group = pic.getElementsByTagName('img')
    var a = Array.prototype.slice.call(group)
    a.forEach(function(n, index) {
      n.src = picList[index]
    })
    var currX,currY,oldX = 40, oldY = -30, check; 
    document.body.addEventListener('mousedown', function(e) {
      startDown(e.clientX, e.clientY)
      e.preventDefault();
    })
    document.body.addEventListener('mousemove', function(e) {
      if(check == true) {
        startMove(e.clientX, e.clientY)
      }
      e.preventDefault();
    })
    document.body.addEventListener('mouseup', function(e) {
      check = false
      e.preventDefault();
    })
    function startDown(x, y) {
      currX = x;
      currY = y;
      check = true;
    }
    function startMove(x, y) {
      var dx = x - currX;
      var dy = y - currY;
      setRot(dx, dy);
      currY = y;
      currX = x;
    }
    function setRot(x, y) {
      oldX += x;
      oldY += y;
      if(oldY > 90) {
        oldY = 90
      } else if(oldY < -90) {
        oldY = -90
      }
      $('#test').style.transform = 'rotateX(' + oldY + 'deg)' + ' rotateY(' + oldX + 'deg)' + ' translate3d(0px, 0px, 0px)' 
    }
  })
})
