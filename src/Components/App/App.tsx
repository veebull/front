import './App.css';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Loader from '../Loader/Loader';
import Game from '../Game/Game';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [referalLink, setReferalLink] = useState<string | null>(null);

  useEffect(() => {
    // TODO: проверить по id, зареган ли пользователь
    setTimeout(() => setIsLoggedIn(false), 2000);
    setReferalLink(new URLSearchParams(window.location.search).get('tgWebAppStartParam'));
  }, []);

  // TODO: защита роутов от случайных пользователей и несанкционированного доступа через браузер
  return isLoggedIn !== null ? (
    <>
      <Routes>
        <Route path="game/*" element={<Game />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp onContinue={() => setIsLoggedIn(true)} refLink={referalLink} />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? '/sign-in' : '/sign-up'} />} />
      </Routes>
    </>
  ) : (
    <Loader height="100vh" />
  );
}
