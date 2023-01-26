import { calcFV, PMT, IPMT, NPER } from "./calculations.js";
// range and text inputs
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
const chartDiv = document.getElementById("chartDiv");
const tableDiv = document.getElementById("tableDiv");
const displayExpectedRate = document.getElementById("displayExpectedRate");
const backToTop = document.getElementById("top-of-page");
const dynamicGenerateTable = document.getElementById("dynamic-generatedTable");

// TODO put chart in its own file need to declare since using module syntax
let myChart;
// display monthly expected rate of return to user
let DisplayExpectedRate = inputExpectedRate.value / 12;
// what would be saved give plan inputs
const growthByYear = [];
// growth by year using monthly payment needed to reach savings goal
const growthByYearNeededToBeSaved = [];
// years for chart
const yearsToGrow = [];
// Buttons
const calculateButton = document.getElementById("calculate");
const viewReportButton = document.getElementById("viewReport");
const backToPlanButton = document.getElementById("plan");
const viewChartButton = document.getElementById("viewChart");

// TODO Function to format input boxes as currency
// the initial values, any changes and slider inputs should all be formated
// target values on page load or with a change call this function
const formatCurrency = (num) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return USDollar.format(num);
};
inputGoal.addEventListener("keyup", () => {
  formatCurrency(inputGoal.value);
  console.log(formatCurrency(inputGoal.value));
});

// https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/
// let USDollar = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });

// console.log(formatCurrency(inputGoal.value));

// TODO can this be in its own file ?function to sync range and  text box inputs
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
// calculate  function
const calculate = () => {
  chartDiv.scrollIntoView();
  const goal = parseFloat(inputGoal.value);
  const years = parseFloat(inputYears.value);
  const currentSaved = parseFloat(inputCurrentSaved.value);
  const monthlySaved = parseFloat(inputMonthlySavings.value);
  const expectedReturn = parseFloat(inputExpectedRate.value);
  const expectedInflation = parseFloat(inputInflationRate.value);

  // Assuming compounding monthly payment at ebd of month- type 0
  // nper - The total number of payment periods.
  const nper = years * 12;
  console.log(nper);
  //expected as a decimal
  const APR = expectedReturn / 100;
  //The interest rate per period aka monthly rate of return
  const rate = APR / nper;
  console.log(rate);
  //payment made each period.
  const pmt = monthlySaved;
  console.log(pmt);
  // The present value
  const pv = currentSaved;
  console.log(pv);
  // 1 for pymt at beginning of month, 0 at end
  const type = 0;
  const fv = goal;
  /////////////////////////// FV
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

  //////////////////////////////////////PMT monthly actually needed to get to goal
  const PandIPmt = PMT(rate, nper, pv, fv, type);
  console.log("PMT so monthly savings plus monthly interest ", PandIPmt);
  /////////////////////////////////////// IPMT what is int of monthly actually needed
  const ipmt = IPMT(pv, pmt, rate, nper);
  console.log("part of monthly that is interest", ipmt);
  //Show user needed monthly contribution
  const Ppmt = parseFloat(
    PMT(rate, nper, pv, fv, type) - IPMT(pv, pmt, rate, nper)
  ).toFixed(2);
  ////////////////////// display need in chart
  growthByYearNeededToBeSaved.push(pv);
  let newPVP = calcFV(rate, 12, Ppmt, pv, type);
  growthByYearNeededToBeSaved.push(newPVP);
  for (let i = 1; i < years; i++) {
    newPVP = calcFV(rate, 12, Ppmt, newPVP, type);
    growthByYearNeededToBeSaved.push(newPVP);
  }
  console.log(growthByYearNeededToBeSaved);
  /////////////////////////////////////////////// NPER// number of periods - in months
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
  // Message to user based on calculations
  if (years > 1) {
    actualTime.innerHTML = ` <span> After ${years} years you will have $ ${FV}</span><br>
  <span>The actual amount of time needed to save $${goal} saving $${monthlySaved} per month is ${actYears} years and ${actMonths} months </span><br>
  <span>Saving $${Ppmt} per month will get you to your savings goal in ${years} years.
  `;
  } else {
    actualTime.innerHTML = ` <span> After ${years} year you will have $ ${FV}</span><br>
  <span>The actual amount of time needed to save $${goal} saving $${monthlySaved} per month is ${actYears} years and ${actMonths} months </span><br>
  <span>Saving $${Ppmt} per month will get you to your savings goal in ${years} years.
  `;
  }
  chartDiv.innerHTML = `<span>    Actual monthly savings according to plan vs needed monthly saving to
  get to goal in plan years.<span>`;
  summaryTable();
  byYearTable();
  // create The bootstrap responsive table container for summary report
  function summaryTable() {
    const cont = document.createElement("div");
    cont.classList.add("table-responsive", "container");
    const tbl = document.createElement("table");
    tbl.classList.add(
      "table",
      "table-striped",
      "table-hover",
      "table-bordered",
      "table-sm",
      "caption-top"
    );
    tbl.innerHTML = `<caption class="text-center">Summary</caption>`;
    // create the parts of the table
    const tblBody = document.createElement("tbody");
    const tblHeader = document.createElement("thead");
    const tblFooter = document.createElement("tfoot");
    //  add to elements
    tblHeader.innerHTML = `
    <tr><th class="text-center">Result Summary</th></tr>`;
    tblBody.innerHTML = `
    <tr>  
    <td class="text-end">Savings goal </td>
    <td class="text-end"> ${goal}</td>
    </tr>
    <tr>  
    <td class="text-end">Target years to save </td>
    <td class="text-end"> ${years}</td>
     </tr>
    <tr>  
    <td class="text-end">Amount currently saved </td> 
    <td class="text-end"> ${currentSaved}</td> 
     </tr>
    <tr>  
    <td class="text-end">Expected rate of return</td>
     <td class="text-end"> ${rate}</td>
      </tr>
    <tr>  
    <td class="text-end">Inflation rate  </td>
      <td class="text-end"> ${expectedInflation}</td>
      </tr>   
     `;
    tblFooter.innerHTML = `
    <tr> 
      <td class="text-end">Total after 10 years </td>
      <td class="text-end"> ${growthByYearNeededToBeSaved[10]}</td>
    </tr>
    <tr>    
      <td class="text-end">Amount required to meet goal in ${years} years</td>
      <td class="text-end"> ${Ppmt} monthly</td>
    </tr> `;
    // put tblHeader into the table
    tbl.appendChild(tblHeader);
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // put footer into table
    tbl.appendChild(tblFooter);
    cont.appendChild(tbl);
    // appends <table> to div >
    tableDiv.appendChild(cont);
  }

  function byYearTable() {
    // create The  bootstrap responsive table container for the by year report

    const contB = document.createElement("div");
    contB.classList.add("table-responsive", "container");
    contB.id = "tableDiv";
    // creates a <table> element and a <tbody> element
    const tblB = document.createElement("table");
    // add classes in this case for bootstrap 5
    tblB.classList.add(
      "table",
      "table-striped",
      "table-hover",
      "table-bordered",
      "table-sm",
      "caption-top"
    );
    tblB.innerHTML = `<caption class="text-center">By Year</caption>`;
    const tblBodyB = document.createElement("tbody");
    const tblHeaderB = document.createElement("thead");
    // const row = document.createElement("tr");
    const trFirstB = document.createElement("tr");
    tblHeaderB.innerHTML = `
                    <tr>  
                    <th class="text-center">Years ${years}</th>
                    <th class="text-center">Contributing ${monthlySaved}</th>
                    <th class="text-center">Contributing ${Ppmt} to get to goal</th> 
                    </tr>`;
    trFirstB.innerHTML = `<tr>  
                    <td></td>
                    <td class="text-end">$${growthByYear[0]} Starting Balance</td>
                    <td class="text-end">$${growthByYearNeededToBeSaved[0]} Starting Balance</td> 
                    </tr>`;
    // creating all cells
    for (let i = 1; i < yearsToGrow.length; i++) {
      // creates a table row
      const rowB = document.createElement("tr");
      let trsB = `<tr>  
                      <td class="text-end">${yearsToGrow[i]}</td>
                      <td class="text-end">$ ${growthByYear[i]}</td>
                      <td class="text-end">$ ${growthByYearNeededToBeSaved[i]}</td> 
                      </tr>`;
      rowB.innerHTML = trsB;
      // prepend adds to front append adds to end
      tblBodyB.prepend(trFirstB);
      // add the row to the end of the table body
      tblBodyB.appendChild(rowB);
    }
    // put tblHeader into the table
    tblB.appendChild(tblHeaderB);
    // put the <tbody> in the <table>
    tblB.appendChild(tblBodyB);
    // put the table into the table responsive container for bootstrap
    contB.appendChild(tblB);
    // appends <table> to the hard coded div >
    dynamicGenerateTable.appendChild(contB);
  }

  //////// end of calc function
};

