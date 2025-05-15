/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-continue */
/* eslint-disable no-inner-declarations */

import {
  MONTHS,
  optionsBienes,
  defaultVolumenData,
  defaultPrecioData,
  defaultAssumpFinancierasData,
  defaultCostoData,
  defaultGastosPorCCData,
  defaultCapexPData,
  defaultCapexQData,
} from 'constants/forms.constants';

import { sanitizarDatosVolumen, sanitizarValorExtremo, esValorExtremo } from './sanitizeUtil';

export const redondearHaciaArribaConDosDecimales = (numero) => {
  let multiplicado = numero * 100;
  let redondeado = Math.ceil(multiplicado);
  let resultado = redondeado / 100;

  return resultado;
};

export const showMultiplicacionPxQ = (dataVolumen, dataPrecio) => {
  for (let i = 0; i < dataVolumen.length; i++) {
    for (let x = 0; x < dataVolumen[i].stats.length; x++) {
      for (let j = 0; j < dataVolumen[i].stats[x].productos.length; j++) {
        for (
          let t = 0;
          t < dataVolumen[i].stats[x].productos[j].años.length;
          t++
        ) {
          const totalesAnio = [];
          MONTHS.forEach((month) => {
            const volMes =
              dataVolumen[i].stats[x].productos[j].años[t].volMeses[month];
            const precioMes =
              dataPrecio[i].stats[x].productos[j].años[t].volMeses[month];
            const ventaMes = (dataVolumen[i].stats[x].productos[j].años[
              t
            ].volMeses[month] = Math.round(volMes) * Math.round(precioMes));
            totalesAnio.push(ventaMes);
            return ventaMes;
          });
          const totalVentasAnual = totalesAnio.reduce((a, b) => a + b, 0); // CALCULO EL TOTAL POR Anio
          dataVolumen[i].stats[x].productos[j].años[t].ventasTotal =
            totalVentasAnual;
        }
      }
    }
  }
  return dataVolumen;
};

export const calculateVentas = (infoForm) => {
  let dataVentas = [];
  for (let guia = 0; guia < 10; guia++) {
    let tot = 0;
    Object.values(infoForm).map((m, indexPais) => {
      m.map((p) => {
        p.productos.map((o, indexO) => {
          o.años.map((a, indexY) => {
            if (indexY === guia) {
              tot += Number(a.ventasTotal ? a.ventasTotal : 0);
            }
          });
        });
      });
    });
    dataVentas.push(tot);
  }

  return dataVentas;
};

export const calculateVentasTipo = (infoForm, tipo) => {
  let dataVentas = [];
  for (let guia = 0; guia < 10; guia++) {
    let tot = 0;
    Object.values(infoForm).map((m, indexPais) => {
      m.map((p) => {
        p.productos.map((o, indexO) => {
          o.años.map((a, indexY) => {
            if (indexY === guia && o.type === tipo) {
              tot += Number(a.ventasTotal ? a.ventasTotal : 0);
            }
          });
        });
      });
    });
    dataVentas.push(tot);
  }

  return dataVentas;
};

export const calculateCostosAnuales = (costoData, volumenData) => {
  const arrayCostosUnitarios = [];
  for (let i = 0; i < 10; i++) {
    let acum = 0;

    costoData.forEach((pais, indexPais) => {
      pais.stats.forEach((canal, indexCanal) => {
        canal.productos.forEach((prod, indexProd) => {
          MONTHS.map((s, indexM) => {
            const costoU = isNaN(prod.años[i].volMeses[s])
              ? 0
              : prod.años[i].volMeses[s];
            const vol = isNaN(
              volumenData[indexPais].stats[indexCanal].productos[indexProd]
                .años[i].volMeses[s],
            )
              ? 0
              : volumenData[indexPais].stats[indexCanal].productos[indexProd]
                .años[i].volMeses[s];

            acum += costoU * vol;
          });
        });
      });
    });
    arrayCostosUnitarios.push(acum);
  }

  return arrayCostosUnitarios;
};

export const calculateCostosAnualesTipo = (costoData, volumenData, tipo) => {
  const arrayCostosUnitarios = [];
  for (let i = 0; i < 10; i++) {
    let acum = 0;

    costoData.forEach((pais, indexPais) => {
      pais.stats.forEach((canal, indexCanal) => {
        canal.productos.forEach((prod, indexProd) => {
          if (prod.type === tipo) {
            MONTHS.map((s, indexM) => {
              const costoU = isNaN(prod.años[i].volMeses[s])
                ? 0
                : prod.años[i].volMeses[s];
              const vol = isNaN(
                volumenData[indexPais].stats[indexCanal].productos[indexProd]
                  .años[i].volMeses[s],
              )
                ? 0
                : volumenData[indexPais].stats[indexCanal].productos[indexProd]
                  .años[i].volMeses[s];

              acum += costoU * vol;
            });
          }
        });
      });
    });
    arrayCostosUnitarios.push(acum);
  }

  return arrayCostosUnitarios;
};

export const totComisiones = (costoData, infoForm) => {
  let comisiones = [];
  for (let i = 0; i < 10; i++) {
    let sum = 0;
    costoData.forEach((pais, indexPais) => {
      pais.stats.forEach((canal, indexCanal) => {
        canal.productos.forEach((prod, indexProd) => {
          const ventas =
            infoForm[pais.countryName][indexCanal].productos[indexProd].años[i]
              .ventasTotal;

          sum += (prod.comision / 100) * ventas;
          sum += (prod.cargos / 100) * ventas;
          sum += (prod.impuesto / 100) * ventas;
        });
      });
    });
    comisiones.push(sum);
  }
  return comisiones;
};

export const totComisionesTipo = (costoData, infoForm, tipo) => {
  let comisiones = [];
  for (let i = 0; i < 10; i++) {
    let sum = 0;
    costoData.forEach((pais, indexPais) => {
      pais.stats.forEach((canal, indexCanal) => {
        canal.productos.forEach((prod, indexProd) => {
          const ventas =
            infoForm[pais.countryName][indexCanal].productos[indexProd].años[i]
              .ventasTotal;

          const tipoCostoMap = {
            comision: 'comision',
            cargos: 'cargos',
            impuesto: 'impuesto',
          };

          const tipoCosto = tipoCostoMap[tipo];
          sum += (prod[tipoCosto] / 100) * ventas;
        });
      });
    });
    comisiones.push(sum);
  }
  return comisiones;
};

export const calculateCostosTotales = (costoData, infoForm, volumenData) => {
  const comisiones = totComisiones(costoData, infoForm); // me devuelve las comisiones totales en $ por anio teniendo en cuenta todos los prod , canales y paises
  const costosUnitarios = calculateCostosAnuales(costoData, volumenData);

  const arrCostosTotales = [];
  for (let i = 0; i < costosUnitarios.length; i++) {
    arrCostosTotales.push(costosUnitarios[i] + comisiones[i]);
  }
  return arrCostosTotales; // array de diez posiciones sumando en cada una los costos extras por comisiones mas lso costos unitarios
};

export const calculateMargenBrutoPesos = (costoData, infoForm, volumenData) => {
  const costosTotales = calculateCostosTotales(
    costoData,
    infoForm,
    volumenData,
  );
  const ventas = calculateVentas(infoForm);
  const resultado = [];
  for (let i = 0; i < ventas.length; i++) {
    let ganancia = ventas[i] - costosTotales[i];
    resultado.push(redondearHaciaArribaConDosDecimales(ganancia));
  }
  return resultado;
};
export const calculateMargenBrutoPorcentaje = (
  costoData,
  infoForm,
  volumenData,
) => {
  const costosTotales = calculateCostosTotales(
    costoData,
    infoForm,
    volumenData,
  );
  const ventas = calculateVentas(infoForm);
  const resultado = [];
  for (let i = 0; i < ventas.length; i++) {
    // Calcular la ganancia restando costos de ventas
    let ganancia = ventas[i] - costosTotales[i];

    // Calcular el porcentaje de ganancia en relación con las ventas
    let porcentajeGanancia = (ganancia / ventas[i]) * 100;
    resultado.push(
      Number.isNaN(redondearHaciaArribaConDosDecimales(porcentajeGanancia))
        ? 0
        : redondearHaciaArribaConDosDecimales(porcentajeGanancia),
    );
  }
  return resultado;
};

export const calculateCtas = (infoCuentas) => {
  const CCActivos = Object.keys(infoCuentas).filter(
    (key) => infoCuentas[key].visible === true,
  );
  const arrayCtas = [];

  for (let ctaIndex = 0; ctaIndex < 12; ctaIndex++) {
    // evaluo doce cuentas
    let arrayanios = [];
    for (let anio = 0; anio < 10; anio++) {
      // x cada anio
      let sumAnio = 0;
      for (let i = 0; i < CCActivos.length; i++) {
        // de todos mis cc activos

        sumAnio +=
          infoCuentas[CCActivos[i]].cuentas[ctaIndex].años[anio].volTotal;
      }
      arrayanios.push(sumAnio);
    }
    arrayCtas.push(arrayanios);
  }
  return arrayCtas; // rray de 12 posiciones (una pro cada cuenta) con un array de 10 posiciones adentro correspondiente al total por cada anio gastado ene sa cuenta
};

