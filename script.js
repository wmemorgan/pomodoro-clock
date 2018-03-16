// Initialize global variables
let countDown,
  minutes,
  seconds = 60,
  sessionSet = true,
  timerStarted = false,
  decrease = document.getElementsByClassName("interval-decrease"),
  interval = document.getElementsByClassName("interval"),
  increase = document.getElementsByClassName("interval-increase"),
  sessionTitle = document.getElementById("session-title"),
  timer = document.getElementById("timer"),
  timerDisplay = document.getElementById("timer-display"),
  start = document.getElementById("start"),
  reset = document.getElementById("reset");

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

const pauseResume = () => {
  if (timerStarted == false) {
    start.innerHTML = "pause";
    timerStarted = true;
    startTimer();
  } else {
    start.innerHTML = "resume"
    timerStarted = false;
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

const startTimer = () => {
  clearTimeout(countDown);
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
    console.log("Countdown ended going to the next session...");
    timerToggle();
  }
  countDown = setTimeout(startTimer, 1000);
}

const pauseTimer = () => {
  clearTimeout(countDown);
}

const resetTimer = () => {
  clearTimeout(countDown);
  interval[1].innerHTML = 25;
  interval[0].innerHTML = 5;
  timerStarted = false;
  if (sessionSet == true) {
    minutes = parseInt(interval[1].innerHTML);
  } else {
    minutes = parseInt(interval[0].innerHTML);
  }
  seconds = 60;
  start.innerHTML = "start";
  timer.innerHTML = minutes + ":" + "00";
}

const timerToggle = () => {
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

for (let i = 0; i < decrease.length; i++ ) {
  decrease[i].addEventListener("click", decreaseTime(i));
}

for (let i = 0; i < increase.length; i++) {
  increase[i].addEventListener("click", increaseTime(i));
}

timerDisplay.addEventListener("click", pauseResume);
start.addEventListener("click", pauseResume);
reset.addEventListener("click", resetTimer);
