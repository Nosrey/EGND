/* eslint-disable object-shorthand */
import {
  firstSem,
  month,
  oneMonth,
  secondSem,
  trimn,
  year,
} from 'constants/dashboard.constant';
import { BASIC_EMPTY, EMPTY_TOTALES, MONTHS } from 'constants/forms.constants';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

let totals = JSON.parse(JSON.stringify(EMPTY_TOTALES));
let superTotals = JSON.parse(JSON.stringify(BASIC_EMPTY));

function GraficoDashFinanc04({ props, yearSelected, periodoSelected }) {
  const [view, setView] = useState(props.variacionDeCajaYBancos);
  const [view2, setView2] = useState(props.cajaYBancosAlCierre);
  const [typeView, setTypeView] = useState(
    Array.from({ length: 11 }, (_, i) => i),
  );
  const currency = useSelector((state) => state.auth.user.currency);

  // useEffect(() => {
  //   let pSelMonth = [0];
  //   let pFirstSem = [0, 0, 0, 0, 0, 0];
  //   let pSecondSem = [0, 0, 0, 0, 0, 0];
  //   let pFirstTrim = [0, 0, 0];

  //   for (let i = 0; i <= 9; i++) {
  //     for (let j = 0; j <= 11; j++) {
  //       superTotals[i] += totals[i][j];
  //     }
  //   }
  // }, [yearSelected, periodoSelected]);

  useEffect(() => {
    setView(props[0].data);
    setView2(props[1].data);
  }, [props]);

  return (
    <Chart
      options={{
        chart: {
          id: "04",
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        colors: ['#0091FF', '#FF2D00'],
        stroke: {
          width: [3, 3],
          curve: 'straight',
          dashArray: [0, 0, 5],
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0],
          formatter: function (value) {
            return `${currency}${value}`;
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
        yaxis: {
          labels: {
            formatter: function (value) {
              return `${value}`;
            },
          },
        },
      }}
      series={[
        {
          data: view,
          name: 'Variación de caja y bancos',
          type: 'bar',
        },
        {
          data: view2,
          name: 'Caja y bancos al cierre',
          type: 'line',
        },
      ]}
      type="bar"
      height={300}
    />
  );
}

export default GraficoDashFinanc04;
