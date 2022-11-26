//  this codes syncs up the range to input box so that the user can use either

// range slider
const sliderSavingsGoal = document.getElementById("savingsRange");
//input box
const inputGoal = document.getElementById("savingsInput");
// range slider
const sliderYears = document.getElementById("yearsRange");
//input box
const inputYears = document.getElementById("yearsInput");
export function setup() {
  // https://stackoverflow.com/questions/64199456/changing-the-value-of-the-range-slider-and-input-box-at-the-same-time
  ///////////// goal

  sliderSavingsGoal.addEventListener("input", function () {
    inputGoal.value = this.value;
  });
  inputGoal.addEventListener("input", function () {
    sliderSavingsGoal.value = this.value;
  });
  goal = parseFloat(inputGoal.value);
  console.log(sliderSavingsGoal.value);
  console.log(inputGoal.value);
  console.log(goal);
  //

  sliderYears.addEventListener("input", function () {
    inputYears.value = this.value;
  });
  inputYears.addEventListener("input", function () {
    sliderYears.value = this.value;
  });
  years = parseFloat(inputYears.value);
  console.log(sliderYears.value);
  console.log(inputYears.value);
  console.log(years);
}
