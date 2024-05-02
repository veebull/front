import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import LinearProgressWithLabel from '../LinearProgressWithLabel/LinearProgressWithLabel';

interface ILinearProgressWithLabel {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'primary';
}

export default function LinearWithValueLabel({ state, setState, color }: ILinearProgressWithLabel) {
  const [progress, setProgress] = useState(state || 0);

  useEffect(() => {
    // TODO: поправить бы
    const timer = (value: number) =>
      setTimeout(() => {
        if (value < 100) {
          const add = Math.ceil(Math.random() * 10);
          setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + add));
          setState((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + add));
          timer(value + add);
        }
        return;
      }, 100);

    timer(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} color={color || 'primary'} />
    </Box>
  );
}
