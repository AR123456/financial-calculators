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

// Function to format input boxes as currency
// the initial values, any changes and slider inputs should all be formated
// target values on page load or with a change call this function
// function formatCurrency(num) {
//   console.log(
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 2,
//     }).format(num)
//   );
// }
// formatCurrency(inputGoal.value);
// function to sync range and  text box inputs
function syncInputs() {
  // https://stackoverflow.com/questions/64199456/changing-the-value-of-the-range-slider-and-input-box-at-the-same-time

  // /////////////////////////
  sliderGoal.addEventListener("input", function () {
    inputGoal.value = this.value;
  });
  inputGoal.addEventListener("input", function () {
    sliderGoal.value = this.value;
    // console.log(sliderGoal.dataset);
    updateProgress(sliderGoal);
  });
  sliderYears.addEventListener("input", function () {
    inputYears.value = this.value;
  });
  inputYears.addEventListener("input", function () {
    sliderYears.value = this.value;
    updateProgress(sliderYears);
  });
  sliderCurrentSaved.addEventListener("input", function () {
    inputCurrentSaved.value = this.value;
  });
  inputCurrentSaved.addEventListener("input", function () {
    sliderCurrentSaved.value = this.value;
    updateProgress(sliderCurrentSaved);
  });
  sliderMonthlySavings.addEventListener("input", function () {
    inputMonthlySavings.value = this.value;
  });
  inputMonthlySavings.addEventListener("input", function () {
    sliderMonthlySavings.value = this.value;
    updateProgress(sliderMonthlySavings);
  });
  sliderExpectedRate.addEventListener("input", function () {
    inputExpectedRate.value = this.value;
  });
  inputExpectedRate.addEventListener("input", function () {
    sliderExpectedRate.value = this.value;
    updateProgress(sliderExpectedRate);
  });
  sliderInflationRate.addEventListener("input", function () {
    inputInflationRate.value = this.value;
  });
  inputInflationRate.addEventListener("input", function () {
    sliderInflationRate.value = this.value;
    updateProgress(sliderInflationRate);
  });
}
syncInputs();

//  this is the FV formula from stack overflow
// https://stackoverflow.com/questions/1780645/how-to-calculate-future-value-fv-using-javascript
function FV(rate, nper, pmt, pv, type) {
  var pow = Math.pow(1 + rate, nper),
     fv;
  if (rate) {
   fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
  } else {
   fv = -1 * (pv + pmt * nper);
  }
  return fv.toFixed(2);
}
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
  // removing for now
  // const realInt = (expectedReturn - expectedInflation) / 100;
  // Assuming compounding monthly
  // API convreted to monthly rate of return expected rate of return / months then to get % as numb /100
  const n = years * 12;
  const API = expectedReturn / 100;
  const rate = API / n; // monthly rate of return
  console.log(rate);
  const realInt = rate;
  console.log(realInt);

  // TODO this is calc is a bit off
  calcTime =
    Math.log(1 + (goal * realInt) / (monthlySaved + currentSaved)) /
    Math.log(1 + realInt);

  console.log(`Months needed ${calcTime}`);
  // doing some calculations from the PDF
  // Correct what componded value of current amount saved is in the given years to save
  FV = currentSaved * Math.pow(1 + realInt, n);
  FVA = FV * monthlySaved;

  console.log(
    `This is the FV of just current savings after said amount of years ${FV}`
  );
  console.log(
    `This is the FV annuity that takes into account monthly savings  ${FVA}`
  );
  CV = currentSaved;

  TermOfMaturity = (FV / CV - 1) / realInt;
  console.log(`this should be years ${TermOfMaturity.toFixed(2)}`);
  // payment of annuity based on the current value or current saved
  A = (CV * realInt) / 1 - Math.pow(1 + realInt, -years);
  console.log(
    `Payment of annuity based on current saved or better stated the amount of interest earned each year for the number of years on the plan  ${A.toFixed(
      2
    )}`
  );
  // Term of annuity due future value given - in this case FV is goal
  // TODO this should be the time to reach goal but it is not
  TermOfAnnuityDueGoalGiven =
    Math.log(
      1 + (goal * realInt) / ((currentSaved + monthlySaved) * 1 + realInt)
    ) / Math.log(1 + realInt);
  console.log(
    `Term of annuity due with FV or goal given ${TermOfAnnuityDueGoalGiven}`
  );
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

// adding JS to get the range track and ticks working
///////////////////////////////////////////////////////////////////////
// looking at using Javascript to generate slider marks
// https://codepen.io/viestursm/pen/BayEjaN
function init() {
  // getting slider to pass into the functions that control appearance and behavior
  // each range input has the class tick-slider-input
  const sliders = document.getElementsByClassName("tick-slider-input");

  // when the page loads use the default values to set up sliders
  for (let slider of sliders) {
    // add event listener
    slider.oninput = onSliderInput;

    updateProgress(slider);
    // the slider is not in the onInput because it is defined on page load and doesnt change after that.
    setTicks(slider);
  }
}
// when range handle is moved pass in that event to update the slider
function onSliderInput(event) {
  //event.target is input id  name then append the class name #name.tick-slider-input
  updateProgress(event.target);
}

// updateProgress used to display handle on track green vs black
function updateProgress(slider) {
  // progressId coming from "data-progress-id" data set on each range input
  let progress = document.getElementById(slider.dataset.progressId);
  // percent is the percent handle has traveled
  const percent = getSliderPercent(slider);
  // giving input via data-progress-id style
  progress.style.width = percent * 100 + "%";
}
// this is getting the position of the handle relative to its range
function getSliderPercent(slider) {
  //slider AKA event.target.value
  // console.log(event.target.value);
  // slider.max and min are coming from range input min and max
  const range = slider.max - slider.min;
  // slider.value is comming from intial value or what value is when handle dragged
  const absValue = slider.value - slider.min;
  // console.log(absValue / range);
  // returning the percent of the way the handle has traveled
  // accross the slider
  return absValue / range;
}

function setTicks(slider) {
  // console.log(slider);
  // get the data-tick-id from each input range input
  let container = document.getElementById(slider.dataset.tickId);
  // console.log(container);
  // get the data-tick-step value for each input range
  const spacing = parseFloat(slider.dataset.tickStep);
  // console.log(spacing);
  // get the min and max from the range input and do the math
  const sliderRange = slider.max - slider.min;
  // console.log(sliderRange);
  // starting from 0
  const tickCount = sliderRange / spacing + 1; // +1 to account for 0
  // console.log(tickCount);
  for (let i = 0; i < tickCount; i++) {
    // create a spans with class tick-slider-tick
    let tick = document.createElement("span");
    tick.className = "tick-slider-tick";
    // console.log(tick);
    container.appendChild(tick);
  }
}

window.onload = init;

// ////////////////
//TODO work on formatting to match example site, look at DYI jumbotron
// TODO for the chart will need to know given plan if goal will be reached and compare that to what the actual plan (monthly savings) need to be to achieve it. In the given amount of time
