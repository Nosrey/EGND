/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, FormContainer, FormItem, Input, Tooltip } from 'components/ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import {
  createCashflowIndirecto,
  getCashflowIndirectoInfo,
  getUser,
  getPyLInfo
} from 'services/Requests';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import MySpinner from 'components/shared/loaders/MySpinner';
import { addResult } from 'store/cajaYBcoCierre/cajaYBcoCierreSlice';
import { addCajaCierre } from 'store/tableBalanceCajaCierre/tableBalanceCajaCierreSlice';
import { calcularDeudasComerciales, calcularBienesDeCambio } from 'utils/calcs';
import { current } from '@reduxjs/toolkit';

function TableCashflowIndirecto(props) {
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(true);
  const [amortizaciones, setAmortizaciones] = useState([]);
  const [interesesPagados, setInteresesPagados] = useState([]);
  const [resultadoNeto, setResultadoNeto] = useState([]);
  const [variacion, setVariacion] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [FEOperativas, setFEOperativas] = useState([]);
  const [inversiones, setInversiones] = useState([]);
  const [financiacion, setFinanciacion] = useState([]);
  const [pagoPrestamos, setPagoPrestamos] = useState([]);
  const [FEfinanciacion, setFEfinanciacion] = useState([]);
  const [variacionCajaYBco, setVariacionCajaYBco] = useState([]);
  const [cajaYBancosAlCierre, setCajaYBancosAlCierre] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [cajaYBancosInicioManual, setCajaYBancosInicioManual] = useState(0);

  const currentState = useSelector((state) => state.auth.user);

  // ***************** INPUTS ANIO 0 ******************
  const [inputsValues, setinputsValues] = useState({
    cajaYBancos: '0',
    cajaYBancosAnioUno: '0',
    resultadoNeto: '0',
    amortizaciones: '0',
    interesesPagados: '0',
    variacion: '0',
    FEOperativas: '0',
    inversiones: '0',
    financiacion: '0',
    pagoPrestamos: '0',
    FEfinanciacion: '0',
    variacionCajaYBco: '0',
    cajaYBancosAlCierre: '0',
  });

  const handleChangeInputs = (key, value) => {
    let copy = { ...inputsValues };
    if (value.startsWith('0') && value.length > 1) {
      value = value.slice(1);
    }
    copy[key] = value;
    const valorFOp =
      parseInt(copy.resultadoNeto) +
      parseInt(copy.amortizaciones) +
      parseInt(copy.interesesPagados) +
      parseInt(copy.variacion);
    copy.FEOperativas = Number.isNaN(valorFOp) ? '0' : valorFOp.toString();
    console.log('copy: ', copy)
    console.log('valor: ', valorFOp.toString())

    let valorFFinanciacion = 0
    // parseInt(copy.financiacion) - parseInt(copy.pagoPrestamos);
    // si el valor de pagoPrestamos es positivo, lo paso a negativo y sumo a financiacion
    if (parseInt(copy.pagoPrestamos) >= 0) {
      valorFFinanciacion = parseInt(copy.financiacion) - parseInt(copy.pagoPrestamos);
    } else {
      valorFFinanciacion = parseInt(copy.financiacion) + parseInt(copy.pagoPrestamos);
    }
    copy.FEfinanciacion = Number.isNaN(valorFFinanciacion)
      ? '0'
      : valorFFinanciacion.toString();

    const varCyB =
      parseInt(copy.FEfinanciacion) +
      parseInt(copy.FEOperativas) +
      parseInt(copy.inversiones);
    copy.variacionCajaYBco = Number.isNaN(varCyB) ? '0' : varCyB.toString();

    const CyB = parseInt(copy.variacionCajaYBco) + parseInt(copy.cajaYBancos);
    copy.cajaYBancosAlCierre = Number.isNaN(CyB) ? '0' : CyB.toString();
    setinputsValues(copy);
  };

  const handleChangeCyB = (value) => {
    // const copy = [...cajaYBancos]
    if (value.startsWith('0') && value.length > 1) {
      value = value.slice(1);
    }
    if (Number.isNaN(value) || value === '') {
      value = 0;
    }
    const copy = { ...inputsValues };
    copy.cajaYBancosAnioUno = value;
    setinputsValues(copy);
    setCajaYBancosInicioManual(parseInt(value));
  };

  // ***************** ACORDION ******************

  const [hiddenItems, setHiddenItems] = useState([true, true, true]);
  const [allOpen, setAllOpen] = useState(false);

  const playAccordion = (index) => {
    const copy = [...hiddenItems];
    copy[index] = !copy[index];
    setHiddenItems(copy);
  };

  const closeAll = () => {
    setHiddenItems([true, true, true]);
    setAllOpen(false);
  };

  const openAll = () => {
    setHiddenItems([false, false, false]);
    setAllOpen(true);
  };

  function arrayNegativos(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] < 0) {
        newArray.push(array[i]); // si es negativo lo dejo igual
      } else {
        newArray.push(array[i] * -1); // si es positivo lo paso a negativo
      }
    }
    return newArray;
  }

  useEffect(() => {
    if (hiddenItems) {
      let todasSonTrue = hiddenItems.every((valor) => valor === true);
      let todasSonFalse = hiddenItems.every((valor) => valor === false);

      if (todasSonTrue) {
        setAllOpen(false);
      }
      if (todasSonFalse) {
        setAllOpen(true);
      }
    }
  }, [hiddenItems]);
  // **********************************************
  // **********************************************

  const currency = useSelector((state) => state.auth.user.currency);

  useEffect(() => {
    let resultadoNetoFinal = props?.resultadoNeto?.length ? props?.resultadoNeto : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    setResultadoNeto(resultadoNetoFinal);
    let amortizacionesFinal = props?.amortizaciones?.length ? props?.amortizaciones : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    setAmortizaciones(amortizacionesFinal);
    let interesesPagadosFinal = props?.interesesPagados?.length ? props?.interesesPagados : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    setInteresesPagados(interesesPagadosFinal);
    let inversionesFinal = props?.inversiones ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    setInversiones(arrayNegativos(inversionesFinal))
    let financiacionFinal = props?.financiacion?.length ? props?.financiacion : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    setFinanciacion(financiacionFinal);
    // para variacion tambien
    let variacionFinal = props?.variacion?.length ? props?.variacion : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    setVariacion(variacionFinal);
  }, [props]);

  // // useEffect para incluir la funcion calcularDeudasComerciales
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getUser(currentState.id);
  //     await calcularBienesDeCambio(
  //       data,
  //       () => {},
  //       0,
  //     );

  //     await calcularDeudasComerciales(
  //       data,
  //       setVariacion,
  //     );
  //   };

  //   fetchData();

  // }, [])

  useEffect(() => {
    if (resultadoNeto && amortizaciones && interesesPagados && variacion) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        resultado.push(
          resultadoNeto[i] +
          amortizaciones[i] + interesesPagados[i] + variacion[i],
        );
      }
      setFEOperativas(resultado);
    }
  }, [resultadoNeto, amortizaciones, interesesPagados, variacion]);

  useEffect(() => {
    if (interesesPagados && financiacion) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        resultado.push(interesesPagados[i] + financiacion[i]);
      }
      setPagoPrestamos(arrayNegativos(resultado))
    }
  }, [interesesPagados, financiacion]);

  useEffect(() => {
    if (pagoPrestamos && financiacion) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        // resultado.push(financiacion[i] - pagoPrestamos[i]);
        if (pagoPrestamos[i] >= 0) {
          resultado.push(financiacion[i] - pagoPrestamos[i]);
        } else {
          resultado.push(financiacion[i] + pagoPrestamos[i]);
        }
      }
      setFEfinanciacion(resultado);
    }
  }, [pagoPrestamos, financiacion]);

  useEffect(() => {
    if (FEOperativas && FEfinanciacion && inversiones) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        resultado.push(FEOperativas[i] + FEfinanciacion[i] + inversiones[i]);
      }
      setVariacionCajaYBco(resultado);
    }
  }, [FEOperativas, FEfinanciacion, inversiones]);
  // ---------------------------------


  useEffect(() => {
    if (variacionCajaYBco) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        if (i === 0) {
          resultado.push(
            parseInt(variacionCajaYBco[0]) + parseInt(cajaYBancosInicioManual),
          );
        } else {
          resultado.push(
            parseInt(variacionCajaYBco[i]) + parseInt(resultado[i - 1]),
          );
        }
      }
      if (resultado !== undefined) {
        if (resultado.length < 10) {
          resultado = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        } else {
          for (let i = 0; i < 10; i++) {
            if (Number.isNaN(resultado[i])) {
              resultado[i] = 0;
            }
          }
        }
      } else {
        resultado = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      setCajaYBancosAlCierre(resultado);
      if (!Number.isNaN(resultado[0]))
        dispatch(
          addCajaCierre([inputsValues.cajaYBancosAlCierre, ...resultado]),
        );
      dispatch(addResult([resultado]));

      setTimeout(() => {
        setShowLoader(false);
      }, 4000);
    }
  }, [variacionCajaYBco, cajaYBancosInicioManual]);

  const submitInfoFormCashflow = () => {
    const value = { ...inputsValues, idUser: localStorage.getItem('userId') };
    delete value.bienesDeCambio;
    delete value.creditosVentas;
    delete value.deudasComerciales;
    createCashflowIndirecto(value)
      .then((resp) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        props?.showAlertSuces(true);
        setTimeout(() => {
          props?.showAlertSuces(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        props?.showAlertError(true);
        setTimeout(() => {
          props?.showAlertError(false);
        }, 5000);
      });
  };


  // --------------

  useEffect(() => {
    getCashflowIndirectoInfo(currentState.id)
      .then((data) => {
        if (data.length !== 0) {
          // hago una copia de los valores de data[0] para no modificar el original y a la propiedad FEOperativas le sumo los valores de amortizaciones, intereses pagados y variacion
          let copy = { ...data[0] };


          getPyLInfo(currentState.id)
            .then((data) => {
              if (data.length !== 0) {
                if (data[0]?.rdoNeto) {
                  copy.resultadoNeto = data[0].rdoNeto;
                } else {
                  copy.resultadoNeto = 0;
                }
                copy.FEOperativas = parseFloat(copy.amortizaciones) + parseFloat(copy.interesesPagados) + parseFloat(copy.variacion) + parseFloat(copy.resultadoNeto);
                setinputsValues(copy);
                setCajaYBancosInicioManual(copy.cajaYBancosAnioUno);

              } else {
                copy.resultadoNeto = 0;
              }
            })
            .catch((error) => console.error(error));


        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // console.log('props?.variacionCajaYBco', variacionCajaYBco)
    // console.log('props?.cajaYBancosAlCierre', cajaYBancosAlCierre)
    // let variacionCajaYBcoFinal = variacionCajaYBco
    // let cajaYBancosAlCierreFinal = cajaYBancosAlCierre

    // if (variacionCajaYBcoFinal !== undefined && variacionCajaYBcoFinal.length) {
    //   if (variacionCajaYBcoFinal.length < 10) {
    //     variacionCajaYBcoFinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //   } else {
    //     for (let i = 0; i < 10; i++) {
    //       if (Number.isNaN(variacionCajaYBcoFinal[i]) || variacionCajaYBcoFinal[i] === Infinity || variacionCajaYBcoFinal[i] === -Infinity) {
    //         variacionCajaYBcoFinal[i] = 0;
    //       } else {
    //         variacionCajaYBcoFinal[i] = variacionCajaYBco?.[i].toFixed(2)
    //       }
    //     }
    //   }
    // } else {
    //   variacionCajaYBcoFinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // }

    // if (cajaYBancosAlCierreFinal !== undefined && cajaYBancosAlCierreFinal.length) {
    //   if (cajaYBancosAlCierreFinal.length < 10) {
    //     cajaYBancosAlCierreFinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //   } else {
    //     for (let i = 0; i < 10; i++) {
    //       if (Number.isNaN(cajaYBancosAlCierreFinal[i]) || cajaYBancosAlCierreFinal[i] === Infinity || cajaYBancosAlCierreFinal[i] === -Infinity) {
    //         cajaYBancosAlCierreFinal[i] = 0;
    //       } else {
    //         cajaYBancosAlCierreFinal[i] = cajaYBancosAlCierre?.[i].toFixed(2)          
    //       }
    //     }
    //   }
    // } else {
    //   cajaYBancosAlCierreFinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // }

    // console.log('variacionCajaYBcoFinal', variacionCajaYBcoFinal)
    // console.log('cajaYBancosAlCierreFinal', cajaYBancosAlCierreFinal)

    props?.setGraph04Data([
      {
        name: 'Variación de caja y bancos',
        data: variacionCajaYBco.map((año) => parseFloat(año.toFixed(2))),
        // data: variacionCajaYBcoFinal,
      },
      {
        name: 'Caja y bancos al cierre',
        data: cajaYBancosAlCierre.map((año) => parseFloat(año.toFixed(2))),
        // data: cajaYBancosAlCierreFinal,
      },
    ]);
  }, [cajaYBancosAlCierre, variacionCajaYBco]);

  return (
    <>
      {showLoader ? (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
          <MySpinner />
        </div>
      ) : (
        <>
          {
            <>
              <FormContainer>
                <div className="flex justify-end mt-[0px] mb-[10px]">
                  {allOpen ? (
                    <span
                      className="cursor-pointer text-blue-700 text-sm"
                      onClick={closeAll}
                    >
                      {' '}
                      Cerrar Todos
                    </span>
                  ) : (
                    <span
                      className="cursor-pointer text-blue-700 text-sm"
                      onClick={openAll}
                    >
                      {' '}
                      Abrir Todos
                    </span>
                  )}
                </div>
                <section className="contenedor pl-[25px] pr-[35px]">
                  {/** *********** Caja y bancos al inicio del periodo  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div className="iconDesplegable" />
                    <FormItem className=" mb-1 w-[240px] mt-[49px]">
                      <Input
                        disabled
                        type="text"
                        className="capitalize"
                        value="Caja y bancos - inicio de periodo"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <div className="titleRow w-[130px]">
                        <p className="cursor-default"> Año 0</p>
                      </div>
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.cajaYBancos}
                          onChange={(e) =>
                            handleChangeInputs('cajaYBancos', e.target.value)
                          }
                          name="initial"
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {[cajaYBancosInicioManual, ...cajaYBancosAlCierre.slice(0, 9)]?.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <div className="titleRow w-[130px]">
                          <p className="cursor-default"> Año {indexYear + 1}</p>
                        </div>
                        <FormItem className="mb-0">
                          {año.toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] "
                                type="text"
                                value={
                                  indexYear !== 0 ?
                                    formatNumberPrestamos(cajaYBancosAlCierre[indexYear - 1])
                                    : formatNumberPrestamos(cajaYBancosInicioManual)

                                }
                                name="year"
                                disabled={indexYear !== 0}
                                prefix={currency || '$'}
                                onChange={(e) =>
                                  handleChangeCyB(e.target.value)
                                }
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={
                                indexYear !== 0
                                  ? formatNumberPrestamos(año)
                                  : año
                              }
                              name="year"
                              prefix={currency || '$'}
                              disabled={indexYear !== 0}
                              onChange={(e) => handleChangeCyB(e.target.value)}
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}
                  {/** *********** Resultado Neto  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div className="iconDesplegable" />

                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-blue-100"
                        value="Resultado Neto"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.resultadoNeto}
                          onChange={(e) =>
                            handleChangeInputs('resultadoNeto', e.target.value)
                          }
                          name="initial"
                          disabled={true}
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {resultadoNeto?.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold text-base"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency || '$'}
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}

                  <div className="linea" />
                  <span className="block  pl-3  mb-3 ">
                    Actividades operativas
                  </span>
                  {!hiddenItems[0] && (
                    <>
                      {/** *********** Amortizaciones  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Amortizaciones"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.amortizaciones}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'amortizaciones',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {amortizaciones?.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={currency + formatNumberPrestamos(año)}
                                >
                                  <Input
                                    className="w-[130px] "
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px]"
                                  type="text"
                                  value={formatNumberPrestamos(año)}
                                  name="year"
                                  prefix={currency || '$'}
                                  disabled
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Intereses Pagados  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Intereses Pagados"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.interesesPagados}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'interesesPagados',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {interesesPagados?.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={currency + formatNumberPrestamos(año)}
                                >
                                  <Input
                                    className="w-[130px] "
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px]"
                                  type="text"
                                  value={formatNumberPrestamos(año)}
                                  name="year"
                                  prefix={currency || '$'}
                                  disabled
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Variación Capital de trabajo  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Variación Capital de trabajo"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.variacion}
                              onChange={(e) =>
                                handleChangeInputs('variacion', e.target.value)
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {variacion?.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={currency + formatNumberPrestamos(año)}
                                >
                                  <Input
                                    className="w-[130px] "
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px]"
                                  type="text"
                                  value={formatNumberPrestamos(año)}
                                  name="year"
                                  prefix={currency || '$'}
                                  disabled
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                    </>
                  )}
                  {/** *********** FF generado en act. operativas  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div
                      className="iconDesplegable"
                      onClick={() => playAccordion(0)}
                    >
                      {hiddenItems[0] ? <CiCirclePlus /> : <CiCircleMinus />}
                    </div>
                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-blue-100"
                        value="FF generado en act. operativas"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.FEOperativas}
                          onChange={(e) =>
                            handleChangeInputs('FEOperativas', e.target.value)
                          }
                          name="initial"
                          disabled
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {FEOperativas?.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold text-base"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency || '$'}
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}

                  <div className="linea" />
                  <span className="block  pl-3  mb-3 ">
                    Actividades de inversión
                  </span>
                  {!hiddenItems[1] && (
                    <>
                      {/** *********** Inversiones  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Inversiones"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.inversiones}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'inversiones',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              //prefix={currency || '$'}
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {inversiones?.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={currency + formatNumberPrestamos(año)}
                                >
                                  <Input
                                    className="w-[130px] "
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px]"
                                  type="text"
                                  value={formatNumberPrestamos(año)}
                                  name="year"
                                  prefix={currency || '$'}
                                  disabled
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                    </>
                  )}
                  {/** *********** FF generado en act. de inversión  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div
                      className="iconDesplegable"
                      onClick={() => playAccordion(1)}
                    >
                      {hiddenItems[1] ? <CiCirclePlus /> : <CiCircleMinus />}
                    </div>
                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-blue-100"
                        value="FF generado en act. de inversión"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.inversiones}
                          onChange={(e) =>
                            handleChangeInputs('inversiones', e.target.value)
                          }
                          name="initial"
                          disabled
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {inversiones?.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold text-base"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency || '$'}
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}
                  <div className="linea" />
                  <span className="block  pl-3  mb-3 ">
                    Actividades de financiación
                  </span>
                  {!hiddenItems[2] && (
                    <>
                      {/** *********** Financiación de terceros  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Financiación de terceros"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.financiacion}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'financiacion',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {financiacion?.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={currency + formatNumberPrestamos(año)}
                                >
                                  <Input
                                    className="w-[130px] "
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px]"
                                  type="text"
                                  value={formatNumberPrestamos(año)}
                                  name="year"
                                  prefix={currency || '$'}
                                  disabled
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                      {/** *********** Pago préstamos  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Pago préstamos"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.pagoPrestamos}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'pagoPrestamos',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {pagoPrestamos?.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={currency + formatNumberPrestamos(año)}
                                >
                                  <Input
                                    className="w-[130px] "
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px]"
                                  type="text"
                                  value={formatNumberPrestamos(año)}
                                  name="year"
                                  prefix={currency || '$'}
                                  disabled
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                    </>
                  )}
                  {/** *********** FF generado en act. de financiación  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div
                      className="iconDesplegable"
                      onClick={() => playAccordion(2)}
                    >
                      {hiddenItems[2] ? <CiCirclePlus /> : <CiCircleMinus />}
                    </div>
                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-blue-100"
                        value="FF generado en act. de financiación"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.FEfinanciacion}
                          name="initial"
                          disabled
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {FEfinanciacion?.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold text-base"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency || '$'}
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}

                  {/** *********** Variación de caja y bancos  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div className="iconDesplegable" />

                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-blue-100"
                        value="Variación de caja y bancos"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.variacionCajaYBco}
                          name="initial"
                          disabled
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {variacionCajaYBco?.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold text-base"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency || '$'}
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}

                  {/** *********** Caja y bancos al cierre  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6">
                    <div className="iconDesplegable" />

                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-blue-100"
                        value="Caja y bancos al cierre"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.cajaYBancosAlCierre}
                          name="initial"
                          disabled
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {cajaYBancosAlCierre?.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold text-base"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency || '$'}
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}
                </section>
              </FormContainer>

              <Button
                className="border mt-6b btnSubmitTable mt-[40px]"
                variant="solid"
                type="submit"
                onClick={submitInfoFormCashflow}
              >
                Guardar
              </Button>
            </>
          }
        </>
      )}
    </>
  );
}

export default TableCashflowIndirecto;
