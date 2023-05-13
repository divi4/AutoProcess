const categoryQuote = {"cotton":{"XS":{}, "S":{}, "M":{}, "L":{}, "XL":{}, "XXL":{}}, "leather":{"XS":{}, "S":{}, "M":{}, "L":{}, "XL":{}, "XXL":{}}, "silk":{"XS":{}, "S":{}, "M":{}, "L":{}, "XL":{}, "XXL":{}}, "tweed":{"XS":{quote:201.38}, "S":{quote:264.97}, "M":{quote:221.68}, "L":{}, "XL":{}, "XXL":{}}, "wool":{"XS":{}, "S":{}, "M":{}, "L":{}, "XL":{}, "XXL":{}}}

fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        buildCategoryQuoteObject(json)
    });




function buildCategoryQuoteObject(json) {
    const orderAvg = {"cotton":{"XS":{materialTrend: false, sizeTrend:true}, "S":{materialTrend: false, sizeTrend:false}, "M":{materialTrend: false, sizeTrend:false}, "L":{materialTrend: false, sizeTrend:false}, "XL":{materialTrend: false, sizeTrend:true}, "XXL":{materialTrend: false, sizeTrend:true}}, "leather":{"XS":{materialTrend: true, sizeTrend:true}, "S":{materialTrend: true, sizeTrend:false}, "M":{materialTrend: true, sizeTrend:false}, "L":{materialTrend: true, sizeTrend:false}, "XL":{materialTrend: true, sizeTrend:true}, "XXL":{materialTrend: true, sizeTrend:true}}, "silk":{"XS":{materialTrend: true, sizeTrend:true}, "S":{materialTrend: true, sizeTrend:false}, "M":{materialTrend: true, sizeTrend:false}, "L":{materialTrend: true, sizeTrend:false}, "XL":{materialTrend: true, sizeTrend:true}, "XXL":{materialTrend: true, sizeTrend:true}}, "tweed":{"XS":{materialTrend: false, sizeTrend:true}, "S":{materialTrend: false, sizeTrend:false}, "M":{materialTrend: false, sizeTrend:false}, "L":{materialTrend: false, sizeTrend:false}, "XL":{materialTrend: false, sizeTrend:true}, "XXL":{materialTrend: false, sizeTrend:true}}, "wool":{"XS":{materialTrend: true, sizeTrend:true}, "S":{materialTrend: true, sizeTrend:false}, "M":{materialTrend: true, sizeTrend:false}, "L":{materialTrend: true, sizeTrend:false}, "XL":{materialTrend: true, sizeTrend:true}, "XXL":{materialTrend: true, sizeTrend:true}}}
    let material = ["Cotton", "Leather", "Silk", "Tweed", "Wool"]
    let size = ["XS", "S", "M", "L", "XL", "XXL"]
    for (let i = 0; i < size.length; i++) {
        for (let j = 0; j < material.length; j++) {
            findAvgQuote(json, material[j], size[i])
            findPopularity(json, material[j], size[i], orderAvg)
            findInventory(categoryQuote, json, material[j], size[i])
        }
    }
}




function findAvgQuote(json, material, size) {
    let totalSum = 0
    let count = 0
    for (let i = 0; i < json["Order History"].length; i++) {
        if (json["Order History"][i]["Material"] ===material && json["Order History"][i]["Size"] ===size) {
            totalSum += json["Order History"][i]["Quote amount"]
            count += 1
        }
    }
    average = totalSum/count

    return populateAvgQuote(average, material, size)
}


function populateAvgQuote(average, material, size) {
    categoryQuote[material.toLowerCase()][size].quote=average
    return categoryQuote
}


function findPopularity(json, material, size, orderAvgInit) {
    orderAvg = findCategoricalOrderAvg(json, material, size, orderAvgInit)
    let averageOrderNum = findOverallOrderAvg(orderAvg, material, json)
    isPopular(averageOrderNum, orderAvg, material, size)
}


function findCategoricalOrderAvg(json, material, size, orderAvg) {
    let orderNum = 0
    for (let i = 0; i < json["Order History"].length; i++) {
        if (json["Order History"][i]["Material"] ===material && json["Order History"][i]["Size"] ===size) {
            orderNum += 1
        }
    }
    average = orderNum

    return populateCategoricalOrderNumbers(average, material, size, orderAvg)
}


function populateCategoricalOrderNumbers(average, material, size, orderAvg) {
    orderAvg[material.toLowerCase()][size].orderAverage = average
    return orderAvg
}


function findOverallOrderAvg(orderAvg, material, json) {
    let totalAvg = (json["Order History"].length)/((Object.keys(orderAvg).length) * (Object.keys(orderAvg[material.toLowerCase()]).length))
    return totalAvg
}


