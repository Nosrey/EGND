/**
 * Utility functions for sanitizing volume data to handle extreme values and inconsistencies
 * that cause calculation problems in the financial plan
 */

/**
 * Checks if a value is an extreme value (currently targeting 270000000)
 * 
 * @param {number|string} valor - The value to check
 * @returns {boolean} - True if the value is an extreme value
 */
export const esValorExtremo = (valor) => {
  // Handle null or undefined
  if (valor == null) return false;
  
  // Convert to number if it's a string
  const valorNum = typeof valor === 'string' ? Number(valor) : valor;
  
  // Check if it's NaN after conversion
  if (Number.isNaN(valorNum)) return false;
  
  // Check for specific extreme values or very high numbers
  return valorNum === 270000000 || 
         valorNum === 270000000.0 || 
         Math.abs(valorNum - 270000000) < 1000 ||
         (typeof valor === 'string' && valor.includes('270000000')) ||
         valorNum > 10000000; // También consideramos otros valores muy altos como extremos
};

/**
 * Detects extreme values in volume data and returns their locations
 * 
 * @param {Object} datos - Volume data structure to check for extreme values
 * @returns {Object} - Object with count and locations of extreme values
 */
export const detectarValoresExtremos = (datos) => {
  const conteo = { valor: 0 };
  const ubicaciones = [];
  
  if (!datos) return { conteo: 0, ubicaciones: [] };
  
  // Process data in the structure expected by VolumenQ.js
  Object.keys(datos).forEach(pais => {
    if (!Array.isArray(datos[pais])) return;
    
    datos[pais].forEach(canal => {
      if (!canal.productos || !Array.isArray(canal.productos)) return;
      
      canal.productos.forEach(producto => {
        if (!producto.años || !Array.isArray(producto.años)) return;
        
        producto.años.forEach(año => {
          if (!año.volMeses) return;
          
          const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                         'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
          
          meses.forEach(mes => {
            const valor = año.volMeses[mes];
            if (esValorExtremo(valor)) {
              conteo.valor++;
              ubicaciones.push({
                pais,
                canal: canal.canalName,
                producto: producto.name || producto.id,
                año: año.año || 'desconocido',
                mes
              });
            }
          });
        });
      });
    });
  });
  
  return { conteo: conteo.valor, ubicaciones };
};

/**
 * Checks if a value is an extreme ventasTotal
 * @param {number|string} valor - The value to check
 * @returns {boolean} - True if the value is an extreme ventasTotal
 */
export const esVentasTotalExtremo = (valor) => {
  // Handle null or undefined
  if (valor == null) return false;
  
  // Convert to number if it's a string
  const valorNum = typeof valor === 'string' ? Number(valor) : valor;
  
  // Check if it's NaN after conversion
  if (Number.isNaN(valorNum)) return false;
  
  // Check for specific extreme values or very high numbers (3 billion+)
  return valorNum > 1000000000 || 
         (typeof valor === 'string' && valor.includes('000000000'));
};

/**
 * Sanitizes a value by replacing extreme values with a reasonable alternative
 * 
 * @param {number|string} valor - The value to sanitize
 * @param {number} valorPredeterminado - Default value to use if the value is extreme
 * @returns {number} - The sanitized value
 */
export const sanitizarValorExtremo = (valor, valorPredeterminado = 10) => 
  esValorExtremo(valor) ? valorPredeterminado : valor;

/**
 * Suma los valores de todos los meses en un objeto volMeses
 * 
 * @param {Object} volMeses - Objeto con valores por mes
 * @returns {number} - La suma de los valores
 */
export const calcularSumaVolMeses = (volMeses) => {
  if (!volMeses || typeof volMeses !== 'object') return 0;
  
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  return meses.reduce((acc, mes) => {
    const valor = Number(volMeses[mes]);
    return acc + (Number.isNaN(valor) ? 0 : valor);
  }, 0);
};

