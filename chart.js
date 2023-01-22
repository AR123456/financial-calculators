//TODO put this in separte file for import   my chart
const displayChart = () => {
  // call this after calculate
  // const ctx = document.getElementById("myChart").getContext("2d");
  // https://stackoverflow.com/questions/69559728/eror-chart-min-js13-uncaught-in-promise-error-canvas-is-already-in-use-cha
  // https://www.youtube.com/watch?v=TvkT6a17L2s
  // let chartStatus = Chart.getChart("myChart");

  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      // labels: data.map((row) => row.year),
      //  years for each year create a label
      labels: yearsToGrow,
      // loop number of goal years and push do data array for each year what the actual savings are in blue, the first number
      // and then amount needed per year to get to goal  each year the green number
      datasets: [
        {
          // TODO use JS to show  monthlySaved
          label: "Plan monthly",
          // thousands of dollars scaled to goal
          data: growthByYear,
          // data: [
          //   1000, 1000, 7011, 1890, 13036, 2783, 19077, 3676, 25133, 4573, 31204,
          //   5472, 37290, 6373, 43391, 7276, 49508, 8182, 55640, 9090, 61787,
          //   10000,
          // ],
          backgroundColor: [
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",

            //  site default green rgba(47, 162, 47, 1)
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",
            // "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
        {
          // TODO use JS to show  monthlySaved
          label: "Needed monthly",
          // thousands of dollars scaled to goal
          data: growthByYearNeededToBeSaved,
          // data: [
          //   1000, 1000, 7011, 1890, 13036, 2783, 19077, 3676, 25133, 4573, 31204,
          //   5472, 37290, 6373, 43391, 7276, 49508, 8182, 55640, 9090, 61787,
          //   10000,
          // ],
          backgroundColor: [
            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            "rgba(54, 162, 235, 1)",

            //  site default green rgba(47, 162, 47, 1)
          ],
          borderColor: [
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            "rgba(47, 162, 47, 0.2)",
            // "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
