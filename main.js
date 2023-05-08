document.querySelector("#costForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var costForm = document.getElementById("costForm");
    var staff = createStaffObject(costForm)
    var annualCost = utilMonthToYearly(costForm) + findStaffSalary(staff) + costForm[15].valueAsNumber + findCasualHours(staff)
    document.querySelector(".t1Output").innerHTML = "Annual outgoing cost: "
    document.querySelector(".t1Output").innerHTML += annualCost
  })

function createStaffObject(costForm) {
    var staff = {
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
    var yearMonths = 12
    return costForm[16].valueAsNumber * yearMonths
}

function findStaffSalary (staff) {
    return yearlyHours(staff)
}

function yearlyHours (staff) {
    var workWeeks = 52
    var andreaHours = staff.andrea.workHours * workWeeks
    var barbaraHours = staff.barbara.workHours * workWeeks
    var conradHours = staff.conrad.workHours * workWeeks
    return annualSalary(andreaHours, barbaraHours, conradHours, staff)
}

function annualSalary (andreaHours, barbaraHours, conradHours, staff) {
    var andreaPay = andreaHours * staff.andrea.hourlyPay
    var barbaraPay = barbaraHours * staff.barbara.hourlyPay
    var conradPay = conradHours * staff.conrad.hourlyPay
    return andreaPay + barbaraPay + conradPay
}

function findCasualHours(staff) {
    var staffKeys = [staff.andrea, staff.barbara, staff.conrad]
    var casualHours = 0
    for (let i = 0; i < staffKeys.length; i++) {
        if (staffKeys[i].isTakingLeave==="yes") {
            casualHours += staffKeys[i].workHours
        }
    }
    return findCasualAnnualSalary(casualHours, staff)
}

function findCasualAnnualSalary(casualHours, staff) {
    var casualWeeks = 4
    return (casualHours * staff.casual.hourlyPay) * casualWeeks
}


// [50.31, 63.56, 70.99, 13.80, 69.82, 77.36, 83.69]
// 5: median
// 7: max



function staffVariance(staffNum) {
    if (staffNum===1) {
        return [50.31, 63.56, 70.99, 13.80, 69.82, 77.36, 83.69]
    }
    if(staffNum===2) {
        return [57, 60, 67, 19, 75, 85, 90]
    }

  }
    
    const boxplotData = {
    // define label tree
    labels: ['Variance'],
    datasets: [{
        label: 'Andrea',
        backgroundColor: 'rgba(255,0,0,0.5)',
        borderColor: 'red',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: [
            staffVariance(1)
        // 50.31, // min whisker
        // 63.56, // lower q
        // 70.99, // median
        // 13.80 , // iqr
        // 69.82, // mean
        // 77.36, // upper q
        // 83.69 // max whisker
        ]
    },
    {
        label: 'Barbara',
        backgroundColor:  'rgba(0,0,255,0.5)',
        borderColor: 'blue',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: [
            staffVariance(2)
        ]
      }]
    };
    window.onload = () => {
    const ctx = document.getElementById("chart1").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'boxplot',
        data: boxplotData,
        options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Box Plot Chart'
        }
        }
    });
    
    };