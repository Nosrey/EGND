/* eslint-disable object-shorthand */
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function GraficoCapex01({ data, typeView }) {
  const currency = useSelector((state) => state.auth.user.currency);

  return (
    <Chart
      options={{
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (value) {
            return `${currency}${value}`;
          },
        },
        xaxis: {
          categories: typeView,
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return `${currency}${value}`;
            },
          },
        },
      }}
      series={[
        {
          data,
          name: 'Total de ventas',
        },
      ]}
      type="bar"
      height={300}
    />
  );
}

export default GraficoCapex01;
