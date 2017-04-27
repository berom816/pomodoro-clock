/*status of whether countdown is stopped or not, allowing user to stop the countdown*/
var startStop = false;

//on work session or on break, if false it's on break
var onWorkSession = true;

//for initial run, one time use
var oneUseSetup = 'initial';

//hold length of break length 
var breakLength = parseInt($('#breakValue').text());

//hold length of session length
var sessionLength = parseInt($('#sessionValue').text());

//click to decrease break length by one min
$('#negativeBreak').click(function() {
  if (breakLength != 1) {
    breakLength--;
    $('#breakValue').text(breakLength);
  }
});

//click to increase break length by one min
$('#positiveBreak').click(function() {
  if (breakLength < 9999) {
    breakLength++;
    $('#breakValue').text(breakLength);
  }
});

//click to decrease session length by one min
$('#negativeSession').click(function() {
  if (sessionLength != 1) {
    sessionLength--;
    $('#sessionValue').text(sessionLength);
  }
});

//click to increase session length by one min
$('#positiveSession').click(function() {
  if (sessionLength < 9999) {
    sessionLength++;
    $('#sessionValue').text(sessionLength);
  }
});

//add zero in front of single digit number for stylizing
function addZero(i){
  if(i<10){
    i = "0"+i;
  }
  return i;
}

//color code to tell which session, break or work session, is 
//currently on, coloring the word orange
function switchColor(onWork){
  if(onWork===true){
    $('#sessionTitle').css('color', 'orange');
    $('#breakTitle').css('color', 'white');
  }
  else{
    $('#breakTitle').css('color', 'orange');
    $('#sessionTitle').css('color', 'white');
  }
}

//variable to hold time interval
var holdInterval = undefined;

//clicking the show time box to initiate countdown
$('#showTime').click(function() {
  if(holdInterval!==undefined){
    clearInterval(holdInterval);
  }
  setupCountDown();
});

//function to count down the time
function setupCountDown() {
  if(oneUseSetup==='initial'){
    $('#mins').text(addZero(parseInt($('#sessionValue').text())));
    oneUseSetup = 'not';
  }

  if (startStop === false) {
    startStop = true;
  } 
  else{
    startStop = false;
  }
  
  if(holdInterval!==undefined){
    clearInterval(holdInterval);
  }
  
  holdInterval = setInterval(countDown, 1000);
}

//functions that counts down, using seconds as base for minutes
function countDown() {
  //hold min value
  var holdMin = parseInt($('#mins').text());

  //hold sec value
  var holdSec = parseInt($('#secs').text());
  
  switchColor(onWorkSession);

  if(startStop === true){
    //reset to 60 when reaches 0
    //decrease one second first to never show number 60 on second
    if(holdSec === 0) {
      holdMin--;
      $('#mins').text(addZero(holdMin));
      holdSec += 60;
    }

    //decrease one second per tick and display value in seconds box
    holdSec--;
    $('#secs').text(addZero(holdSec));

    //when time had run out, stop setInterval using clearInterval
    if (holdMin === 0 && holdSec === 0) {
      //play alarm at end of break and session
      playSound();
      if(onWorkSession){ 
        $('#mins').text(addZero($('#breakValue').text()));
        $('#secs').text(addZero(0));
        startStop=false;
        onWorkSession=false;
        switchColor(onWorkSession);
        setupCountDown();
      }
      else{
        $('#mins').text(addZero($('#sessionValue').text()));
        $('#secs').text(addZero(0));
        startStop = false;
        onWorkSession=true;
        switchColor(onWorkSession);
        setupCountDown();
      }
    }
  }
  else{
    //stop count down by clearing the interval
    clearInterval(holdInterval);
  }
}

//function to play sound
function playSound(){
  //creat audio object for alarm sound
  var x = document.createElement('audio');
  x.src = 'http://soundbible.com/grab.php?id=914&type=mp3';
  x.play();
}

//reset function, change to the length show in session length
function resetThings(){
  onWorkSession = true;
  startStop = false;
  switchColor(onWorkSession);
  if(holdInterval!==undefined){
    clearInterval(holdInterval);
  }
  $('#mins').text(addZero($('#sessionValue').text()));
  $('#secs').text(addZero(0));
}

//click reset button to start new session matching length displayed in session length
$('#resetButton').click(resetThings);