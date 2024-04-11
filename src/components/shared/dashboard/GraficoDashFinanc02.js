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
// import { COLORS } from '../../../configs/chart.config';
let totals = JSON.parse(JSON.stringify(EMPTY_TOTALES));
let superTotals = JSON.parse(JSON.stringify(BASIC_EMPTY));

function GraficoDashFinanc02({ rdoNeto, growth, yearSelected, periodoSelected }) {
  const [view, setView] = useState(rdoNeto);
  const [view2, setView2] = useState(growth);
  const [typeView, setTypeView] = useState(Array.from({ length: 11 }, (_, i) => i)); // Changed to array of years
  const currency = useSelector((state) => state.auth.user.currency);

  useEffect(() => {
    let pSelMonth = [0];
    let pFirstSem = [0, 0, 0, 0, 0, 0];
    let pSecondSem = [0, 0, 0, 0, 0, 0];
    let pFirstTrim = [0, 0, 0];
    // Object.values(data).map((d) => {
    //   d.map((m) => {
    //     m.productos.map((p) => {
    //       p.años.map((a, indexY) => {
    //         MONTHS.map((u, indexM) => {
    //           if (yearSelected.year || yearSelected.year === 0) {
    //             if (periodoSelected.month || periodoSelected.month === 0) {
    //               if (periodoSelected.month === 0) {
    //                 if (indexM === 0 && yearSelected.year === indexY) {
    //                   pSelMonth[indexM] += Number(a.volMeses[MONTHS[indexM]]);
    //                   setTypeView(oneMonth);
    //                   setView(pSelMonth);
    //                 }
    //               } else if (periodoSelected.month === 4) {
    //                 if (indexM < 4 && yearSelected.year === indexY) {
    //                   pFirstTrim[indexM] += Number(a.volMeses[MONTHS[indexM]]);
    //                   setTypeView(trimn);
    //                   setView(pFirstTrim);
    //                 }
    //               } else if (periodoSelected.month === 6) {
    //                 if (indexM < 6 && yearSelected.year === indexY) {
    //                   pFirstSem[indexM] += Number(a.volMeses[MONTHS[indexM]]);
    //                   setTypeView(firstSem);

    //                   setView(pFirstSem);
    //                 }
    //               } else if (periodoSelected.month === 12) {
    //                 if (
    //                   indexM > 5 &&
    //                   indexM < 12 &&
    //                   yearSelected.year === indexY
    //                 ) {
    //                   pSecondSem[indexM - 6] += Number(
    //                     a.volMeses[MONTHS[indexM]],
    //                   );
    //                   setTypeView(secondSem);
    //                   setView(pSecondSem);
    //                 }
    //               }
    //             }
    //             if (!periodoSelected.month && yearSelected.year) {
    //               totals[indexY][indexM] += Number(a.volMeses[MONTHS[indexM]]);
    //               setView(totals[yearSelected.year]);
    //               setTypeView(month);
    //             }
    //           } else {
    //             setView(superTotals);
    //             setTypeView(year);
    //           }
    //         });
    //       });
    //     });
    //   });
    // });

    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 11; j++) {
        superTotals[i] += totals[i][j];
      }
    }
  }, [yearSelected, periodoSelected]);

  useEffect(() => {
    setView(rdoNeto);
    setView2(growth);
  }, [rdoNeto, growth]);

  return (
    <Chart
      options={{
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
        // aplico enabled solo para el primer dataLabels y luego un segundo dataLabels con enabled: false
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0],
          formatter: function (value) {
            return `${currency}${value}`;
          },
        },
        tooltip: {
          shared: true, // Show data from all series in the tooltip
          intersect: false, // Disable intersect
          y: {
            formatter: function (value, { seriesIndex }) {
              if (seriesIndex === 0) {
                return `${currency}${value}`;
              }
              return `${value}%`;
            }
          }
          
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
              return `${currency}${value}`;
            },
          },
        },
      }}
      series={[
        {
          data: view,
          name: 'Resultado Neto',
          type: 'bar' // This will be a bar chart
        },
        {
          data: view2,
          name: 'Growth',
          type: 'line' // This will be a line chart
        }
      ]}
      type="bar"
      height={300}
    />
  );
}

export default GraficoDashFinanc02;
