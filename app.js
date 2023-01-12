import { calcFV } from "./calculations.js";

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
const actualRate = document.getElementById("actualRate");
const displayExpectedRate = document.getElementById("displayExpectedRate");
// need to declare since using module syntax
let future;
let myChart;
// to display expected rate of return to user
let DisplayExpectedRate = inputExpectedRate.value / 12;
// global array the hold what would acctually be saved give plan inputs
const growthByYear = [];
// global array that holds growth by year contributing calculated needed
const growthByYearNeededToBeSaved = [];
// global array that holds the years const made into array for data display
const yearsToGrow = [];

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
    inputGoal.value = sliderGoal.value;
  });
  inputGoal.addEventListener("input", function () {
    sliderGoal.value = inputGoal.value;
    // console.log(sliderGoal.dataset);
    updateProgress(sliderGoal);
  });
  sliderYears.addEventListener("input", function () {
    inputYears.value = sliderYears.value;
  });
  inputYears.addEventListener("input", function () {
    sliderYears.value = inputYears.value;
    updateProgress(sliderYears);
  });
  sliderCurrentSaved.addEventListener("input", function () {
    inputCurrentSaved.value = sliderCurrentSaved.value;
  });
  inputCurrentSaved.addEventListener("input", function () {
    sliderCurrentSaved.value = inputCurrentSaved.value;
    updateProgress(sliderCurrentSaved);
  });
  sliderMonthlySavings.addEventListener("input", function () {
    inputMonthlySavings.value = sliderMonthlySavings.value;
  });
  inputMonthlySavings.addEventListener("input", function () {
    sliderMonthlySavings.value = inputMonthlySavings.value;
    updateProgress(sliderMonthlySavings);
  });
  sliderExpectedRate.addEventListener("input", function () {
    inputExpectedRate.value = sliderExpectedRate.value;
    let DisplayExpectedRate = (sliderExpectedRate.value / 12).toFixed(2);
    console.log(DisplayExpectedRate);
    displayExpectedRate.innerHTML = `<p>MPR ${DisplayExpectedRate}%</p>`;
  });
  inputExpectedRate.addEventListener("input", function () {
    sliderExpectedRate.value = inputExpectedRate.value;
    updateProgress(sliderExpectedRate);
    let DisplayExpectedRate = (inputExpectedRate.value / 12).toFixed(2);
    console.log(DisplayExpectedRate);
    displayExpectedRate.innerHTML = `<p>MPR ${DisplayExpectedRate}%</p>`;
  });
  sliderInflationRate.addEventListener("input", function () {
    inputInflationRate.value = sliderInflationRate.value;
  });
  inputInflationRate.addEventListener("input", function () {
    sliderInflationRate.value = inputInflationRate.value;
    updateProgress(sliderInflationRate);
  });
}
syncInputs();

displayExpectedRate.innerHTML = `<p>(MPR ${DisplayExpectedRate}%)</p>`;
// variables uses in calculate and the chart

