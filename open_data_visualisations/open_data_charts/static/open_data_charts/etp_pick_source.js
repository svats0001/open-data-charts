var source;
let parsedJson;
var myChart;
let selectedMeasure;

async function initialiseData() {
    const response = await fetch(base_lists);
    parsedJson = await response.json();
    document.getElementById('subject-options').disabled = false;
    document.getElementById('measure-options').disabled = false;
    document.getElementById('weekChoice').disabled = false;
    document.getElementById('monthChoice').disabled = false;
    document.getElementById('yearChoice').disabled = false;
    document.getElementById('fiveyearChoice').disabled = false;
    document.getElementById('allChoice').disabled = false;
    document.getElementById('title-loading').style.visibility = 'hidden';
    findSource();
}

function loadLists(subject) {
    let chosen_list;
    let y_axis_label = '';
    
    for (let i = 0; i < parsedJson.allData.length; i++) {
        if (parsedJson.allData[i].measure === selectedMeasure) {
            for (let j = 0; j < parsedJson.allData[i].data.length; j++) {
                if (parsedJson.allData[i].data[j].subject === subject) {
                    chosen_list = parsedJson.allData[i].data[j];
                    y_axis_label = parsedJson.allData[i].label;
                    break;
                }
                if (j == (parsedJson.allData[i].data.length-1)) {
                    return;
                }
            }
            if (chosen_list != null) {
                break;
            }
        }
        if (i == (parsedJson.allData.length-1)) {
            return;
        }
    }

    document.getElementById('allChoice').checked = true;

    var labels_all = chosen_list.base_labels_all;
    var labels_all_date = [];
    for (let i = 0; i < labels_all.length; i++) {
        let date = labels_all[i].split('-');
        let hours = '00';
        let minutes = '00';
        if (date[2].split(" ").length > 1) {
            hours = date[2].split(" ")[1].split(":")[0];
            minutes = date[2].split(" ")[1].split(":")[1];
        }
        labels_all_date.push(new Date(date[2].split(" ")[0], parseInt(date[1])-1, date[0], hours, minutes));
    }
    
    var labels_week = chosen_list.base_labels_week;
    var labels_week_date = [];
    for (let i = 0; i < labels_week.length; i++) {
        let date = labels_week[i].split('-');
        let hours = '00';
        let minutes = '00';
        if (date[2].split(" ").length > 1) {
            hours = date[2].split(" ")[1].split(":")[0];
            minutes = date[2].split(" ")[1].split(":")[1];
        }
        labels_week_date.push(new Date(date[2].split(" ")[0], parseInt(date[1])-1, date[0], hours, minutes));
    }

    var labels_month = chosen_list.base_labels_month;
    var labels_month_date = [];
    for (let i = 0; i < labels_month.length; i++) {
        let date = labels_month[i].split('-');
        let hours = '00';
        let minutes = '00';
        if (date[2].split(" ").length > 1) {
            hours = date[2].split(" ")[1].split(":")[0];
            minutes = date[2].split(" ")[1].split(":")[1];
        }
        labels_month_date.push(new Date(date[2].split(" ")[0], parseInt(date[1])-1, date[0], hours, minutes));
    }

    var labels_year = chosen_list.base_labels_year;
    var labels_year_date = [];
    for (let i = 0; i < labels_year.length; i++) {
        let date = labels_year[i].split('-');
        let hours = '00';
        let minutes = '00';
        if (date[2].split(" ").length > 1) {
            hours = date[2].split(" ")[1].split(":")[0];
            minutes = date[2].split(" ")[1].split(":")[1];
        }
        labels_year_date.push(new Date(date[2].split(" ")[0], parseInt(date[1])-1, date[0], hours, minutes));
    }

    var labels_fiveyears = chosen_list.base_labels_fiveyears;
    var labels_fiveyears_date = [];
    for (let i = 0; i < labels_fiveyears.length; i++) {
        let date = labels_fiveyears[i].split('-');
        let hours = '00';
        let minutes = '00';
        if (date[2].split(" ").length > 1) {
            hours = date[2].split(" ")[1].split(":")[0];
            minutes = date[2].split(" ")[1].split(":")[1];
        }
        labels_fiveyears_date.push(new Date(date[2].split(" ")[0], parseInt(date[1])-1, date[0], hours, minutes));
    }
    
    var data_all = chosen_list.base_data_all;
    var data_week = chosen_list.base_data_week;
    var data_month = chosen_list.base_data_month;
    var data_year = chosen_list.base_data_year;
    var data_fiveyears = chosen_list.base_data_fiveyears;

    const chart_all = {
        labels: labels_all_date,
        datasets: [{
            label: y_axis_label,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data_all
        }]
    }

    const chart_week = {
        labels: labels_week_date,
        datasets: [{
            label: y_axis_label,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data_week
        }]
}

const chart_month = {
    labels: labels_month_date,
    datasets: [{
        label: y_axis_label,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data_month
    }]
}

const chart_year = {
    labels: labels_year_date,
    datasets: [{
        label: y_axis_label,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data_year
    }]
}

const chart_fiveyears = {
    labels: labels_fiveyears_date,
    datasets: [{
        label: y_axis_label,
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
            text: y_axis_label
        }
    },
    x: {
        type: 'time',
        time: {
            parser: 'dd/MM/yyyy HH:mm',
            tooltipFormat: 'dd/MM/yyyy HH:mm',
            unit: 'day',
            unitStepSize: 1,
            displayFormats: {
                'day': 'dd/MM/yyyy'
            }
        },
        title: {
            display: true,
            text: 'Date (dd/mm/yyyy)'
    }}
};
const hideLegend = {legend: {display: false}};
var loadingBar = document.getElementById('loading');
var config = {
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

function addEventListenersToTimeframes() {
    let radios = document.getElementsByName('timeChoice');
    for (let i = 0; i < radios.length; i++) {
        radios[i].onclick = function () {
            var timeframeLoading = document.getElementById('timeframe-loading');
            timeframeLoading.style.display = "inline-block";
            setTimeout(() => {
                timeframeLoading.style.display = "none";
            }, 3000);
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

var findSource = () => {
    document.getElementById('measure-options').addEventListener("change", function () {
        var measureLoading = document.getElementById('measure-loading');
        measureLoading.style.display = "inline-block";
        selectedMeasure = this.value;
        let subject = document.getElementById('subject-options').value;
        setTimeout(() => {
            measureLoading.style.display = "none";
        }, 5000);
        if (subject !== "") {
            loadLists(subject);
        }
    })
    document.querySelector('#subject-options').addEventListener("change", function () {
        if (this.value !== "") {
            var selectSubjectLabel = document.getElementById('selectSubjectLabel');
            var subjectBreak = document.getElementById('subjectBreak');
            var subjectLoading = document.getElementById('subject-loading');
            subjectLoading.style.display = "inline-block";
            selectSubjectLabel.style.display = "none";
            subjectBreak.style.display = "inline";
            setTimeout(() => {
                subjectLoading.style.display = "none";
            }, 5000);
            loadLists(this.value);
        };
    });
}

window.onload = () => {
    initialiseData();
    selectedMeasure = document.getElementById('measure-options').value;
    let subjectVal = document.getElementById('subject-options');
    subjectVal.value = "";
};