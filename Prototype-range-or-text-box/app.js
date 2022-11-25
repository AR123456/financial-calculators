// vars
const calculateButton = document.getElementById("calculate");
const sliderGoal = document.getElementById("savingsRange");
const inputGoal = document.getElementById("savingsRangeInput");

function setup() {
  // https://stackoverflow.com/questions/64199456/changing-the-value-of-the-range-slider-and-input-box-at-the-same-time

  sliderGoal.addEventListener("input", function () {
    inputGoal.value = this.value;
  });
  inputGoal.addEventListener("input", function () {
    sliderGoal.value = this.value;
  });
  goal = parseFloat(inputGoal.value);
  console.log(sliderGoal.value);
  console.log(inputGoal.value);
  console.log(goal);
}

setup();

calculateButton.onclick = function () {
  setup();
  // calculate();
};
