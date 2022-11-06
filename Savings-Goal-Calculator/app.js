// TODO create a app that will take in a dollar amount goal an years goal
// the app will calculate how much needs to be saved per month to achive the goal
// use an assumed IRR of 8% then make that dynamic
//

const savingsRange = document.getElementById("savingsRange");
const savingsGoal = document.getElementById("savingsGoal");
savingsGoal.innerHTML = savingsRange.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
// TODO update the value based on slider or typing in text box
savingsRange.oninput = function () {
  savingsGoal.innerHTML = this.value;
};
