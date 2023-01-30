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
const DisplayExpectedRate = inputExpectedRate.value / 12;
const actualTime = document.getElementById("actualTime");
const chartDiv = document.getElementById("chartDiv");
const tableDiv = document.getElementById("tableDiv");
const displayExpectedRate = document.getElementById("displayExpectedRate");
const backToTop = document.getElementById("top-of-page");
const dynamicGenerateTable = document.getElementById("dynamic-generatedTable");
//TODO look at making fields in form required
//TODO add print button to tables maybe chart
//TODO put definitions in hover bubbles in inputs between text and input box
// TODO can any of this be in its own file?
//TODO look at solving with constructor and object vs function and arrays 
let myChart = document.getElementById("myChart");
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
// Utility
const formatCurrency = (num) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return USDollar.format(num);
};
inputGoal.addEventListener("keyup", () => {
  formatCurrency(inputGoal.value);
});
function syncInputs() {
  sliderGoal.addEventListener("input", function () {
    inputGoal.value = sliderGoal.value;
  });
  inputGoal.addEventListener("input", function () {
    sliderGoal.value = inputGoal.value;
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
// Main calculate  function
const calculate = () => {
  const goal = parseFloat(inputGoal.value);
  const years = parseFloat(inputYears.value);
  const currentSaved = parseFloat(inputCurrentSaved.value);
  const monthlySaved = parseFloat(inputMonthlySavings.value);
  const expectedReturn = parseFloat(inputExpectedRate.value);
  const expectedInflation = parseFloat(inputInflationRate.value);
  const DisplayRate = (expectedReturn / 12).toFixed(2);
  // Assuming compounding monthly payment at ebd of month- type 0
  // nper - The total number of payment periods.
  const nper = years * 12;
  //expected as a decimal
  const APR = expectedReturn / 100;
  //The interest rate per period aka monthly rate of return
  const rate = APR / nper;
  //payment made each period.
  const pmt = monthlySaved;
  // The present value
  const pv = currentSaved;
  // 1 for pymt at beginning of month, 0 at end
  const type = 0;
  const fv = goal;
  /////////////////////////// FV
  const FV = calcFV(rate, nper, pmt, pv, type);
  /////////////// Array of FV from start to end of goal period year by year
  growthByYear.push(pv);
  let newPV = calcFV(rate, 12, pmt, pv, type);
  growthByYear.push(newPV);
  for (let i = 1; i < years; i++) {
    newPV = calcFV(rate, 12, pmt, newPV, type);
    growthByYear.push(newPV);
  }
  for (let i = 0; i <= years; i++) {
    yearsToGrow.push(i);
  }
  //////////////////////////////////////PMT monthly actually needed to get to goal
  const PandIPmt = PMT(rate, nper, pv, fv, type);
  /////////////////////////////////////// IPMT what is int of monthly actually needed
  const ipmt = IPMT(pv, pmt, rate, nper);
  //Show user needed monthly contribution- not part that is intrest
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
  /////////////////////////////////////////////// NPER// number of periods - in months
  const calcTime = NPER(rate, pmt, pv, goal, type);
  // https://stackoverflow.com/questions/39275225/how-to-convert-a-number-of-months-into-months-and-years
  // act Years and actMonths are for formatting year month style
  const actYears = Math.floor(calcTime / 12);
  const actMonths = Math.round(calcTime % 12);
  // Message to user based on calculations
  if (years > 1) {
    actualTime.innerHTML = ` <span> After ${years} years you will have $${FV}</span><br>
  <span>The actual amount of time needed to save ${formatCurrency(
    goal
  )} saving ${formatCurrency(
      monthlySaved
    )} per month is ${actYears} years and ${actMonths} months </span><br>
  <span>Saving ${formatCurrency(
    Ppmt
  )} per month will get you to your savings goal in ${years} years.
  `;
  } else {
    actualTime.innerHTML = ` <span> After ${years} year you will have ${formatCurrency(
      FV
    )}</span><br>
  <span>The actual amount of time needed to save ${formatCurrency(
    goal
  )} saving ${formatCurrency(
      monthlySaved
    )} per month is ${actYears} years and ${actMonths} months </span><br>
  <span>Saving ${formatCurrency(
    Ppmt
  )} per month will get you to your savings goal in ${years} years.
  `;
  }
  chartDiv.innerHTML = `<span>    Actual monthly savings according to plan vs needed monthly saving to
  get to goal in plan years.<span>`;
  summaryTable();
  byYearTable();
  // dynamically create The bootstrap responsive table container for summary report
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
    const tblBody = document.createElement("tbody");
    const tblHeader = document.createElement("thead");
    const tblFooter = document.createElement("tfoot");
    tblHeader.innerHTML = `
    <tr><th class="text-center">Result Summary</th></tr>`;
    tblBody.innerHTML = `
    <tr>  
    <td class="text-end">Savings goal </td>
    <td class="text-end"> ${formatCurrency(goal)}</td>
    </tr>
    <tr>  
    <td class="text-end">Target years to save </td>
    <td class="text-end"> ${years}</td>
     </tr>
    <tr>  
    <td class="text-end">Amount currently saved </td> 
    <td class="text-end"> ${formatCurrency(currentSaved)}</td> 
     </tr>
    <tr>  
    <td class="text-end">Expected rate of return(MPR)</td>
     <td class="text-end"> ${DisplayRate}%</td>
      </tr>
    <tr>  
    <td class="text-end">Inflation rate  </td>
      <td class="text-end"> ${expectedInflation}%</td>
      </tr>   
     `;
    tblFooter.innerHTML = `
    <tr> 
      <td class="text-end">Total after ${years} years </td>
      <td class="text-end"> ${formatCurrency(growthByYear[years])}</td>
    </tr>
    <tr>    
      <td class="text-end">Amount required to meet goal in ${years} years</td>
      <td class="text-end"> ${formatCurrency(Ppmt)} monthly</td>
    </tr> `;
    tbl.appendChild(tblHeader);
    tbl.appendChild(tblBody);
    tbl.appendChild(tblFooter);
    cont.appendChild(tbl);
    tableDiv.appendChild(cont);
  }

  function byYearTable() {
    // dynamically create The  bootstrap responsive table container for the by year report
    const contB = document.createElement("div");
    contB.classList.add("table-responsive", "container");
    contB.id = "tableDiv";
    const tblB = document.createElement("table");
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
    const trFirstB = document.createElement("tr");
    tblHeaderB.innerHTML = `
                    <tr>  
                    <th class="text-center">Years ${years}</th>
                    <th class="text-center">Contributing ${formatCurrency(
                      monthlySaved
                    )}</th>
                    <th class="text-center">Contributing ${formatCurrency(
                      Ppmt
                    )} to get to goal</th> 
                    </tr>`;
    trFirstB.innerHTML = `<tr>  
                    <td></td>
                    <td class="text-end">${formatCurrency(
                      growthByYear[0]
                    )} Starting Balance</td>
                    <td class="text-end">${formatCurrency(
                      growthByYearNeededToBeSaved[0]
                    )} Starting Balance</td> 
                    </tr>`;
    for (let i = 1; i < yearsToGrow.length; i++) {
      const rowB = document.createElement("tr");
      let trsB = `<tr>  
                      <td class="text-end">${yearsToGrow[i]}</td>
                      <td class="text-end">${formatCurrency(
                        growthByYear[i]
                      )}</td>
                      <td class="text-end">${formatCurrency(
                        growthByYearNeededToBeSaved[i]
                      )}</td> 
                      </tr>`;
      rowB.innerHTML = trsB;
      tblBodyB.prepend(trFirstB);
      tblBodyB.appendChild(rowB);
    }
    tblB.appendChild(tblHeaderB);
    tblB.appendChild(tblBodyB);
    contB.appendChild(tblB);
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
  scrollToChart();
};

//JS to get the range track and ticks
///////////////////////////////////////////////////////////////////////
function initRangeSlider() {
  const sliders = document.getElementsByClassName("tick-slider-input");
  for (let slider of sliders) {
    slider.oninput = onSliderInput;
    updateProgress(slider);
    setTicks(slider);
  }
}
function onSliderInput(event) {
  updateProgress(event.target);
}
function updateProgress(slider) {
  let progress = document.getElementById(slider.dataset.progressId);
  const percent = getSliderPercent(slider);
  progress.style.width = percent * 100 + "%";
}
function getSliderPercent(slider) {
  const range = slider.max - slider.min;
  const absValue = slider.value - slider.min;
  return absValue / range;
}

function setTicks(slider) {
  let container = document.getElementById(slider.dataset.tickId);
  const spacing = parseFloat(slider.dataset.tickStep);
  const sliderRange = slider.max - slider.min;
  const tickCount = sliderRange / spacing + 1; // +1 to account for 0
  for (let i = 0; i < tickCount; i++) {
    let tick = document.createElement("span");
    tick.className = "tick-slider-tick";
    container.appendChild(tick);
  }
}

window.onload = initRangeSlider;
// CHART BOILER PLATE
const ctx = document.getElementById("myChart").getContext("2d");
const displayChart = () => {
  let chartStatus = Chart.getChart("myChart");

  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: yearsToGrow,
      datasets: [
        {
          label: "Plan monthly $",
          data: growthByYear,
          backgroundColor: [
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "Needed monthly $",
          data: growthByYearNeededToBeSaved,
          backgroundColor: [
            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",
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
}
function scrollToPlan() {
  backToTop.scrollIntoView();
}
backToPlanButton.addEventListener("click", scrollToPlan);
function scrollToChart() {
  chartDiv.scrollIntoView();
}
viewChartButton.addEventListener("click", generateTables);
