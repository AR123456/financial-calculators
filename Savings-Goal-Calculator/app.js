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

  // let realInt = (expectedReturn - expectedInflation) / 100;
  let realInt = expectedReturn / 100;
  console.log(realInt);

  // This formula is close    calcTime is number of months
  // calcTime =
  //   Math.log(1 + (goal / monthlySaved) * (1 + realInt) * realInt) /
  //   Math.log(1 + realInt);

  calcTime =
    Math.log(1 + (goal * realInt) / monthlySaved) / Math.log(1 + realInt);

  console.log(calcTime);

  actualTime.innerHTML = calcTime;
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
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
