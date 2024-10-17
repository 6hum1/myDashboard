const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [{
      label: 'Sales Distribution (%)',
      data: [35, 25, 20, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
  },
  options: {
    responsive: false, // Disable responsiveness to use fixed canvas size
  }
});

const scatterCtx = document.getElementById('scatterChart').getContext('2d');
const scatterChart = new Chart(scatterCtx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Revenue vs Ad Spend',
      data: [
        { x: 20000, y: 10000 },
        { x: 30000, y: 15000 },
        { x: 50000, y: 25000 }
      ],
      backgroundColor: '#FF6384',
    }]
  },
  options: {
    responsive: false, // Disable responsiveness to use fixed canvas size
  }
});

const radarCtx = document.getElementById('radarChart').getContext('2d');
const radarChart = new Chart(radarCtx, {
  type: 'radar',
  data: {
    labels: ['Quality', 'Service', 'Price', 'Variety', 'Brand'],
    datasets: [{
      label: 'Performance Metrics',
      data: [3, 4, 2, 5, 4],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2
    }]
  },
  options: {
    responsive: false, // Disable responsiveness to use fixed canvas size
  }
});

const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
const doughnutChart = new Chart(doughnutCtx, {
  type: 'doughnut',
  data: {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [{
      label: 'Sales by Region (%)',
      data: [25, 35, 20, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
  },
  options: {
    responsive: false, // Disable responsiveness to use fixed canvas size
  }
});


const mixedCtx = document.getElementById('mixedChart').getContext('2d');
const mixedChart = new Chart(mixedCtx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Sales (%)',
        data: [50, 60, 70, 80],
        backgroundColor: '#FF6384',
      },
      {
        label: 'Profit (%)',
        type: 'line',
        data: [20, 30, 40, 50],
        borderColor: '#36A2EB',
        fill: false,
      }
    ]
  },
  options: {
    responsive: false, // Disable responsiveness to use fixed canvas size
  }
});



// WebSocket Integration
const socket = io('https://data.gdscnsut.com/');

// Update all charts with WebSocket data
socket.on('random_number', (data) => {
   console.log(data); 
  // Update Bar Chart
  barChart.data.datasets[0].data = barChart.data.datasets[0].data.map(() => Math.random() * 100);
  barChart.update();

  // Update Scatter Chart
  scatterChart.data.datasets[0].data.push({
    x: Math.random() * 50000,
    y: Math.random() * 30000
  });
  scatterChart.update();

  // Update Radar Chart
  radarChart.data.datasets[0].data = radarChart.data.datasets[0].data.map(() => Math.random() * 5);
  radarChart.update();

  // Update Doughnut Chart
  doughnutChart.data.datasets[0].data = [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100];
  doughnutChart.update();

  // Update mixed chart

  mixedChart.data.datasets[0].data = mixedChart.data.datasets[0].data.map(() => Math.random() * 100);
  mixedChart.data.datasets[1].data = mixedChart.data.datasets[1].data.map(() => Math.random() * 100);
  mixedChart.update();

});