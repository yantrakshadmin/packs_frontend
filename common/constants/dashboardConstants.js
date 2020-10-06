export const chartConfigs = {
  backgroundColor: 'rgb(0,142,255)',
  borderColor: 'rgb(0,100,255)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgb(0,219,255)',
  hoverBorderColor: 'rgb(0,135,255)',
}
export const chartOptions = {
  responsive: true,
  scales: {
    xAxes: [{
      gridLines: {
        show: true
      },
    }],
    yAxes: [{
      gridLines: {
        show: false
      }
    }]
  }
};
export const initialChart = (label)=>({
  labels: ['January',
    'February', 'March',
    'April', 'May', 'June', 'July', 'Aug',
    'Sept', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label ,
      ...chartConfigs,
      data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
})