/**
 * Detecta inconsistencias entre volTotal y la suma de volMeses, o valores excesivamente altos
 * 
 * @param {Object} año - Objeto con propiedades volMeses y volTotal
 * @returns {Object} - Información sobre la inconsistencia
 */
export const detectarInconsistencia = (año) => {
  if (!año || !año.volMeses) return { inconsistente: false };
  
  const sumaVolMeses = calcularSumaVolMeses(año.volMeses);
  const volTotal = Number(año.volTotal);
  
  // Buscar valores absurdamente altos en los meses (>10 millones)
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  const mesesExtremos = [];
  let hayValoresExtremos = false;
  
  meses.forEach(mes => {
    const valor = Number(año.volMeses[mes]);
    if (!Number.isNaN(valor) && valor > 10000000) {
      mesesExtremos.push(mes);
      hayValoresExtremos = true;
    }
  });
  
  // Verificar si hay una inconsistencia grande entre volTotal y la suma
  const hayDiferenciaSustancial = Math.abs(sumaVolMeses - volTotal) > (volTotal * 0.1); // +/- 10%
  
  return {
    inconsistente: hayDiferenciaSustancial || hayValoresExtremos,
    sumaVolMeses,
    volTotal,
    diferencia: sumaVolMeses - volTotal,
    porcentajeDiferencia: volTotal > 0 ? ((sumaVolMeses - volTotal) / volTotal) * 100 : 0,
    hayValoresExtremos,
    mesesExtremos
  };
};

/**
 * Corrige la inconsistencia redistribuyendo adecuadamente los valores
 * 
 * @param {Object} año - Objeto con volMeses y volTotal
 * @returns {Object} - Objeto corregido
 */
export const corregirInconsistencia = (año) => {
  if (!año || !año.volMeses) return año;
  
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  // Hacer una copia para no modificar el original
  const añoCorregido = JSON.parse(JSON.stringify(año));
  
  // Verificar la inconsistencia
  const { inconsistente, sumaVolMeses, volTotal, hayValoresExtremos, mesesExtremos } = detectarInconsistencia(año);
  
  if (!inconsistente) return añoCorregido;
  
  // Si volTotal es un valor razonable menor a 10,000, usamos ese valor como base
  const volTotalRazonable = (!Number.isNaN(volTotal) && volTotal > 0 && volTotal < 10000) 
    ? volTotal
    : 120; // Valor predeterminado si volTotal no es confiable
  
  // Si hay valores extremos en meses específicos
  if (hayValoresExtremos) {
    // Revisar si hay meses con valores normales
    const mesesNormales = meses.filter(mes => !mesesExtremos.includes(mes) && añoCorregido.volMeses[mes] > 0);
    
    if (mesesNormales.length > 0) {
      // Hay algunos meses con valores normales, reemplazar solo los extremos con valores pequeños
      mesesExtremos.forEach(mes => {
        añoCorregido.volMeses[mes] = 10; // Valor bajo para no distorsionar
      });
    } else {
      // Todos los meses tienen valores extremos o son cero, distribuir el volTotal
      meses.forEach(mes => {
        añoCorregido.volMeses[mes] = Math.round(volTotalRazonable / 12);
      });
    }
  } else {
    // Hay una inconsistencia pero no hay valores extremos evidentes
    // Probablemente volTotal está mal, recalcularlo desde la suma
    añoCorregido.volTotal = sumaVolMeses;
  }
  
  // Recalcular volTotal para asegurar consistencia
  añoCorregido.volTotal = calcularSumaVolMeses(añoCorregido.volMeses);
  
  return añoCorregido;
};

/**
 * Función principal para sanitizar datos de volumen corrigiendo inconsistencias
 * 
 * @param {Object} datos - Datos de volumen a sanitizar
 * @param {boolean} debug - Activar logs de depuración
 * @returns {Object} - Datos sanitizados
 */