export const multiplicacionPxQCapex = (dataVolumen, dataPrecio) => {
  for (let i = 0; i < dataVolumen.length; i++) {
    // entro a cada bien
    for (let t = 0; t < dataVolumen[i].años.length; t++) {
      // año
      const totalesAnio = [];
      MONTHS.forEach((month) => {
        // OBTENGO EL VALOR DE CADA OUTPUT QUE ES PRECIO X VOLUMEN
        const volMes = dataVolumen[i].años[t].volMeses[month];
        const precioMes = dataPrecio[i].años[t].volMeses[month];
        const PxQMes = (dataVolumen[i].años[t].volMeses[month] =
          Math.round(volMes) * Math.round(precioMes));
        totalesAnio.push(PxQMes);
        return PxQMes;
      });
      const totalCapexAnual = totalesAnio.reduce((a, b) => a + b, 0); // CALCULO EL TOTAL POR Anio
      dataVolumen[i].años[t].ventasTotal = totalCapexAnual;
    }
  }
  return dataVolumen;
};

export const calcAmortizaciones = (PxQCapex) => {
  const myArrayAmort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let j = 0; j < PxQCapex.length; j++) {
    // cada bien
    for (let a = 0; a < PxQCapex[j].años.length; a++) {
      // cada anio
      MONTHS.map((s, indexM) => {
        let valorMensual = 0;
        if (PxQCapex[j].años[a].volMeses[s] !== 0) {
          const valorBien = PxQCapex[j].años[a].volMeses[s];
          const objetoEncontrado = optionsBienes.find(
            (opcion) => opcion.value === PxQCapex[j].bien,
          );
          const anioAmort = objetoEncontrado.amortizacion;
          let cantMeses = anioAmort * 12;
          valorMensual = valorBien / cantMeses;

          const mesesRestantesPrimerAnio = 12 - indexM;
          const pcioAmortizadoPrimerAnio =
            mesesRestantesPrimerAnio * valorMensual;
          myArrayAmort[a] += pcioAmortizadoPrimerAnio;

          for (let x = 1; x < anioAmort; x++) {
            const pcioAmortizado = 12 * valorMensual;
            const anioCurrent = a + x;

            if (anioCurrent <= 9) {
              // dentro del plazo planteado
              myArrayAmort[anioCurrent] += pcioAmortizado;
            }
          }

          if (anioAmort > 1) {
            const mesesRestantesUltimoAnio = indexM;
            const pcioAmortizadoUltimoAnio =
              mesesRestantesUltimoAnio * valorMensual;
            const anioUltimo = a + anioAmort;

            if (anioUltimo <= 9) {
              // dentro del plazo planteado
              myArrayAmort[anioUltimo] += pcioAmortizadoUltimoAnio;
            }
          }
        }
      });
    }
  }
  return myArrayAmort;
};

export const calcInversiones = (PxQCapex) => {
  const myArrayAmort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let j = 0; j < PxQCapex.length; j++) {
    // cada bien
    for (let a = 0; a < PxQCapex[j].años.length; a++) {
      // cada anio
      myArrayAmort[a] += PxQCapex[j].años[a].ventasTotal;
    }
  }
  return myArrayAmort;
};

export const calcTasaMensual = (tasaAnu) => {
  if (Number(tasaAnu) === 0) return 0;

  return Number(tasaAnu) / 12 || 0;
};

export const calcPagoMensual = (monto, tasaAnual, plazo) => {
  const tasaMensual = calcTasaMensual(tasaAnual);
  const firstTerm =
    Number(monto) *
    ((tasaMensual / 100) * ((100 + tasaMensual) / 100) ** Number(plazo));
  const secondTerm = ((100 + tasaMensual) / 100) ** Number(plazo) - 1;

  return firstTerm / secondTerm || 0;
};

export const calcCapInt = (monto, tasaAnual, plazo) =>
  calcPagoMensual(monto, tasaAnual, plazo) * Number(plazo) || 0;

export const calcInteresTotal = (monto, tasaAnual, plazo) =>
  calcCapInt(monto, tasaAnual, plazo) - Number(monto) || 0;

export const calcInteresMensual = (monto, tasaAnual, plazo) => {
  if (isNaN(calcInteresTotal(monto, tasaAnual, plazo) / Number(plazo))) {
    return 0;
  }
  return calcInteresTotal(monto, tasaAnual, plazo) / Number(plazo);
};

export const calcInteresesPagadosPorAnio = (prestamosData) => {
  let dataIntereses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < prestamosData.length; i++) {
    const { mesInicio, monto, plazo, tasaAnual } = prestamosData[i];
    const indexMes = MONTHS.indexOf(mesInicio.toLowerCase()) + 1; // el +1 es porque se empiezan a pagar desde el mes siguiente
    const montoMensual = calcInteresMensual(monto, tasaAnual, plazo);

    // se asume que comienzan en el anio 1 porque no haay posibildiad de elegir anio
    const mesesRestantesPrimerAnio = 12 - indexMes;
    const interesesAnioUno = mesesRestantesPrimerAnio * montoMensual;
    dataIntereses[0] += interesesAnioUno;

    const mesesQueFaltan = parseInt(plazo) - mesesRestantesPrimerAnio;
    if (mesesQueFaltan > 12) {
      const anios = Math.ceil(mesesQueFaltan / 12);
      for (let x = 0; x < anios; x++) {
        if (x === anios - 1) {
          const mesesRestantes = mesesQueFaltan % 12;
          dataIntereses[x + 1] += mesesRestantes * montoMensual;
        } else {
          dataIntereses[x + 1] += 12 * montoMensual;
        }
      }
    } else {
      dataIntereses[1] += mesesQueFaltan * montoMensual;
    }
  }
  return dataIntereses;
};

export const calcFinanciacionDeTerceros = (prestamosData) => {
  let dataFinanciacionDeTerceros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  
  const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", 
                     "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  
  for (let i = 0; i < prestamosData.length; i++) {
    const { mesInicio, monto, plazo, yearInicio } = prestamosData[i];
    
    // Convert month name to month index (0-11), ensuring uppercase comparison
    const monthIndex = monthNames.indexOf(mesInicio.toUpperCase());
    
    // Only process valid month names
    if (monthIndex !== -1) {
      // Calculate year index for the array (yearInicio - 1, minimum 0)
      const yearIndex = Math.max(0, parseInt(yearInicio) - 1);
      
      // Calculate payment per month
      const montoNumerico = parseInt(monto);
      const plazoNumerico = parseInt(plazo);
      const pagoMensual = montoNumerico / plazoNumerico;
      
      // Calculate payments for each year
      let remainingMonths = plazoNumerico;
      let currentYear = yearIndex;
      let monthsInCurrentYear = 12 - monthIndex - 1; // Exclude the start month
      
      // First year (partial)
      if (monthsInCurrentYear > 0) {
        if (remainingMonths <= monthsInCurrentYear) {
          dataFinanciacionDeTerceros[currentYear] += pagoMensual * remainingMonths;
          remainingMonths = 0;
        } else {
          dataFinanciacionDeTerceros[currentYear] += pagoMensual * monthsInCurrentYear;
          remainingMonths -= monthsInCurrentYear;
        }
        currentYear++;
      }
      
      // Full years
      while (remainingMonths >= 12) {
        dataFinanciacionDeTerceros[currentYear] += pagoMensual * 12;
        remainingMonths -= 12;
        currentYear++;
      }
      
      // Last year (partial if months remaining)
      if (remainingMonths > 0) {
        dataFinanciacionDeTerceros[currentYear] += pagoMensual * remainingMonths;
      }
    }
  }
  
  return dataFinanciacionDeTerceros;
};

