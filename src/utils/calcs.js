/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */
import { MONTHS, optionsBienes } from 'constants/forms.constants';
import { set } from 'lodash';
import { getUser } from 'services/Requests';


export const redondearHaciaArribaConDosDecimales = (numero) => {
  // Multiplicar por 100 para mover dos decimales a la izquierda
  let multiplicado = numero * 100;
  // Redondear hacia arriba
  let redondeado = Math.ceil(multiplicado);
  // Dividir por 100 para devolver los dos decimales
  let resultado = redondeado / 100;

  return resultado;
}


export const showMultiplicacionPxQ = (dataVolumen, dataPrecio) => {
  for (let i = 0; i < dataVolumen.length; i++) {
    // entro a cada pais
    for (let x = 0; x < dataVolumen[i].stats.length; x++) {
      // a cada canal
      for (let j = 0; j < dataVolumen[i].stats[x].productos.length; j++) {
        // cada producto
        for (
          let t = 0;
          t < dataVolumen[i].stats[x].productos[j].años.length;
          t++
        ) {
          // año
          const totalesAnio = [];
          MONTHS.forEach((month) => {
            // OBTENGO EL VALOR DE CADA OUTPUT QUE ES PRECIO X VOLUMEN
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


// infoForm    :  { argentina: [{canal}]  , chile: [{canal}]}
export const calculateVentas = (infoForm) => {
  let dataVentas = []
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
    dataVentas.push(tot)
  }

  // retorno un array de 10 numeros  ,el total de ventas por cada año
  return dataVentas;
}

export const calculateVentasTipo = (infoForm, tipo) => {
  let dataVentas = []
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
    dataVentas.push(tot)
  }

  // retorno un array de 10 numeros  ,el total de ventas por cada año
  return dataVentas;
}

export const calculateCostosAnuales = (costoData, volumenData) => {
  const arrayCostosUnitarios = []
  for (let i = 0; i < 10; i++) {
    let acum = 0;

    // Iterar sobre las claves (paises)
    costoData.forEach((pais, indexPais) => {
      // Iterar sobre los elementos del array de cada pais
      pais.stats.forEach((canal, indexCanal) => {
        canal.productos.forEach((prod, indexProd) => {
          MONTHS.map((s, indexM) => {
            const costoU = isNaN(prod.años[i].volMeses[s]) ? 0 : prod.años[i].volMeses[s];
            const vol = isNaN(volumenData[indexPais].stats[indexCanal].productos[indexProd].años[i].volMeses[s]) ? 0
              : volumenData[indexPais].stats[indexCanal].productos[indexProd].años[i].volMeses[s];

            acum += costoU * vol;

          })
        })
      });
    });
    arrayCostosUnitarios.push(acum)
  }

  return arrayCostosUnitarios
}

export const calculateCostosAnualesTipo = (costoData, volumenData, tipo) => {
  const arrayCostosUnitarios = []
  for (let i = 0; i < 10; i++) {
    let acum = 0;

    // Iterar sobre las claves (paises)
    costoData.forEach((pais, indexPais) => {
      // Iterar sobre los elementos del array de cada pais
      pais.stats.forEach((canal, indexCanal) => {
        canal.productos.forEach((prod, indexProd) => {
          if (prod.type === tipo) {
            MONTHS.map((s, indexM) => {
              const costoU = isNaN(prod.años[i].volMeses[s]) ? 0 : prod.años[i].volMeses[s];
              const vol = isNaN(volumenData[indexPais].stats[indexCanal].productos[indexProd].años[i].volMeses[s]) ? 0
                : volumenData[indexPais].stats[indexCanal].productos[indexProd].años[i].volMeses[s];

              acum += costoU * vol;

            })
          }
        })
      });
    });
    arrayCostosUnitarios.push(acum)
  }

  return arrayCostosUnitarios
}


export const totComisiones = (costoData, infoForm) => {
  let comisiones = []
  for (let i = 0; i < 10; i++) {
    let sum = 0
    costoData.forEach((pais, indexPais) => {
      pais.stats.forEach((canal, indexCanal) => {
        canal.productos.forEach((prod, indexProd) => {
          // deinfo form saco las ventas de ese pord de ese canal de ese pais
          const ventas = infoForm[pais.countryName][indexCanal].productos[indexProd].años[i].ventasTotal;

          // de costo data saco las comisiones 
          sum += (prod.comision / 100) * ventas;
          sum += (prod.cargos / 100) * ventas;
          sum += (prod.impuesto / 100) * ventas;
        })
      });
    });
    comisiones.push(sum)
  }
  return comisiones;
}

export const totComisionesTipo = (costoData, infoForm, tipo) => {
  let comisiones = []
  for (let i = 0; i < 10; i++) {
    let sum = 0
    costoData.forEach((pais, indexPais) => {
      pais.stats.forEach((canal, indexCanal) => {
        canal.productos.forEach((prod, indexProd) => {
          // deinfo form saco las ventas de ese pord de ese canal de ese pais
          const ventas = infoForm[pais.countryName][indexCanal].productos[indexProd].años[i].ventasTotal;

          const tipoCostoMap = {
            comision: 'comision',
            cargos: 'cargos',
            impuesto: 'impuesto',
          };

          const tipoCosto = tipoCostoMap[tipo];
          sum += (prod[tipoCosto] / 100) * ventas;
        })
      });
    });
    comisiones.push(sum)
  }
  return comisiones;
}

export const calculateCostosTotales = (costoData, infoForm, volumenData) => {
  // a cada posicion, es decir, a cada anio de mi array de Costos Unitarios tengo que sumarle los costos por comisiones e impuestos
  const comisiones = totComisiones(costoData, infoForm); // me devuelve las comisiones totales en $ por anio teniendo en cuenta todos los prod , canales y paises
  const costosUnitarios = calculateCostosAnuales(costoData, volumenData);

  const arrCostosTotales = []
  for (let i = 0; i < costosUnitarios.length; i++) {
    arrCostosTotales.push(costosUnitarios[i] + comisiones[i]);
  }
  return arrCostosTotales   // array de diez posiciones sumando en cada una los costos extras por comisiones mas lso costos unitarios
}

export const calculateMargenBrutoPesos = (costoData, infoForm, volumenData) => {
  const costosTotales = calculateCostosTotales(costoData, infoForm, volumenData);
  const ventas = calculateVentas(infoForm);
  const resultado = [];
  for (let i = 0; i < ventas.length; i++) {
    // Calcular la ganancia restando costos de ventas
    let ganancia = ventas[i] - costosTotales[i];
    resultado.push(redondearHaciaArribaConDosDecimales(ganancia));
  }
  return resultado;
}
export const calculateMargenBrutoPorcentaje = (costoData, infoForm, volumenData) => {
  const costosTotales = calculateCostosTotales(costoData, infoForm, volumenData);
  const ventas = calculateVentas(infoForm);
  const resultado = [];
  for (let i = 0; i < ventas.length; i++) {
    // Calcular la ganancia restando costos de ventas
    let ganancia = ventas[i] - costosTotales[i];

    // Calcular el porcentaje de ganancia en relación con las ventas
    let porcentajeGanancia = (ganancia / ventas[i]) * 100;
    resultado.push(redondearHaciaArribaConDosDecimales(porcentajeGanancia));
  }
  return resultado;
}

export const calculateCtas = (infoCuentas) => {
  const CCActivos = Object.keys(infoCuentas).filter((key) => infoCuentas[key].visible === true);
  const arrayCtas = []

  for (let ctaIndex = 0; ctaIndex < 12; ctaIndex++) { // evaluo doce cuentas
    let arrayanios = []
    for (let anio = 0; anio < 10; anio++) { // x cada anio
      let sumAnio = 0
      for (let i = 0; i < CCActivos.length; i++) { // de todos mis cc activos

        sumAnio += infoCuentas[CCActivos[i]].cuentas[ctaIndex].años[anio].volTotal
      }
      arrayanios.push(sumAnio)
    }
    arrayCtas.push(arrayanios)
  }
  return arrayCtas // rray de 12 posiciones (una pro cada cuenta) con un array de 10 posiciones adentro correspondiente al total por cada anio gastado ene sa cuenta
}

export const multiplicacionPxQCapex = (dataVolumen, dataPrecio) => {
  for (let i = 0; i < dataVolumen.length; i++) {
    // entro a cada bien
    for (
      let t = 0;
      t < dataVolumen[i].años.length;
      t++
    ) {
      // año
      const totalesAnio = [];
      MONTHS.forEach((month) => {
        // OBTENGO EL VALOR DE CADA OUTPUT QUE ES PRECIO X VOLUMEN
        const volMes =
          dataVolumen[i].años[t].volMeses[month];
        const precioMes =
          dataPrecio[i].años[t].volMeses[month];
        const PxQMes = (dataVolumen[i].años[t].volMeses[month] = Math.round(volMes) * Math.round(precioMes));
        totalesAnio.push(PxQMes);
        return PxQMes;
      });
      const totalCapexAnual = totalesAnio.reduce((a, b) => a + b, 0); // CALCULO EL TOTAL POR Anio
      dataVolumen[i].años[t].ventasTotal =
        totalCapexAnual;
    }
  }
  return dataVolumen;
};

export const calcAmortizaciones = (PxQCapex) => {
  const myArrayAmort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let j = 0; j < PxQCapex.length; j++) { // cada bien
    for (let a = 0; a < PxQCapex[j].años.length; a++) { // cada anio
      MONTHS.map((s, indexM) => {
        let valorMensual = 0
        if (PxQCapex[j].años[a].volMeses[s] !== 0) {
          const valorBien = PxQCapex[j].años[a].volMeses[s];
          const objetoEncontrado = optionsBienes.find(opcion => opcion.value === PxQCapex[j].bien);
          const anioAmort = objetoEncontrado.amortizacion;
          let cantMeses = anioAmort * 12
          valorMensual = valorBien / cantMeses

          const mesesRestantesPrimerAnio = 12 - indexM;
          const pcioAmortizadoPrimerAnio = mesesRestantesPrimerAnio * valorMensual;
          myArrayAmort[a] += pcioAmortizadoPrimerAnio;

          for (let x = 1; x < anioAmort - 1; x++) {
            const pcioAmortizado = 12 * valorMensual;
            const anioCurrent = a + x;

            if (anioCurrent <= 9) { // dentro del plazo planteado
              myArrayAmort[anioCurrent] += pcioAmortizado;
            }
          }

          if (anioAmort > 1) {
            const mesesRestantesUltimoAnio = indexM === 0 ? 12 - indexM : indexM;
            const pcioAmortizadoUltimoAnio = mesesRestantesUltimoAnio * valorMensual;
            const anioUltimo = a + anioAmort - 1;

            if (anioUltimo <= 9) { // dentro del plazo planteado
              myArrayAmort[anioUltimo] += pcioAmortizadoUltimoAnio;
            }
          }
        }
      })
    }
  }
  return myArrayAmort
}


export const calcInversiones = (PxQCapex) => {
  const myArrayAmort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let j = 0; j < PxQCapex.length; j++) { // cada bien
    for (let a = 0; a < PxQCapex[j].años.length; a++) { // cada anio
      myArrayAmort[a] += PxQCapex[j].años[a].ventasTotal
    }
  }
  return myArrayAmort
}

export const calcTasaMensual = (tasaAnu) => {
  if (Number(tasaAnu) === 0) return 0;

  return Number(tasaAnu) / 12 || 0;
};

export const calcPagoMensual = (monto, tasaAnual, plazo) => {
  const tasaMensual = calcTasaMensual(tasaAnual) / 100;

  const firstTerm =
    Number(monto) * (tasaMensual * (1 + tasaMensual) ** Number(plazo));

  const secondTerm = (1 + tasaMensual) ** Number(plazo) - 1;

  return (firstTerm / secondTerm).toFixed(2) || 0;
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
  let dataIntereses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  for (let i = 0; i < prestamosData.length; i++) {
    const { mesInicio, monto, plazo, tasaAnual } = prestamosData[i];
    const indexMes = MONTHS.indexOf(mesInicio.toLowerCase()) + 1; // el +1 es porque se empiezan a pagar desde el mes siguiente
    const montoMensual = calcInteresMensual(monto, tasaAnual, plazo)

    // se asume que comienzan en el anio 1 porque no haay posibildiad de elegir anio
    const mesesRestantesPrimerAnio = 12 - indexMes;
    const interesesAnioUno = mesesRestantesPrimerAnio * montoMensual;
    dataIntereses[0] += interesesAnioUno;

    const mesesQueFaltan = parseInt(plazo) - mesesRestantesPrimerAnio;
    if (mesesQueFaltan > 12) {
      const anios = Math.ceil(mesesQueFaltan / 12)
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
  return dataIntereses
}

export const calcFinanciacionDeTerceros = (prestamosData) => {
  let dataFinanciacionDeTerceros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // no tenemos eleccionde anio asique se suman todos lso montos como del anio 1 

  for (let i = 0; i < prestamosData.length; i++) {
    const { mesInicio, monto, plazo, tasaAnual } = prestamosData[i];
    dataFinanciacionDeTerceros[0] += parseInt(monto);
  }
  return dataFinanciacionDeTerceros
}

export const calcularCreditosPorVentas = (data, creditosVentas, setCreditosVentas) => {
  // necesito obtener ganancias de cada mes y sumarlo a un total de ventas por año
  // las ventas se obtendran asi: ventas = ventasMes1 + ventasMes2 + ventasMes3 + ventasMes4 + ventasMes5 + ventasMes6 + ventasMes7 + ventasMes8 + ventasMes9 + ventasMes10 + ventasMes11 + ventasMes12
  // las ventasMesX se obtendran asi: ventasMesX = (volMesX * precioMesX)
  // primero usare getUser

  function obtenerIva(assumpFinancierasData) {
    // obtendre el Iva de assumpFinancierasData
    let iva = 0;
    let ivaObtenido = assumpFinancierasData[0]?.cobranzas?.IVA
    // reviso si existe y si es un numero
    if (ivaObtenido && !isNaN(ivaObtenido)) {
      iva = ivaObtenido
    }
    return iva;
  }

  function agregarCobranza(mes, año, cobranzasGrupo, productosLista, obtenerIva, assumpFinancierasData) {
    let cobradoFinal = productosLista?.años[año]?.volMeses[mes] * (obtenerIva(assumpFinancierasData) / 100 + 1)
    // saco el volcoIva con contado
    cobradoFinal *= (cobranzasGrupo?.contado / 100);

    // --- para treintaDias ---

    // luego solo si el mes es diferente a Enero y el año es diferente a 0 (osea que no es el primer año y el primer mes) calculo el treitaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && año === 0) {
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1]
      // teniendo el mesAnterior, calculo el treintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let treintaDias = cobranzasGrupo?.treintaDias
      let treintaDiasFinal = treintaDias ?? 0;
      // sumo a cobradoFinal el treintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (treintaDiasFinal / 100)

    }
    // si el mes es enero pero el año es diferente a 0 entonces calculo el treintaDias de diciembre pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 1
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el treintaDias del mesAnterior      
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let treintaDias = cobranzasGrupo?.treintaDias
      let treintaDiasFinal = treintaDias ?? 0
      // sumo a cobradoFinal el treintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (treintaDiasFinal / 100)
    }

    // --- para cuarentaycincoDias ---

    // luego si el mes es diferente a Enero o Febrero y el año es diferente a 0 calculo el cuarentaycincoDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -2 porque 45 dias atras me pone dos meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 2]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cuarentaycincoDias = cobranzasGrupo?.cuarentaycincoDias
      let cuarentaycincoDiasFinal = cuarentaycincoDias ?? 0
      // sumo a cobradoFinal el cuarentaycincoDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cuarentaycincoDiasFinal / 100)
    }
    // si el mes es enero o febrero pero el año es diferente a 0 entonces calculo el cuarentaycincoDias al descubrir el mes 2 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 2
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cuarentaycincoDias = cobranzasGrupo?.cuarentaycincoDias
      let cuarentaycincoDiasFinal = cuarentaycincoDias ?? 0
      // sumo a cobradoFinal el cuarentaycincoDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cuarentaycincoDiasFinal / 100)
    }

    // --- para sesentaDias ---

    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -2 porque 60 dias atras me pone dos meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 2]
      // teniendo el mesAnterior, calculo el sesentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let sesentaDias = cobranzasGrupo?.sesentaDias
      let sesentaDiasFinal = sesentaDias ?? 0
      // sumo a cobradoFinal el sesentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (sesentaDiasFinal / 100)
    }
    // si el mes es enero o febrero pero el año es diferente a 0 entonces calculo el sesentaDias al descubrir el mes 2 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 2
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let sesentaDias = cobranzasGrupo?.sesentaDias
      let sesentaDiasFinal = sesentaDias ?? 0
      // sumo a cobradoFinal el sesentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (sesentaDiasFinal / 100)
    }

    // --- para noventaDias ---

    // luego si el mes es diferente a Enero, Febrero o Marzo y el año es diferente a 0 calculo el noventaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -3 porque 90 dias atras me pone tres meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 3]
      // teniendo el mesAnterior, calculo el noventaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let noventaDias = cobranzasGrupo?.noventaDias
      let noventaDiasFinal = noventaDias ?? 0
      // sumo a cobradoFinal el noventaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (noventaDiasFinal / 100)
    }
    // si el mes es enero, febrero o marzo pero el año es diferente a 0 entonces calculo el noventaDias al descubrir el mes 3 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 3
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el noventaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let noventaDias = cobranzasGrupo?.noventaDias
      let noventaDiasFinal = noventaDias ?? 0
      // sumo a cobradoFinal el noventaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (noventaDiasFinal / 100)
    }

    // -- para cientoveinteDias (cveinteDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo o Abril y el año es diferente a 0 calculo el cientoveinteDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -4 porque 120 dias atras me pone cuatro meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 4]
      // teniendo el mesAnterior, calculo el cientoveinteDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoveinteDias = cobranzasGrupo?.cveinteDias
      let cientoveinteDiasFinal = cientoveinteDias ?? 0
      // sumo a cobradoFinal el cientoveinteDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoveinteDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo o abril pero el año es diferente a 0 entonces calculo el cientoveinteDias al descubrir el mes 4 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 4
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientoveinteDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoveinteDias = cobranzasGrupo?.cveinteDias
      let cientoveinteDiasFinal = cientoveinteDias ?? 0
      // sumo a cobradoFinal el cientoveinteDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoveinteDiasFinal / 100)
    }

    // -- para cientocincuentaDias (ccincuentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril o Mayo y el año es diferente a 0 calculo el cientocincuentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -5 porque 150 dias atras me pone cinco meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 5]
      // teniendo el mesAnterior, calculo el cientocincuentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientocincuentaDias = cobranzasGrupo?.ccincuentaDias
      let cientocincuentaDiasFinal = cientocincuentaDias ?? 0
      // sumo a cobradoFinal el cientocincuentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientocincuentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril o mayo pero el año es diferente a 0 entonces calculo el cientocincuentaDias al descubrir el mes 5 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 5
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientocincuentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientocincuentaDias = cobranzasGrupo?.ccincuentaDias
      let cientocincuentaDiasFinal = cientocincuentaDias ?? 0
      // sumo a cobradoFinal el cientocincuentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientocincuentaDiasFinal / 100)
    }

    // -- para cientoochentaDias (cochenteDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo o Junio y el año es diferente a 0 calculo el cientoochentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -6 porque 180 dias atras me pone seis meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 6]
      // teniendo el mesAnterior, calculo el cientoochentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoochentaDias = cobranzasGrupo?.cochenteDias
      let cientoochentaDiasFinal = cientoochentaDias ?? 0
      // sumo a cobradoFinal el cientoochentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoochentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo o junio pero el año es diferente a 0 entonces calculo el cientoochentaDias al descubrir el mes 6 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 6
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientoochentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoochentaDias = cobranzasGrupo?.cochenteDias
      let cientoochentaDiasFinal = cientoochentaDias ?? 0
      // sumo a cobradoFinal el cientoochentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoochentaDiasFinal / 100)
    }

    // -- para doscientosDiezDias (ddiezDiaz) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio o Julio y el año es diferente a 0 calculo el doscientosDiezDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -7 porque 210 dias atras me pone siete meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 7]
      // teniendo el mesAnterior, calculo el doscientosDiezDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosDiezDias = cobranzasGrupo?.ddiezDiaz
      let doscientosDiezDiasFinal = doscientosDiezDias ?? 0
      // sumo a cobradoFinal el doscientosDiezDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosDiezDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio o julio pero el año es diferente a 0 entonces calculo el doscientosDiezDias al descubrir el mes 7 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 7
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosDiezDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosDiezDias = cobranzasGrupo?.ddiezDiaz
      let doscientosDiezDiasFinal = doscientosDiezDias ?? 0
      // sumo a cobradoFinal el doscientosDiezDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosDiezDiasFinal / 100)
    }

    // -- para doscientosCuarentaDias (dcuarentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio o Agosto y el año es diferente a 0 calculo el doscientosCuarentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -8 porque 240 dias atras me pone ocho meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 8]
      // teniendo el mesAnterior, calculo el doscientosCuarentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosCuarentaDias = cobranzasGrupo?.dcuarentaDias
      let doscientosCuarentaDiasFinal = doscientosCuarentaDias ?? 0
      // sumo a cobradoFinal el doscientosCuarentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosCuarentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio o agosto pero el año es diferente a 0 entonces calculo el doscientosCuarentaDias al descubrir el mes 8 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 8
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosCuarentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosCuarentaDias = cobranzasGrupo?.dcuarentaDias
      let doscientosCuarentaDiasFinal = doscientosCuarentaDias ?? 0
      // sumo a cobradoFinal el doscientosCuarentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosCuarentaDiasFinal / 100)
    }

    // -- para doscientosSetentaDias (dsetentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto o Septiembre y el año es diferente a 0 calculo el doscientosSetentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -9 porque 270 dias atras me pone nueve meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 9]
      // teniendo el mesAnterior, calculo el doscientosSetentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosSetentaDias = cobranzasGrupo?.dsetentaDias
      let doscientosSetentaDiasFinal = doscientosSetentaDias ?? 0
      // sumo a cobradoFinal el doscientosSetentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosSetentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto o septiembre pero el año es diferente a 0 entonces calculo el doscientosSetentaDias al descubrir el mes 9 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 9
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosSetentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosSetentaDias = cobranzasGrupo?.dsetentaDias
      let doscientosSetentaDiasFinal = doscientosSetentaDias ?? 0
      // sumo a cobradoFinal el doscientosSetentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosSetentaDiasFinal / 100)
    }

    // -- para trescientosDias (trescientosDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre u Octubre y el año es diferente a 0 calculo el trescientosDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && mes.toLowerCase() !== 'octubre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -10 porque 300 dias atras me pone diez meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 10]
      // teniendo el mesAnterior, calculo el trescientosDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosDias = cobranzasGrupo?.trescientosDias
      let trescientosDiasFinal = trescientosDias ?? 0
      // sumo a cobradoFinal el trescientosDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre u octubre pero el año es diferente a 0 entonces calculo el trescientosDias al descubrir el mes 10 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 10
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el trescientosDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosDias = cobranzasGrupo?.trescientosDias
      let trescientosDiasFinal = trescientosDias ?? 0
      // sumo a cobradoFinal el trescientosDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosDiasFinal / 100)
    }

    // -- para trescientosTreintaDias (ttreintaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre o Noviembre y el año es diferente a 0 calculo el trescientosTreintaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && mes.toLowerCase() !== 'octubre' && mes.toLowerCase() !== 'noviembre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -11 porque 330 dias atras me pone once meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 11]
      // teniendo el mesAnterior, calculo el trescientosTreintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosTreintaDias = cobranzasGrupo?.ttreintaDias
      let trescientosTreintaDiasFinal = trescientosTreintaDias ?? 0
      // sumo a cobradoFinal el trescientosTreintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosTreintaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre o noviembre pero el año es diferente a 0 entonces calculo el trescientosTreintaDias al descubrir el mes 11 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 11
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el trescientosTreintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.volMeses[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosTreintaDias = cobranzasGrupo?.ttreintaDias
      let trescientosTreintaDiasFinal = trescientosTreintaDias ?? 0
      // sumo a cobradoFinal el trescientosTreintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosTreintaDiasFinal / 100)
    }

    return cobradoFinal
  }

  let creditos = []
  const { volumenData, precioData, assumpFinancierasData } = data;
  let ventas = showMultiplicacionPxQ(volumenData, precioData);
  let cobranzasGrupo = assumpFinancierasData[0]?.cobranzas
  // recorro cada pais
  for (let i = 0; i < ventas.length; i++) {
    // recorro cada canal
    for (let x = 0; x < ventas[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < ventas[i].stats[x].productos.length; j++) {
        // recorro cada año
        for (let t = 0; t < ventas[i].stats[x].productos[j].años.length; t++) {
          // agrego la propiedad .iva a cada año
          ventas[i].stats[x].productos[j].años[t].iva = ventas[i].stats[x].productos[j].años[t].ventasTotal * (obtenerIva(assumpFinancierasData) / 100);

          // agrego la propiedad .ventasTotalConIva que sera .ventasTotal * IVA
          ventas[i].stats[x].productos[j].años[t].ventasTotalConIva = ventas[i].stats[x].productos[j].años[t].ventasTotal * (obtenerIva(assumpFinancierasData) / 100 + 1);

          // recorro cada mes del año que seran asi  "volMeses": { "enero": 20000, "febrero": 40000...}
          // y lo transformo en un objeto asi: "volMeses": {"enero": { "vol": 20000, "volConIva": (20000 * IVA) }}
          ventas[i].stats[x].productos[j].años[t] = {
            ...ventas[i].stats[x].productos[j].años[t],
            cobradoMeses: {
              'enero': {},
              'febrero': {},
              'marzo': {},
              'abril': {},
              'mayo': {},
              'junio': {},
              'julio': {},
              'agosto': {},
              'septiembre': {},
              'octubre': {},
              'noviembre': {},
              'diciembre': {}
            }
          }

          for (let month in ventas[i].stats[x].productos[j].años[t].volMeses) {
            ventas[i].stats[x].productos[j].años[t].cobradoMeses[month] = {
              cobrado: agregarCobranza(month, t, cobranzasGrupo, ventas[i].stats[x].productos[j], obtenerIva, assumpFinancierasData),
              vol: ventas[i].stats[x].productos[j].años[t].volMeses[month],
              volConIva: ventas[i].stats[x].productos[j].años[t].volMeses[month] * (obtenerIva(assumpFinancierasData) / 100 + 1),
            }
          }
          // creo una propíedad llamada cobradoAnual que sera la suma de todos los cobrados de cada mes
          ventas[i].stats[x].productos[j].años[t].cobradoAnual = 0;
          for (let month in ventas[i].stats[x].productos[j].años[t].cobradoMeses) {
            ventas[i].stats[x].productos[j].años[t].cobradoAnual += ventas[i].stats[x].productos[j].años[t].cobradoMeses[month].cobrado;
          }

          // creo la propiedad llamada pendientePorCobrar que sera la resta de ventasTotalConIva - cobradoAnual
          ventas[i].stats[x].productos[j].años[t].pendientePorCobrar = ventas[i].stats[x].productos[j].años[t].ventasTotalConIva - ventas[i].stats[x].productos[j].años[t].cobradoAnual;

          // creditos.push(ventas[i].stats[x].productos[j].años[t].pendientePorCobrar);
          creditos[t] = creditos[t] ? creditos[t] + ventas[i].stats[x].productos[j].años[t].pendientePorCobrar : ventas[i].stats[x].productos[j].años[t].pendientePorCobrar;
        }
      }
    }
  }
  setCreditosVentas(creditos)

}

