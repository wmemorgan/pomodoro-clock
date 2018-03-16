let decrease = document.getElementsByClassName("interval-decrease");
let interval = document.getElementsByClassName("interval");
let increase = document.getElementsByClassName("interval-increase");
let sessionTitle = document.getElementById("session-title");
let timer = document.getElementById("timer");
let timerDisplay = document.getElementById("timer-display");
let start = document.getElementById("start");
let reset = document.getElementById("reset");

// Initialize global variables
let t,
  minutes,
  seconds = 60,
  // breakInterval,
  // sessionInterval,
  sessionSet = true,
  buttonToggled = false;

const decreaseTime = (i) => {
  parseInt(interval[i].innerHTML)
  return () => {
    if (parseInt(interval[i].innerHTML) <= 1) {
      console.log("Cannot decrease interval any further!")
      return false;
    } else {
      console.log(parseInt(interval[i].innerHTML));
      console.log("Decrease interval to:",(parseInt(interval[i].innerHTML)-1));
      interval[i].innerHTML = parseInt(interval[i].innerHTML) - 1;
      if (i === 1) {
        timer.innerHTML = interval[i].innerHTML;
      }
    }
  }
};

const increaseTime = (i) => {
  return () => {
      console.log(parseInt(interval[i].innerHTML)); 
      console.log("Increase interval to: ",(parseInt(interval[i].innerHTML)+ 1));
      interval[i].innerHTML = parseInt(interval[i].innerHTML) + 1;
      if (i === 1) {
        timer.innerHTML = interval[i].innerHTML;
      }
  }
};

function buttonToggle() {
  if (buttonToggled == false) {
    start.innerHTML = "pause";
    buttonToggled = true;
    startTimer();
  } else {
    start.innerHTML = "resume"
    buttonToggled = false;
    pauseTimer();
  }
}

const assignMinutes = () => {
  if (sessionSet == true) {
    return minutes = parseInt(interval[1].innerHTML);
  } else {
    return minutes = parseInt(interval[0].innerHTML);
  }
}

function startTimer() {
  clearTimeout(t);
  assignMinutes();
  if (seconds == 60) {
    console.log("The minutes are:", minutes);
    
    timer.innerHTML = minutes + ":" + "00";
  } else {
    timer.innerHTML = minutes - 1 + ":" + (seconds < 10 ? "0" : "") + seconds;
    console.log("The seconds are:", seconds);
  }
  seconds--;
  if (seconds == 0) {
    minutes--;
    console.log("Remaining minutes:", minutes); 
    seconds = 60;
  }
  if (minutes == 0) {
    //document.getElementById('ding').play();
    console.log("Countdown ended going to the next session...");
    timerToggle();
  }
  t = setTimeout(startTimer, 1000);
}

// Seems sort of obvious doesn't it?
function pauseTimer() {
  clearTimeout(t);
}

// Reset timer to user adjusted settings
function resetTimer() {
  clearTimeout(t);
  interval[1].innerHTML = 25;
  interval[0].innerHTML = 5;
  buttonToggled = false;
  if (sessionSet == true) {
    minutes = parseInt(interval[1].innerHTML);
  } else {
    minutes = parseInt(interval[0].innerHTML);
  }
  seconds = 60;
  start.innerHTML = "start";
  timer.innerHTML = minutes + ":" + "00";
}

function timerToggle() {
  if (sessionSet == true) {
    minutes = parseInt(interval[0].innerHTML);
    sessionTitle.innerHTML = "break!";
    timer.innerHTML = minutes + ":" + "00";
    sessionSet = false;
  } else {
    minutes = parseInt(interval[1].innerHTML);
    sessionTitle.innerHTML = "session";
    timer.innerHTML = minutes + ":" + "00";
    sessionSet = true;
  }
}

//setToDefaults();

for (let i = 0; i < decrease.length; i++ ) {
  decrease[i].addEventListener("click", decreaseTime(i));
}

for (let i = 0; i < increase.length; i++) {
  increase[i].addEventListener("click", increaseTime(i));
}

timerDisplay.addEventListener("click", buttonToggle);
start.addEventListener("click", buttonToggle);
reset.addEventListener("click", resetTimer);
