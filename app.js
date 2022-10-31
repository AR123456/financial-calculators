// TODO create a app that will take in a dollar amount goal an years goal
// the app will calculate how much needs to be saved per month to achive the goal
// use an assumed IRR of 8% then make that dynamic
//
// IRR on investopedia  https://www.investopedia.com/terms/i/irr.asp
//The internal rate of return (IRR) is the annual rate of growth that an investment is expected to generate.
//IRR is calculated using the same concept as net present value (NPV), except it sets the NPV equal to zero.   IRR can help investors determine the investment return of various assets

//JS Math metohds    https://www.w3schools.com/js/js_math.asp

/// https://www.youtube.com/watch?v=LW-OOcEBZ7U   loan calculator
const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");
const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");
const calculate = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);
// calculating the monthly interest rate
let interest = interestRate / 12 / 100;
// calculate the monthly P&I  or EMI
const calculatedEMI = () => {
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));
  return emi;
};
// function to update the values in the calculator
const updateData = (emi) => {
  // update based on emi
  loanEMIValue.innerHTML = Math.round(emi);
  //
  let totalAmount = Math.round(loanTenure * emi);
  totalAmountValue.innerHTML = totalAmount;
  // total amount less the loan amount is the amount of interest
  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;
};

// function to call calcula and update dom
const init = () => {
  let emi = calculatedEMI();
  updateData(emi);
};
init();
