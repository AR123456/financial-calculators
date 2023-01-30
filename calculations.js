// Solve for  FV function
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
/////// solving for PMT to determine needed to get to goal
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
  // Solve for  present value interest factor (PVIF)
  const pvif = Math.pow(1 + rate, nper);
  let pmt = (-rate / (pvif - 1)) * (pv * pvif + fv) * -1;

  if (type == 1) {
    pmt /= 1 + rate;
  }

  return pmt;
}

/////////Solve for IPMT
export function IPMT(pv, pmt, rate, per) {
  var tmp = Math.pow(1 + rate, per);
  let ipmt = 0 - (pv * tmp * rate + pmt * (tmp - 1)) * -1;
  return ipmt;
}

// solve for  NPER

let future;
export function NPER(rate, pmt, pv, goal, type) {
  type = typeof type === "undefined" ? 0 : type;
  future = typeof future === "undefined" ? 0 : goal;
  const num = -pmt * (1 + rate * type) - goal * rate;
  const den = -pv * rate + -pmt * (1 + rate * type);
  return Math.log(num / den) / Math.log(1 + rate);
}