export const calcularCreditosPorVentas = (
  data,
  creditosVentas,
  setCreditosPorVentas,
) => {
  if (!data) return {};

  // Sanitize entire dataset
  const sanitizedData = sanitizarDatosVolumen(data);

  // Inicializamos ivasGrupo como un array de 10 años con 12 meses cada uno
  let ivasGrupo = Array.from({ length: 10 }, () =>
    Object.fromEntries(MONTHS.map((month) => [month, 0])),
  );

  function obtenerIva(assumpFinancierasData) {
    let ivaDefault = 21;
    if (
      !assumpFinancierasData ||
      !assumpFinancierasData[0]?.iva ||
      assumpFinancierasData[0]?.iva === ''
    ) {
      return ivaDefault;
    }
    return Number(assumpFinancierasData[0]?.iva);
  }

  function agregarCobranza(
    mes,
    año,
    cobranzasGrupo,
    productosLista,
    obtenerIva,
    assumpFinancierasData,
  ) {
    // Sanitizamos el valor antes de usarlo
    let volMesValue = productosLista?.años[año]?.volMeses[mes];
    volMesValue = sanitizarValorExtremo(volMesValue, productosLista?.volInicial || 10);

    let cobradoFinal =
      volMesValue *
      (obtenerIva(assumpFinancierasData) / 100 + 1);

    // saco el volcoIva con contado
    cobradoFinal *= cobranzasGrupo?.contado / 100;

    // --- para treintaDias ---

    // luego solo si el mes es diferente a Enero y el año es diferente a 0 (osea que no es el primer año y el primer mes) calculo el treitaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && año === 0) {
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1];
      // teniendo el mesAnterior, calculo el treintaDias del mesAnterior, sanitizando el valor primero
      let volMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior];
      volMesAnterior = sanitizarValorExtremo(volMesAnterior, productosLista?.volInicial || 10);

      let cobradoMesAnterior =
        volMesAnterior *
        (obtenerIva(assumpFinancierasData) / 100 + 1);
      let treintaDias = cobranzasGrupo?.treintaDias;
      let treintaDiasFinal = treintaDias ?? 0;
      // sumo a cobradoFinal el treintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (treintaDiasFinal / 100);
    }
    // si el mes es enero pero el año es diferente a 0 entonces calculo el treintaDias de diciembre pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 1;
      let añoTemp = año;
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1;
        mesAnteriorUbicado += MONTHS.length;
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado];
      // teniendo el mesAnterior, calculo el treintaDias del mesAnterior, sanitizando el valor primero
      let volMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior];
      volMesAnterior = sanitizarValorExtremo(volMesAnterior, productosLista?.volInicial || 10);

      let cobradoMesAnterior =
        volMesAnterior *
        (obtenerIva(assumpFinancierasData) / 100 + 1);
      let treintaDias = cobranzasGrupo?.treintaDias;
      let treintaDiasFinal = treintaDias ?? 0;
      // sumo a cobradoFinal el treintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (treintaDiasFinal / 100);
    }

    // ... El resto del código de agregarCobranza sin cambios ...
    // pero aplicando la misma lógica de sanitización para los demás valores

    return cobradoFinal;
  }

  let creditos = [];
  let ivaDeVentas = [];

  const { volumenData, precioData, assumpFinancierasData } = data;

  // SANITIZACIÓN INTENSIVA - La hacemos aquí para asegurar datos limpios
  console.log("🧹 INICIO: Limpieza de valores extremos en calcularCreditosPorVentas");
  let valoresCorregidos = 0;
  
  // Sanitizamos volumenData antes de usarlo
  const volumenDataSanitizado = volumenData ? JSON.parse(JSON.stringify(volumenData)) : [];

  // Recorremos todos los niveles para corregir valores
  if (volumenDataSanitizado.length > 0) {
    for (let i = 0; i < volumenDataSanitizado.length; i++) {
      if (!volumenDataSanitizado[i]?.stats) continue;

      for (let x = 0; x < volumenDataSanitizado[i].stats.length; x++) {
        if (!volumenDataSanitizado[i].stats[x]?.productos) continue;

        for (let j = 0; j < volumenDataSanitizado[i].stats[x].productos.length; j++) {
          const producto = volumenDataSanitizado[i].stats[x].productos[j];
          if (!producto?.años) continue;

          // Determinar un valor base razonable
          let valorBase = producto.volInicial && Number(producto.volInicial) > 0 
            ? Number(producto.volInicial) 
            : 10;

          for (let t = 0; t < producto.años.length; t++) {
            if (!producto.años[t]?.volMeses) continue;

            // Obtener meses para procesar
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            
            // Primero revisa si hay valores normales para usar como referencia
            const mesesNormales = meses.filter(mes => 
              mes !== undefined && !esValorExtremo(producto.años[t].volMeses[mes]) && Number(producto.años[t].volMeses[mes]) > 0
            );
            
            // Si hay meses con valores normales, usamos su promedio como valor base
            if (mesesNormales.length > 0) {
              const suma = mesesNormales.reduce((acc, mes) => 
                acc + Number(producto.años[t].volMeses[mes] || 0), 0
              );
              valorBase = Math.round(suma / mesesNormales.length);
            }

            // Corregir valores extremos en cada mes
            for (let mes of meses) {
              const valorOriginal = producto.años[t].volMeses[mes];
              if (esValorExtremo(valorOriginal)) {
                producto.años[t].volMeses[mes] = valorBase;
                valoresCorregidos++;
              }
            }

            // Recalcular volTotal sumando los valores de meses
            const nuevoVolTotal = meses.reduce((acc, mes) => {
              const valor = Number(producto.años[t].volMeses[mes]);
              return acc + (Number.isNaN(valor) ? 0 : valor);
            }, 0);
            
            // Actualizar volTotal solo si hay una diferencia significativa
            const volTotalOriginal = Number(producto.años[t].volTotal);
            if (Number.isNaN(volTotalOriginal) || Math.abs(volTotalOriginal - nuevoVolTotal) > volTotalOriginal * 0.1) {
              producto.años[t].volTotal = nuevoVolTotal;
            }
          }
        }
      }
    }
  }
  console.log(`✅ FIN: Limpieza completada. Se corrigieron ${valoresCorregidos} valores extremos en calcularCreditosPorVentas`);

  // Continuamos con el resto de la función usando los datos sanitizados
  let ventas = showMultiplicacionPxQ(volumenDataSanitizado, precioData);
  let cobranzasGrupo = assumpFinancierasData[0]?.cobranzas;
  // recorro cada pais
  for (let i = 0; i < ventas.length; i++) {
    // recorro cada canal
    for (let x = 0; x < ventas[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < ventas[i].stats[x].productos.length; j++) {
        // recorro cada año
        for (let t = 0; t < ventas[i].stats[x].productos[j].años.length; t++) {
          // agrego la propiedad .iva a cada año
          ventas[i].stats[x].productos[j].años[t].iva =
            ventas[i].stats[x].productos[j].años[t].ventasTotal *
            (obtenerIva(assumpFinancierasData) / 100);

          // agrego la propiedad .ventasTotalConIva que sera .ventasTotal * IVA
          ventas[i].stats[x].productos[j].años[t].ventasTotalConIva =
            ventas[i].stats[x].productos[j].años[t].ventasTotal *
            (obtenerIva(assumpFinancierasData) / 100 + 1);

          // recorro cada mes del año que seran asi  "volMeses": { "enero": 20000, "febrero": 40000...}
          // y lo transformo en un objeto asi: "volMeses": {"enero": { "vol": 20000, "volConIva": (20000 * IVA) }}
          ventas[i].stats[x].productos[j].años[t] = {
            ...ventas[i].stats[x].productos[j].años[t],
            cobradoMeses: {
              enero: {},
              febrero: {},
              marzo: {},
              abril: {},
              mayo: {},
              junio: {},
              julio: {},
              agosto: {},
              septiembre: {},
              octubre: {},
              noviembre: {},
              diciembre: {},
            },
          };

          for (let month in ventas[i].stats[x].productos[j].años[t].volMeses) {
            ventas[i].stats[x].productos[j].años[t].cobradoMeses[month] = {
              cobrado: agregarCobranza(
                month,
                t,
                cobranzasGrupo,
                ventas[i].stats[x].productos[j],
                obtenerIva,
                assumpFinancierasData,
              ),
              vol: ventas[i].stats[x].productos[j].años[t].volMeses[month],
              volConIva:
                ventas[i].stats[x].productos[j].años[t].volMeses[month] *
                (obtenerIva(assumpFinancierasData) / 100 + 1),
            };
            // agrego a ivasGrupo su valor actual + el valor de (ventas[i].stats[x].productos[j].años[t].volMeses[month] * (obtenerIva(assumpFinancierasData) / 100)) para cada mes en cada año
            ivasGrupo[t][month] =
              Number(ivasGrupo[t][month]) +
              Number(
                ventas[i].stats[x].productos[j].años[t].volMeses[month] *
                (obtenerIva(assumpFinancierasData) / 100),
              );
          }
          // creo una propíedad llamada cobradoAnual que sera la suma de todos los cobrados de cada mes
          ventas[i].stats[x].productos[j].años[t].cobradoAnual = 0;
          for (let month in ventas[i].stats[x].productos[j].años[t]
            .cobradoMeses) {
            ventas[i].stats[x].productos[j].años[t].cobradoAnual +=
              ventas[i].stats[x].productos[j].años[t].cobradoMeses[
                month
              ].cobrado;
          }

          // creo la propiedad llamada pendientePorCobrar que sera la resta de ventasTotalConIva - cobradoAnual
          ventas[i].stats[x].productos[j].años[t].pendientePorCobrar =
            ventas[i].stats[x].productos[j].años[t].ventasTotalConIva -
            ventas[i].stats[x].productos[j].años[t].cobradoAnual;

          // Ahora almacenamos lo cobradoAnual en lugar de lo pendiente por cobrar
          creditos[t] = creditos[t]
            ? creditos[t] +
              ventas[i].stats[x].productos[j].años[t].cobradoAnual
            : ventas[i].stats[x].productos[j].años[t].cobradoAnual;
        }
      }
    }
  }

  // reviso creditos y si hay un valor que no sea un numero lo cambio a 0 o si su longitd es menor a 10, le agrego 0 hasta que sea 10
  if (creditos.length < 10) {
    for (let i = creditos.length; i < 10; i++) {
      creditos.push(0);
    }
  } else {
    creditos = creditos.map((item) => (isNaN(item) ? 0 : item));
  }

  setCreditosPorVentas(creditos);
  return ivasGrupo;
};

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export const calcularBienesDeCambio = (data, setCostos, stockInicialUser) => {
  const stockInicial = Number(stockInicialUser) || 0;
  
  // Sanitize data first using our utility
  const sanitizedData = sanitizarDatosVolumen(data);
  const { volumenData, costoData, assumpFinancierasData } = sanitizedData;
  const stockFijo = (assumpFinancierasData[0]?.stock || 0) / 30;

  console.log("Using sanitized data in calcularBienesDeCambio");

  // Using sanitized data for calculations
  const costos = showMultiplicacionPxQ(volumenData, costoData);
  let costosFinal = new Array(10).fill(0);

  const calcularCompras = (producto, mesActual, añoActual) => {
    let mesesNecesarios = stockFijo;
    let compras = 0;
    let mesIndex = MESES.indexOf(mesActual);
    let año = añoActual;
    let mesesProcesados = 0;

    while (mesesProcesados < mesesNecesarios) {
      const añoData = producto.años[año];
      if (!añoData) break;

      const mesData = añoData.costoMeses[MESES[mesIndex]];
      if (!mesData) break;

      const porcentaje = Math.min(1, mesesNecesarios - mesesProcesados);
      compras += mesData.costo * porcentaje;
      mesesProcesados += porcentaje;

      if (--mesIndex < 0) {
        mesIndex = 11;
        año++;
      }
    }

    return compras;
  };

  const procesarProducto = (producto) => {
    producto.años.forEach((año, indexAño) => {
      // Inicializar estructura de meses
      año.costoMeses = MESES.reduce((acc, mes) => ({
        ...acc,
        [mes]: { costo: sanitizarValorExtremo(año.volMeses[mes], 10) }
      }), {});

      // Calcular costo anual
      año.costoAnual = MESES.reduce((sum, mes) => sum + año.costoMeses[mes].costo, 0);

      // Inicializar stock calculado
      año.stockCalculos = MESES.reduce((acc, mes, indexMes) => {
        const mesAnterior = MESES[indexMes - 1] || 'diciembre';
        const añoAnterior = indexMes === 0 ? indexAño - 1 : indexAño;

        return {
          ...acc,
          [mes]: {
            stockInicial: obtenerStockInicial(producto, mes, indexAño, añoAnterior, mesAnterior),
            compras: calcularCompras(producto, mes, indexAño),
            consumo: año.costoMeses[mes].costo,
            stockFinal: 0
          }
        };
      }, {});

      // Calcular stock final
      MESES.forEach(mes => {
        const calculo = año.stockCalculos[mes];
        calculo.stockFinal = calculo.stockInicial + calculo.compras - calculo.consumo;
      });
    });
  };

  const obtenerStockInicial = (producto, mes, añoActual, añoAnterior, mesAnterior) => {
    if (añoActual === 0 && mes === 'enero') return stockInicial;
    if (mes === 'enero') {
      return producto.años[añoAnterior]?.stockCalculos?.[mesAnterior]?.stockFinal || 0;
    }
    return producto.años[añoActual]?.stockCalculos?.[mesAnterior]?.stockFinal || 0;
  };

  // Procesar todos los productos
  costos.forEach(canal => {
    canal.stats.forEach(stat => {
      stat.productos.forEach(producto => {
        if (producto.type === 'producto') {
          procesarProducto(producto);

          // Calcular costos finales
          producto.años.forEach((año, indexAño) => {
            const ultimoMesIndex = (12 - Math.ceil(stockFijo)) % 12;
            const mesKey = indexAño === 9 ? MESES[ultimoMesIndex] : 'diciembre';

            if (año.stockCalculos[mesKey]) {
              costosFinal[indexAño] += año.stockCalculos[mesKey].stockFinal;
            }
          });
        }
      });
    });
  });

  setCostos(costosFinal.map(val => isNaN(val) ? 0 : val));
};

