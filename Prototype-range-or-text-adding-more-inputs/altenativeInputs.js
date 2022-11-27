// Consts
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

// ////////////////////////// alternative way to get values link slider up to number input Kyle Web Dev
// https://www.youtube.com/watch?v=iKo9pDKKHnc&t=25s
// any time input changes call this function - this syncs the slider and box
/////// Goal
inputGoal.addEventListener("input", syncSavingsGoal);
sliderGoal.addEventListener("input", syncSavingsGoal);
function syncSavingsGoal(e) {
  const value = e.target.value;
  inputGoal.value = value;
  sliderGoal.value = value;
}
///// Years to save
inputYears.addEventListener("input", syncYears);
sliderYears.addEventListener("input", syncYears);
function syncYears(e) {
  const value = e.target.value;
  inputYears.value = value;
  sliderYears.value = value;
}
/////// Current saved
inputCurrentSaved.addEventListener("input", syncSaved);
sliderCurrentSaved.addEventListener("input", syncSaved);
function syncSaved(e) {
  const value = e.target.value;
  inputCurrentSaved.value = value;
  sliderCurrentSaved.value = value;
}
//////  Monthly savings
inputMonthlySavings.addEventListener("input", syncMonthly);
sliderMonthlySavings.addEventListener("input", syncMonthly);
function syncMonthly(e) {
  const value = e.target.value;
  inputMonthlySavings.value = value;
  sliderMonthlySavings.value = value;
}
////// Expected Rate return
inputExpectedRate.addEventListener("input", syncRate);
sliderExpectedRate.addEventListener("input", syncRate);
function syncRate(e) {
  const value = e.target.value;
  inputExpectedRate.value = value;
  sliderExpectedRate.value = value;
}
///// expected inflation rate
inputInflationRate.addEventListener("input", syncInflation);
sliderInflationRate.addEventListener("input", syncInflation);
function syncInflation(e) {
  const value = e.target.value;
  inputInflationRate.value = value;
  sliderInflationRate.value = value;
}
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
};
