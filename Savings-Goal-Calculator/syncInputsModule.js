// helper to sync inputs
export function syncInputs() {
  // https://stackoverflow.com/questions/64199456/changing-the-value-of-the-range-slider-and-input-box-at-the-same-time

  // /////////////////////////
  sliderGoal.addEventListener("input", function () {
    inputGoal.value = sliderGoal.value;
  });
  inputGoal.addEventListener("input", function () {
    sliderGoal.value = inputGoal.value;
    // console.log(sliderGoal.dataset);
    updateProgress(sliderGoal);
  });
  sliderYears.addEventListener("input", function () {
    inputYears.value = sliderYears.value;
  });
  inputYears.addEventListener("input", function () {
    sliderYears.value = inputYears.value;
    updateProgress(sliderYears);
  });
  sliderCurrentSaved.addEventListener("input", function () {
    inputCurrentSaved.value = sliderCurrentSaved.value;
  });
  inputCurrentSaved.addEventListener("input", function () {
    sliderCurrentSaved.value = inputCurrentSaved.value;
    updateProgress(sliderCurrentSaved);
  });
  sliderMonthlySavings.addEventListener("input", function () {
    inputMonthlySavings.value = sliderMonthlySavings.value;
  });
  inputMonthlySavings.addEventListener("input", function () {
    sliderMonthlySavings.value = inputMonthlySavings.value;
    updateProgress(sliderMonthlySavings);
  });
  sliderExpectedRate.addEventListener("input", function () {
    inputExpectedRate.value = sliderExpectedRate.value;
    let DisplayExpectedRate = (sliderExpectedRate.value / 12).toFixed(2);
    console.log(DisplayExpectedRate);
    displayExpectedRate.innerHTML = `<p>MPR ${DisplayExpectedRate}%</p>`;
  });
  inputExpectedRate.addEventListener("input", function () {
    sliderExpectedRate.value = inputExpectedRate.value;
    updateProgress(sliderExpectedRate);
    let DisplayExpectedRate = (inputExpectedRate.value / 12).toFixed(2);
    console.log(DisplayExpectedRate);
    displayExpectedRate.innerHTML = `<p>MPR ${DisplayExpectedRate}%</p>`;
  });
  sliderInflationRate.addEventListener("input", function () {
    inputInflationRate.value = sliderInflationRate.value;
  });
  inputInflationRate.addEventListener("input", function () {
    sliderInflationRate.value = inputInflationRate.value;
    updateProgress(sliderInflationRate);
  });
}
