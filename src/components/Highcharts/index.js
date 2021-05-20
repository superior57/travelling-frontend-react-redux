import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HighchartContainer = ({ transactions }) => {
  let category = [];
  let chartData = [];
  transactions.transactions.map((cat, i) => {
    category = [
      ...category,
      `${new Date(cat.createdAt).getDate()}/${new Date(cat.createdAt).getMonth() + 1}/${new Date(
        cat.createdAt
      ).getFullYear()}`
    ];
    chartData = [...chartData, cat.Amount];
  });

  const options = {
    chart: {
      type: 'areaspline',
      height: 288
    },
    title: {
      text: 'Transaction'
    },
    xAxis: {
      categories: category,
      plotBands: [
        {
          // visualize the weekend
          from: 4.5,
          to: 6.5,
          color: 'rgba(68, 170, 213, .2)'
        }
      ]
    },
    yAxis: {
      title: {
        text: 'Transaction Amount'
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: ' $'
    },
    //   credits: {
    //     enabled: false
    //   },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    series: [
      {
        name: 'Transaction',
        data: chartData
      }
    ]
  };
  console.log('####################', options);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={transactions ? options : options} />
    </div>
  );
};

export default HighchartContainer;
