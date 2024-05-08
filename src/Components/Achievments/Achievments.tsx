import './Achievments.scss';
import { Button, Typography } from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { achievmentsAtom } from '~/lib/atoms/achievmentsAtom';
import { userAtom } from '~/lib/atoms/userAtom';

const Achievments = () => {
  const [achievs, setAchievs] = useAtom(achievmentsAtom);
  const totalTaps = useAtomValue(userAtom).dataGame.totalTaps;
  const setUser = useSetAtom(userAtom);

  const handleClick = (i: number) => {
    setAchievs((prev) => {
      const newAchievs = [...prev];
      newAchievs[i].isGet = true;
      return newAchievs;
    });

    setUser((prev) => ({
      ...prev,
      dataGame: {
        ...prev.dataGame,
        totalTaps: Number((prev.dataGame.totalTaps + achievs[i].reward * 1000).toFixed(0)),
      },
    }));
  };

  useEffect(() => {
    setAchievs((prev) => {
      const newAchievs = [...prev];
      newAchievs.map((achiev) => {
        if (achiev.completed === false && totalTaps >= achiev.target) {
          achiev.completed = true;
        }
      });
      return newAchievs;
    });
  }, [setAchievs, totalTaps]);

  return (
    <div className="achievs">
      <Typography variant="h5">Ваши задачи</Typography>
      <ul className="achievs__list">
        {achievs.map((achiev, i) =>
          achiev.isGet ? null : (
            <li key={achiev.id} className="achievs__item">
              <achiev.icon />
              <Typography fontSize={14}>{achiev.title}</Typography>
              {/* модификатор временный, пока не определились с игровой валютой */}
              <Typography fontSize={14}>+{achiev.reward * 1000} Tap</Typography>
              <Typography fontSize={14}>
                {totalTaps}/{achiev.target}
              </Typography>
              <Button
                variant={achiev.completed ? 'outlined' : 'contained'}
                onClick={() => handleClick(i)}
                disabled={!achiev.completed}
              >
                get
              </Button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Achievments;