export const sanitizarDatosVolumen = (datos, debug = false) => {
  if (!datos) return datos;
  
  // Si no es un objeto, no hay nada que hacer
  if (typeof datos !== 'object') return datos;
  
  // Crear una copia profunda para no modificar los originales
  const datosCopy = JSON.parse(JSON.stringify(datos));
  
  // Mantener un conteo de correcciones
  let contadorAñosCorregidos = 0;
  
  // Para volumenData (formato original del servidor)
  if (datosCopy.volumenData && Array.isArray(datosCopy.volumenData)) {
    datosCopy.volumenData.forEach(pais => {
      if (!pais.stats) return;
      
      pais.stats.forEach(canal => {
        if (!canal.productos) return;
        
        canal.productos.forEach(producto => {
          if (!producto.años) return;
          
          producto.años.forEach(año => {
            if (!año.volMeses) return;
            
            // Detectar inconsistencias
            const { inconsistente, sumaVolMeses, volTotal } = detectarInconsistencia(año);
            
            if (inconsistente) {
              if (debug) {
                console.log(`⚠️ Inconsistencia detectada en ${pais.countryName}/${canal.canalName}/${producto.name || producto.id}:`);
                console.log(`   volTotal: ${volTotal}, suma de volMeses: ${sumaVolMeses}`);
              }
              
              // Corregir la inconsistencia
              const añoCorregido = corregirInconsistencia(año);
              
              // Copiar propiedades corregidas
              año.volMeses = { ...añoCorregido.volMeses };
              año.volTotal = añoCorregido.volTotal;
              
              if (debug) {
                console.log(`✅ Corregido a volTotal: ${año.volTotal}`);
              }
              
              contadorAñosCorregidos++;
            }
          });
        });
      });
    });
  }
  
  // Para estructura locale (formato utilizado en VolumenQ)
  if (Object.keys(datosCopy).length > 0 && !datosCopy.volumenData) {
    Object.keys(datosCopy).forEach(paisKey => {
      if (!Array.isArray(datosCopy[paisKey])) return;
      
      datosCopy[paisKey].forEach(canal => {
        if (!Array.isArray(canal.productos)) return;
        
        canal.productos.forEach(producto => {
          if (!Array.isArray(producto.años)) return;
          
          producto.años.forEach(año => {
            if (!año.volMeses) return;
            
            // Detectar inconsistencias
            const { inconsistente, sumaVolMeses, volTotal } = detectarInconsistencia(año);
            
            if (inconsistente) {
              if (debug) {
                console.log(`⚠️ Inconsistencia detectada en ${paisKey}/${canal.canalName}/${producto.name || producto.id}:`);
                console.log(`   volTotal: ${volTotal}, suma de volMeses: ${sumaVolMeses}`);
              }
              
              // Corregir la inconsistencia
              const añoCorregido = corregirInconsistencia(año);
              
              // Copiar propiedades corregidas
              año.volMeses = { ...añoCorregido.volMeses };
              año.volTotal = añoCorregido.volTotal;
              
              if (debug) {
                console.log(`✅ Corregido a volTotal: ${año.volTotal}`);
              }
              
              contadorAñosCorregidos++;
            }
          });
        });
      });
    });
  }
  
  if (contadorAñosCorregidos > 0 && debug) {
    console.log(`✅ Se corrigieron inconsistencias en ${contadorAñosCorregidos} objetos año`);
  }
  
  return datosCopy;
};

/**
 * Función para aplicar corrección directa a la ruta específica sin buscar un valor mágico
 * 
 * @param {Object} datos - Los datos que contienen volumenData
 * @param {boolean} debug - Si se debe mostrar información de depuración
 * @returns {Object} - Los datos sanitizados
 */
