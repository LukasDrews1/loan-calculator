const years = 30;
const result = loanCalculator(250000, 5000, years);
const labels = [...Array(years).keys()].map((i) => `Year ${i+=1}`);
const data = {
    labels: labels,
    datasets: [{
            label: 'Yearly interest rate',
            backgroundColor: '#ecdbba',
            borderColor: '#f55c47',
            borderWidth: 3,
            radius: 4,
            data: result.history.map((i) => i.loanRate)
        },
        {
            label: 'Loan',
            backgroundColor: '#ecdbba',
            borderColor: '#346751',
            borderWidth: 3,
            radius: 4,
            data: result.history.map((i) => i.loan)
        },
        {
            label: 'Total interest rates',
            backgroundColor: '#ecdbba',
            borderColor: '#fb9300',
            borderWidth: 3,
            radius: 4,
            data: result.history.map((i) => i.total)
        }
    ]
};
const config = {
    type: 'line',
    data,
    options: {}
};

let myChart = new Chart(
    document.getElementById('myChart'), config
);

function loanCalculator(loan, payment, years = 30, rate = 0.05) {
    const history = []
    let total = 0;
    let paymentDone = 0;
    for (let i = 0; i < years; i++) {
        loan = loan - payment
        let loanRate = loan * rate;
        total = total + loanRate;
        loan += loanRate;
        history.push({
            loan: Math.round(loan / 100) * 100,
            loanRate: Math.round(loanRate / 100) * 100,
            total: Math.round(total / 100) * 100
        });
        if (loan <= 0) {
            paymentDone = i;
            break;
        }
    }
    paymentDone = paymentDone + 1;
    return {
        history,
        paymentDone
    };
}

function setUp() {
    const loan = document.getElementById("loan").value;
    const payment = document.getElementById("payment").value;
    let years = document.getElementById("years").value;
    const rate = document.getElementById("rate").value;

    if (years > 1000)
        years = 1000;

    if (!isNumeric(loan) || !isNumeric(payment) || !isNumeric(years) || !isNumeric(rate)) {
        $('#modal1').modal('show');
    }

    const result = loanCalculator(loan, payment, years, fixPercent(rate));
    const labels = [...Array(parseInt(years)).keys()].map((i) => `Year ${i+=1}`);
    const data = {
        labels: labels,
        datasets: [{
                label: 'Yearly interest rate',
                backgroundColor: '#ecdbba',
                borderColor: '#f55c47',
                borderWidth: 3,
                radius: 4,
                data: result.history.map((i) => i.loanRate)
            },
            {
                label: 'Loan',
                backgroundColor: '#ecdbba',
                borderColor: '#346751',
                borderWidth: 3,
                radius: 4,
                data: result.history.map((i) => i.loan)
            },
            {
                label: 'Total interest rates',
                backgroundColor: '#ecdbba',
                borderColor: '#fb9300',
                borderWidth: 3,
                radius: 4,
                data: result.history.map((i) => i.total)
            }
        ]
    };
    myChart.config.data = data;
    myChart.update();
}

function fixPercent(num) {
    num = parseFloat(num);
    console.log(num);
    num = num / 100;
    return num;
}

function isNumeric(num) {
    return !isNaN(num);
}

function closeDialog() {
    $('#modal1').modal('hide');
}
