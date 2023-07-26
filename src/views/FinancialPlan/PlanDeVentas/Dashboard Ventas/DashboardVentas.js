import BarraDeProgreso from 'components/shared/dashboard/BarraDeProgreso';
import CardNumerica from 'components/shared/dashboard/CardNumerica';
import GraficoDeBarra from 'components/shared/dashboard/GraficoDeBarra';
import ProgresoCircular from 'components/shared/dashboard/ProgresoCircular';
import ProgresoCircularScroll from 'components/shared/dashboard/ProgresoCircularScroll';
import Total from 'components/shared/dashboard/Total';
import { MenuItem, Select } from 'components/ui';
import { MONTHS } from 'constants/forms.constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'services/Requests';
import { showMultiplicacionPxQ } from 'utils/calcs';
import formatNumber from 'utils/formatTotalsValues';

const año = [
  { value: 'año 1', label: 'Año 1', year: 0 },
  { value: 'año 2', label: 'Año 2', year: 1 },
  { value: 'año 3', label: 'Año 3', year: 2 },
  { value: 'año 4', label: 'Año 4', year: 3 },
  { value: 'año 5', label: 'Año 5', year: 4 },
  { value: 'año 6', label: 'Año 6', year: 5 },
  { value: 'año 7', label: 'Año 7', year: 6 },
  { value: 'año 8', label: 'Año 8', year: 7 },
  { value: 'año 9', label: 'Año 9', year: 8 },
  { value: 'año 10', label: 'Año 10', year: 9 },
  { value: 'todo', label: 'Todo' },
];

const periodo = [
  { value: '1er mes', label: '1er mes', month: 0 },
  { value: '1er trimestre', label: '1er trimestre', month: 4 },
  { value: '1er semestre', label: '1er semestre', month: 6 },
  { value: '2do semestre', label: '2do semestre', month: 12 },
  { value: 'todo el año', label: 'Todo el año' },
];

