// looking at using Javascript to generate slider marks
// https://codepen.io/viestursm/pen/BayEjaN
function init() {
  const sliders = document.getElementsByClassName("tick-slider-input");

  for (let slider of sliders) {
    slider.oninput = onSliderInput;

    // updateValue(slider);
    // updateValuePosition(slider);
    // updateLabels(slider);
    // updateProgress(slider);
    // draw the tick marks on the page
    setTicks(slider);
  }
}
// This function is drawing the tick marks onto the page
function setTicks(slider) {
  let container = document.getElementById(slider.dataset.tickId);

  const spacing = parseFloat(slider.dataset.tickStep);
  // console.log("spacing" + spacing);
  const sliderRange = slider.max - slider.min;
  // console.log(sliderRange);
  const tickCount = sliderRange / spacing + 1; // +1 to account for 0
  // console.log(tickCount);

  for (let ii = 0; ii < tickCount; ii++) {
    let tick = document.createElement("span");

    tick.className = "tick-slider-tick";

    container.appendChild(tick);
  }
}
window.onload = init;
