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
  goal = this.value;
};
yearsRange.oninput = function () {
  years = this.value;
};
currentAmountSavedRange.oninput = function () {
  currentSaved = this.value;
};
monthlySavingsRange.oninput = function () {
  monthlySaved = this.value;
};
expectedRateReturnRange.oninput = function () {
  expectedReturn = this.value;
};
expectedRateInflationRange.oninput = function () {
  expectedInflation = this.value;
};

// calculate  function
const calculate = () => {
  console.log(goal);
  console.log(years);
  console.log(currentSaved);
  console.log(monthlySaved);
  console.log(expectedReturn);
  console.log(expectedInflation);
  // real interest rate = interest rate - inflation rate
  // This formula is close but not quite
  let realInt = (expectedReturn - expectedInflation) / 100;
  console.log(realInt);
  console.log(Math.E);
  console.log(Math.LOG10E);

  anotherThingDenom = monthlySaved * (1 + realInt);
  anotherThing = (goal / anotherThingDenom) * realInt;

  something = 1 + anotherThing;
  // calcTime = (Math.E * something) / (Math.E * (1 + realInt));
  calcTime = (Math.LOG10E * something) / (Math.LOG10E * (1 + realInt));
  console.log(calcTime);

  // actualTime.innerHTML = calcTime
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