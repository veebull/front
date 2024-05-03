import './Game.scss';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import GameHeader from '../GameHeader/GameHeader';
import Invites from '../Invites/Invites';

export default function Game() {
  const [tab, setTab] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    if (tab) {
      navigate(`./${tab}`);
    }
  }, [navigate, tab]);

  return (
    <div className="game">
      <p>{window.location.href}</p>
      <GameHeader headerClass="game__header" colorClass="game__color" />
      <ToggleButtonGroup
        className="game__btn-background"
        color="secondary"
        value={tab}
        onChange={(_, value) => setTab(value)}
        fullWidth
        exclusive
      >
        <ToggleButton value={'achievements'} className="game__color">
          Достижения
        </ToggleButton>
        <ToggleButton value={'tasks'} className="game__color">
          Задачи
        </ToggleButton>
      </ToggleButtonGroup>
      <main>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="invites" element={<Invites />} />
          <Route path="achievements" element={<div>Достижения</div>} />
          <Route path="tasks" element={<div>Задания</div>} />
          <Route index element={<Navigate to={'home'} />} />
        </Routes>
      </main>
      <ToggleButtonGroup
        className="game__btn-background"
        color="secondary"
        value={tab}
        onChange={(_, value) => setTab(value)}
        fullWidth
        exclusive
      >
        <ToggleButton value={'home'} className="game__color">
          Home
        </ToggleButton>
        <ToggleButton value={'invites'} className="game__color">
          Invites
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
