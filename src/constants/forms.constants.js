// Helper function to create safe month values
const createSafeMesesObject = () => {
  // Create a Proxy to trap any attempt to set 270000000
  const mesesObj = {
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0,
  };

  return new Proxy(mesesObj, {
    set(target, prop, value) {
      // If trying to set the problematic value, replace with 10
      if (value === 270000000) {
        console.warn(`⚠️ Valor extremo 270000000 intentando ser asignado a ${String(prop)}. Reemplazado con 10.`);
        target[prop] = 10;
        return true;
      }
      
      // Normal assignment for other values
      target[prop] = value;
      return true;
    }
  });
};

export const MESES = createSafeMesesObject();

export const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

// Helper to create year object with safe volMeses
const createSafeYearObject = (yearNumber) => ({
  año: yearNumber,
  volMeses: { ...MESES },
  volTotal: 0,
  // Add a sanityCheck method to verify no extreme values
  sanityCheck() {
    const meses = Object.keys(this.volMeses);
    let modified = false;
    
    meses.forEach(mes => {
      if (this.volMeses[mes] === 270000000) {
        this.volMeses[mes] = 10;
        modified = true;
      }
    });
    
    if (modified) {
      // Recalculate volTotal
      this.volTotal = Object.values(this.volMeses).reduce(
        (sum, value) => sum + (value || 0), 0
      );
    }
    
    return this;
  }
});

export const AÑOS = [
  createSafeYearObject(1),
  createSafeYearObject(2),
  createSafeYearObject(3),
  createSafeYearObject(4),
  createSafeYearObject(5),
  createSafeYearObject(6),
  createSafeYearObject(7),
  createSafeYearObject(8),
  createSafeYearObject(9),
  createSafeYearObject(10),
];

export const AÑOS2 = [
  createSafeYearObject(1),
  createSafeYearObject(2),
  createSafeYearObject(3),
  createSafeYearObject(4),
  createSafeYearObject(5),
  createSafeYearObject(6),
  createSafeYearObject(7),
  createSafeYearObject(8),
  createSafeYearObject(9),
  createSafeYearObject(10),
];

export const AÑOS3 = [
  createSafeYearObject(1),
  createSafeYearObject(2),
  createSafeYearObject(3),
  createSafeYearObject(4),
  createSafeYearObject(5),
  createSafeYearObject(6),
  createSafeYearObject(7),
  createSafeYearObject(8),
  createSafeYearObject(9),
  createSafeYearObject(10),
];

export const optionsMonths = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
];

