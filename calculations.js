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

///////// IPMT
// rate - intrest rate per period
//per - the period for which you want to find the interest and must be in the range 1 to Nper
//nper - total number of payment periods of the investment
// pv - the present value of the lump sum amount that a series of future payemtns is worth now
// fv - the future value, or a cash balance you want to attain after the last payment is made if omitted =0
export function IPMT(pv, pmt, rate, per) {
  var tmp = Math.pow(1 + rate, per);
  let ipmt = 0 - (pv * tmp * rate + pmt * (tmp - 1)) * -1;
  return ipmt;
}

// stack overflow of the NPER excel function number  of periods  https://gist.github.com/Nitin-Daddikar/43899765e30274ec739f44ebbac434c3
// solve the annuity for n
// rate - The interest rate per period.
// pmt - payment The payment made each period. since this is savings make negative number
// pv - present The present value, or total value of all payments now. For savings making this a neg number for the calc
// goal - future - [optional] The future value, or a cash balance you want after the last payment is made. Defaults to 0.
// type - [optional] When payments are due. 0 = end of period. 1 = beginning of period. Default is 0.

let future;
export function NPER(rate, pmt, pv, goal, type) {
  // Initialize type
  type = typeof type === "undefined" ? 0 : type;
  // Initialize future value
  future = typeof future === "undefined" ? 0 : goal;
  // Return number of periods
  const num = -pmt * (1 + rate * type) - goal * rate;
  // this is savings, not loan so making pv negative so the calc works
  const den = -pv * rate + -pmt * (1 + rate * type);
  return Math.log(num / den) / Math.log(1 + rate);
}

// PPMT -part of monthly that is
//  rate = the interest rate per period
// per = specifies the period and must be in the range 1 to nper ? 12?
// nper = the total number of payment periods in the investment
// pv = present value the total amount that a series of future payments is worth now
// fv = the cash balance to attain after the last payment is made

export function PPMT(rate, per, nper, pv, fv, type) {
  if (per < 1 || per >= nper + 1) return null;
  var pmt = this.PMT(rate, nper, pv, fv, type);
  var ipmt = this.IPMT(pv, pmt, rate, per - 1);
  return pmt - ipmt;
}
