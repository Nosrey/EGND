/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */

import ContainerScrollable from 'components/shared/ContainerScrollable';
import MySpinner from 'components/shared/loaders/MySpinner';
import { Alert, FormContainer } from 'components/ui';
import { EMPTY_TOTALES } from 'constants/forms.constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from 'services/Requests';
import {
  calcAmortizaciones,
  calcFinanciacionDeTerceros,
  calcInteresesPagadosPorAnio,
  calcInversiones,
  multiplicacionPxQCapex,
} from 'utils/calcs';
import PyL from '../PyL/PyL';
import TableCashflowIndirecto from './TableCashflowIndirecto';

function CashflowIndirecto() {
  // const rn = useContext(MiContexto);
  const [showLoader, setShowLoader] = useState(false);
  const currentState = useSelector((state) => state.auth.user);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [capexPData, setCapexPData] = useState();
  const [capexQData, setCapexQData] = useState();
  const [prestamosData, setPrestamosData] = useState();
  const myResult = useSelector((state) => state.netoResult);

  // INFO A MOSTRAR EN LA TABLA
  const [amortizaciones, setAmortizaciones] = useState();
  const [intereses, setIntereses] = useState();
  const [inversiones, setInversiones] = useState();
  const [financiacion, setFinanciacion] = useState();

  useEffect(() => {
    if (
      capexPData &&
      capexPData.length !== 0 &&
      capexQData &&
      capexQData.length !== 0 &&
      !amortizaciones
    ) {
      const PxQCapex = multiplicacionPxQCapex(capexQData, capexPData);
      setAmortizaciones(calcAmortizaciones(PxQCapex));
      setInversiones(calcInversiones(PxQCapex));
    }
  }, [capexPData, capexQData]);

  useEffect(() => {
    if (prestamosData) {
      setIntereses(calcInteresesPagadosPorAnio(prestamosData));
      setFinanciacion(calcFinanciacionDeTerceros(prestamosData));
    }
  }, [prestamosData]);

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        if (data?.capexPData[0]?.length !== 0) {
          setCapexPData(data?.capexPData[0]?.capexP);
        } else {
          setCapexPData(EMPTY_TOTALES);
        }

        if (data?.capexQData[0]?.length !== 0) {
          setCapexQData(data?.capexQData[0]?.capexQ);
        } else {
          setCapexQData(EMPTY_TOTALES);
        }

        if (data?.prestamos?.length !== 0) {
          setPrestamosData(data?.prestamos);
        }
        setTimeout(() => {
          setShowLoader(false);
        }, 4000);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {showSuccessAlert && (
        <Alert className="mb-4" type="success" showIcon>
          Los datos se guardaron satisfactoriamente.
        </Alert>
      )}
      {showErrorAlert && (
        <Alert className="mb-4" type="danger" showIcon>
          No se pudieron guardar los datos.
        </Alert>
      )}
      <div className="oculto">
        <PyL />
      </div>
      <div />
      {showLoader ? (
        <MySpinner />
      ) : !prestamosData ? (
        <div className="py-[25px] bg-[#F6F6F5] flex justify-center rounded-lg mb-[30px]  mt-[30px] ml-[30px] mr-[30px]">
          <span className="cursor-default">
            Para acceder a este formulario primero debe completar el formulario
            de{' '}
            {!prestamosData && (
              <Link className="text-indigo-700 underline" to="/prestamos">
                Prestamos
              </Link>
            )}
          </span>
        </div>
      ) : (
        <>
          {
            // valoresCAC.length !== 0 && valoresLTV.length !== 0 &&  valoresLTVCAC.length !== 0 &&
            <div>
              <div className="border-b-2 mb-8 pb-1">
                <h4 className="cursor-default">Cashflow Indirecto</h4>
                <span className="cursor-default">Estados Financieros</span>
              </div>
              <div className="container-countries">
                <FormContainer className="cont-countries">
                  <ContainerScrollable
                    contenido={
                      <TableCashflowIndirecto
                        resultadoNeto={myResult[0]}
                        variacion={[
                          100, 340, 444, 230, 140, 30, 499, 670, 190, 300,
                        ]}
                        amortizaciones={amortizaciones || []}
                        interesesPagados={intereses || []}
                        inversiones={inversiones || []}
                        financiacion={financiacion || []}
                        showAlertSuces={(boolean) =>
                          setShowSuccessAlert(boolean)
                        }
                        showAlertError={(boolean) => setShowErrorAlert(boolean)}
                      />
                    }
                  />
                </FormContainer>
              </div>
            </div>
          }
        </>
      )}
    </>
  );
}

export default CashflowIndirecto;