export const calcularbienesDeUso = (data, setBienesDeUso) => {
  let capexPxQ = [];
  // let amortizaciones = [] creo un array con 10 objetos y cada uno de esos 10 tendra los 12 meses del año con un objeto vacio, asi [{enero: {}, febrero: {}...}, {enero: {}, febrero: {}...}...]
  let amortizaciones = Array.from({ length: 10 }, () =>
    Object.fromEntries(MONTHS.map((month) => [month, {}])),
  );
  let saldoBienesDeUso = [];
  const { capexPData, capexQData } = data;

  // recorro capexQData
  for (let i = 0; i < capexQData[0]?.capexQ?.length; i++) {
    // recorro el .años de cada elemento
    for (let j = 0; j < capexQData[0].capexQ[i].años.length; j++) {
      // recorro volMeses usando MONTHS
      for (let month in capexQData[0].capexQ[i].años[j].volMeses) {
        // agrego la propiedad .vol a cada mes

        if (capexQData[0].capexQ[i].años[j].volMeses[month] !== 0) {
          let Q = capexQData[0].capexQ[i].años[j].volMeses[month];
          let P = capexPData[0].capexP[i].años[j].volMeses[month];
          let resultado = P * Q;
          capexPxQ[j] = capexPxQ[j] ? capexPxQ[j] + resultado : resultado;

          const { bien } = capexQData[0].capexQ[i];
          // dentro de optionsBienes recorro hasta encontrar el elemento cuya propiedad .value sea igual a bien
          let bienEncontrado = optionsBienes.find(
            (option) => option.value === bien,
          );
          let tiempoAmortizacion = bienEncontrado
            ? bienEncontrado?.amortizacion * 12
            : 0;
          let conteo = tiempoAmortizacion;
          // ahora divido el resultado por el tiempo de amortizacion y lo redondeo a un entero mas cercano con Math.round
          let resultadoAmortizacion = resultado / tiempoAmortizacion;

          amortizaciones[j][month] = Number(amortizaciones[j][month])
            ? Number(amortizaciones[j][month]) + resultadoAmortizacion
            : resultadoAmortizacion;
          conteo -= 1;

          // subo al month siguiente (usando MONTHS) y resto 1 a conteo, si el mes siguiente pasa de diciembre entonces lo reinicio a enero y paso al año siguiente (j + 1), asi hasta que llegue a diciembre con el indice de año en 9 o que conteo sea 0
          let yearIndex = j;
          while (!(yearIndex === 9 && month === 'diciembre') && conteo > 0) {
            let monthIndex = MONTHS.indexOf(month) + 1;
            if (monthIndex === 12) {
              monthIndex = 0;
              yearIndex += 1;
            }
            month = MONTHS[monthIndex];
            amortizaciones[yearIndex][month] = Number(
              amortizaciones[yearIndex][month],
            )
              ? Number(amortizaciones[yearIndex][month]) + resultadoAmortizacion
              : resultadoAmortizacion;
            conteo -= 1;
          }
        } else {
          capexPxQ[j] = capexPxQ[j] ? capexPxQ[j] + 0 : 0;
        }
      }
    }
  }
  // recorro el array de 10 de amortizaciones y sumo todos los valores de cada mes para obtener el total de cada año en un array llamado amortizacionesAños
  let amortizacionesAños = [];
  for (let i = 0; i < amortizaciones.length; i++) {
    let total = 0;
    for (let month in amortizaciones[i]) {
      total += amortizaciones[i][month];
    }
    amortizacionesAños[i] = total;
  }

  for (let i = 0; i < 10; i++) {
    let valorInicial = i === 0 ? 0 : saldoBienesDeUso[i - 1];
    saldoBienesDeUso[i] = Math.round(
      valorInicial + capexPxQ[i] - amortizacionesAños[i],
    );
  }

  // reviso saldoBienesDeUso y si hay un valor que no sea un numero lo cambio a 0 o si su longitd es menor a 10, le agrego 0 hasta que sea 10
  if (saldoBienesDeUso.length < 10) {
    for (let i = saldoBienesDeUso.length; i < 10; i++) {
      saldoBienesDeUso.push(0);
    }
  } else {
    saldoBienesDeUso = saldoBienesDeUso.map((item) => (isNaN(item) ? 0 : item));
  }

  setBienesDeUso(saldoBienesDeUso);
  // creo 10 elementos en mi array de saldoBienesDeUso donde el primer valor es 0 y el resultado de cada uno sera capexPxQ[i] + valorInicial (en todos sera el resultado del anterior menos en el primer elemento, en ese caso sera 0) - amortizacionesAños[i]
};

