import './Home.scss';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { userAtom } from '~/lib/userAtom';

const Home = () => {
  const [user, setUser] = useAtom(userAtom);
  const [taps, setTaps] = useState(user.totalTaps);

  const handleTap = () => {
    setTaps((prev) => prev + 1);
    setUser((prev) => ({
      ...prev,
      totalTaps: prev.totalTaps + 1,
      totalTON: Number((prev.totalTON + 1 * 0.001).toFixed(3)),
    }));
  };

  return (
    <div className="home" onClick={handleTap}>
      <Typography variant="h6" className="home__counter">
        Taps: {taps}
      </Typography>
      <div className="home__img-container">
        <div className="home__img" />
      </div>
    </div>
  );
};

export default Home;
