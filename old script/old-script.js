const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector(".test-wrapper");
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const originText = document.querySelector("#origin-text p").innerHTML;
const errorTab = document.querySelector(".error-count p");

  var timer = [0,0,0,0]
  var completed = false;
  var startTime;

// Aesthetics -> add a zero in front ( !0:0:0  ).
// function leadingZero (timer) {
//   if (timer <= 9) {
//   timer = "0" + timer;
//   }
//   return timer;
// }

function leadingZero(num) {
  return num<=9? "0" + num : num
}


function start() {
  var currentTime = Date.now();
  var timeElapsed = currentTime - startTime;

  if (!startTime) {startTime = currentTime};
  if (!completed) {req = requestAnimationFrame(start)}


//Create a dynamic timer:
var minutes = Math.floor(timeElapsed/60000);
var seconds = Math.floor((timeElapsed/1000) - minutes*60);
var miliseconds = timeElapsed - seconds*1000-minutes*60000;

theTimer.innerHTML = leadingZero(minutes) + ":" + leadingZero(seconds) + ":" + miliseconds;
}
// end of start()


//Match the text entered (textarea) with provided text (.origin-text).

function spellCheck() {
  let textEntered = testArea.value;
  let originTestMatch = originText.substring(0, textEntered.length);
  console.log(textEntered);

  if (textEntered == originText) {
    testWrapper.style.borderColor = "limegreen";
    completed = true;
    cancelAnimationFrame(req);
    } else {
      if (textEntered == originTestMatch) {
        testWrapper.style.borderColor = "Aqua"
      } else {
        testWrapper.style.borderColor = "orangered";
        errorCount();
      }
    }
};

function reset() {
  completed = null;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
};

var errors = 0;
function errorCount() {
  errors++
  errorTab.innerHTML = "You have " + errors + " typos."
}

function backspace(event) { /*backspace() does not work without a parameter ('event').
 How does the 'keydown' event takes the role of the 'event' parameter? */
  if (event.keyCode === 8) {
      errors--;
      console.log('BACKSPACE was pressed');}
}

//Add event listeners for test-area.

testArea.addEventListener('keypress', start);

testArea.addEventListener('keyup', spellCheck);

testArea.addEventListener('keydown', backspace);

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
