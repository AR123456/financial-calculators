// imports
// import { setup } from "./syncUsingOneFunction.js";

// vars
const calculateButton = document.getElementById("calculate");
// range slider
const sliderGoal = document.getElementById("savingsRange");
//input box
const inputGoal = document.getElementById("savingsInput");
// // range slider
// const sliderYears = document.getElementById("yearsRange");
// //input box
// const inputYears = document.getElementById("yearsInput");

//////////////////////////// method one

function setup() {
  // https://stackoverflow.com/questions/64199456/changing-the-value-of-the-range-slider-and-input-box-at-the-same-time
  ///////////// goal
  sliderGoal.addEventListener("input", function () {
    inputGoal.value = this.value;
  });
  inputGoal.addEventListener("input", function () {
    sliderGoal.value = this.value;
  });
  goal = inputGoal.value;
  console.log(sliderGoal.value);
  console.log(inputGoal.value);
  console.log(goal);
  //

  // sliderYears.addEventListener("input", function () {
  //   inputYears.value = this.value;
  // });
  // inputYears.addEventListener("input", function () {
  //   sliderYears.value = this.value;
  // });
  // years = parseFloat(inputYears.value);
  // console.log(sliderYears.value);
  // console.log(inputYears.value);
  // console.log(years);
}

setup();

calculateButton.onclick = function () {
  // since the range and input box have been synced can just get the value from one of them, so using box
  // https://www.youtube.com/watch?v=iKo9pDKKHnc&t=25s 17:20 in
  goal = parseFloat(inputGoal.value);
  // years = inputYears.value;
  console.log(goal);
  // console.log(years);
  // setup();
  // calculate();
};
//

// // ////////////////////////// alternative way to get values link slider up to number input Kyle Web Dev
// // https://www.youtube.com/watch?v=iKo9pDKKHnc&t=25s
// // any time input changes call this function - this syncs the slider and box
// inputGoal.addEventListener("input", syncSavingsGoal);
// sliderSavingsGoal.addEventListener("input", syncSavingsGoal);
// function syncSavingsGoal(e) {
//   const value = e.target.value;
//   inputGoal.value = value;
//   sliderSavingsGoal.value = value;
// }
// inputYears.addEventListener("input", syncYears);
// sliderYears.addEventListener("input", syncYears);
// function syncYears(e) {
//   const value = e.target.value;
//   inputYears.value = value;
//   sliderYears.value = value;
// }
// // get the value from the inputs
// //TODO can this be DRY ? am taking in the event so have e
// function syncInputAndRange(e) {
//   console.log(`e.target.id = ${e.target.id}`);
//   console.log(`e.target.value = ${e.target.value}`);
//   console.log(e);
//   //
// }