export const calcularBienesDeCambio = (data, setCostos, stockInicialUser) => {
  // lo vuelvo numero de serlo, si no lo cambio a 0
  stockInicialUser = Number(stockInicialUser) || 0

  let costosFinal = []
  const { volumenData, costoData, assumpFinancierasData } = data;
  let stockFijo = (assumpFinancierasData[0]?.stock / 30)
  // let stockFijo = 1.5

  let costos = showMultiplicacionPxQ(volumenData, costoData);
  let mesesCubiertos = 0
  let mesesTratados = 0

  function calcularCompras(items, month, year, forLoop) {

    let itemActual = items.años[year].costoMeses[month] // aca puedo obtener el .costo

    let monthSiguiente
    let yearSiguiente
    let monthSiguienteIndex

    mesesCubiertos -= 1

    let comprasFinal = 0
    let decimalHandler = 0

    if (mesesCubiertos === -1) {
      comprasFinal = itemActual.costo
      mesesCubiertos = 0
      mesesTratados = 1
    } else if (mesesCubiertos < 1) {
      yearSiguiente = Math.floor(mesesTratados / 12)
      monthSiguienteIndex = Math.ceil(mesesTratados) - (yearSiguiente * 12)
      if (monthSiguienteIndex === 12) monthSiguienteIndex = 0

      if (monthSiguienteIndex !== 0) monthSiguienteIndex -= 1
      else monthSiguienteIndex = 11

      monthSiguiente = MONTHS[monthSiguienteIndex]

      let itemSiguiente = items?.años?.[yearSiguiente]?.costoMeses?.[monthSiguiente]

      if (yearSiguiente > 9) itemSiguiente = { costo: 0 }

      // obtengo cuando necesito de ese decimal para alcanzar el 1 completo
      let decimal = mesesCubiertos % 1
      // calculo cuanto le falta para llegar a 1 a decimal
      let decimalFaltante = 1 - decimal

      let costoRestante = itemSiguiente.costo * decimalFaltante

      comprasFinal += costoRestante

      decimalHandler = decimalFaltante
      mesesTratados += decimalFaltante
      mesesCubiertos += decimalFaltante
    }


    let falta = (mesesCubiertos - stockFijo) * -1

    while (falta > 0) {

      yearSiguiente = Math.floor(mesesTratados / 12)
      monthSiguienteIndex = Math.ceil(mesesTratados) - (yearSiguiente * 12)
      if (monthSiguienteIndex === 12) monthSiguienteIndex = 0
      monthSiguiente = MONTHS[monthSiguienteIndex]

      if (yearSiguiente > 9) break

      let itemSiguiente = items.años[yearSiguiente].costoMeses[monthSiguiente]

      // identifico si mesesTratados es un numero con decimales
      if (falta < 1) {
        // obtengo cuando necesito de ese decimal para alcanzar el 1 completo
        let decimal = falta
        // calculo cuanto le falta para llegar a 1 a decimal
        let decimalFaltante = 1 - decimal

        let costoRestante = itemSiguiente.costo * decimalFaltante

        comprasFinal += costoRestante
        mesesTratados += decimalFaltante
        mesesCubiertos += decimalFaltante
      } else {
        comprasFinal += itemSiguiente.costo
        mesesCubiertos += 1
        mesesTratados += 1
      }

      falta = (mesesCubiertos - stockFijo) * -1
    }
    return comprasFinal
  }

  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === "producto") {
          // recorro cada año
          for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
            // recorro cada mes del año que seran asi  "volMeses": { "enero": 20000, "febrero": 40000...}
            // y lo transformo en un objeto asi: "volMeses": {"enero": {costo: 20000}}
            costos[i].stats[x].productos[j].años[t] = {
              ...costos[i].stats[x].productos[j].años[t],
              costoMeses: {
                'enero': {},
                'febrero': {},
                'marzo': {},
                'abril': {},
                'mayo': {},
                'junio': {},
                'julio': {},
                'agosto': {},
                'septiembre': {},
                'octubre': {},
                'noviembre': {},
                'diciembre': {}
              }
            }

            for (let month in costos[i].stats[x].productos[j].años[t].volMeses) {
              costos[i].stats[x].productos[j].años[t].costoMeses[month] = {
                costo: costos[i].stats[x].productos[j].años[t].volMeses[month]
              }
            }

            // creo una propíedad llamada costoAnual que sera la suma de todos los costos de cada mes
            costos[i].stats[x].productos[j].años[t].costoAnual = 0;
            for (let month in costos[i].stats[x].productos[j].años[t].costoMeses) {
              costos[i].stats[x].productos[j].años[t].costoAnual += costos[i].stats[x].productos[j].años[t].costoMeses[month].costo;
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
        if (costos[i].stats[x].productos[j].type === "producto") {
          // recorro cada año
          mesesCubiertos = 0
          mesesTratados = 0
          for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
            // creo la propiedad donde obtendre stockCalculos
            costos[i].stats[x].productos[j].años[t] = {
              ...costos[i].stats[x].productos[j].años[t],
              stockCalculos: {
                'enero': {
                  stockInicial: t === 0 ? stockInicialUser : costos[i].stats[x].productos[j].años[t - 1].stockCalculos.diciembre.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'enero', t, false),
                  // consumo será el mismo valor que costoMeses[month].costo
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.enero.costo,
                  stockFinal: 0,
                },
                'febrero': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.enero?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'febrero', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.febrero.costo,
                  stockFinal: 0,
                },
                'marzo': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.febrero?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'marzo', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.marzo.costo,
                  stockFinal: 0,
                },
                // ... repeat for the remaining months
                'abril': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.marzo?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'abril', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.abril.costo,
                  stockFinal: 0,
                },
                'mayo': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.abril?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'mayo', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.mayo.costo,
                  stockFinal: 0,
                },
                'junio': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.mayo?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'junio', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.junio.costo,
                  stockFinal: 0,
                },
                'julio': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.junio?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'julio', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.julio.costo,
                  stockFinal: 0,
                },
                'agosto': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.julio?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'agosto', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.agosto.costo,
                  stockFinal: 0,
                },
                'septiembre': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.agosto?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'septiembre', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.septiembre.costo,
                  stockFinal: 0,
                },
                'octubre': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.septiembre?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'octubre', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.octubre.costo,
                  stockFinal: 0,
                },
                'noviembre': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.octubre?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'noviembre', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.noviembre.costo,
                  stockFinal: 0,
                },

                'diciembre': {
                  stockInicial: costos[i].stats[x].productos[j].años[t]?.stockCalculos?.noviembre?.stockFinal,
                  compras: calcularCompras(costos[i].stats[x].productos[j], 'diciembre', t, false),
                  consumo: costos[i].stats[x].productos[j].años[t].costoMeses.diciembre.costo,
                  stockFinal: 0,
                },
              }
            }
          }
        }
      }
    }
  }

  // VUELVO a recorrer hasta .años para agregar propiedades extras
  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === "producto") {
          // recorro cada año
          mesesCubiertos = 0
          mesesTratados = 0
          for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
            for (let month in costos[i].stats[x].productos[j].años[t].stockCalculos) {
              // stockInicial sera igual a stockFinal del mes anterior A MENOS que sea enero y año 0, en cuyo caso sera igual a stockInicialUser, si es enero y otro año sera igual al stockFinal del año anterior de diciembre
              costos[i].stats[x].productos[j].años[t].stockCalculos[month].stockInicial = t === 0 && month === 'enero' ? stockInicialUser : month === 'enero' ? costos[i].stats[x].productos[j].años[t - 1].stockCalculos.diciembre.stockFinal : costos[i].stats[x].productos[j].años[t].stockCalculos[MONTHS[MONTHS.indexOf(month) - 1]].stockFinal

              // stockFinal sera igual a stockInicial + compras - consumo
              costos[i].stats[x].productos[j].años[t].stockCalculos[month].stockFinal = (costos[i].stats[x].productos[j].años[t].stockCalculos[month].stockInicial + costos[i].stats[x].productos[j].años[t].stockCalculos[month].compras - costos[i].stats[x].productos[j].años[t].stockCalculos[month].consumo === 0 ? costos[i].stats[x].productos[j].años[t].stockCalculos[month].stockInicial : costos[i].stats[x].productos[j].años[t].stockCalculos[month].stockInicial + costos[i].stats[x].productos[j].años[t].stockCalculos[month].compras - costos[i].stats[x].productos[j].años[t].stockCalculos[month].consumo)


            }
          }
        }
      }
    }
  }

  // vuelvo a recorrer hasta años, entonces tomo el stockFinal de diciembre del ultimo año y lo guardo en costosFinal
  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === "producto") {
          // recorro cada año
          for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
            // ahora agrego el stockFinal de diciembre de cada año sumado al valor de costosFinal en esa posicion del array si ya existia un valor alli
            let indexMonth = MONTHS.length - (1 + Math.ceil(stockFijo))
            if (indexMonth < 0) indexMonth += MONTHS.length
            let month = MONTHS[indexMonth]
            if (t <= 8) costosFinal[t] = costosFinal[t] ? costosFinal[t] + costos[i].stats[x].productos[j].años[t].stockCalculos.diciembre.stockFinal : costos[i].stats[x].productos[j].años[t].stockCalculos.diciembre.stockFinal
            else if (t === 9) costosFinal[t] = costosFinal[t] ? costosFinal[t] + costos[i].stats[x].productos[j].años[t].stockCalculos[month].stockFinal : costos[i].stats[x].productos[j].años[t].stockCalculos[month].stockFinal
          }
        }
      }
    }
  }

  setCostos(costosFinal)

}