calculateButton.onclick = function () {
  growthByYear.length = 0;
  yearsToGrow.length = 0;
  growthByYearNeededToBeSaved.length = 0;
  clearPriorTable();
  calculate();
  displayChart();
};

// TODO put in its own file adding JS to get the range track and ticks working
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

// CHART BOILER PLATE

// https://www.chartjs.org/docs/latest/getting-started/usage.html
const ctx = document.getElementById("myChart").getContext("2d");
const displayChart = () => {
  // call this after calculate
  // const ctx = document.getElementById("myChart").getContext("2d");
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
          // TODO use JS to show  monthlySaved
          label: "Plan monthly",
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
        {
          // TODO use JS to show  monthlySaved
          label: "Needed monthly",
          // thousands of dollars scaled to goal
          data: growthByYearNeededToBeSaved,
          // data: [
          //   1000, 1000, 7011, 1890, 13036, 2783, 19077, 3676, 25133, 4573, 31204,
          //   5472, 37290, 6373, 43391, 7276, 49508, 8182, 55640, 9090, 61787,
          //   10000,
          // ],
          backgroundColor: [
            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            //  site default green rgba(47, 162, 47, 1)
          ],
          borderColor: [
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
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

// ////////////////////////////// getting report on page ////////////

viewReportButton.addEventListener("click", generateTables);
function clearPriorTable() {
  tableDiv.innerHTML = "";
  dynamicGenerateTable.innerHTML = "";
}
function generateTables() {
  tableDiv.scrollIntoView();
  // generateResultSummary();
}
function scrollToPlan() {
  backToTop.scrollIntoView();
}
backToPlanButton.addEventListener("click", scrollToPlan);
function scrollToChart() {
  chartDiv.scrollIntoView();
}
viewChartButton.addEventListener("click", scrollToChart);
