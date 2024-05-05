import './App.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useTelegram from '~/lib/hooks/useTelegram';
import Loader from '../Loader/Loader';

const SignUp = lazy(() => import('../SignUp/SignUp'));
const LoadingPage = lazy(() => import('../LoadingPage/LoadingPage'));
const Game = lazy(() => import('../Game/Game'));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [referalLink, setReferalLink] = useState<string | null>(null);
  const { tg, startParam } = useTelegram();

  useEffect(() => {
    tg.ready();
    // TODO: проверить по id, зареган ли пользователь
    // setTimeout(() => setIsLoggedIn(false), 2000);
    setIsLoggedIn(false);
    setReferalLink(startParam);
  }, [startParam, tg]);

  // TODO: защита роутов от случайных пользователей и несанкционированного доступа через браузер
  return (
    <Suspense fallback={<LoadingPage />}>
      {isLoggedIn !== null ? (
        <Routes>
          <Route path="game/*" element={<Game />} />
          <Route path="sign-up" element={<SignUp onContinue={() => setIsLoggedIn(true)} refLink={referalLink} />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? './game' : './sign-up'} />} />
        </Routes>
      ) : (
        <Loader height="100vh" />
      )}
    </Suspense>
  );
}