export const calcularbienesDeUso = (data, setBienesDeUso) => {

  let capexPxQ = []
  // let amortizaciones = [] creo un array con 10 objetos y cada uno de esos 10 tendra los 12 meses del año con un objeto vacio, asi [{enero: {}, febrero: {}...}, {enero: {}, febrero: {}...}...] 
  let amortizaciones = Array.from({ length: 10 }, () => Object.fromEntries(MONTHS.map(month => [month, {}])))
  let saldoBienesDeUso = []
  const { capexPData, capexQData } = data;

  // recorro capexQData
  for (let i = 0; i < capexQData[0].capexQ.length; i++) {
    // recorro el .años de cada elemento
    for (let j = 0; j < capexQData[0].capexQ[i].años.length; j++) {
      // recorro volMeses usando MONTHS
      for (let month in capexQData[0].capexQ[i].años[j].volMeses) {
        // agrego la propiedad .vol a cada mes

        if (capexQData[0].capexQ[i].años[j].volMeses[month] !== 0) {
          let Q = capexQData[0].capexQ[i].años[j].volMeses[month]
          let P = capexPData[0].capexP[i].años[j].volMeses[month]
          let resultado = P * Q
          capexPxQ[j] = capexPxQ[j] ? capexPxQ[j] + (resultado) : (resultado)


          const { bien } = capexQData[0].capexQ[i];
          // dentro de optionsBienes recorro hasta encontrar el elemento cuya propiedad .value sea igual a bien
          let bienEncontrado = optionsBienes.find(option => option.value === bien)
          let tiempoAmortizacion = bienEncontrado ? (bienEncontrado?.amortizacion * 12) : 0
          let conteo = tiempoAmortizacion
          // ahora divido el resultado por el tiempo de amortizacion y lo redondeo a un entero mas cercano con Math.round
          let resultadoAmortizacion = resultado / tiempoAmortizacion

          amortizaciones[j][month] = Number(amortizaciones[j][month]) ? Number(amortizaciones[j][month]) + resultadoAmortizacion : resultadoAmortizacion
          conteo -= 1

          // subo al month siguiente (usando MONTHS) y resto 1 a conteo, si el mes siguiente pasa de diciembre entonces lo reinicio a enero y paso al año siguiente (j + 1), asi hasta que llegue a diciembre con el indice de año en 9 o que conteo sea 0
          let yearIndex = j
          while (!(yearIndex === 9 && month === 'diciembre') && conteo > 0) {
            let monthIndex = MONTHS.indexOf(month) + 1
            if (monthIndex === 12) {
              monthIndex = 0
              yearIndex += 1
            }
            month = MONTHS[monthIndex]
            amortizaciones[yearIndex][month] = Number(amortizaciones[yearIndex][month]) ? Number(amortizaciones[yearIndex][month]) + resultadoAmortizacion : resultadoAmortizacion
            conteo -= 1
          }
        } else {
          capexPxQ[j] = capexPxQ[j] ? capexPxQ[j] + 0 : 0
        }
      }
    }
  }

  // recorro el array de 10 de amortizaciones y sumo todos los valores de cada mes para obtener el total de cada año en un array llamado amortizacionesAños
  let amortizacionesAños = []
  for (let i = 0; i < amortizaciones.length; i++) {
    let total = 0
    for (let month in amortizaciones[i]) {
      total += amortizaciones[i][month]
    }
    amortizacionesAños[i] = total
  }

  for (let i = 0; i < 10; i++) {
    let valorInicial = i === 0 ? 0 : saldoBienesDeUso[i - 1]
    saldoBienesDeUso[i] = Math.round((valorInicial + capexPxQ[i]) - amortizacionesAños[i])
  }

  setBienesDeUso(saldoBienesDeUso)

  // creo 10 elementos en mi array de saldoBienesDeUso donde el primer valor es 0 y el resultado de cada uno sera capexPxQ[i] + valorInicial (en todos sera el resultado del anterior menos en el primer elemento, en ese caso sera 0) - amortizacionesAños[i]

}



