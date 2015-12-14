var counterSec = 0;
var counterMin = 25;
var mode = "Session";
var sessionMin = 25;
var breakMin = 5;
var reset = false;

$("a").click(function(event) {
  event.preventDefault();
});

$(document).ready(function(){
  $('body').flowtype({
    minFont: 40,
    maxFont: 60
  });
});

function check_timer() {
  if ($('#timer').hasClass('start')) {
    if (reset & mode === "Session") {
      counterSec = 0;
      counterMin = sessionMin;
      reset = false;
    }
    if (reset & mode === "Break") {
      counterSec = 0;
      counterMin = breakMin;
      reset = false;
    }
    if (counterSec < 10) {
      $('#counterMin').html(counterMin + ":" + "0" + counterSec);
    } else {
      $('#counterMin').html(counterMin + ":" + counterSec);
    }
    $('#timer').val("Stop Timer");
    timer = setInterval("decreaseCounter()", 1000);
    $('#timer').removeClass('start');
    $("#timer").addClass("pause");
  } else {
    if ($("#timer").hasClass("pause")) {
      clearInterval(timer);
      $('#timer').val("Start Timer");
      $("#timer").removeClass("pause");
      $('#timer').addClass('start');
    }
  }
}

function decreaseCounter() {
  if (counterSec !== 0) {
    counterSec = counterSec - 1;
    if (counterSec < 10) {
      $('#counterMin').html(counterMin + ":" + "0" + counterSec);
    } else {
      $('#counterMin').html(counterMin + ":" + counterSec);
    }
  } else {
    if (counterMin !== 0) {
      counterMin = counterMin - 1;
      counterSec = 59;
      if (counterSec < 10) {
        $('#counterMin').html(counterMin + ":" + "0" + counterSec);
      } else {
        $('#counterMin').html(counterMin + ":" + counterSec);
      }
    } else {
      modeChange();
    }
  }
}

function modeChange() {
  if (mode === "Session") {
    clearInterval(timer);
    mode = "Break";
    $("#mode-description").html("Break");
    $("#timer").removeClass("pause");
    $('#timer').addClass('start');
    counterSec = 0;
    counterMin = breakMin;
    $('#timer-audio')[0].play();
    check_timer();
  } else {
    clearInterval(timer);
    mode = "Session";
    $("#mode-description").html("Session");
    $("#timer").removeClass("pause");
    $('#timer').addClass('start');
    counterSec = 0;
    counterMin = sessionMin;
    $('#timer-audio')[0].play();
    check_timer();
  }
}

function decreaseBreak() {
  if ($("#timer").hasClass("start") & breakMin > 1) {
    breakMin = breakMin - 1;
    $("#break-length").html(breakMin);
    reset = true;
    if (mode === "Break") {
      $('#counterMin').html(breakMin + ":00");
    }
  }
}

function increaseBreak() {
  if ($("#timer").hasClass("start") & breakMin < 99) {
    breakMin = breakMin + 1;
    $("#break-length").html(breakMin);
    reset = true;
    if (mode === "Break") {
      $('#counterMin').html(breakMin + ":00");
    }
  }
}

function decreaseSession() {
  if ($("#timer").hasClass("start") & sessionMin > 1) {
    sessionMin = sessionMin - 1;
    $("#session-length").html(sessionMin);
    reset = true;
    if (mode === "Session") {
      $('#counterMin').html(sessionMin + ":00");
    }
  }
}

function increaseSession() {
  if ($("#timer").hasClass("start") & sessionMin < 99) {
    sessionMin = sessionMin + 1;
    $("#session-length").html(sessionMin);
    reset = true;
    if (mode === "Session") {
      $('#counterMin').html(sessionMin + ":00");
    }
  }
}

function resetClock() {
  mode = "Session";
  $("#mode-description").html("Session");
  if ($("#timer").hasClass("start")) {
    clearInterval(timer);
    reset = true;
    $('#counterMin').html(sessionMin + ":00");
  }
  if ($("#timer").hasClass("pause")) {
    clearInterval(timer);
    $('#timer').val("Start Timer");
    $("#timer").removeClass("pause");
    $('#timer').addClass('start');
    reset = true;
    $('#counterMin').html(sessionMin + ":00");
  }
}
