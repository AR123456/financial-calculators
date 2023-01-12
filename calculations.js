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
