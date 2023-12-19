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
import { createWorkingCapital, getWorkingCapitalInfo } from 'services/Requests';

  function TableWorkingCapital(props) {
    const [cajaYBancos, setCajaYBancos] = useState([]);
    const [amortizaciones, setAmortizaciones] = useState([]);
    const [interesesPagados, setInteresesPagados] = useState([]);
    const [resultadoNeto, setResultadoNeto] = useState([]);
    const [variacion, setVariacion] = useState([]);
    const [FEOperativas, setFEOperativas] = useState([]);
    const [inversiones, setInversiones] = useState([]);
    const [financiacion, setFinanciacion] = useState([]);
    const [pagoPrestamos, setPagoPrestamos] = useState([]);
    const [FEfinanciacion, setFEfinanciacion] = useState([]);

    const currentState = useSelector((state) => state.auth.user);

    // ***************** INPUTS ANIO 0 ******************
    const [inputsValues, setinputsValues] = useState({
        cajaYBancos: "0" ,
        resultadoNeto: "0" ,
        amortizaciones: "0" ,
        interesesPagados: "0" ,
        variacion:"0" ,
        FEOperativas:"0" ,
        inversiones:"0" ,
        financiacion:"0" ,
        pagoPrestamos:"0" ,
    });

   const handleChangeInputs = (key , value) => {
        const copy = {...inputsValues}
        if (value.startsWith("0")) {
            value = value.slice(1);
        }
        copy[key] = value
        setinputsValues(copy)
    }

    // **********************************************

    const currency = useSelector((state) => state.auth.user.currency);


    useEffect(() => {
       setCajaYBancos(props.cajaYBancos)
       setResultadoNeto(props.resultadoNeto)

       setAmortizaciones(props.amortizaciones)
       setInteresesPagados(props.interesesPagados)
       setVariacion(props.variacion)
       setInversiones(props.inversiones)
       console.log(props)
       setFinanciacion(props.financiacion)
    }, [props]);

    useEffect(() => {
        if (resultadoNeto && amortizaciones && interesesPagados  && variacion) {
            let resultado = [];
            for (let i = 0; i < 10; i++) {
                resultado.push(resultadoNeto[i] + amortizaciones[i] + interesesPagados[i] - variacion[i])

            }
             setFEOperativas(resultado)
        }
     }, [resultadoNeto, amortizaciones, interesesPagados, variacion]);

     useEffect(() => {
        if (interesesPagados  && financiacion) {
            let resultado = [];
            for (let i = 0; i < 10; i++) {
                resultado.push(interesesPagados[i] + financiacion[i])

            }
             setPagoPrestamos(resultado)
        }
     }, [interesesPagados, financiacion]);

     useEffect(() => {
        if (pagoPrestamos  && financiacion) {
            let resultado = [];
            for (let i = 0; i < 10; i++) {
                resultado.push(financiacion[i] -  pagoPrestamos[i])

            }
             setFEfinanciacion(resultado)
        }
     }, [pagoPrestamos, financiacion]);

    //  useEffect(() => {
    //     if (inputsValues) {
    //         const copy = {...inputsValues}
    //         const valor = parseInt(copy.cajaYBancos) + parseInt(copy.amortizaciones) - parseInt(copy.interesesPagados)
           
    //         const copyArray = [...resultadoNeto]
    //         copyArray[0]=valor;
    //         setResultadoNeto(copyArray)
    //     }
    //  }, [inputsValues]);

      const submitInfoForm = () => {
        console.log(inputsValues)
        const value = {...inputsValues, idUser:localStorage.getItem('userId') }
        createWorkingCapital(value).then((resp) =>{
            window.scrollTo({ top: 0, behavior: 'smooth' });
            props.showAlertSuces(true);
            setTimeout(() => {
              props.showAlertSuces(false);
            }, 5000);
        }).catch ((error) => {
            console.error(error)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            props.showAlertError(true);
            setTimeout(() => {
              props.showAlertError(false);
            }, 5000);
        })
      }

      useEffect(() => {
        getWorkingCapitalInfo(currentState.id)
          .then((data) => {
            if (data.length !==0) {
                setinputsValues(data[0])
            } 
            
          })
          .catch((error) => console.error(error));
      }, []);
    return (
      <>
      { 
          <FormContainer>
              <section className="contenedor pl-[25px] pr-[35px]">
            
                {/** *********** Caja y bancos al inicio del periodo  ************ */}
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
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}

                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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
                 {/** *********** Resultado Neto  ************ */}
                 <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                      <div className='iconDesplegable'/>        
                    
                      <FormItem className=" mb-1 w-[240px] ">
                          <Input
                              disabled
                              type="text"
                              className="capitalize font-bold bg-blue-100"
                              value= 'Resultado Neto'
                          />
                      </FormItem>
                      {resultadoNeto.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {Math.round(año).toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] font-bold text-base"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}
                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px] font-bold "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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

                <div className='linea' />
                <span className="block  pl-3  mb-3 ">Actividades operativas</span>
                {/** *********** Amortizaciones  ************ */}
                <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Amortizaciones'
                          />
                      </FormItem>
                      <div className="flex flex-col" >
                   
                              <FormItem
                                  className="mb-0"
                              >
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={inputsValues.amortizaciones}
                                      onChange={(e) => handleChangeInputs('amortizaciones' , e.target.value)}
                                      name="initial"
                                      prefix='$'

                                  />
                              </FormItem>
                        </div>
                      {amortizaciones.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {año.toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}

                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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

                {/** *********** Intereses Pagados  ************ */}
                <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Intereses Pagados'
                          />
                      </FormItem>
                      <div className="flex flex-col" >

                              <FormItem
                                  className="mb-0"
                              >
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={inputsValues.interesesPagados}
                                      onChange={(e) => handleChangeInputs('interesesPagados' , e.target.value)}
                                      name="initial"
                                      prefix='$'

                                  />
                              </FormItem>
                        </div>
                      {interesesPagados.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {año.toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}

                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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


                {/** *********** Variación Capital de trabajo  ************ */}
                <div
                    className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Variación Capital de trabajo'
                          />
                      </FormItem>
                      <div className="flex flex-col" >
                   
                              <FormItem
                                  className="mb-0"
                              >
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={inputsValues.variacion}
                                      onChange={(e) => handleChangeInputs('variacion' , e.target.value)}
                                      name="initial"
                                      prefix={currency}

                                  />
                              </FormItem>
                        </div>
                      {variacion.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {año.toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}

                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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
              
                   {/** *********** FF generado en act. operativas  ************ */}
                   <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                      <div className='iconDesplegable'/>        
                    
                      <FormItem className=" mb-1 w-[240px] ">
                          <Input
                              disabled
                              type="text"
                              className="capitalize font-bold bg-blue-100"
                              value= 'FF generado en act. operativas'
                          />
                      </FormItem>
                      <div className="flex flex-col" >
                   
                        <FormItem
                            className="mb-0"
                        >
                            <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.FEOperativas}
                                onChange={(e) => handleChangeInputs('FEOperativas' , e.target.value)}
                                name="initial"
                                disabled
                                prefix={currency}

                            />
                        </FormItem>
                    </div>
                      {FEOperativas.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {Math.round(año).toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] font-bold text-base"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}
                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px] font-bold "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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

                <div className='linea' />
                <span className="block  pl-3  mb-3 ">Actividades de inversión</span>

                     {/** *********** Inversiones  ************ */}
                     <div
                    className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Inversiones'
                          />
                      </FormItem>
                      <div className="flex flex-col" >
                   
                              <FormItem
                                  className="mb-0"
                              >
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={inputsValues.inversiones}
                                      onChange={(e) => handleChangeInputs('inversiones' , e.target.value)}
                                      name="initial"
                                      prefix={currency}

                                  />
                              </FormItem>
                        </div>
                      {inversiones.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {año.toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}

                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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
              
                   {/** *********** FF generado en act. de inversión  ************ */}
                   <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                      <div className='iconDesplegable'/>        
                    
                      <FormItem className=" mb-1 w-[240px] ">
                          <Input
                              disabled
                              type="text"
                              className="capitalize font-bold bg-blue-100"
                              value= 'FF generado en act. de inversión'
                          />
                      </FormItem>
                      <div className="flex flex-col" >
                   
                        <FormItem
                            className="mb-0"
                        >
                            <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.inversiones}
                                onChange={(e) => handleChangeInputs('inversiones' , e.target.value)}
                                name="initial"
                                disabled
                                prefix={currency}

                            />
                        </FormItem>
                    </div>
                      {inversiones.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {Math.round(año).toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] font-bold text-base"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}
                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px] font-bold "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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
                <div className='linea' />
                <span className="block  pl-3  mb-3 ">Actividades de financiación</span>

                     {/** *********** Financiación de terceros  ************ */}
                     <div
                    className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Financiación de terceros'
                          />
                      </FormItem>
                      <div className="flex flex-col" >
                   
                              <FormItem
                                  className="mb-0"
                              >
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={inputsValues.financiacion}
                                      onChange={(e) => handleChangeInputs('financiacion' , e.target.value)}
                                      name="initial"
                                      prefix={currency}

                                  />
                              </FormItem>
                        </div>
                      {financiacion.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {año.toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}

                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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
              {/** *********** Pago préstamos  ************ */}
              <div
                    className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                    <div className='iconDesplegable'/>
                      <FormItem className=" mb-1 w-[240px] mt-[0px]">
                          <Input
                              disabled
                              type="text"
                              className="capitalize"
                              value= 'Pago préstamos'
                          />
                      </FormItem>
                      <div className="flex flex-col" >
                   
                              <FormItem
                                  className="mb-0"
                              >
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={inputsValues.pagoPrestamos}
                                      onChange={(e) => handleChangeInputs('pagoPrestamos' , e.target.value)}
                                      name="initial"
                                      prefix={currency}

                                  />
                              </FormItem>
                        </div>
                      {pagoPrestamos.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {año.toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}

                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px]"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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
                   {/** *********** FF generado en act. de financiación  ************ */}
                   <div
                      className="flex  gap-x-3 gap-y-3  mb-6 "
                  >
                      <div className='iconDesplegable'/>        
                    
                      <FormItem className=" mb-1 w-[240px] ">
                          <Input
                              disabled
                              type="text"
                              className="capitalize font-bold bg-blue-100"
                              value= 'FF generado en act. de financiación'
                          />
                      </FormItem>
                      <div className="flex flex-col" >
                   
                        <FormItem
                            className="mb-0"
                        >
                            <Input
                                className="w-[130px]"
                                type="text"
                                value={inputsValues.FEfinanciacion}
                                // onChange={(e) => handleChangeInputs('FEOperativas' , e.target.value)}
                                name="initial"
                                disabled
                                prefix={currency}

                            />
                        </FormItem>
                    </div>
                      {FEfinanciacion.map((año, indexYear) => (
                          <div className="flex flex-col" key={indexYear}>
                              <FormItem
                                  className="mb-0"
                              >
                                  {Math.round(año).toString().length > 5 ? (
                                  <Tooltip
                                      placement="top-end"
                                      title={currency + formatNumberPrestamos(año.toFixed(2))}
                                  >
                                      <Input
                                      className="w-[130px] font-bold text-base"
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
                                      name="year"
                                      disabled
                                      prefix={currency}
                                      />
                                  </Tooltip>
                                  ) : (
                                  <Input
                                      className="w-[130px] font-bold "
                                      type="text"
                                      value={formatNumberPrestamos(año.toFixed(2))}
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
      
      }
      <Button
        className="border mt-6b btnSubmitTable mt-[40px]"
        variant="solid"
        type="submit"
        onClick={submitInfoForm}
      >
        Guardar
      </Button>
      </>
    );
  }
  
  export default TableWorkingCapital;
  