export const comprasProductos = (data, obtenerIva) => {
  // lo vuelvo numero de serlo, si no lo cambio a 0

  let costosFinal = [];
  const { volumenData, costoData, assumpFinancierasData } = data;
  let stockFijo = assumpFinancierasData[0]?.stock / 30;
  // let stockFijo = 1.5

  let costos = showMultiplicacionPxQ(
    volumenData,
    costoData,
    assumpFinancierasData,
  );
  let mesesCubiertos = 0;
  let mesesTratados = 0;

  function calcularCompras(items, month, year, forLoop) {
    let itemActual = items.años[year].costoMeses[month]; // aca puedo obtener el .costo

    let monthSiguiente;
    let yearSiguiente;
    let monthSiguienteIndex;

    mesesCubiertos -= 1;

    let comprasFinal = 0;
    let decimalHandler = 0;

    if (mesesCubiertos === -1) {
      comprasFinal = itemActual.costo;
      mesesCubiertos = 0;
      mesesTratados = 1;
    } else if (mesesCubiertos < 1) {
      yearSiguiente = Math.floor(mesesTratados / 12);
      monthSiguienteIndex = Math.ceil(mesesTratados) - yearSiguiente * 12;
      if (monthSiguienteIndex === 12) monthSiguienteIndex = 0;

      if (monthSiguienteIndex !== 0) monthSiguienteIndex -= 1;
      else monthSiguienteIndex = 11;

      monthSiguiente = MONTHS[monthSiguienteIndex];

      let itemSiguiente =
        items?.años?.[yearSiguiente]?.costoMeses?.[monthSiguiente];

      if (yearSiguiente > 9) itemSiguiente = { costo: 0 };

      // obtengo cuando necesito de ese decimal para alcanzar el 1 completo
      let decimal = mesesCubiertos % 1;
      // calculo cuanto le falta para llegar a 1 a decimal
      let decimalFaltante = 1 - decimal;

      let costoRestante = itemSiguiente.costo * decimalFaltante;

      comprasFinal += costoRestante;

      decimalHandler = decimalFaltante;
      mesesTratados += decimalFaltante;
      mesesCubiertos += decimalFaltante;
    }

    let falta = (mesesCubiertos - stockFijo) * -1;

    while (falta > 0) {
      yearSiguiente = Math.floor(mesesTratados / 12);
      monthSiguienteIndex = Math.ceil(mesesTratados) - yearSiguiente * 12;
      if (monthSiguienteIndex === 12) monthSiguienteIndex = 0;
      monthSiguiente = MONTHS[monthSiguienteIndex];

      if (yearSiguiente > 9) break;

      let itemSiguiente = items.años[yearSiguiente].costoMeses[monthSiguiente];

      // identifico si mesesTratados es un numero con decimales
      if (falta < 1) {
        // obtengo cuando necesito de ese decimal para alcanzar el 1 completo
        let decimal = falta;
        // calculo cuanto le falta para llegar a 1 a decimal
        let decimalFaltante = 1 - decimal;

        let costoRestante = itemSiguiente.costo * decimalFaltante;

        comprasFinal += costoRestante;
        mesesTratados += decimalFaltante;
        mesesCubiertos += decimalFaltante;
      } else {
        comprasFinal += itemSiguiente.costo;
        mesesCubiertos += 1;
        mesesTratados += 1;
      }

      falta = (mesesCubiertos - stockFijo) * -1;
    }
    return comprasFinal;
  }

  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === 'producto') {
          // recorro cada año
          for (
            let t = 0;
            t < costos[i].stats[x].productos[j].años.length;
            t++
          ) {
            // recorro cada mes del año que seran asi  "volMeses": { "enero": 20000, "febrero": 40000...}
            // y lo transformo en un objeto asi: "volMeses": {"enero": {costo: 20000}}
            costos[i].stats[x].productos[j].años[t] = {
              ...costos[i].stats[x].productos[j].años[t],
              costoMeses: {
                enero: {},
                febrero: {},
                marzo: {},
                abril: {},
                mayo: {},
                junio: {},
                julio: {},
                agosto: {},
                septiembre: {},
                octubre: {},
                noviembre: {},
                diciembre: {},
              },
            };

            for (let month in costos[i].stats[x].productos[j].años[t]
              .volMeses) {
              costos[i].stats[x].productos[j].años[t].costoMeses[month] = {
                costo: costos[i].stats[x].productos[j].años[t].volMeses[month],
              };
            }

            // creo una propíedad llamada costoAnual que sera la suma de todos los costos de cada mes
            costos[i].stats[x].productos[j].años[t].costoAnual = 0;
            for (let month in costos[i].stats[x].productos[j].años[t]
              .costoMeses) {
              costos[i].stats[x].productos[j].años[t].costoAnual +=
                costos[i].stats[x].productos[j].años[t].costoMeses[month].costo;
            }
          }
        }
      }
    }
  }

  // VUELVO a recorrer hasta .años
  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === 'producto') {
          // recorro cada año
          mesesCubiertos = 0;
          mesesTratados = 0;
          for (
            let t = 0;
            t < costos[i].stats[x].productos[j].años.length;
            t++
          ) {
            costos[i].stats[x].productos[j].años[t] = {
              ...costos[i].stats[x].productos[j].años[t],
              compras: {
                enero: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'enero',
                  t,
                  false,
                ),
                febrero: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'febrero',
                  t,
                  false,
                ),
                marzo: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'marzo',
                  t,
                  false,
                ),
                abril: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'abril',
                  t,
                  false,
                ),
                mayo: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'mayo',
                  t,
                  false,
                ),
                junio: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'junio',
                  t,
                  false,
                ),
                julio: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'julio',
                  t,
                  false,
                ),
                agosto: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'agosto',
                  t,
                  false,
                ),
                septiembre: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'septiembre',
                  t,
                  false,
                ),
                octubre: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'octubre',
                  t,
                  false,
                ),
                noviembre: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'noviembre',
                  t,
                  false,
                ),
                diciembre: calcularCompras(
                  costos[i].stats[x].productos[j],
                  'diciembre',
                  t,
                  false,
                ),
              },
            };
          }
        }
      }
    }
  }

  let comprasTotales = [];
  // obtengo el total de compras de cada mes y lo guardo en comprasTotales para obtener el total anual
  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === 'producto') {
          // recorro cada año
          for (
            let t = 0;
            t < costos[i].stats[x].productos[j].años.length;
            t++
          ) {
            let total = 0;
            for (let month in costos[i].stats[x].productos[j].años[t].compras) {
              total += costos[i].stats[x].productos[j].años[t].compras[month];
            }
            comprasTotales[t] = comprasTotales[t]
              ? comprasTotales[t] +
              total * (1 + obtenerIva(assumpFinancierasData) / 100)
              : total * (1 + obtenerIva(assumpFinancierasData) / 100);
          }
        }
      }
    }
  }

  return comprasTotales;
};

