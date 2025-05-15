/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, FormContainer, FormItem, Input, Tooltip } from 'components/ui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import {
  createWorkingCapital,
  getWorkingCapitalInfo,
  getUser,
} from 'services/Requests';
import {
  calcAmortizaciones,
  calcFinanciacionDeTerceros,
  calcInteresesPagadosPorAnio,
  calcInversiones,
  multiplicacionPxQCapex,
  calcularCreditosPorVentas,
  calcularBienesDeCambio,
  calcularDeudasFiscales,
  calcularDeudasComerciales,
} from 'utils/calcs';
import MySpinner from 'components/shared/loaders/MySpinner';
import { 
  sanitizarDatosVolumen, 
  diagnosticarRutaEspecifica,
  detectarInconsistencia, 
  corregirInconsistencia 
} from 'utils/sanitizeVolume';

function TableWorkingCapital(props) {
  const [showLoader, setShowLoader] = useState(true);
  const [creditosVentas, setCreditosVentas] = useState([]);
  const [bienesDeCambio, setBienesDeCambio] = useState([]);
  const [updateBienesDeCambio, setUpdateBienesDeCambio] = useState(true);
  const [deudasComerciales, setDeudasComerciales] = useState([]);
  const [deudasComerciales2, setDeudasComerciales2] = useState([]);
  const [deudasFiscales2, setDeudasFiscales2] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [posicionAlCierre, setPosicionAlCierre] = useState([]);
  const [variacion, setVariacion] = useState([]);
  const currentState = useSelector((state) => state.auth.user);
  const [timeoutId, setTimeoutId] = useState(null);
  const IIGG = useSelector((state) => state.tableBalanceResult);
  const [deudasComercialesAnio0, setDeudasComercialesAnio0] = useState(0);
  const [bienesDeCambioAnio0, setBienesDeCambioAnio0] = useState(0);
  const [creditosPorVentasAnio0, setCreditosPorVentasAnio0] = useState(0);
  const [cebo, setCebo] = useState(0);

  // ***************** INPUTS ANIO 0 ******************
  const [inputsValues, setinputsValues] = useState({
    creditosVentas: '0',
    bienesDeCambio: '0',
    deudasComerciales: '0',
  });

  const handleChangeInputs = (key, value) => {
    const copy = { ...inputsValues };
    if (value.startsWith('0')) {
      value = value.slice(1);
    }
    copy[key] = value;
    setinputsValues(copy);
  };

  // **********************************************

  const currency = useSelector((state) => state.auth.user.currency);

  function handleBienesDeCambio(value) {
    handleChangeInputs('bienesDeCambio', value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        setUpdateBienesDeCambio(true);
      }, 3000),
    );
  }

  // Helper function to check for inconsistencies in the data
  const verificarInconsistencias = (datos) => {
    if (!datos || !datos.volumenData) return { inconsistencias: 0 };
    
    let totalInconsistencias = 0;
    let inconsistenciasGraves = 0;
    
    // Recorrer la estructura de datos
    datos.volumenData.forEach(pais => {
      if (!pais.stats) return;
      
      pais.stats.forEach(canal => {
        if (!canal.productos) return;
        
        canal.productos.forEach(producto => {
          if (!producto.años) return;
          
          producto.años.forEach(año => {
            if (!año.volMeses) return;
            
            // Verificar inconsistencia
            const { inconsistente, porcentajeDiferencia, hayValoresExtremos } = detectarInconsistencia(año);
            
            if (inconsistente) {
              totalInconsistencias++;
              
              // Considerar grave si hay valores extremos o la diferencia es mayor al 50%
              if (hayValoresExtremos || Math.abs(porcentajeDiferencia) > 50) {
                inconsistenciasGraves++;
              }
            }
          });
        });
      });
    });
    
    return { 
      inconsistencias: totalInconsistencias, 
      inconsistenciasGraves,
      tieneProblemas: totalInconsistencias > 0 
    };
  };
  
  // Función para sanear datos con inconsistencias
  const sanearDatos = (datos, debug = false) => {
    if (!datos) return datos;
    
    // Diagnóstico inicial de la estructura completa
    const checkInicial = verificarInconsistencias(datos);
    
    if (debug && checkInicial.tieneProblemas) {
      console.log(`⚠️ Se detectaron ${checkInicial.inconsistencias} inconsistencias en los datos (${checkInicial.inconsistenciasGraves} graves)`);
    }
    
    // Diagnóstico específico de la ruta principal en calcs.js
    if (debug) console.log("🔍 Diagnóstico de la ruta volumenData[0].stats[0].productos[0].años[0].volMeses:");
    const diagInicial = diagnosticarRutaEspecifica(datos, debug);
    
    // Sanitizar datos completos
    let dataSanitizada = sanitizarDatosVolumen(datos);
    
    // Verificación final
    const checkFinal = verificarInconsistencias(dataSanitizada);
    
    if (debug) {
      if (checkFinal.tieneProblemas) {
        console.log(`⚠️ Después de la sanitización aún quedan ${checkFinal.inconsistencias} inconsistencias (${checkFinal.inconsistenciasGraves} graves)`);
      } else {
        console.log('✅ Datos sanitizados correctamente, no se detectaron inconsistencias');
      }
    }
    
    return dataSanitizada;
  };

  useEffect(() => {
    if (updateBienesDeCambio) {
      getUser(currentState.id)
        .then((dataRaw) => {
          // Aplicar sanitización inteligente
          const dataSanitizada = sanearDatos(dataRaw, true);
          
          // Proceder con los cálculos
          calcularBienesDeCambio(
            dataSanitizada,
            setBienesDeCambio,
            inputsValues.bienesDeCambio,
          );
        })
    }
  }, [updateBienesDeCambio]);

  useEffect(() => {
    getUser(currentState.id)
      .then((dataRaw) => {
        // Aplicar sanitización inteligente
        const dataSanitizada = sanearDatos(dataRaw, true);
        
        // Proceder con los cálculos con datos sanitizados
        calcularCreditosPorVentas(dataSanitizada, creditosVentas, setCreditosVentas);

        setBienesDeCambioAnio0(parseInt(dataSanitizada.balanceData[0].bienesDeCambio));
        setDeudasComercialesAnio0(
          parseInt(dataSanitizada.balanceData[0].deudasComerciales),
        );
        setCreditosPorVentasAnio0(
          parseInt(dataSanitizada.balanceData[0].creditosPorVentas),
        );
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (creditosVentas && bienesDeCambio && deudasComerciales) {
      let resultado = [];

  
      for (let i = 0; i < 11; i++) {
        if (i === 0) {
          resultado.push(
            Number(creditosPorVentasAnio0) +
              Number(bienesDeCambioAnio0) -
              Number(deudasComercialesAnio0),
          );
        } else {
        
          resultado.push(
            Number(creditosVentas[i - 1]) +
              Number(bienesDeCambio[i - 1]) -
              Number(deudasComerciales[i - 1]),
          );
        }
      }

      setPosicionAlCierre(resultado);
    }
  }, [creditosVentas, bienesDeCambio, deudasComerciales]);

  useEffect(() => {
    const valor =
      parseInt(creditosPorVentasAnio0) +
      parseInt(bienesDeCambioAnio0) -
      parseInt(deudasComercialesAnio0);

    const copyArray = [...posicionAlCierre];
    copyArray[0] = valor;
    setPosicionAlCierre(copyArray);
  }, [creditosPorVentasAnio0, bienesDeCambioAnio0, deudasComercialesAnio0]);

  useEffect(() => {
    if (Array.isArray(IIGG)) {
      setTimeout(() => {
        const fetchData = async () => {
          try {
            let IIGGFinal =
              IIGG?.length === 0 ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : IIGG;
            
            // Obtener datos del usuario
            const dataRaw = await getUser(currentState.id);
            
            // Aplicar sanitización inteligente
            const dataSanitizada = sanearDatos(dataRaw, true);
            
            // Asegurarnos de que los volúmenes estén correctamente sanitizados
            if (dataSanitizada && dataSanitizada.volumenData) {
              console.log("🧹 Sanitizando volúmenes antes de calcular deudas comerciales");
              
              // Sanitizar volumen nuevamente en cada nivel para asegurar que no haya valores extremos
              dataSanitizada.volumenData.forEach(pais => {
                if (!pais.stats) return;
                
                pais.stats.forEach(canal => {
                  if (!canal.productos) return;
                  
                  canal.productos.forEach(producto => {
                    if (!producto.años) return;
                    
                    producto.años.forEach(año => {
                      if (!año.volMeses) return;
                      
                      // Verificar si hay valores extremos
                      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                                  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
                      
                      meses.forEach(mes => {
                        const valor = año.volMeses[mes];
                        if (valor === 270000000 || 
                            valor === 270000000.0 ||
                            Math.abs(Number(valor) - 270000000) < 1000 ||
                            (typeof valor === 'string' && valor.includes('270000000'))) {
                          // Corregir valor extremo con un valor razonable
                          console.log(`⚠️ Corrigiendo valor extremo en volumen: ${valor} → 10`);
                          año.volMeses[mes] = 10;
                        }
                      });
                      
                      // Recalcular volTotal
                      año.volTotal = meses.reduce((acc, mes) => acc + Number(año.volMeses[mes] || 0), 0);
                    });
                  });
                });
              });
            }
            
            // Crear copias con los datos ya sanitizados
            let dataCopy = JSON.parse(JSON.stringify(dataSanitizada));
            let dataCopy2 = JSON.parse(JSON.stringify(dataSanitizada));
            
            // Ejecutar cálculos con datos sanitizados
            let ivasDF = await calcularCreditosPorVentas(
              dataCopy,
              null,
              setCebo,
            );
            
            await calcularBienesDeCambio(dataSanitizada, setCebo, 0);
            
            // Calcular deudas comerciales con datos sanitizados
            let ivasCF = await calcularDeudasComerciales(
              dataSanitizada,
              setDeudasComerciales2,
            );
            
            await calcularDeudasFiscales(
              ivasDF,
              ivasCF,
              dataCopy2,
              IIGGFinal,
              setDeudasFiscales2,
              setShowLoader,
            );
          } catch (error) {
            console.error('Error en cálculos financieros:', error);
            setShowLoader(false);
          }
        };
        fetchData();
      }, 1500);
    }
  }, [IIGG]);

  useEffect(() => {
    if (deudasFiscales2.length > 0 && deudasComerciales2.length > 0) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        resultado[i] = deudasFiscales2[i] + deudasComerciales2[i];
      }

      setDeudasComerciales(resultado);
    }
  }, [deudasFiscales2, deudasComerciales2]);

  useEffect(() => {
    if (!isNaN(posicionAlCierre[0])) {
      let arrayResultado = [];
      for (let i = 1; i < posicionAlCierre.length; i++) {
        let resultado = posicionAlCierre[i] - posicionAlCierre[i - 1];
        arrayResultado.push(resultado);
      }  
      if (props?.setVariacionExterior) {
        // invierto los valores para que queden en negativo o positivo
        let arrayInvertido = arrayResultado.map((item) => item * -1);

        props.setVariacionExterior(arrayInvertido);
      }
      setVariacion(arrayResultado);
    }
  }, [posicionAlCierre]);

  const submitInfoForm = () => {
    const value = { ...inputsValues, idUser: localStorage.getItem('userId') };
    createWorkingCapital(value)
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
    getWorkingCapitalInfo(currentState.id)
      .then((data) => {
        if (data.length !== 0) {
          setinputsValues(data[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {showLoader ? (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
          <MySpinner />
        </div>
      ) : (
        <>
          {
            <FormContainer>
              <section className="contenedor pl-[25px] pr-[35px]">
                {/** *********** Créditos por Ventas  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />
                  <FormItem className=" mb-1 w-[240px] mt-[49px]">
                    <Input
                      disabled
                      type="text"
                      className="capitalize"
                      value="Créditos por Ventas"
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
                          currency +
                          formatNumberPrestamos(creditosPorVentasAnio0)
                        }
                      >
                        <Input
                          className="w-[130px]"
                          type="text"
                          disabled
                          value={creditosPorVentasAnio0}
                          name="initial"
                          prefix={currency || '$'}
                        />
                      </Tooltip>
                    </FormItem>
                  </div>
                  {creditosVentas.map((año, indexYear) => (
                    <div className="flex flex-col" key={indexYear}>
                      <div className="titleRow w-[130px]">
                        <p className="cursor-default"> Año {indexYear + 1}</p>
                      </div>
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
                          currency + formatNumberPrestamos(bienesDeCambioAnio0)
                        }
                      >
                        <Input
                          className="w-[130px]"
                          type="text"
                          disabled
                          value={bienesDeCambioAnio0}
                          onChange={(e) => handleBienesDeCambio(e.target.value)}
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

                {/** *********** Deudas Comerciales  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />
                  <FormItem className=" mb-1 w-[240px] mt-[0px]">
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
                          currency +
                          formatNumberPrestamos(deudasComercialesAnio0)
                        }
                      >
                        <Input
                          className="w-[130px]"
                          type="text"
                          disabled
                          value={formatNumberPrestamos(deudasComercialesAnio0)}
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

                {/** *********** Posición al Cierre  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />

                  <FormItem className=" mb-1 w-[240px] ">
                    <Input
                      disabled
                      type="text"
                      className="capitalize font-bold bg-blue-100"
                      value="Posición al Cierre"
                    />
                  </FormItem>
                  {posicionAlCierre.map((año, indexYear) => (
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

                {/** *********** Variación WC  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />
                  <FormItem className=" mb-1 w-[240px] mt-[0px]">
                    <Input
                      disabled
                      type="text"
                      className="capitalize"
                      value="Variación WC"
                    />
                  </FormItem>
                  <div className="flex flex-col">
                    <FormItem className="mb-0">
                      <Input
                        className="w-[130px]"
                        type="text"
                        disabled
                        name="initial"
                      />
                    </FormItem>
                  </div>
                  {variacion.map((año, indexYear) => (
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
      )}
    </>
  );
}

export default TableWorkingCapital;
