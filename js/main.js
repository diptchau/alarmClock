window.onload = function(){
    $('.content').hide();
}

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

$('#full').click(function(){
    launchIntoFullscreen(document.getElementById("bck"));
    $('#full').hide();
    $('.content').show();
}); 