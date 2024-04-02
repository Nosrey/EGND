/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Tooltip,
} from 'components/ui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import { createCashflowIndirecto, getCashflowIndirectoInfo, getUser } from 'services/Requests';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import MySpinner from 'components/shared/loaders/MySpinner';
import { calcAmortizaciones, calcFinanciacionDeTerceros, calcInteresesPagadosPorAnio, calcInversiones, multiplicacionPxQCapex, calcularCreditosPorVentas, calcularBienesDeCambio, calcularbienesDeUso, calcularDeudasComerciales, calcularDeudasFiscales, calcularResultadosNoAsignados, calcularEquity, calcularPrestamos } from 'utils/calcs';
import { set } from 'lodash';

function TableBalance(props) {
    const [cebo, setCebo] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const [creditosPorVentas, setCreditosPorVentas] = useState([]);
    const [creditosFiscales, setCreditosFiscales] = useState([]);
    const [bienesDeCambio, setBienesDeCambio] = useState([]);
    const [bienesDeUso, setBienesDeUso] = useState([]);
    const [cajaYBancos, setCajaYBancos] = useState([]);
    const [totActivo, setTotActivo] = useState([]);

    const [deudasComerciales, setDeudasComerciales] = useState([]);
    const [deudasFiscales, setDeudasFiscales] = useState([]);
    const [deudasFinancieras, setDeudasFinancieras] = useState([]);
    const [otrasDeudas, setOtrasDeudas] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [totPasivo, setTotPasivo] = useState([]);

    const [Equity, setEquity] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [ResultadosNoAsignados, setResultadosNoAsignados] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [ResultadosDelEjercicio, setResultadosDelEjercicio] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [totalPatrimonioNeto, setTotalPatrimonioNeto] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [totalPnYPasivo, setTotalPnYPasivo] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    const [updateBienesDeCambio, setUpdateBienesDeCambio] = useState(true);
    const [timeoutId, setTimeoutId] = useState(null);

    const currentState = useSelector((state) => state.auth.user);
    const ResultadosDelEjercicioData = useSelector((state) => state.netoResult[0]);

    const IIGG = useSelector((state) => state.tableBalanceResult);
    const cajaYBancosAlCierre = useSelector((state) => state.tableBalanceCajaCierre);
    const prestamos = useSelector((state) => state.tableBalancePrestamos);

    // ***************** INPUTS ANIO 0 ******************
    const [inputsValues, setinputsValues] = useState({
        cajaYBancos: "0",
        creditosPorVentas: "0",
        creditosFiscales: "0",
        BienesDeCambio: "0",
        BienesDeUso: "0",
        totActivo: "0",
        deudasComerciales: "0",
        deudasFiscales: "0",
        deudasFinancieras: "0",
        otrasDeudas: "0",
        totPasivo: "0",
        equity: "0",
        ResultadosNoAsignados: "0",
        resultadosDelEjercicio: "0",
        totPatNeto: "0",
        totPnYPasivo: "0",
    });

    const handleChangeInputs = (key, value) => {
        const copy = { ...inputsValues }
        if (value.startsWith("0") && value.length > 1) {
            value = value.slice(1);
        }
        copy[key] = value;
        const valorTotActivo = parseInt(copy.BienesDeCambio) + parseInt(copy.BienesDeUso) + parseInt(copy.creditosFiscales) + parseInt(copy.creditosPorVentas) - parseInt(copy.cajaYBancos)
        copy.totActivo = Number.isNaN(valorTotActivo) ? "0" : valorTotActivo.toString();

        //    const valorFFinanciacion = parseInt(copy.financiacion) - parseInt(copy.pagoPrestamos)
        //    copy.FEfinanciacion = Number.isNaN(valorFFinanciacion) ? "0" : valorFFinanciacion.toString();

        //    const varCyB = parseInt(copy.FEfinanciacion) + parseInt(copy.FEOperativas)+ parseInt(copy.inversiones)
        //    copy.variacionCajaYBco = Number.isNaN(varCyB) ? "0" : varCyB.toString();

        //    const CyB = parseInt(copy.variacionCajaYBco) + parseInt(copy.cajaYBancos)
        //    copy.cajaYBancosAlCierre = Number.isNaN(CyB) ? "0" : CyB.toString();
        setinputsValues(copy)
    }

    // ***************** ACORDION ******************

    const [hiddenItems, setHiddenItems] = useState([true, true, true]);
    const [allOpen, setAllOpen] = useState(false);

    const playAccordion = (index) => {
        const copy = [...hiddenItems]
        copy[index] = !copy[index]
        setHiddenItems(copy)
    }

    const closeAll = () => {
        setHiddenItems([true, true]);
        setAllOpen(false)
    }

    const openAll = () => {
        setHiddenItems([false, false])
        setAllOpen(true)
    }

    useEffect(() => {
        if (hiddenItems) {
            let todasSonTrue = hiddenItems.every(valor => valor === true);
            let todasSonFalse = hiddenItems.every(valor => valor === false);

            if (todasSonTrue) {
                setAllOpen(false)
            }
            if (todasSonFalse) {
                setAllOpen(true)
            }
        }

    }, [hiddenItems]);
    // **********************************************
    // **********************************************

    const currency = useSelector((state) => state.auth.user.currency);

    function handleBienesDeCambio(value) {
        handleChangeInputs('BienesDeCambio', value)
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setTimeoutId(setTimeout(() => {
            setUpdateBienesDeCambio(true)
        }, 3000))
    }

    useEffect(() => {
        setCajaYBancos(props.cajaYBancos)
        //    setCreditosPorVentas(props.creditosPorVentas)
        setCreditosFiscales(props.creditosFiscales)
        //    setBienesDeCambio(props.bienesDeCambio)
        // setBienesDeUso(props.bienesDeUso)

    }, [props]);

    useEffect(() => {
        if (updateBienesDeCambio && Array.isArray(IIGG) && IIGG.length > 1 && Array.isArray(cajaYBancosAlCierre) && cajaYBancosAlCierre.length > 1) {
            setTimeout(() => {
                const fetchData = async () => {
                    try {
                        const data = await getUser(currentState.id);
                        let dataCopy = JSON.parse(JSON.stringify(data))
                        let dataCopy2 = JSON.parse(JSON.stringify(data))
                        let ivasDF = await calcularCreditosPorVentas(dataCopy, creditosPorVentas, setCreditosPorVentas)

                        await calcularBienesDeCambio(data, setBienesDeCambio, inputsValues.BienesDeCambio)
                        let ivasCF = await calcularDeudasComerciales(data, setDeudasComerciales)
                        await calcularDeudasFiscales(ivasDF, ivasCF, dataCopy2, IIGG, setDeudasFiscales, setCebo)
                        await calcularEquity(cajaYBancosAlCierre, setEquity, ResultadosDelEjercicioData, ResultadosNoAsignados, setTotalPatrimonioNeto, setCebo)
                        await calcularPrestamos(prestamos, setDeudasFinancieras, setShowLoader)
                    } catch (error) {
                        console.error(error);
                    }
                };
                fetchData();
                // setTimeout(() => {
                //     setUpdateBienesDeCambio(false)
                // }, 1000)
                // de seg y medio
            }, 1500)
        }
    }, [updateBienesDeCambio, IIGG, inputsValues.BienesDeCambio]);

    // un useEffect que reacciona si se editan algunas de las Deudas Comerciales Deudas Fiscales Deudas Financieras y Otras Deudas y suma el total del pasivo
    useEffect(() => {
        if (deudasComerciales && deudasFiscales && deudasFinancieras && otrasDeudas) {
            // console.log a los 4 con su nombre y valor
            console.log('deudasComerciales', deudasComerciales, 'deudasFiscales', deudasFiscales, 'deudasFinancieras', deudasFinancieras, 'otrasDeudas', otrasDeudas)

            let resultado = [];
            for (let i = 0; i < 10; i++) {
                resultado.push((deudasComerciales[i] + deudasFiscales[i] + deudasFinancieras[i] + otrasDeudas[i]))
            }
            setTotPasivo(resultado)
            // seteo inputsValues.totPasivo
            let copy = { ...inputsValues }
            copy.totPasivo = Number(copy.deudasComerciales) + Number(copy.deudasFiscales) + Number(copy.deudasFinancieras) + Number(copy.otrasDeudas)
            setinputsValues(copy)
        }
    }, [deudasComerciales, deudasFiscales, deudasFinancieras, otrasDeudas, inputsValues.deudasComerciales, inputsValues.deudasFiscales, inputsValues.deudasFinancieras, inputsValues.otrasDeudas]);

    useEffect(() => {
        getUser(currentState.id)
            .then((data) => {
                // setTimeout(() => {
                //     setShowLoader(false)
                // }, 4000);
                calcularCreditosPorVentas(data, creditosPorVentas, setCreditosPorVentas)

                // let ivasCF = calcularDeudasComerciales(data, setDeudasComerciales)
                // calcularCreditosPorVentas(currentState.id, creditosPorVentas, setCreditosPorVentas)

                calcularbienesDeUso(data, setBienesDeUso)
            })
            .catch((error) => console.error(error));

    }, []);

    // un useEffect que reacciona si cambia totalPatrimonioNeto y totPasivo y suma el total del pasivo y patrimonio neto en totalPnYPasivo
    useEffect(() => {
        if (totalPatrimonioNeto && totPasivo) {
            let resultado = [];
            for (let i = 0; i < 10; i++) {
                resultado.push((totalPatrimonioNeto[i] + totPasivo[i]))
            }
            setTotalPnYPasivo(resultado)
        }
        if (inputsValues.totPatNeto && inputsValues.totPasivo) {
            let copy = { ...inputsValues }
            copy.totPnYPasivo = Number(copy.totPatNeto) + Number(copy.totPasivo)
            setinputsValues(copy)
        }
    }, [totalPatrimonioNeto, totPasivo, inputsValues.totPatNeto, inputsValues.totPasivo]);

    // un useEffect que reacciona si cambia inputValues.equity, inputsValues.ResultadosNoAsignados y inputsValues.resultadosDelEjercicio y suma el total del patrimonio neto en inputsValues.totPatNeto
    useEffect(() => {
        if (inputsValues.equity && inputsValues.ResultadosNoAsignados && inputsValues.resultadosDelEjercicio) {
            let copy = { ...inputsValues }
            copy.totPatNeto = Number(copy.equity) + Number(copy.ResultadosNoAsignados) + Number(copy.resultadosDelEjercicio)
            setinputsValues(copy)
        }
    }, [inputsValues.equity, inputsValues.ResultadosNoAsignados, inputsValues.resultadosDelEjercicio]);

    useEffect(() => {
        setTimeout(() => {
            if (ResultadosDelEjercicioData?.length) {
                calcularResultadosNoAsignados(inputsValues.ResultadosNoAsignados, inputsValues.resultadosDelEjercicio, ResultadosDelEjercicioData, setResultadosNoAsignados)
            }
        }, 1500)
    }, [inputsValues.ResultadosNoAsignados, inputsValues.resultadosDelEjercicio, ResultadosDelEjercicioData]);

    useEffect(() => {
        if (cajaYBancos && creditosPorVentas && creditosFiscales && bienesDeCambio && bienesDeUso) {
            let resultado = [];
            for (let i = 0; i < 10; i++) {
                resultado.push((bienesDeUso[i] + creditosPorVentas[i] + creditosFiscales[i] + bienesDeCambio[i]) + cajaYBancos[i])

            }
            setTotActivo(resultado)
        }

    }, [cajaYBancos, creditosPorVentas, creditosFiscales, bienesDeCambio, bienesDeUso]);

    const submitInfoFormBalance = () => {
        const value = { ...inputsValues, idUser: localStorage.getItem('userId') }
        console.log(value)
        // delete value.bienesDeCambio;
        // delete value.creditosVentas;
        // delete value.deudasComerciales;
        // createCashflowIndirecto(value).then((resp) =>{
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //     props.showAlertSuces(true);
        //     setTimeout(() => {
        //       props.showAlertSuces(false);
        //     }, 5000);
        // }).catch ((error) => {
        //     console.error(error)
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //     props.showAlertError(true);
        //     setTimeout(() => {
        //       props.showAlertError(false);
        //     }, 5000);
        // })
    }

    // useEffect(() => {
    //     setShowLoader(false);
    //     // getCashflowIndirectoInfo(currentState.id)
    //     //   .then((data) => {
    //     //     console.log(data)
    //     //     if (data.length !==0) {
    //     //         setinputsValues(data[0])
    //     //     } 

    //     //   })
    //     //   .catch((error) => console.error(error));
    // }, []);

    return (<>
        {showLoader ? (
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }} >
                <MySpinner />

            </div>
        ) : (
            <>
                {
                    <>
                        <FormContainer>
                            <div className='flex justify-end mt-[0px] mb-[10px]'>
                                {allOpen ?
                                    <span className='cursor-pointer text-blue-700 text-sm' onClick={closeAll}> Cerrar Todos</span>
                                    :
                                    <span className='cursor-pointer text-blue-700 text-sm' onClick={openAll}> Abrir Todos</span>}
                            </div>
                            <section className="contenedor pl-[25px] pr-[35px]">



                                <div className='linea' />
                                <span className="block  pl-3  mb-3 ">Activo</span>
                                {!hiddenItems[0] && <>
                                    {/** *********** Caja y bancos  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[49px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Caja y bancos - inicio de periodo'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >
                                            <div className="titleRow w-[130px]">
                                                <p className="cursor-default"> Año 0</p>
                                            </div>
                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.cajaYBancos}
                                                    onChange={(e) => handleChangeInputs('cajaYBancos', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {isNaN(cajaYBancos[0]) ? [] : cajaYBancos.map((año, indexYear) => {
                                            return (
                                                <div className="flex flex-col" key={indexYear}>
                                                    <div className="titleRow w-[130px]">
                                                        <p className="cursor-default"> Año {indexYear + 1}</p>
                                                    </div>
                                                    <FormItem
                                                        className="mb-0"
                                                    >
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
                                                                    prefix={currency}

                                                                />
                                                            </Tooltip>
                                                        ) : (
                                                            <Input
                                                                className="w-[130px]"
                                                                type="text"
                                                                value={formatNumberPrestamos(año)}
                                                                name="year"
                                                                prefix={currency}
                                                                disabled

                                                            />
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                    {/** *********** Créditos por Ventas  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Créditos por Ventas'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.creditosPorVentas}
                                                    onChange={(e) => handleChangeInputs('creditosPorVentas', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {creditosPorVentas.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                    {/** *********** Créditos Fiscales  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Créditos Fiscales'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.creditosFiscales}
                                                    onChange={(e) => handleChangeInputs('creditosFiscales', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {isNaN(creditosFiscales[0]) ? [] : creditosFiscales.map((año, indexYear) => {
                                            return (
                                                <div className="flex flex-col" key={indexYear}>
                                                    <FormItem
                                                        className="mb-0"
                                                    >
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
                                                                    prefix={currency}

                                                                />
                                                            </Tooltip>
                                                        ) : (
                                                            <Input
                                                                className="w-[130px]"
                                                                type="text"
                                                                value={formatNumberPrestamos(año)}
                                                                name="year"
                                                                prefix={currency}
                                                                disabled
                                                            />
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                    {/** *********** Bienes de Cambio  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Bienes de Cambio'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.BienesDeCambio}
                                                    onChange={(e) => handleBienesDeCambio(e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {bienesDeCambio.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}
                                    {/** *********** Bienes de Uso  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Bienes de Uso'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.BienesDeUso}
                                                    onChange={(e) => handleChangeInputs('BienesDeUso', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {bienesDeUso.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                </>}
                                {/** *********** TOTAL ACTIVO  ************ */}
                                <div
                                    className="flex  gap-x-3 gap-y-3  mb-6 "
                                >
                                    <div className='iconDesplegable' onClick={() => playAccordion(0)}>
                                        {hiddenItems[0] ? <CiCirclePlus /> : <CiCircleMinus />}
                                    </div>
                                    <FormItem className=" mb-1 w-[240px] ">
                                        <Input
                                            disabled
                                            type="text"
                                            className="capitalize font-bold bg-blue-100"
                                            value='TOTAL ACTIVO'
                                        />
                                    </FormItem>
                                    <div className="flex flex-col" >

                                        <FormItem
                                            className="mb-0"
                                        >
                                            <Input
                                                className="w-[130px]"
                                                type="text"
                                                value={inputsValues.totActivo}
                                                onChange={(e) => handleChangeInputs('totActivo', e.target.value)}
                                                name="initial"
                                                disabled
                                                prefix={currency}

                                            />
                                        </FormItem>
                                    </div>

                                    {isNaN(totActivo[0]) ? [] : totActivo.map((año, indexYear) => {
                                        return (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}
                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px] font-bold "
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            disabled
                                                            prefix={currency}
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        )
                                    })}
                                </div>
                                {/** *********** ****************  ************ */}


                                <span className="block  pl-3  mb-3 ">Pasivo</span>
                                {!hiddenItems[1] && <>
                                    {/** *********** Deudas Comerciales  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Deudas Comerciales'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >
                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.deudasComerciales}
                                                    onChange={(e) => handleChangeInputs('deudasComerciales', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {deudasComerciales.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled

                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                    {/** *********** Deudas Fiscales  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Deudas Fiscales'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.deudasFiscales}
                                                    onChange={(e) => handleChangeInputs('deudasFiscales', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {deudasFiscales.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                    {/** *********** Deudas Financieras  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Deudas Financieras'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.deudasFinancieras}
                                                    onChange={(e) => handleChangeInputs('deudasFinancieras', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {deudasFinancieras.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                    {/** *********** Otras Deudas  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Otras Deudas'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.otrasDeudas}
                                                    onChange={(e) => handleChangeInputs('otrasDeudas', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {otrasDeudas.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                </>}
                                {/** *********** TOTAL PASIVO  ************ */}
                                <div
                                    className="flex  gap-x-3 gap-y-3  mb-6 "
                                >
                                    <div className='iconDesplegable' onClick={() => playAccordion(1)}>
                                        {hiddenItems[1] ? <CiCirclePlus /> : <CiCircleMinus />}
                                    </div>
                                    <FormItem className=" mb-1 w-[240px] ">
                                        <Input
                                            disabled
                                            type="text"
                                            className="capitalize font-bold bg-blue-100"
                                            value='TOTAL PASIVO'
                                        />
                                    </FormItem>
                                    <div className="flex flex-col" >

                                        <FormItem
                                            className="mb-0"
                                        >
                                            <Input
                                                className="w-[130px]"
                                                type="text"
                                                value={inputsValues.totPasivo}
                                                onChange={(e) => handleChangeInputs('totPasivo', e.target.value)}
                                                name="initial"
                                                disabled
                                                prefix={currency}

                                            />
                                        </FormItem>
                                    </div>
                                    {totPasivo.map((año, indexYear) => (
                                        <div className="flex flex-col" key={indexYear}>
                                            <FormItem
                                                className="mb-0"
                                            >
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
                                                            prefix={currency}
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <Input
                                                        className="w-[130px] font-bold "
                                                        type="text"
                                                        value={formatNumberPrestamos(año)}
                                                        name="year"
                                                        disabled
                                                        prefix={currency}
                                                    />
                                                )}
                                            </FormItem>
                                        </div>
                                    ))}
                                </div>
                                {/** *********** ****************  ************ */}

                                {/** *********** PATRIMONIO NETO  ************ */}

                                <span className="block  pl-3  mb-3 ">Patrimonio Neto</span>
                                {!hiddenItems[2] && <>
                                    {/** *********** Equity  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Equity'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >
                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.equity}
                                                    onChange={(e) => handleChangeInputs('equity', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {Equity.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled

                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                    {/** *********** Resultados No Asignados  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Resultados No Asignados'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.ResultadosNoAsignados}
                                                    onChange={(e) => handleChangeInputs('ResultadosNoAsignados', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {ResultadosNoAsignados.map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}

                                    {/** *********** Resultados Del Ejercicio  ************ */}
                                    <div
                                        className="flex  gap-x-3 gap-y-3  mb-6 "
                                    >
                                        <div className='iconDesplegable' />
                                        <FormItem className=" mb-1 w-[240px] mt-[0px]">
                                            <Input
                                                disabled
                                                type="text"
                                                className="capitalize"
                                                value='Resultados Del Ejercicio'
                                            />
                                        </FormItem>
                                        <div className="flex flex-col" >

                                            <FormItem
                                                className="mb-0"
                                            >
                                                <Input
                                                    className="w-[130px]"
                                                    type="text"
                                                    value={inputsValues.resultadosDelEjercicio}
                                                    onChange={(e) => handleChangeInputs('resultadosDelEjercicio', e.target.value)}
                                                    name="initial"
                                                    prefix='$'

                                                />
                                            </FormItem>
                                        </div>
                                        {(ResultadosDelEjercicioData.length ? ResultadosDelEjercicioData : ResultadosDelEjercicio).map((año, indexYear) => (
                                            <div className="flex flex-col" key={indexYear}>
                                                <FormItem
                                                    className="mb-0"
                                                >
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
                                                                prefix={currency}

                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Input
                                                            className="w-[130px]"
                                                            type="text"
                                                            value={formatNumberPrestamos(año)}
                                                            name="year"
                                                            prefix={currency}
                                                            disabled
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>
                                        ))}
                                    </div>
                                    {/** *********** ****************  ************ */}


                                </>}
                                {/** *********** TOTAL PATRIMONIO NETO  ************ */}
                                <div
                                    className="flex  gap-x-3 gap-y-3  mb-6 "
                                >
                                    <div className='iconDesplegable' onClick={() => playAccordion(2)}>
                                        {hiddenItems[2] ? <CiCirclePlus /> : <CiCircleMinus />}
                                    </div>
                                    <FormItem className=" mb-1 w-[240px] ">
                                        <Input
                                            disabled
                                            type="text"
                                            className="capitalize font-bold bg-blue-100"
                                            value='TOTAL PATRIMONIO NETO'
                                        />
                                    </FormItem>
                                    <div className="flex flex-col" >

                                        <FormItem
                                            className="mb-0"
                                        >
                                            <Input
                                                className="w-[130px]"
                                                type="text"
                                                value={inputsValues.totPatNeto}
                                                onChange={(e) => handleChangeInputs('totPatNeto', e.target.value)}
                                                name="initial"
                                                disabled
                                                prefix={currency}

                                            />
                                        </FormItem>
                                    </div>
                                    {totalPatrimonioNeto.map((año, indexYear) => (
                                        <div className="flex flex-col" key={indexYear}>
                                            <FormItem
                                                className="mb-0"
                                            >
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
                                                            prefix={currency}
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <Input
                                                        className="w-[130px] font-bold "
                                                        type="text"
                                                        value={formatNumberPrestamos(año)}
                                                        name="year"
                                                        disabled
                                                        prefix={currency}
                                                    />
                                                )}
                                            </FormItem>
                                        </div>
                                    ))}
                                </div>
                                {/** *********** ****************  ************ */}



                                <span className="block  pl-3  mb-3 ">Total patrimonio neto + pasivo</span>
                                {/** *********** TOTAL PN + PASIVO  ************ */}
                                <div
                                    className="flex  gap-x-3 gap-y-3  mb-6 "
                                >
                                    <div className='iconDesplegable' onClick={() => playAccordion(2)}>

                                    </div>
                                    <FormItem className=" mb-1 w-[240px] ">
                                        <Input
                                            disabled
                                            type="text"
                                            className="capitalize font-bold bg-blue-100"
                                            value='TOTAL PN + PASIVO'
                                        />
                                    </FormItem>
                                    <div className="flex flex-col" >

                                        <FormItem
                                            className="mb-0"
                                        >
                                            <Input
                                                className="w-[130px]"
                                                type="text"
                                                value={inputsValues.totPnYPasivo}
                                                onChange={(e) => handleChangeInputs('totPnYPasivo', e.target.value)}
                                                name="initial"
                                                disabled
                                                prefix={currency}

                                            />
                                        </FormItem>
                                    </div>
                                    {totalPnYPasivo.map((año, indexYear) => (
                                        <div className="flex flex-col" key={indexYear}>
                                            <FormItem
                                                className="mb-0"
                                            >
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
                                                            prefix={currency}
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <Input
                                                        className="w-[130px] font-bold "
                                                        type="text"
                                                        value={formatNumberPrestamos(año)}
                                                        name="year"
                                                        disabled
                                                        prefix={currency}
                                                    />
                                                )}
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
        )
        }
    </>)
}

export default TableBalance;
