// TODO create a app that will take in a dollar amount goal an years goal
// the app will calculate how much needs to be saved per month to achive the goal
// use an assumed IRR of 8% then make that dynamic
//
// IRR on investopedia  https://www.investopedia.com/terms/i/irr.asp
//The internal rate of return (IRR) is the annual rate of growth that an investment is expected to generate.
//IRR is calculated using the same concept as net present value (NPV), except it sets the NPV equal to zero.   IRR can help investors determine the investment return of various assets

//JS Math metohds    https://www.w3schools.com/js/js_math.asp

/// https://www.youtube.com/watch?v=LW-OOcEBZ7U   loan calculator
const loanAmountInput = document.getElementsByClassName("loan-amount");
const interestRateInput = document.getElementsByClassName("interest=rate");
const loanTenureInput = document.getElementsByClassName("loan-tenure");
const loanEMIValue = document.getElementsByClassName("loan-emi");
const totalInterestValue = document.getElementsByClassName("total-interest");
const totalAmountValue = document.getElementsByClassName("total-amount");
const calculate = document.getElementByClassName("calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);
