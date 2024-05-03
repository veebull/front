import './Invites.scss';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { appLink } from '~/lib/constants';
import useTelegram from '~/lib/useTelegram';
import { userAtom } from '~/lib/userAtom';

const Invites = () => {
  const { userId } = useTelegram();
  const user = useAtom(userAtom);
  const [userMsg, setUserMsg] = useState('');

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log(e.currentTarget.innerText);
    navigator.clipboard
      .writeText(e.currentTarget.innerText)
      .then(() => {
        setUserMsg('Ссылка скопирована!');
      })
      .catch(() => {
        setUserMsg('Не удалось скопировать одним кликом');
      });
  };

  return (
    <div className="invites">
      <Typography variant="h5">Реферальная программа</Typography>
      <div className="invites__content">
        <Typography variant="h6">Ваш id: {userId}</Typography>
        <Typography variant="h6">
          Ваша реферальная ссылка:{' '}
          <span className="invites__referal-link" onClick={handleClick}>
            {appLink}?startapp={userId}
          </span>
        </Typography>
        {user[0].byReferer && user[0].byReferer !== 'none' ? (
          <Typography variant="h6">Вас пригласил пользователь с id: {user[0].byReferer}</Typography>
        ) : null}
        <span className="invites__user-msg">{userMsg}</span>
      </div>
    </div>
  );
};

export default Invites;
