/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function GraficoDashed({ typeView, data }) {
  const currency = useSelector((state) => state.auth.user.currency);
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
          width: [3, 5, 3],
          curve: 'straight',
          dashArray: [0, 8, 5],
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
          categories: typeView,
        },
        yaxis: {
          labels: {
            formatter(value) {
              return `${currency}${value.toFixed(2)}`;
            },
          },
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: (val) => `${val}`,
              },
            },
            {
              title: {
                formatter: (val) => `${val}`,
              },
            },
            {
              title: {
                formatter: (val) => `${val}`,
              },
            },
            {
              title: {
                formatter: (val) => `${val}`,
              },
            },
            {
              title: {
                formatter: (val) => `${val}`,
              },
            },
            {
              title: {
                formatter: (val) => `${val}`,
              },
            },
            {
              title: {
                formatter: (val) => `${val}`,
              },
            },
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
