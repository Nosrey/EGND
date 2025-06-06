/* eslint-disable react-hooks/exhaustive-deps */
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { formatNumberGrafics } from 'utils/formatTotalsValues';

function GraficoDeBarraHeadcountFour({ typeView, ftes }) {
  const currency = useSelector((state) => state.auth.user.currency);
  const data = [
    {
      name: 'FTE',
      data: ftes,
    },
  ];
  return (
    <Chart
      options={{
        chart: {
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        colors: ['#4F46E5'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: true,
          formatter(value) {
            return `${currency}${formatNumberGrafics(value)}`;
          },
        },
        xaxis: {
          categories: typeView,
        },
        yaxis: {
          labels: {
            formatter(value) {
              return `${currency}${value}`;
            },
          },
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      }}
      series={data}
      type="bar"
      height={300}
    />
  );
}

export default GraficoDeBarraHeadcountFour;
