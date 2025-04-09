const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function calcFinanciacionDeTerceros(prestamosData) {
  console.log('Calculando financiación de terceros...');
  
  let dataFinanciacionDeTerceros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < prestamosData.length; i++) {
    const { mesInicio, monto, plazo, yearInicio } = prestamosData[i];
    
    console.log(`\nProcesando préstamo ${i + 1}:`);
    console.log('Monto:', monto);
    console.log('Plazo (meses):', plazo);
    console.log('Mes inicio:', mesInicio);
    console.log('Año inicio:', yearInicio);

    // Parse values
    const montoNum = parseFloat(monto);
    const plazoNum = parseInt(plazo);
    const yearInicioNum = parseInt(yearInicio) || 0;
    
    // Add the full loan amount to the starting year
    dataFinanciacionDeTerceros[yearInicioNum] += montoNum;
    
    // Calculate monthly payment
    const pagoMensual = montoNum / plazoNum;
    console.log('Pago mensual sin intereses:', pagoMensual);

    // Get month index
    const mesInicioIndex = MONTHS.indexOf(mesInicio.toLowerCase());
    console.log('Índice mes inicio:', mesInicioIndex);
    
    // Next month after mesInicio (when payments start)
    const startPaymentMonth = (mesInicioIndex + 1) % 12;
    console.log('Mes de inicio de pagos:', MONTHS[startPaymentMonth]);
    
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
      
      console.log(`Año ${anioActual + 1}: pagando ${mesesEnEsteAnio} meses = ${pagoEsteAnio}`);
      
      mesesPagados += mesesEnEsteAnio;
      anioActual++;
      mesActual = 0;
    }
  }

  console.log('\nResultado final por año:', dataFinanciacionDeTerceros);
  return dataFinanciacionDeTerceros;
}

// Test with example data from the image
const testData = [
  {monto: 10000, plazo: 24, mesInicio: 'junio', yearInicio: 1, tasaAnual: 12}
];

calcFinanciacionDeTerceros(testData); 