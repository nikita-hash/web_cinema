function char(mas){
  const data = [
    { year: 'Январь', count: mas[0] },
    { year: 'Февраль', count: mas[1] },
    { year: 'Март', count: mas[2] },
    { year: 'Апрель', count: mas[3] },
    { year: 'Май', count: mas[4] },
    { year: 'Июнь', count: mas[5] },
    { year: 'Июль', count: mas[6] },
    { year: 'Август', count: mas[7] },
    { year: 'Сентябрь', count: mas[8] },
    { year: 'Октябрь', count: mas[9] },
    { year: 'Ноябрь', count: mas[10] },
    { year: 'Декабрь', count: mas[11] },
  ];

  
  new Chart(
    document.getElementById('acquisitions'),
    {
        options: {
            scales: {
              xAxes: [{
                ticks: {
                  fontColor: 'white'
                },
                gridLines: {
                    color: '#ccc', // цвет вертикальных линий сетки
                  }
              }],
              yAxes: [{
                ticks: {
                  fontColor: 'white',
                  beginAtZero: true
                }, gridLines: {
                    color: '#ccc', // цвет вертикальных линий сетки
                  }
              }],
               legend: {
                labels: {
                    fontColor: 'purple',
                    fontSize: 16
                },
             }
            }
          },
      type: 'line',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Общие показатели лайков',
            data: data.map(row => row.count),
            borderColor: '#dc3545',
            pointBackgroundColor: '#dc3545',
            pointBorderColor: 'white',
            pointRadius: 5
          }
        ]
    
      }
      
    }
  );
}