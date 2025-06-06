/* eslint-disable no-lonely-if */
import ContainerScrollable from 'components/shared/ContainerScrollable';
import MySpinner from 'components/shared/loaders/MySpinner';
import { Alert, FormContainer, Tabs } from 'components/ui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from 'services/Requests';
import TableGastosPorCC from './TableCapexP';

function CapexP() {
  const [cargaSocial, setCargaSocial] = useState(0);
  const [bienes, setBienes] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const currentState = useSelector((state) => state.auth.user);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        if (data.capexPData[0] && data.capexPData[0].length !== 0) {
          const newData = [...data.capexPData[0].capexP];
          newData.map((n) => {});

          setBienes(data.capexPData[0].capexP);
        } else if (data.capexQData[0] && data.capexQData[0].length !== 0) {
          setBienes(data.capexQData[0].capexQ);
        }
        setShowLoader(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {showSuccessAlert && (
        <Alert className="mb-4" type="success" showIcon>
          Los datos se guardaron satisfactoriamente.
        </Alert>
      )}
      {showErrorAlert && (
        <Alert className="mb-4" type="danger" showIcon>
          {errorMessage}
        </Alert>
      )}

      {showLoader ? (
        <MySpinner />
      ) : (
        <>
          <div className="border-b-2 mb-8 pb-1">
            <h4 className="cursor-default">
              Estimación de costo de Inversiones
            </h4>
            <span className="cursor-default">Inversiones</span>
          </div>

          <div className="border-solid border-2 border-#e5e7eb rounded-lg relative">
            <div className="border-b-2 px-4 py-1">
              <h6 className="cursor-default">Precio de bienes</h6>
            </div>
            {bienes.length !== 0 ? (
              <Tabs>
                {bienes && (
                  <div className="container-countries">
                    <FormContainer className="cont-countries">
                      <ContainerScrollable
                        contenido={
                          <TableGastosPorCC
                            data={bienes}
                            showAlertSuces={(boolean) =>
                              setShowSuccessAlert(boolean)
                            }
                            showAlertError={(boolean) =>
                              setShowErrorAlert(boolean)
                            }
                            errorMessage={(error) => setErrorMessage(error)}
                            cargaSocial={cargaSocial}
                          />
                        }
                      />
                    </FormContainer>
                  </div>
                )}
              </Tabs>
            ) : (
              <div className="py-[25px] bg-[#F6F6F5] flex justify-center rounded-lg mb-[30px]  mt-[30px] ml-[30px] mr-[30px]">
                <span className="cursor-default">
                  Para acceder a este formulario primero debe completar el
                  formulario de{' '}
                  <Link
                    className="text-indigo-700 underline"
                    to="/volumen-inversion"
                  >
                    Volumen de Inversiones
                  </Link>{' '}
                  .
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CapexP;
