// vars
const calculateButton = document.getElementById("calculate");
// getting range and text inputs
const sliderGoal = document.getElementById("savingsRange");
const inputGoal = document.getElementById("savingsInput");
const sliderYears = document.getElementById("yearsRange");
const inputYears = document.getElementById("yearsInput");
const sliderCurrentSaved = document.getElementById("currentSavedRange");
const inputCurrentSaved = document.getElementById("currentSavedInput");
const sliderMonthlySavings = document.getElementById("monthlySavingsRange");
const inputMonthlySavings = document.getElementById("monthlySavingsInput");
const sliderExpectedRate = document.getElementById("expectedRateRange");
const inputExpectedRate = document.getElementById("expectedRateInput");
const sliderInflationRate = document.getElementById("expectedInflationRange");
const inputInflationRate = document.getElementById("expectedInflationInput");

//////////////////////////// method one

function setup() {
  // https://stackoverflow.com/questions/64199456/changing-the-value-of-the-range-slider-and-input-box-at-the-same-time

  sliderGoal.addEventListener("input", function () {
    inputGoal.value = this.value;
  });
  inputGoal.addEventListener("input", function () {
    sliderGoal.value = this.value;
  });
  sliderYears.addEventListener("input", function () {
    inputYears.value = this.value;
  });
  inputYears.addEventListener("input", function () {
    sliderYears.value = this.value;
  });
  sliderCurrentSaved.addEventListener("input", function () {
    inputCurrentSaved.value = this.value;
  });
  inputCurrentSaved.addEventListener("input", function () {
    sliderCurrentSaved.value = this.value;
  });
  sliderMonthlySavings.addEventListener("input", function () {
    inputMonthlySavings.value = this.value;
  });
  inputMonthlySavings.addEventListener("input", function () {
    sliderMonthlySavings.value = this.value;
  });
  sliderExpectedRate.addEventListener("input", function () {
    inputExpectedRate.value = this.value;
  });
  inputExpectedRate.addEventListener("input", function () {
    sliderExpectedRate.value = this.value;
  });
  sliderInflationRate.addEventListener("input", function () {
    inputInflationRate.value = this.value;
  });
  inputInflationRate.addEventListener("input", function () {
    sliderInflationRate.value = this.value;
  });
}

setup();

calculateButton.onclick = function () {
  // since the range and input box have been synced can just get the value from one of them, so using box
  // https://www.youtube.com/watch?v=iKo9pDKKHnc&t=25s 17:20 in
  goal = parseFloat(inputGoal.value);
  years = parseFloat(inputYears.value);
  currentSaved = parseFloat(inputCurrentSaved.value);
  monthlySaved = parseFloat(inputMonthlySavings.value);
  expectedReturn = parseFloat(inputExpectedRate.value);
  expectedInflation = parseFloat(inputInflationRate.value);
  console.log(goal);
  console.log(years);
  console.log(currentSaved);
  console.log(monthlySaved);
  console.log(expectedReturn);
  console.log(expectedInflation);
  // setup();
  // calculate();
};
//

// ////////////////////////// alternative way to get values link slider up to number input Kyle Web Dev
// https://www.youtube.com/watch?v=iKo9pDKKHnc&t=25s
// any time input changes call this function - this syncs the slider and box
// inputGoal.addEventListener("input", syncSavingsGoal);
// sliderGoal.addEventListener("input", syncSavingsGoal);
// function syncSavingsGoal(e) {
//   const value = e.target.value;
//   inputGoal.value = value;
//   sliderGoal.value = value;
// }
// // get the value from the inputs
