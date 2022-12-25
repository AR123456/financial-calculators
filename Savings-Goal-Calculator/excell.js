// NPER, RATE, FV & PMT Excel functions in JavaScript
// https://gist.github.com/Nitin-Daddikar/43899765e30274ec739f44ebbac434c3

// The NPER function is a financial function that returns the number of periods for loan or investment
// rate - The interest rate per period.
// pmt - payment - The payment made each period. (if savings this needs to be a negative number)
// pv - present - The present value, or total value of all payments now.(if savings this needs to be a negative number)
// future - [optional] The future value, or a cash balance you want after the last payment is made. Defaults to 0.
// type - [optional] When payments are due. 0 = end of period. 1 = beginning of period. Default is 0.
function NPER(rate, payment, present, future, type) {
  // Initialize type
  type = typeof type === "undefined" ? 0 : type;

  // Initialize future value
  future = typeof future === "undefined" ? 0 : future;

  // Return number of periods
  const num = payment * (1 + rate * type) - future * rate;
  const den = present * rate + payment * (1 + rate * type);
  return Math.log(num / den) / Math.log(1 + rate);
}

// The RATE function is a financial function that returns the interest rate per period of an annuity
// periods - The total number of payment periods.
// payment - The payment made each period.
// present - The present value, or total value of all loan payments now.
// future - [optional] The future value, or desired cash balance after last payment. Default is 0.
// type - [optional] When payments are due. 0 = end of period. 1 = beginning of period. Default is 0.
// guess - [optional] Your guess on the rate. Default is 10%.
function RATE(periods, payment, present, future, type, guess) {
  guess = guess === undefined ? 0.01 : guess;
  future = future === undefined ? 0 : future;
  type = type === undefined ? 0 : type;

  // Set maximum epsilon for end of iteration
  const epsMax = 1e-6;

  // Set maximum number of iterations
  const iterMax = 100;
  let iter = 0;
  let close = false;
  let rate = guess;

  while (iter < iterMax && !close) {
    const t1 = Math.pow(rate + 1, periods);
    const t2 = Math.pow(rate + 1, periods - 1);
    const f1 =
      future + t1 * present + (payment * (t1 - 1) * (rate * type + 1)) / rate;
    const f2 =
      periods * t2 * present -
      (payment * (t1 - 1) * (rate * type + 1)) / Math.pow(rate, 2);
    const f3 =
      (periods * payment * t2 * (rate * type + 1)) / rate +
      (payment * (t1 - 1) * type) / rate;
    const newRate = rate - f1 / (f2 + f3);
    if (Math.abs(newRate - rate) < epsMax) {
      close = true;
    }
    iter++;
    rate = newRate;
  }
  if (!close) {
    return Number.NaN + rate;
  }
  return rate;
}

// The FV function is a financial function that returns the future value of an investment
// rate - The interest rate per period.
// nper - The total number of payment periods.
// pmt - The payment made each period. Must be entered as a negative number.
// pv - [optional] The present value of future payments. If omitted, assumed to be zero. Must be entered as a negative number.
// type - [optional] When payments are due. 0 = end of period, 1 = beginning of period. Default is 0.
function FV(rate, nper, pmt, pv, type) {
  const pow = Math.pow(1 + rate, nper);
  let fv;

  pv = pv || 0;
  type = type || 0;

  if (rate) {
    fv = (pmt * (1 + rate * type) * (1 - pow)) / rate - pv * pow;
  } else {
    fv = -1 * (pv + pmt * nper);
  }
  return fv;
}

// The PMT function is a financial function that returns the periodic payment for a loan
// rate - The interest rate for the loan.
// nper - The total number of payments for the loan.
// pv - The present value, or total value of all loan payments now.
// fv - [optional] The future value, or a cash balance you want after the last payment is made. Defaults to 0 (zero).
// type - [optional] When payments are due. 0 = end of period. 1 = beginning of period. Default is 0.
function PMT(rate, nper, pv, fv, type) {
  if (!fv) {
    fv = 0;
  }
  if (!type) {
    type = 0;
  }

  if (rate == 0) {
    return -(pv + fv) / nper;
  }

  const pvif = Math.pow(1 + rate, nper);
  let pmt = (rate / (pvif - 1)) * -(pv * pvif + fv);

  if (type == 1) {
    pmt /= 1 + rate;
  }

  return pmt;
}