// calculate  function
const calculate = () => {
  const goal = parseFloat(inputGoal.value);
  const years = parseFloat(inputYears.value);
  const currentSaved = parseFloat(inputCurrentSaved.value);
  const monthlySaved = parseFloat(inputMonthlySavings.value);
  const expectedReturn = parseFloat(inputExpectedRate.value);
  const expectedInflation = parseFloat(inputInflationRate.value);

  // Assuming compounding monthly payment at begining of month
  // APR convreted to monthly rate of return expected rate of return / months then to get % as numb /100
  const nper = years * 12;
  console.log(nper);
  const APR = expectedReturn / 100;
  const rate = APR / nper; // monthly rate of return

  console.log(rate);
  const pmt = monthlySaved;
  console.log(pmt);
  const pv = currentSaved;
  console.log(pv);
  // 1 for pymt at begining of month, 0 at end
  const type = 0;
  const fv = goal;

  // //  this is the FV formula from stack overflow
  // // https://stackoverflow.com/questions/1780645/how-to-calculate-future-value-fv-using-javascript
  // // The FV function is a financial function that returns the future value of an investment
  // // rate - The interest rate per period.
  // // nper - The total number of payment periods.
  // // pmt - The payment made each period. Must be entered as a negative number.
  // // pv - [optional] The present value of future payments. If omitted, assumed to be zero. Must be entered as a negative number.
  // // type - [optional] When payments are due. 0 = end of period, 1 = beginning of period. Default is 0.
  // function calcFV(rate, nper, pmt, pv, type) {
  //   var pow = Math.pow(1 + rate, nper),
  //     fv;
  //   if (rate) {
  //     fv = (-pmt * (1 + rate * type) * (1 - pow)) / rate - -pv * pow;
  //   } else {
  //     fv = -1 * (-pv + -pmt * nper);
  //   }
  //   return fv.toFixed(2);
  // }
  const FV = calcFV(rate, nper, pmt, pv, type);
  console.log(`The calculated future value ${FV}`);
  /////////////// Array of FV from start to end of goal period year by year
  growthByYear.push(pv);
  let newPV = calcFV(rate, 12, pmt, pv, type);
  growthByYear.push(newPV);
  for (let i = 1; i < years; i++) {
    newPV = calcFV(rate, 12, pmt, newPV, type);
    growthByYear.push(newPV);
  }
  console.log(growthByYear);

  /// push goal years to years to grow array
  for (let i = 0; i <= years; i++) {
    yearsToGrow.push(i);
  }
  console.log(yearsToGrow);
  // //////////////////////////////////////////////////////////////////

  // stack overflow of the NPER excel function number  of periods  https://gist.github.com/Nitin-Daddikar/43899765e30274ec739f44ebbac434c3
  // solve the annuity for n
  // rate - The interest rate per period.
  // pmt - payment The payment made each period. since this is savings make negative number
  // pv - present The present value, or total value of all payments now. For savings making this a neg number for the calc
  // goal - future - [optional] The future value, or a cash balance you want after the last payment is made. Defaults to 0.
  // type - [optional] When payments are due. 0 = end of period. 1 = beginning of period. Default is 0.
  const NPER = function (rate, pmt, pv, goal, type) {
    // Initialize type
    type = typeof type === "undefined" ? 0 : type;
    // Initialize future value
    future = typeof future === "undefined" ? 0 : goal;
    // Return number of periods
    const num = -pmt * (1 + rate * type) - goal * rate;
    // this is savings, not loan so making pv negative so the calc works
    const den = -pv * rate + -pmt * (1 + rate * type);
    return Math.log(num / den) / Math.log(1 + rate);
  };
  /////// solving for PMT to determine what is acctually needed to get to goal
  // The PMT function is a financial function that returns the periodic payment for a loan
  // rate - The interest rate for the loan.
  // nper - The total number of payments for the loan. (in months)
  // pv - The present value, or total value of all loan payments now.(current saved )
  // fv -The future value, (goal)
  // type - [optional] When payments are due. 0 = end of period. 1 = beginning of period. Default is 0.
  function PMT(rate, nper, pv, fv, type) {
    if (!fv) {
      fv = 0;
    }
    if (!type) {
      type = 0;
    }

    if (rate == 0) {
      return -(pv + fv) / nper;
    }
    // The present value interest factor (PVIF) is a formula used to estimate the current worth of a sum of money that is to be received at some future date.
    const pvif = Math.pow(1 + rate, nper);
    console.log("this is pvif", pvif);
    let pmt = (-rate / (pvif - 1)) * (pv * pvif + fv) * -1;

    if (type == 1) {
      pmt /= 1 + rate;
    }

    return pmt;
  }
  console.log(
    "PMT so monthly savings plus monthly interest ",
    PMT(rate, nper, pv, fv, type)
  );
  ///////// int
  // rate - intrest rate per period
  //per - the period for which you want to find the interest and must be in the range 1 to Nper
  //nper - total number of payment periods of the investment
  // pv - the present value of the lump sum amount that a series of future payemtns is worth now
  // fv - the future value, or a cash balance you want to attain after the last payment is made if omitted =0
  function IPMT(pv, pmt, rate, per) {
    var tmp = Math.pow(1 + rate, per);
    let ipmt = 0 - (pv * tmp * rate + pmt * (tmp - 1)) * -1;
    return ipmt;
  }
  console.log("part of monthly that is interest", IPMT(pv, pmt, rate, nper));

  console.log(
    "Monthly savings contribution needed",
    PMT(rate, nper, pv, fv, type) - IPMT(pv, pmt, rate, nper)
  );

  //
  const calcTime = NPER(rate, pmt, pv, goal, type);
  // https://stackoverflow.com/questions/39275225/how-to-convert-a-number-of-months-into-months-and-years
  // act Years and actMonths are for formatting year month style
  const actYears = Math.floor(calcTime / 12);
  // let actMonths = Math.ceil(calcTime % 12);
  const actMonths = Math.round(calcTime % 12);
  console.log(
    "CalcTime",
    calcTime,
    "actYears",
    actYears,
    ",actMonths",
    actMonths
  );
  // writing to the dom
  actualTime.innerHTML = `<span> After years to save of ${years} you will have $ ${FV}</span><br>
  <span>The actual amount of time needed to save $${goal} is ${actYears} years and ${actMonths} months </span>`;
};

calculateButton.onclick = function () {
  growthByYear.length = 0;
  yearsToGrow.length = 0;
  calculate();
  displayChart();
};

// adding JS to get the range track and ticks working
///////////////////////////////////////////////////////////////////////
// looking at using Javascript to generate slider marks
// https://codepen.io/viestursm/pen/BayEjaN
function initRangeSlider() {
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

window.onload = initRangeSlider;

// ////////////////
//TODO work on formatting to match example site, look at DYI jumbotron
// TODO for the chart will need to know given plan if goal will be reached and compare that to what the actual plan (monthly savings) need to be to achieve it. In the given amount of time

// TODO for the chart will need to know given plan if goal will be reached and compare that to what the actual plan (monthly savings) need to be to achieve it. In the given amount of time

// CHART BOILER PLATE

// https://www.chartjs.org/docs/latest/getting-started/usage.html

const displayChart = () => {
  // call this after calculate
  const ctx = document.getElementById("myChart").getContext("2d");
  // https://stackoverflow.com/questions/69559728/eror-chart-min-js13-uncaught-in-promise-error-canvas-is-already-in-use-cha
  // https://www.youtube.com/watch?v=TvkT6a17L2s
  let chartStatus = Chart.getChart("myChart");

  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      // labels: data.map((row) => row.year),
      //  years for each year create a label
      labels: yearsToGrow,
      // loop number of goal years and push do data array for each year what the actual savings are in blue, the first number
      // and then amount needed per year to get to goal  each year the green number
      datasets: [
        {
          label: "Plan Savings by Year",
          // thousands of dollars scaled to goal
          data: growthByYear,
          // data: [
          //   1000, 1000, 7011, 1890, 13036, 2783, 19077, 3676, 25133, 4573, 31204,
          //   5472, 37290, 6373, 43391, 7276, 49508, 8182, 55640, 9090, 61787,
          //   10000,
          // ],
          backgroundColor: [
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",

            //  site default green rgba(47, 162, 47, 1)
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",
            // "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