export const calcularDeudasComerciales = (data, setDeudasComerciales) => {
  try {
    // Initialize a default array with zeros to ensure we always have values
    const defaultResult = Array(10).fill(0);

    // Handle case when data is not valid
    if (!data || !data.volumenData) {
      console.log('⚠️ No valid data provided to calcularDeudasComerciales, using default zeros');
      setDeudasComerciales(defaultResult);
      return [];
    }

    // Sanitize data first using our utility
    const sanitizedData = sanitizarDatosVolumen(data);
    
    let {
      volumenData,
      precioData,
      assumpFinancierasData,
      costoData,
      gastosPorCCData,
      capexPData,
      capexQData,
    } = sanitizedData;

    // Use default data if any required data is missing
    if (!volumenData || volumenData?.length === 0) volumenData = defaultVolumenData;
    if (!precioData || precioData?.length === 0) precioData = defaultPrecioData;
    if (!assumpFinancierasData || assumpFinancierasData?.length === 0)
      assumpFinancierasData = defaultAssumpFinancierasData;
    if (!costoData || costoData?.length === 0) costoData = defaultCostoData;
    if (!gastosPorCCData || gastosPorCCData?.length === 0) gastosPorCCData = defaultGastosPorCCData;
    if (!capexPData || capexPData?.length === 0) capexPData = defaultCapexPData;
    if (!capexQData || capexQData?.length === 0) capexQData = defaultCapexQData;

    console.log("Using sanitized data in calcularDeudasComerciales");

    let ivasCostosGrupoProductos = Array.from({ length: 10 }, () =>
      Object.fromEntries(MONTHS.map((month) => [month, 0])),
    );

    function obtenerIva(assumpFinancierasData) {
      // obtendre el Iva de assumpFinancierasData
      let iva = 0;
      try {
        let ivaObtenido = assumpFinancierasData?.[0]?.pagoProducto?.IVA;
      // reviso si existe y si es un numero
        if (ivaObtenido !== undefined && !Number.isNaN(ivaObtenido)) {
        iva = ivaObtenido;
        }
      } catch (error) {
        console.error("Error getting IVA:", error);
      }
      return iva;
    }

    function agregarCobranza(
      mes,
      año,
      cobranzasGrupo,
      productosLista,
      obtenerIvaFunc,
      assumpFinancierasData,
    ) {
      try {
        // Check if required properties exist
        if (!productosLista?.años || !productosLista.años[año]?.compras || !cobranzasGrupo) {
          return 0;
        }

        // Use sanitized value
        let comprasMes = sanitizarValorExtremo(productosLista.años[año].compras[mes], 10);
        if (Number.isNaN(comprasMes)) comprasMes = 0;
        
        const ivaRate = (obtenerIvaFunc(assumpFinancierasData) / 100) || 0;
        const contadoRate = (cobranzasGrupo.contado / 100) || 0;
        
        let cobradoFinal = comprasMes * (ivaRate + 1) * contadoRate;
        if (Number.isNaN(cobradoFinal)) cobradoFinal = 0;
        
        return cobradoFinal;
      } catch (error) {
        console.error("Error in agregarCobranza:", error);
        return 0;
      }
    }

    // Process normally and calculate deudas comerciales
    let costos = [];
    try {
      costos = showMultiplicacionPxQ(volumenData, costoData);
      if (!Array.isArray(costos)) {
        console.warn("showMultiplicacionPxQ didn't return an array, using empty array");
        costos = [];
      }
    } catch (error) {
      console.error("Error in showMultiplicacionPxQ:", error);
      costos = [];
    }

    let creditos = Array(10).fill(0); // Initialize with zeros to prevent undefined values
    const cobranzasGrupo = assumpFinancierasData?.[0]?.pagoProducto || { contado: 0 };

    // Try to calculate creditos safely using functional approach
    if (costos && Array.isArray(costos)) {
      // Filter and process only valid countries
      costos.filter(pais => pais?.stats)
        .forEach(pais => {
          // Filter and process only valid channels
          pais.stats.filter(canal => canal?.productos)
            .forEach(canal => {
              // Filter and process only valid products
              canal.productos.filter(producto =>
                producto && producto.type === 'producto' && producto.años
              )
                .forEach(producto => {
                  // Filter and process only valid years
                  producto.años.filter(año => año)
                    .forEach((año, t) => {
                      // Process the valid year data
                      try {
                        const ventasTotal = año.ventasTotal || 0;
                        const ivaRate = obtenerIva(assumpFinancierasData) / 100 || 0;
                        año.iva = ventasTotal * ivaRate;

                        // Calculate total purchases for all months
                        let totalCompras = 0;
                        if (año.compras) {
                          Object.keys(año.compras).forEach(month => {
                            // Use sanitized value
                            const compraValue = sanitizarValorExtremo(año.compras[month], 10);
                            if (!Number.isNaN(compraValue)) {
                              totalCompras += compraValue;
                            }
                          });
                        }

                        año.comprasTotalConIva = totalCompras * (ivaRate + 1);

                        año.cobroDeProducto = año.cobroDeProducto || {};

                        // Initialize with all months
                        MONTHS.forEach(month => {
                          año.cobroDeProducto[month] = año.cobroDeProducto[month] || {};
                        });

                        // Process each month's collection
                        if (año.compras) {
                          Object.keys(año.compras).forEach(month => {
                            try {
                              año.cobroDeProducto[month] = {
                                cobrado: agregarCobranza(
                                  month,
                                  t,
                                  cobranzasGrupo,
                                  producto,
                                  obtenerIva,
                                  assumpFinancierasData,
                                ),
                              };

                              // Safely calculate and add to ivasCostosGrupoProductos
                              const stockConsumo = año.stockCalculos?.[month]?.consumo || 0;
                              const ivaValue = stockConsumo * ivaRate;

                              if (!Number.isNaN(ivaValue)) {
                                ivasCostosGrupoProductos[t][month] =
                                  Number(ivasCostosGrupoProductos[t][month]) + Number(ivaValue);
                              }
                            } catch (error) {
                              console.error(`Error processing month ${month} in year ${t}:`, error);
                            }
                          });
                        }

                        // Calculate total collected for the year
                        año.cobradoAnual = 0;
                        Object.keys(año.cobroDeProducto).forEach(month => {
                          const cobradoValue = año.cobroDeProducto[month]?.cobrado || 0;
                          if (!Number.isNaN(cobradoValue)) {
                            año.cobradoAnual += cobradoValue;
                          }
                        });

                        // Calculate pending collection
                        const pendientePorCobrar = año.comprasTotalConIva - año.cobradoAnual;
                        año.pendientePorCobrar = pendientePorCobrar;

                        // Add to credits for this year
                        if (!Number.isNaN(pendientePorCobrar)) {
                          creditos[t] += pendientePorCobrar;
                        }
                      } catch (error) {
                        console.error(`Error processing year ${t} for product:`, error);
                      }
                    });
                });
            });
        });
    }

    // Make sure all values are valid numbers
    creditos = creditos.map(value => {
      if (Number.isNaN(value) || value === undefined || value === null) {
        return 0;
      }
      return value;
    });

    console.log('✅ Deudas Comerciales calculadas:', creditos);
    setDeudasComerciales(creditos);
    return ivasCostosGrupoProductos;
  } catch (error) {
    console.error("Fatal error in calcularDeudasComerciales:", error);
    const defaultResult = Array(10).fill(0);
    setDeudasComerciales(defaultResult);
    return Array.from({ length: 10 }, () =>
      Object.fromEntries(MONTHS.map((month) => [month, 0])),
    );
  }
};

