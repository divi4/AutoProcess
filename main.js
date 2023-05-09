document.querySelector("#costForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var costForm = document.getElementById("costForm");
    var staff = createStaffObject(costForm)
    var annualCost = utilMonthToYearly(costForm) + findStaffSalary(staff) + costForm[15].valueAsNumber + findCasualHours(staff)
    document.querySelector(".t1Output").innerHTML = "Annual outgoing cost: $"
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


var material = document.getElementById("quoteForm")
console.log(material)

document.querySelector("#quoteForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var material = document.getElementById("quoteForm")[1].value
    var size = document.getElementById("quoteForm")[3].value
    
    document.querySelector(".quote3output").innerHTML = "Quote: $"
    document.querySelector(".quote3output").innerHTML +=  categoryQuote[material][size].quote  // Allows to dynamically resolve object property names
    if (categoryQuote[material][size].isPopular===true) {
        document.querySelector(".manufactureBoolean").innerHTML = "Start manufacturing immediately"
    } else if (categoryQuote[material][size].isPopular===false) {
        document.querySelector(".manufactureBoolean").innerHTML = "Wait for quote confirmation by customer"
    }
})

categoryQuote = {
    cotton: {
        xs: {
            quote : 70.20,
            isPopular: true
        },
        s: {
            quote : 67.07,
            isPopular: false
        },
        m: {
            quote: 77.58,
            isPopular: false
        },
        l: {
            quote: 76.85,
            isPopular: false
        },
        xl: {
            quote: 80.98,
            isPopular: true
        },
        xxl: {
            quote: 96.83,
            isPopular: true
        }
    },
    leather: {
        xs: {
            quote : 148.66,
            isPopular: true
        },
        s: {
            quote : 178.34,
            isPopular: false
        },
        m: {
            quote: 153.43,
            isPopular: false
        },
        l: {
            quote: 173.97,
            isPopular: false
        },
        xl: {
            quote: 206.80,
            isPopular: true
        },
        xxl: {
            quote: 188.65,
            isPopular: false
        }
    },
    silk: {
        xs: {
            quote : 427.80,
            isPopular: false
        },
        s: {
            quote : 515.60,
            isPopular: false
        },
        m: {
            quote: 497.93,
            isPopular: false
        },
        l: {
            quote: 396.15,
            isPopular: false
        },
        xl: {
            quote: 650.72,
            isPopular: false
        },
        xxl: {
            quote: 668.87,
            isPopular: false
        }
    },
    tweed: {
        xs: {
            quote : 201.38,
            isPopular: false
        },
        s: {
            quote : 264.97,
            isPopular: false
        },
        m: {
            quote: 221.68,
            isPopular: false
        },
        l: {
            quote: 226.68,
            isPopular: false
        },
        xl: {
            quote: 212.20,
            isPopular: false
        },
        xxl: {
            quote: 279.33,
            isPopular: false
        }
    },
    wool: {
        xs: {
            quote : 124.22,
            isPopular: true
        },
        s: {
            quote : 163.44,
            isPopular: false
        },
        m: {
            quote: 136.74,
            isPopular: true
        },
        l: {
            quote: 139.82,
            isPopular: true
        },
        xl: {
            quote: 146.48,
            isPopular: true
        },
        xxl: {
            quote: 172.96,
            isPopular: true
        }
    }
}