export const sanitizarRutaEspecifica = (datos, debug = false) => {
  if (!datos || !datos.volumenData || !Array.isArray(datos.volumenData) || datos.volumenData.length === 0) {
    return datos;
  }
  
  // Crear una copia para no modificar el original
  const dataCopy = JSON.parse(JSON.stringify(datos));
  let contadorCorrecciones = 0;
  
  try {
    // Recorrer la estructura esperada
    dataCopy.volumenData.forEach(pais => {
      if (!pais.stats || !Array.isArray(pais.stats)) return;
      
      pais.stats.forEach(canal => {
        if (!canal.productos || !Array.isArray(canal.productos)) return;
        
        canal.productos.forEach(producto => {
          if (!producto.años || !Array.isArray(producto.años)) return;
          
          producto.años.forEach(año => {
            if (!año.volMeses) return;
            
            // Verificar inconsistencia
            const { inconsistente, sumaVolMeses, volTotal, hayValoresExtremos } = detectarInconsistencia(año);
            
            if (inconsistente) {
              if (debug) {
                console.log(`🎯 Corrigiendo inconsistencia en ${pais.countryName}/${canal.canalName}/${producto.name || producto.id}`);
                console.log(`   volTotal: ${volTotal}, suma de volMeses: ${sumaVolMeses}, hay valores extremos: ${hayValoresExtremos}`);
              }
              
              // Aplicar corrección
              const añoCorregido = corregirInconsistencia(año);
              
              // Copiar los valores corregidos
              año.volMeses = { ...añoCorregido.volMeses };
              año.volTotal = añoCorregido.volTotal;
              
              if (debug) {
                console.log(`🎯 Corregido a volTotal: ${año.volTotal}`);
              }
              
              contadorCorrecciones++;
            }
          });
        });
      });
    });
    
    if (debug && contadorCorrecciones > 0) {
      console.log(`🎯 Sanitización específica completada: ${contadorCorrecciones} correcciones realizadas`);
    }
  } catch (error) {
    console.error("Error en sanitizarRutaEspecifica:", error);
  }
  
  return dataCopy;
};

/**
 * Función de diagnóstico para verificar y sanitizar específicamente la ruta:
 * volumenData[0].stats[0].productos[0].años[0].volMeses
 * 
 * @param {Object} datos - Los datos que contienen volumenData
 * @param {boolean} showDebug - Si se debe mostrar información detallada
 * @returns {Object} - Los datos sanitizados y un reporte de diagnóstico
 */
