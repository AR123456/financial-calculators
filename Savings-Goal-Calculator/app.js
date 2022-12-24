//TODO create a app that will take in a dollar amount goal and years goal
// the app will calculate how much needs to be saved per month to achieve  the goal
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
const actualTime = document.getElementById("actualTime");
// Buttons
const calculateButton = document.getElementById("calculate");
const viewReportButton = document.getElementById("viewReport");

// function to sync range and  text box inputs
function syncInputs() {
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
syncInputs();
// calculate  function
const calculate = () => {
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
  // real interest rate = interest rate - inflation rate
  const realInt = (expectedReturn - expectedInflation) / 100;
  console.log(realInt);
  // calcTime =
  //   Math.log(1 + (goal * realInt) / monthlySaved) / Math.log(1 + realInt);
  //calcTime is the actual amount of time needed to reach the savings goal////
  calcTime =
    Math.log(1 + (goal * realInt) / (monthlySaved + currentSaved)) /
    Math.log(1 + realInt);
  console.log(`Months needed ${calcTime}`);
  // https://stackoverflow.com/questions/39275225/how-to-convert-a-number-of-months-into-months-and-years
  // act Years and actMonths are for formatting year month style
  const actYears = Math.floor(calcTime / 12);
  // let actMonths = Math.ceil(calcTime % 12);
  const actMonths = Math.round(calcTime % 12);

  /////
  if (calcTime < years * 12) {
    // to do change this to __ years and __ months
    actualTime.innerHTML = `<span>You will reach your savings goal in ${actYears} years ${actMonths} months.</span>
  </span>`;
  } else {
    actualTime.innerHTML = `<span>${years} years is not enough time. You will need ${actYears} years ${actMonths} months to reach your savings goal. </span>`;
  }

  // calcMonthly is what actually needs to be saved per month to get to goal//////////
  // calcMonthly =( goal*realInt)/( (1+realInt) to the power of years*12)-1)
  // Math.pow(1 + realInt,years*12)
  calcMonthly = (goal * realInt) / (Math.pow(1 + realInt, years * 12) - 1);
  console.log(
    `What actually needs to be saved monthly to get to goal in year specified ${calcMonthly}`
  );
  //
  //TODO calculate the value of the annuity each year for the graph.  Will need the calculated values and monthly savings for the entered values and the calculated value for what is needed as an actual monthly deposit to meet the savings goal.
  overTimePerYearActual = "actual value of annuity";
  overTimePerYearNeeded =
    "what actually needs to be saved per month based on entered goal";
};

calculateButton.onclick = function () {
  calculate();
};
//TODO work on formatting to match example site, look at DYI jumbotron
// TODO for the chart will need to know given plan if goal will be reached and compare that to what the actual plan (monthly savings) need to be to achieve it. In the given amount of time

r;