export const comprasProductos = (data, stockInicialUser, obtenerIva) => {
  // lo vuelvo numero de serlo, si no lo cambio a 0
  stockInicialUser = Number(stockInicialUser) || 0

  let costosFinal = []
  const { volumenData, costoData, assumpFinancierasData } = data;
  let stockFijo = (assumpFinancierasData[0]?.stock / 30)
  // let stockFijo = 1.5

  let costos = showMultiplicacionPxQ(volumenData, costoData, assumpFinancierasData);
  let mesesCubiertos = 0
  let mesesTratados = 0

  function calcularCompras(items, month, year, forLoop) {

    let itemActual = items.años[year].costoMeses[month] // aca puedo obtener el .costo

    let monthSiguiente
    let yearSiguiente
    let monthSiguienteIndex

    mesesCubiertos -= 1

    let comprasFinal = 0
    let decimalHandler = 0

    if (mesesCubiertos === -1) {
      comprasFinal = itemActual.costo
      mesesCubiertos = 0
      mesesTratados = 1
    } else if (mesesCubiertos < 1) {
      yearSiguiente = Math.floor(mesesTratados / 12)
      monthSiguienteIndex = Math.ceil(mesesTratados) - (yearSiguiente * 12)
      if (monthSiguienteIndex === 12) monthSiguienteIndex = 0

      if (monthSiguienteIndex !== 0) monthSiguienteIndex -= 1
      else monthSiguienteIndex = 11

      monthSiguiente = MONTHS[monthSiguienteIndex]

      let itemSiguiente = items?.años?.[yearSiguiente]?.costoMeses?.[monthSiguiente]

      if (yearSiguiente > 9) itemSiguiente = { costo: 0 }

      // obtengo cuando necesito de ese decimal para alcanzar el 1 completo
      let decimal = mesesCubiertos % 1
      // calculo cuanto le falta para llegar a 1 a decimal
      let decimalFaltante = 1 - decimal

      let costoRestante = itemSiguiente.costo * decimalFaltante

      comprasFinal += costoRestante

      decimalHandler = decimalFaltante
      mesesTratados += decimalFaltante
      mesesCubiertos += decimalFaltante
    }


    let falta = (mesesCubiertos - stockFijo) * -1

    while (falta > 0) {

      yearSiguiente = Math.floor(mesesTratados / 12)
      monthSiguienteIndex = Math.ceil(mesesTratados) - (yearSiguiente * 12)
      if (monthSiguienteIndex === 12) monthSiguienteIndex = 0
      monthSiguiente = MONTHS[monthSiguienteIndex]

      if (yearSiguiente > 9) break

      let itemSiguiente = items.años[yearSiguiente].costoMeses[monthSiguiente]

      // identifico si mesesTratados es un numero con decimales
      if (falta < 1) {
        // obtengo cuando necesito de ese decimal para alcanzar el 1 completo
        let decimal = falta
        // calculo cuanto le falta para llegar a 1 a decimal
        let decimalFaltante = 1 - decimal

        let costoRestante = itemSiguiente.costo * decimalFaltante

        comprasFinal += costoRestante
        mesesTratados += decimalFaltante
        mesesCubiertos += decimalFaltante
      } else {
        comprasFinal += itemSiguiente.costo
        mesesCubiertos += 1
        mesesTratados += 1
      }

      falta = (mesesCubiertos - stockFijo) * -1
    }
    return comprasFinal
  }

  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === "producto") {
          // recorro cada año
          for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
            // recorro cada mes del año que seran asi  "volMeses": { "enero": 20000, "febrero": 40000...}
            // y lo transformo en un objeto asi: "volMeses": {"enero": {costo: 20000}}
            costos[i].stats[x].productos[j].años[t] = {
              ...costos[i].stats[x].productos[j].años[t],
              costoMeses: {
                'enero': {},
                'febrero': {},
                'marzo': {},
                'abril': {},
                'mayo': {},
                'junio': {},
                'julio': {},
                'agosto': {},
                'septiembre': {},
                'octubre': {},
                'noviembre': {},
                'diciembre': {}
              },
            }

            for (let month in costos[i].stats[x].productos[j].años[t].volMeses) {
              costos[i].stats[x].productos[j].años[t].costoMeses[month] = {
                costo: costos[i].stats[x].productos[j].años[t].volMeses[month]
              }
            }

            // creo una propíedad llamada costoAnual que sera la suma de todos los costos de cada mes
            costos[i].stats[x].productos[j].años[t].costoAnual = 0;
            for (let month in costos[i].stats[x].productos[j].años[t].costoMeses) {
              costos[i].stats[x].productos[j].años[t].costoAnual += costos[i].stats[x].productos[j].años[t].costoMeses[month].costo;
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
        if (costos[i].stats[x].productos[j].type === "producto") {
          // recorro cada año
          mesesCubiertos = 0
          mesesTratados = 0
          for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
            costos[i].stats[x].productos[j].años[t] = {
              ...costos[i].stats[x].productos[j].años[t],
              compras: {
                enero: calcularCompras(costos[i].stats[x].productos[j], 'enero', t, false),
                febrero: calcularCompras(costos[i].stats[x].productos[j], 'febrero', t, false),
                marzo: calcularCompras(costos[i].stats[x].productos[j], 'marzo', t, false),
                abril: calcularCompras(costos[i].stats[x].productos[j], 'abril', t, false),
                mayo: calcularCompras(costos[i].stats[x].productos[j], 'mayo', t, false),
                junio: calcularCompras(costos[i].stats[x].productos[j], 'junio', t, false),
                julio: calcularCompras(costos[i].stats[x].productos[j], 'julio', t, false),
                agosto: calcularCompras(costos[i].stats[x].productos[j], 'agosto', t, false),
                septiembre: calcularCompras(costos[i].stats[x].productos[j], 'septiembre', t, false),
                octubre: calcularCompras(costos[i].stats[x].productos[j], 'octubre', t, false),
                noviembre: calcularCompras(costos[i].stats[x].productos[j], 'noviembre', t, false),
                diciembre: calcularCompras(costos[i].stats[x].productos[j], 'diciembre', t, false),
              }
            }
          }
        }
      }
    }
  }

  let comprasTotales = []
  // obtengo el total de compras de cada mes y lo guardo en comprasTotales para obtener el total anual
  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === "producto") {
          // recorro cada año
          for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
            let total = 0
            for (let month in costos[i].stats[x].productos[j].años[t].compras) {
              total += costos[i].stats[x].productos[j].años[t].compras[month]
            }
            comprasTotales[t] = comprasTotales[t] ? comprasTotales[t] + (total * (1 + (obtenerIva(assumpFinancierasData) / 100))) : (total * (1 + (obtenerIva(assumpFinancierasData) / 100)))
          }
        }
      }
    }
  }

  return comprasTotales

}

