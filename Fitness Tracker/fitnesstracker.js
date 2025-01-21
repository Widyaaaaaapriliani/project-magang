// script.js

document.getElementById('logForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories').value;

    const workoutList = document.getElementById('workoutList');
    const listItem = document.createElement('li');
    listItem.textContent = `${type} - ${duration} minutes - ${calories} calories`;
    workoutList.appendChild(listItem);

    document.getElementById('logForm').reset();

    updateChart(type, duration, calories);
});

const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Workout Duration (min)',
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart(type, duration, calories) {
    const index = progressChart.data.labels.indexOf(type);
    if (index === -1) {
        progressChart.data.labels.push(type);
        progressChart.data.datasets[0].data.push(parseInt(duration));
    } else {
        progressChart.data.datasets[0].data[index] += parseInt(duration);
    }
    progressChart.update();
}
