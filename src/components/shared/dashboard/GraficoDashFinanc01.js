import React from 'react';
import Chart from 'react-apexcharts';

function GraficoDashed({ data }) {
  return (
    <Chart
      options={{
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
          id: "01",
        },
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
            `${val} - ${
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
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
