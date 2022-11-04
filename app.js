// based off of this  https://www.youtube.com/watch?v=u68Ney3YdJc
// loan calculator
const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTermInput = document.querySelector(".loan-term");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTerm = parseFloat(loanTermInput.value);
// calculating the monthly interest rate
let interest = interestRate / 12 / 100;
// using chart.js to create the chart - get the boiler plate from chart.js
let myChart;
// validating user input
const checkValues = () => {
  // get the input values and store in var
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTermValue = loanTermInput.value;
  // use some regex to check if its a number
  let regexNumber = /^(?![.]+$)\d+(\.\d{1,})?$|^(\.\d{1,})?$/;
  if (!loanAmountValue.match(regexNumber)) {
    document.querySelector(".amount-invalid-feedback").style.visibility =
      "visible";
    loanAmountInput.value = "Invalid input";
    setTimeout(() => {
      document.querySelector(".amount-invalid-feedback").style.visibility =
        "hidden";
      loanAmountInput.value = "Loan amount";
    }, 2000);
  }
  // check that loan term is a number
  if (!loanTermValue.match(regexNumber)) {
    document.querySelector(".term-invalid-feedback").style.visibility =
      "visible";
    loanTermInput.value = "Invalid input";

    setTimeout(() => {
      document.querySelector(".term-invalid-feedback").style.visibility =
        "hidden";
      loanTermInput.value = "Term";
    }, 2000);
  }

  if (!interestRateValue.match(regexNumber)) {
    document.querySelector(".rate-invalid-feedback").style.visibility =
      "visible";
    interestRateInput.value = "Invalid input";
    setTimeout(() => {
      document.querySelector(".rate-invalid-feedback").style.visibility =
        "hidden";
      interestRateInput.value = "Rate";
    }, 2000);
  }
};

///
const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Original Loan Amount"],
      datasets: [
        {
          label: "# of Votes",
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#14213d"],

          borderWidth: 0,
        },
      ],
    },
  });
};
const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};
// detect and update input values
const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTerm = parseFloat(loanTermInput.value);
  // calculating the monthly interest rate
  interest = interestRate / 12 / 100;
};
// calculate the monthly P&I  or EMI
const calculatedEMI = () => {
  checkValues();
  refreshInputValues();
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTerm) / (Math.pow(1 + interest, loanTerm) - 1));
  return emi;
};
// function to update the values in the calculator
const updateData = (emi) => {
  // update based on emi
  loanEMIValue.innerHTML = Math.round(emi);
  //
  let totalAmount = Math.round(loanTerm * emi);
  totalAmountValue.innerHTML = totalAmount;

  // total amount less the loan amount is the amount of interest
  let totalInterestPayable = Math.round(totalAmount - loanAmount);

  totalInterestValue.innerHTML = totalInterestPayable;
  // display the chart for the first time or display the updated chart
  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable, loanAmount);
  }
};

// function to call calculatedEMI and update dom
const init = () => {
  let emi = calculatedEMI();
  updateData(emi);
};
init();

// wire up the calculate button
calculateBtn.addEventListener("click", init);
