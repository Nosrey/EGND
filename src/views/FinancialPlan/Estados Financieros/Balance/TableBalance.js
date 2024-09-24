/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable arrow-body-style */
import { Button, FormContainer, FormItem, Input, Tooltip } from 'components/ui';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import { getUser, getBalance, createBalance } from 'services/Requests';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import MySpinner from 'components/shared/loaders/MySpinner';
import {
  calcularCreditosPorVentas,
  calcularBienesDeCambio,
  calcularbienesDeUso,
  calcularDeudasComerciales,
  calcularDeudasFiscales,
  calcularResultadosNoAsignados,
  calcularEquity,
  calcularPrestamos,
} from 'utils/calcs';
import { addVariacion } from 'store/tableVariacionesCapital/tableVariacionesCapitalSlice';


function TableBalance(props) {
  const dispatch = useDispatch();
  const [cebo, setCebo] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [creditosPorVentas, setCreditosPorVentas] = useState([]);
  const [creditosFiscales, setCreditosFiscales] = useState([]);
  const [bienesDeCambio, setBienesDeCambio] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [bienesDeUso, setBienesDeUso] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [cajaYBancos, setCajaYBancos] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [totActivo, setTotActivo] = useState([]);

  const [deudasComerciales, setDeudasComerciales] = useState([]);
  const [deudasFiscales, setDeudasFiscales] = useState([]);
  const [deudasFinancieras, setDeudasFinancieras] = useState([]);
  const [otrasDeudas, setOtrasDeudas] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [totPasivo, setTotPasivo] = useState([]);

  const [Equity, setEquity] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [ResultadosNoAsignados, setResultadosNoAsignados] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [ResultadosDelEjercicio, setResultadosDelEjercicio] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [totalPatrimonioNeto, setTotalPatrimonioNeto] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [totalPnYPasivo, setTotalPnYPasivo] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [updateBienesDeCambio, setUpdateBienesDeCambio] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  const currentState = useSelector((state) => state.auth.user);
  let ResultadosDelEjercicioData = useSelector(
    (state) => state.netoResult[0],
  );



  if (ResultadosDelEjercicioData === undefined) {
    ResultadosDelEjercicioData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  const IIGG = useSelector((state) => state.tableBalanceResult);
  const cajaYBancosAlCierre = useSelector(
    (state) => state.tableBalanceCajaCierre,
  );
  const prestamos = useSelector((state) => state.tableBalancePrestamos);

  // ***************** INPUTS ANIO 0 ******************
  const [inputsValues, setinputsValues] = useState({
    cajaYBancos: '0',
    creditosPorVentas: '0',
    creditosFiscales: '0',
    BienesDeCambio: '0',
    BienesDeUso: '0',
    totActivo: '0',
    deudasComerciales: '0',
    deudasFiscales: '0',
    deudasFinancieras: '0',
    otrasDeudas: '0',
    totPasivo: '0',
    equity: '0',
    ResultadosNoAsignados: '0',
    resultadosDelEjercicio: '0',
    totPatNeto: '0',
    totPnYPasivo: '0',
  });

  const handleChangeInputs = (key, value) => {
    const copy = { ...inputsValues };
    if (value.startsWith('0') && value.length > 1) {
      value = value.slice(1);
    }
    copy[key] = value;
    const valorTotActivo =
      parseInt(copy.BienesDeCambio) +
      parseInt(copy.BienesDeUso) +
      parseInt(copy.creditosFiscales) +
      parseInt(copy.creditosPorVentas) -
      parseInt(copy.cajaYBancos);
    copy.totActivo = Number.isNaN(valorTotActivo)
      ? '0'
      : valorTotActivo.toString();
    setinputsValues(copy);
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

  // un useEffect que se ejecute al inicio
  useEffect(() => {
    getBalance(localStorage.getItem('userId'), setinputsValues);
  }, []);
  // **********************************************
  // **********************************************

  const currency = useSelector((state) => state.auth.user.currency);

  function handleBienesDeCambio(value) {
    handleChangeInputs('BienesDeCambio', value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        setUpdateBienesDeCambio(true);
      }, 3000),
    );
  }

  useEffect(() => {

    let cajaYBancosCopy = Array.from({ length: 10 }, () => 0);
    props?.cajaYBancos?.forEach((element, index) => {
      if (!Number.isNaN(element)) {
        cajaYBancosCopy[index] = element;
      }
    });

    setCajaYBancos(cajaYBancosCopy);
    setCreditosFiscales(props.creditosFiscales);
  }, [props]);

  useEffect(() => {
    if (
      updateBienesDeCambio &&
      Array.isArray(IIGG) &&
      // IIGG.length > 1 &&
      Array.isArray(cajaYBancosAlCierre)
      // cajaYBancosAlCierre.length > 1
    ) {
      setTimeout(() => {
        const fetchData = async () => {
          try {
            let cajaYBancosAlCierreFinal = (cajaYBancosAlCierre?.length === 0) ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : cajaYBancosAlCierre;
            let IIGGFinal = (IIGG?.length === 0) ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : IIGG;

            const data = await getUser(currentState.id);
            let dataCopy = JSON.parse(JSON.stringify(data));
            let dataCopy2 = JSON.parse(JSON.stringify(data));
            let ivasDF = await calcularCreditosPorVentas(
              dataCopy,
              creditosPorVentas,
              setCreditosPorVentas,
            );

            await calcularBienesDeCambio(
              data,
              setBienesDeCambio,
              inputsValues.BienesDeCambio,
            );
            let ivasCF = await calcularDeudasComerciales(
              data,
              setDeudasComerciales,
            );
            await calcularDeudasFiscales(
              ivasDF,
              ivasCF,
              dataCopy2,
              IIGGFinal,
              setDeudasFiscales,
              setCebo,
            );
            await calcularEquity(
              cajaYBancosAlCierreFinal,
              setEquity,
              ResultadosDelEjercicioData,
              ResultadosNoAsignados,
              setTotalPatrimonioNeto,
              setCebo,
            );

            let prestamosFinal = prestamos
            if (prestamosFinal.length === 1 && prestamosFinal[0].monto === 0 && prestamosFinal[0].plazo === 0 && prestamosFinal[0].tasaAnual === 0 && prestamosFinal[0].mesInicio === '') prestamosFinal = []
            await calcularPrestamos(
              prestamosFinal,
              setDeudasFinancieras,
              setShowLoader,
            );
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, 1500);
    }
  }, [updateBienesDeCambio, IIGG, inputsValues.BienesDeCambio]);

  // un useEffect que reacciona si se editan algunas de las Deudas Comerciales Deudas Fiscales Deudas Financieras y Otras Deudas y suma el total del pasivo
  useEffect(() => {
    if (
      deudasComerciales &&
      deudasFiscales &&
      deudasFinancieras &&
      otrasDeudas
    ) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        resultado.push(
          deudasComerciales[i] +
          deudasFiscales[i] +
          deudasFinancieras[i] +
          otrasDeudas[i],
        );
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

      setTotPasivo(resultado);
      let copy = { ...inputsValues };
      copy.totPasivo =
        Number(copy.deudasComerciales) +
        Number(copy.deudasFiscales) +
        Number(copy.deudasFinancieras) +
        Number(copy.otrasDeudas);
      setinputsValues(copy);
    }
    if (deudasComerciales) {
      dispatch(addVariacion(deudasComerciales))
    }
  }, [
    deudasComerciales,
    deudasFiscales,
    deudasFinancieras,
    otrasDeudas,
    inputsValues.deudasComerciales,
    inputsValues.deudasFiscales,
    inputsValues.deudasFinancieras,
    inputsValues.otrasDeudas,
  ]);

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        calcularCreditosPorVentas(
          data,
          creditosPorVentas,
          setCreditosPorVentas,
        );
        calcularbienesDeUso(data, setBienesDeUso);
      })
      .catch((error) => console.error(error));
  }, []);

  // un useEffect que reacciona si cambia totalPatrimonioNeto y totPasivo y suma el total del pasivo y patrimonio neto en totalPnYPasivo
  useEffect(() => {
    if (totalPatrimonioNeto && totPasivo) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        resultado.push(totalPatrimonioNeto[i] + totPasivo[i]);
      }
      setTotalPnYPasivo(resultado);
    }
    let copy = { ...inputsValues };
    copy.totPnYPasivo = Number(copy.totPatNeto) + Number(copy.totPasivo);
    setinputsValues(copy);
  }, [
    totalPatrimonioNeto,
    totPasivo,
    inputsValues.totPatNeto,
    inputsValues.totPasivo,
  ]);

  // un useEffect que reacciona si cambia inputValues.equity, inputsValues.ResultadosNoAsignados y inputsValues.resultadosDelEjercicio y suma el total del patrimonio neto en inputsValues.totPatNeto
  useEffect(() => {
    if (
      inputsValues.equity &&
      inputsValues.ResultadosNoAsignados &&
      inputsValues.resultadosDelEjercicio
    ) {
      let copy = { ...inputsValues };
      copy.totPatNeto =
        Number(copy.equity) +
        Number(copy.ResultadosNoAsignados) +
        Number(copy.resultadosDelEjercicio);
      setinputsValues(copy);
    }
  }, [
    inputsValues.equity,
    inputsValues.ResultadosNoAsignados,
    inputsValues.resultadosDelEjercicio,
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (ResultadosDelEjercicioData?.length) {
        calcularResultadosNoAsignados(
          inputsValues.ResultadosNoAsignados,
          inputsValues.resultadosDelEjercicio,
          ResultadosDelEjercicioData,
          setResultadosNoAsignados,
        );
      }
    }, 1500);
  }, [
    inputsValues.ResultadosNoAsignados,
    inputsValues.resultadosDelEjercicio,
    ResultadosDelEjercicioData,
  ]);

  useEffect(() => {
    if (
      cajaYBancos &&
      creditosPorVentas &&
      creditosFiscales &&
      bienesDeCambio &&
      bienesDeUso
    ) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        resultado.push(
          bienesDeUso[i] +
          creditosPorVentas[i] +
          creditosFiscales[i] +
          bienesDeCambio[i] +
          cajaYBancos[i],
        );
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

      setTotActivo(resultado);
    }
  }, [
    cajaYBancos,
    creditosPorVentas,
    creditosFiscales,
    bienesDeCambio,
    bienesDeUso,
  ]);

  useEffect(() => {
    // seteamos props.graph05Data al dividir el array de tot pasivo / tot neto
    if (totalPatrimonioNeto && totPasivo) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        // reviso si es un numero o no, si no lo es lo seteo en 0
        if (Number.isNaN(totalPatrimonioNeto[i] / totPasivo[i])) {
          resultado.push(0);
        } else {
          resultado.push(totalPatrimonioNeto[i] / totPasivo[i]);
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

      props.setGraph05Data([
        {
          name: 'Endeudamiento',
          data: resultado.map((año) => parseFloat(año.toFixed(2))),
        },
      ]);
    }
  }, [totalPatrimonioNeto, totPasivo]);

  // igual peron con tot activo / tot pasivo para setear props.graph06Data
  useEffect(() => {
    if (totActivo && totPasivo) {
      let totActivoFinal = totActivo?.length === 0 ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : totActivo;
      let totPasivoFinal = totPasivo?.length === 0 ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : totPasivo;

      let resultado = [];
      for (let i = 0; i < 10; i++) {
        // reviso si es un numero o no, si no lo es lo seteo en 0
        if (Number.isNaN(totActivoFinal[i] / totPasivoFinal[i])) {
          resultado.push(0);
        } else {
          resultado.push(totActivoFinal[i] / totPasivoFinal[i]);
        }
      }

      if (resultado !== undefined) {
        if (resultado.length < 10) {
          resultado = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        } else {
          for (let i = 0; i < 10; i++) {
            if (Number.isNaN(resultado[i]) || resultado[i] === Infinity || resultado[i] === -Infinity) {
              resultado[i] = 0;
            }
          }
        }
      } else {
        resultado = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }

      props.setGraph06Data([
        {
          name: 'Solvencia',
          data: resultado.map((año) => parseFloat(año.toFixed(2))),
        },
      ]);
    }
  }, [totActivo, totPasivo]);

  // (Caja y Bancos + Creditos por Ventas + Bienes de Cambio  anio anterior)/tot pasivo del anio anterior
  useEffect(() => {
    if (cajaYBancos && creditosPorVentas && bienesDeCambio && totPasivo) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        // reviso si es un numero o no, si no lo es lo seteo en 0
        if (i === 0) {
          resultado.push(0);
        } else if (
          Number.isNaN(
            (cajaYBancos[i - 1] +
              creditosPorVentas[i - 1] +
              bienesDeCambio[i - 1]) /
            totPasivo[i - 1],
          )
        ) {
          resultado.push(0);
        } else {
          resultado.push(
            (cajaYBancos[i - 1] +
              creditosPorVentas[i - 1] +
              bienesDeCambio[i - 1]) /
            totPasivo[i - 1],
          );
        }
      }

      if (resultado !== undefined) {
        if (resultado.length < 10) {
          resultado = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        } else {
          for (let i = 0; i < 10; i++) {
            if (Number.isNaN(resultado[i]) || resultado[i] === Infinity || resultado[i] === -Infinity) {
              resultado[i] = 0;
            }
          }
        }
      } else {
        resultado = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }

      props.setGraph07Data([
        {
          name: 'Liquidez',
          data: resultado.map((año) => parseFloat(año.toFixed(2))),
        },
      ]);
    }
  }, [cajaYBancos, creditosPorVentas, bienesDeCambio, totPasivo]);

  const submitInfoFormBalance = () => {
    const value = {
      cajaYBancos: inputsValues.cajaYBancos,
      creditosPorVentas: inputsValues.creditosPorVentas,
      creditosFiscales: inputsValues.creditosFiscales,
      bienesDeCambio: inputsValues.BienesDeCambio,
      bienesDeUso: inputsValues.BienesDeUso,
      deudasComerciales: inputsValues.deudasComerciales,
      deudasFiscales: inputsValues.deudasFiscales,
      deudasFinancieras: inputsValues.deudasFinancieras,
      otrasDeudas: inputsValues.otrasDeudas,
      equity: inputsValues.equity,
      resultadosNoAsignados: inputsValues.ResultadosNoAsignados,
      resultadosDelEjercicio: inputsValues.resultadosDelEjercicio,
      totActivo: inputsValues.totActivo,
      totPasivo: inputsValues.totPasivo,
      totPatNeto: inputsValues.totPatNeto,
      totPnYPasivo: inputsValues.totPnYPasivo,
      idUser: localStorage.getItem('userId'),
    };
    createBalance(value)
      .then((resp) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        props.showAlertSuces(true);
        setTimeout(() => {
          props.showAlertSuces(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        props.showAlertError(true);
        setTimeout(() => {
          props.showAlertError(false);
        }, 5000);
      });
  };

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
                  <div className="linea" />
                  <span className="block  pl-3  mb-3 ">Activo</span>
                  {!hiddenItems[0] && (
                    <>
                      {/** *********** Caja y bancos  ************ */}
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
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.cajaYBancos)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.cajaYBancos}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'cajaYBancos',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {Number.isNaN(cajaYBancos[0])
                          ? []
                          : cajaYBancos.map((año, indexYear) => {
                            return (
                              <div className="flex flex-col" key={indexYear}>
                                <div className="titleRow w-[130px]">
                                  <p className="cursor-default">
                                    {' '}
                                    Año {indexYear + 1}
                                  </p>
                                </div>
                                <FormItem className="mb-0">
                                  <Tooltip
                                    placement="top-end"
                                    title={
                                      currency + formatNumberPrestamos(año)
                                    }
                                  >
                                    <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año)}
                                      name="year"
                                      disabled
                                      prefix={currency}
                                    />
                                  </Tooltip>
                                </FormItem>
                              </div>
                            );
                          })}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Créditos por Ventas  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Créditos por Ventas"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.creditosPorVentas)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.creditosPorVentas}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'creditosPorVentas',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {creditosPorVentas.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Créditos Fiscales  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Créditos Fiscales"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.creditosFiscales)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.creditosFiscales}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'creditosFiscales',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {Number.isNaN(creditosFiscales[0])
                          ? []
                          : creditosFiscales.map((año, indexYear) => {
                            return (
                              <div className="flex flex-col" key={indexYear}>
                                <FormItem className="mb-0">
                                  <Tooltip
                                    placement="top-end"
                                    title={
                                      currency + formatNumberPrestamos(año)
                                    }
                                  >
                                    <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año)}
                                      name="year"
                                      disabled
                                      prefix={currency}
                                    />
                                  </Tooltip>
                                </FormItem>
                              </div>
                            );
                          })}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Bienes de Cambio  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Bienes de Cambio"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.BienesDeCambio)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.BienesDeCambio}
                                onChange={(e) =>
                                  handleBienesDeCambio(e.target.value)
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {bienesDeCambio.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                      {/** *********** Bienes de Uso  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Bienes de Uso"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.BienesDeUso)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.BienesDeUso}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'BienesDeUso',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {bienesDeUso.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                    </>
                  )}
                  {/** *********** TOTAL ACTIVO  ************ */}
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
                        value="TOTAL ACTIVO"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Tooltip
                          placement="top-end"
                          title={
                            currency + formatNumberPrestamos(inputsValues.totActivo)
                          }
                        >
                          <Input
                            className="w-[130px]"
                            type="text"
                            value={inputsValues.totActivo}
                            onChange={(e) =>
                              handleChangeInputs('totActivo', e.target.value)
                            }
                            disabled
                            name="initial"
                            prefix={currency || '$'}
                          />
                        </Tooltip>
                      </FormItem>
                    </div>

                    {Number.isNaN(totActivo[0])
                      ? []
                      : totActivo.map((año, indexYear) => {
                        return (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              <Tooltip
                                placement="top-end"
                                title={
                                  currency + formatNumberPrestamos(año)
                                }
                              >
                                <Input
                                  className="w-[130px] font-bold text-base"
                                  type="text"
                                  value={formatNumberPrestamos(año)}
                                  name="year"
                                  disabled
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        );
                      })}
                  </div>
                  {/** *********** ****************  ************ */}

                  <span className="block  pl-3  mb-3 ">Pasivo</span>
                  {!hiddenItems[1] && (
                    <>
                      {/** *********** Deudas Comerciales  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Deudas Comerciales"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.deudasComerciales)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.deudasComerciales}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'deudasComerciales',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {deudasComerciales.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Deudas Fiscales  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Deudas Fiscales"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.deudasFiscales)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.deudasFiscales}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'deudasFiscales',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {deudasFiscales.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Deudas Financieras  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Deudas Financieras"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.deudasFinancieras)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.deudasFinancieras}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'deudasFinancieras',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {deudasFinancieras.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Otras Deudas  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Otras Deudas"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.otrasDeudas)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.otrasDeudas}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'otrasDeudas',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {otrasDeudas.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                    </>
                  )}
                  {/** *********** TOTAL PASIVO  ************ */}
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
                        value="TOTAL PASIVO"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Tooltip
                          placement="top-end"
                          title={
                            currency + formatNumberPrestamos(inputsValues.totPasivo)
                          }
                        >
                          <Input
                            className="w-[130px]"
                            type="text"
                            value={inputsValues.totPasivo}
                            onChange={(e) =>
                              handleChangeInputs('totPasivo', e.target.value)
                            }
                            disabled
                            name="initial"
                            prefix={currency || '$'}
                          />
                        </Tooltip>
                      </FormItem>
                    </div>
                    {totPasivo.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
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
                              prefix={currency}
                            />
                          </Tooltip>
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}

                  {/** *********** PATRIMONIO NETO  ************ */}

                  <span className="block  pl-3  mb-3 ">Patrimonio Neto</span>
                  {!hiddenItems[2] && (
                    <>
                      {/** *********** Equity  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Equity"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.equity)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.equity}
                                onChange={(e) =>
                                  handleChangeInputs('equity', e.target.value)
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {Equity.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Resultados No Asignados  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Resultados No Asignados"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.ResultadosNoAsignados)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.ResultadosNoAsignados}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'ResultadosNoAsignados',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {ResultadosNoAsignados.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Resultados Del Ejercicio  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Resultados Del Ejercicio"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Tooltip
                              placement="top-end"
                              title={
                                currency + formatNumberPrestamos(inputsValues.resultadosDelEjercicio)
                              }
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.resultadosDelEjercicio}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'resultadosDelEjercicio',
                                    e.target.value,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          </FormItem>
                        </div>
                        {(ResultadosDelEjercicioData.length
                          ? ResultadosDelEjercicioData
                          : ResultadosDelEjercicio
                        ).map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
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
                                  prefix={currency}
                                />
                              </Tooltip>
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                    </>
                  )}
                  {/** *********** TOTAL PATRIMONIO NETO  ************ */}
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
                        value="TOTAL PATRIMONIO NETO"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Tooltip
                          placement="top-end"
                          title={
                            currency + formatNumberPrestamos(inputsValues.totPatNeto)
                          }
                        >
                          <Input
                            className="w-[130px]"
                            type="text"
                            value={inputsValues.totPatNeto}
                            onChange={(e) =>
                              handleChangeInputs('totPatNeto', e.target.value)
                            }
                            disabled
                            name="initial"
                            prefix={currency || '$'}
                          />
                        </Tooltip>
                      </FormItem>
                    </div>
                    {totalPatrimonioNeto.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
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
                              prefix={currency}
                            />
                          </Tooltip>
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}

                  <span className="block  pl-3  mb-3 ">
                    Total Patrimonio Neto + Pasivo
                  </span>
                  {/** *********** TOTAL PN + PASIVO  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div
                      className="iconDesplegable"
                      onClick={() => playAccordion(2)}
                    />

                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-blue-100"
                        value="TOTAL PN + PASIVO"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Tooltip
                          placement="top-end"
                          title={
                            currency + formatNumberPrestamos(inputsValues.totPnYPasivo)
                          }
                        >
                          <Input
                            className="w-[130px]"
                            type="text"
                            value={inputsValues.totPnYPasivo}
                            onChange={(e) =>
                              handleChangeInputs('totPnYPasivo', e.target.value)
                            }
                            disabled
                            name="initial"
                            prefix={currency || '$'}
                          />
                        </Tooltip>
                      </FormItem>
                    </div>
                    {totalPnYPasivo.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
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
                              prefix={currency}
                            />
                          </Tooltip>
                        </FormItem>
                      </div>
                    ))}
                  </div>
                </section>
              </FormContainer>

              <Button
                className="border mt-6b btnSubmitTable mt-[40px]"
                variant="solid"
                type="submit"
                onClick={submitInfoFormBalance}
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

export default TableBalance;
