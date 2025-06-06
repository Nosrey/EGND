/* eslint-disable no-restricted-syntax */
import { FormContainer, FormItem, Input, Tabs, Tooltip } from 'components/ui';
import { MONTHS, OPTIONS_COUNTRY } from 'constants/forms.constants';
import ShortNumberNotation from 'components/shared/shortNumberNotation/ShortNumberNotation';
import { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { resolveResul } from '../../../../services/TotalProductsService';

const { TabContent } = Tabs;

function TableCosto(props) {
  const [infoForm, setInfoForm] = useState(props.data);
  const [visibleItems, setVisibleItems] = useState([0]);
  const [infoProducts, setInfoProducts] = useState([]);
  const [volTotal, setVolTotal] = useState(0);
  const [totalesCanales, setTotalesCanales] = useState([]);
  const [viewTotals, setViewTotals] = useState([]);
  let totals = [];

  const configIncial = () => {
    if (infoForm) {
      Object.keys(infoForm).map((pais, indexPais) => (totals[pais] = {}));

      OPTIONS_COUNTRY.map(
        (o) =>
          infoForm[o.value] &&
          infoForm[o.value].map((i) => (totals[o.value] = {})),
      );

      OPTIONS_COUNTRY.map(
        (o) =>
          infoForm[o.value] &&
          infoForm[o.value].map((i) =>
            i.productos.map((p) => (totals[o.value][p.name] = [])),
          ),
      );
    }
  };

  const moneda = props.currency;

  const hideYear = (index) => {
    setVisibleItems((prevItems) => {
      if (prevItems.includes(index)) {
        // Si el elemento ya está en la lista, lo eliminamos para ocultarlo
        return prevItems.filter((id) => id !== index);
      }
      // Si el elemento no está en la lista, lo agregamos para mostrarlo
      return [...prevItems, index];
    });
  };

  const resolveResulPlane = (vol, precio, div) => {
    let value = 0;
    if (div !== 0) {
      const mult = vol * precio;
      value = (div * mult) / 100;
      value = value.toFixed(1);
    }

    return Math.round(value);
  };

  const resolveTotalYear = (indexPais, indexCanal, indexProd, indexYear) => {
    let totalparcial = 0;

    for (let i = 0; i <= 11; i++) {
      totalparcial +=
        props.volumenData[indexPais].stats[indexCanal].productos[indexProd]
          .años[indexYear].volMeses[MONTHS[i]] *
        props.costoData[indexPais].stats[indexCanal].productos[indexProd].años[
          indexYear
        ].volMeses[MONTHS[i]];
    }

    return totalparcial;
  };

  const resolveTotalYearPercent = (
    indexPais,
    indexCanal,
    indexProd,
    indexYear,
    dividendo,
  ) => {
    let totalparcial = 0;

    for (let i = 0; i <= 11; i++) {
      totalparcial += resolveResulPlane(
        props.volumenData[indexPais].stats[indexCanal].productos[indexProd]
          .años[indexYear].volMeses[MONTHS[i]],
        props.precioData[indexPais].stats[indexCanal].productos[indexProd].años[
          indexYear
        ].volMeses[MONTHS[i]],
        dividendo,
      );
    }

    return totalparcial;
  };

  const calcTotales = () => {
    if (infoProducts.length !== 0 && infoProducts[0]?.sum !== 0) {
      props.precioData.forEach((p, indexInicial) => {
        p.stats.forEach((s, indexStats) => {
          s.productos.forEach((o, indexP) => {
            o.años.forEach((a, indexYear) => {
              MONTHS.forEach((m, indexMonth) => {
                // Inicializamos estructuras si no existen
                if (!totals[p.countryName]) {
                  totals[p.countryName] = {};
                }
                if (!totals[p.countryName][o.name]) {
                  totals[p.countryName][o.name] = [];
                }
                if (!totals[p.countryName][o.name][indexYear]) {
                  totals[p.countryName][o.name][indexYear] = Array(12).fill(0);
                }
  
                // Validamos que los datos de `a.volMeses` y `props` existan
                const volMesesActual = a.volMeses?.[m] ?? 0;
                const volumenDataActual =
                  props.volumenData?.[indexInicial]?.stats?.[indexStats]?.productos?.[indexP]?.años?.[indexYear]?.volMeses?.[m] ?? 0;
                const costoDataActual =
                  props.costoData?.[indexInicial]?.stats?.[indexStats]?.productos?.[indexP];
  
                if (costoDataActual) {
                  totals[p.countryName][o.name][indexYear][indexMonth] +=
                    resolveResul(volMesesActual, volumenDataActual, costoDataActual.comision ?? 0) +
                    resolveResul(volMesesActual, volumenDataActual, costoDataActual.impuesto ?? 0) +
                    resolveResul(volMesesActual, volumenDataActual, costoDataActual.cargos ?? 0) +
                    Math.round(volumenDataActual * volumenDataActual);
                }
              });
            });
          });
        });
      });
      setViewTotals({ ...totals });
    }
  };
  

  useEffect(() => {
    if (infoForm && props.country && infoProducts) {
      const pais = [...infoForm[props.country]];
      const arrayP = [];
      const arrayCanales = [];
      for (let i = 0; i < pais.length; i++) {
        // cada canal
        const canal = pais[i];
        let canalInfo = {
          name: canal.canalName,
          sum: 0,
          id: i,
        };
        for (let x = 0; x < props.productos.length; x++) {
          // cada prod
          const idProd = props.productos[x].uniqueId;
          let myProd = canal.productos.find((prod) => prod.id === idProd);
          let prodChannel = props.volumenData[props.indexCountry].stats[
            canalInfo.id
          ].productos.find((prod) => prod.id === idProd);
          let arrayvalores = [];
          for (let j = 0; j < myProd?.años?.length; j++) {
            // año
            for (let s = 0; s < MONTHS.length; s++) {
              const valor =
                myProd.años[j].volMeses[MONTHS[s]] *
                prodChannel.años[j].volMeses[MONTHS[s]];
              arrayvalores.push(Math.round(valor));
            }
          }
          canalInfo.sum += arrayvalores.reduce(
            (acumulador, valorActual) => acumulador + valorActual,
            0,
          );
          arrayP.push({ ...myProd, sum: arrayvalores });
        }
        arrayCanales.push(canalInfo);

        const agrupados = arrayP.reduce((resultado, objeto) => {
          if (!resultado[objeto.id]) {
            resultado[objeto.id] = [];
          }
          resultado[objeto.id].push(objeto);
          return resultado;
        }, {});

        const arrayProdAgrupados = []; // este es mi array de arrays prod 1 , prod2,etc
        for (let x = 0; x < props.productos.length; x++) {
          arrayProdAgrupados.push(agrupados[props.productos[x].uniqueId]);
        }
        const copy = [...infoProducts];
        let volumenTotal = 0;
        arrayProdAgrupados.map((prod) => {
          let index = copy.findIndex((el) => el.uniqueId === prod[0].id);
          const data = prod;
          const totalSum = data?.reduce(
            (accumulator, currentValue) =>
              currentValue.sum.map(
                (value, index) => value + accumulator[index],
              ),
            Array(data[0].sum.length).fill(0),
          );

          volumenTotal += totalSum.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
          );
          return (copy[index] = { ...copy[index], sum: totalSum });
        });
        setVolTotal(volumenTotal);
        for (let x = 0; x < copy.length; x++) {
          const objetos = [];
          for (let i = 0; i < 10; i++) {
            const numerosDelObjeto = copy[x]?.sum?.slice(i * 12, i * 12 + 12);
            const objeto = { numeros: numerosDelObjeto };
            objetos.push(objeto);
          }
          copy[x].sum = objetos;
        }
        setInfoProducts(() => [...copy]);
      }
      setTotalesCanales(() => [...arrayCanales]);
      configIncial();
      calcTotales();
    }
  }, [infoForm]);

  useEffect(() => {
    if (props.productos) {
      setInfoProducts(() => [...props.productos]);
    }
    if (props.data) setInfoForm(props.data);
    configIncial();
    calcTotales();
  }, [props, infoForm]);

  const formatearNumero = (numero) => {
    if (typeof numero !== 'string') {
      numero = numero.toString();
    }
    const inputNumero = Number(numero.replace(/\D/g, ''));
    const nuevoNum = inputNumero.toLocaleString('es-AR');
    return nuevoNum;
  };

  return (
    <>
      {infoForm &&
        Object.keys(infoForm).map((pais, indexPais) => (
          <TabContent value={pais} className="mb-[20px]" key={pais}>
            <FormContainer>
              {infoForm[pais].map((canal, indexCanal) => (
                <section key={canal.canalName} className="contenedor">
                  <div className="titleChannel">
                    <p className="canal cursor-default">{canal.canalName}</p>
                  </div>
                  <div>
                    <div>
                      {canal.productos.map((producto, indexProd) => (
                        <div
                          className="flex  gap-x-3 gap-y-3  mb-6 "
                          key={producto.id}
                        >
                          <FormItem className=" mb-1 w-[210px] mt-[81px]">
                            <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value={producto.name}
                            />
                            <p className="mt-8 cursor-default">Comisiones</p>
                            <p className="mt-8 cursor-default">Impuestos Comerciales</p>
                            <p className="mt-8 cursor-default">Cargos por pasarela cobro</p>
                          </FormItem>
                          <div className="flex flex-col w-[240px] mt-[138px]">
                            <FormItem className="mb-0 mt-2 w-[90px]">
                              <Input
                                type="text"
                                name="comision"
                                disabled
                                suffix="%"
                                value={formatearNumero(producto.comision)}
                              />
                            </FormItem>

                            <FormItem className="mb-0 mt-4 w-[90px]">
                              <Input
                                type="text"
                                name="impuesto"
                                disabled
                                suffix="%"
                                value={formatearNumero(producto.impuesto)}
                              />
                            </FormItem>

                            <FormItem className="mb-0 mt-2 w-[90px]">
                              <Input
                                type="text"
                                name="cargos"
                                disabled
                                suffix="%"
                                value={formatearNumero(producto.cargos)}
                              />
                            </FormItem>
                          </div>

                          {producto.años.map((año, indexYear) => (
                            <div className="flex flex-col" key={indexYear}>
                              <div className="titleRow min-w-[62px]">
                                <p className='cursor-default'> Año {año.año}</p>
                                <div
                                  className="iconYear"
                                  onClick={() => hideYear(indexYear)}
                                >
                                  {visibleItems.includes(indexYear) ? (
                                    <FiMinus />
                                  ) : (
                                    <FiPlus />
                                  )}
                                </div>
                              </div>
                              <div className="titleMonths gap-x-3 gap-y-3 mb-[18px] flex flex-col">
                                <div className="titleMonths gap-x-3 flex">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <p
                                          key={indexMes}
                                          className="month w-[90px] capitalize cursor-default"
                                        >
                                          {Object.keys(año.volMeses)[indexMes]}
                                        </p>
                                      ),
                                    )}
                                  <p className="month w-[90px] cursor-default">Total</p>
                                </div>
                                <div className="flex gap-x-3 gap-y-3">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0"
                                          key={indexMes}
                                        >
                                          <Tooltip
                                            placement="top-end"
                                            title={moneda + formatearNumero(
                                              props.volumenData[indexPais]
                                                .stats[indexCanal].productos[
                                                indexProd
                                              ].años[indexYear].volMeses[
                                                MONTHS[indexMes]
                                              ] *
                                              props.costoData[indexPais].stats[
                                                indexCanal
                                              ].productos[indexProd].años[
                                                indexYear
                                              ].volMeses[MONTHS[indexMes]])
                                            }
                                          >
                                            <Input
                                              className="w-[90px]"
                                              type="text"
                                              prefix={moneda}
                                              disabled
                                              value={formatearNumero(
                                                props.volumenData[indexPais]
                                                  .stats[indexCanal].productos[
                                                  indexProd
                                                ].años[indexYear].volMeses[
                                                  MONTHS[indexMes]
                                                ] *
                                                  props.costoData[indexPais]
                                                    .stats[indexCanal]
                                                    .productos[indexProd].años[
                                                    indexYear
                                                  ].volMeses[MONTHS[indexMes]],
                                              )}
                                            />
                                          </Tooltip>
                                        </FormItem>
                                      ),
                                    )}
                                  <FormItem className="mb-0">
                                  <Tooltip
                                      placement="top-end"
                                      title={moneda + formatearNumero(
                                        resolveTotalYear(
                                          indexPais,
                                          indexCanal,
                                          indexProd,
                                          indexYear,
                                        ))}
                                    > 
                                      <Input
                                        className="w-[90px]"
                                        type="text"
                                        disabled
                                        prefix={moneda}
                                        value={formatearNumero(
                                          resolveTotalYear(
                                            indexPais,
                                            indexCanal,
                                            indexProd,
                                            indexYear,
                                          ),
                                        )}
                                      />
                                    </Tooltip>
                                  </FormItem>
                                </div>

                                <div className="flex gap-x-3 gap-y-3 mt-2">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0"
                                          key={indexMes}
                                        >
                                          <Tooltip
                                            placement="top-end"
                                            title={moneda + formatearNumero(resolveResul(
                                              props.volumenData[indexPais]
                                                .stats[indexCanal].productos[
                                                indexProd
                                              ].años[indexYear].volMeses[
                                                MONTHS[indexMes]
                                              ],
                                              props.precioData[indexPais].stats[
                                                indexCanal
                                              ].productos[indexProd].años[
                                                indexYear
                                              ].volMeses[MONTHS[indexMes]],
                                              producto.comision,
                                            ))}
                                          >
                                            <Input
                                              className="w-[90px]"
                                              id={`${indexYear}-${MONTHS[indexMes]}-comision`}
                                              type="text"
                                              disabled
                                              prefix={moneda}
                                              value={formatearNumero(
                                                resolveResul(
                                                  props.volumenData[indexPais]
                                                    .stats[indexCanal]
                                                    .productos[indexProd].años[
                                                    indexYear
                                                  ].volMeses[MONTHS[indexMes]],
                                                  props.precioData[indexPais]
                                                    .stats[indexCanal]
                                                    .productos[indexProd].años[
                                                    indexYear
                                                  ].volMeses[MONTHS[indexMes]],
                                                  producto.comision,
                                                ),
                                              )}
                                            />
                                          </Tooltip>
                                        </FormItem>
                                      ),
                                    )}
                                  <FormItem className="mb-0">
                                    <Tooltip
                                      placement="top-end"
                                      title={moneda + formatearNumero(
                                        resolveTotalYearPercent(
                                          indexPais,
                                          indexCanal,
                                          indexProd,
                                          indexYear,
                                          producto.comision,
                                        ))}
                                    > 
                                      <Input
                                        className="w-[90px]"
                                        type="text"
                                        disabled
                                        prefix={moneda}
                                        value={formatearNumero(
                                          resolveTotalYearPercent(
                                            indexPais,
                                            indexCanal,
                                            indexProd,
                                            indexYear,
                                            producto.comision,
                                          ),
                                        )}
                                      />
                                    </Tooltip>
                                  </FormItem>
                                </div>

                                <div className="flex gap-x-3 gap-y-3">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0"
                                          key={indexMes}
                                        >
                                          <Tooltip
                                            placement="top-end"
                                            title={moneda + formatearNumero(resolveResul(
                                              props.volumenData[indexPais]
                                                .stats[indexCanal].productos[
                                                indexProd
                                              ].años[indexYear].volMeses[
                                                MONTHS[indexMes]
                                              ],
                                              props.precioData[indexPais].stats[
                                                indexCanal
                                              ].productos[indexProd].años[
                                                indexYear
                                              ].volMeses[MONTHS[indexMes]],
                                              producto.impuesto,
                                            ))}
                                          >
                                            <Input
                                              className="w-[90px]"
                                              type="text"
                                              disabled
                                              prefix={moneda}
                                              value={formatearNumero(
                                                resolveResul(
                                                  props.volumenData[indexPais]
                                                    .stats[indexCanal]
                                                    .productos[indexProd].años[
                                                    indexYear
                                                  ].volMeses[MONTHS[indexMes]],
                                                  props.precioData[indexPais]
                                                    .stats[indexCanal]
                                                    .productos[indexProd].años[
                                                    indexYear
                                                  ].volMeses[MONTHS[indexMes]],
                                                  producto.impuesto,
                                                ),
                                              )}
                                            />
                                          </Tooltip>
                                        </FormItem>
                                      ),
                                    )}
                                  <FormItem className="mb-0">
                                  <Tooltip
                                      placement="top-end"
                                      title={moneda + formatearNumero(
                                        resolveTotalYearPercent(
                                          indexPais,
                                          indexCanal,
                                          indexProd,
                                          indexYear,
                                          producto.impuesto,
                                        ))}
                                    > 
                                      <Input
                                        className="w-[90px]"
                                        type="number"
                                        disabled
                                        prefix={moneda}
                                        value={formatearNumero(
                                          resolveTotalYearPercent(
                                            indexPais,
                                            indexCanal,
                                            indexProd,
                                            indexYear,
                                            producto.impuesto,
                                          ),
                                        )}
                                      />
                                    </Tooltip>
                                  </FormItem>
                                </div>

                                <div className="flex gap-x-3 gap-y-3">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0"
                                          key={indexMes}
                                        >
                                          <Tooltip
                                            placement="top-end"
                                            title={moneda + formatearNumero(resolveResul(
                                              props.volumenData[indexPais]
                                                .stats[indexCanal].productos[
                                                indexProd
                                              ].años[indexYear].volMeses[
                                                MONTHS[indexMes]
                                              ],
                                              props.precioData[indexPais].stats[
                                                indexCanal
                                              ].productos[indexProd].años[
                                                indexYear
                                              ].volMeses[MONTHS[indexMes]],
                                              producto.cargos,
                                      ))}
                                          >
                                            <Input
                                              className="w-[90px]"
                                              type="text"
                                              id={`${indexYear}-${MONTHS[indexMes]}-cargos`}
                                              disabled
                                              prefix={moneda}
                                              value={formatearNumero(
                                                resolveResul(
                                                  props.volumenData[indexPais]
                                                    .stats[indexCanal]
                                                    .productos[indexProd].años[
                                                    indexYear
                                                  ].volMeses[MONTHS[indexMes]],
                                                  props.precioData[indexPais]
                                                    .stats[indexCanal]
                                                    .productos[indexProd].años[
                                                    indexYear
                                                  ].volMeses[MONTHS[indexMes]],
                                                  producto.cargos,
                                                ),
                                              )}
                                            />
                                          </Tooltip>
                                        </FormItem>
                                      ),
                                    )}
                                  <FormItem className="mb-0">
                                    <Tooltip
                                      placement="top-end"
                                      title={moneda + formatearNumero(
                                        resolveTotalYearPercent(
                                          indexPais,
                                          indexCanal,
                                          indexProd,
                                          indexYear,
                                          producto.cargos,
                                        ))}
                                    >
                                      <Input
                                        className="w-[90px]"
                                        type="text"
                                        disabled
                                        prefix={moneda}
                                        value={formatearNumero(
                                          resolveTotalYearPercent(
                                            indexPais,
                                            indexCanal,
                                            indexProd,
                                            indexYear,
                                            producto.cargos,
                                          ),
                                        )}
                                      />
                                    </Tooltip>
                                  </FormItem>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </FormContainer>
          </TabContent>
        ))}
      {infoProducts && (
        <div className="bg-indigo-50 px-[25px] py-[30px] pb-[40px] w-fit rounded mt-[60px]">
          <div className="flex items-center">
            <p className=" text-[#707470]  cursor-default font-bold mb-3 text-left w-[500px] ">
              Costo por producto
            </p>
          </div>
          <div className="w-fit pt-3 border border-neutral-600 border-x-0 border-b-0">
            {infoProducts &&
              infoProducts.map((prod, index) => (
                <div key={index} className="flex gap-x-3 w-fit pt-3 ">
                  <p
                    className={`w-[437px] cursor-default  pl-[45px] capitalize self-center ${
                      index === 0 ? 'mt-[62px]' : ''
                    }`}
                  >
                    {prod.name}
                  </p>

                  {viewTotals.length !== 0 &&
                    viewTotals[props.country][prod.name].map(
                      (año, indexYear) => (
                        <div className="flex flex-col" key={indexYear}>
                          {index === 0 && (
                            <div
                              className="titleRowR min-w-[62px]"
                              key={indexYear * 1000}
                            >
                              <p className='cursor-default '> Año {indexYear + 1}</p>
                              <div
                                className="iconYear"
                                onClick={() => hideYear(indexYear)}
                              >
                                {visibleItems.includes(indexYear) ? (
                                  <FiMinus />
                                ) : (
                                  <FiPlus />
                                )}
                              </div>
                            </div>
                          )}

                          <div className="titleMonths gap-x-3 flex mb-3">
                            {visibleItems.includes(indexYear) &&
                              año &&
                              index === 0 &&
                              MONTHS.map((mes, indexMes) => (
                                <p
                                  key={indexMes}
                                  className="cursor-default month w-[90px] capitalize"
                                >
                                  {mes}
                                </p>
                              ))}
                            {index === 0 && (
                              <p className="month w-[90px]">Total</p>
                            )}
                            {index !== 0 && <p className="month w-[90px]" />}
                          </div>
                          <div className="flex gap-x-3 gap-y-3">
                            {visibleItems.includes(indexYear) &&
                              año &&
                              MONTHS.map((valor, indexNum) => (
                                <p className="cursor-default w-[90px] text-center">
                                  <Tooltip
                                    placement="top-end"
                                    title={moneda + formatearNumero(
                                      viewTotals[props.country][prod.name][
                                        indexYear
                                      ][indexNum],
                                    )}
                                  >
                                    {moneda}
                                    <ShortNumberNotation numero={viewTotals[props.country][prod.name][
                                        indexYear
                                      ][indexNum]} />
                                  </Tooltip>
                                </p>
                              ))}
                            <p className="cursor-default w-[90px] text-center font-bold">
                              <Tooltip
                                placement="top-end"
                                title={moneda + formatearNumero(
                                  año.reduce(
                                    (total, current) =>
                                      Math.round(total) + Math.round(current),
                                  ),
                                )}
                              >
                                  {moneda}
                                  <ShortNumberNotation numero={año.reduce(
                                    (total, current) =>
                                      Math.round(total) + Math.round(current),
                                  )} />
                              </Tooltip>
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                </div>
              ))}
          </div>

          <br />
          <br />
          <br />
          {totalesCanales.map((canal, i) => (
            <p
              className=" pl-[45px] cursor-default  text-[#707470]  mb-3 text-left w-[500px] "
              key={i}
            >

              <Tooltip placement="top-end" title={formatearNumero(canal.sum)}>
                COSTO CANAL '{canal.name}': &nbsp; {moneda}
                <ShortNumberNotation numero={canal.sum} />
              </Tooltip>
            </p>
          ))}

          <br />
          <p className=" pl-[45px] text-[#707470] font-bold mb-3 text-left w-[500px] ">
            <Tooltip placement="top-end" title={formatearNumero(volTotal)}>
               COSTO TOTAL:  &nbsp; {moneda}
                <ShortNumberNotation numero={volTotal} />
              </Tooltip>
          </p>
        </div>
      )}
    </>
  );
}

export default TableCosto;
