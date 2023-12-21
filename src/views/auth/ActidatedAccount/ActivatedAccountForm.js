import React, { useState } from 'react';
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui';
import { ActionLink } from 'components/shared';
import { apiForgotPassword } from 'services/AuthService';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import {AiOutlineCheckCircle} from "react-icons/ai";
import { Field, Form, Formik } from 'formik';
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

  return (
    <div className={className}>
      <div className="mb-6">
      
          <>
            <img  src={checkImg} className='mb-[13px] ml-[auto] mr-[auto]' alt="done"/>
            <p className="text-[#292929] text-[16px] text-center font-normal">
           Cuenta activada con exito. Ya puedes  <ActionLink to={signInUrl}> Iniciar sesión</ActionLink>
          
            </p>
          </>
        
      </div>
    </div>
  );
}

export default ActivatedAccountForm;
