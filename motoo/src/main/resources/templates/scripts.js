document.addEventListener('DOMContentLoaded', function () {
    const kospiChartCtx = document.getElementById('kospiChart').getContext('2d');
    const kosdaqChartCtx = document.getElementById('kosdaqChart').getContext('2d');

    const kospiData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'KOSPI Index',
            data: [2200, 2300, 2100, 2400, 2500, 2600, 2700, 2600, 2800, 2900, 3000, 3100],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    };

    const kosdaqData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'KOSDAQ Index',
            data: [800, 850, 810, 870, 900, 920, 940, 930, 960, 980, 1000, 1020],
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false
        }]
    };

    new Chart(kospiChartCtx, {
        type: 'line',
        data: kospiData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(kosdaqChartCtx, {
        type: 'line',
        data: kosdaqData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
