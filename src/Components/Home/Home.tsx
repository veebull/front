import './Home.scss';
// import { Typography } from '@mui/material';
// import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { userAtom } from '~/lib/atoms/userAtom';

const Home = () => {
  const setUser = useSetAtom(userAtom);

  const handleTap = () => {
    setUser((prev) => ({
      ...prev,
      dataGame: {
        ...prev.dataGame,
        totalTaps: prev.dataGame.totalTaps + 1,
      },
    }));
  };

  return (
    <div className="home" onClick={handleTap}>
      {/* <Typography variant="h6" className="home__counter">
        Taps: {taps}
      </Typography> */}
      <div className="home__img-container">
        <div className="home__img" />
      </div>
    </div>
  );
};

export default Home;
