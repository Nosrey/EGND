/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */

import { useState } from 'react';
import ContainerScrollable from 'components/shared/ContainerScrollable';
import { FormContainer } from 'components/ui';
import TableDashboardFinanciero from './TableDashboardFinanciero';
import PyL from '../PyL/PyL';
import CashflowIndirecto from '../CashflowIndirecto/CashflowIndirecto';
import Balance from '../Balance/Balance';

function DashboardFinanciero() {
  // grafica 01 ----
  const [cmgBruta, setCmgbruta] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [ebitda, setEbitda] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [ebit, setEbit] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [rn, setRn] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // grafica 02 ----
  const [rdoNetoValue, setRdoNetoValue] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [growth, setGrowth] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [graph03Data, setGraph03Data] = useState([
    {
      name: 'Ventas',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Total Costos',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'CMG Bruta',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Gastos de estructura',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'EBITDA',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Rdo Neto',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  const [graph04Data, setGraph04Data] = useState([
    {
      name: 'Variación de caja y bancos',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Caja y bancos al cierre',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  const [graph05Data, setGraph05Data] = useState([
    {
      name: 'Endeudamiento',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  const [graph06Data, setGraph06Data] = useState([
    // solvencia
    {
      name: 'Solvencia',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  const [graph07Data, setGraph07Data] = useState([
    // liquidez
    {
      name: 'Liquidez',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ])

  return (
    <div>
      <div className="oculto">
        <PyL
          setInteresesExterior={() => { }}
          setAmortizacionesExterior={() => { }}
          setCmgbruta={setCmgbruta}
          setEbitda={setEbitda}
          setEbit={setEbit}
          setRn={setRn}
          setRdoNetoValue={setRdoNetoValue}
          setGrowth={setGrowth}
          setGraph03Data={setGraph03Data}
          cmgBruta={cmgBruta}
          ebitda={ebitda}
          ebit={ebit}
          rn={rn}
        />
        <CashflowIndirecto
          setGraph04Data={setGraph04Data}
        />
        <Balance
          setGraph05Data={setGraph05Data}
          setGraph06Data={setGraph06Data}
          setGraph07Data={setGraph07Data}
        />
      </div>
      <div className="border-b-2 mb-8 pb-1">
        <h4 className="cursor-default">Dashboard Financiero</h4>
        <span className="cursor-default">Estados Financieros</span>
      </div>
      <div className="container-countries">
        <FormContainer className="cont-countries">
          <ContainerScrollable
            contenido={
              <TableDashboardFinanciero
                cmgBruta={cmgBruta}
                ebitda={ebitda}
                ebit={ebit}
                rn={rn}
                rdoNetoValue={rdoNetoValue}
                growth={growth}
                graph03Data={graph03Data}
                graph04Data={graph04Data}
                graph05Data={graph05Data}
                graph06Data={graph06Data}
                graph07Data={graph07Data}
              />
            }
          />
        </FormContainer>
      </div>
    </div>
  );
}

export default DashboardFinanciero;
