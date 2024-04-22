/* eslint-disable jsx-a11y/no-static-element-interactions */
import GraficoDashed from 'components/shared/dashboard/GraficoDashed';
import GraficoDashFinanc01 from 'components/shared/dashboard/GraficoDashFinanc01';
import GraficoDashFinanc02 from 'components/shared/dashboard/GraficoDashFinanc02';
import GraficoDashFinanc03 from 'components/shared/dashboard/GraficoDashFinanc03';
import GraficoDashFinanc04 from 'components/shared/dashboard/GraficoDashFinanc04';
import GraficoDashFinanc05 from 'components/shared/dashboard/GraficoDashFinanc05';
import GraficoDashFinanc06 from 'components/shared/dashboard/GraficoDashFinanc06';
import GraficoDashFinanc07 from 'components/shared/dashboard/GraficoDashFinanc07';
import GraficoDeBarra from 'components/shared/dashboard/GraficoDeBarra';
import GraficoDeBarraHeadcountThree from 'components/shared/dashboard/GraficoDeBarraHeadcountThree';

function TableDashboardFinanciero({ cmgBruta, ebitda, ebit, rn, rdoNetoValue, growth, graph03Data, graph04Data, graph05Data, graph06Data, graph07Data }) {
    const infoForm = {
        "argentina": [
            {
                "canalName": "B2B",
                "productos": [
                    {
                        "id": "65449320-a2ea-4ddf-800d-7ad0d8d99e43",
                        "volInicial": 1000,
                        "comision": 0,
                        "impuesto": 0,
                        "cargos": 0,
                        "precioInicial": 0,
                        "tasa": 0,
                        "name": "Celular",
                        "type": "producto",
                        "inicioMes": 1,
                        "fecha": "",
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 40000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 13000,
                                "ventasTotal": 260000
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 20000,
                                    "febrero": 20000,
                                    "marzo": 20000,
                                    "abril": 20000,
                                    "mayo": 20000,
                                    "junio": 20000,
                                    "julio": 20000,
                                    "agosto": 20000,
                                    "septiembre": 20000,
                                    "octubre": 20000,
                                    "noviembre": 20000,
                                    "diciembre": 20000
                                },
                                "volTotal": 12000,
                                "ventasTotal": 240000
                            }
                        ]
                    },
                    {
                        "id": "d50031dd-6e93-4973-b589-8b86791c3150",
                        "volInicial": 10,
                        "comision": 0,
                        "impuesto": 0,
                        "cargos": 0,
                        "precioInicial": 0,
                        "tasa": 0,
                        "name": "servicio 1",
                        "type": "servicio",
                        "inicioMes": 1,
                        "fecha": "",
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 1000,
                                    "febrero": 1000,
                                    "marzo": 1000,
                                    "abril": 1000,
                                    "mayo": 1000,
                                    "junio": 1000,
                                    "julio": 1000,
                                    "agosto": 1000,
                                    "septiembre": 1000,
                                    "octubre": 1000,
                                    "noviembre": 1000,
                                    "diciembre": 1000
                                },
                                "volTotal": 120,
                                "ventasTotal": 12000
                            }
                        ]
                    }
                ],
                "id": "8bd10988-4b38-4aa8-8b87-49b427dbf41b"
            }
        ],
        "chile": [
            {
                "canalName": "B2B",
                "productos": [
                    {
                        "id": "65449320-a2ea-4ddf-800d-7ad0d8d99e43",
                        "volInicial": 0,
                        "comision": 0,
                        "impuesto": 0,
                        "cargos": 0,
                        "precioInicial": 0,
                        "tasa": 0,
                        "name": "Celular",
                        "type": "producto",
                        "inicioMes": 1,
                        "fecha": "",
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            }
                        ]
                    },
                    {
                        "id": "d50031dd-6e93-4973-b589-8b86791c3150",
                        "volInicial": 0,
                        "comision": 0,
                        "impuesto": 0,
                        "cargos": 0,
                        "precioInicial": 0,
                        "tasa": 0,
                        "name": "servicio 1",
                        "type": "servicio",
                        "inicioMes": 1,
                        "fecha": "",
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0,
                                "ventasTotal": 0
                            }
                        ]
                    }
                ],
                "id": "8bd10988-4b38-4aa8-8b87-49b427dbf41b"
            }
        ]
    }
    const yearSelected = {
        value: 'año 1',
        label: 'Año 1',
        year: 0,
    }
    const periodoSelected = {
        value: '1er semestre',
        label: '1er semestre',
        month: 6,
    }

    const dataHeadcount = [
        {
            "Administración": {
                "visible": true,
                "puestos": [
                    {
                        "id": 0,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 10,
                                    "febrero": 10,
                                    "marzo": 10,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 165
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 15,
                                    "febrero": 15,
                                    "marzo": 15,
                                    "abril": 15,
                                    "mayo": 15,
                                    "junio": 15,
                                    "julio": 15,
                                    "agosto": 15,
                                    "septiembre": 15,
                                    "octubre": 15,
                                    "noviembre": 15,
                                    "diciembre": 15
                                },
                                "volTotal": 180
                            }
                        ],
                        "name": "Analista Admin. y Finanzas",
                        "precioInicial": 100,
                        "incremento": 20,
                        "cargaSocial": 20,
                        "isNew": false,
                        "total": 120
                    },
                    {
                        "id": 1,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 2,
                                    "febrero": 2,
                                    "marzo": 2,
                                    "abril": 2,
                                    "mayo": 2,
                                    "junio": 2,
                                    "julio": 2,
                                    "agosto": 2,
                                    "septiembre": 2,
                                    "octubre": 2,
                                    "noviembre": 2,
                                    "diciembre": 2
                                },
                                "volTotal": 14400
                            }
                        ],
                        "name": "Analista RRHH",
                        "precioInicial": 500,
                        "incremento": 0,
                        "cargaSocial": 100,
                        "isNew": false,
                        "total": 600
                    },
                    {
                        "id": 2,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Jefe Admin y Finanzas",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 3,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "CFO",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 4,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "CEO",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 5,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Country Manager",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 6,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "RRHH BP",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 7,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Analista Tesoreria",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 8,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Analista Contable",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 9,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Analista Compras",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "name": "dsfsfsfsfs",
                        "isNew": true,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "id": 604,
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0
                    }
                ]
            },
            "Operaciones": {
                "visible": true,
                "puestos": [
                    {
                        "id": 0,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Analista operaciones",
                        "precioInicial": 300,
                        "incremento": 0,
                        "cargaSocial": 60,
                        "isNew": false,
                        "total": 360
                    },
                    {
                        "id": 1,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Atencion al Cliente",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 2,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Aux. Operaciones",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 3,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Jefe operaciones",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "id": 4,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "COO",
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0,
                        "isNew": false,
                        "total": 0
                    },
                    {
                        "name": "nuevo",
                        "isNew": true,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 1,
                                    "febrero": 1,
                                    "marzo": 1,
                                    "abril": 1,
                                    "mayo": 1,
                                    "junio": 1,
                                    "julio": 1,
                                    "agosto": 1,
                                    "septiembre": 1,
                                    "octubre": 1,
                                    "noviembre": 1,
                                    "diciembre": 1
                                },
                                "volTotal": 12
                            }
                        ],
                        "id": 844,
                        "precioInicial": 0,
                        "incremento": 0,
                        "cargaSocial": 0
                    }
                ]
            },
            "Comercial": {
                "visible": true,
                "puestos": [
                    {
                        "id": 0,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Comercial Jr",
                        "isNew": false
                    },
                    {
                        "id": 1,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "KAM Regional",
                        "isNew": false
                    },
                    {
                        "id": 2,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Jefe Comercial",
                        "isNew": false
                    },
                    {
                        "id": 3,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Gerente Comercial",
                        "isNew": false
                    },
                    {
                        "id": 4,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "KAM",
                        "isNew": false
                    }
                ]
            },
            "Marketing": {
                "visible": true,
                "puestos": [
                    {
                        "id": 0,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Analista MMKT",
                        "isNew": false
                    },
                    {
                        "id": 1,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Jefe MKT",
                        "isNew": false
                    },
                    {
                        "id": 2,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Gerente MKT",
                        "isNew": false
                    }
                ]
            },
            "PandD": {
                "visible": false,
                "puestos": [
                    {
                        "id": 0,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Project Leader",
                        "isNew": false
                    },
                    {
                        "id": 1,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Programador in house web",
                        "isNew": false
                    },
                    {
                        "id": 2,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "programador in house app",
                        "isNew": false
                    },
                    {
                        "id": 3,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "CTO",
                        "isNew": false
                    },
                    {
                        "id": 4,
                        "años": [
                            {
                                "año": 1,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 2,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 3,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 4,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 5,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 6,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 7,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 8,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 9,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            },
                            {
                                "año": 10,
                                "volMeses": {
                                    "enero": 0,
                                    "febrero": 0,
                                    "marzo": 0,
                                    "abril": 0,
                                    "mayo": 0,
                                    "junio": 0,
                                    "julio": 0,
                                    "agosto": 0,
                                    "septiembre": 0,
                                    "octubre": 0,
                                    "noviembre": 0,
                                    "diciembre": 0
                                },
                                "volTotal": 0
                            }
                        ],
                        "name": "Big Data",
                        "isNew": false
                    }
                ]
            },
            "nuevo ": {
                "visible": false,
                "puestos": []
            },
            "nuevo 2": {
                "visible": false,
                "puestos": []
            }
        }
    ]

    const graph01Data = [
        {
            name: 'CMG BRUTA %',
            data: cmgBruta,
        },
        {
            name: 'EBITDA %',
            data: ebitda,
        },
        {
            name: 'EBIT %',
            data: ebit,
        },
        {
            name: 'RN %',
            data: rn,
        },
    ];

    const typeView = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun"
    ]

    return (<>
        <div>
            <div className="border-solid border-2 border-#e5e7eb rounded-lg 
                px-4 py-5
            ">
                <h2 className="mb-[30px]">
                    P&L
                </h2>
                {/* Grafico 1 */}
                <div className="mt-[40px]">
                    <h5>CMG BRUTA %, EBITDA % , EBIT % y RN %</h5>
                    <GraficoDashFinanc01 data={graph01Data} />
                </div>

                {/* Grafico 2 */}
                <div className="mt-[40px] mb-[20px]">
                    <h5>Resultado Neto y Growth</h5>
                    <GraficoDashFinanc02
                        rdoNeto={rdoNetoValue}
                        growth={growth}
                        yearSelected={yearSelected}
                        periodoSelected={periodoSelected}
                    />
                </div>

                {/* Grafico 3 */}
                <div className="mt-[40px]">
                    <h5>Ventas, Total costos, CMG Bruta, Gastos de estructura, EBITDA, Rdo Neto</h5>
                    <GraficoDashFinanc03 graph03Data={graph03Data} />
                </div>

                <h2 className="mb-[30px]">
                    CASHFLOW
                </h2>

                {/* Grafico 4 */}
                <div className="mt-[40px] mb-[20px]">
                    <h5>Variacion de caja/bancos y Caja/bancos al cierre del periodo</h5>
                    <GraficoDashFinanc04
                        props={graph04Data}
                        yearSelected={yearSelected}
                        periodoSelected={periodoSelected}
                    />
                </div>

                {/* Grafico 5
                <div className="mt-[40px]">
                    <h5>Max y Min Flujo de Fondos </h5>
                    <GraficoDashed />
                </div> */}

                {/* Grafico 6 */}
                {/* <div className="mt-[40px] mb-[20px]">
                    <h5>Cash Runway</h5>
                    <GraficoDeBarra
                        data={infoForm}
                        yearSelected={yearSelected}
                        periodoSelected={periodoSelected}
                    />
                </div> */}

                {/* Grafico 7 */}
                {/* <div className="mt-[40px] mb-[20px]">
                    <h5>Gross Burn Rate</h5>
                    <GraficoDeBarra
                        data={infoForm}
                        yearSelected={yearSelected}
                        periodoSelected={periodoSelected}
                    />
                </div> */}

                {/* Grafico 8 */}
                {/* <div className="mt-[40px] mb-[20px]">
                    <h5>Net Burn Rate</h5>
                    <GraficoDeBarra
                        data={infoForm}
                        yearSelected={yearSelected}
                        periodoSelected={periodoSelected}
                    />
                </div>

                <h2 className="mb-[30px]">
                    KPI
                </h2> */}

                <h2 className="mb-[30px]">
                    KPI
                </h2>

                {/* Grafico 9 */}
                <h5 className="cursor-default">Endeudamiento</h5>
                <GraficoDashFinanc05
                    data={graph05Data}
                    typeView={typeView}
                    dataHeadcount={dataHeadcount}
                    periodoSelected={periodoSelected}
                    yearSelected={yearSelected}
                />

                {/* Grafico 10 */}
                <h5 className="cursor-default">Solvencia</h5>
                <GraficoDashFinanc06
                    data={graph06Data}
                    typeView={typeView}
                    dataHeadcount={dataHeadcount}
                    periodoSelected={periodoSelected}
                    yearSelected={yearSelected}
                />

                {/* Grafico 11 */}
                <h5 className="cursor-default">Liquidez</h5>
                <GraficoDashFinanc07
                    data={graph07Data}
                    typeView={typeView}
                    dataHeadcount={dataHeadcount}
                    periodoSelected={periodoSelected}
                    yearSelected={yearSelected}
                />

            </div>
        </div>
    </>);
}

export default TableDashboardFinanciero;
