import './App.css';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Loader from '../Loader/Loader';
import Game from '../Game/Game';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  useEffect(() => {
    // TODO: проверить по id, зареган ли пользователь
    setTimeout(() => setIsLoggedIn(false), 2000);
  }, []);

  // TODO: защита роутов от случайных пользователей и несанкционированного доступа через браузер
  return isLoggedIn !== null ? (
    <Routes>
      <Route path="game/*" element={<Game />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp onContinue={() => setIsLoggedIn(true)} />} />
      <Route index element={<Navigate to={isLoggedIn ? '/sign-in' : '/sign-up'} />} />
    </Routes>
  ) : (
    <Loader height="100vh" />
  );
}