export const calcularDeudasComerciales = (data, stockInicialUser) => {

  const { volumenData, precioData, assumpFinancierasData, costoData, gastosPorCCData } = data;

  function obtenerIva(assumpFinancierasData) {
    // obtendre el Iva de assumpFinancierasData
    let iva = 0;
    let ivaObtenido = assumpFinancierasData[0]?.pagoProducto?.IVA
    // reviso si existe y si es un numero
    if (ivaObtenido && !isNaN(ivaObtenido)) {
      iva = ivaObtenido
    }
    return iva;
  }

  function obtenerIvaServicios(assumpFinancierasData) {
    // obtendre el Iva de assumpFinancierasData
    let iva = 0;
    let ivaObtenido = assumpFinancierasData[0]?.pagoServicio?.IVA
    // reviso si existe y si es un numero
    if (ivaObtenido && !isNaN(ivaObtenido)) {
      iva = ivaObtenido
    }
    return iva;
  }

  function obtenerIvaServicios2(assumpFinancierasData) {
    // obtendre el Iva de assumpFinancierasData
    let iva = 0;
    let ivaObtenido = assumpFinancierasData[0]?.pagoServicio?.IVA
    // reviso si existe y si es un numero
    if (ivaObtenido && !isNaN(ivaObtenido)) {
      iva = ivaObtenido
    }
    return 0;
  }

  let compras = comprasProductos(data, stockInicialUser, obtenerIva)



  function agregarCobranza(mes, año, cobranzasGrupo, productosLista, obtenerIva, assumpFinancierasData) {
    let cobradoFinal = productosLista?.años[año]?.compras[mes] * (obtenerIva(assumpFinancierasData) / 100 + 1)
    // saco el volcoIva con contado
    cobradoFinal *= (cobranzasGrupo?.contado / 100);

    // --- para treintaDias ---

    // luego solo si el mes es diferente a Enero y el año es diferente a 0 (osea que no es el primer año y el primer mes) calculo el treitaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && año === 0) {
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1]
      // teniendo el mesAnterior, calculo el treintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let treintaDias = cobranzasGrupo?.treintaDias
      let treintaDiasFinal = treintaDias ?? 0;
      // sumo a cobradoFinal el treintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (treintaDiasFinal / 100)

    }
    // si el mes es enero pero el año es diferente a 0 entonces calculo el treintaDias de diciembre pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 1
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el treintaDias del mesAnterior      
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let treintaDias = cobranzasGrupo?.treintaDias
      let treintaDiasFinal = treintaDias ?? 0
      // sumo a cobradoFinal el treintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (treintaDiasFinal / 100)
    }

    // --- para cuarentaycincoDias ---

    // luego si el mes es diferente a Enero o Febrero y el año es diferente a 0 calculo el cuarentaycincoDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -2 porque 45 dias atras me pone dos meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 2]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cuarentaycincoDias = cobranzasGrupo?.cuarentaycincoDias
      let cuarentaycincoDiasFinal = cuarentaycincoDias ?? 0
      // sumo a cobradoFinal el cuarentaycincoDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cuarentaycincoDiasFinal / 100)
    }
    // si el mes es enero o febrero pero el año es diferente a 0 entonces calculo el cuarentaycincoDias al descubrir el mes 2 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 2
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cuarentaycincoDias = cobranzasGrupo?.cuarentaycincoDias
      let cuarentaycincoDiasFinal = cuarentaycincoDias ?? 0
      // sumo a cobradoFinal el cuarentaycincoDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cuarentaycincoDiasFinal / 100)
    }

    // --- para sesentaDias ---

    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -2 porque 60 dias atras me pone dos meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 2]
      // teniendo el mesAnterior, calculo el sesentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let sesentaDias = cobranzasGrupo?.sesentaDias
      let sesentaDiasFinal = sesentaDias ?? 0
      // sumo a cobradoFinal el sesentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (sesentaDiasFinal / 100)
    }
    // si el mes es enero o febrero pero el año es diferente a 0 entonces calculo el sesentaDias al descubrir el mes 2 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 2
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let sesentaDias = cobranzasGrupo?.sesentaDias
      let sesentaDiasFinal = sesentaDias ?? 0
      // sumo a cobradoFinal el sesentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (sesentaDiasFinal / 100)
    }

    // --- para noventaDias ---

    // luego si el mes es diferente a Enero, Febrero o Marzo y el año es diferente a 0 calculo el noventaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -3 porque 90 dias atras me pone tres meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 3]
      // teniendo el mesAnterior, calculo el noventaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let noventaDias = cobranzasGrupo?.noventaDias
      let noventaDiasFinal = noventaDias ?? 0
      // sumo a cobradoFinal el noventaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (noventaDiasFinal / 100)
    }
    // si el mes es enero, febrero o marzo pero el año es diferente a 0 entonces calculo el noventaDias al descubrir el mes 3 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 3
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el noventaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let noventaDias = cobranzasGrupo?.noventaDias
      let noventaDiasFinal = noventaDias ?? 0
      // sumo a cobradoFinal el noventaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (noventaDiasFinal / 100)
    }

    // -- para cientoveinteDias (cveinteDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo o Abril y el año es diferente a 0 calculo el cientoveinteDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -4 porque 120 dias atras me pone cuatro meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 4]
      // teniendo el mesAnterior, calculo el cientoveinteDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoveinteDias = cobranzasGrupo?.cveinteDias
      let cientoveinteDiasFinal = cientoveinteDias ?? 0
      // sumo a cobradoFinal el cientoveinteDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoveinteDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo o abril pero el año es diferente a 0 entonces calculo el cientoveinteDias al descubrir el mes 4 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 4
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientoveinteDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoveinteDias = cobranzasGrupo?.cveinteDias
      let cientoveinteDiasFinal = cientoveinteDias ?? 0
      // sumo a cobradoFinal el cientoveinteDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoveinteDiasFinal / 100)
    }

    // -- para cientocincuentaDias (ccincuentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril o Mayo y el año es diferente a 0 calculo el cientocincuentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -5 porque 150 dias atras me pone cinco meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 5]
      // teniendo el mesAnterior, calculo el cientocincuentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientocincuentaDias = cobranzasGrupo?.ccincuentaDias
      let cientocincuentaDiasFinal = cientocincuentaDias ?? 0
      // sumo a cobradoFinal el cientocincuentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientocincuentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril o mayo pero el año es diferente a 0 entonces calculo el cientocincuentaDias al descubrir el mes 5 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 5
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientocincuentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientocincuentaDias = cobranzasGrupo?.ccincuentaDias
      let cientocincuentaDiasFinal = cientocincuentaDias ?? 0
      // sumo a cobradoFinal el cientocincuentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientocincuentaDiasFinal / 100)
    }

    // -- para cientoochentaDias (cochenteDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo o Junio y el año es diferente a 0 calculo el cientoochentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -6 porque 180 dias atras me pone seis meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 6]
      // teniendo el mesAnterior, calculo el cientoochentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoochentaDias = cobranzasGrupo?.cochenteDias
      let cientoochentaDiasFinal = cientoochentaDias ?? 0
      // sumo a cobradoFinal el cientoochentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoochentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo o junio pero el año es diferente a 0 entonces calculo el cientoochentaDias al descubrir el mes 6 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 6
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientoochentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoochentaDias = cobranzasGrupo?.cochenteDias
      let cientoochentaDiasFinal = cientoochentaDias ?? 0
      // sumo a cobradoFinal el cientoochentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoochentaDiasFinal / 100)
    }

    // -- para doscientosDiezDias (ddiezDiaz) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio o Julio y el año es diferente a 0 calculo el doscientosDiezDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -7 porque 210 dias atras me pone siete meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 7]
      // teniendo el mesAnterior, calculo el doscientosDiezDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosDiezDias = cobranzasGrupo?.ddiezDiaz
      let doscientosDiezDiasFinal = doscientosDiezDias ?? 0
      // sumo a cobradoFinal el doscientosDiezDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosDiezDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio o julio pero el año es diferente a 0 entonces calculo el doscientosDiezDias al descubrir el mes 7 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 7
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosDiezDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosDiezDias = cobranzasGrupo?.ddiezDiaz
      let doscientosDiezDiasFinal = doscientosDiezDias ?? 0
      // sumo a cobradoFinal el doscientosDiezDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosDiezDiasFinal / 100)
    }

    // -- para doscientosCuarentaDias (dcuarentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio o Agosto y el año es diferente a 0 calculo el doscientosCuarentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -8 porque 240 dias atras me pone ocho meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 8]
      // teniendo el mesAnterior, calculo el doscientosCuarentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosCuarentaDias = cobranzasGrupo?.dcuarentaDias
      let doscientosCuarentaDiasFinal = doscientosCuarentaDias ?? 0
      // sumo a cobradoFinal el doscientosCuarentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosCuarentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio o agosto pero el año es diferente a 0 entonces calculo el doscientosCuarentaDias al descubrir el mes 8 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 8
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosCuarentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosCuarentaDias = cobranzasGrupo?.dcuarentaDias
      let doscientosCuarentaDiasFinal = doscientosCuarentaDias ?? 0
      // sumo a cobradoFinal el doscientosCuarentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosCuarentaDiasFinal / 100)
    }

    // -- para doscientosSetentaDias (dsetentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto o Septiembre y el año es diferente a 0 calculo el doscientosSetentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -9 porque 270 dias atras me pone nueve meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 9]
      // teniendo el mesAnterior, calculo el doscientosSetentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosSetentaDias = cobranzasGrupo?.dsetentaDias
      let doscientosSetentaDiasFinal = doscientosSetentaDias ?? 0
      // sumo a cobradoFinal el doscientosSetentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosSetentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto o septiembre pero el año es diferente a 0 entonces calculo el doscientosSetentaDias al descubrir el mes 9 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 9
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosSetentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosSetentaDias = cobranzasGrupo?.dsetentaDias
      let doscientosSetentaDiasFinal = doscientosSetentaDias ?? 0
      // sumo a cobradoFinal el doscientosSetentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosSetentaDiasFinal / 100)
    }

    // -- para trescientosDias (trescientosDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre u Octubre y el año es diferente a 0 calculo el trescientosDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && mes.toLowerCase() !== 'octubre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -10 porque 300 dias atras me pone diez meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 10]
      // teniendo el mesAnterior, calculo el trescientosDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosDias = cobranzasGrupo?.trescientosDias
      let trescientosDiasFinal = trescientosDias ?? 0
      // sumo a cobradoFinal el trescientosDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre u octubre pero el año es diferente a 0 entonces calculo el trescientosDias al descubrir el mes 10 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 10
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el trescientosDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosDias = cobranzasGrupo?.trescientosDias
      let trescientosDiasFinal = trescientosDias ?? 0
      // sumo a cobradoFinal el trescientosDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosDiasFinal / 100)
    }

    // -- para trescientosTreintaDias (ttreintaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre o Noviembre y el año es diferente a 0 calculo el trescientosTreintaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && mes.toLowerCase() !== 'octubre' && mes.toLowerCase() !== 'noviembre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -11 porque 330 dias atras me pone once meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 11]
      // teniendo el mesAnterior, calculo el trescientosTreintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosTreintaDias = cobranzasGrupo?.ttreintaDias
      let trescientosTreintaDiasFinal = trescientosTreintaDias ?? 0
      // sumo a cobradoFinal el trescientosTreintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosTreintaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre o noviembre pero el año es diferente a 0 entonces calculo el trescientosTreintaDias al descubrir el mes 11 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 11
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el trescientosTreintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp]?.compras[mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosTreintaDias = cobranzasGrupo?.ttreintaDias
      let trescientosTreintaDiasFinal = trescientosTreintaDias ?? 0
      // sumo a cobradoFinal el trescientosTreintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosTreintaDiasFinal / 100)
    }

    return cobradoFinal
  }

  let costos = showMultiplicacionPxQ(volumenData, costoData, assumpFinancierasData);

  let creditos = []

  // let ventas = showMultiplicacionPxQ(volumenData, precioData);
  let cobranzasGrupo = assumpFinancierasData[0]?.pagoProducto
  // recorro cada pais
  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        // recorro cada año
        for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
          // agrego la propiedad .iva a cada año
          costos[i].stats[x].productos[j].años[t].iva = costos[i].stats[x].productos[j].años[t].ventasTotal * (obtenerIva(assumpFinancierasData) / 100);

          // agrego la propiedad .comprasTotalConIva que sera la suma de todo lo que hay en .compras * IVA

          // recorro todos los meses de compras y obtengo su total
          let totalCompras = 0
          for (let month in costos[i].stats[x].productos[j].años[t].compras) {
            totalCompras += costos[i].stats[x].productos[j].años[t].compras[month]
          }

          costos[i].stats[x].productos[j].años[t].comprasTotalConIva = totalCompras * (obtenerIva(assumpFinancierasData) / 100 + 1);

          // recorro cada mes del año que seran asi  "compras": { "enero": 20000, "febrero": 40000...}
          // y lo transformo en un objeto asi: "compras": {"enero": { "vol": 20000, "volConIva": (20000 * IVA) }}
          costos[i].stats[x].productos[j].años[t] = {
            ...costos[i].stats[x].productos[j].años[t],
            cobroDeProducto: {
              'enero': {},
              'febrero': {},
              'marzo': {},
              'abril': {},
              'mayo': {},
              'junio': {},
              'julio': {},
              'agosto': {},
              'septiembre': {},
              'octubre': {},
              'noviembre': {},
              'diciembre': {}
            }
          }

          for (let month in costos[i].stats[x].productos[j].años[t].compras) {
            costos[i].stats[x].productos[j].años[t].cobroDeProducto[month] = {
              cobrado: agregarCobranza(month, t, cobranzasGrupo, costos[i].stats[x].productos[j], obtenerIva, assumpFinancierasData),
              // vol: costos[i].stats[x].productos[j].años[t].compras[month],
              // volConIva: costos[i].stats[x].productos[j].años[t].compras[month] * (obtenerIva(assumpFinancierasData) / 100 + 1),
            }
          }
          // creo una propíedad llamada cobradoAnual que sera la suma de todos los cobrados de cada mes
          costos[i].stats[x].productos[j].años[t].cobradoAnual = 0;
          for (let month in costos[i].stats[x].productos[j].años[t].cobroDeProducto) {
            costos[i].stats[x].productos[j].años[t].cobradoAnual += costos[i].stats[x].productos[j].años[t].cobroDeProducto[month].cobrado;
          }

          // creo la propiedad llamada pendientePorCobrar que sera la resta de comprasTotalConIva - cobradoAnual
          costos[i].stats[x].productos[j].años[t].pendientePorCobrar = costos[i].stats[x].productos[j].años[t].comprasTotalConIva - costos[i].stats[x].productos[j].años[t].cobradoAnual;

          // creditos.push(costos[i].stats[x].productos[j].años[t].pendientePorCobrar);
          creditos[t] = creditos[t] ? creditos[t] + costos[i].stats[x].productos[j].años[t].pendientePorCobrar : costos[i].stats[x].productos[j].años[t].pendientePorCobrar;
        }
      }
    }
  }
  // el resultado esta en la propiedad .pendientePorCobrar de cada año que es la resta de .comprasTotalConIva - .cobradoAnual


  // -------------------- calcular ahora Cuentas por pagar SERVICIOS --------------------

  // recorro cada pais, cada canal y cada producto cuyo type sea servicio (type: 'servicio') y en cada año creo la propiedad .stockCalculos que tendra todos los meses del año como propiedades y en cada mes tendre el p (costoData) * q (volumenData)

  // esta en .stockCalculos

  // tambien calculo la comision que sera igual a (volumenData * precioData) * ( costos[i].stats[x].productos[j].comision / 100) y la guardare en .comisionCalculos

  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        // recorro cada año
        for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
          // si el producto es de tipo servicio entonces hago los calculos
          if (costos[i].stats[x].productos[j].type === 'servicio') {
            // agrego la propiedad .stockCalculos a cada año
            costos[i].stats[x].productos[j].años[t].stockCalculos = {
              'enero': {},
              'febrero': {},
              'marzo': {},
              'abril': {},
              'mayo': {},
              'junio': {},
              'julio': {},
              'agosto': {},
              'septiembre': {},
              'octubre': {},
              'noviembre': {},
              'diciembre': {}
            }

            costos[i].stats[x].productos[j].años[t].comisionCalculos = {
              'enero': {},
              'febrero': {},
              'marzo': {},
              'abril': {},
              'mayo': {},
              'junio': {},
              'julio': {},
              'agosto': {},
              'septiembre': {},
              'octubre': {},
              'noviembre': {},
              'diciembre': {}
            }

            // recorro cada mes del año y hago el calculo p * q
            for (let month in costos[i].stats[x].productos[j].años[t].stockCalculos) {
              costos[i].stats[x].productos[j].años[t].stockCalculos[month] = costoData[i].stats[x].productos[j].años[t].volMeses[month] * volumenData[i].stats[x].productos[j].años[t].volMeses[month];
            }
            // sera igual a (volumenData * precioData) * ( costos[i].stats[x].productos[j].comision / 100)
            for (let month in costos[i].stats[x].productos[j].años[t].comisionCalculos) {
              costos[i].stats[x].productos[j].años[t].comisionCalculos[month] = (volumenData[i].stats[x].productos[j].años[t].volMeses[month] * precioData[i].stats[x].productos[j].años[t].volMeses[month]) * (costoData[i].stats[x].productos[j].comision / 100);
            }
          }
        }
      }
    }
  }
  // debe ser un array de 10 elementos donde cada elemento tendra los 12 meses del año como propiedades
  let deudasComercialesData = Array.from({ length: 10 }, () => Object.fromEntries(MONTHS.map(month => [month, {}])))

  // recoorro cada pais, cada canal, cada producto y cada año y sumo los valores de .stockCalculos y .comisionCalculos y lo guardo en deudasComercialesData
  for (let i = 0; i < costos.length; i++) {
    // recorro cada canal
    for (let x = 0; x < costos[i].stats.length; x++) {
      // recorro cada producto
      for (let j = 0; j < costos[i].stats[x].productos.length; j++) {
        if (costos[i].stats[x].productos[j].type === 'servicio') {
          // recorro cada año
          for (let t = 0; t < costos[i].stats[x].productos[j].años.length; t++) {
            // sumo los valores de .stockCalculos y .comisionCalculos y lo guardo en deudasComercialesData
            for (let month in costos[i].stats[x].productos[j].años[t].stockCalculos) {
              deudasComercialesData[t][month] = {
                ...deudasComercialesData[t][month],
                costoServicios: deudasComercialesData[t][month].costoServicios ? Number(deudasComercialesData[t][month].costoServicios) + Number(costos[i].stats[x].productos[j].años[t].stockCalculos[month]) : Number(costos[i].stats[x].productos[j].años[t].stockCalculos[month]),
              }
            }
            for (let month in costos[i].stats[x].productos[j].años[t].comisionCalculos) {
              deudasComercialesData[t][month] = {
                ...deudasComercialesData[t][month],
                comprasComerciales: deudasComercialesData[t][month].comprasComerciales ? Number(deudasComercialesData[t][month].comprasComerciales) + Number(costos[i].stats[x].productos[j].años[t].comisionCalculos[month]) : Number(costos[i].stats[x].productos[j].años[t].comisionCalculos[month]),
              }
            }
          }
        }
      }
    }
  }

  // a deudasComercialesData le agrego la propiedad .comprasGastos recorriendo lo siguiente de gastosPorCCData:
  // for (let month in costos[i].stats[x].productos[j].años[t].comisionCalculos) {
  // for (let i = 0; i < gastosPorCCData[0].centroDeCostos.length; i++) {
  for (let propiedad in gastosPorCCData[0].centroDeCostos[0]) {
    // recorro en dicha propiedad el array en .cuentas
    if (gastosPorCCData[0].centroDeCostos[0][propiedad].visible === true) {
      for (let j = 0; j < gastosPorCCData[0].centroDeCostos[0][propiedad].cuentas.length; j++) {
        // de alli recorro la propiedad .años
        if (gastosPorCCData[0].centroDeCostos[0][propiedad].cuentas[j].name !== 'Remuneraciones y cargas sociales') {
          for (let t = 0; t < gastosPorCCData[0].centroDeCostos[0][propiedad].cuentas[j].años.length; t++) {
            // y de alli recorro cada mes
            for (let month in gastosPorCCData[0].centroDeCostos[0][propiedad].cuentas[j].años[t].volMeses) {
              // y sumo el valor de cada mes
              deudasComercialesData[t][month] = {
                ...deudasComercialesData[t][month],
                comprasGastos: deudasComercialesData[t][month].comprasGastos ? Number(deudasComercialesData[t][month].comprasGastos) + Number(gastosPorCCData[0].centroDeCostos[0][propiedad].cuentas[j].años[t].volMeses[month]) : Number(gastosPorCCData[0].centroDeCostos[0][propiedad].cuentas[j].años[t].volMeses[month]),
              }
            }
          }
        }
      }
    }
  }

  let sumaGastos = Array.from({ length: 10 }, () => Object.fromEntries(MONTHS.map(month => [month, {}])))

  // recorro cada año y cada mes de deudasComercialesData y sumo todas las propiedades de cada mes a dicho mes y dicho año de sumaGastos
  for (let i = 0; i < deudasComercialesData.length; i++) {
    for (let month in deudasComercialesData[i]) {
      sumaGastos[i][month] = {
        volMeses: 0
      }
      for (let propiedad in deudasComercialesData[i][month]) {
        sumaGastos[i][month].volMeses += (deudasComercialesData[i][month][propiedad] * (obtenerIvaServicios(assumpFinancierasData) / 100 + 1))
      }
    }
  }

  function agregarCobranzaServicios(mes, año, cobranzasGrupo, productosLista, obtenerIva, assumpFinancierasData) {
    let cobradoFinal = productosLista?.años[año][mes].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
    // saco el volcoIva con contado
    cobradoFinal *= (cobranzasGrupo?.contado / 100);

    // --- para treintaDias ---

    // luego solo si el mes es diferente a Enero y el año es diferente a 0 (osea que no es el primer año y el primer mes) calculo el treitaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && año === 0) {
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1]
      // teniendo el mesAnterior, calculo el treintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let treintaDias = cobranzasGrupo?.treintaDias
      let treintaDiasFinal = treintaDias ?? 0;
      // sumo a cobradoFinal el treintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (treintaDiasFinal / 100)

    }
    // si el mes es enero pero el año es diferente a 0 entonces calculo el treintaDias de diciembre pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 1
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el treintaDias del mesAnterior      
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let treintaDias = cobranzasGrupo?.treintaDias
      let treintaDiasFinal = treintaDias ?? 0
      // sumo a cobradoFinal el treintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (treintaDiasFinal / 100)
    }

    // --- para cuarentaycincoDias ---

    // luego si el mes es diferente a Enero o Febrero y el año es diferente a 0 calculo el cuarentaycincoDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -2 porque 45 dias atras me pone dos meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 2]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cuarentaycincoDias = cobranzasGrupo?.cuarentaycincoDias
      let cuarentaycincoDiasFinal = cuarentaycincoDias ?? 0
      // sumo a cobradoFinal el cuarentaycincoDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cuarentaycincoDiasFinal / 100)
    }
    // si el mes es enero o febrero pero el año es diferente a 0 entonces calculo el cuarentaycincoDias al descubrir el mes 2 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 2
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cuarentaycincoDias = cobranzasGrupo?.cuarentaycincoDias
      let cuarentaycincoDiasFinal = cuarentaycincoDias ?? 0
      // sumo a cobradoFinal el cuarentaycincoDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cuarentaycincoDiasFinal / 100)
    }

    // --- para sesentaDias ---

    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -2 porque 60 dias atras me pone dos meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 2]
      // teniendo el mesAnterior, calculo el sesentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let sesentaDias = cobranzasGrupo?.sesentaDias
      let sesentaDiasFinal = sesentaDias ?? 0
      // sumo a cobradoFinal el sesentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (sesentaDiasFinal / 100)
    }
    // si el mes es enero o febrero pero el año es diferente a 0 entonces calculo el sesentaDias al descubrir el mes 2 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 2
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cuarentaycincoDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let sesentaDias = cobranzasGrupo?.sesentaDias
      let sesentaDiasFinal = sesentaDias ?? 0
      // sumo a cobradoFinal el sesentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (sesentaDiasFinal / 100)
    }

    // --- para noventaDias ---

    // luego si el mes es diferente a Enero, Febrero o Marzo y el año es diferente a 0 calculo el noventaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -3 porque 90 dias atras me pone tres meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 3]
      // teniendo el mesAnterior, calculo el noventaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let noventaDias = cobranzasGrupo?.noventaDias
      let noventaDiasFinal = noventaDias ?? 0
      // sumo a cobradoFinal el noventaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (noventaDiasFinal / 100)
    }
    // si el mes es enero, febrero o marzo pero el año es diferente a 0 entonces calculo el noventaDias al descubrir el mes 3 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 3
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el noventaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let noventaDias = cobranzasGrupo?.noventaDias
      let noventaDiasFinal = noventaDias ?? 0
      // sumo a cobradoFinal el noventaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (noventaDiasFinal / 100)
    }

    // -- para cientoveinteDias (cveinteDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo o Abril y el año es diferente a 0 calculo el cientoveinteDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -4 porque 120 dias atras me pone cuatro meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 4]
      // teniendo el mesAnterior, calculo el cientoveinteDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoveinteDias = cobranzasGrupo?.cveinteDias
      let cientoveinteDiasFinal = cientoveinteDias ?? 0
      // sumo a cobradoFinal el cientoveinteDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoveinteDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo o abril pero el año es diferente a 0 entonces calculo el cientoveinteDias al descubrir el mes 4 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 4
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientoveinteDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoveinteDias = cobranzasGrupo?.cveinteDias
      let cientoveinteDiasFinal = cientoveinteDias ?? 0
      // sumo a cobradoFinal el cientoveinteDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoveinteDiasFinal / 100)
    }

    // -- para cientocincuentaDias (ccincuentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril o Mayo y el año es diferente a 0 calculo el cientocincuentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -5 porque 150 dias atras me pone cinco meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 5]
      // teniendo el mesAnterior, calculo el cientocincuentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientocincuentaDias = cobranzasGrupo?.ccincuentaDias
      let cientocincuentaDiasFinal = cientocincuentaDias ?? 0
      // sumo a cobradoFinal el cientocincuentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientocincuentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril o mayo pero el año es diferente a 0 entonces calculo el cientocincuentaDias al descubrir el mes 5 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 5
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientocincuentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientocincuentaDias = cobranzasGrupo?.ccincuentaDias
      let cientocincuentaDiasFinal = cientocincuentaDias ?? 0
      // sumo a cobradoFinal el cientocincuentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientocincuentaDiasFinal / 100)
    }

    // -- para cientoochentaDias (cochenteDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo o Junio y el año es diferente a 0 calculo el cientoochentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -6 porque 180 dias atras me pone seis meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 6]
      // teniendo el mesAnterior, calculo el cientoochentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoochentaDias = cobranzasGrupo?.cochenteDias
      let cientoochentaDiasFinal = cientoochentaDias ?? 0
      // sumo a cobradoFinal el cientoochentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoochentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo o junio pero el año es diferente a 0 entonces calculo el cientoochentaDias al descubrir el mes 6 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 6
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el cientoochentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let cientoochentaDias = cobranzasGrupo?.cochenteDias
      let cientoochentaDiasFinal = cientoochentaDias ?? 0
      // sumo a cobradoFinal el cientoochentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (cientoochentaDiasFinal / 100)
    }

    // -- para doscientosDiezDias (ddiezDiaz) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio o Julio y el año es diferente a 0 calculo el doscientosDiezDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -7 porque 210 dias atras me pone siete meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 7]
      // teniendo el mesAnterior, calculo el doscientosDiezDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosDiezDias = cobranzasGrupo?.ddiezDiaz
      let doscientosDiezDiasFinal = doscientosDiezDias ?? 0
      // sumo a cobradoFinal el doscientosDiezDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosDiezDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio o julio pero el año es diferente a 0 entonces calculo el doscientosDiezDias al descubrir el mes 7 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 7
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosDiezDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosDiezDias = cobranzasGrupo?.ddiezDiaz
      let doscientosDiezDiasFinal = doscientosDiezDias ?? 0
      // sumo a cobradoFinal el doscientosDiezDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosDiezDiasFinal / 100)
    }

    // -- para doscientosCuarentaDias (dcuarentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio o Agosto y el año es diferente a 0 calculo el doscientosCuarentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -8 porque 240 dias atras me pone ocho meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 8]
      // teniendo el mesAnterior, calculo el doscientosCuarentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosCuarentaDias = cobranzasGrupo?.dcuarentaDias
      let doscientosCuarentaDiasFinal = doscientosCuarentaDias ?? 0
      // sumo a cobradoFinal el doscientosCuarentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosCuarentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio o agosto pero el año es diferente a 0 entonces calculo el doscientosCuarentaDias al descubrir el mes 8 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 8
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosCuarentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosCuarentaDias = cobranzasGrupo?.dcuarentaDias
      let doscientosCuarentaDiasFinal = doscientosCuarentaDias ?? 0
      // sumo a cobradoFinal el doscientosCuarentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosCuarentaDiasFinal / 100)
    }

    // -- para doscientosSetentaDias (dsetentaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto o Septiembre y el año es diferente a 0 calculo el doscientosSetentaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -9 porque 270 dias atras me pone nueve meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 9]
      // teniendo el mesAnterior, calculo el doscientosSetentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosSetentaDias = cobranzasGrupo?.dsetentaDias
      let doscientosSetentaDiasFinal = doscientosSetentaDias ?? 0
      // sumo a cobradoFinal el doscientosSetentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosSetentaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto o septiembre pero el año es diferente a 0 entonces calculo el doscientosSetentaDias al descubrir el mes 9 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 9
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el doscientosSetentaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let doscientosSetentaDias = cobranzasGrupo?.dsetentaDias
      let doscientosSetentaDiasFinal = doscientosSetentaDias ?? 0
      // sumo a cobradoFinal el doscientosSetentaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (doscientosSetentaDiasFinal / 100)
    }

    // -- para trescientosDias (trescientosDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre u Octubre y el año es diferente a 0 calculo el trescientosDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && mes.toLowerCase() !== 'octubre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -10 porque 300 dias atras me pone diez meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 10]
      // teniendo el mesAnterior, calculo el trescientosDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosDias = cobranzasGrupo?.trescientosDias
      let trescientosDiasFinal = trescientosDias ?? 0
      // sumo a cobradoFinal el trescientosDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre u octubre pero el año es diferente a 0 entonces calculo el trescientosDias al descubrir el mes 10 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 10
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el trescientosDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosDias = cobranzasGrupo?.trescientosDias
      let trescientosDiasFinal = trescientosDias ?? 0
      // sumo a cobradoFinal el trescientosDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosDiasFinal / 100)
    }

    // -- para trescientosTreintaDias (ttreintaDias) ---

    // luego si el mes es diferente a Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre o Noviembre y el año es diferente a 0 calculo el trescientosTreintaDias del mes pasado
    if (mes.toLowerCase() !== 'enero' && mes.toLowerCase() !== 'febrero' && mes.toLowerCase() !== 'marzo' && mes.toLowerCase() !== 'abril' && mes.toLowerCase() !== 'mayo' && mes.toLowerCase() !== 'junio' && mes.toLowerCase() !== 'julio' && mes.toLowerCase() !== 'agosto' && mes.toLowerCase() !== 'septiembre' && mes.toLowerCase() !== 'octubre' && mes.toLowerCase() !== 'noviembre' && año === 0) {
      // let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 1] pero en vez de -1 es -11 porque 330 dias atras me pone once meses atras
      let mesAnterior = MONTHS[MONTHS.indexOf(mes.toLowerCase()) - 11]
      // teniendo el mesAnterior, calculo el trescientosTreintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[año][mesAnterior].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosTreintaDias = cobranzasGrupo?.ttreintaDias
      let trescientosTreintaDiasFinal = trescientosTreintaDias ?? 0
      // sumo a cobradoFinal el trescientosTreintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosTreintaDiasFinal / 100)
    }
    // si el mes es enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre o noviembre pero el año es diferente a 0 entonces calculo el trescientosTreintaDias al descubrir el mes 11 veces pasado pero del año pasado
    else if (año !== 0) {
      let mesAnteriorUbicado = MONTHS.indexOf(mes.toLowerCase()) - 11
      let añoTemp = año
      if (mesAnteriorUbicado < 0) {
        añoTemp -= 1
        mesAnteriorUbicado += MONTHS.length
      }
      let mesAnterior = MONTHS[mesAnteriorUbicado]
      // teniendo el mesAnterior, calculo el trescientosTreintaDias del mesAnterior
      let cobradoMesAnterior = productosLista?.años[añoTemp][mesAnterior] * (obtenerIva(assumpFinancierasData) / 100 + 1)
      let trescientosTreintaDias = cobranzasGrupo?.ttreintaDias
      let trescientosTreintaDiasFinal = trescientosTreintaDias ?? 0
      // sumo a cobradoFinal el trescientosTreintaDias del mesAnterior
      cobradoFinal += cobradoMesAnterior * (trescientosTreintaDiasFinal / 100)
    }

    return cobradoFinal
  }

  // function agregarCobranza(mes, año, cobranzasGrupo, productosLista, obtenerIva, assumpFinancierasData) {
  //   let cobradoFinal = productosLista?.años[año]?.compras[mes] * (obtenerIva(assumpFinancierasData) / 100 + 1)

  // cobrado: agregarCobranza(month, t, cobranzasGrupo, costos[i].stats[x].productos[j], obtenerIva, assumpFinancierasData),

  let cobranzasGrupoServicios = assumpFinancierasData[0]?.pagoServicio

  for (let i = 0; i < sumaGastos.length; i++) {
    for (let month in sumaGastos[i]) {
      sumaGastos[i][month] = {
        ...sumaGastos[i][month],
        cobrado: agregarCobranzaServicios(month, i, cobranzasGrupoServicios, { años: sumaGastos }, obtenerIvaServicios2, assumpFinancierasData)
      }
    }
  }

  let gastosPagadosAnuales = []
  for (let i = 0; i < sumaGastos.length; i++) {
    let gastosPagados = 0
    for (let month in sumaGastos[i]) {
      gastosPagados += sumaGastos[i][month].cobrado
    }
    gastosPagadosAnuales.push(gastosPagados)
  }


  console.log('sumaGastos: ', sumaGastos)
  console.log('costos: ', costos)
  console.log('gastosPagadosAnuales: ', gastosPagadosAnuales)
}
