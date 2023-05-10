import ContainerScrollable from 'components/shared/ContainerScrollable';
import { Alert, FormContainer, Tabs } from 'components/ui';
import { AÑOS } from 'constants/forms.constants';
import { puestos } from 'constants/puestos.constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createPuestosq, getUser } from 'services/Requests';
import TablePuestosQ from './TablePuestosQ';

const { TabNav, TabList } = Tabs;

function PuestosQ() {
  const [info, setInfo] = useState(null);
  const [puestosQ, setPuestosQ] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState('');
  const [infoForm, setInfoForm] = useState();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [country, setCountry] = useState(defaultCountry);
  const currentState = useSelector((state) => state.auth.user);

  useEffect(() => {
    let estructura = {};
    if (info) {
      Object.keys(puestosQ).map((cc, index) => {
        let heads = [];
        for (let i = 0; i < puestos[0][cc].length; i++) {
          let head = {};
          head.id = i;
          head['años'] = [...AÑOS];
          head.name = puestos[0][cc][i];
          head.isNew = false;
          heads.push(head);
          let h = {};
          h.visible = puestosQ[cc];
          h.puestos = [...heads];

          estructura[cc] = { ...h };
        }
      });
      setInfoForm(() => ({ ...estructura }));
    }
  }, [info]);

  const addPuesto = (newPuesto) => {
    const news = infoForm[country].puestos.filter((p) => p.isNew);
    if (news.length < 3) {
      infoForm[country].puestos.push(newPuesto);
      setInfoForm({ ...infoForm });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setErrorMessage('Solo se pueden agregar 3 puestos');
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
    }
  };

  const postPuestoQData = (data) => {
    createPuestosq(data)
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
      })
      .catch((error) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setErrorMessage('No se puedieron guardar los datos.');
        showErrorAlert(true);
        setTimeout(() => {
          showErrorAlert(false);
        }, 5000);
      });
  };

  const handleEditPuesto = (index, value, campo) => {
    index[campo] = value;
    setInfoForm({ ...infoForm });
  };

  const removePuesto = (campo, id, puesto) => {
    const newP = campo.filter((item) => id !== item.id);
    infoForm[puesto].puestos = newP;
    setInfoForm({ ...infoForm });
  };

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        console.log('[DATA]', data);
        if (data?.gastosGeneralData[0].centroDeGastos.length !== 0) {
          setPuestosQ(data?.gastosGeneralData[0].centroDeGastos);
          setInfo(data?.gastosGeneralData[0].centroDeGastos);
        } else {
          setInfo(data?.gastosGeneralData[0].centroDeGastos);
        }

        const def = Object.keys(data?.gastosGeneralData[0].centroDeGastos).find(
          (p) => data?.gastosGeneralData[0].centroDeGastos[p],
        );
        setDefaultCountry(def);
        setCountry(def);
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
      <div className="border-b-2 mb-8 pb-1">
        <h4>Headcount</h4>
        <span>Centro de puestos</span>
      </div>

      <div className="border-solid border-2 border-#e5e7eb rounded-lg relative">
        <div className="border-b-2 px-4 py-1">
          <h6>Puestos (Q)</h6>
        </div>
        {puestosQ.length !== 0 ? (
          <Tabs defaultValue={country}>
            <TabList>
              {puestosQ &&
                Object.keys(puestosQ).map((cc, index) => (
                  <TabNav key={index} value={cc}>
                    <div className="capitalize" onClick={() => setCountry(cc)}>
                      {puestosQ[cc] && cc}
                    </div>
                  </TabNav>
                ))}
            </TabList>
            {infoForm && (
              <div className="container-countries">
                <FormContainer className="cont-countries">
                  <ContainerScrollable
                    contenido={
                      <TablePuestosQ
                        data={infoForm}
                        puestosQ={puestosQ}
                        showAlertSuces={(boolean) =>
                          setShowSuccessAlert(boolean)
                        }
                        postPuestoQData={postPuestoQData}
                        addPuesto={addPuesto}
                        removePuesto={removePuesto}
                        showAlertError={(boolean) => setShowErrorAlert(boolean)}
                        errorMessage={(error) => setErrorMessage(error)}
                        head={country}
                        handleEditPuesto={handleEditPuesto}
                      />
                    }
                  />
                </FormContainer>
              </div>
            )}
          </Tabs>
        ) : (
          <div className="py-[25px] bg-[#F6F6F5] flex justify-center rounded-lg mb-[30px]  mt-[30px] ml-[30px] mr-[30px]">
            <span>
              Para acceder a este formulario primero debe completar el
              formulario de Gastos.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PuestosQ;
