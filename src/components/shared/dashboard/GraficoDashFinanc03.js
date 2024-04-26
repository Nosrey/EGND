import Chart from 'react-apexcharts';

function GraficoDashFinanc03({ graph03Data }) {
  return (
    <Chart
      options={{
        chart: {
          id: "03",
        },
        dataLabels: {
          enabled: false,
        },
        colors: [
          '#C1F5FE',
          '#C1C6FE',
          '#C2FEC1',
          '#FEC1CF',
          '#FEF6C1',
          '#FF2D00',
        ],
        stroke: {
          curve: 'smooth',
        },

        xaxis: {
          type: 'numeric',
          categories: Array.from({ length: 10 }, (_, i) => i),
          labels: {
            formatter(value) {
              return `Año ${value + 1}`;
            },
          },
        },
        tooltip: {
          x: {
            formatter(value) {
              return `Año ${value}`;
            },
          },
        },
      }}
      series={graph03Data}
      type="area"
      height={300}
    />
  );
}

export default GraficoDashFinanc03;
