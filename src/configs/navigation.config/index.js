import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_TITLE,
} from 'constants/navigation.constant';

const navigationConfig = [
  {
    key: 'financialPlan',
    path: '',
    title: 'Financial Plan',
    translateKey: 'nav.financialPlan',
    icon: '',
    type: NAV_ITEM_TYPE_TITLE,
    authority: [],
    subMenu: [
      {
        key: 'collapseGeneral',
        path: '',
        title: 'Supuestos del Modelo',
        translateKey: 'nav.collapseGeneral.collapseGeneral',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: 'nav.collapseMenu.collapseGeneral.item1',
            path: '/supuestos-generales',
            title: 'Supuestos del Modelo',
            translateKey: 'nav.collapseMenu.collapseGeneral.item1',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseGeneral.item2',
            path: '/research',
            title: 'Mercado',
            translateKey:
              'nav.financialPlan.collapseMenu.collapseGeneral.item2',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: 'collapsePlanCuentas',
        path: '/plandecuentas',
        title: 'Plan de Cuentas',
        translateKey: 'nav.collapseMenu.collapsePlanCuentas',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'collapsePlanVentas',
        path: '',
        title: 'Plan de Ventas',
        translateKey: 'nav.collapsePlanVentas.collapsePlanVentas',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: 'collapsePlanVentas.item1',
            path: '/supuestos-ventas',
            title: 'Supuestos de Ventas',
            translateKey: 'nav.collapsePlanVentas.item1',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapsePlanVentas.item2',
            path: '/volumen',
            title: 'Cantidad y Volumen',
            translateKey: 'nav.collapsePlanVentas.item2',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseMenu.item3',
            path: '/precio',
            title: 'Precio',
            translateKey: 'nav.collapseMenu.item3',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapsePlanVentas.item4',
            path: '/ventas',
            title: 'Ventas totales',
            translateKey: 'nav.collapsePlanVentas.item4',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },

          {
            key: 'collapsePlanVentas.item5',
            path: '/clientes-altas-churn',
            title: 'Clientes - Alta y Churn',
            translateKey: 'nav.collapsePlanVentas.item5',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          // {
          //   key: 'collapsePlanVentas.item6',
          //   path: '/clientestotaltes',
          //   title: 'Clientes Totales',
          //   translateKey: 'nav.collapsePlanVentas.item6',
          //   icon: '',
          //   type: NAV_ITEM_TYPE_ITEM,
          //   authority: [],
          //   subMenu: [],
          // },
          {
            key: 'collapsePlanVentas.item7',
            path: '/dashboardventas',
            title: 'Dashboard de Ventas',
            translateKey: 'nav.collapsePlanVentas.item7',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: 'collapseCostosDirectos',
        path: '',
        title: 'Costos Directos y Margen Bruto',
        translateKey: 'nav.collapseCostosDirectos.collapseCostosDirectos',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: 'collapseCostosDirectos.item1',
            path: '/costos-unitarios',
            title: 'Costos Unitarios',
            translateKey: 'nav.collapseCostosDirectos.item1',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },

          {
            key: 'collapseCostosDirectos.item2',
            path: '/costopxq',
            title: 'Costos Totales',
            translateKey: 'nav.collapseCostosDirectos.item2',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseCostosDirectos.item3',
            path: '/margen-bruto',
            title: 'Margen Bruto',
            translateKey: 'nav.collapseCostosDirectos.item3',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseCostosDirectos.item4',
            path: '/dashboard-costos',
            title: 'Dashboard Costos',
            translateKey: 'nav.collapseCostosDirectos.item4',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseCostosDirectos.item5',
            path: '/dashboard-margen-bruto',
            title: 'Dashboard CMG Bruta',
            translateKey: 'nav.collapseCostosDirectos.item5',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: 'collapseHeadcount',
        path: '',
        title: 'Headcount',
        translateKey: 'nav.collapseHeadcount.collapseHeadcount',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: 'collapseHeadcount.item1',
            path: '/proyeccion-nomina',
            title: 'Proyección nomina',
            translateKey: 'nav.collapseHeadcount.item1',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseHeadcount.item2',
            path: '/salarios',
            title: 'Salarios',
            translateKey: 'nav.collapseHeadcount.item2',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseHeadcount.item3',
            path: '/headcount',
            title: 'Headcount',
            translateKey: 'nav.collapseHeadcount.item3',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseHeadcount.item4',
            path: '/dashboard-headcount',
            title: 'Dashboard Headcount',
            translateKey: 'nav.collapseHeadcount.item4',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: 'collapseGastosDeEstructura',
        path: '',
        title: 'Gastos de Estructura',
        translateKey:
          'nav.collapseGastosDeEstructura.collapseGastosDeEstructura',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: 'collapseGastosDeEstructura.item1',
            path: '/supuestos-gastos',
            title: 'Supuesto de Gasto de estructura',
            translateKey: 'nav.collapseGastosDeEstructura.item1',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },

          {
            key: 'collapseGastosDeEstructura.item2',
            path: '/gastos-por-cc',
            title: 'Proyección de Gastos por CC',
            translateKey: 'nav.collapseGastosDeEstructura.item2',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseGastosDeEstructura.item3',
            path: '/resumengasto',
            title: 'Consolidado de Gasto',
            translateKey: 'nav.collapseGastosDeEstructura.item3',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseGastosDeEstructura.item4',
            path: '/',
            title: 'Dashboard de Gasto',
            translateKey: 'nav.collapseGastosDeEstructura.item4',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseGastosDeEstructura.item5',
            path: '/',
            title: 'CAC',
            translateKey: 'nav.collapseGastosDeEstructura.item5',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: 'collapsePlanDeInversionesYAmortizaciones',
        path: '',
        title: 'Plan de inversiones y Amortizaciones',
        translateKey:
          'nav.collapsePlanDeInversionesYAmortizaciones.collapsePlanDeInversionesYAmortizaciones',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: 'collapsePlanDeInversionesYAmortizaciones.item1',
            path: '/volumen-inversion',
            title: 'Estimacion de volumen de Inversiones',
            translateKey: 'nav.collapsePlanDeInversionesYAmortizaciones.item1',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapsePlanDeInversionesYAmortizaciones.item2',
            path: '/costo-inversion',
            title: 'Estimación costo Inversiones',
            translateKey: 'nav.collapsePlanDeInversionesYAmortizaciones.item2',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapsePlanDeInversionesYAmortizaciones.item3',
            path: '/inversion-total',
            title: 'Visualización Inversiones y Amortizaciones',
            translateKey: 'nav.collapsePlanDeInversionesYAmortizaciones.item3',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: 'collapseGastosFinancierosParaOperacion',
        path: '',
        title: 'Gastos Financieros para Operación',
        translateKey:
          'nav.collapseGastosFinancierosParaOperacion.collapseGastosFinancierosParaOperacion',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: 'collapseGastosFinancierosParaOperacion.item1',
            path: '/assumptionfinancieras',
            title: 'Assumption Gastos Financieros ',
            translateKey: 'nav.collapseGastosFinancierosParaOperacion.item1',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseGastosFinancierosParaOperacion.item2',
            path: '/',
            title: 'Préstamos ',
            translateKey: 'nav.collapseGastosFinancierosParaOperacion.item2',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: 'collapseEstadosFinancieros',
        path: '',
        title: 'Estados Financieros',
        translateKey:
          'nav.collapseEstadosFinancieros.collapseEstadosFinancieros',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: 'collapseEstadosFinancieros.item1',
            path: '/',
            title: 'P&L',
            translateKey: 'nav.collapseEstadosFinancieros.item1',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseEstadosFinancieros.item2',
            path: '/',
            title: 'Cashflow Directo e Indirecto',
            translateKey: 'nav.collapseEstadosFinancieros.item2',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseEstadosFinancieros.item3',
            path: '/',
            title: 'Balance y Working Capital',
            translateKey: 'nav.collapseEstadosFinancieros.item3',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: 'collapseEstadosFinancieros.item4',
            path: '/',
            title: 'Dashboard Financiero',
            translateKey: 'nav.collapseEstadosFinancieros.item4',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
