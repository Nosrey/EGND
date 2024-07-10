import appConfig from 'configs/app.config';
import { getUser } from 'services/Requests';
import { REDIRECT_URL_KEY } from 'constants/app.constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  apiSignOut,
  apiSignUp,
  signIn as apiSignIn,
} from 'services/AuthService';
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice';
import { initialState, setUser } from 'store/auth/userSlice';
import useQuery from './useQuery';

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useSelector((state) => state.auth.session);

  const signIn = async (values) => {
    try {
      const resp = await apiSignIn(values);
      if (resp.success) {
        console.log('logeado');
        const { response } = resp;
        const { id, token, mail } = response;
        localStorage.setItem('userId', id);
        dispatch(onSignInSuccess(token));

        let currencyInfo;
        try {
          const userData = await getUser(id);
          currencyInfo = userData?.businessInfo[0]?.currency;
          if (currencyInfo) {
            console.log('cargo moneda', currencyInfo);
          } else {
            console.log('no cargo moneda');
          }
        } catch (error) {
          console.error(error);
        }

        dispatch(
          setUser({
            id,
            avatar: '',
            userName: 'Anonymous',
            authority: ['USER'],
            email: mail,
            currency: currencyInfo,
          }),
        );

        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl || appConfig.authenticatedEntryPath);
        return {
          status: 'success',
          message: '',
          error: false,
        };
      }
      return {
        status: 'success',
        message: resp.response,
        error: true,
      };
    } catch (errors) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const signUp = async (values) => {
    try {
      const resp = await apiSignUp(values);
      if (resp.data) {
        const { token } = resp.data;
        dispatch(onSignInSuccess(token));
        if (resp.data.user) {
          dispatch(
            setUser({
              avatar: '',
              userName: 'Anonymous',
              authority: ['USER'],
              email: '',
            }),
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        localStorage.clear();
        navigate(redirectUrl || appConfig.authenticatedEntryPath);
        return {
          status: 'success',
          message: '',
        };
      }
    } catch (errors) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    navigate(appConfig.unAuthenticatedEntryPath);
    localStorage.removeItem('userId');
  };

  const signOut = async () => {
    await apiSignOut();
    handleSignOut();
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signUp,
    signOut,
  };
}

export default useAuth;
