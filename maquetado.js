function agregarCobranzaServicios(mes, año, cobranzasGrupo, productosLista, obtenerIva, assumpFinancierasData) {
    let cobradoFinal = productosLista?.años[año][mes].volMeses * (obtenerIva(assumpFinancierasData) / 100 + 1)
    // saco el volcoIva con contado
    console.log('productosLista: ', productosLista)
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