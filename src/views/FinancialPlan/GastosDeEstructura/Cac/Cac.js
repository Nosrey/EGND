/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */

import ContainerScrollable from 'components/shared/ContainerScrollable';
import MySpinner from 'components/shared/loaders/MySpinner';
import { FormContainer } from 'components/ui';
import { MONTHS } from 'constants/forms.constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'services/Requests';
import {
  calculateCostosAnuales,
  calculateCostosTotales,
  calculateMargenBrutoPorcentaje,
  calculateVentas,
  redondearHaciaArribaConDosDecimales,
  showMultiplicacionPxQ,
  totComisiones,
} from 'utils/calcs';
import formatNumber from 'utils/formatTotalsValues';
import { modifyDataWithInitialClients } from 'utils/hoc/clientsCalcs';
import TableCac from './TableCac';
import GraficoDashed from './GraficoDashed';
import GraficoDashedLTVCAC from './GraficoDashedLTVCAC';

function Cac() {
  const [showLoader, setShowLoader] = useState(true);
  const currentState = useSelector((state) => state.auth.user);
  const [infoVolToCalculateClient, setInfoVolToCalculateClient] = useState();
  const [dataAssump, setDataAssump] = useState();
  const [gastosPorCCData, setGastosPorCCData] = useState();
  const [valoresCAC, setValoresCAC] = useState(null);
  const [valoresLTV, setValoresLTV] = useState(null);
  const [valoresLTVCAC, setValoresLTVCAC] = useState(null);

  const [infoForm, setInfoForm] = useState();
  const [volumenData, setVolumenData] = useState();
  const [assumptionData, setAssumptionData] = useState();
  const [churnDataXProd, setChurnDataXProd] = useState();
  const [costoData, setCostoData] = useState();
  
  const calcNewClients = (data, indexY, indexMes, indexChannel, indexProd) => {
    const volumen = dataAssump?.canales?.[indexChannel]?.items?.[indexProd]?.volumen || 1;

    const currentMonthVol = data.años[indexY].volMeses[MONTHS[indexMes]] || 0;
    const prevMonthVol = indexMes > 0 ? (data.años[indexY].volMeses[MONTHS[indexMes - 1]] || 0) : 0;
    const churnPercentage = dataAssump?.churns?.[indexChannel]?.items?.[indexProd]?.porcentajeChurn || 0;

    let result = (currentMonthVol / volumen);
    if (indexMes > 0) {
      const prevClientes = (prevMonthVol / volumen);
      const clientesPerdidos = prevClientes * (churnPercentage / 100);
      const clientesRetenidos = prevClientes - clientesPerdidos;
      result -= clientesRetenidos;
    }

    result = Math.max(0.1, Number(formatNumber(result)));
    return result;
  };

  const calculateClients = () => {
    let nuevoClientes = [];
    
    for (let guia = 0; guia < 10; guia++) {
      let newC = 0;
      let contadorProductos = 0;
      
      Object.values(infoVolToCalculateClient).forEach((d, indexPais) => {
        d.forEach((i, indexChannel) => {
          i.productos.forEach((p, indexProd) => {
            p.años.forEach((a, indexY) => {
              if (indexY === guia) {
                contadorProductos++;
                MONTHS.forEach((o, indexMes) => {
                  const clientesNuevos = calcNewClients(
                    p,
                    indexY,
                    indexMes,
                    indexChannel,
                    indexProd,
                  );
                  newC += clientesNuevos;
                });
              }
            });
          });
        });
      });
      
      // Asegurar que haya al menos un valor mínimo de clientes nuevos por año
      const valorFinal = (contadorProductos > 0 && newC <= 0) ? contadorProductos : Math.max(1, isNaN(newC) ? 1 : newC);
      nuevoClientes.push(valorFinal);
    }
    
    return nuevoClientes;
  };

  const getTotalPorCC = (cc) => {
    // Logica para obtener un array de 10 posiciones correspondiente al total gastado en ese centro de costo por año
    for (let i = 0; i < cc.length; i++) {
      let anos = cc[i].años;
      let volTotalArray = [];

      for (let j = 0; j < anos?.length; j++) {
        let { volMeses } = anos[j] ?? 0;
        let volTotal =
          volMeses &&
          Object.values(volMeses).reduce((acc, value) => acc + value, 0);
        volTotalArray.push(volTotal);
      }

      cc[i].años = volTotalArray;
    }

    let sumaTotal = cc.reduce((acc, obj) => {
      for (let i = 0; i < obj.años.length; i++) {
        acc[i] = (acc[i] || 0) + obj.años[i];
      }
      return acc;
    }, []);
    return sumaTotal;
  };

  const costosMktyComercial = (gastosPorCCData) => {
    let comercialInfo = gastosPorCCData[0].centroDeCostos[0].Comercial.visible
      ? gastosPorCCData[0].centroDeCostos[0].Comercial.cuentas
      : [];
    let mktInfo = gastosPorCCData[0].centroDeCostos[0].Marketing.visible
      ? gastosPorCCData[0].centroDeCostos[0].Marketing.cuentas
      : [];

    const totGastoComercial = [...getTotalPorCC(comercialInfo)];
    const totGastoMkt = [...getTotalPorCC(mktInfo)];
    const resultadoCAC = [];
    const maxLength = Math.max(totGastoComercial.length, totGastoMkt.length);

    for (let i = 0; i < maxLength; i++) {
      // Usa el operador de fusión nula para proporcionar 0 si la posición es undefined porque si no tengo gasto en comercial o mk unod e lso arrays va aser []
      const valorComercial = totGastoComercial[i] ?? 0;
      const valorMkt = totGastoMkt[i] ?? 0;
      if (isNaN(valorComercial + valorMkt)) {
        resultadoCAC.push(0);
      } else {
        resultadoCAC.push(valorComercial + valorMkt);
      }
    }
    return resultadoCAC;
  };

  const calculateCAC = () => {
    if (!gastosPorCCData || !infoVolToCalculateClient) return Array(10).fill(0); // Validación adicional
    const costos = costosMktyComercial(gastosPorCCData);
    const nuevosClientes = calculateClients();
    
    // Mostrar valores por año para verificación
    console.log('--- Resumen de valores para cálculo de CAC por año ---');
    for (let i = 0; i < 10; i++) {
      console.log(`Año ${i+1}:
      - Costos Comercial/Marketing: ${costos[i]}
      - Nuevos clientes: ${nuevosClientes[i]}
      - CAC esperado: ${costos[i] / Math.max(1, nuevosClientes[i])}`);
    }
    
    // Verificar si hay algún problema con los nuevos clientes
    const clientesCorregidos = nuevosClientes.map(valor => 
      valor <= 0 || isNaN(valor) ? 1 : valor // Prevenir división por cero o valores muy pequeños
    );
    
    // Usar valores corregidos para el cálculo
    const newData = costos.map((elemento, indice) => {
      const cac = Math.round(elemento / clientesCorregidos[indice]);
      return cac;
    });

    return newData;
  };
  // ********************** fin calculos de CAC // **********************

  // LTV

  const calculateCicloCliente = () => {
    const arrayCiclos = [];
    if (!churnDataXProd) return arrayCiclos; // <- Validación añadida

    for (let i = 0; i < 10; i++) {
      let acum = 0;
      const paises = Object.keys(churnDataXProd || {});
      // Iterar sobre las claves (paises)
      paises.forEach((pais) => {
        // Iterar sobre los elementos del array de cada pais
        churnDataXProd[pais]?.forEach((canal) => {
          canal.productos?.forEach((prod) => {
            const sumatoriaPorcentajesChurnEseAnio = prod.churnPorcetajes?.[i]?.reduce(
              (total, valor) => total + (valor || 0),
              0
            );
            acum += isNaN(sumatoriaPorcentajesChurnEseAnio) ? 0 : sumatoriaPorcentajesChurnEseAnio;
          });
        });
      });
      arrayCiclos.push(
        acum === 0 ? 0 : redondearHaciaArribaConDosDecimales((1 / acum) * 100)
      ); // esto es porque la formula de ciclo cliente es 1/churn %
    }
    return arrayCiclos; // array de diez valores d 1/ %Churn de ese anio de todos los prod
  };

  const calculateAvClientes = () => {
    //   ventas/ cant clientes finales , es decir el valor de inicio del mes 0 del anio siguiente
    const ventas = calculateVentas(infoForm);
    const arrayAvClientes = [];
    for (let i = 0; i < 10; i++) {
      let acumClientesFinales = 0;
      const paises = Object.keys(churnDataXProd);
      // Iterar sobre las claves (paises)
      paises.forEach((pais, indexPais) => {
        // Iterar sobre los elementos del array de cada pais
        churnDataXProd[pais].forEach((canal, indexCanal) => {
          canal.productos.forEach((prod, indexProd) => {
            // para el vlaor final de mi primer anio necesito el valor inicio de mi anio siguiente por eso i+1
            const clientesFinalesEsteProd =
              i !== 9
                ? prod.valoresInicioChurn[i + 1][0]
                : prod.valoresInicioChurn[i][11];
            acumClientesFinales += clientesFinalesEsteProd;
          });
        });
      });
      arrayAvClientes.push(
        redondearHaciaArribaConDosDecimales(ventas[i] / acumClientesFinales),
      ); // ventas / clientes finales
    }
    return arrayAvClientes; // array de diez valores d ventas / clientes finales de ese anio
  };

  const calculateLTV = () => {
    if (!churnDataXProd || !costoData || !infoForm) return Array(10).fill(0); // Validación adicional
    const cicloCLiente = calculateCicloCliente();
    const avClientes = calculateAvClientes();
    const margenBruto = calculateMargenBrutoPorcentaje(
      costoData,
      infoForm,
      volumenData,
    );
    const resultado = [];

    if (
      cicloCLiente.length === avClientes.length &&
      avClientes.length === margenBruto.length
    ) {
      for (let i = 0; i < cicloCLiente.length; i++) {
        resultado[i] = Math.round(
          cicloCLiente[i] * avClientes[i] * margenBruto[i],
        );
      }
    } else {
      console.error('Los arrays no tienen la misma longitud.');
    }
    return resultado;
  };
  // ********************** fin calculos de LTV // **********************

  useEffect(() => {
    if (infoVolToCalculateClient && dataAssump && gastosPorCCData) {
      const result = calculateCAC();
      if (result.length !== 0) {
        setValoresCAC(result);
      }
    }
  }, [infoVolToCalculateClient, dataAssump, gastosPorCCData]);

  useEffect(() => {
    if (infoForm && volumenData && assumptionData) {
      calculateVentas(infoForm);
      // le agrego a cada producto de cada canal de cada pais los atributos valoresInicioChurn y churnPorcetajes que lo voy a anecesitar para calcular cosas como calculateCicloCliente()
      setChurnDataXProd(
        modifyDataWithInitialClients(infoForm, volumenData, assumptionData),
      );
    }
  }, [infoForm]);

  useEffect(() => {
    if (churnDataXProd && costoData && infoForm) {
      const result = calculateLTV();
      if (result.length !== 0) {
        setValoresLTV(result);
      }
    }
  }, [churnDataXProd, costoData]);

  useEffect(() => {
    if (valoresCAC && valoresLTV) {
      const resultado = [];

      if (valoresLTV.length === valoresCAC.length) {
        for (let i = 0; i < valoresLTV.length; i++) {
          if (!valoresCAC[i] || !isFinite(valoresLTV[i] / valoresCAC[i])) {
            resultado[i] = 0; // Validación adicional
          } else {
            resultado[i] = valoresLTV[i] / valoresCAC[i];
          }
        }
        setValoresLTVCAC(resultado);
      } else {
        console.error('Los arrays no tienen la misma longitud.');
      }
    }
  }, [valoresCAC, valoresLTV]);

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        if (data?.gastosGeneralData.length !== 0) {
          // seteo la info delvolumen para usar par alos cliente sporque si uso info form estoy usando el valor de ventas
          const datosPrecargadosVol = {};
          let volDataOrdenada = JSON.parse(
            localStorage.getItem('volumenData'),
          ).sort((a, b) => a.countryName.localeCompare(b.countryName));
          //  setVolumenData(data?.volumenData)
          for (let i = 0; i < volDataOrdenada.length; i++) {
            datosPrecargadosVol[volDataOrdenada[i].countryName] =
              volDataOrdenada[i].stats;
          }
          setInfoVolToCalculateClient(() => ({ ...datosPrecargadosVol }));
          ///

          if (data.assumptionData[0]) {
            setDataAssump(data.assumptionData[0] || { canales: [], churns: [] });

            if (data.costoData.length !== 0) {
              setCostoData(data.costoData);
            } else {
              alert(
                'Es necesario completar Costos Unitarios para visualizar esta pantalla',
              );
            }
          }

          if (data.gastosPorCCData.length !== 0) {
            setGastosPorCCData(() => ({ ...data.gastosPorCCData }));
          } else {
            alert('es necesario commpletar Proyeccion de gastos por cc ');
          }

          if (data?.volumenData.length !== 0) {
            // setVolumenData(data?.volumenData.sort((a, b) =>
            //   a.countryName.localeCompare(b.countryName),
            // ))
            setVolumenData(data?.volumenData);
          }

          if (data?.assumptionData.length !== 0) {
            setAssumptionData(data?.assumptionData);
            // setAssumptionData(data?.assumptionData.sort((a, b) =>
            //   a.countryName.localeCompare(b.countryName),
            // ))
          }
          // Seteo la info de ventas PxQ
          const datosPrecargados = {};
          const copyVolData = JSON.parse(JSON.stringify(data?.volumenData));
          const copyPcioData = JSON.parse(JSON.stringify(data?.precioData));

          let dataVentas = showMultiplicacionPxQ(
            copyVolData.sort((a, b) =>
              a.countryName.localeCompare(b.countryName),
            ),
            copyPcioData.sort((a, b) =>
              a.countryName.localeCompare(b.countryName),
            ),
          );
          for (let i = 0; i < dataVentas.length; i++) {
            datosPrecargados[dataVentas[i].countryName] = dataVentas[i].stats;
          }
          setInfoForm(() => ({ ...datosPrecargados }));

          // **********************************
        } // mostarr completar assumption gastos

        setShowLoader(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {showLoader ? (
        <MySpinner />
      ) : (
        <>
          {valoresCAC && valoresLTV && valoresLTVCAC && (
            <div>
              <div className="border-b-2 mb-8 pb-1">
                <h4 className="cursor-default">CAC</h4>
                <span className="cursor-default">Gastos de Estructura</span>
              </div>
              <div className="container-countries">
                <p style={{ fontSize: '12px', color: 'grey' }}>
                  * Para el cálculo de CAC es necesario tener activos y con
                  datos los centros de costo Comercial y/o Marketing.
                </p>
                <FormContainer className="cont-countries">
                  <ContainerScrollable
                    contenido={
                      <TableCac
                        cac={valoresCAC}
                        ltv={valoresLTV}
                        ltvcac={valoresLTVCAC}
                      />
                    }
                  />
                </FormContainer>
              </div>

              {valoresCAC.length > 0 && valoresLTV.length > 0 && (
                <div className=" mt-[40px]">
                  <h5>CAC y LTV</h5>
                  <GraficoDashed cac={valoresCAC} ltv={valoresLTV} />
                </div>
              )}
              {valoresLTVCAC.length > 0 && (
                <div className=" mt-[40px]">
                  <h5>LTV / CAC</h5>
                  <GraficoDashedLTVCAC ltvcac={valoresLTVCAC} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Cac;
