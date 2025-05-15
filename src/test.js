const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function calcFinanciacionDeTerceros(prestamosData) {
  
  let dataFinanciacionDeTerceros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < prestamosData.length; i++) {
    const { mesInicio, monto, plazo, yearInicio } = prestamosData[i];
    


    // Parse values
    const montoNum = parseFloat(monto);
    const plazoNum = parseInt(plazo);
    const yearInicioNum = parseInt(yearInicio) || 0;
    
    // Add the full loan amount to the starting year
    dataFinanciacionDeTerceros[yearInicioNum] += montoNum;
    
    // Calculate monthly payment
    const pagoMensual = montoNum / plazoNum;


    // Get month index
    const mesInicioIndex = MONTHS.indexOf(mesInicio.toLowerCase());

    
    // Next month after mesInicio (when payments start)
    const startPaymentMonth = (mesInicioIndex + 1) % 12;

    
    // Distribute payments
    let mesesPagados = 0;
    let anioActual = yearInicioNum;
    let mesActual = startPaymentMonth;
    
    while (mesesPagados < plazoNum && anioActual < 10) {
      // How many months to pay in current year
      const mesesEnEsteAnio = Math.min(
        plazoNum - mesesPagados,
        mesActual === 0 ? 12 : 13 - mesActual
      );
      
      // Total payment for this year
      const pagoEsteAnio = mesesEnEsteAnio * pagoMensual;
      
      // Subtract payment from year
      dataFinanciacionDeTerceros[anioActual] -= pagoEsteAnio;
      

      
      mesesPagados += mesesEnEsteAnio;
      anioActual++;
      mesActual = 0;
    }
  }

  return dataFinanciacionDeTerceros;
}

// Test with example data from the image
const testData = [
  {monto: 10000, plazo: 24, mesInicio: 'junio', yearInicio: 1, tasaAnual: 12}
];

calcFinanciacionDeTerceros(testData); 