import './App.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useTelegram from '~/lib/hooks/useTelegram';
import Loader from '../Loader/Loader';
import { getUserData, updateUser } from '~/lib/botApi';
import { useAtom } from 'jotai';
import { userAtom } from '~/lib/atoms/userAtom';
import LoadingPage from '../LoadingPage/LoadingPage';

const SignUp = lazy(() => import('../SignUp/SignUp'));
const Game = lazy(() => import('../Game/Game'));


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [referalLink, setReferalLink] = useState<string | null>(null);
  const [user, setUser] = useAtom(userAtom);
  const { tg, startParam, initData } = useTelegram();


  // for available in localhost only
  useEffect(()=>{
    console.log(window.location)
      if (process.env.NODE_ENV !== 'production') {
        const data = {
          user: {
            dataGame: {
              name: "localhost"
            }
          }
        }
        setIsLoggedIn(Boolean(data?.user?.dataGame?.name));
        // setUser({ ...data.user }); // 🔴 not working cause server connect
    }
  },[])

  useEffect(() => {
    tg.ready();
    if (initData) {
      getUserData(initData).then((data) => {
        setIsLoggedIn(Boolean(data?.user?.dataGame?.name));
        setUser({ ...data.user });
      });
    }
    setReferalLink(startParam);
  }, [startParam, tg, initData, setUser]);

  useEffect(() => {
    const onUnload = setTimeout(() => updateUser(initData, user.dataGame.totalTaps), 500);

    return () => {
      clearTimeout(onUnload);
    };
  }, [initData, user.dataGame.totalTaps]);

  useEffect(() => {
    if (isLoggedIn === null) {
      const alertTimeout: NodeJS.Timeout = setTimeout(
        () => alert('Кажется, произошла ошибка, сообщите пожалуйстам нам. У бота есть ссылка'),
        5000,
      );

      return () => clearTimeout(alertTimeout);
    }
  }, [isLoggedIn]);

  // TODO: защита роутов от случайных пользователей и несанкционированного доступа через браузер
  return (
    <Suspense fallback={<LoadingPage /> || 'Загружаю...'}>
      {isLoggedIn !== null ? (
        <Routes>
          <Route path="game/*" element={<Game />} />
          <Route
            path="sign-up"
            element={<SignUp onContinue={(val = null) => setIsLoggedIn(val)} refLink={referalLink} />}
          />
          <Route path="*" element={<Navigate to={isLoggedIn ? './game' : './sign-up'} />} />
        </Routes>
      ) : (
        <Loader height="100vh" />
      )}
    </Suspense>
  );
}
