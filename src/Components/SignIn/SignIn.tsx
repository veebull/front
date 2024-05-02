import { Typography } from '@mui/material';
import LinearProgressWithLabel from '../LinearProgressWithLabel/LinearProgressWithLabel';

const SignIn = () => {
  return (
    <main>
      <Typography variant="h3">Почти на месте!</Typography>
      <section>
        <div>
          <Typography variant="h5">Пилим бобров</Typography>
          <LinearProgressWithLabel value={60} />
        </div>
      </section>
    </main>
  );
};

export default SignIn;
