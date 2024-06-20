/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */

import ContainerScrollable from 'components/shared/ContainerScrollable';
import MySpinner from 'components/shared/loaders/MySpinner';
import { Alert, FormContainer } from 'components/ui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'services/Requests';
import TableWorkingCapital from './TableWorkingCapital';
// import CashflowIndirecto from '../CashflowIndirecto/CashflowIndirecto';

function WorkingCapital({
  setVariacionExterior
}) {
  const [showLoader, setShowLoader] = useState(false);
  const currentState = useSelector((state) => state.auth.user);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        setShowLoader(false);
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
        {/* <CashflowIndirecto /> */}
      </div>
      {showLoader ? (
        <MySpinner />
      ) : (
        <>
          <div>
            <div className="border-b-2 mb-8 pb-1">
              <h4 className="cursor-default">Working Capital</h4>
              <span className="cursor-default">Estados Financieros</span>
            </div>
            <div className="container-countries">
              <FormContainer className="cont-countries">
                <ContainerScrollable
                  contenido={
                    <TableWorkingCapital
                      setVariacionExterior={setVariacionExterior}
                      creditosVentas={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
                      bienesDeCambio={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
                      deudasComerciales={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
                      showAlertSuces={(boolean) => setShowSuccessAlert(boolean)}
                      showAlertError={(boolean) => setShowErrorAlert(boolean)}
                    />
                  }
                />
              </FormContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default WorkingCapital;