function isPopular(averageOrderNum, orderAvg, material, size) {
    if(orderAvg[material.toLowerCase()][size].orderAverage > averageOrderNum && (orderAvg[material.toLowerCase()][size].materialTrend === true || orderAvg[material.toLowerCase()][size].sizeTrend === true)) {
        categoryQuote[material.toLowerCase()][size].isPopular = true
    } else {
        categoryQuote[material.toLowerCase()][size].isPopular = false
    }
    return categoryQuote
}


function findInventory(categoryQuote, json, material, size) {
    categoryQuote[material.toLowerCase()][size].inventory = 0
    for (let i = 0; i < json["Order History"].length; i++) {
        if (json["Order History"][i]["Material"] ===material && json["Order History"][i]["Size"] ===size) {
            if(json["Order History"][i]["Manufacturing cost ($)"]==="" || json["Order History"][i]["Manufacturing cost ($)"]===0) {
                categoryQuote[material.toLowerCase()][size].inventory += 1
            } else {
                categoryQuote[material.toLowerCase()][size].inventory += 0
            }
        }
    }
    return categoryQuote
}


/* Task 1 */
document.querySelector("#costForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let costForm = document.getElementById("costForm");
    let staff = createStaffObject(costForm)
    let annualCost = utilMonthToYearly(costForm) + findStaffSalary(staff) + costForm[15].valueAsNumber + findCasualHours(staff)
    document.querySelector(".t1Output").innerHTML = "Annual outgoing cost: $"
    document.querySelector(".t1Output").innerHTML += annualCost
  })


function createStaffObject(costForm) {
    let staff = {
        andrea: {
            workHours: costForm[0].valueAsNumber,
            hourlyPay: costForm[3].valueAsNumber,
            isTakingLeave: document.querySelector('input[name="andreaRadio"]:checked').value
        },
        barbara: {
            workHours: costForm[1].valueAsNumber,
            hourlyPay: costForm[4].valueAsNumber,
            isTakingLeave: document.querySelector('input[name="barbaraRadio"]:checked').value
        },
        conrad : {
            workHours: costForm[2].valueAsNumber,
            hourlyPay: costForm[5].valueAsNumber,
            isTakingLeave: document.querySelector('input[name="conradRadio"]:checked').value
        },
        casual : {
            hourlyPay: costForm[17].valueAsNumber
        }
    }
    return staff
}


function utilMonthToYearly (costForm) {
    let yearMonths = 12
    return costForm[16].valueAsNumber * yearMonths
}


function findStaffSalary (staff) {
    return yearlyHours(staff)
}


function yearlyHours (staff) {
    let workWeeks = 52
    let andreaHours = staff.andrea.workHours * workWeeks
    let barbaraHours = staff.barbara.workHours * workWeeks
    let conradHours = staff.conrad.workHours * workWeeks
    return annualSalary(andreaHours, barbaraHours, conradHours, staff)
}


function annualSalary (andreaHours, barbaraHours, conradHours, staff) {
    let andreaPay = andreaHours * staff.andrea.hourlyPay
    let barbaraPay = barbaraHours * staff.barbara.hourlyPay
    let conradPay = conradHours * staff.conrad.hourlyPay
    return andreaPay + barbaraPay + conradPay
}


function findCasualHours(staff) {
    let staffKeys = [staff.andrea, staff.barbara, staff.conrad]
    let casualHours = 0
    for (let i = 0; i < staffKeys.length; i++) {
        if (staffKeys[i].isTakingLeave==="yes") {
            casualHours += staffKeys[i].workHours
        }
    }
    return findCasualAnnualSalary(casualHours, staff)
}


function findCasualAnnualSalary(casualHours, staff) {
    let casualWeeks = 4
    return (casualHours * staff.casual.hourlyPay) * casualWeeks
}


