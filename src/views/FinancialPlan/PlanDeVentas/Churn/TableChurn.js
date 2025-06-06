/* eslint-disable no-restricted-syntax */
import { FormContainer, FormItem, Input, Tabs, Tooltip } from 'components/ui';
import { MONTHS } from 'constants/forms.constants';
import { useState, useEffect } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import formatNumber from 'utils/formatTotalsValues';

const { TabContent } = Tabs;

function TableChurn(props) {
  const [infoForm, setInfoForm] = useState(props.data);
  const [visibleItems, setVisibleItems] = useState([0]);
  const [valoresInicio, setValoresInicio] = useState([]);

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

  const formatearNumero = (numero) => {
    const nuevoNum = numero.toLocaleString('es-AR');
    return nuevoNum;
  };

  const getValueMes = (indexPais, indexCanal, indexProd, indexYear, indexMes) =>
    props.volumenData[indexPais].stats[indexCanal].productos[indexProd].años[
      indexYear
    ].volMeses[MONTHS[indexMes]];

  const getClientes = (
    indexPais,
    indexCanal,
    indexProd,
    indexYear,
    indexMes,
  ) => {
    const vtasXCliente =
      props.assumptionData[0].canales[indexCanal].items[indexProd].volumen;
    const rdo =
      getValueMes(indexPais, indexCanal, indexProd, indexYear, indexMes) /
      vtasXCliente;
    return rdo;
  };

  const getChurn = (indexPais, indexCanal, indexProd, indexYear, indexMes) => {
    let rdo;
    if (indexMes === 0 && indexYear === 0) {
      rdo = '';
    } else {
      const churn =
        props.assumptionData[0].churns[indexCanal].items[indexProd]
          .porcentajeChurn;
      const vtasXCliente =
        props.assumptionData[0].canales[indexCanal].items[indexProd].volumen;
      const volMesPasado =
        indexMes === 0 && indexYear !== 0
          ? getValueMes(
              indexPais,
              indexCanal,
              indexProd,
              Number(indexYear) - 1,
              11,
            )
          : getValueMes(
              indexPais,
              indexCanal,
              indexProd,
              indexYear,
              Number(indexMes) - 1,
            );

      rdo = ((volMesPasado / vtasXCliente) * churn) / 100;
    }

    return rdo;
  };

  const inicio = (indexPais, indexCanal, indexProd) => {
    const volEsteMes = getValueMes(indexPais, indexCanal, indexProd, 0, 0);
    const volXCliente =
      props.assumptionData[0].canales[indexCanal].items[indexProd].volumen;

    const myArrayResultado = [];

    for (let i = 0; i < 10; i++) {
      const subarray = [];
      for (let j = 0; j <= 11; j++) {
        if (i === 0 && j === 0) {
          subarray.push(volEsteMes / volXCliente);
        } else {
          const lastIndex = subarray.length - 1;
          const lastValue = subarray[lastIndex];

          let nuevoValor =
            lastValue +
            getAltas(indexPais, indexCanal, indexProd, i, j - 1) -
            getBajas(indexPais, indexCanal, indexProd, i, j - 1);

          if (Number.isNaN(nuevoValor)) {
            nuevoValor =
              myArrayResultado[i - 1][11] +
              getAltas(
                indexPais,
                indexCanal,
                indexProd,
                i,
                j === 0 ? j : j - 1,
              ) -
              getBajas(
                indexPais,
                indexCanal,
                indexProd,
                i,
                j === 0 ? j : j - 1,
              );
          }
          subarray.push(nuevoValor);
        }
      }
      myArrayResultado.push(subarray);
    }
    return myArrayResultado;
  };
  const getAltas = (indexPais, indexCanal, indexProd, indexYear, indexMes) => {
    const volMesPasado =
      indexMes === 0 && indexYear !== 0
        ? getValueMes(
            indexPais,
            indexCanal,
            indexProd,
            Number(indexYear) - 1,
            11,
          )
        : getValueMes(
            indexPais,
            indexCanal,
            indexProd,
            indexYear,
            Number(indexMes) - 1,
          );
    const volEsteMes = getValueMes(
      indexPais,
      indexCanal,
      indexProd,
      indexYear,
      indexMes,
    );
    const volXCliente =
      props.assumptionData[0].canales[indexCanal].items[indexProd].volumen;

    const clientesMesPasado = volMesPasado / volXCliente;
    const clientesEsteMes = volEsteMes / volXCliente;

    const churnTeorico =
      props.assumptionData[0].churns[indexCanal].items[indexProd]
        .porcentajeChurn;

    let rdo;
    if (indexMes === 0 && indexYear === 0) {
      rdo = '';
    } else {
      rdo =
        clientesEsteMes - clientesMesPasado >= 0
          ? clientesEsteMes -
            clientesMesPasado +
            ((volMesPasado / volXCliente) * churnTeorico) / 100
          : 0;
    }

    return rdo;
  };

  const getBajas = (indexPais, indexCanal, indexProd, indexYear, indexMes) => {
    const volMesPasado =
      indexMes === 0 && indexYear !== 0
        ? getValueMes(
            indexPais,
            indexCanal,
            indexProd,
            Number(indexYear) - 1,
            11,
          )
        : getValueMes(
            indexPais,
            indexCanal,
            indexProd,
            indexYear,
            Number(indexMes) - 1,
          );
    const volEsteMes = getValueMes(
      indexPais,
      indexCanal,
      indexProd,
      indexYear,
      indexMes,
    );
    const volXCliente =
      props.assumptionData[0].canales[indexCanal].items[indexProd].volumen;

    const clientesMesPasado = volMesPasado / volXCliente;
    const clientesEsteMes = volEsteMes / volXCliente;

    const churnTeorico =
      props.assumptionData[0].churns[indexCanal].items[indexProd]
        .porcentajeChurn;

    let rdo;
    if (indexMes === 0 && indexYear === 0) {
      rdo = '';
    } else {
      rdo =
        clientesEsteMes - clientesMesPasado >= 0
          ? ((volMesPasado / volXCliente) * churnTeorico) / 100
          : clientesMesPasado - clientesEsteMes;
    }

    return rdo;
  };

  useEffect(() => {
    if (infoForm) {
      const copy = JSON.parse(JSON.stringify(infoForm));
      // Obtener las claves (paises) del objeto
      const paises = Object.keys(copy);
      // Iterar sobre las claves (paises)
      paises.forEach((pais, indexPais) => {
        // Iterar sobre los elementos del array de cada pais
        copy[pais].forEach((canal, indexCanal) => {
          // Modificar la propiedad 'productos'
          canal.productos.forEach((prod, indexProd) => {
            prod.valoresInicioChurn = inicio(indexPais, indexCanal, indexProd);
          });
        });
      });
      setValoresInicio(copy);
    }
  }, [infoForm]);

  return (
    <>
      {infoForm &&
        valoresInicio.length !== 0 &&
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
                          <FormItem className=" mb-1 w-[210px] mt-[81px] cursor-default">
                            <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value={producto.name}
                            />
                            <p className="mt-20">Clientes</p>
                            <p className="mt-8">Churn numero</p>
                            <p className="mt-8 font-bold">Inicio</p>
                            <p className="mt-8 font-bold">Altas</p>
                            <p className="mt-8 font-bold">Bajas</p>
                            <p className="mt-8 font-bold">Final</p>
                          </FormItem>

                          {producto.años.map((año, indexYear) => (
                            <div className="flex flex-col" key={indexYear}>
                              <div className="titleRow min-w-[62px] ">
                                <p className="cursor-default"> Año {año.año}</p>
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
                                            title={formatearNumero(
                                              getValueMes(
                                                indexPais,
                                                indexCanal,
                                                indexProd,
                                                indexYear,
                                                indexMes,
                                              ),
                                            )}
                                          >
                                            <Input
                                              className="w-[90px]"
                                              type="text"
                                              disabled
                                              value={formatearNumero(
                                                getValueMes(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                              name="month"
                                            />
                                          </Tooltip>
                                        </FormItem>
                                      ),
                                    )}
                                </div>

                                <div className="flex gap-x-3 gap-y-3 mt-12">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0"
                                          key={indexMes}
                                        >
                                          {getClientes(
                                            indexPais,
                                            indexCanal,
                                            indexProd,
                                            indexYear,
                                            indexMes,
                                          ).toString().length > 7 ? (
                                            <Tooltip
                                              placement="top-end"
                                              title={formatNumber(
                                                getClientes(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                            >
                                              <Input
                                                className="w-[90px]"
                                                type="text"
                                                disabled
                                                value={formatNumber(
                                                  getClientes(
                                                    indexPais,
                                                    indexCanal,
                                                    indexProd,
                                                    indexYear,
                                                    indexMes,
                                                  ),
                                                )}
                                              />
                                            </Tooltip>
                                          ) : (
                                            <Input
                                              className="w-[90px]"
                                              type="text"
                                              disabled
                                              value={formatNumber(
                                                getClientes(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                            />
                                          )}
                                        </FormItem>
                                      ),
                                    )}
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
                                          {getChurn(
                                            indexPais,
                                            indexCanal,
                                            indexProd,
                                            indexYear,
                                            indexMes,
                                          ).toString().length > 7 ? (
                                            <Tooltip
                                              placement="top-end"
                                              title={formatNumber(
                                                getChurn(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                            >
                                              <Input
                                                className="w-[90px]"
                                                type="text"
                                                disabled
                                                value={formatNumber(
                                                  getChurn(
                                                    indexPais,
                                                    indexCanal,
                                                    indexProd,
                                                    indexYear,
                                                    indexMes,
                                                  ),
                                                )}
                                                name="month"
                                              />
                                            </Tooltip>
                                          ) : (
                                            <Input
                                              className="w-[90px]"
                                              type="text"
                                              disabled
                                              value={formatNumber(
                                                getChurn(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                              name="month"
                                            />
                                          )}
                                        </FormItem>
                                      ),
                                    )}
                                </div>
                                {/* INICIO  */}
                                <div className="flex gap-x-3 gap-y-3">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0"
                                          key={indexMes}
                                        >
                                          {formatNumber(
                                            valoresInicio &&
                                              valoresInicio[
                                                Object.keys(infoForm)[indexPais]
                                              ][indexCanal].productos[indexProd]
                                                .valoresInicioChurn[indexYear][
                                                indexMes
                                              ],
                                          ).length > 7 ? (
                                            <Tooltip
                                              placement="top-end"
                                              title={formatNumber(
                                                inicio(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                            >
                                              <Input
                                                className="w-[90px] border-2 border-solid border-gray-800"
                                                type="text"
                                                disabled
                                                value={formatNumber(
                                                  valoresInicio &&
                                                    valoresInicio[
                                                      Object.keys(infoForm)[
                                                        indexPais
                                                      ]
                                                    ][indexCanal].productos[
                                                      indexProd
                                                    ].valoresInicioChurn[
                                                      indexYear
                                                    ][indexMes],
                                                )}
                                                name="month"
                                              />
                                            </Tooltip>
                                          ) : (
                                            <Input
                                              className="w-[90px] border-2 border-solid border-gray-800"
                                              type="text"
                                              disabled
                                              value={formatNumber(
                                                valoresInicio &&
                                                  valoresInicio[
                                                    Object.keys(infoForm)[
                                                      indexPais
                                                    ]
                                                  ][indexCanal].productos[
                                                    indexProd
                                                  ].valoresInicioChurn[
                                                    indexYear
                                                  ][indexMes],
                                              )}
                                              name="month"
                                            />
                                          )}
                                        </FormItem>
                                      ),
                                    )}
                                </div>
                                {/*  ALTAS */}
                                <div className="flex gap-x-3 gap-y-3 ">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0 "
                                          key={indexMes}
                                        >
                                          {formatNumber(
                                            getAltas(
                                              indexPais,
                                              indexCanal,
                                              indexProd,
                                              indexYear,
                                              indexMes,
                                            ),
                                          ).length > 7 ? (
                                            <Tooltip
                                              placement="top-end"
                                              title={formatNumber(
                                                getAltas(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                            >
                                              <Input
                                                className="w-[90px] border-2 border-solid border-grey-800"
                                                type="text"
                                                disabled
                                                value={formatNumber(
                                                  getAltas(
                                                    indexPais,
                                                    indexCanal,
                                                    indexProd,
                                                    indexYear,
                                                    indexMes,
                                                  ),
                                                )}
                                                name="month"
                                              />
                                            </Tooltip>
                                          ) : (
                                            <Input
                                              className="w-[90px] border-2 border-solid border-gray-800"
                                              type="text"
                                              disabled
                                              value={formatNumber(
                                                getAltas(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                              name="month"
                                            />
                                          )}
                                        </FormItem>
                                      ),
                                    )}
                                </div>
                                {/* BAJAS */}
                                <div className="flex gap-x-3 gap-y-3">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0"
                                          key={indexMes}
                                        >
                                          {formatNumber(
                                            getBajas(
                                              indexPais,
                                              indexCanal,
                                              indexProd,
                                              indexYear,
                                              indexMes,
                                            ),
                                          ).length > 7 ? (
                                            <Tooltip
                                              placement="top-end"
                                              title={formatNumber(
                                                getBajas(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                            >
                                              <Input
                                                className="w-[90px] border-2 border-solid border-gray-800"
                                                type="text"
                                                disabled
                                                value={formatNumber(
                                                  getBajas(
                                                    indexPais,
                                                    indexCanal,
                                                    indexProd,
                                                    indexYear,
                                                    indexMes,
                                                  ),
                                                )}
                                                name="month"
                                              />
                                            </Tooltip>
                                          ) : (
                                            <Input
                                              className="w-[90px] border-2 border-solid border-gray-800"
                                              type="text"
                                              disabled
                                              value={formatNumber(
                                                getBajas(
                                                  indexPais,
                                                  indexCanal,
                                                  indexProd,
                                                  indexYear,
                                                  indexMes,
                                                ),
                                              )}
                                              name="month"
                                            />
                                          )}
                                        </FormItem>
                                      ),
                                    )}
                                </div>
                                {/*  FINAL */}
                                <div className="flex gap-x-3 gap-y-3">
                                  {visibleItems.includes(indexYear) &&
                                    año &&
                                    Object.keys(año.volMeses).map(
                                      (mes, indexMes) => (
                                        <FormItem
                                          className="mb-0"
                                          key={indexMes}
                                        >
                                          {formatNumber(
                                            valoresInicio &&
                                              valoresInicio[
                                                Object.keys(infoForm)[indexPais]
                                              ][indexCanal].productos[indexProd]
                                                .valoresInicioChurn[
                                                indexMes !== 11
                                                  ? indexYear
                                                  : indexYear + 1
                                              ][
                                                indexMes !== 11
                                                  ? indexMes + 1
                                                  : 0
                                              ],
                                          ) < 0 ? (
                                            <Input
                                              className="w-[90px] border-2 border-solid border-gray-800"
                                              type="text"
                                              disabled
                                              value={0}
                                              name="month"
                                            />
                                          ) : formatNumber(
                                              valoresInicio &&
                                                valoresInicio[
                                                  Object.keys(infoForm)[
                                                    indexPais
                                                  ]
                                                ][indexCanal].productos[
                                                  indexProd
                                                ].valoresInicioChurn[
                                                  indexMes !== 11
                                                    ? indexYear
                                                    : indexYear + 1
                                                ][
                                                  indexMes !== 11
                                                    ? indexMes + 1
                                                    : 0
                                                ],
                                            ).length > 7 ? (
                                            <Tooltip
                                              placement="top-end"
                                              title={formatNumber(
                                                valoresInicio &&
                                                  valoresInicio[
                                                    Object.keys(infoForm)[
                                                      indexPais
                                                    ]
                                                  ][indexCanal].productos[
                                                    indexProd
                                                  ].valoresInicioChurn[
                                                    indexMes !== 11
                                                      ? indexYear
                                                      : indexYear + 1
                                                  ][
                                                    indexMes !== 11
                                                      ? indexMes + 1
                                                      : 0
                                                  ],
                                              )}
                                            >
                                              <Input
                                                className="w-[90px] border-2 border-solid border-gray-800"
                                                type="text"
                                                // sabemos que los valores finales se corren una posicion en el array porque siempre mi valor final de un mes es igual al valor inicial del mes siguiente por eso hago esta logica de ver si estoy evaluando mi FINAL de diciembre, voy a necesitar el dato de enero de mi mes siguiente
                                                value={formatNumber(
                                                  valoresInicio &&
                                                    valoresInicio[
                                                      Object.keys(infoForm)[
                                                        indexPais
                                                      ]
                                                    ][indexCanal].productos[
                                                      indexProd
                                                    ].valoresInicioChurn[
                                                      indexMes !== 11
                                                        ? indexYear
                                                        : indexYear + 1
                                                    ][
                                                      indexMes !== 11
                                                        ? indexMes + 1
                                                        : 0
                                                    ],
                                                )}
                                                name="month"
                                              />
                                            </Tooltip>
                                          ) : (
                                            <Input
                                              className="w-[90px] border-2 border-solid border-gray-800"
                                              type="text"
                                              disabled
                                              value={formatNumber(
                                                valoresInicio &&
                                                  valoresInicio[
                                                    Object.keys(infoForm)[
                                                      indexPais
                                                    ]
                                                  ][indexCanal].productos[
                                                    indexProd
                                                  ].valoresInicioChurn[
                                                    indexMes !== 11
                                                      ? indexYear
                                                      : indexYear + 1
                                                  ][
                                                    indexMes !== 11
                                                      ? indexMes + 1
                                                      : 0
                                                  ],
                                              )}
                                              name="month"
                                            />
                                          )}
                                        </FormItem>
                                      ),
                                    )}
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
    </>
  );
}

export default TableChurn;
