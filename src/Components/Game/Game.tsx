import './Game.scss';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LazyExoticComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import GameHeader from '../GameHeader/GameHeader';
import Home from '../Home/Home';
import Invites from '../Invites/Invites';
import Achievments from '../Achievments/Achievments';
import Tasks from '../Tasks/Tasks';

// interface IGame {
//   components: LazyExoticComponent<() => JSX.Element>[];
// }

export default function Game({ components }: IGame) {
  // const [Home, Invites, Achievements, Tasks] = components;
  const navigate = useNavigate();
  const [tab, setTab] = useState('home');

  useEffect(() => {
    if (tab) {
      navigate(`./${tab}`);
    }
  }, [navigate, tab]);

  return (
    <div className="game">
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
          <Route path="achievements" element={<Achievments />} />
          <Route path="tasks" element={<Tasks />} />
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
