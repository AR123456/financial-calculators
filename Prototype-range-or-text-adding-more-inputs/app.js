// vars
const calculateButton = document.getElementById("calculate");
// range slider
const sliderSavingsGoal = document.getElementById("savingsRange");
//input box
const inputGoal = document.getElementById("savingsInput");
const sliderYears = document.getElementById("yearsRange");
const inputYears = document.getElementById("yearsInput");

//////////////////////////// method one

// function setup() {
//   // https://stackoverflow.com/questions/64199456/changing-the-value-of-the-range-slider-and-input-box-at-the-same-time

//   sliderSavingsGoal.addEventListener("input", function () {
//     inputGoal.value = this.value;
//   });
//   inputGoal.addEventListener("input", function () {
//     sliderSavingsGoal.value = this.value;
//   });
//   goal = parseFloat(inputGoal.value);
//   console.log(sliderSavingsGoal.value);
//   console.log(inputGoal.value);
//   console.log(goal);
// }

// setup();

calculateButton.onclick = function () {
  // since the range and input box have been synced can just get the value from one of them, so using box
  // https://www.youtube.com/watch?v=iKo9pDKKHnc&t=25s 17:20 in
  goal = inputGoal.value;
  years = inputYears.value;
  console.log(goal);
  console.log(years);
  // setup();
  // calculate();
  // syncSavingsGoal();
};
//

// ////////////////////////// alternative way to get values link slider up to number input Kyle Web Dev
// https://www.youtube.com/watch?v=iKo9pDKKHnc&t=25s
// any time input changes call this function - this syncs the slider and box
inputGoal.addEventListener("input", syncSavingsGoal);
inputYears.addEventListener("input", syncYearsGoal);

function syncSavingsGoal(e) {
  const value = e.target.value;
  inputGoal.value = value;
  sliderSavingsGoal.value = value;
}
function syncYearsGoal(e) {
  const value = e.target.value;
  inputYears.value = value;
  sliderYears.value = e.target.value;
}
// get the value from the inputs
