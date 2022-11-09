// TODO create a app that will take in a dollar amount goal an years goal
// the app will calculate how much needs to be saved per month to achive the goal

// getting elements from DOM
// Slider inputs
const savingsRange = document.getElementById("savingsRange");
const savingsGoal = document.getElementById("savingsGoal");

const yearsRange = document.getElementById("yearsRange");
const yearsGoal = document.getElementById("yearsGoal");

const currentAmountSavedRange = document.getElementById(
  "currentAmountSavedRange"
);
const currentAmountSaved = document.getElementById("currentAmountSaved");

const monthlySavingsRange = document.getElementById("monthlySavingsRange");
const monthlySavingsGoal = document.getElementById("monthlySavingsGoal");

const expectedRateReturn = document.getElementById("expectedRateReturn");
const expectedRateReturnRange = document.getElementById(
  "expectedRateReturnRange"
);
const expectedRateInflation = document.getElementById("expectedRateInflation");
const expectedRateInflationRange = document.getElementById(
  "expectedRateInflationRange"
);

const actualTime = document.getElementById("actualTime");
// Buttons

const calculateButton = document.getElementById("calculate");
const viewReportButton = document.getElementById("viewReport");
// Display the default slider values when page loads
savingsGoal.innerHTML = savingsRange.value;
yearsGoal.innerHTML = yearsRange.value;
currentAmountSaved.innerHTML = currentAmountSavedRange.value;
monthlySavingsGoal.innerHTML = monthlySavingsRange.value;
expectedRateReturn.innerHTML = expectedRateReturnRange.value;
expectedRateInflation.innerHTML = expectedRateInflationRange.value;
// getting and displaying input value
// Update the current slider value (each time you drag the slider handle)
//TODO update the value based on slider or typing in text box
savingsRange.oninput = function () {
  goal = this.value;
  savingsGoal.innerHTML = goal;
};
yearsRange.oninput = function () {
  years = this.value;
  yearsGoal.innerHTML = years;
};
currentAmountSavedRange.oninput = function () {
  currentSaved = this.value;
  currentAmountSaved.innerHTML = currentSaved;
};
monthlySavingsRange.oninput = function () {
  monthlySaved = this.value;
  monthlySavingsGoal.innerHTML = monthlySaved;
};
expectedRateReturnRange.oninput = function () {
  expectedReturn = this.value;
  expectedRateReturn.innerHTML = expectedReturn;
};
expectedRateInflationRange.oninput = function () {
  expectedInflation = this.value;
  expectedRateInflation.innerHTML = expectedInflation;
};

// calculate  function
const calculate = () => {
  // console.log(goal);
  // console.log(years);
  // console.log(currentSaved);
  // console.log(monthlySaved);
  // console.log(expectedReturn);
  // console.log(expectedInflation);
  // real interest rate = interest rate - inflation rate
  let realInt = expectedReturn - expectedInflation;
  calcTime =
    currentSaved +
    (monthlySaved * ((1 + (realInt / years) * 12) * (12 * years) - 1)) /
      (realInt / (years * 12));
  console.log(calcTime);
  actualTime.innerHTML = calcTime
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
