//  this is the FV formula from stack overflow
// https://stackoverflow.com/questions/1780645/how-to-calculate-future-value-fv-using-javascript
// The FV function is a financial function that returns the future value of an investment
// rate - The interest rate per period.
// nper - The total number of payment periods.
// pmt - The payment made each period. Must be entered as a negative number.
// pv - [optional] The present value of future payments. If omitted, assumed to be zero. Must be entered as a negative number.
// type - [optional] When payments are due. 0 = end of period, 1 = beginning of period. Default is 0.
export function calcFV(rate, nper, pmt, pv, type) {
  var pow = Math.pow(1 + rate, nper),
    fv;
  if (rate) {
    fv = (-pmt * (1 + rate * type) * (1 - pow)) / rate - -pv * pow;
  } else {
    fv = -1 * (-pv + -pmt * nper);
  }
  return fv.toFixed(2);
}
/////// solving for PMT to determine what is acctually needed to get to goal
// The PMT function is a financial function that returns the periodic payment for a loan
// rate - The interest rate for the loan.
// nper - The total number of payments for the loan. (in months)
// pv - The present value, or total value of all loan payments now.(current saved )
// fv -The future value, (goal)
// type - [optional] When payments are due. 0 = end of period. 1 = beginning of period. Default is 0.
export function PMT(rate, nper, pv, fv, type) {
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
