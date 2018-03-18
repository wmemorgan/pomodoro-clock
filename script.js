// Initialize global variables
let countDown,
  minutes,
  seconds = 60,
  sessionSet = true,
  timerStarted = false,
  color1,
  color2,
  colorFill = 100,
  colorIncrement,
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
  // assignMinutes();
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

const chooseColor = () => {
  if (sessionSet == true) {
    return color2 = 'green';
  } else {
    return color2 = 'red';
  }
}

const resetColor = () => {
  colorFill = 100;
  color2 = chooseColor();
  timerDisplay.style.background = 'linear-gradient(180deg, #444 ' + colorFill + '%, ' + color2 + ' ' + colorFill + '%)';
}

const startTimer = () => {
  clearTimeout(countDown);
  // assignMinutes();
  color2 = chooseColor();
  colorIncrement = 101.6 / (minutes * 60);
  console.log("Color increment is:", colorIncrement);
  if (seconds == 60) {
    console.log("The minutes are:", minutes);
    timer.innerHTML = minutes + ":" + "00";
  } else {
    timer.innerHTML = minutes - 1 + ":" + (seconds < 10 ? "0" : "") + seconds;
    console.log("The seconds are:", seconds);
  }
  seconds--;
  colorFill = colorFill - colorIncrement;
  timerDisplay.style.background = 'linear-gradient(180deg, #444 ' + colorFill + '%, ' + color2 + ' ' + colorFill + '%)';
  if (seconds == 0) {
    console.log("The minutes are...", minutes); 
    minutes--;
    seconds = 60;
    console.log("Minutes after subtraction:", minutes); 
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
  // interval[1].innerHTML = 25;
  // interval[0].innerHTML = 5;
  timerDisplay.style.background = 'linear-gradient(180deg, #444 100%, ' + color2 + ' 100%)'
  timerStarted = false;
  assignMinutes();
  seconds = 60;
  start.innerHTML = "start";
  timer.innerHTML = minutes + ":" + "00";
}

const timerToggle = () => {
  assignMinutes();
  if (sessionSet == true) {
    sessionTitle.innerHTML = "break!";
    timer.innerHTML = minutes + ":" + "00";
    sessionSet = false;
    resetColor();
  } else {
    sessionTitle.innerHTML = "session";
    timer.innerHTML = minutes + ":" + "00";
    sessionSet = true;
    resetColor();
  }
}

for (let i = 0; i < decrease.length; i++ ) {
  decrease[i].addEventListener("click", decreaseTime(i));
}

for (let i = 0; i < increase.length; i++) {
  increase[i].addEventListener("click", increaseTime(i));
}
minutes = assignMinutes();
timerDisplay.addEventListener("click", pauseResume);
start.addEventListener("click", pauseResume);
reset.addEventListener("click", resetTimer);