export const optionsIncremento = [
  { value: 'mensual', label: 'Mensual' },
  { value: 'trimestral', label: 'Trimestral' },
  { value: 'anual', label: 'Anual' },
];
export const optionsDiasStock = [
  { value: 0, label: '0 días' },
  { value: 15, label: '15 días' },
  { value: 30, label: '30 días' },
  { value: 45, label: '45 días' },
  { value: 60, label: '60 días' },
  { value: 75, label: '75 días' },
  { value: 90, label: '90 días' },
];
export const AÑOS_COSTO = [
  {
    año: 1,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 2,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 3,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 4,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 5,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 6,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 7,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 8,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 9,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
  {
    año: 10,
    volMeses: { ...MESES },
    volMesesCosto: { ...MESES },
    volTotal: 0,
  },
];

export const EMPTY_CARGOS = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const EMPTY_IMPUESTO = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const EMPTY_COMISION = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const BASIC_EMPTY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const EMPTY_TOTALES = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const OPTIONS_COUNTRY = [
  { value: 'argentina', label: 'Argentina' },
  { value: 'brasil', label: 'Brasil' },
  { value: 'chile', label: 'Chile' },
  { value: 'uruguay', label: 'Uruguay' },
];

export const optionsBienes = [
  {
    value: 'Rodados',
    label: 'Rodados',
    amortizacion: 5,
    medida: 'UNIDAD',
  },
  {
    value: 'Maquinarias',
    label: 'Maquinarias',
    amortizacion: 10,
    medida: 'UNIDAD',
  },
  {
    value: 'Fabricas, Edificios, Oficinas',
    label: 'Fabricas, Edificios, Oficinas',
    amortizacion: 50,
    medida: 'UNIDAD',
  },
  {
    value: 'Horas Desarrollo',
    label: 'Horas Desarrollo',
    amortizacion: 3,
    medida: 'HORAS',
  },
  {
    value: 'Equipos informaticos',
    label: 'Equipos informaticos',
    amortizacion: 3,
    medida: 'UNIDAD',
  },
  {
    value: 'Equipos electronicos',
    label: 'Equipos electronicos',
    amortizacion: 3,
    medida: 'UNIDAD',
  },
  {
    value: 'Terreno',
    label: 'Terreno',
    amortizacion: 0,
    medida: 'UNIDAD',
  },
  {
    value: 'Producto Tecnológico',
    label: 'Producto Tecnológico',
    amortizacion: 3,
    medida: 'UNIDAD',
  },
  {
    value: 'Utiles y Muebles',
    label: 'Utiles y Muebles',
    amortizacion: 10,
    medida: 'UNIDAD',
  },
  {
    value: 'Herramientas',
    label: 'Herramientas',
    amortizacion: 10,
    medida: 'UNIDAD',
  },
];

export const mesesPrestamos = [
  { value: 'Enero', label: 'Enero' },
  { value: 'Febrero', label: 'Febrero' },
  { value: 'Marzo', label: 'Marzo' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Mayo', label: 'Mayo' },
  { value: 'Junio', label: 'Junio' },
  { value: 'Julio', label: 'Julio' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Septiembre', label: 'Septiembre' },
  { value: 'Octubre', label: 'Octubre' },
  { value: 'Noviembre', label: 'Noviembre' },
  { value: 'Diciembre', label: 'Diciembre' },
];

export const anosPrestamos = [
  { value: '1', label: 'Año 1' },
  { value: '2', label: 'Año 2' },
  { value: '3', label: 'Año 3' },
  { value: '4', label: 'Año 4' },
  { value: '5', label: 'Año 5' },
  { value: '6', label: 'Año 6' },
  { value: '7', label: 'Año 7' },
  { value: '8', label: 'Año 8' },
  { value: '9', label: 'Año 9' },
  { value: '10', label: 'Año 10' },
];

export const defaultVolumenData = [
  {
    "_id": "",
    "countryName": "",
    "idUser": [],
    "__v": 0,
    "stats": [
      {
        "canalName": "",
        "productos": [
          {
            "id": "",
            "volInicial": 0,
            "comision": 0,
            "impuesto": 0,
            "cargos": 0,
            "precioInicial": 0,
            "tasa": 0,
            "name": "",
            "type": "",
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
            ]
          },
        ],
        "id": ""
      }
    ]
  },
]

export const defaultPrecioData = [
  {
    "_id": "",
    "countryName": "",
    "idUser": [
    ],
    "__v": 0,
    "stats": [
      {
        "canalName": "",
        "productos": [
          {
            "id": "",
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
            ]
          },
        ],
        "id": ""
      }
    ]
  }
]

export const defaultAssumpFinancierasData = [
  {
    "_id": "",
    "cobranzas": {
      "contado": "0",
      "treintaDias": "0",
      "cuarentaycincoDias": "0",
      "sesentaDias": "0",
      "noventaDias": "0",
      "cveinteDias": "0",
      "ccincuentaDias": "0",
      "cochenteDias": "0",
      "ddiezDiaz": "0",
      "dcuarentaDias": "0",
      "dsetentaDias": "0",
      "trescientosDias": "0",
      "ttreintaDias": "0",
      "IVA": "0",
      "imponible": "0"
    },
    "pagoProducto": {
      "contado": "0",
      "treintaDias": "0",
      "cuarentaycincoDias": "0",
      "sesentaDias": "0",
      "noventaDias": "0",
      "cveinteDias": "0",
      "ccincuentaDias": "0",
      "cochenteDias": "0",
      "ddiezDiaz": "0",
      "dcuarentaDias": "0",
      "dsetentaDias": "0",
      "trescientosDias": "0",
      "ttreintaDias": "0",
      "IVA": "0",
      "imponible": "0"
    },
    "pagoServicio": {
      "contado": "0",
      "treintaDias": "0",
      "cuarentaycincoDias": "0",
      "sesentaDias": "0",
      "noventaDias": "0",
      "cveinteDias": "0",
      "ccincuentaDias": "0",
      "cochenteDias": "0",
      "ddiezDiaz": "0",
      "dcuarentaDias": "0",
      "dsetentaDias": "0",
      "trescientosDias": "0",
      "ttreintaDias": "0",
      "IVA": "0",
      "imponible": "0"
    },
    "stock": "0",
    "inversion": {
      "contado": "0",
      "treintaDias": "0",
      "cuarentaycincoDias": "0",
      "sesentaDias": "0",
      "noventaDias": "0",
      "cveinteDias": "0",
      "ccincuentaDias": "0",
      "cochenteDias": "0",
      "ddiezDiaz": "0",
      "dcuarentaDias": "0",
      "dsetentaDias": "0",
      "trescientosDias": "0",
      "ttreintaDias": "0",
      "IVA": "0",
      "imponible": "0"
    },
    "idUser": [
    ],
    "__v": 0,
    "impGanancias": "0"
  }
]

export const defaultCostoData = [
  {
    "_id": "",
    "countryName": "",
    "idUser": [
    ],
    "__v": 0,
    "stats": [
      {
        "canalName": "",
        "productos": [
          {
            "id": "",
            "volInicial": 0,
            "comision": 0,
            "impuesto": 0,
            "cargos": 0,
            "precioInicial": 0,
            "tasa": 0,
            "name": "",
            "type": "",
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
            ]
          },
        ],
        "id": ""
      }
    ]
  },
]

