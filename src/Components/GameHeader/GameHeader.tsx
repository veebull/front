import { IconButton, Typography } from '@mui/material';
import track from '../../assets/track.mp3';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useEffect, useState } from 'react';
import { userAtom } from '~/lib/atoms/userAtom';
import { useAtomValue } from 'jotai';

interface IGameHeader {
  headerClass?: string;
  colorClass?: string;
}

const GameHeader = ({ headerClass = 'game__header', colorClass = 'game__color' }: IGameHeader) => {
  const [isSound, setIsSound] = useState(false);
  const toggleSound = () => setIsSound(!isSound);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const audio = new Audio(track);

    if (isSound) {
      audio.play();
      audio.loop = true;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0; // Сбросить время воспроизведения
    };
  }, [isSound]);

  return (
    <header className={headerClass}>
      <IconButton onClick={toggleSound} className={colorClass} title="Включить/выключить звук">
        {isSound ? <MusicNoteIcon /> : <MusicOffIcon />}
      </IconButton>
      <div>
        <Typography variant="h6">
          Diamonds: <span>{user?.dataGame?.totalTaps}</span>
        </Typography>
        {/* <Avatar alt="Your avatar" src={avatar} /> */}
      </div>
      <Typography fontSize={'15px'}>{user?.dataGame?.name}</Typography>
    </header>
  );
};

export default GameHeader;
