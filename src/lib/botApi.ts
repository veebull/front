import { IUserData } from './interfaces';
import { BACK_URL } from './constants';

export const getUserData = (userInitData: string): Promise<{ user: IUserData }> => {
  return fetch(BACK_URL + '/user?' + userInitData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Failed to get user data');
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });
};

export const createUser = (userInitData: string, gameName: string): Promise<{ user: IUserData }> => {
  return fetch(BACK_URL + '/user?' + userInitData, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      dataGame: {
        name: gameName,
      },
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Failed to create user');
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });
};

export const updateUser = (userInitData: string, newTotalTaps: number): void => {
  fetch(BACK_URL + '/user?' + userInitData, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      dataGame: {
        newTotalTaps,
      },
    }),
  }).catch((err) => {
    console.error(err);
  });
};