export const diagnosticarRutaEspecifica = (datos, showDebug = true) => {
  if (!datos || !datos.volumenData || !Array.isArray(datos.volumenData) || datos.volumenData.length === 0) {
    console.log("❌ diagnosticarRutaEspecifica: No hay datos válidos de volumenData");
    return { datos, diagnostico: { valido: false, mensaje: "No hay datos válidos" } };
  }

  // Crear una copia para no modificar el original
  const dataCopy = JSON.parse(JSON.stringify(datos));
  const diagnostico = { valido: false, modificado: false, mensaje: "", valores: {} };
  
  try {
    // Intentar acceder a la ruta exacta
    const primerPais = dataCopy.volumenData[0];
    if (!primerPais || !primerPais.stats || primerPais.stats.length === 0) {
      console.log("❌ diagnosticarRutaEspecifica: No se encontró stats en el primer país");
      return { datos: dataCopy, diagnostico: { valido: false, mensaje: "No se encontró stats" } };
    }
    
    const primerCanal = primerPais.stats[0];
    if (!primerCanal || !primerCanal.productos || primerCanal.productos.length === 0) {
      console.log("❌ diagnosticarRutaEspecifica: No se encontró productos en el primer canal");
      return { datos: dataCopy, diagnostico: { valido: false, mensaje: "No se encontró productos" } };
    }
    
    const primerProducto = primerCanal.productos[0];
    if (!primerProducto || !primerProducto.años || primerProducto.años.length === 0) {
      console.log("❌ diagnosticarRutaEspecifica: No se encontró años en el primer producto");
      return { datos: dataCopy, diagnostico: { valido: false, mensaje: "No se encontró años" } };
    }
    
    const primerAño = primerProducto.años[0];
    if (!primerAño || !primerAño.volMeses) {
      console.log("❌ diagnosticarRutaEspecifica: No se encontró volMeses en el primer año");
      return { datos: dataCopy, diagnostico: { valido: false, mensaje: "No se encontró volMeses" } };
    }
    
    // Si llegamos aquí, la ruta es válida
    diagnostico.valido = true;
    
    // Guardar valores originales para diagnóstico
    const sumaOriginal = calcularSumaVolMeses(primerAño.volMeses);
    
    diagnostico.valores.original = {
      pais: primerPais.countryName,
      canal: primerCanal.canalName,
      producto: primerProducto.name || primerProducto.id,
      ventasTotal: primerAño.ventasTotal,
      volTotal: primerAño.volTotal,
      sumaVolMeses: sumaOriginal,
      diferencia: (sumaOriginal - primerAño.volTotal),
      volMeses: { ...primerAño.volMeses }
    };
    
    // Verificar inconsistencia
    const inconsistencia = detectarInconsistencia(primerAño);
    
    if (inconsistencia.inconsistente) {
      diagnostico.modificado = true;
      diagnostico.mensaje = "Se detectó inconsistencia entre volTotal y la suma de volMeses";
      
      // Aplicar corrección
      const añoCorregido = corregirInconsistencia(primerAño);
      
      // Copiar valores corregidos
      primerAño.volMeses = { ...añoCorregido.volMeses };
      primerAño.volTotal = añoCorregido.volTotal;
      
      // Guardar valores modificados
      const sumaNueva = calcularSumaVolMeses(primerAño.volMeses);
      
      diagnostico.valores.modificado = {
        ventasTotal: primerAño.ventasTotal,
        volTotal: primerAño.volTotal,
        sumaVolMeses: sumaNueva,
        diferencia: (sumaNueva - primerAño.volTotal),
        volMeses: { ...primerAño.volMeses }
      };
    } else {
      diagnostico.mensaje = "No se encontraron inconsistencias en la ruta específica";
    }
    
    if (showDebug) {
      console.log("🔍 DIAGNÓSTICO DE RUTA ESPECÍFICA:");
      console.log(`Ubicación: ${primerPais.countryName}/${primerCanal.canalName}/${primerProducto.name || primerProducto.id}`);
      console.log(`Estado: ${diagnostico.modificado ? "Corregido" : "Sin modificaciones"}`);
      console.log(`Mensaje: ${diagnostico.mensaje}`);
      if (diagnostico.modificado) {
        console.log("Valores originales:", {
          volTotal: diagnostico.valores.original.volTotal,
          sumaVolMeses: diagnostico.valores.original.sumaVolMeses,
          diferencia: diagnostico.valores.original.diferencia,
          ejemploMes: diagnostico.valores.original.volMeses.abril
        });
        console.log("Valores modificados:", {
          volTotal: diagnostico.valores.modificado.volTotal,
          sumaVolMeses: diagnostico.valores.modificado.sumaVolMeses,
          diferencia: diagnostico.valores.modificado.diferencia,
          ejemploMes: diagnostico.valores.modificado.volMeses.abril
        });
      }
    }
    
  } catch (error) {
    console.error("❌ Error en diagnosticarRutaEspecifica:", error);
    diagnostico.mensaje = `Error: ${error.message}`;
  }
  
  return { datos: dataCopy, diagnostico };
};

export default {
  sanitizarDatosVolumen,
  sanitizarRutaEspecifica,
  diagnosticarRutaEspecifica,
  detectarInconsistencia,
  corregirInconsistencia,
  calcularSumaVolMeses,
  esValorExtremo,
  esVentasTotalExtremo,
  sanitizarValorExtremo,
  detectarValoresExtremos
}; 