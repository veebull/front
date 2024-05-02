import { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // TODO: проверить по id, зареган ли пользователь
    setIsLoggedIn(false);
  }, []);

  // TODO: защита роутов от случайных пользователей и несанкционированного доступа через браузер
  return (
    <Routes>
      <Route path="game" element={<div>index</div>} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp onContinue={() => setIsLoggedIn(true)} />} />
      <Route index element={<Navigate to={isLoggedIn ? '/sign-in' : '/sign-up'} />} />
    </Routes>
  );
}

export default App;
