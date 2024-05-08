import './SignUp.scss';
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from '../../lib/hooks/useTelegram.js';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useSetAtom } from 'jotai';
import { userAtom } from '~/lib/atoms/userAtom.js';
import { createUser } from '~/lib/botApi.js';
// import EditIcon from '@mui/icons-material/Edit';

interface ISignUp {
  onContinue: (val?: boolean | null) => void;
  refLink: string | null;
}

const SignUp = ({ onContinue, refLink }: ISignUp) => {
  const MAX_LENGTH = 14;
  const MIN_LENGTH = 5;
  const checkValid = (val: string) => val.length <= MAX_LENGTH && val.length >= MIN_LENGTH;

  const { nickName, userId, initData } = useTelegram();
  const navigate = useNavigate();
  const [name, setName] = useState(nickName || userId || '');
  const [isValid, setIsValid] = useState(checkValid(name));
  const updateGlobalUser = useSetAtom(userAtom);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsValid(checkValid(event.target.value));
  };

  const handleContinue = () => {
    onContinue();
    navigate('..');
    createUser(initData, name).then((data) => {
      updateGlobalUser({ ...data.user });
      console.log(data.user);
      onContinue(true);
    });
  };

  return (
    <main className="sign-up">
      <div className="sign-up__info">
        <Typography variant="h3">Привет! Ты у нас впервые!</Typography>
        {/* TODO: цеплять аватар по id через бота, позволить его изменять */}
        {/* а надо ли оно? */}
        {/* <div className="sign-up__avatar-container">
          <Typography variant="h5">Твой аватар</Typography>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={<EditIcon fontSize="small" />}
          >
            <Avatar alt="Your avatar" src={avatar} />
          </Badge>
        </div> */}
        <div>
          <TextField
            label="Твой никнейм"
            variant="outlined"
            value={name}
            onChange={handleChangeName}
            fullWidth
            inputProps={{ maxLength: MAX_LENGTH, minLength: MIN_LENGTH }}
          />
          <span className={'sign-up__name-length' + (name.length > MAX_LENGTH ? ' sign-up__name-length_error' : '')}>
            {name.length}/{MAX_LENGTH}
          </span>
        </div>
        {refLink ? (
          <p className="sign-up__referal">
            По реферальной ссылке: &nbsp;
            <b>да &nbsp;</b>
            <DoneIcon color="success" />
          </p>
        ) : (
          <p className="sign-up__referal">
            По реферальной ссылке: &nbsp;
            <b>нет</b>
            <CloseIcon color="error" />
          </p>
        )}
      </div>
      <Button variant="contained" size="large" fullWidth onClick={handleContinue} disabled={!isValid}>
        Присоединиться
      </Button>
    </main>
  );
};

export default SignUp;
