import { MONTHS } from 'constants/forms.constants';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { formatNumberGrafics } from 'utils/formatTotalsValues';

function GraficoDeBarraHeadcountTwo({
  typeView,
  dataHeadcount,
  periodoSelected,
  yearSelected,
}) {
  const currency = useSelector((state) => state.auth.user.currency);
  const [dataView, setDataView] = useState([]);

  const calcTotal = (vol, tot) => {
    if (!vol || !tot) return 0;

    return vol * tot;
  };

  useEffect(() => {
    let head = [];
    dataHeadcount.map((d, indexD) => {
      Object.values(d).map((p, indexP) => {
        if (p.visible) {
          let h = {};
          h.name = Object.keys(d)[indexP];
          h.data = [];
          p.puestos.map((m) => {
            m.años.map((a, indexY) => {
              MONTHS.map((n, indexM) => {
                if (yearSelected.year || yearSelected.year === 0) {
                  if (yearSelected.year === indexY) {
                    if (periodoSelected.month || periodoSelected.month === 0) {
                      if (periodoSelected.month === 0) {
                        if (indexM === 0) {
                          if (h.data[indexM] || h.data[indexM] === 0) {
                            h.data[indexM] += calcTotal(
                              a.volMeses[MONTHS[indexM]],
                              m.total,
                            );
                          } else {
                            h.data.push(0);
                            h.data[indexM] += calcTotal(
                              a.volMeses[MONTHS[indexM]],
                              m.total,
                            );
                          }
                        }
                      }
                      if (periodoSelected.month === 4) {
                        if (indexM < 3) {
                          if (h.data[indexM] || h.data[indexM] === 0) {
                            h.data[indexM] += calcTotal(
                              a.volMeses[MONTHS[indexM]],
                              m.total,
                            );
                          } else {
                            h.data.push(0);
                            h.data[indexM] += calcTotal(
                              a.volMeses[MONTHS[indexM]],
                              m.total,
                            );
                          }
                        }
                      }
                      if (periodoSelected.month === 6) {
                        if (indexM < 6) {
                          if (h.data[indexM] || h.data[indexM] === 0) {
                            h.data[indexM] += calcTotal(
                              a.volMeses[MONTHS[indexM]],
                              m.total,
                            );
                          } else {
                            h.data.push(0);
                            h.data[indexM] += calcTotal(
                              a.volMeses[MONTHS[indexM]],
                              m.total,
                            );
                          }
                        }
                      }
                      if (periodoSelected.month === 12) {
                        if (indexM > 5) {
                          if (h.data[indexM - 6] || h.data[indexM - 6] === 0) {
                            h.data[indexM - 6] += calcTotal(
                              a.volMeses[MONTHS[indexM]],
                              m.total,
                            );
                          } else {
                            h.data.push(0);
                            h.data[indexM - 6] += calcTotal(
                              a.volMeses[MONTHS[indexM]],
                              m.total,
                            );
                          }
                        }
                      }
                      if (periodoSelected.month === 24) {
                        if (h.data[indexM] || h.data[indexM] === 0) {
                          h.data[indexM] += calcTotal(
                            a.volMeses[MONTHS[indexM]],
                            m.total,
                          );
                        } else {
                          h.data.push(0);
                          h.data[indexM] += calcTotal(
                            a.volMeses[MONTHS[indexM]],
                            m.total,
                          );
                        }
                      }
                    } else if (h.data[indexM] || h.data[indexM] === 0) {
                      h.data[indexM] += calcTotal(
                        a.volMeses[MONTHS[indexM]],
                        m.total,
                      );
                    } else {
                      h.data.push(0);
                      h.data[indexM] += calcTotal(
                        a.volMeses[MONTHS[indexM]],
                        m.total,
                      );
                    }
                  }
                } else if (h.data[indexY] || h.data[indexY] === 0) {
                  h.data[indexY] += calcTotal(
                    a.volMeses[MONTHS[indexM]],
                    m.total,
                  );
                } else {
                  h.data.push(0);
                  h.data[indexY] += calcTotal(
                    a.volMeses[MONTHS[indexM]],
                    m.total,
                  );
                }
              });
            });
          });
          head.push(h);
        }
      });
    });
    setDataView(head);
  }, [periodoSelected, yearSelected]);

  const formatDataValues = (info) => {
    const data = [...info];
    const sufijos = {
      0: '',
      3: 'K',
      6: 'M',
      9: 'B',
      12: 'T',
      15: 'Qa',
    };
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].data.length; j++) {
        let num;
        if (typeof data[i].data[j] === 'string') {
          num = parseInt(data[i].data[j].replace(/\./g, ''));
        } else {
          num = data[i].data[j];
        }

        let exp = 0;

        while (num >= 1000 && exp < 15) {
          num /= 1000;
          exp += 3;
        }

        const numeroFormateado = exp >= 3 ? num.toFixed(2) : num.toFixed(0);
        data[i].data[j] = `${numeroFormateado} ${sufijos[exp]}`;
      }
    }

    return data;
  };

  return (
    <div>
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
        series={dataView}
        type="bar"
        height={300}
      />
    </div>
  );
}

export default GraficoDeBarraHeadcountTwo;
