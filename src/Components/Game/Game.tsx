import './Game.scss';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import GameHeader from '../GameHeader/GameHeader';
import Home from '../Home/Home';
import Invites from '../Invites/Invites';
import Achievments from '../Achievments/Achievments';
import Tasks from '../Tasks/Tasks';
import TonConnectWallet from '../TonConnectWallet/TonConnectWallet'
import TonGetCoins from '../TonGetCoins/TonGetCoins'

export default function Game() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('home');

  useEffect(() => {
    const newLocation = tab || 'home';
    setTab(newLocation);
    navigate(`./${newLocation}`);
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
          <div style={{marginRight: "40px"}}>
            <TonConnectWallet/>
            <TonGetCoins/>
          </div>
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
