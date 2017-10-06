const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector("#test-area");
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const originText = document.querySelector("#origin-text p").innerHTML;
const errorTabP = document.querySelector(".error-count p");
const errorTab = document.querySelector(".error-count");

var timer = [0,0,0,0]
var completed = false;
var startTime;
var req;

function leadingZero(num) {
  return num<=9? "0" + num : num
}

function start() {
  testArea.addEventListener('keyup', spellCheck);

  testArea.removeEventListener('keypress', start);
  req = requestAnimationFrame(loop)
}
// end of start()

function loop() {
  var currentTime = Date.now();
  var timeElapsed = currentTime - startTime;

  if (!startTime) {startTime = currentTime};
  if (!completed) {req = requestAnimationFrame(loop)}

  //Create a dynamic timer:
  var minutes = Math.floor(timeElapsed/60000);
  var seconds = Math.floor((timeElapsed/1000) - minutes*60);
  var miliseconds = timeElapsed - seconds * 1000 - minutes * 60000;

  theTimer.innerHTML = leadingZero(minutes) + ":" + leadingZero(seconds) + ":" + miliseconds;
}

//Match the text entered (textarea) with provided text (.origin-text).

function spellCheck(e) {
  let textEntered = testArea.value;
  if(textEntered === originText) {
    completed = true;
    testWrapper.style.borderColor = "Gold";
    errorTab.style.borderColor = "Gold";
    finishedRun();
    return;
  }

  if ((e.keyCode >= 48 && e.keyCode <= 90) || event.which === 32) {
    if(textEntered[textEntered.length - 1] === originText[textEntered.length - 1]){
      testWrapper.style.borderColor = "teal";
      errorTab.style.borderColor = "teal";
    } else {
      errors++;
      errorCount();
      testWrapper.style.borderColor = "orangered";
      errorTab.style.borderColor = "orangered";
    }
  }
};

function finishedRun() {
  cancelAnimationFrame(req);
  testArea.removeEventListener('keyup', spellCheck);
}

function reset() {
  completed = null;
  errors = 0;
  startTime = null;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
  errorTab.style.borderColor = "grey";
  errorCount();
  testArea.addEventListener('keypress', start);
};

var errors = 0;
function errorCount() {
  errorTabP.innerHTML = "You have " + errors + " typos."
}

testArea.addEventListener('keypress', start);

resetButton.addEventListener('click', reset);



// //Get a timer (minute, secsonds, hundredths).
//
// function runTimer() {
//     theTimer.innerHTML = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
//
//     timer[3]++;
//     timer[0] = Math.floor((timer[3]/100)/60);
//     timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
//     timer[2] = Math.floor((timer[3] - timer[1] * 100) - (timer[0] * 6000))
//
// }
//
// //Trigger the start.
// function start() {
//   setInterval(runTimer, 10);
//   console.log(testArea.value.length)
//   testArea.removeEventListener("keypress", start);
// }
