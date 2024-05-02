import './SignUp.scss';
import { Avatar, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

interface ISignUp {
  onContinue: () => void;
}

const SignUp = ({ onContinue }: ISignUp) => {
  const [name, setName] = useState('Your Name');
  console.log('user name:', name);

  return (
    <main className="sign-up">
      <div className="sign-up__info">
        <Typography variant="h3">Привет! Ты у нас впервые!</Typography>
        <div className="sign-up__avatar-container">
          <Typography variant="h5">Твой аватар</Typography>
          <Avatar alt="Your avatar">
            {/* TODO заменить на аватарку с телеги, прикрутить input для замены */}
            <PersonIcon />
          </Avatar>
        </div>
        <TextField label="Ваш никнейм" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <Link to="/sign-in">
        <Button variant="contained" size="large" fullWidth onClick={onContinue}>
          Присоединиться
        </Button>
      </Link>
    </main>
  );
};

export default SignUp;