export const defaultGastosPorCCData = [
  {
    "_id": "",
    "idUser": [
    ],
    "__v": 0,
    "centroDeCostos": [
      {
        "Administración": {
          "visible": false,
          "cuentas": [
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
              "name": "",
              "precioInicial": 0,
              "tasa": 0,
              "incremento": "mensual"
            },
          ],
          "sum": []
        },
        "Operaciones": {
          "visible": false,
          "cuentas": [
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
              "name": "",
              "precioInicial": 0,
              "tasa": 0,
              "incremento": "mensual"
            },
          ],
          "sum": []
        },
        "Comercial": {
          "visible": false,
          "cuentas": [
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
              "name": "",
              "precioInicial": 0,
              "tasa": 0,
              "incremento": "mensual"
            },
          ],
          "sum": []
        },
        "Marketing": {
          "visible": false,
          "cuentas": [
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
              "name": "",
              "precioInicial": 0,
              "tasa": 0,
              "incremento": "mensual"
            },
          ],
          "sum": []
        },
        "PandD": {
          "visible": false,
          "cuentas": [
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
              "name": "",
              "precioInicial": 0,
              "tasa": 0,
              "incremento": "mensual"
            },
          ],
          "sum": []
        },
        "nuevo ": {
          "visible": false,
          "cuentas": [
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
              "name": "",
              "precioInicial": 0,
              "tasa": 0,
              "incremento": "mensual"
            },
          ],
          "sum": []
        },
        "nuevo 2": {
          "visible": false,
          "cuentas": [
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
              "name": "",
              "precioInicial": 0,
              "tasa": 0,
              "incremento": "mensual"
            },
          ],
          "sum": []
        },
      }
    ]
  }
]

export const defaultCapexPData = [
  {
    "_id": "",
    "idUser": [
    ],
    "__v": 0,
    "capexP": [
      {
        "id": "",
        "bien": "",
        "descripcion": "",
        "unidad": "UNIDAD",
        "tasa": 0,
        "precioInicial": 0,
        "incremento": "mensual",
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
        ]
      }
    ]
  }
]

export const defaultCapexQData = [
  {
    "_id": "",
    "idUser": [
    ],
    "__v": 0,
    "capexQ": [
      {
        "id": "",
        "bien": "",
        "descripcion": "",
        "unidad": "UNIDAD",
        "tasa": 0,
        "precioInicial": 0,
        "incremento": "mensual",
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
        ]
      }
    ]
  }
]