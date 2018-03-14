let decrease = document.getElementsByClassName("interval-decrease");
let interval = document.getElementsByClassName("interval");
let increase = document.getElementsByClassName("interval-increase");
let sessionName = document.getElementsByClassName("session-name");
let timer = document.getElementsByClassName("timer");
let timerDisplay = document.getElementsByClassName("timer-display");

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
        timer[0].innerHTML = interval[i].innerHTML;
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
        timer[0].innerHTML = interval[i].innerHTML;
      }
  }
};

const timeTarget = (i) => {
    return new Date().getTime() + parseInt(interval[i].innerHTML) * 1000;
};

const countDown = (countDownDate, i) => {
    let countdown = setInterval( () => {
      let now = new Date().getTime();
      let intervalLength = countDownDate - now;
      let minutes = Math.floor((intervalLength % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((intervalLength % (1000 * 60)) / 1000);
      console.log("Current time:", now);
      console.log("Interval length:", intervalLength);
      console.log("m:", minutes, "s:", seconds);
      timer[0].innerHTML = minutes + ":" + ('0' + seconds).slice(-2);

      if (intervalLength < 0) {
        timer[0].innerHTML = interval[i].innerHTML;
        countDownDate = timeTarget(1);
        countDown(countDownDate,1);
        //clearInterval(countdown);
      }
    }, 1000);
    
  
}

// var countDownDate = new Date().getTime() + parseInt(interval[0].innerHTML)*60000;

const initializeCountDown = () => {
  countDown(timeTarget(1), 1);
}

// // Update the count down every 1 second
// var countDown = setInterval(function () {

//   // Get todays date and time
//   var now = new Date().getTime();

//   // Find the distance between now an the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Display the result in the element with id="demo"
//   timer[0].innerHTML = minutes + ":" + ('0' + seconds).slice(-2);
  
//   // If the count down is finished, write some text 
//   if (distance < 0) {
//     clearInterval(countDown);
//     timer[0].innerHTML = "EXPIRED";
//   }
// }, 1000);

// setInterval(function () {

//   // Get todays date and time
//   var now = new Date().getTime();

//   // Find the distance between now an the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Display the result in the element with id="demo"
//   timer[0].innerHTML = minutes + ":" + ('0' + seconds).slice(-2);

//   // If the count down is finished, write some text 
//   // if (distance < 0) {
//   //   clearInterval(countDown);
//   //   timer[0].innerHTML = "EXPIRED";
//   // }
// }, 1000);

for (let i = 0; i < decrease.length; i++ ) {
  decrease[i].addEventListener("click", decreaseTime(i));
}

for (let i = 0; i < increase.length; i++) {
  increase[i].addEventListener("click", increaseTime(i));
}

timerDisplay[0].addEventListener("click", initializeCountDown);

// for (let i = 0; i < interval.length ; i++) {
//   timeTarget(i);
// }