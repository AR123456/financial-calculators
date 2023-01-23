function generateTable() {
  // create teh bootstrap responsive table container
  const cont = document.createElement("div");
  cont.classList.add("table-responsive", "container");
  cont.id = "tableDiv";
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  // add classes in this case for bootstrap 5
  tbl.classList.add(
    "table",
    "table-striped",
    "table-hover",
    "table-bordered",
    "table-sm",
    "caption-top"
  );
  tbl.innerHTML = `<caption class="text-center">Summary</caption>`;
  const tblBody = document.createElement("tbody");
  const tblHeader = document.createElement("thead");
  // const row = document.createElement("tr");
  const trFirst = document.createElement("tr");
  tblHeader.innerHTML = `
              <tr>  
              <th class="text-center">Years ${years}</th>
              <th class="text-center">Contributing ${monthlySaved}</th>
              <th class="text-center">Contributing ${ppmt} to get to goal</th> 
              </tr>`;
  trFirst.innerHTML = `<tr>  
              <td></td>
              <td class="text-end">$${growthByYear[0]} Starting Balance</td>
              <td class="text-end">$${growthByYearNeededToBeSaved[0]} Starting Balance</td> 
              </tr>`;
  // creating all cells
  for (let i = 1; i < yearsToGrow.length; i++) {
    // creates a table row
    const row = document.createElement("tr");
    let trs = `<tr>  
                <td class="text-end">${yearsToGrow[i]}</td>
                <td class="text-end">$ ${growthByYear[i]}</td>
                <td class="text-end">$ ${growthByYearNeededToBeSaved[i]}</td> 
                </tr>`;
    row.innerHTML = trs;
    // prepend adds to front append adds to end
    tblBody.prepend(trFirst);
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // put tblHeader into the table
  tbl.appendChild(tblHeader);
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // put the table into the table responsive container for bootstrap
  cont.appendChild(tbl);
  // appends <table> to the hard coded div >
  dynamicGenerateTable.appendChild(cont);
}
function generateResultSummary() {
  // create teh bootstrap responsive table container
  const cont = document.createElement("div");
  cont.classList.add("table-responsive", "container");
  // create the main table element
  const tbl = document.createElement("table");
  tbl.classList.add(
    "table",
    "table-striped",
    "table-hover",
    "table-bordered",
    "table-sm",
    "caption-top"
  );
  tbl.innerHTML = `<caption class="text-center">By Year</caption>`;
  // create the parts of the table
  const tblBody = document.createElement("tbody");
  const tblHeader = document.createElement("thead");
  const tblFooter = document.createElement("tfoot");
  //  add to elements
  tblHeader.innerHTML = `
    <tr><th class="text-center">Result Summary</th></tr>`;
  tblBody.innerHTML = `
    <tr>  
    <td class="text-end">Savings goal </td>
    <td class="text-end"> ${goal}</td>
    </tr>
    <tr>  
    <td class="text-end">Target years to save </td>
    <td class="text-end"> ${years}</td>
     </tr>
    <tr>  
    <td class="text-end">Amount currently saved </td> 
    <td class="text-end"> ${currentSaved}</td> 
     </tr>
    <tr>  
    <td class="text-end">Expected rate of return</td>
     <td class="text-end"> ${rate}</td>
      </tr>
    <tr>  
    <td class="text-end">Inflation rate  </td>
      <td class="text-end"> ${expectedInflation}</td>
      </tr>   
     `;
  tblFooter.innerHTML = `
    <tr> 
      <td class="text-end">Total after 10 years </td>
      <td class="text-end"> ${growthByYearNeededToBeSaved[10]}</td>
    </tr>
    <tr>    
      <td class="text-end">Amount required to meet goal in ${years} years</td>
      <td class="text-end"> ${ppmt} monthly</td>
    </tr> `;
  // put tblHeader into the table
  tbl.appendChild(tblHeader);
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // put footer into table
  tbl.appendChild(tblFooter);
  cont.appendChild(tbl);
  // appends <table> to div >
  dynamicGenerateTable.appendChild(cont);
}
