/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, FormContainer, FormItem, Input, Tooltip } from 'components/ui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import {
  createWorkingCapital,
  getWorkingCapitalInfo,
  getUser,
} from 'services/Requests';
import {
  calcAmortizaciones,
  calcFinanciacionDeTerceros,
  calcInteresesPagadosPorAnio,
  calcInversiones,
  multiplicacionPxQCapex,
  calcularCreditosPorVentas,
  calcularBienesDeCambio,
  calcularDeudasFiscales,
  calcularDeudasComerciales,
} from 'utils/calcs';
import MySpinner from 'components/shared/loaders/MySpinner';

function TableWorkingCapital(props) {
  const [showLoader, setShowLoader] = useState(true);
  const [creditosVentas, setCreditosVentas] = useState([]);
  const [bienesDeCambio, setBienesDeCambio] = useState([]);
  const [updateBienesDeCambio, setUpdateBienesDeCambio] = useState(true);
  const [deudasComerciales, setDeudasComerciales] = useState([]);
  const [deudasComerciales2, setDeudasComerciales2] = useState([]);
  const [deudasFiscales2, setDeudasFiscales2] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [posicionAlCierre, setPosicionAlCierre] = useState([]);
  const [variacion, setVariacion] = useState([]);
  const currentState = useSelector((state) => state.auth.user);
  const [timeoutId, setTimeoutId] = useState(null);
  const IIGG = useSelector((state) => state.tableBalanceResult);

  const [cebo, setCebo] = useState(0);

  // ***************** INPUTS ANIO 0 ******************
  const [inputsValues, setinputsValues] = useState({
    creditosVentas: '0',
    bienesDeCambio: '0',
    deudasComerciales: '0',
  });

  const handleChangeInputs = (key, value) => {
    const copy = { ...inputsValues };
    if (value.startsWith('0')) {
      value = value.slice(1);
    }
    copy[key] = value;
    setinputsValues(copy);
  };

  // **********************************************

  const currency = useSelector((state) => state.auth.user.currency);

  function handleBienesDeCambio(value) {
    handleChangeInputs('bienesDeCambio', value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        setUpdateBienesDeCambio(true);
      }, 3000),
    );
  }

  useEffect(() => {
    if (updateBienesDeCambio) {
      getUser(currentState.id)
        .then((data) => {
          calcularBienesDeCambio(
            data,
            setBienesDeCambio,
            inputsValues.bienesDeCambio,
          );
        })

        // dentro de 1 segundo hacer console.log de bienesDeCambio
        .then(() => {
          setTimeout(() => {
            console.log('bienesDeCambio', bienesDeCambio);
          }, 1000);
        })
        .catch((error) => console.error(error));
    }
  }, [updateBienesDeCambio]);

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        calcularCreditosPorVentas(data, creditosVentas, setCreditosVentas);
      })
      .catch((error) => console.error(error));
  }, []);

  // useEffect(() => {
  //   setCreditosVentas(props.creditosVentas);
  //   setBienesDeCambio(props.bienesDeCambio);
  // }, [props]);

  useEffect(() => {
    if (creditosVentas && bienesDeCambio && deudasComerciales) {
      let resultado = [];
      for (let i = 0; i < 11; i++) {
        if (i === 0) {
          resultado.push(
            Number(inputsValues.creditosVentas) +
              Number(inputsValues.bienesDeCambio) -
              Number(inputsValues.deudasComerciales),
          );
        } else {
          resultado.push(
            Number(creditosVentas[i - 1]) +
              Number(bienesDeCambio[i - 1]) -
              Number(deudasComerciales[i - 1]),
          );
        }
      }
      setPosicionAlCierre(resultado);
    }
  }, [creditosVentas, bienesDeCambio, deudasComerciales]);

  useEffect(() => {
    if (inputsValues) {
      const copy = { ...inputsValues };
      const valor =
        parseInt(copy.creditosVentas) +
        parseInt(copy.bienesDeCambio) -
        parseInt(copy.deudasComerciales);

      const copyArray = [...posicionAlCierre];
      copyArray[0] = valor;
      setPosicionAlCierre(copyArray);
    }
  }, [inputsValues]);

  useEffect(() => {
    if (Array.isArray(IIGG)) {
      setTimeout(() => {
        const fetchData = async () => {
          try {
            let IIGGFinal =
              IIGG?.length === 0 ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : IIGG;
            const data = await getUser(currentState.id);
            let dataCopy = JSON.parse(JSON.stringify(data));
            let dataCopy2 = JSON.parse(JSON.stringify(data));
            let ivasDF = await calcularCreditosPorVentas(
              dataCopy,
              null,
              setCebo,
            );
            await calcularBienesDeCambio(data, setCebo, 0);
            let ivasCF = await calcularDeudasComerciales(
              data,
              setDeudasComerciales2,
            );
            await calcularDeudasFiscales(
              ivasDF,
              ivasCF,
              dataCopy2,
              IIGGFinal,
              setDeudasFiscales2,
              setShowLoader,
            );
          } catch (error) {
            console.error('algo fallo: ', error);
          }
        };
        fetchData();
      }, 1500);
    }
  }, [IIGG]);

  useEffect(() => {
    if (deudasFiscales2.length > 0 && deudasComerciales2.length > 0) {
      let resultado = [];
      for (let i = 0; i < 10; i++) {
        resultado[i] = deudasFiscales2[i] + deudasComerciales2[i];
      }
      setDeudasComerciales(resultado);
    }
  }, [deudasFiscales2, deudasComerciales2]);

  useEffect(() => {
    if (!isNaN(posicionAlCierre[0])) {
      let arrayResultado = [];
      for (let i = 1; i < posicionAlCierre.length; i++) {
        let resultado = posicionAlCierre[i] - posicionAlCierre[i - 1];
        arrayResultado.push(resultado);
      }
      if (props?.setVariacionExterior) {
        // invierto los valores para que queden en negativo o positivo
        let arrayInvertido = arrayResultado.map((item) => item * -1);
        props.setVariacionExterior(arrayInvertido);
      }
      setVariacion(arrayResultado);
    }
  }, [posicionAlCierre]);

  const submitInfoForm = () => {
    const value = { ...inputsValues, idUser: localStorage.getItem('userId') };
    createWorkingCapital(value)
      .then((resp) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        props.showAlertSuces(true);
        setTimeout(() => {
          props.showAlertSuces(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        props.showAlertError(true);
        setTimeout(() => {
          props.showAlertError(false);
        }, 5000);
      });
  };

  useEffect(() => {
    getWorkingCapitalInfo(currentState.id)
      .then((data) => {
        if (data.length !== 0) {
          setinputsValues(data[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {showLoader ? (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
          <MySpinner />
        </div>
      ) : (
        <>
          {
            <FormContainer>
              <section className="contenedor pl-[25px] pr-[35px]">
                {/** *********** Créditos por Ventas  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />
                  <FormItem className=" mb-1 w-[240px] mt-[49px]">
                    <Input
                      disabled
                      type="text"
                      className="capitalize"
                      value="Créditos por Ventas"
                    />
                  </FormItem>
                  <div className="flex flex-col">
                    <div className="titleRow w-[130px]">
                      <p className="cursor-default"> Año 0</p>
                    </div>
                    <FormItem className="mb-0">
                      <Input
                        className="w-[130px]"
                        type="text"
                        value={inputsValues.creditosVentas}
                        onChange={(e) =>
                          handleChangeInputs('creditosVentas', e.target.value)
                        }
                        name="initial"
                        prefix="$"
                      />
                    </FormItem>
                  </div>
                  {creditosVentas.map((año, indexYear) => (
                    <div className="flex flex-col" key={indexYear}>
                      <div className="titleRow w-[130px]">
                        <p className="cursor-default"> Año {indexYear + 1}</p>
                      </div>
                      <FormItem className="mb-0">
                        {año.toString().length > 5 ? (
                          <Tooltip
                            placement="top-end"
                            title={currency + formatNumberPrestamos(año)}
                          >
                            <Input
                              className="w-[130px] "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency}
                            />
                          </Tooltip>
                        ) : (
                          <Input
                            className="w-[130px]"
                            type="text"
                            value={formatNumberPrestamos(año)}
                            name="year"
                            prefix={currency}
                            disabled
                          />
                        )}
                      </FormItem>
                    </div>
                  ))}
                </div>
                {/** *********** ****************  ************ */}
                {/** *********** Bienes de Cambio  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />
                  <FormItem className=" mb-1 w-[240px] mt-[0px]">
                    <Input
                      disabled
                      type="text"
                      className="capitalize"
                      value="Bienes de Cambio"
                    />
                  </FormItem>
                  <div className="flex flex-col">
                    <FormItem className="mb-0">
                      <Input
                        className="w-[130px]"
                        type="text"
                        value={inputsValues.bienesDeCambio}
                        onChange={(e) => handleBienesDeCambio(e.target.value)}
                        name="initial"
                        prefix="$"
                      />
                    </FormItem>
                  </div>
                  {bienesDeCambio.map((año, indexYear) => (
                    <div className="flex flex-col" key={indexYear}>
                      <FormItem className="mb-0">
                        {año.toString().length > 5 ? (
                          <Tooltip
                            placement="top-end"
                            title={currency + formatNumberPrestamos(año)}
                          >
                            <Input
                              className="w-[130px] "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency}
                            />
                          </Tooltip>
                        ) : (
                          <Input
                            className="w-[130px]"
                            type="text"
                            value={formatNumberPrestamos(año)}
                            name="year"
                            prefix={currency}
                            disabled
                          />
                        )}
                      </FormItem>
                    </div>
                  ))}
                </div>
                {/** *********** ****************  ************ */}

                {/** *********** Deudas Comerciales  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />
                  <FormItem className=" mb-1 w-[240px] mt-[0px]">
                    <Input
                      disabled
                      type="text"
                      className="capitalize"
                      value="Deudas Comerciales"
                    />
                  </FormItem>
                  <div className="flex flex-col">
                    <FormItem className="mb-0">
                      <Input
                        className="w-[130px]"
                        type="text"
                        value={inputsValues.deudasComerciales}
                        onChange={(e) =>
                          handleChangeInputs(
                            'deudasComerciales',
                            e.target.value,
                          )
                        }
                        name="initial"
                        prefix="$"
                      />
                    </FormItem>
                  </div>
                  {deudasComerciales.map((año, indexYear) => (
                    <div className="flex flex-col" key={indexYear}>
                      <FormItem className="mb-0">
                        {año.toString().length > 5 ? (
                          <Tooltip
                            placement="top-end"
                            title={currency + formatNumberPrestamos(año)}
                          >
                            <Input
                              className="w-[130px] "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency}
                            />
                          </Tooltip>
                        ) : (
                          <Input
                            className="w-[130px]"
                            type="text"
                            value={formatNumberPrestamos(año)}
                            name="year"
                            prefix={currency}
                            disabled
                          />
                        )}
                      </FormItem>
                    </div>
                  ))}
                </div>
                {/** *********** ****************  ************ */}

                {/** *********** Posición al Cierre  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />

                  <FormItem className=" mb-1 w-[240px] ">
                    <Input
                      disabled
                      type="text"
                      className="capitalize font-bold bg-blue-100"
                      value="Posición al Cierre"
                    />
                  </FormItem>
                  {posicionAlCierre.map((año, indexYear) => (
                    <div className="flex flex-col" key={indexYear}>
                      <FormItem className="mb-0">
                        {Math.round(año).toString().length > 5 ? (
                          <Tooltip
                            placement="top-end"
                            title={currency + formatNumberPrestamos(año)}
                          >
                            <Input
                              className="w-[130px] font-bold text-base"
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency}
                            />
                          </Tooltip>
                        ) : (
                          <Input
                            className="w-[130px] font-bold "
                            type="text"
                            value={formatNumberPrestamos(año)}
                            name="year"
                            disabled
                            prefix={currency}
                          />
                        )}
                      </FormItem>
                    </div>
                  ))}
                </div>
                {/** *********** ****************  ************ */}

                {/** *********** Variación WC  ************ */}
                <div className="flex  gap-x-3 gap-y-3  mb-6 ">
                  <div className="iconDesplegable" />
                  <FormItem className=" mb-1 w-[240px] mt-[0px]">
                    <Input
                      disabled
                      type="text"
                      className="capitalize"
                      value="Variación WC"
                    />
                  </FormItem>
                  <div className="flex flex-col">
                    <FormItem className="mb-0">
                      <Input
                        className="w-[130px]"
                        type="text"
                        disabled
                        name="initial"
                      />
                    </FormItem>
                  </div>
                  {variacion.map((año, indexYear) => (
                    <div className="flex flex-col" key={indexYear}>
                      <FormItem className="mb-0">
                        {año.toString().length > 5 ? (
                          <Tooltip
                            placement="top-end"
                            title={currency + formatNumberPrestamos(año)}
                          >
                            <Input
                              className="w-[130px] "
                              type="text"
                              value={formatNumberPrestamos(año)}
                              name="year"
                              disabled
                              prefix={currency}
                            />
                          </Tooltip>
                        ) : (
                          <Input
                            className="w-[130px]"
                            type="text"
                            value={formatNumberPrestamos(año)}
                            name="year"
                            prefix={currency}
                            disabled
                          />
                        )}
                      </FormItem>
                    </div>
                  ))}
                </div>
                {/** *********** ****************  ************ */}
              </section>
            </FormContainer>
          }
          <Button
            className="border mt-6b btnSubmitTable mt-[40px]"
            variant="solid"
            type="submit"
            onClick={submitInfoForm}
          >
            Guardar
          </Button>
        </>
      )}
    </>
  );
}

export default TableWorkingCapital;
