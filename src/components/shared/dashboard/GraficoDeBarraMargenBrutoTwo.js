/* eslint-disable no-restricted-globals */
import {
  firstSem,
  month,
  oneMonth,
  secondSem,
  trimn,
  year,
} from 'constants/dashboard.constant';
import { MONTHS } from 'constants/forms.constants';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function GraficoDeBarraMargenBrutoTwo({
  infoForm,
  periodoSelected,
  yearSelected,
  precioData,
  volumenData,
  costoData,
}) {
  const [dataView, setDataView] = useState([]);
  const [typeView, setTypeView] = useState(year);

  const getVentasResult = (
    indexCountry,
    indexCanal,
    indexP,
    indexYear,
    indexMonth,
  ) => {
    const pcio =
      precioData[indexCountry].stats[indexCanal].productos[indexP].años[
        indexYear
      ].volMeses[MONTHS[indexMonth]];
    const vol =
      volumenData[indexCountry].stats[indexCanal].productos[indexP].años[
        indexYear
      ].volMeses[MONTHS[indexMonth]];
    const ventas = pcio * vol;
    return ventas;
  };

  const getMargenBrutoResult = (
    indexCountry,
    indexCanal,
    indexP,
    indexYear,
    indexMonth,
  ) => {
    const vol =
      volumenData[indexCountry].stats[indexCanal].productos[indexP].años[
        indexYear
      ].volMeses[MONTHS[indexMonth]];

    const costo =
      costoData[indexCountry].stats[indexCanal].productos[indexP].años[
        indexYear
      ].volMeses[MONTHS[indexMonth]];
    const comisionPercent =
      costoData[indexCountry].stats[indexCanal].productos[indexP].comision;
    const cargosPercent =
      costoData[indexCountry].stats[indexCanal].productos[indexP].cargos;
    const impuestoPercent =
      costoData[indexCountry].stats[indexCanal].productos[indexP].impuesto;

    const ventas = getVentasResult(
      indexCountry,
      indexCanal,
      indexP,
      indexYear,
      indexMonth,
    );

    const comision = (comisionPercent * ventas) / 100;
    const cargos = (cargosPercent * ventas) / 100;
    const impuesto = (impuestoPercent * ventas) / 100;

    const costoTot = costo * vol + impuesto + comision + cargos;

    const rdo = ventas - costoTot;
    return rdo;
  };

  const calculatePercent = (margenBrunto, ventas) => {
    let percent = (margenBrunto * 100) / ventas;

    if (percent === -Infinity) {
      percent = -100;
    }
    if (percent === Infinity) {
      percent = 100;
    }

    return isNaN(percent) ? 0 : Math.round(percent);
  };
  useEffect(() => {
    Object.values(infoForm).map((d) => {
      d.map((m) => {
        m.productos.map((p) => {
          p.años.map((a, indexY) => {
            MONTHS.map((u, indexM) => {
              if (yearSelected.year || yearSelected.year === 0) {
                if (periodoSelected.month || periodoSelected.month === 0) {
                  if (periodoSelected.month === 0) {
                    if (indexM === 0 && yearSelected.year === indexY) {
                      setTypeView(oneMonth);
                    }
                  } else if (periodoSelected.month === 4) {
                    if (indexM < 4 && yearSelected.year === indexY) {
                      setTypeView(trimn);
                    }
                  } else if (periodoSelected.month === 6) {
                    if (indexM < 6 && yearSelected.year === indexY) {
                      setTypeView(firstSem);
                    }
                  } else if (periodoSelected.month === 12) {
                    if (indexM > 5 && yearSelected.year === indexY) {
                      setTypeView(secondSem);
                    }
                  } else if (periodoSelected.month === 24) {
                    if (yearSelected.year === indexY) {
                      setTypeView(month);
                    }
                  }
                }

                if (!periodoSelected.month) {
                  setTypeView(month);
                }
              } else {
                setTypeView(year);
              }
            });
          });
        });
      });
    });
  }, [yearSelected, periodoSelected]);

  useEffect(() => {
    let head = [];
    let margenBruto = [];
    let ventas = [];
    Object.keys(infoForm).map((pais, indexCountry) => {
      infoForm[pais].map((canal, indexCanal) => {
        canal.productos.map((producto, indexP) => {
          producto.años.map((a, indexY) => {
            MONTHS.map((n, indexM) => {
              if (yearSelected.year || yearSelected.year === 0) {
                if (yearSelected.year === indexY) {
                  if (periodoSelected.month || periodoSelected.month === 0) {
                    if (periodoSelected.month === 0) {
                      if (indexM === 0) {
                        if (head[indexM] || head[indexM] === 0) {
                          ventas[indexM] += getVentasResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );
                          margenBruto[indexM] += getMargenBrutoResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );

                          head[indexM] = calculatePercent(
                            margenBruto[indexM],
                            ventas[indexM],
                          );
                        } else {
                          head.push(0);
                          margenBruto.push(0);
                          ventas.push(0);
                          ventas[indexM] += getVentasResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );
                          margenBruto[indexM] += getMargenBrutoResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );

                          head[indexM] = calculatePercent(
                            margenBruto[indexM],
                            ventas[indexM],
                          );
                        }
                      }
                    }
                    if (periodoSelected.month === 4) {
                      if (indexM < 3) {
                        if (head[indexM] || head[indexM] === 0) {
                          ventas[indexM] += getVentasResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );
                          margenBruto[indexM] += getMargenBrutoResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );

                          head[indexM] = calculatePercent(
                            margenBruto[indexM],
                            ventas[indexM],
                          );
                        } else {
                          head.push(0);
                          margenBruto.push(0);
                          ventas.push(0);
                          ventas[indexM] += getVentasResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );
                          margenBruto[indexM] += getMargenBrutoResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );

                          head[indexM] = calculatePercent(
                            margenBruto[indexM],
                            ventas[indexM],
                          );
                        }
                      }
                    }
                    if (periodoSelected.month === 6) {
                      if (indexM < 6) {
                        if (head[indexM] || head[indexM] === 0) {
                          ventas[indexM] += getVentasResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );
                          margenBruto[indexM] += getMargenBrutoResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );

                          head[indexM] = calculatePercent(
                            margenBruto[indexM],
                            ventas[indexM],
                          );
                        } else {
                          head.push(0);
                          margenBruto.push(0);
                          ventas.push(0);
                          ventas[indexM] += getVentasResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );
                          margenBruto[indexM] += getMargenBrutoResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );

                          head[indexM] = calculatePercent(
                            margenBruto[indexM],
                            ventas[indexM],
                          );
                        }
                      }
                    }
                    if (periodoSelected.month === 12) {
                      if (indexM > 5) {
                        if (head[indexM - 6] || head[indexM - 6] === 0) {
                          ventas[indexM - 6] += getVentasResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );
                          margenBruto[indexM - 6] += getMargenBrutoResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );

                          head[indexM - 6] = calculatePercent(
                            margenBruto[indexM - 6],
                            ventas[indexM - 6],
                          );
                        } else {
                          head.push(0);
                          margenBruto.push(0);
                          ventas.push(0);
                          ventas[indexM - 6] += getVentasResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );
                          margenBruto[indexM - 6] += getMargenBrutoResult(
                            indexCountry,
                            indexCanal,
                            indexP,
                            indexY,
                            indexM,
                          );

                          head[indexM - 6] = calculatePercent(
                            margenBruto[indexM - 6],
                            ventas[indexM - 6],
                          );
                        }
                      }
                    }

                    if (periodoSelected.month === 24) {
                      if (head[indexM] || head[indexM] === 0) {
                        ventas[indexM] += getVentasResult(
                          indexCountry,
                          indexCanal,
                          indexP,
                          indexY,
                          indexM,
                        );
                        margenBruto[indexM] += getMargenBrutoResult(
                          indexCountry,
                          indexCanal,
                          indexP,
                          indexY,
                          indexM,
                        );

                        head[indexM] = calculatePercent(
                          margenBruto[indexM],
                          ventas[indexM],
                        );
                      } else {
                        head.push(0);
                        margenBruto.push(0);
                        ventas.push(0);
                        ventas[indexM] += getVentasResult(
                          indexCountry,
                          indexCanal,
                          indexP,
                          indexY,
                          indexM,
                        );
                        margenBruto[indexM] += getMargenBrutoResult(
                          indexCountry,
                          indexCanal,
                          indexP,
                          indexY,
                          indexM,
                        );

                        head[indexM] = calculatePercent(
                          margenBruto[indexM],
                          ventas[indexM],
                        );
                      }
                    }
                  } else if (head[indexM] || head[indexM] === 0) {
                    ventas[indexM] += getVentasResult(
                      indexCountry,
                      indexCanal,
                      indexP,
                      indexY,
                      indexM,
                    );
                    margenBruto[indexM] += getMargenBrutoResult(
                      indexCountry,
                      indexCanal,
                      indexP,
                      indexY,
                      indexM,
                    );

                    head[indexM] = calculatePercent(
                      margenBruto[indexM],
                      ventas[indexM],
                    );
                  } else {
                    head.push(0);
                    margenBruto.push(0);
                    ventas.push(0);
                    ventas[indexM] += getVentasResult(
                      indexCountry,
                      indexCanal,
                      indexP,
                      indexY,
                      indexM,
                    );
                    margenBruto[indexM] += getMargenBrutoResult(
                      indexCountry,
                      indexCanal,
                      indexP,
                      indexY,
                      indexM,
                    );

                    head[indexM] = calculatePercent(
                      margenBruto[indexM],
                      ventas[indexM],
                    );
                  }
                }
              } else if (head[indexY] || head[indexY] === 0) {
                ventas[indexY] += getVentasResult(
                  indexCountry,
                  indexCanal,
                  indexP,
                  indexY,
                  indexM,
                );
                margenBruto[indexY] += getMargenBrutoResult(
                  indexCountry,
                  indexCanal,
                  indexP,
                  indexY,
                  indexM,
                );

                head[indexY] =
                  calculatePercent(margenBruto[indexY], ventas[indexY]) / 12;
              } else {
                head.push(0);
                margenBruto.push(0);
                ventas.push(0);
                ventas[indexY] += getVentasResult(
                  indexCountry,
                  indexCanal,
                  indexP,
                  indexY,
                  indexM,
                );
                margenBruto[indexY] += getMargenBrutoResult(
                  indexCountry,
                  indexCanal,
                  indexP,
                  indexY,
                  indexM,
                );

                head[indexY] =
                  calculatePercent(margenBruto[indexY], ventas[indexY]) / 12;
              }
            });
          });
        });
      });
    });

    setDataView(head);
  }, [yearSelected, periodoSelected]);

  const data = [
    {
      name: 'Revenue promedio',
      data: dataView,
    },
  ];
  return (
    <Chart
      options={{
        chart: {
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 3,
        },
        yaxis: {
          labels: {
            formatter(value) {
              return `%${value.toFixed(2)}`;
            },
          },
        },
        colors: ['#10B981'],
        xaxis: {
          categories: typeView,
        },
      }}
      series={data}
      height={300}
    />
  );
}

export default GraficoDeBarraMargenBrutoTwo;
