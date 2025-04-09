/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */

import ContainerScrollable from 'components/shared/ContainerScrollable';
import MySpinner from 'components/shared/loaders/MySpinner';
import { Alert, FormContainer } from 'components/ui';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableBalance from './TableBalance';
import CashflowIndirecto from '../CashflowIndirecto/CashflowIndirecto';
import Prestamos from '../../Prestamos/Prestamos';

function Balance({
  setGraph05Data = () => { },
  setGraph06Data = () => { },
  setGraph07Data = () => { },
}) {
  const [showLoader, setShowLoader] = useState(false);
  const currentState = useSelector((state) => state.auth.user);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const myResult = useSelector((state) => state.cajaYBcoCierre);
  const [creditosVentas, setCreditosVentas] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [costos, setCostos] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

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
        <Prestamos />
        <CashflowIndirecto />
      </div>
      <div />
      {showLoader ? (
        <MySpinner />
      ) : (
        <>
          <div>
            <div>
              <div className="border-b-2 mb-8 pb-1">
                <h4 className="cursor-default">Balance</h4>
                <span className="cursor-default">Estados Financieros</span>
              </div>
              <div className="container-countries">
                <FormContainer className="cont-countries">
                  <ContainerScrollable
                    contenido={
                      <TableBalance
                        cajaYBancos={myResult[0]} // ver
                        creditosFiscales={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0] || []}
                        setGraph05Data={setGraph05Data}
                        setGraph06Data={setGraph06Data}
                        setGraph07Data={setGraph07Data}
                        showAlertSuces={(boolean) =>
                          setShowSuccessAlert(boolean)
                        }
                        showAlertError={(boolean) => setShowErrorAlert(boolean)}
                      />
                      // <TableBalance
                      //   cajaYBancos={myResult[0]} // ver
                      //   creditosFiscales={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0] || []}

                      //   showAlertSuces={(boolean) =>
                      //     setShowSuccessAlert(boolean)
                      //   }
                      //   showAlertError={(boolean) => setShowErrorAlert(boolean)}
                      // />
                    }
                  />
                </FormContainer>
              </div>
            </div>

            {/* <div className="container-countries">
              <FormContainer className="cont-countries">
                <ContainerScrollable
                  contenido={
                    <TableBalance
                      cajaYBancos={myResult[0]}
                      creditosFiscales={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0] || []}
                      setGraph05Data={setGraph05Data}
                      setGraph06Data={setGraph06Data}
                      setGraph07Data={setGraph07Data}
                      showAlertSuces={(boolean) => setShowSuccessAlert(boolean)}
                      showAlertError={(boolean) => setShowErrorAlert(boolean)}
                    />
                  }
                />
              </FormContainer>
            </div> */}

          </div>
        </>
      )}
    </>
  );
}

export default Balance;
