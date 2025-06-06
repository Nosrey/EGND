/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FormContainer, FormItem, Input, Tooltip } from 'components/ui';
import { useState } from 'react';
import { formatNumberPrestamos } from 'utils/formatTotalsValues';
import { useSelector } from 'react-redux';

function TableCac(props) {
  const [cac, setCac] = useState(props.cac);
  const [ltv, setLtv] = useState(props.ltv);
  const [ltvCac, setLtvCac] = useState(props.ltvcac);
  const currency = useSelector((state) => state.auth.user.currency);

  return (
    <>
      {cac && ltv && ltvCac && (
        <FormContainer>
          <section className="contenedor pl-[25px] pr-[35px]">
            <div className="flex  gap-x-3 gap-y-3  mb-6 ">
              <FormItem className=" mb-1 w-[210px] mt-[49px]">
                <Input
                  disabled
                  type="text"
                  className="capitalize"
                  value="CAC"
                />
              </FormItem>

              {cac.map((año, indexYear) => (
                <div className="flex flex-col" key={indexYear}>
                  <div className="titleRow w-[90px]">
                    <p className="cursor-default"> Año {indexYear + 1}</p>
                  </div>
                  <FormItem className="mb-0">
                    <Tooltip
                      placement="top-end"
                      title={`${currency || '$'}${formatNumberPrestamos(año)}`}
                    >
                      <Input
                        className="w-[90px]"
                        type="text"
                        prefix={currency || '$'}
                        value={formatNumberPrestamos(año)}
                        name="year"
                        disabled
                      />
                    </Tooltip>

                  </FormItem>
                </div>
              ))}
            </div>

            <div className="flex  gap-x-3 gap-y-3  mb-6 ">
              <FormItem className=" mb-1 w-[210px]">
                <Input
                  disabled
                  type="text"
                  className="capitalize"
                  value="LTV"
                />
              </FormItem>
              {ltv.map((año, indexYear) => (
                <div className="flex flex-col" key={indexYear}>
                  <FormItem className="mb-0">
                    <Tooltip
                      placement="top-end"
                      title={`${currency || '$'}${formatNumberPrestamos(año)}`}
                    >
                      <Input
                        className="w-[90px]"
                        type="text"
                        prefix={currency || '$'}
                        value={formatNumberPrestamos(año)}
                        name="year"
                        disabled
                      />
                    </Tooltip>

                  </FormItem>
                </div>
              ))}
            </div>

            <div className="flex  gap-x-3 gap-y-3  mb-6 ">
              <FormItem className=" mb-1 w-[210px]">
                <Input
                  disabled
                  type="text"
                  className="capitalize"
                  value="LTV / CAC"
                />
              </FormItem>
              {ltvCac.map((año, indexYear) => (
                <div className="flex flex-col" key={indexYear}>
                  <FormItem className="mb-0">
                    <Tooltip
                      placement="top-end"
                      title={`${currency || '$'}${formatNumberPrestamos(año)}`}
                    >
                      <Input
                        className="w-[90px]"
                        type="text"
                        prefix={currency || '$'}
                        value={formatNumberPrestamos(año)}
                        name="year"
                        disabled
                      />
                    </Tooltip>

                  </FormItem>
                </div>
              ))}
            </div>
          </section>
        </FormContainer>
      )}
    </>
  );
}

export default TableCac;
