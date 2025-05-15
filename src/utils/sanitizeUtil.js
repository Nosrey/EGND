/**
 * Utilities for sanitizing volume data to prevent extreme values (270000000)
 * causing calculation issues throughout the application
 */

/**
 * Detects if a value is considered "extreme" (specifically 270000000)
 * @param {any} valor - The value to check
 * @returns {boolean} - Whether the value is extreme
 */
export const esValorExtremo = (valor) => {
  // Convert to number if string
  const valorNum = typeof valor === 'string' ? Number(valor) : valor;
  
  // Avoid NaN
  if (Number.isNaN(valorNum)) return false;
  
  // Check if the value is 270000000 or very close to it
  return valorNum === 270000000 || 
         valorNum === 270000000.0 || 
         Math.abs(valorNum - 270000000) < 1000 ||
         (typeof valor === 'string' && valor.includes('270000000')) ||
         valorNum > 100000000; // Also consider other very high values as extreme
};

/**
 * Sanitizes extreme values in volume data
 * @param {any} valor - The value to sanitize
 * @param {number} valorPredeterminado - Default value to use if the value is extreme
 * @returns {number} - Sanitized value
 */
export const sanitizarValorExtremo = (valor, valorPredeterminado = 10) =>
  esValorExtremo(valor) ? valorPredeterminado : Number(valor);

/**
 * Sanitizes the entire volume data structure to fix extreme values
 * @param {object} datos - The data structure to sanitize
 * @returns {object} - Sanitized data structure
 */
export const sanitizarDatosVolumen = (datos) => {
  if (!datos) return datos;
  
  // Clone the data to avoid modifying the original
  const datosSanitizados = JSON.parse(JSON.stringify(datos));
  
  // Process volumenData structure
  if (datosSanitizados.volumenData) {
    datosSanitizados.volumenData.forEach(pais => {
      if (!pais.stats) return;
      
      pais.stats.forEach(canal => {
        if (!canal.productos) return;
        
        canal.productos.forEach(producto => {
          if (!producto.años) return;
          
          // Determine a reasonable base value using volInicial if available
          let valorBase = producto.volInicial && Number(producto.volInicial) > 0 
            ? Number(producto.volInicial) 
            : 10;
            
          producto.años.forEach(año => {
            if (!año.volMeses) return;
            
            // Get meses for processing
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            
            // Find normal months to use as reference
            const mesesNormales = meses.filter(mes => 
              mes !== undefined && !esValorExtremo(año.volMeses[mes]) && Number(año.volMeses[mes]) > 0
            );
            
            // If there are normal months, use their average as a base
            if (mesesNormales.length > 0) {
              const suma = mesesNormales.reduce((acc, mes) => 
                acc + Number(año.volMeses[mes] || 0), 0
              );
              valorBase = Math.round(suma / mesesNormales.length);
            }
            
            // Fix extreme values
            meses.forEach(mes => {
              if (esValorExtremo(año.volMeses[mes])) {
                año.volMeses[mes] = valorBase;
              }
              
              // Ensure all values are numbers
              año.volMeses[mes] = Number(año.volMeses[mes]);
              if (Number.isNaN(año.volMeses[mes])) {
                año.volMeses[mes] = 0;
              }
            });
            
            // Recalculate volTotal
            año.volTotal = meses.reduce((acc, mes) => 
              acc + Number(año.volMeses[mes] || 0), 0
            );
          });
        });
      });
    });
  }
  
  return datosSanitizados;
}; 