function DashboardVentas() {
  const currentState = useSelector((state) => state.auth.user);
  const [yearSelected, setYearSelected] = useState({
    value: 'año 1',
    label: 'Año 1',
    year: 0,
  });
  const [periodoSelected, setPeriodoSelected] = useState({
    value: '1er semestre',
    label: '1er semestre',
    month: 6,
  });
  const [dataAssump, setDataAssump] = useState([]);
  const [infoForm, setInfoForm] = useState();
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalServ, setTotalServ] = useState(0);
  const [totalProd, setTotalProd] = useState(0);
  const [volProd, setVolProd] = useState(0);
  const [superTotal, setSuperTotal] = useState(0);
  const [volServ, setVolServ] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalsCacr, setTotalsCacr] = useState();
  const [newClients, setNewClients] = useState(0);

  const selectYear = (event) => {
    setYearSelected(event);
  };

  const selectPeriodo = (event) => {
    setPeriodoSelected(event);
  };

  const calcTotals = () => {
    let tot = 0;
    let totProd = 0;
    let totServ = 0;
    let superTotal = 0;
    if (infoForm) {
      Object.values(infoForm).map((m) => {
        m.map((p) => {
          p.productos.map((o) => {
            o.años.map((a, indexY) => {
              superTotal += Number(a.ventasTotal);
              if (yearSelected.year || yearSelected.year === 0) {
                MONTHS.map((s, indexM) => {
                  if (yearSelected.year === indexY) {
                    if (periodoSelected.month || periodoSelected.month === 0) {
                      if (periodoSelected.month === 0) {
                        if (indexM === 0) {
                          if (o.type === 'producto') {
                            totProd += Number(a.volMeses[MONTHS[indexM]]);
                          } else {
                            totServ += Number(a.volMeses[MONTHS[indexM]]);
                          }
                          tot += Number(a.volMeses[MONTHS[indexM]]);
                        }
                      } else if (periodoSelected.month === 6) {
                        if (indexM < 6) {
                          if (o.type === 'producto') {
                            totProd += Number(a.volMeses[MONTHS[indexM]]);
                          } else {
                            totServ += Number(a.volMeses[MONTHS[indexM]]);
                          }
                          tot += Number(a.volMeses[MONTHS[indexM]]);
                        }
                      } else if (periodoSelected.month === 4) {
                        if (indexM < 4) {
                          if (o.type === 'producto') {
                            totProd += Number(a.volMeses[MONTHS[indexM]]);
                          } else {
                            totServ += Number(a.volMeses[MONTHS[indexM]]);
                          }
                          tot += Number(a.volMeses[MONTHS[indexM]]);
                        }
                      } else if (periodoSelected.month === 12) {
                        if (indexM > 5 && indexM < 12) {
                          if (o.type === 'producto') {
                            totProd += Number(a.volMeses[MONTHS[indexM]]);
                          } else {
                            totServ += Number(a.volMeses[MONTHS[indexM]]);
                          }
                          tot += Number(a.volMeses[MONTHS[indexM]]);
                        }
                      }
                    } else {
                      if (o.type === 'producto') {
                        totProd += Number(a.ventasTotal);
                      } else {
                        totServ += Number(a.ventasTotal);
                      }
                      tot += Number(a.ventasTotal);
                    }
                  }
                });
              } else {
                if (o.type === 'producto') {
                  totProd += Number(a.ventasTotal);
                } else {
                  totServ += Number(a.ventasTotal);
                }
                tot += Number(a.ventasTotal);
              }
            });
          });
        });
      });
      setSuperTotal(superTotal);
      setTotalVentas(tot);
      setTotalProd(totProd);
      setTotalServ(totServ);
    } else {
      selectYear({ value: 'año 1', label: 'Año 1', year: 0 });
      selectPeriodo({
        value: '1er semestre',
        label: '1er semestre',
        month: 6,
      });
    }
  };

  const calcVols = (dataVolumen) => {
    let totV = 0;
    let totS = 0;
    dataVolumen.map((d) => {
      d.stats.map((s) => {
        s.productos.map((p) => {
          p.años.map((a, indexY) => {
            if (yearSelected.year || yearSelected.year === 0) {
              if (yearSelected.year === indexY) {
                if (p.type === 'producto') {
                  totV += Number(a.volTotal);
                } else {
                  totS += Number(a.volTotal);
                }
              }
            } else if (p.type === 'producto') {
              totV += Number(a.volTotal);
            } else {
              totS += Number(a.volTotal);
            }
          });
        });
      });
    });

    setVolProd(totV);
    setVolServ(totS);
  };

  const calcClentes = () => {
    let tot = 0;
    let newC = 0;
    if (infoForm && dataAssump) {
      Object.values(infoForm).map((d) => {
        d.map((i, indexChannel) => {
          i.productos.map((p, indexProd) => {
            p.años.map((a, indexY) => {
              if (yearSelected.year || yearSelected.year === 0) {
                if (yearSelected.year === indexY) {
                  MONTHS.map((o, indexMes) => {
                    if (indexMes === 11) {
                      tot += Math.floor(
                        a.volMeses[MONTHS[indexMes]] /
                          dataAssump.canales[indexChannel].items[indexProd]
                            .volumen,
                      );
                    }
                    newC +=
                      indexMes === 0
                        ? 0
                        : Number(
                            formatNumber(
                              p.años[indexY].volMeses[MONTHS[indexMes]] /
                                dataAssump.canales[indexChannel].items[
                                  indexProd
                                ].volumen -
                                (p.años[indexY].volMeses[MONTHS[indexMes - 1]] /
                                  dataAssump.canales[indexChannel].items[
                                    indexProd
                                  ].volumen -
                                  ((p.años[indexY].volMeses[
                                    MONTHS[indexMes - 1]
                                  ] /
                                    dataAssump.canales[indexChannel].items[
                                      indexProd
                                    ].volumen) *
                                    dataAssump.churns[indexChannel].items[
                                      indexProd
                                    ].porcentajeChurn) /
                                    100),
                            ),
                          );
                  });
                }
              } else {
                MONTHS.map((o, indexMes) => {
                  if (indexMes === 11) {
                    tot +=
                      a.volMeses[MONTHS[indexMes]] /
                      dataAssump.canales[indexChannel].items[indexProd].volumen;
                  }
                  newC +=
                    indexMes === 0
                      ? 0
                      : Number(
                          formatNumber(
                            p.años[indexY].volMeses[MONTHS[indexMes]] /
                              dataAssump.canales[indexChannel].items[indexProd]
                                .volumen -
                              (p.años[indexY].volMeses[MONTHS[indexMes - 1]] /
                                dataAssump.canales[indexChannel].items[
                                  indexProd
                                ].volumen -
                                ((p.años[indexY].volMeses[
                                  MONTHS[indexMes - 1]
                                ] /
                                  dataAssump.canales[indexChannel].items[
                                    indexProd
                                  ].volumen) *
                                  dataAssump.churns[indexChannel].items[
                                    indexProd
                                  ].porcentajeChurn) /
                                  100),
                          ),
                        );
                });
              }
            });
          });
        });
      });
    }
    setTotalClients(tot);
    setNewClients(newC);
  };

  const calcCacr = (dataVolumen) => {
    let tot = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    dataVolumen.map((d) => {
      d.stats.map((s) => {
        s.productos.map((p) => {
          p.años.map((a, indexY) => {
            tot[indexY] += Number(a.volTotal);
          });
        });
      });
    });

    console.log('cacr', tot[4], tot[0], yearSelected);

    setTotalsCacr(tot);
  };

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        if (data.assumptionData[0]) {
          setDataAssump(data.assumptionData[0]);
        }
        if (data?.volumenData.length !== 0 && data?.precioData.length !== 0) {
          const datosPrecargados = {};
          let dataVentas = showMultiplicacionPxQ(
            data?.volumenData.sort((a, b) =>
              a.countryName.localeCompare(b.countryName),
            ),
            data?.precioData.sort((a, b) =>
              a.countryName.localeCompare(b.countryName),
            ),
          );
          for (let i = 0; i < dataVentas.length; i++) {
            datosPrecargados[dataVentas[i].countryName] = dataVentas[i].stats;
          }
          setInfoForm(() => ({ ...datosPrecargados }));
          calcTotals();
          calcVols(data?.volumenData);
          calcCacr(data?.volumenData);
          calcClentes();
        }
      })
      .catch((error) => console.error(error));
  }, [yearSelected, periodoSelected]);

  return (
    <div>
      <div className="border-b-2 mb-8 pb-1">
        <h4>Dashboard de Ventas</h4>
        <span>Plan de Ventas</span>
      </div>
      <div className="border-solid border-2 border-#e5e7eb rounded-lg">
        <div className="px-4 py-5">
          <div className="flex justify-end gap-[20px]">
            <Select
              className="w-[12%]"
              placeholder="Año"
              options={año}
              onChange={selectYear}
            >
              {año.map((a) => (
                <MenuItem key={a.value} value={a.value}>
                  {a.label}
                </MenuItem>
              ))}
            </Select>
            {yearSelected.value !== 'todo' && (
              <Select
                className="w-[12%]"
                placeholder="Periodo"
                options={periodo}
                onChange={selectPeriodo}
              >
                {periodo.map((a) => (
                  <MenuItem key={a.value} value={a.value}>
                    {a.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </div>
          <div className="mt-[30px] mb-[30px]">
            <Total title="Total d e Ventas" data={totalVentas} />
          </div>
          <div className="grid grid-cols-3 gap-[20px] mt-[20px]">
            <CardNumerica
              type="default"
              title="Venta de Productos"
              cantidad={totalProd}
            />
            <CardNumerica
              type="default"
              title="Cantidad de productos"
              cantidad={volProd}
            />
            <CardNumerica
              type="default"
              title="Ticket medio por Producto"
              cantidad={volProd ? totalProd / volProd : 0}
            />
            <CardNumerica
              type="default"
              title="Venta de Servicios"
              cantidad={totalServ}
            />
            <CardNumerica
              type="default"
              title="Volumen de Servicios"
              cantidad={volServ}
            />
            <CardNumerica
              type="default"
              title="Ticket medio por Servicio"
              cantidad={volServ ? totalServ / volServ : 0}
            />
          </div>
          {infoForm && (
            <div className="flex justify-center gap-[50px] mt-[50px] mb-[40px]">
              <div className="w-[50%]">
                {yearSelected.value === 'todo' ? (
                  <h5 className="mb-[30px]">Distribución de Ventas por Año</h5>
                ) : (
                  <h5 className="mb-[30px]">Distribución de Ventas por Mes</h5>
                )}
                <GraficoDeBarra data={infoForm} selected={yearSelected} />
              </div>
              <div className="w-[50%]">
                <h5 className="mb-[30px]">Distribución de Ventas por País</h5>
                <BarraDeProgreso data={infoForm} totalVentas={superTotal} />
              </div>
            </div>
          )}
          {infoForm && (
            <div className="flex justify-center gap-[50px] mb-[40px]">
              {dataAssump.length !== 0 && (
                <ProgresoCircularScroll
                  title="Churn Promedio"
                  churnProducto={dataAssump}
                />
              )}
              {yearSelected.value !== 'año 1' &&
                yearSelected.value !== '' &&
                yearSelected.value !== 'todo' && (
                  <ProgresoCircular
                    title="CAGR"
                    data={(
                      (totalsCacr[yearSelected.year] / totalsCacr[0]) **
                      (1 / (yearSelected.year + 1) - 1)
                    ).toFixed(2)}
                  />
                )}
            </div>
          )}
          <h5 className="mb-[20px]">Clientes</h5>
          <div className="grid grid-cols-3 gap-[20px] mb-[40px]">
            <CardNumerica
              title="Clientes Nuevos"
              type="clear"
              cantidad={newClients}
              data={infoForm}
            />
            <CardNumerica
              type="totalC"
              title="Clientes Totales"
              cantidad={totalClients}
            />
            <CardNumerica
              type="ticket"
              title="Ticket por cliente"
              cantidad={totalVentas / totalClients}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardVentas;
