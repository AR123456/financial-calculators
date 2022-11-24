// TODO create a app that will take in a dollar amount goal an years goal
// the app will calculate how much needs to be saved per month to achive the goal

// getting elements from DOM
// Slider inputs
const savingsRange = document.getElementById("savingsRange");

const yearsRange = document.getElementById("yearsRange");

const currentAmountSavedRange = document.getElementById(
  "currentAmountSavedRange"
);

const monthlySavingsRange = document.getElementById("monthlySavingsRange");

const expectedRateReturnRange = document.getElementById(
  "expectedRateReturnRange"
);

const expectedRateInflationRange = document.getElementById(
  "expectedRateInflationRange"
);

const actualTime = document.getElementById("actualTime");
// Buttons

const calculateButton = document.getElementById("calculate");
const viewReportButton = document.getElementById("viewReport");

// Update the current slider value (each time you drag the slider handle)
//TODO update the value based on slider or typing in text box
savingsRange.oninput = function () {
  goal = parseFloat(this.value);
};
yearsRange.oninput = function () {
  years = parseFloat(this.value);
};
currentAmountSavedRange.oninput = function () {
  currentSaved = parseFloat(this.value);
};
monthlySavingsRange.oninput = function () {
  monthlySaved = parseFloat(this.value);
};
expectedRateReturnRange.oninput = function () {
  expectedReturn = parseFloat(this.value);
};
expectedRateInflationRange.oninput = function () {
  expectedInflation = parseFloat(this.value);
};

// calculate  function
const calculate = () => {
  console.log(goal);
  console.log(years);
  console.log(currentSaved);
  console.log(monthlySaved);
  console.log(typeof expectedReturn);
  console.log(expectedReturn);
  console.log(expectedInflation);
  // real interest rate = interest rate - inflation rate
  let realInt = (expectedReturn - expectedInflation) / 100;
  console.log(realInt);
  // calcTime =
  //   Math.log(1 + (goal * realInt) / monthlySaved) / Math.log(1 + realInt);
  //adding in current saved
  calcTime =
    Math.log(1 + (goal * realInt) / (monthlySaved + currentSaved)) /
    Math.log(1 + realInt);
  console.log(calcTime);
  // https://stackoverflow.com/questions/39275225/how-to-convert-a-number-of-months-into-months-and-years
  let actYears = Math.floor(calcTime / 12);
  let actMonths = Math.ceil(calcTime % 12);

  /////
  if (calcTime < years * 12) {
    // to do change this to __ years and __ months
    actualTime.innerHTML = `<span>You will reach your goal in ${actYears} years ${actMonths} months.</span>
  </span>`;
  } else {
    actualTime.innerHTML = `<span
    >You will need ${actYears} years ${actMonths} months to reach your goal. </span>`;
  }

  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
calculateButton.onclick = function () {
  calculate();
};

// CHART BOILER PLATE

// https://www.chartjs.org/docs/latest/getting-started/usage.html

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Actual by year 1",
      "Needed for goal by year 1",
      "Actual by year 2",
      "Needed for goal by year 2",
      "Purple",
      "Orange",
    ],
    datasets: [
      {
        label: "you will have ",
        // thousands of dollars scaled to goal
        data: [5, 3, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
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
