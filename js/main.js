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

// target elements with the "draggable" class
$('#refresh').click(function(){
    window.location.reload();
});
$('.content2').hide();
$('.resultscr').fadeOut(0);
$('.timer').hide();
var dt = new Date();
$('.txtTime').html(getHr(dt) + ':' + getMin(dt));

$('.stopBtn').click(function() {
    $('.resultscr').fadeIn(500);
    $('.content2').show();
    exitFullscreen();
});

function exitFullscreen() {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
}

function getHr(d) {
    if (d.getHours().toString().length < 2) {
        return '0' + d.getHours();
    } else {
        return d.getHours();
    }
}

function getMin(d) {
    if (d.getMinutes().toString().length < 2) {
        return '0' + d.getMinutes();
    } else {
        return d.getMinutes();
    }

}

function setDtString(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return (sHours + ":" + sMinutes);
}

function showOp() {
    $('#dropzone1').css({
        left: "15%",
        top: "50vh",
        opacity: 1,
        transform: 'scale(1)'
    });
    $('#dropzone2').css({
        left: "calc(50% - 30px)",
        top: "35vh",
        opacity: 1,
        transform: 'scale(1)'
    });
    $('#dropzone3').css({
        left: 'calc(75% - 30px)',
        top: "50vh",
        opacity: 1,
        transform: 'scale(1)'
    });
    $('#dropzone4').css({
        left: "calc(50% - 30px)",
        top: "65vh",
        opacity: 1,
        transform: 'scale(1)'
    });
}


function hideOp() {
    $('#dropzone1').css({
        left: "calc(50% - 30px)",
        top: "50vh",
        opacity: 0,
        transform: 'scale(0.5)'
    });
    $('#dropzone2').css({
        left: "calc(50% - 30px)",
        top: "50vh",
        opacity: 0,
        transform: 'scale(0.5)'
    });
    $('#dropzone3').css({
        left: "calc(50% - 30px)",
        top: "50vh",
        opacity: 0,
        transform: 'scale(0.5)'
    });
    $('#dropzone4').css({
        left: "calc(50% - 30px)",
        top: "50vh",
        opacity: 0,
        transform: 'scale(0.5)'
    });
}

interact('.draggable').on('down', showOp);
interact('.draggable').on('up', hideOp);

interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        // enable autoScroll
        autoScroll: true,
        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function(event) {
            // var target = event.target;

            // target.style.webkitTransform =
            // target.style.transform =
            //   'translate(' + 0 + 'px, ' + 0 + 'px)';

            // // update the posiion attributes
            // target.setAttribute('data-x', 0);
            // target.setAttribute('data-y', 0);
        }
    });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#drag-1',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.2,

    // listen for drop related events:

    ondropactivate: function(event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function(event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
    },
    ondragleave: function(event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
    },
    ondrop: function(event) {
        $('.resultscr').fadeIn(500);
        $('.symbol').hide();
        $('.timer').show();
        clrAll();
        setTimeout(function() {
            resetPosition();
            startCountdown(event.target.id);
            $('.resultscr').fadeOut(500);
        }, 1000)
    },
    ondropdeactivate: function(event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

function resetPosition() {
    $('#drag-1').css({
        transform: 'translate(0px, 0px)'
    })
    $('#drag-1').attr('data-x', 0);
    $('#drag-1').attr('data-y', 0);
}

function clrAll(){
    var interval_id = window.setInterval("", 9999); // Get a reference to the last
                                                // interval +1
    for (var i = 1; i < interval_id; i++)
        window.clearInterval(i);
}

function startCountdown(selection) {
    var count = 59;
    var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

    function timer() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            return;
        }

        if(selection == 'dropzone1'){
            $('.timer').html('04:' + count); 
        }

        if(selection == 'dropzone2'){
            $('.timer').html('09:' + count); 
        }

        if(selection == 'dropzone3'){
            $('.timer').html('14:' + count); 
        }

        if(selection == 'dropzone4'){
            $('.timer').html('19:' + count); 
        }
    }
}
