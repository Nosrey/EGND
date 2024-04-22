import { useMedia } from 'utils/hooks/useMedia';
import React, { useEffect } from 'react';
import SignInForm from './SignInForm';

function SignIn() {
  const media = useMedia();
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-1 text-[#292929] text-[25px] text-center font-bold">
          Iniciar sesión
        </h3>
        <p
          className={`text-[#292929] text-[16px] text-center font-normal ${
            media !== 'mobile' ? 'mb-[20px]' : ''
          }`}
        >
          Ingrese sus credenciales para acceder a la plataforma
        </p>
      </div>
      <SignInForm disableSubmit={false} />
    </>
  );
}

export default SignIn;
