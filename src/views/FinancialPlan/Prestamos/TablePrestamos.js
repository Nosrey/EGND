/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import {
  Button,
  FormContainer,
  FormItem,
  Input,
  Select,
  Tooltip,
} from 'components/ui';
import { anosPrestamos, mesesPrestamos } from 'constants/forms.constants';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deletePrestamo } from 'services/Requests';
import { addPrestamos } from 'store/tableBalancePrestamos/tableBalancePrestamosSlice';
import {
  calcCapInt,
  calcInteresMensual,
  calcInteresTotal,
  calcPagoMensual,
  calcTasaMensual,
} from 'utils/calcs';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import { v4 as uuid } from 'uuid';

function TablePrestamos(props) {
  const dispatch = useDispatch();
  const [showRemoveProd, setShowRemoveProd] = useState(false);
  const [seeButtons, setSeeButtons] = useState(false);
  const currency = useSelector((state) => state.auth.user.currency);

  useEffect(() => {
    if (props.data.length) {
      dispatch(addPrestamos(props.data));
    }
  }, [props.data]);

  const hableChangePrestamo = (cta, e, type = 'month') => {
    let bien;
    if (cta._id) {
      bien = props.data.findIndex((bien) => bien._id === cta._id);
    } else {
      bien = props.data.findIndex((bien) => bien.id === cta.id);
    }

    let copyBien = JSON.parse(JSON.stringify(props.data));

    if (type === 'month') {
      copyBien[bien].mesInicio = e.value;
    }

    if (type === 'year') {
      copyBien[bien].yearInicio = e.value;
    }

    props.setPrestamos([...copyBien]);
  };

  const handleChangeInputs = (cta, e, campo) => {
    let valorNuevo =
      (campo === 'plazo' || campo === 'monto') && e.target.value[0] === '0'
        ? e.target.value.slice(1)
        : e.target.value;

    let bien;

    if (cta._id) {
      bien = props.data.findIndex((bien) => bien._id === cta._id);
    } else {
      bien = props.data.findIndex((bien) => bien.id === cta.id);
    }

    const copyBien = JSON.parse(JSON.stringify(props.data));
    copyBien[bien][campo] = valorNuevo;

    copyBien[bien][campo] = valorNuevo;

    props.setPrestamos([...copyBien]);
  };

  useEffect(() => {
    viewButtons();
  }, [props.data]);

  const calcCapitalMensual = (monto, tasaAnual, plazo) =>
    calcPagoMensual(monto, tasaAnual, plazo) -
      calcInteresMensual(monto, tasaAnual, plazo) || 0;

  const viewButtons = () => {
    let view = false;

    if (props.data.length === 1) {
      if (
        props.data[0].titulo !== '' &&
        Number(props.data[0].monto) >= 0 &&
        Number(props.data[0].plazo) >= 0 &&
        Number(props.data[0].tasaAnual) >= 0 &&
        props.data[0].mesInicio !== '' &&
        props.data[0].yearInicio !== ''
      )
        view = true;
    }

    if (props.data.length > 1) {
      props.data.forEach((d) => {
        if (
          d.titulo !== '' &&
          Number(d.monto) >= 0 &&
          Number(d.plazo) >= 0 &&
          Number(d.tasaAnual) >= 0 &&
          d.mesInicio !== '' &&
          d.yearInicio !== ''
        ) {
          view = true;
        } else {
          view = false;
        }
      });
    }

    setSeeButtons(view);
  };

  const removePrestamo = (cta) => {
    if (cta._id) {
      props.setPrestamos(props.data.filter((item) => cta._id !== item._id));
      deletePrestamo(cta._id).then((resp) => {
        viewButtons();
      });
    } else {
      props.setPrestamos(props.data.filter((item) => cta.id !== item.id));
    }

    if (props.data.length === 1) {
      props.setPrestamos([
        {
          idUser: localStorage.getItem('userId'),
          id: uuid(),
          titulo: '',
          monto: 0,
          plazo: 0,
          tasaAnual: 0,
          mesInicio: '',
          yearInicio: '',
        },
      ]);
    }

    viewButtons();
  };

  useEffect(() => {
    viewButtons();
  }, []);

  return (
    <>
      {props.data && (
        <div>
          <FormContainer>
            <section className="contenedor">
              {props.data.map((cta, index) => (
                <div className="flex  gap-x-3 ">
                  <div className="flex flex-col ">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p> Título</p>
                      </div>
                    )}

                    <FormItem
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[300px]'
                          : 'mt-[20px] w-[300px]'
                      }`}
                    >
                      <Input
                        placeholder="Ingrese un título"
                        name="titulo"
                        type="text"
                        value={cta.titulo}
                        onChange={(e) => handleChangeInputs(cta, e, 'titulo')}
                      />
                    </FormItem>
                  </div>

                  <div className="flex flex-col ">
                    {index === 0 && (
                      <div className="titleRow min-w-[22px]">
                        <p> Monto</p>
                      </div>
                    )}

                    <FormItem
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[180px]'
                          : 'mt-[20px] w-[180px]'
                      }`}
                    >
                      <Input
                        name="monto"
                        type="number"
                        prefix={currency}
                        value={cta.monto}
                        onChange={(e) => handleChangeInputs(cta, e, 'monto')}
                      />
                    </FormItem>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p>Plazo</p>
                      </div>
                    )}

                    <FormItem
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[100px]'
                          : 'mt-[20px] w-[100px]'
                      }`}
                    >
                      <Input
                        name="plazo"
                        type="number"
                        value={cta.plazo}
                        onChange={(e) => handleChangeInputs(cta, e, 'plazo')}
                      />
                    </FormItem>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p>Tasa Anual</p>
                      </div>
                    )}

                    <FormItem
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[100px]'
                          : 'mt-[20px] w-[100px]'
                      }`}
                    >
                      <Input
                        name="tasaAnual"
                        type="number"
                        suffix="%"
                        value={cta.tasaAnual}
                        onChange={(e) =>
                          handleChangeInputs(cta, e, 'tasaAnual')
                        }
                      />
                    </FormItem>
                  </div>
                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p>Mes inicio</p>
                      </div>
                    )}

                    <div className="inline-block flex items-center gap-4">
                      {showRemoveProd && (
                        <Button
                          shape="circle"
                          size="sm"
                          variant="twoTone"
                          color="red-600"
                          className="mb-0"
                          icon={<MdDelete />}
                          onClick={() => removePrestamo(cta)}
                        />
                      )}
                      <FormItem
                        className={`${
                          index === 0
                            ? 'mt-[40px] w-[200px] '
                            : 'mt-[20px] w-[200px]'
                        }`}
                      >
                        <Select
                          name="prestamo"
                          placeholder="Seleccione un mes"
                          options={mesesPrestamos}
                          value={mesesPrestamos.filter(
                            (option) => option.value === cta.mesInicio,
                          )}
                          onChange={(e) => hableChangePrestamo(cta, e, 'month')}
                        />
                      </FormItem>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p>Año inicio</p>
                      </div>
                    )}

                    <div className="inline-block flex items-center gap-4">
                      <FormItem
                        className={`${
                          index === 0
                            ? 'mt-[40px] w-[120px] '
                            : 'mt-[20px] w-[120px]'
                        }`}
                      >
                        <Select
                          name="prestamo"
                          placeholder="Seleccione un ano"
                          options={anosPrestamos}
                          value={anosPrestamos.filter(
                            (option) => option.value === cta.yearInicio,
                          )}
                          onChange={(e) => hableChangePrestamo(cta, e, 'year')}
                        />
                      </FormItem>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p>Tasa Mensual</p>
                      </div>
                    )}

                    <FormItem
                      disabled
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[100px]'
                          : 'mt-[20px] w-[100px]'
                      }`}
                    >
                      <Input
                        name="unidad"
                        suffix="%"
                        disabled
                        value={formatNumberPrestamos(
                          calcTasaMensual(cta.tasaAnual),
                        )}
                      />
                    </FormItem>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p>Pago Mensual</p>
                      </div>
                    )}

                    <FormItem
                      disabled
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[100px]'
                          : 'mt-[20px] w-[100px]'
                      }`}
                    >
                      <Tooltip
                        placement="top-end"
                        title={
                          currency +
                          formatNumberPrestamos(
                            calcPagoMensual(
                              cta.monto,
                              cta.tasaAnual,
                              cta.plazo,
                            ),
                          )
                        }
                      >
                        <Input
                          name="unidad"
                          disabled
                          prefix={currency}
                          value={formatNumberPrestamos(
                            calcPagoMensual(
                              cta.monto,
                              cta.tasaAnual,
                              cta.plazo,
                            ),
                          )}
                        />
                      </Tooltip>
                    </FormItem>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px] text-center leading-3">
                        <p>Capital Mensual</p>
                      </div>
                    )}

                    <FormItem
                      disabled
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[100px]'
                          : 'mt-[20px] w-[100px]'
                      }`}
                    >
                      <Tooltip
                        placement="top-end"
                        title={
                          currency +
                          formatNumberPrestamos(
                            calcCapitalMensual(
                              cta.monto,
                              cta.tasaAnual,
                              cta.plazo,
                            ),
                          )
                        }
                      >
                        <Input
                          name="unidad"
                          disabled
                          prefix={currency}
                          value={formatNumberPrestamos(
                            calcCapitalMensual(
                              cta.monto,
                              cta.tasaAnual,
                              cta.plazo,
                            ),
                          )}
                        />
                      </Tooltip>
                    </FormItem>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px] text-center leading-3">
                        <p>Interés Mensual</p>
                      </div>
                    )}

                    <FormItem
                      disabled
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[100px]'
                          : 'mt-[20px] w-[100px]'
                      }`}
                    >
                      <Tooltip
                        placement="top-end"
                        title={
                          currency +
                          formatNumberPrestamos(
                            calcInteresMensual(
                              cta.monto,
                              cta.tasaAnual,
                              cta.plazo,
                            ),
                          )
                        }
                      >
                        <Input
                          name="unidad"
                          disabled
                          prefix={currency}
                          value={formatNumberPrestamos(
                            calcInteresMensual(
                              cta.monto,
                              cta.tasaAnual,
                              cta.plazo,
                            ),
                          ).toLocaleString('es-ES')}
                        />
                      </Tooltip>
                    </FormItem>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p>Interés Total</p>
                      </div>
                    )}

                    <FormItem
                      disabled
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[100px]'
                          : 'mt-[20px] w-[100px]'
                      }`}
                    >
                      <Tooltip
                        placement="top-end"
                        title={
                          currency +
                          formatNumberPrestamos(
                            calcInteresTotal(
                              cta.monto,
                              cta.tasaAnual,
                              cta.plazo,
                            ),
                          )
                        }
                      >
                        <Input
                          name="unidad"
                          disabled
                          prefix={currency}
                          value={formatNumberPrestamos(
                            calcInteresTotal(
                              cta.monto,
                              cta.tasaAnual,
                              cta.plazo,
                            ),
                          )}
                        />
                      </Tooltip>
                    </FormItem>
                  </div>

                  <div className="flex flex-col">
                    {index === 0 && (
                      <div className="titleRow min-w-[62px]">
                        <p>Cap + Interes</p>
                      </div>
                    )}

                    <FormItem
                      disabled
                      className={`${
                        index === 0
                          ? 'mt-[40px] w-[100px]'
                          : 'mt-[20px] w-[100px]'
                      }`}
                    >
                      <Tooltip
                        placement="top-end"
                        title={
                          currency +
                          formatNumberPrestamos(
                            calcCapInt(cta.monto, cta.tasaAnual, cta.plazo),
                          )
                        }
                      >
                        <Input
                          name="unidad"
                          disabled
                          prefix={currency}
                          value={formatNumberPrestamos(
                            calcCapInt(cta.monto, cta.tasaAnual, cta.plazo),
                          )}
                        />
                      </Tooltip>
                    </FormItem>
                  </div>
                </div>
              ))}
            </section>
            {seeButtons && (
              <div className="flex justify-between gap-x-2 w-[300px]">
                {props.data ? (
                  <Button
                    style={{
                      width: '47%',
                    }}
                    className=" flex justify-center items-center"
                    // variant="solid"
                    variant="twoTone"
                    // color="blue-600"
                    color="red-600"
                    onClick={() => {
                      setShowRemoveProd(!showRemoveProd);
                    }}
                  >
                    {showRemoveProd === true ? 'Anular' : 'Eliminar item'}
                  </Button>
                ) : (
                  <div
                    style={{
                      width: '47%',
                    }}
                    className=" flex justify-center items-center"
                  />
                )}

                <Button
                  style={{
                    width: '47%',
                  }}
                  className=" flex justify-center items-center"
                  // variant="solid"
                  variant="twoTone"
                  type="button"
                  onClick={() => {
                    props.addPrestamo({
                      idUser: localStorage.getItem('userId'),
                      titulo: '',
                      id: uuid(),
                      monto: 0,
                      plazo: 0,
                      tasaAnual: 0,
                      mesInicio: '',
                    });
                  }}
                >
                  Agregar item
                </Button>
              </div>
            )}
          </FormContainer>
        </div>
      )}

      <Button
        className="border mt-6b btnSubmitTable mt-[40px]"
        variant="solid"
        type="submit"
        disabled={seeButtons === false}
        onClick={props.submit}
      >
        Guardar
      </Button>
    </>
  );
}

export default TablePrestamos;
