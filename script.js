let decrease = document.getElementsByClassName("interval-decrease");
let interval = document.getElementsByClassName("interval");
let increase = document.getElementsByClassName("interval-increase");
let sessionName = document.getElementsByClassName("session-name");
let timer = document.getElementsByClassName("timer");

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
    }
  }
};

const increaseTime = (i) => {
  return () => {
      console.log(parseInt(interval[i].innerHTML)); 
      console.log("Increase interval to: ",(parseInt(interval[i].innerHTML)+ 1));
      interval[i].innerHTML = parseInt(interval[i].innerHTML) + 1;
  }
};

const timeTarget = (i) => {
    return new Date().getTime() + parseInt(interval[i].innerHTML) * 60000;
};

const countDown = () => {
  let now = new Date().getTime();
  let intervalLength = timeTarget - now ;
  let minutes = Math.floor((intervalLength % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((intervalLength % (1000 * 60)) / 1000);
  console.log("Current time:", now);
  console.log("Interval length:", intervalLength);
  console.log("m:", minutes, "s:", seconds);
  timer[0].innerHTML = minutes + ":" + seconds;
  // console.log("s:", seconds);
}

for (let i = 0; i < decrease.length; i++ ) {
  decrease[i].addEventListener("click", decreaseTime(i));
}

for (let i = 0; i < increase.length; i++) {
  increase[i].addEventListener("click", increaseTime(i));
}

for (let i = 0; i < interval.length ; i++) {
  timeTarget(i);
}