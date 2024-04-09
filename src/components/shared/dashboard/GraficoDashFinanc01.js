import React from 'react';
import Chart from 'react-apexcharts';

function GraficoDashed({ data }) {
  // const data = [
  //   {
  //     name: 'Session Duration',
  //     data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  //   },
  //   {
  //     name: 'Page Views',
  //     data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
  //   },
  //   {
  //     name: 'Total Visits',
  //     data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
  //   },
  // ];

  return (
    <Chart
      options={{
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        // colors: [...COLORS],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [3, 3, 3, 3],
          curve: 'straight',
          dashArray: [0],
        },
        legend: {
          tooltipHoverFormatter: (val, opts) =>
            `${val} - ${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
            }`,
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            'Año 1',
            'Año 2',
            'Año 3',
            'Año 4',
            'Año 5',
            'Año 6',
            'Año 7',
            'Año 8',
            'Año 9',
            'Año 10',
          ],
        },
        tooltip: {
          y: [
            // {
            //   title: {
            //     formatter: (val) => `${val} (mins)`,
            //   },
            // },
            // {
            //   title: {
            //     formatter: (val) => `${val} per session`,
            //   },
            // },
            {
              title: {
                formatter: (val) => `${val}`,
              },
            },
          ],
        },
        grid: {
          borderColor: '#f1f1f1',
        },
      }}
      series={data}
      height={300}
    />
  );
}

export default GraficoDashed;
