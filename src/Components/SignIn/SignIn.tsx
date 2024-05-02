import './SignIn.scss';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import LinearWithValueLabel from '../LinearWithValueLabel/LinearWithValueLabel';
import { useNavigate } from 'react-router-dom';

// @TODO реальной необходимости пока в этой страничке нет, но придает стиля
const SignIn = () => {
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(0);
  const [secondLoading, setSecondLoading] = useState(0);
  const [thirdLoading, setThirdLoading] = useState(0);

  useEffect(() => {
    if (firstLoading === 100 && secondLoading === 100 && thirdLoading === 100) {
      navigate('/game');
    }
  }, [firstLoading, navigate, secondLoading, thirdLoading]);

  return (
    <main className="sign-in">
      <Typography variant="h3">Почти на месте!</Typography>
      <div>
        <Typography variant="h5">Пилим бобров</Typography>
        <LinearWithValueLabel state={firstLoading} setState={setFirstLoading} />
      </div>
      {firstLoading === 100 ? (
        <div>
          <Typography variant="h5">Учимся плавать</Typography>
          <LinearWithValueLabel state={secondLoading} setState={setSecondLoading} color="secondary" />
        </div>
      ) : null}
      {secondLoading === 100 ? (
        <div>
          <Typography variant="h5">Накрываем на стол</Typography>
          <LinearWithValueLabel state={thirdLoading} setState={setThirdLoading} color="success" />
        </div>
      ) : null}
    </main>
  );
};

export default SignIn;
