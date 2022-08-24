async function loadLists() {
    const response = await fetch(etp_ammonia_lists);
    const parsedJson = await response.json();
        
    var labels_all = parsedJson.etp_ammonia_labels_all;
    var labels_week = parsedJson.etp_ammonia_labels_week;
    var labels_month = parsedJson.etp_ammonia_labels_month;
    var labels_year = parsedJson.etp_ammonia_labels_year;
    var labels_fiveyears = parsedJson.etp_ammonia_labels_fiveyears;
    var data_all = parsedJson.etp_ammonia_data_all;
    var data_week = parsedJson.etp_ammonia_data_week;
    var data_month = parsedJson.etp_ammonia_data_month;
    var data_year = parsedJson.etp_ammonia_data_year;
    var data_fiveyears = parsedJson.etp_ammonia_data_fiveyears;

    const chart_all = {
        labels: labels_all,
        datasets: [{
            label: 'etp ammonia all data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data_all
        }]
    }

    const chart_week = {
        labels: labels_week,
        datasets: [{
            label: 'etp ammonia past week data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data_week
        }]
}

const chart_month = {
    labels: labels_month,
    datasets: [{
        label: 'etp ammonia past month data',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data_month
    }]
}

const chart_year = {
    labels: labels_year,
    datasets: [{
        label: 'etp ammonia past year data',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data_year
    }]
}

const chart_fiveyears = {
    labels: labels_fiveyears,
    datasets: [{
        label: 'etp ammonia past five years data',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data_fiveyears
    }]
}

var chartChoice = chart_all;
const axesLabels = {
    y: {
        title: {
            display: true,
            text: 'Ammonia concentration (mg/L)'
        }
    },
    x: {
        title: {
            display: true,
            text: 'Date (dd/mm/yyyy)'
    }}
};
const hideLegend = {legend: {display: false}};
var config = {
    type: 'line',
    data: chartChoice,
    options: {responsive: true,
    scales: axesLabels,
    plugins: hideLegend}
}
var myChart = new Chart(
    document.getElementById('myChart'),
    config
    );;

function addEventListenersToTimeframes() {
    let radios = document.getElementsByName('timeChoice');
    for (let i = 0; i < radios.length; i++) {
        radios[i].onclick = function () {
            if (radios[i].value === 'Week') {
                chartChoice = chart_week;
            }
            else if (radios[i].value === 'Month') {
                chartChoice = chart_month;
            }
            else if (radios[i].value === 'Year') {
                chartChoice = chart_year;
            }
            else if (radios[i].value === 'FiveYears') {
                chartChoice = chart_fiveyears;
            }
            else {
                chartChoice = chart_all;
            }
            config = {
                type: 'line',
                data: chartChoice,
                options: {responsive: true,
                scales: axesLabels,
                plugins: hideLegend}
            }
            
            if (myChart != null) {
                myChart.destroy();
            }
            
            myChart = new Chart(
                document.getElementById('myChart'),
                config
                );
        }
    }
}
addEventListenersToTimeframes();
}

loadLists();