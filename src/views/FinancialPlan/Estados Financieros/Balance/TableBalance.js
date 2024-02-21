/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Tooltip,
  } from 'components/ui';
  import { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import { createCashflowIndirecto, getCashflowIndirectoInfo, getUser } from 'services/Requests';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import MySpinner from 'components/shared/loaders/MySpinner';

import { calcAmortizaciones, calcFinanciacionDeTerceros, calcInteresesPagadosPorAnio, calcInversiones, multiplicacionPxQCapex, calcVentasPorMes, costoPorMes } from 'utils/calcs';
import { set } from 'lodash';

  function TableBalance(props) {

    const [showLoader, setShowLoader] = useState(true);
    const [creditosPorVentas, setCreditosPorVentas] = useState([]);
    const [creditosFiscales, setCreditosFiscales] = useState([]);
    const [bienesDeCambio, setBienesDeCambio] = useState([]);
    const [bienesDeUso, setBienesDeUso] = useState([]);
    const [cajaYBancos, setCajaYBancos] = useState([]);
    const [totActivo, setTotActivo] = useState([]);
    const [updateBienesDeCambio, setUpdateBienesDeCambio] = useState(true);
    const [timeoutId, setTimeoutId] = useState(null);

    const currentState = useSelector((state) => state.auth.user);

    // ***************** INPUTS ANIO 0 ******************
    const [inputsValues, setinputsValues] = useState({
        cajaYBancos: "0" ,
        creditosPorVentas: "0" ,
        creditosFiscales: "0" ,
        BienesDeCambio: "0" ,
        BienesDeUso: "0" ,
        totActivo:"0" ,
    });

   const handleChangeInputs = (key , value) => {
        const copy = {...inputsValues}
        if (value.startsWith("0") && value.length >1) {
            value = value.slice(1);
        }
        copy[key] = value;
            const valorTotActivo = parseInt(copy.BienesDeCambio) + parseInt(copy.BienesDeUso)  + parseInt(copy.creditosFiscales) + parseInt(copy.creditosPorVentas) - parseInt(copy.cajaYBancos)
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

  const [hiddenItems, setHiddenItems] = useState([true]);
  const [allOpen, setAllOpen] = useState(false);

  const playAccordion = (index) => {
      const copy = [...hiddenItems]
      copy[index] = !copy[index]
      setHiddenItems(copy)
  }
  
  const closeAll = () => {
      setHiddenItems([true]);
      setAllOpen(false)
  } 

  const openAll = () => {
      setHiddenItems([false])
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
        handleChangeInputs('BienesDeCambio' , value)
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
       setBienesDeUso(props.bienesDeUso)
        
    }, [props]);

      useEffect(() => {
        if (updateBienesDeCambio) {
            getUser(currentState.id)
            .then((data) => {
                setTimeout(() => {
                    setShowLoader(false)
                }, 4000);
            })
            .catch((error) => console.error(error));
            costoPorMes(currentState.id, setBienesDeCambio, inputsValues.BienesDeCambio)
            setUpdateBienesDeCambio(false)
        }
      }, [updateBienesDeCambio]);

      useEffect(() => {
          getUser(currentState.id)
              .then((data) => {
                  setTimeout(() => {
                      setShowLoader(false)
                  }, 4000);
              })
              .catch((error) => console.error(error));
          calcVentasPorMes(currentState.id, creditosPorVentas, setCreditosPorVentas)
      }, []);

    useEffect(() => {
        if (cajaYBancos && creditosPorVentas && creditosFiscales && bienesDeCambio && bienesDeUso) {
            let resultado = [];
            for (let i = 0; i < 10; i++) {
                resultado.push((bienesDeUso[i] + creditosPorVentas[i] + creditosFiscales[i] + bienesDeCambio[i]) + (i < 1 ? (cajaYBancos[i] * -1) : (cajaYBancos[i])))

            }
            setTotActivo(resultado)
        }

     }, [cajaYBancos , creditosPorVentas , creditosFiscales  , bienesDeCambio , bienesDeUso]);

      const submitInfoFormBalance = () => {
        const value = {...inputsValues, idUser:localStorage.getItem('userId') }
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

      useEffect(() => {
        setShowLoader(false);
        // getCashflowIndirectoInfo(currentState.id)
        //   .then((data) => {
        //     console.log(data)
        //     if (data.length !==0) {
        //         setinputsValues(data[0])
        //     } 
            
        //   })
        //   .catch((error) => console.error(error));
      }, []);

    return (<>
        { showLoader ? (
          <div style={{marginLeft:'auto', marginRight:'auto', width:'100%'}} >
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
                {!hiddenItems[0]&& <>
                 {/** *********** Caja y bancos  ************ */}
                 <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[49px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Caja y bancos - inicio de periodo'
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
                                      onChange={(e) => handleChangeInputs('cajaYBancos' , e.target.value)}
                                      name="initial"
                                      prefix='$'

                                  />
                              </FormItem>
                        </div>
                      {cajaYBancos.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <div className="titleRow w-[130px]">
                                  <p className="cursor-default"> Año {indexYear + 1 }</p>
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
                      ))}
                  </div> 
                {/** *********** ****************  ************ */}

                {/** *********** Créditos por Ventas  ************ */}
                <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Créditos por Ventas'
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
                                      onChange={(e) => handleChangeInputs('creditosPorVentas' , e.target.value)}
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
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Créditos Fiscales'
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
                                      onChange={(e) => handleChangeInputs('creditosFiscales' , e.target.value)}
                                      name="initial"
                                      prefix='$'

                                  />
                              </FormItem>
                        </div>
                      {creditosFiscales.map((año, indexYear) => (
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

                {/** *********** Bienes de Cambio  ************ */}
                <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Bienes de Cambio'
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
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Bienes de Uso'
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
                                      onChange={(e) => handleChangeInputs('BienesDeUso' , e.target.value)}
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
                              value= 'TOTAL ACTIVO'
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
                                onChange={(e) => handleChangeInputs('totActivo' , e.target.value)}
                                name="initial"
                                disabled
                                prefix={currency}

                            />
                        </FormItem>
                    </div>
                      {totActivo.map((año, indexYear) => (
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
  