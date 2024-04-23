import { useParams } from 'react-router-dom';
import { ActionLink } from 'components/shared';
import React, { useEffect, useState } from 'react';
import { activateAccount } from 'services/Requests';
import { Spinner } from 'components/ui';
import * as Yup from 'yup';
import checkImg from '../../../assets/image/check.png';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
});

function ActivatedAccountForm(props) {
  const {
    disableSubmit = false,
    className,
    signInUrl = '/iniciar-sesion',
  } = props;

  const [emailSent, setEmailSent] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const { token } = useParams();
  useEffect(() => {
    if (token) {
      activateAccount(token).then((resp) => {
        if (resp.success) {
          setIsActivated(true);
        }
      });
    }
  }, [token]);
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className={className}>
      {isActivated ? (
        <div className="mb-6">
          <>
            <img
              src={checkImg}
              className="mb-[13px] ml-[auto] mr-[auto]"
              alt="done"
            />
            <p className="text-[#292929] text-[16px] text-center font-normal">
              Cuenta activada con exito. Ya puedes{' '}
              <ActionLink to={signInUrl}> Iniciar sesión</ActionLink>
            </p>
          </>
        </div>
      ) : (
        <div className="mb-6">
          <>
            <Spinner className="mr-[auto] ml-[auto] mb-[20px]" size="40px" />
            <p className="text-[#292929] text-[16px] text-center font-normal">
              Activando cuenta ...
            </p>
          </>
        </div>
      )}
    </div>
  );
}

export default ActivatedAccountForm;
