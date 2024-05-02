import './Game.scss';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';

export default function Game() {
  const [tab, setTab] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`./${tab}`);
  }, [navigate, tab]);
  return (
    <div className="game">
      <ToggleButtonGroup color="secondary" value={tab} onChange={(_, value) => setTab(value)} fullWidth exclusive>
        <ToggleButton value={'achievements'}>Достижения</ToggleButton>
        <ToggleButton value={'tasks'}>Задачи</ToggleButton>
      </ToggleButtonGroup>
      <main>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="invites" element={<div>Приглашения</div>} />
          <Route path="achievements" element={<div>Достижения</div>} />
          <Route path="tasks" element={<div>Задания</div>} />
          <Route index element={<Navigate to={'./home'} />} />
        </Routes>
      </main>
      <ToggleButtonGroup color="secondary" value={tab} onChange={(_, value) => setTab(value)} fullWidth exclusive>
        <ToggleButton value={'home'}>Home</ToggleButton>
        <ToggleButton value={'invites'}>Invites</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