export const calcularDeudasFiscales = (
  ivasDF,
  ivasCF,
  data,
  impuestosSobreLaRenta,
  setDeudasFiscales,
  setShowLoader,
) => {
  // Function declarations moved to the root of the function body
  const convertDateToIndex = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth();
  };

  const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  try {
    // Default result with zeros
    const defaultResult = Array(10).fill(0);

    // Handle cases where input data might be missing
    if (!ivasDF || !ivasCF || !data) {
      console.log('⚠️ Missing data in calcularDeudasFiscales, using default zeros');
      setDeudasFiscales(defaultResult);
      if (setShowLoader) setShowLoader(false);
      return;
    }

    // Sanitize data using our utility
    const sanitizedData = sanitizarDatosVolumen(data);
    let { volumenData, precioData, costoData } = sanitizedData;

    // Use default data if any required data is missing
    if (!volumenData || volumenData.length === 0) volumenData = defaultVolumenData;
    if (!precioData || precioData.length === 0) precioData = defaultPrecioData;
    if (!costoData || costoData.length === 0) costoData = defaultCostoData;

    // Ensure impuestosSobreLaRenta is valid
    if (!impuestosSobreLaRenta || !Array.isArray(impuestosSobreLaRenta)) {
      impuestosSobreLaRenta = defaultResult;
    }

    // ambos son un grupo de 10 años con 12 meses, lo guardare en una variable llamada resultado que sera igua, 10 años y 12 meses
    let resultado = Array.from({ length: 10 }, () =>
      Object.fromEntries(MONTHS.map((month) => [month, { SAF: 0, SAP: 0 }])),
    );

    // Check if ivasDF and ivasCF have the correct structure
    let validIvasDF = true;
    let validIvasCF = true;

    if (!Array.isArray(ivasDF) || ivasDF.length === 0) {
      validIvasDF = false;
    } else {
      // Check if each item has the expected structure with months
      for (let i = 0; i < Math.min(ivasDF.length, 1); i++) {
        if (typeof ivasDF[i] !== 'object' || !ivasDF[i].enero) {
          validIvasDF = false;
          break;
        }
      }
    }

    if (!Array.isArray(ivasCF) || ivasCF.length === 0) {
      validIvasCF = false;
    } else {
      // Check if each item has the expected structure with months
      for (let i = 0; i < Math.min(ivasCF.length, 1); i++) {
        if (typeof ivasCF[i] !== 'object' || !ivasCF[i].enero) {
          validIvasCF = false;
          break;
        }
      }
    }

    // If invalid, create default structures
    if (!validIvasDF) {
      console.warn("Invalid ivasDF structure, creating default");
      ivasDF = Array.from({ length: 10 }, () =>
        Object.fromEntries(MONTHS.map((month) => [month, 0])),
      );
    }

    if (!validIvasCF) {
      console.warn("Invalid ivasCF structure, creating default");
      ivasCF = Array.from({ length: 10 }, () =>
        Object.fromEntries(MONTHS.map((month) => [month, 0])),
      );
    }

    // Cálculo del IVA
    const resultadosAnualesIVA = Array(10).fill({ SAP: 0, SAF: 0 });

    try {
      for (let i = 0; i < 10; i++) {
        let totalSAF = 0;
        let totalSAP = 0;

        for (let j = 0; j < MONTHS.length; j++) {
          const month = MONTHS[j];
          const dfValue = ivasDF[i]?.[month] || 0;
          const cfValue = ivasCF[i]?.[month] || 0;

          resultado[i][month].SAF = dfValue;
          resultado[i][month].SAP = cfValue;

          totalSAF += dfValue;
          totalSAP += cfValue;
        }

        resultadosAnualesIVA[i] = { SAF: totalSAF, SAP: totalSAP };
      }
    } catch (error) {
      console.error("Error calculating IVA:", error);
    }

    let ventas = [];

    try {
      // Clone volumenData safely
      ventas = volumenData ? JSON.parse(JSON.stringify(volumenData)) : [];

      // Process countries with valid data structure
      if (volumenData) {
        volumenData.forEach((pais, i) => {
          // Only process if stats exists
          if (pais?.stats) {
            pais.stats.forEach((canal, x) => {
              // Only process if productos exists
              if (canal?.productos) {
                canal.productos.forEach((producto, j) => {
                  // Only process if años exists
                  if (producto?.años) {
                    producto.años.forEach((año, t) => {
                      // Only process if volMeses exists
                      if (año?.volMeses) {
                        // Only process if destination structure exists
                        if (ventas[i]?.stats?.[x]?.productos?.[j]?.años?.[t]) {
                          // Initialize vendido object
                          ventas[i].stats[x].productos[j].años[t].vendido =
                            ventas[i].stats[x].productos[j].años[t].vendido || {};

                          // Process each month
                          Object.keys(año.volMeses).forEach(month => {
                            try {
                              // Use sanitized values
                              const volMeses = sanitizarValorExtremo(año.volMeses[month], 10);
                              const precioMeses = sanitizarValorExtremo(
                                precioData?.[i]?.stats?.[x]?.productos?.[j]?.años?.[t]?.volMeses?.[month], 
                                10
                              );
                              const impuesto = costoData?.[i]?.stats?.[x]?.productos?.[j]?.impuesto || 0;

                              // Calculate and add vendido property
                              const vendidoValue = volMeses * precioMeses * (impuesto / 100);
                              if (!Number.isNaN(vendidoValue)) {
                                ventas[i].stats[x].productos[j].años[t].vendido[month] = vendidoValue;
                              } else {
                                ventas[i].stats[x].productos[j].años[t].vendido[month] = 0;
                              }
                            } catch (error) {
                              console.error(`Error processing vendido for month ${month}:`, error);
                              ventas[i].stats[x].productos[j].años[t].vendido[month] = 0;
                            }
                          });
                        }
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    } catch (error) {
      console.error("Error processing ventas:", error);
      // Provide default ventas in case of error
      ventas = volumenData;
    }

    // Safely calculate impuestosSobreLaVenta
    let impuestosSobreLaVenta = Array.from({ length: 10 }, () =>
      Object.fromEntries(MONTHS.map((month) => [month, 0])),
    );

    try {
      // Process ventas data with a nested approach that avoids continue statements
      if (ventas) {
        ventas.forEach((pais, i) => {
          if (pais?.stats) {
            pais.stats.forEach((canal, x) => {
              if (canal?.productos) {
                canal.productos.forEach((producto, j) => {
                  if (producto?.años) {
                    producto.años.forEach((año, t) => {
                      if (año?.vendido) {
                        // Process valid months
                        Object.keys(año.vendido)
                          .filter(month => MONTHS.includes(month))
                          .forEach(month => {
                            const vendidoValue = año.vendido[month] || 0;
                            if (!Number.isNaN(vendidoValue)) {
                              impuestosSobreLaVenta[t][month] += vendidoValue;
                            }
                          });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    } catch (error) {
      console.error("Error calculating impuestosSobreLaVenta:", error);
      // Keep the default impuestosSobreLaVenta
    }

    let otrosImpuestos = Array.from({ length: 10 }, () =>
      Object.fromEntries(MONTHS.map((month) => [month, 0])),
    );

    // Calculate otrosImpuestos safely
    try {
      for (let i = 0; i < impuestosSobreLaVenta.length; i++) {
        Object.keys(impuestosSobreLaVenta[i]).forEach(month => {
          let añoAnterior = i === 0 ? 0 : i - 1;
          let monthAnterior = month === 'enero' ? 'diciembre' : MONTHS[MONTHS.indexOf(month) - 1];

          if (i === 0 && month === 'enero') {
            otrosImpuestos[i][month] = 0;
          } else {
            const impuestoValue = impuestosSobreLaVenta?.[añoAnterior]?.[monthAnterior] || 0;
            otrosImpuestos[i][month] = impuestoValue;
          }
        });
      }

      // Calculate additional otrosImpuestos for January
      for (let i = 0; i < impuestosSobreLaVenta.length; i++) {
        Object.keys(impuestosSobreLaVenta[i]).forEach(month => {
          if (month === 'enero' && i !== 0) {
            const impuestoValue = impuestosSobreLaRenta?.[i - 1] || 0;
            if (!Number.isNaN(impuestoValue)) {
              otrosImpuestos[i][month] += impuestoValue;
            }
          }
        });
      }
    } catch (error) {
      console.error("Error calculating otrosImpuestos:", error);
    }

    // Calculate pagoOtrosImpuestos safely
    let pagoOtrosImpuestos = Array(10).fill(0);
    try {
      for (let i = 0; i < otrosImpuestos.length; i++) {
        let suma = 0;
        Object.keys(otrosImpuestos[i]).forEach(month => {
          const impuestoValue = otrosImpuestos[i][month] || 0;
          if (!Number.isNaN(impuestoValue)) {
            suma += impuestoValue;
          }
        });
        pagoOtrosImpuestos[i] = suma;
      }
    } catch (error) {
      console.error("Error calculating pagoOtrosImpuestos:", error);
    }

    // Calculate pendienteOtrosImpuestos safely
    let pendienteOtrosImpuestos = Array(10).fill(0);
    try {
      for (let i = 0; i < impuestosSobreLaVenta.length; i++) {
        const dicValue = impuestosSobreLaVenta[i]?.diciembre || 0;
        const impuestoValue = impuestosSobreLaRenta[i] || 0;

        if (!Number.isNaN(dicValue) && !Number.isNaN(impuestoValue)) {
          pendienteOtrosImpuestos[i] = dicValue + impuestoValue;
        }
      }
    } catch (error) {
      console.error("Error calculating pendienteOtrosImpuestos:", error);
    }

    // Calculate totalPendienteImpuestos safely
    let totalPendienteImpuestos = Array(10).fill(0);
    try {
      for (let i = 0; i < pendienteOtrosImpuestos.length; i++) {
        const pendienteValue = pendienteOtrosImpuestos[i] || 0;
        const sapValue = resultadosAnualesIVA[i]?.SAP || 0;

        if (!Number.isNaN(pendienteValue) && !Number.isNaN(sapValue)) {
          totalPendienteImpuestos[i] = pendienteValue + sapValue;
        }
      }
    } catch (error) {
      console.error("Error calculating totalPendienteImpuestos:", error);
    }

    // Validate all values are numbers
    totalPendienteImpuestos = totalPendienteImpuestos.map(value => {
      if (Number.isNaN(value) || value === undefined || value === null) {
        return 0;
      }
      return value;
    });

    setDeudasFiscales(totalPendienteImpuestos);
    if (setShowLoader) setShowLoader(false);
  } catch (error) {
    console.error("Fatal error in calcularDeudasFiscales:", error);
    const defaultResult = Array(10).fill(0);
    setDeudasFiscales(defaultResult);
    if (setShowLoader) setShowLoader(false);
  }
};

export const calcularResultadosNoAsignados = (
  resultadosNoAsignadosInput,
  resultadosDelEjercicioInput,
  resultadosEjerciciosArray,
  setFinal,
) => {
  // si resultadosNoAsignadosInput y resultadosDelEjercicioInput NO son numeros entonces sus valores seran 0
  if (isNaN(resultadosNoAsignadosInput)) resultadosNoAsignadosInput = 0;
  if (isNaN(resultadosDelEjercicioInput)) resultadosDelEjercicioInput = 0;
  // hago un for de 10 elementos
  let resultadosNoAsignados = [];
  for (let i = 0; i < 10; i++) {
    if (i === 0) {
      resultadosNoAsignados[i] =
        Number(resultadosNoAsignadosInput) +
        Number(resultadosDelEjercicioInput);
    } else {
      resultadosNoAsignados[i] =
        Number(resultadosEjerciciosArray[i - 1]) +
        Number(resultadosNoAsignados[i - 1]);
    }
  }

  // reviso resultadosNoAsignados y si hay un valor que no sea un numero lo cambio a 0 o si su longitd es menor a 10, le agrego 0 hasta que sea 10
  if (resultadosNoAsignados.length < 10) {
    for (let i = resultadosNoAsignados.length; i < 10; i++) {
      resultadosNoAsignados.push(0);
    }
  } else {
    resultadosNoAsignados = resultadosNoAsignados.map((item) =>
      isNaN(item) ? 0 : item,
    );
  }

  setFinal(resultadosNoAsignados);
};

export const calcularEquity = (
  array,
  setFinal,
  ResultadosNoAsignados,
  ResultadosDelEjercicio,
  setSuma,
  setShowLoader,
) => {
  let arrayInterno = array;
  let resultadosNoAsignadosInterno = ResultadosNoAsignados;
  let resultadosDelEjercicioInterno = ResultadosDelEjercicio;

  if (arrayInterno === undefined || arrayInterno?.length === 0)
    arrayInterno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (
    resultadosNoAsignadosInterno === undefined ||
    resultadosNoAsignadosInterno?.length === 0
  )
    resultadosNoAsignadosInterno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (
    resultadosDelEjercicioInterno === undefined ||
    resultadosDelEjercicioInterno?.length === 0
  )
    resultadosDelEjercicioInterno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let arrayFinal = [0];
  for (let i = 0; i < 10; i++) {
    if (i === 0) {
      arrayFinal[i + 1] = arrayInterno[0] * -1 + arrayInterno[1] * -1;
    } else {
      arrayFinal[i + 1] = arrayFinal[i - 1] + arrayInterno[i + 1] * -1;
    }
  }
  // elimino el ultimo elemento del array de arrayFinal
  arrayFinal.pop();
  setFinal(arrayFinal);
  // sumo los 3 arrayInterno de final, resultadosNoAsignados y resultadosDelEjercicio
  let suma = [];
  for (let i = 0; i < 10; i++) {
    suma[i] =
      Number(arrayFinal[i]) +
      Number(resultadosNoAsignadosInterno[i]) +
      Number(resultadosDelEjercicioInterno[i]);
  }
  setSuma(suma);
  setShowLoader(false);
};

const calcCapitalMensual = (monto, tasaAnual, plazo) =>
  calcPagoMensual(monto, tasaAnual, plazo) -
  calcInteresMensual(monto, tasaAnual, plazo) || 0;

export const calcularPrestamos = (prestamos, setFinal, setShowLoader) => {
  let prestamoscalculados = [];
  
  // Handle empty or invalid prestamos input
  if (!Array.isArray(prestamos) || prestamos.length === 0) {
    setFinal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setShowLoader(false);
    return;
  }
  

  for (let i = 0; i < prestamos.length; i++) {
    prestamoscalculados[i] = {
      titulo: prestamos[i]?.titulo ? prestamos[i]?.titulo : '',
      monto: prestamos[i]?.monto ? prestamos[i]?.monto : 0,
      plazo: prestamos[i]?.plazo ? prestamos[i]?.plazo : 0,
      tasaAnual: prestamos[i]?.tasaAnual ? prestamos[i]?.tasaAnual : 0,
      mesInicio: prestamos[i]?.mesInicio ? prestamos[i]?.mesInicio : 0,
      yearInicio: prestamos[i]?.yearInicio ? (Number(prestamos[i]?.yearInicio) - 1) : 0,
      // calcTasaMensual(cta.tasaAnual)
      tasaMensual: prestamos[i]?.tasaAnual
        ? calcTasaMensual(prestamos[i]?.tasaAnual)
        : 0,
      // calcPagoMensual(cta.monto, cta.tasaAnual, cta.plazo),
      pagoMensual:
        prestamos[i]?.monto && prestamos[i]?.tasaAnual && prestamos[i]?.plazo
          ? calcPagoMensual(
            prestamos[i]?.monto,
            prestamos[i]?.tasaAnual,
            prestamos[i]?.plazo,
          )
          : 0,
      // calcCapitalMensual(cta.monto, cta.tasaAnual, cta.plazo,),
      capitalMensual:
        prestamos[i]?.monto && prestamos[i]?.tasaAnual && prestamos[i]?.plazo
          ? calcCapitalMensual(
            prestamos[i]?.monto,
            prestamos[i]?.tasaAnual,
            prestamos[i]?.plazo,
          )
          : 0,
      interesMensual:
        prestamos[i]?.monto && prestamos[i]?.tasaAnual && prestamos[i]?.plazo
          ? calcInteresMensual(
            prestamos[i]?.monto,
            prestamos[i]?.tasaAnual,
            prestamos[i]?.plazo,
          )
          : 0,
      // calcInteresTotal(cta.monto, cta.tasaAnual, cta.plazo),
      interesTotal:
        prestamos[i]?.monto && prestamos[i]?.tasaAnual && prestamos[i]?.plazo
          ? calcInteresTotal(
            prestamos[i]?.monto,
            prestamos[i]?.tasaAnual,
            prestamos[i]?.plazo,
          )
          : 0,
      capInt:
        prestamos[i]?.monto && prestamos[i]?.tasaAnual && prestamos[i]?.plazo
          ? calcCapInt(
            prestamos[i]?.monto,
            prestamos[i]?.tasaAnual,
            prestamos[i]?.plazo,
          )
          : 0,
    };
  }

  // creo un array de 10 años con 12 meses llamado prestamos
  let prestamosArray = Array.from({ length: 10 }, () =>
    Object.fromEntries(MONTHS.map((month) => [month, 0])),
  );

  // recorro prestamoscalculados que es donde estan los prestamos y reviso su propiedad .mesInicio, .yearInicio y .monto para saber en que mes y año comienzan y los agrego a prestamosArray en la propiedad .ingreso tomando el .monto
  for (let i = 0; i < prestamoscalculados.length; i++) {
    // en minuscula

    let mesInicio =
      typeof prestamoscalculados[i]?.mesInicio === 'string'
        ? prestamoscalculados[i]?.mesInicio.toLowerCase()
        : prestamoscalculados[i]?.mesInicio;
    let yearInicio = Number(prestamoscalculados[i]?.yearInicio);
    let monto = Number(prestamoscalculados[i]?.monto);
    let plazo = Number(prestamoscalculados[i]?.plazo);
    let capitalMensual = Number(prestamoscalculados[i]?.capitalMensual);
    let interesMensual = Number(prestamoscalculados[i]?.interesMensual);
    let pagoMensual = Number(prestamoscalculados[i]?.pagoMensual);

    // recorro los 10 años
    for (let j = 0; j < 10; j++) {
      // si el año es igual al año de inicio entonces agrego el monto a prestamosArray
      if (j === yearInicio) {
        // prestamosArray[j][mesInicio] = {
        //   ...prestamosArray[j][mesInicio],
        //   ingreso: prestamosArray[j][mesInicio].ingreso
        //     ? prestamosArray[j][mesInicio].ingreso + monto
        //     : monto,
        // };
        prestamosArray[j] = {
          ...prestamosArray[j],
          [mesInicio]: {
            ...prestamosArray[j][mesInicio],
            ingreso: prestamosArray[j][mesInicio].ingreso
              ? prestamosArray[j][mesInicio].ingreso + monto
              : monto,
          },
        };
      }
    }

    // ubicado en el mes siguiente al mes de inicio agrego la propiedad pagoCapital a prestamosArray con el valor de capitalMensual la cantidad de veces igual a plazo
    let mesInicioUbicado = MONTHS.indexOf(mesInicio);
    let añoTemp = yearInicio;
    for (let j = 0; j < plazo; j++) {
      mesInicioUbicado += 1;
      if (mesInicioUbicado >= MONTHS.length) {
        mesInicioUbicado = 0;
        añoTemp += 1;
      }
      if (añoTemp < 10) {
        let mes = MONTHS[mesInicioUbicado];
        prestamosArray[añoTemp][mes] = {
          ...prestamosArray[añoTemp][mes],
          pagoCapital: prestamosArray[añoTemp][mes].pagoCapital
            ? prestamosArray[añoTemp][mes].pagoCapital + capitalMensual
            : capitalMensual,

          pagoIntereses: prestamosArray[añoTemp][mes].pagoIntereses
            ? prestamosArray[añoTemp][mes].pagoIntereses + interesMensual
            : interesMensual,

          pagos: prestamosArray[añoTemp][mes].pagos
            ? prestamosArray[añoTemp][mes].pagos + pagoMensual
            : pagoMensual,
        };
      }
    }
  }

  let prestamosAnuales = [];
  // en un objeto {} guardo el .pagoCapital, el .pagoIntereses y el .pagos de cada mes de cada año y lo sumo en un array de 10 años
  for (let i = 0; i < prestamosArray.length; i++) {
    let pagos = 0;
    let pagoCapital = 0;
    let pagoIntereses = 0;
    let ingresos = 0;
    for (let month in prestamosArray[i]) {
      pagos += prestamosArray[i][month].pagos
        ? prestamosArray[i][month].pagos
        : 0;
      pagoCapital += prestamosArray[i][month].pagoCapital
        ? prestamosArray[i][month].pagoCapital
        : 0;
      pagoIntereses += prestamosArray[i][month].pagoIntereses
        ? prestamosArray[i][month].pagoIntereses
        : 0;
      ingresos += prestamosArray[i][month].ingreso
        ? prestamosArray[i][month].ingreso
        : 0;
    }
    prestamosAnuales.push({ pagos, pagoCapital, pagoIntereses, ingresos });
  }

  let final = [];
  // para el primer elemento del array final, obtengo el .ingreso de ese año en prestamosAnuales y le resto el .pagoCapital de ese año en prestamosAnuales, para los demas elementos sumo el resultado de final anterior y aplico la misma logica
  for (let i = 0; i < prestamosAnuales.length; i++) {
    if (i === 0) {
      final[i] = prestamosAnuales[i].ingresos - prestamosAnuales[i].pagoCapital;
    } else {
      final[i] =
        final[i - 1] +
        (prestamosAnuales[i].ingresos - prestamosAnuales[i].pagoCapital);
    }
  }

  if (final === undefined || final?.length === 0)
    final = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  setFinal(final);
  setShowLoader(false);
};

export const calcularRemuneraciones = (data) => {
  const arrayKeys = Object.keys(data);
  let sum = [];

  for (let i = 0; i < arrayKeys.length; i++) {
    for (let j = 0; j < data[arrayKeys[i]].puestos.length; j++) {
      for (let k = 0; k < data[arrayKeys[i]].puestos[j].años.length; k++) {
        let totalAño = 0;
        let volMesesKeys = Object.keys(
          data[arrayKeys[i]].puestos[j].años[k].volMeses,
        );
        for (let l = 0; l < volMesesKeys.length; l++) {
          const volMes = Number(
            data[arrayKeys[i]].puestos[j].años[k].volMeses[volMesesKeys[l]],
          );
          const total = Number(data[arrayKeys[i]].puestos[j].total);
          totalAño += volMes * (Number.isNaN(Number(total)) ? 0 : total);
        }
        sum[k] = sum[k] ? sum[k] + totalAño : totalAño;
      }
    }
  }

  return sum;
};

export const getNumberFromStringPrice = (value) => {
  // los convertimos a numeros de JS ,es decir, mostrando los decimales con punto, eliminando el punto para los miles y  quitamos el signo $
  // si ingresamos : '$1.444,56' retorna 1444.56
  const cleanedValue = value.toString().replace('$', '').trim();
  const normalizedValue = cleanedValue.replace(/\./g, '').replace(',', '.');
  return Number(normalizedValue);
};

export const getStringFromPriceNumber = (value) =>
  // Convierte número a string con formato argentino y símbolo $
  `$${value.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
