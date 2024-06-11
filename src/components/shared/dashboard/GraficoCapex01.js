/* eslint-disable object-shorthand */
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { formatNumberGrafics } from 'utils/formatTotalsValues';

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
            return `${currency}${formatNumberGrafics(value)}`;
          },
        },
        xaxis: {
          categories: typeView,
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return `${currency}${value.toFixed(2)}`;
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
