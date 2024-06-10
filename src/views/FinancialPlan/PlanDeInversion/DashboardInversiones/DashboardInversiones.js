/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import BarraDeProgreso from 'components/shared/dashboard/BarraDeProgreso';
import GraficoDeBarra from 'components/shared/dashboard/GraficoDeBarra';
import Total from 'components/shared/dashboard/Total';
import { MenuItem, Select } from 'components/ui';
import GraficoDashed from 'components/shared/dashboard/GraficoDashed';
import MySpinner from 'components/shared/loaders/MySpinner';
import { AÑOS, MONTHS } from 'constants/forms.constants';
import { getUser } from 'services/Requests';
import { useSelector } from 'react-redux';
import {
  año,
  firstSem,
  month,
  oneMonth,
  periodo,
  secondSem,
  trimn,
  year,
} from 'constants/dashboard.constant';
import GraficoCapex01 from 'components/shared/dashboard/GraficoCapex01';

function DashboardInversiones(props) {
  const [showLoader, setShowLoader] = useState(true);
  const currentState = useSelector((state) => state.auth.user);
  const [capexP, setCapexP] = useState();
  const [capexQ, setCapexQ] = useState();
  const [typeView, setTypeView] = useState();
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
  const [totals, setTotals] = useState();
  const [total, setTotal] = useState(0);
  const [dataDashed, setDataDashed] = useState();

  const selectYear = (event) => {
    setYearSelected(event);
  };

  const selectPeriodo = (event) => {
    setPeriodoSelected(event);
  };

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        if (
          data?.capexPData.length !== 0 &&
          data?.capexPData[0]?.length !== 0
        ) {
          setCapexP(data?.capexPData[0]?.capexP);
        }
        if (
          data?.capexPData.length !== 0 &&
          data?.capexQData[0]?.length !== 0
        ) {
          setCapexQ(data?.capexQData[0]?.capexQ);
        }
        setShowLoader(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let tot = [];
    let total = 0;
    let bienes = [];
    let bienesValues = [];
    let data = [];

    if (capexP && capexQ) {
      capexP.map((c, indexC) => {
        if (!bienes.includes[c.bien]) {
          bienes.push(c.bien);
          bienesValues.push({ [c.bien]: [] });
        }
        c.años.map((a, indexY) => {
          if (yearSelected.year || yearSelected.year === 0) {
            MONTHS.map((s, indexM) => {
              if (yearSelected.year === indexY) {
                if (periodoSelected.month || periodoSelected.month === 0) {
                  if (periodoSelected.month === 0) {
                    if (indexM === 0) {
                      if (tot[indexM] || tot[indexM] === 0) {
                        tot[indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      } else {
                        tot.push(0);
                        tot[indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      }
                      if (
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ||
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ===
                          0
                      ) {
                        bienesValues[bienes.indexOf(c.bien)][c.bien] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      } else {
                        bienesValues[bienes.indexOf(c.bien)][c.bien].push(0);
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      }
                      total +=
                        a.volMeses[MONTHS[indexM]] *
                        capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      setTypeView(oneMonth);
                    }
                  } else if (periodoSelected.month === 6) {
                    if (indexM < 6) {
                      if (tot[indexM] || tot[indexM] === 0) {
                        tot[indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      } else {
                        tot.push(0);
                        tot[indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      }

                      if (
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ||
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ===
                          0
                      ) {
                        bienesValues[bienes.indexOf(c.bien)][c.bien] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      } else {
                        bienesValues[bienes.indexOf(c.bien)][c.bien].push(0);
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      }

                      total +=
                        a.volMeses[MONTHS[indexM]] *
                        capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      setTypeView(oneMonth);
                    }
                    setTypeView(firstSem);
                  } else if (periodoSelected.month === 4) {
                    if (indexM < 3) {
                      if (tot[indexM] || tot[indexM] === 0) {
                        tot[indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      } else {
                        tot.push(0);
                        tot[indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      }

                      if (
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ||
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ===
                          0
                      ) {
                        bienesValues[bienes.indexOf(c.bien)][c.bien] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      } else {
                        bienesValues[bienes.indexOf(c.bien)][c.bien].push(0);
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      }
                      total +=
                        a.volMeses[MONTHS[indexM]] *
                        capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];

                      setTypeView(oneMonth);
                    }
                    setTypeView(trimn);
                  } else if (periodoSelected.month === 12) {
                    if (indexM > 5) {
                      if (tot[indexM - 6] || tot[indexM - 6] === 0) {
                        tot[indexM - 6] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      } else {
                        tot.push(0);
                        tot[indexM - 6] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      }

                      if (
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ||
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ===
                          0
                      ) {
                        bienesValues[bienes.indexOf(c.bien)][c.bien] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      } else {
                        bienesValues[bienes.indexOf(c.bien)][c.bien].push(0);
                        bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] +=
                          a.volMeses[MONTHS[indexM]] *
                          capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                      }
                      total +=
                        a.volMeses[MONTHS[indexM]] *
                        capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];

                      setTypeView(oneMonth);
                    }
                    setTypeView(secondSem);
                  } else if (periodoSelected.month === 24) {
                    if (tot[indexM] || tot[indexM] === 0) {
                      tot[indexM] +=
                        a.volMeses[MONTHS[indexM]] *
                        capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                    } else {
                      tot.push(0);
                      tot[indexM] +=
                        a.volMeses[MONTHS[indexM]] *
                        capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                    }
                    total +=
                      a.volMeses[MONTHS[indexM]] *
                      capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                    if (
                      bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] ||
                      bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] === 0
                    ) {
                      bienesValues[bienes.indexOf(c.bien)][c.bien] +=
                        a.volMeses[MONTHS[indexM]] *
                        capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                    } else {
                      bienesValues[bienes.indexOf(c.bien)][c.bien].push(0);
                      bienesValues[bienes.indexOf(c.bien)][c.bien][indexM] +=
                        a.volMeses[MONTHS[indexM]] *
                        capexQ[indexC].años[indexY].volMeses[MONTHS[indexM]];
                    }

                    setTypeView(oneMonth);
                    setTypeView(month);
                  }
                }
              }
            });
          } else if (!yearSelected.year) {
            if (tot[indexY] || tot[indexY] === 0) {
              for (let i = 0; i < 12; i++) {
                tot[indexY] +=
                  a.volMeses[MONTHS[i]] *
                  capexQ[indexC].años[indexY].volMeses[MONTHS[i]];
                total +=
                  a.volMeses[MONTHS[i]] *
                  capexQ[indexC].años[indexY].volMeses[MONTHS[i]];

                if (
                  bienesValues[bienes.indexOf(c.bien)][c.bien][indexY] ||
                  bienesValues[bienes.indexOf(c.bien)][c.bien][indexY] === 0
                ) {
                  bienesValues[bienes.indexOf(c.bien)][c.bien][indexY] +=
                    a.volMeses[MONTHS[i]] *
                    capexQ[indexC].años[indexY].volMeses[MONTHS[i]];
                } else {
                  bienesValues[bienes.indexOf(c.bien)][c.bien].push(0);
                  bienesValues[bienes.indexOf(c.bien)][c.bien][indexY] +=
                    a.volMeses[MONTHS[i]] *
                    capexQ[indexC].años[indexY].volMeses[MONTHS[i]];
                }
                setTypeView(oneMonth);
              }
            } else {
              tot.push(0);
              for (let i = 0; i < 12; i++) {
                tot[indexY] +=
                  a.volMeses[MONTHS[i]] *
                  capexQ[indexC].años[indexY].volMeses[MONTHS[i]];
                total +=
                  a.volMeses[MONTHS[i]] *
                  capexQ[indexC].años[indexY].volMeses[MONTHS[i]];
                if (
                  bienesValues[bienes.indexOf(c.bien)][c.bien][indexY] ||
                  bienesValues[bienes.indexOf(c.bien)][c.bien][indexY] === 0
                ) {
                  bienesValues[bienes.indexOf(c.bien)][c.bien][indexY] +=
                    a.volMeses[MONTHS[i]] *
                    capexQ[indexC].años[indexY].volMeses[MONTHS[i]];
                } else {
                  bienesValues[bienes.indexOf(c.bien)][c.bien].push(0);
                  bienesValues[bienes.indexOf(c.bien)][c.bien][indexY] +=
                    a.volMeses[MONTHS[i]] *
                    capexQ[indexC].años[indexY].volMeses[MONTHS[i]];
                }
              }
            }
            setTypeView(year);
          }
        });
      });

      bienes.map((b) => {
        data.push({ name: b, data: bienesValues[bienes.indexOf(b)][b] });
      });

      setDataDashed(data);
      setTotal(total);
      setTotals(tot);
    }
  }, [capexP, capexQ, periodoSelected, yearSelected]);

  return (
    <>
      {showLoader ? (
        <MySpinner />
      ) : (
        <>
          <div>
            <div className="border-b-2 mb-8 pb-1">
              <h4 className="cursor-default">Dashboard de CAPEX</h4>
              <span className="cursor-default">Inversiones</span>
            </div>
            <div className="border-solid border-2 border-#e5e7eb rounded-lg">
              <div className="px-4 py-5">
                <div className="flex justify-end gap-[20px]">
                  <Select
                    className="w-[12%] min-w-[115px]"
                    placeholder="Año"
                    onChange={selectYear}
                    options={año}
                    value={yearSelected}
                  />

                  {yearSelected.value !== 'todo' && (
                    <Select
                      className="w-[12%] min-w-[115px]"
                      placeholder="Periodo"
                      options={periodo}
                      onChange={selectPeriodo}
                      value={periodoSelected}
                    >
                      {periodo.map((a) => (
                        <MenuItem key={a.value} value={a.value}>
                          {a.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </div>
                <div className="mt-[30px] mb-[30px] cursor-default">
                  <Total title="CAPEX total" data={total} />
                </div>

                <div className=" mt-[40px]">
                  <h5>{`Distribución de CAPEX por ${
                    typeView !== year ? 'mes' : 'año'
                  }`}</h5>

                  {totals && totals.length > 0 && (
                    <GraficoCapex01 data={totals} typeView={typeView} />
                  )}
                </div>

                {dataDashed && dataDashed.length > 0 && (
                  <div className=" mt-[40px]">
                    <h5>Evolución de CAPEX por rubro</h5>
                    <GraficoDashed data={dataDashed} typeView={typeView} />
                  </div>
                )}

                {/* <div className="mt-[40px]">
                  <h5>CAPEX por país</h5>
                  <BarraDeProgreso
                    data={{ brasil: [] }}
                    totalVentas={12}
                    selectYear="año 1"
                    periodoSelected="1er mes"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DashboardInversiones;