/* Task 2 */
/* Boxplot */
var y0 = [58.29,40.16,67.36,71.88,66.63,64.93,62.96,80.15,63.00,73.10,56.81,53.15,52.75,66.87,76.29,58.91,63.79,61.59,54.03,51.18,64.12,72.14,50.31,65.95,73.24,70.41,77.50,80.37,60.34,75.17,80.81,61.36,78.58,64.81,75.89,59.28,64.70,70.56,79.46,79.09,76.55,63.33,81.16,58.33,60.30,74.61,74.74,77.22,57.63,74.07,70.17,79.46,65.27,71.94,67.94,59.34,79.98,74.82,82.28,69.51,81.43,78.71,72.09,74.25,74.17,79.83,82.39,69.54,62.69,69.73,78.53,76.36,64.23,70.99,82.16,70.28,71.27,70.06,76.49,78.69,67.73,81.09,83.69,79.41,71.93];
var y1 = [72.40,67.30,74.02,67.57,65.51,61.32,68.59,60.50,73.65,71.67,70.21,62.00,63.29,69.28,55.28,75.38,73.70,76.72,57.03,62.08,56.81,77.57,56.53,66.70,76.95,78.45,55.53,59.29,56.80,72.39,53.57,62.93,78.75,73.56,66.13,80.65,78.71,61.66,67.77,58.88,73.31,57.55,58.83,59.22,75.85,68.11,69.31,55.07,67.02,71.98,65.38,57.07,60.07,65.27,63.55,62.19,67.95,67.63,66.24,57.81,35.00,44.44,69.83,79.38,80.13,80.47,61.14,58.26,59.06,66.56,60.76,57.18,58.62,24.29,34.22,83.25,82.67,69.68,58.24,43.41,67.50,61.25,57.93,69.33,75.84,58.90,55.28,67.50,53.78,57.91,56.43,78.84,80.50,61.25,62.83,56.90,62.08,70.87,66.11,54.12,78.26,70.40,65.95,51.55,51.09,51.76,54.46,65.05,61.85,52.42,73.36,48.46,77.13,79.96,67.79,66.94,72.86,73.72,54.43,50.99,62.34,70.47,75.63,81.87,82.90,82.81,72.24,49.30];

var trace1 = {
  y: y0,
  name: "Andrea",
  type: "box"
};

var trace2 = {
  y: y1,
  name: "Barbara",
  type: "box"
};

var data = [trace1, trace2];

var layout = {
    margin: {t:0,r:0,b:0,l:20},
    title: {
        text:"Range of variance of quotes vs manufacturing cost by staff",
        font: {
          family: "Arial",
          size: 24
        },
        yref: "paper",
        automargin: true,
      },
    yaxis: {
      automargin: true,
      tickangle: 90,
      title: {
        text: "Percentage",
        font: {
            family: "Arial",
            size: 18
          },
        standoff: 40
      }}} 

const boxplot = document.getElementById("boxplot");
Plotly.newPlot("boxplot", data, layout);



/* Line chart */
var trace1 = {
    y: [58.29,61.31,72.41,71.66,61.17,63.24,57.67,68.56,68.01,68.65,72.64,72.31,69.29,74.89,77.96,73.57,72.94,77.95,75.14],
    x: [27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
    name: "Andrea",
    type: "scatter"
};

var trace2 = {
    y: [71.24,66.19,66.73,65.78,67.39,69.28,62.46,66.22,63.81,54.22,69.75,50.27,65.49,61.87,65.95,60.50,55.82,67.66,74.13],
    x: [27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
    name: "Barbara",
    type: "scatter"
};

var layout = {
    margin: {t:0,r:0,b:0,l:20},
    title: {
        text:"Average weekly quote vs manfacturing cost variance by staff",
        font: {
          family: "Arial",
          size: 24
        },
        yref: "paper",
        automargin: true,
      },
    xaxis: {
      automargin: true,
      tickangle: 90,
      title: {
        text: "Weeks",
        font: {
            family: "Arial",
            size: 18
          },
        standoff: 20
      }},
    yaxis: {
      automargin: true,
      tickangle: 90,
      title: {
        text: "Percentage",
        font: {
            family: "Arial",
            size: 18
          },
        standoff: 40
      }}} 

var data = [trace1, trace2];
Plotly.newPlot("lineChart", data, layout);



/* Task 3 */
document.querySelector("#quoteForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let material = document.getElementById("quoteForm")[1].value
    let size = document.getElementById("quoteForm")[3].value.toUpperCase()
    
    document.querySelector(".quote3output").innerHTML = "Quote: $0"
    document.querySelector(".quote3output").innerHTML = `Quote: $${categoryQuote[material][size].quote}`

    if (categoryQuote[material][size].inventory===0) {
        if (categoryQuote[material][size].isPopular===true) {
            document.querySelector(".manufactureBoolean").innerHTML = "Item currently projected to be popular. Start manufacturing immediately"
        } else if (categoryQuote[material][size].isPopular===false) {
            document.querySelector(".manufactureBoolean").innerHTML = "Wait for quote confirmation by customer"
        }
        document.querySelector(".inventoryLevels").innerHTML = "Inventory: No stock available"
    } else {
        document.querySelector(".manufactureBoolean").innerHTML = "Use inventory stock"
        if (categoryQuote[material][size].inventory<7) {
            document.querySelector(".inventoryLevels").innerHTML = "Inventory: Low levels of this stock available"
        } else if (categoryQuote[material][size].inventory>=7) {
            document.querySelector(".inventoryLevels").innerHTML = "Inventory: High levels of this stock available"
        }
    }
})