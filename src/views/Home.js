import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'services/Requests';
import { setUser } from 'store/auth/userSlice';

function Home() {
  const [currencyInfo, setCurrencyInfo] = useState();
  const [logoClientInfo, setlogoClientInfo] = useState();

  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.auth.user);

  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        setCurrencyInfo(data?.businessInfo[0]?.currency);
        setlogoClientInfo(data?.imagePath); // logo cliente
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (logoClientInfo) {
      const newState = {
        ...currentState,
        logo: logoClientInfo,
      };
      dispatch(setUser(newState));
    }
  }, [logoClientInfo]);

  return <div>Home</div>;
}

export default Home;
