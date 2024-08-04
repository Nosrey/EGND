/* eslint-disable jsx-a11y/no-static-element-interactions */
import MySpinner from 'components/shared/loaders/MySpinner';
import { Button, FormContainer, FormItem, Input, Tooltip } from 'components/ui';
import { createContext, useEffect, useState } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { createPyL, getPyLInfo } from 'services/Requests';
import { addResult } from 'store/netoResult/netoResultSlice';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import { addIIGG } from 'store/tableBalanceResult/tableBalanceResultSlice';
import PyLInputComponent from './PyLInputComponent';

const impGanancias = 20;
function TablePyL(props) {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);
  // const MiContexto = createContext();

  const [vtasTot, setVtasTot] = useState([]);
  const [vtasProd, setVtasProd] = useState([]);
  const [vtasServ, setVtasServ] = useState([]);
  const [costoProd, setCostoProd] = useState([]);
  const [costoServ, setCostoServ] = useState([]);
  const [costoProduccionTotal, setCostoProduccionTotal] = useState([]);
  const [costoComision, setCostoComision] = useState([]);
  const [costoImpuesto, setCostoImpuesto] = useState([]);
  const [costoCargos, setCostoCargos] = useState([]);
  const [costoComerciales, setCostoComerciales] = useState([]);
  const [costoTotales, setCostoTotales] = useState([]);
  const [MBPesos, setMBPesos] = useState([]);
  const [MBPorcentaje, setMBPorcentaje] = useState([]);
  const [ctasListado, setCtasListado] = useState([]);
  const [gastoEnCtas, setGastoEnCtas] = useState([]);
  const [gastoEnCtasTotal, setGastoEnCtasTotal] = useState([]);
  const [EBITDA, setEBITDA] = useState([]);
  const [EBITDAPorcentaje, setEBITDAPorcentaje] = useState([]);
  const [amortizaciones, setAmortizaciones] = useState([]);
  const [EBIT, setEBIT] = useState([]);
  const [EBITPorcentaje, setEBITPorcentaje] = useState([]);
  const [intereses, setIntereses] = useState([]);
  const [BAT, setBAT] = useState([]);
  const [IIGG, setIIGG] = useState([]);
  const [rdoNeto, setRdoNeto] = useState([]);
  const [RNPorcentaje, setRNPorcentaje] = useState([]);
  const [prueba, setPrueba] = useState();
  const currentState = useSelector((state) => state.auth.user);

  // ***************** INPUTS ANIO 0 ******************
  const [inputsValues, setinputsValues] = useState({
    vtasTot: '0',
    vtasProd: '0',
    vtasServ: '0',
    costoProd: '0',
    costoServ: '0',
    costoProduccionTotal: '0',
    costoComision: '0',
    costoImpuesto: '0',
    costoCargos: '0',
    costoComerciales: '0',
    costoTotales: '0',
    MBPesos: '0',
    MBPorcentaje: '0',
    ctasListado: '0',
    gastoEnCtas: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    gastoEnCtasTotal: '0',
    EBITDA: '0',
    EBITDAPorcentaje: '0',
    amortizaciones: '0',
    EBIT: '0',
    EBITPorcentaje: '0',
    intereses: '0',
    BAT: '0',
    IIGG: '0',
    rdoNeto: '0',
    RNPorcentaje: '0',
  });

  function convertirAEntero(value) {
    const numValue = parseFloat(value)
    if (Number.isNaN(numValue)) {
      return 0;
    }
    return parseInt(value);
  }

  const handleChangeInputs = (key, value, indexCta) => {
    let copy = { ...inputsValues };
    if (value?.startsWith('0')) {
      value = value.slice(1);
    }

    if (key === 'gastoEnCtas') {
      copy.gastoEnCtas[indexCta] = value;
    } else if (key !== null) {
      copy[key] = value;
    }

    // setearemos para que total ventas siempre equivalga a la suma de ventas de productos y servicios en cada ejecucion de la funcion
    copy.vtasTot = (
      convertirAEntero(copy.vtasProd) + convertirAEntero(copy.vtasServ)
    ).toString();

    // igual para costoProduccionTotal
    copy.costoProduccionTotal = (
      convertirAEntero(copy.costoProd) + convertirAEntero(copy.costoServ)
    )

    // igual para costoComerciales
    copy.costoComerciales = (
      convertirAEntero(copy.costoImpuesto) + convertirAEntero(copy.costoComision) + convertirAEntero(copy.costoCargos)
    )

    // igual para costoTotales
    copy.costoTotales = (
      convertirAEntero(copy.costoProduccionTotal) + convertirAEntero(copy.costoComerciales)
    )

    // igual para gastoEnCtasTotal pero sumaré desde remuneraciones hasta marketing
    let sum = 0;
    for (let i = 0; i < gastoEnCtas.length; i++) {
      sum += convertirAEntero(copy.gastoEnCtas[i]);
    }
    copy.gastoEnCtasTotal = sum;

    // ahora configuramos para setear el .BAT
    copy.BAT = (
      convertirAEntero(copy.EBIT) - convertirAEntero(copy.intereses)
    ).toString();

    // ahora configuramos para setear el .IIGG
    copy.IIGG = (
      convertirAEntero(copy.BAT) * impGanancias / 100
    ).toString();

    // ahora configuramos para setear .rdoNeto
    copy.rdoNeto = (
      convertirAEntero(copy.BAT) - convertirAEntero(copy.IIGG)
    ).toString();

    // seteamos RNPorcentaje}
    if (convertirAEntero(copy.vtasTot) === 0) {
      copy.RNPorcentaje = (
        convertirAEntero(copy.rdoNeto) / 1 * 100
      )
    }
    else {
      copy.RNPorcentaje = (
        convertirAEntero(copy.rdoNeto) / convertirAEntero(copy.vtasTot) * 100
      ).toString();
    }

    setinputsValues(copy);
  };

  // **********************************************

  // ***************** ACORDION ******************

  const [hiddenItems, setHiddenItems] = useState([true, true, true, true]);
  const [allOpen, setAllOpen] = useState(false);

  const currency = useSelector((state) => state.auth.user.currency);

  const playAccordion = (index) => {
    const copy = [...hiddenItems];
    copy[index] = !copy[index];
    setHiddenItems(copy);
  };

  const closeAll = () => {
    setHiddenItems([true, true, true, true]);
    setAllOpen(false);
  };

  const openAll = () => {
    setHiddenItems([false, false, false, false]);
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
  // **********************************************

  useEffect(() => {
    setVtasTot(props.vtasTot);
    setVtasProd(props.vtasProd);
    setVtasServ(props.vtasServ);
    setCostoProd(props.costoProd);
    setCostoServ(props.costoServ);
    setCostoProduccionTotal(props.costoProduccionTotal);
    setCostoComision(props.costoComision);
    setCostoImpuesto(props.costoImpuesto);
    setCostoCargos(props.costoCargos);
    setCostoComerciales(props.costoComerciales);
    setCostoTotales(props.costoTotales);
    setMBPesos(props.mbPesos);
    setMBPorcentaje(props.mbPorcentaje);
    setGastoEnCtas(props.gastoEnCtas);
    setCtasListado(props.ctasListado);
    setAmortizaciones(props.amortizaciones);
    setIntereses(props.intereses);
  }, [props]);

  useEffect(() => {
    if (gastoEnCtas) {
      const arrayGastosCtasTotales = [];
      for (let j = 0; j < 10; j++) {
        let sum = 0;
        for (let i = 0; i < gastoEnCtas.length; i++) {
          sum += gastoEnCtas[i][j];
        }
        arrayGastosCtasTotales.push(Number.isNaN(sum) ? 0 : sum);
      }
      setGastoEnCtasTotal(arrayGastosCtasTotales);
    }
  }, [gastoEnCtas]);

  useEffect(() => {
    if (gastoEnCtasTotal && MBPesos) {
      let resultado = [];
      for (let i = 0; i < MBPesos.length; i++) {
        resultado.push(MBPesos[i] - gastoEnCtasTotal[i]);
      }

      setEBITDA(resultado);
    }
  }, [gastoEnCtasTotal, MBPesos]);

  useEffect(() => {
    if (EBITDA) {
      let resultado = [];
      for (let i = 0; i < EBITDA.length; i++) {
        resultado.push(
          Number.isNaN(EBITDA[i] / vtasTot[i]) ||
            !Number.isFinite(EBITDA[i] / vtasTot[i])
            ? 0
            : (EBITDA[i] / vtasTot[i]) * 100,
        );
      }
      setEBITDAPorcentaje(resultado);
    }
  }, [EBITDA]);

  useEffect(() => {
    if (EBITDA && amortizaciones) {
      let resultado = [];
      for (let i = 0; i < EBITDA.length; i++) {
        resultado.push(
          Number.isNaN(EBITDA[i] - amortizaciones[i])
            ? 0
            : EBITDA[i] - amortizaciones[i],
        );
      }
      setEBIT(resultado);
    }
    if (amortizaciones) {
      if (props?.setAmortizacionesExterior) {
        props?.setAmortizacionesExterior(amortizaciones)
      }
    }
  }, [EBITDA, amortizaciones]);

  useEffect(() => {
    if (EBIT) {
      let resultado = [];
      for (let i = 0; i < EBIT.length; i++) {
        resultado.push(EBIT[i] / vtasTot[i]);
      }
      setEBITPorcentaje(resultado);
    }
  }, [EBIT]);

  useEffect(() => {
    if (EBIT && intereses) {
      let resultado = [];
      for (let i = 0; i < EBIT.length; i++) {
        resultado.push(
          Number.isNaN(EBIT[i] - intereses[i]) ? 0 : EBIT[i] - intereses[i],
        );
      }
      setBAT(resultado);
    }
    if (intereses) {
      if (props?.setInteresesExterior) {
        props?.setInteresesExterior(intereses)
      }
    }
  }, [EBIT, intereses]);

  useEffect(() => {
    if (BAT && impGanancias) {
      let resultado = [];
      for (let i = 0; i < BAT.length; i++) {
        const batParticular = BAT[i];
        const valor =
          batParticular > 0 ? (batParticular * impGanancias) / 100 : 0;
        resultado.push(valor);
      }
      setIIGG(resultado);
      dispatch(addIIGG(resultado));
    }
  }, [BAT]);


  useEffect(() => {
    if (BAT && IIGG) {
      let resultado = [];
      for (let i = 0; i < BAT.length; i++) {
        resultado.push(BAT[i] - IIGG[i]);
      }
      setRdoNeto(resultado);
      dispatch(addResult([resultado]));
    }
  }, [IIGG, BAT]);

  useEffect(() => {
    if (rdoNeto && vtasTot) {
      let resultado = [];
      for (let i = 0; i < rdoNeto.length; i++) {
        resultado.push(
          Number.isNaN(rdoNeto[i] / vtasTot[i]) ||
            !Number.isFinite(rdoNeto[i] / vtasTot[i])
            ? 0
            : rdoNeto[i] / vtasTot[i],
        );
      }
      setRNPorcentaje(resultado);
      setTimeout(() => {
        setShowLoader(false);
      }, 4000);
    }
  }, [rdoNeto, vtasTot]);

  useEffect(() => {
    if (
      MBPorcentaje.map((año) => parseFloat(año.toFixed(2))) !==
      props?.mbPorcentaje
    ) {
      props.setCmgbruta(MBPorcentaje.map((año) => parseFloat(año.toFixed(2))));
    }
  }, [MBPorcentaje]);

  useEffect(() => {
    if (
      EBITDAPorcentaje.map((año) => parseFloat(año.toFixed(2))) !==
      props?.ebitda
    ) {
      props.setEbitda(
        EBITDAPorcentaje.map((año) => parseFloat(año.toFixed(2))),
      );
    }
  }, [EBITDAPorcentaje]);

  useEffect(() => {
    if (
      EBITPorcentaje.map((año) => parseFloat(año.toFixed(2)) !== props?.ebit)
    ) {
      props.setEbit(EBITPorcentaje.map((año) => parseFloat(año.toFixed(2))));
    }
  }, [EBITPorcentaje]);

  useEffect(() => {
    if (
      RNPorcentaje.map((año) => parseFloat(año.toFixed(2)) !== props?.rdoNeto)
    ) {
      props.setRdoNetoValue(
        RNPorcentaje.map((año) => parseFloat(año.toFixed(2))),
      );
    }
  }, [RNPorcentaje]);

  // Resultado Neto
  useEffect(() => {
    props.setRdoNetoValue(rdoNeto.map((año) => parseFloat(año.toFixed(2))));

    // luego creo un array igual de largo que rdoNeto donde calculo el crecimiento respecto al valor anterior (por lo tanto el elemento 0 es 0) si entonces el valor 1 era 100 y el valor 2 es 200 el crecimiento es del 100%
    let crecimiento = [0];
    for (let i = 1; i < rdoNeto.length; i++) {
      // calculo el crecimiento, si el valor anterior era 100 y el actual es 300 el crecimiento es del 200%, asi que el valor que pusheare al array es 200
      crecimiento.push(
        (((rdoNeto[i] - rdoNeto[i - 1]) / rdoNeto[i - 1]) * 100).toFixed(2),
      );
    }
    props.setGrowth(crecimiento);
  }, [rdoNeto]);

  useEffect(() => {
    props.setGraph03Data([
      {
        name: 'Ventas',
        data: vtasTot.map((año) => parseFloat(año.toFixed(2))),
      },
      {
        name: 'Total Costos',
        data: costoTotales.map((año) => parseFloat(año.toFixed(2))),
      },
      {
        name: 'CMG Bruta',
        data: MBPesos.map((año) => parseFloat(año.toFixed(2))),
      },
      {
        name: 'Gastos de estructura',
        data: gastoEnCtasTotal.map((año) => parseFloat(año.toFixed(2))),
      },
      {
        name: 'EBITDA',
        data: EBITDA.map((año) => parseFloat(año.toFixed(2))),
      },
      {
        name: 'Rdo Neto',
        data: rdoNeto.map((año) => parseFloat(año.toFixed(2))),
      },
    ]);
    // eslint-disable-next-line
  }, [vtasTot, costoTotales, MBPesos, gastoEnCtasTotal, EBITDA, rdoNeto]);

  const submitInfoForm = () => {
    const value = { ...inputsValues, idUser: localStorage.getItem('userId') };
    createPyL(value)
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

  useEffect(() => {
    getPyLInfo(currentState.id)
      .then((data) => {
        if (data.length !== 0) {
          console.log('soy la data: ', data[0]);

          // reviso si existe, si es un array y lo asigno, si no es array asigno un  []
          let gastoEnCtas = data[0]?.gastoEnCtas || [];
          if (gastoEnCtas?.length <= 11) {
            while (gastoEnCtas?.length <= 11) {
              gastoEnCtas.push('0');
            }
          }
          console.log('gastoEnCtas: ', gastoEnCtas);

          let inputsEditados = {
            ...data[0],
            vtasTot: Number(data[0].vtasProd) + Number(data[0].vtasServ),
            costoTotales: Number(data[0].costoProduccionTotal) + Number(data[0].costoComerciales),
            gastoEnCtasTotal: data[0].gastoEnCtas.reduce((acc, curr) => Number(acc) + Number(curr), 0),
            gastoEnCtas: gastoEnCtas,
            rdoNeto: Number((isNaN(data[0].BAT) ? 0 : data[0].BAT) - (isNaN(data[0].IIGG) ? 0 : data[0].IIGG)),
          }

          setinputsValues(inputsEditados);
        }
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* <MiContexto.Provider value={rdoNeto}> */}
      {showLoader ? (
        <div
          style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}
        >
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
                  {!hiddenItems[0] ? (
                    <>
                      {/** *********** Ventas de Producto  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] mt-[49px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Ventas de Producto"
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
                              value={inputsValues.vtasProd}
                              onChange={(e) =>
                                handleChangeInputs('vtasProd', e.target.value)
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {vtasProd.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <div className="titleRow w-[130px]">
                              <p className="cursor-default">
                                {' '}
                                Año {indexYear + 1}
                              </p>
                            </div>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
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

                      {/** *********** Ventas de Servicio  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Ventas de Servicio"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              name="initial"
                              value={inputsValues.vtasServ}
                              onChange={(e) =>
                                handleChangeInputs('vtasServ', e.target.value)
                              }
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {vtasServ.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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
                                  disabled
                                  prefix={currency || '$'}
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                    </>
                  ) : (
                    <div className="flex  gap-x-3">
                      <div className="titleRow w-[130px] ml-[280px]">
                        <p className="cursor-default"> Año 0</p>
                      </div>
                      {vtasProd.map((año, indexYear) => (
                        <div key={indexYear} className="titleRow w-[130px]">
                          <p className="cursor-default">
                            {' '}
                            Año {indexYear + 1}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {/** *********** Ventas de TOTALES  ************ */}
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
                        value="TOTAL VENTAS"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.vtasTot}
                          onChange={(e) =>
                            handleChangeInputs('vtasTot', e.target.value)
                          }
                          disabled
                          name="initial"
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {vtasTot.map((año, indexYear) => (
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

                  {!hiddenItems[1] && (
                    <>
                      {/** *********** Costos de Producto  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Costo de Mercaderia Vendida"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.costoProd}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'costoProd',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {costoProd.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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

                      {/** *********** Costos de Servicio  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Costo Servicio Prestado"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.costoServ}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'costoServ',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {costoServ.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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
                                  disabled
                                  prefix={currency || '$'}
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Costode produccion total  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />

                        <FormItem className=" mb-1 w-[240px] ">
                          <Input
                            disabled
                            type="text"
                            className="capitalize font-bold bg-grey-100"
                            value="TOTAL Costos de producción"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.costoProduccionTotal}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'costoProduccionTotal',
                                  e.target.value,
                                )
                              }
                              disabled
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {costoProduccionTotal.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {Math.round(año).toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px] font-bold bg-blue-100"
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px] font-bold bg-blue-100"
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

                      {/** *********** Costos de Impuestos sobre ventas  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Impuestos sobre ventas"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.costoImpuesto}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'costoImpuesto',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {costoImpuesto.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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
                                  disabled
                                  prefix={currency || '$'}
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Costos de Costos comerciales  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Costos comerciales"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.costoComision}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'costoComision',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {costoComision.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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
                                  disabled
                                  prefix={currency || '$'}
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Costos de Cargos por pasarela de pago  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Cargos por pasarela de pago"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.costoCargos}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'costoCargos',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {costoCargos.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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
                                  disabled
                                  prefix={currency || '$'}
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** total de costos de comisiones  ************ */}
                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] ">
                          <Input
                            disabled
                            type="text"
                            className="capitalize font-bold bg-grey-100"
                            value="TOTAL Costos comerciales"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.costoComerciales}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'costoComerciales',
                                  e.target.value,
                                )
                              }
                              disabled
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {costoComerciales.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {Math.round(año).toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px] font-bold bg-blue-100"
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px] font-bold bg-blue-100"
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
                    </>
                  )}
                  {/** *********** Total COSTOS ************ */}
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
                        value="TOTAL COSTOS"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.costoTotales}
                          onChange={(e) =>
                            handleChangeInputs('costoTotales', e.target.value)
                          }
                          disabled
                          name="initial"
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {costoTotales.map((año, indexYear) => (
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

                  {/** *********** CMG Bruta  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div className="iconDesplegable" />
                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-grey-100"
                        value="CMG Bruta"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.MBPesos}
                          onChange={(e) =>
                            handleChangeInputs('MBPesos', e.target.value)
                          }
                          name="initial"
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {MBPesos.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold bg-blue-100"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold bg-blue-100"
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

                  {/** *********** CMG Bruta %  ************ */}
                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div className="iconDesplegable" />
                    <FormItem className=" mb-1 w-[240px]">
                      <Input
                        disabled
                        type="text"
                        className="capitalize"
                        value="CMG Bruta %"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.MBPorcentaje}
                          onChange={(e) =>
                            handleChangeInputs('MBPorcentaje', e.target.value)
                          }
                          name="initial"
                          prefix="%"
                        />
                      </FormItem>
                    </div>
                    {MBPorcentaje.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {año.toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={`%${formatNumberPrestamos(año)}`}
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix="%"
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix="%"
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}
                  <div className="linea" />
                  {!hiddenItems[2] && (
                    <>
                      {/** *********** GASTO POR CUENTAS  ************ */}

                      {ctasListado.map((ctaName, indexCta) => (
                        <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                          <div className="iconDesplegable" />
                          <FormItem className=" mb-1 w-[240px]">
                            <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value={ctaName}
                            />
                          </FormItem>
                          <div className="flex flex-col">
                            <FormItem className="mb-0">
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.gastoEnCtas[indexCta]}
                                onChange={(e) =>
                                  handleChangeInputs(
                                    'gastoEnCtas',
                                    e.target.value,
                                    indexCta,
                                  )
                                }
                                name="initial"
                                prefix={currency || '$'}
                              />
                            </FormItem>
                          </div>
                          {gastoEnCtas[indexCta].map((anio, indexanio) => (
                            <div className="flex flex-col" key={indexanio}>
                              <FormItem className="mb-0">
                                {anio.toString().length > 5 ? (
                                  <Tooltip
                                    placement="top-end"
                                    title={
                                      currency + formatNumberPrestamos(anio)
                                    }
                                  >
                                    <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={formatNumberPrestamos(anio)}
                                      name="year"
                                      disabled
                                      prefix={currency || '$'}
                                    />
                                  </Tooltip>
                                ) : (
                                  <Input
                                    className="w-[130px]"
                                    type="text"
                                    value={formatNumberPrestamos(anio)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                )}
                              </FormItem>
                            </div>
                          ))}
                        </div>
                      ))}
                      {/** *********** ****************  ************ */}
                    </>
                  )}
                  {/** *********** TOTAL GASTOS ESTRUCURAS  ************ */}
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
                        value="TOTAL GASTOS ESTRUCTURA"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.gastoEnCtasTotal}
                          disabled
                          onChange={(e) =>
                            handleChangeInputs(
                              'gastoEnCtasTotal',
                              e.target.value,
                            )
                          }
                          name="initial"
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {gastoEnCtasTotal.map((año, indexYear) => (
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

                  {/** *********** EBITDA  ************ */}

                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div className="iconDesplegable" />
                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-grey-100"
                        value="EBITDA"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.EBITDA}
                          onChange={(e) =>
                            handleChangeInputs('EBITDA', e.target.value)
                          }
                          name="initial"
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {EBITDA.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold bg-blue-100"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold bg-blue-100"
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

                  {/** *********** EBITDA %  ************ */}

                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div className="iconDesplegable" />
                    <FormItem className=" mb-1 w-[240px]">
                      <Input
                        disabled
                        type="text"
                        className="capitalize"
                        value="EBITDA %"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.EBITDAPorcentaje}
                          onChange={(e) =>
                            handleChangeInputs(
                              'EBITDAPorcentaje',
                              e.target.value,
                            )
                          }
                          name="initial"
                          prefix="%"
                        />
                      </FormItem>
                    </div>
                    {EBITDAPorcentaje.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {año.toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={`%${formatNumberPrestamos(año)}`}
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix="%"
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix="%"
                            />
                          )}
                        </FormItem>
                      </div>
                    ))}
                  </div>
                  {/** *********** ****************  ************ */}
                  {!hiddenItems[3] && (
                    <>
                      {/** *********** Amortizaciones  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        {' '}
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
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
                        {amortizaciones.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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
                                  disabled
                                  prefix={currency || '$'}
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** EBIT  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] ">
                          <Input
                            disabled
                            type="text"
                            className="capitalize font-bold bg-grey-100"
                            value="EBIT"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.EBIT}
                              onChange={(e) =>
                                handleChangeInputs('EBIT', e.target.value)
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {EBIT.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {Math.round(año).toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px] font-bold bg-blue-100"
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px] font-bold bg-blue-100"
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

                      {/** *********** EBIT %  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="EBIT %"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.EBITPorcentaje}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'EBITPorcentaje',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix="%"
                            />
                          </FormItem>
                        </div>
                        {EBITPorcentaje.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={`%${formatNumberPrestamos(año)}`}
                                >
                                  <Input
                                    className="w-[130px]"
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix="%"
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px]"
                                  type="text"
                                  value={formatNumberPrestamos(año)}
                                  name="year"
                                  disabled
                                  prefix="%"
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** Intereses  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="Intereses"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.intereses}
                              onChange={(e) =>
                                handleChangeInputs(
                                  'intereses',
                                  e.target.value,
                                )
                              }
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {intereses.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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
                                  disabled
                                  prefix={currency || '$'}
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}

                      {/** *********** BAT  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px] ">
                          <Input
                            disabled
                            type="text"
                            className="capitalize font-bold bg-grey-100"
                            value="BAT"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.BAT}
                              onChange={(e) =>
                                handleChangeInputs('BAT', e.target.value)
                              }
                              disabled
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {BAT.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {Math.round(año).toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px] font-bold bg-blue-100"
                                    type="text"
                                    value={formatNumberPrestamos(año)}
                                    name="year"
                                    disabled
                                    prefix={currency || '$'}
                                  />
                                </Tooltip>
                              ) : (
                                <Input
                                  className="w-[130px] font-bold bg-blue-100"
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

                      {/** *********** IIGG  ************ */}

                      <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                        <div className="iconDesplegable" />
                        <FormItem className=" mb-1 w-[240px]">
                          <Input
                            disabled
                            type="text"
                            className="capitalize"
                            value="IIGG"
                          />
                        </FormItem>
                        <div className="flex flex-col">
                          <FormItem className="mb-0">
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={inputsValues.IIGG}
                              onChange={(e) =>
                                handleChangeInputs('IIGG', e.target.value)
                              }
                              disabled
                              name="initial"
                              prefix={currency || '$'}
                            />
                          </FormItem>
                        </div>
                        {IIGG.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                            <FormItem className="mb-0">
                              {año.toString().length > 5 ? (
                                <Tooltip
                                  placement="top-end"
                                  title={
                                    currency + formatNumberPrestamos(año)
                                  }
                                >
                                  <Input
                                    className="w-[130px]"
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
                                  disabled
                                  prefix={currency || '$'}
                                />
                              )}
                            </FormItem>
                          </div>
                        ))}
                      </div>
                      {/** *********** ****************  ************ */}
                    </>
                  )}

                  {/** *********** Resultado Neto  ************ */}

                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div
                      className="iconDesplegable"
                      onClick={() => playAccordion(3)}
                    >
                      {hiddenItems[3] ? <CiCirclePlus /> : <CiCircleMinus />}
                    </div>
                    <FormItem className=" mb-1 w-[240px] ">
                      <Input
                        disabled
                        type="text"
                        className="capitalize font-bold bg-grey-100"
                        value="Resultado Neto"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.rdoNeto}
                          onChange={(e) =>
                            handleChangeInputs('rdoNeto', e.target.value)
                          }
                          disabled
                          name="initial"
                          prefix={currency || '$'}
                        />
                      </FormItem>
                    </div>
                    {rdoNeto.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {Math.round(año).toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={currency + formatNumberPrestamos(año)}
                            >
                              <Input
                                className="w-[130px] font-bold bg-blue-100"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix={currency || '$'}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px] font-bold bg-blue-100"
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

                  {/** *********** RN %  ************ */}

                  <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                    <div className="iconDesplegable" />
                    <FormItem className=" mb-1 w-[240px]">
                      <Input
                        disabled
                        type="text"
                        className="capitalize"
                        value="RN %"
                      />
                    </FormItem>
                    <div className="flex flex-col">
                      <FormItem className="mb-0">
                        <Input
                          className="w-[130px]"
                          type="text"
                          value={inputsValues.RNPorcentaje}
                          onChange={(e) =>
                            handleChangeInputs('RNPorcentaje', e.target.value)
                          }
                          disabled
                          name="initial"
                          prefix="%"
                        />
                      </FormItem>
                    </div>
                    {RNPorcentaje.map((año, indexYear) => (
                      <div className="flex flex-col" key={indexYear}>
                        <FormItem className="mb-0">
                          {año.toString().length > 5 ? (
                            <Tooltip
                              placement="top-end"
                              title={`%${formatNumberPrestamos(año)}`}
                            >
                              <Input
                                className="w-[130px]"
                                type="text"
                                value={formatNumberPrestamos(año)}
                                name="year"
                                disabled
                                prefix="%"
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              className="w-[130px]"
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix="%"
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
                onClick={submitInfoForm}
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

export default TablePyL;
