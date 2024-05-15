import { IUserData } from './interfaces';
import { BACK_URL } from './constants';

// ПРИМЕЧАНИЕ
// mode: 'no-cors', т.к. домена нет как такового, а cors есть
// 'ngrok-skip-browser-warning': '69420', - скипает предупреждение от ngrok и не стопорит работу
// при нормальном доменном деплое проблема должна пропасть

export const getUserData = (userInitData: string): Promise<{ user: IUserData }> => {
  return fetch(BACK_URL + '/user?' + userInitData, {
    headers: {
      'ngrok-skip-browser-warning': '69420',
    },
  })
    .then((res) => {
      // if (res.status === 200) {
      return res.json();
      // }

      // throw new Error('Failed to get user data');
    })
    .catch((err) => {
      console.error(err);
    });
};

export const createUser = (userInitData: string, gameName: string): Promise<{ user: IUserData }> => {
  return fetch(BACK_URL + '/user?' + userInitData, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': '69420',
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
    });
};

export const updateUser = (userInitData: string, newTotalTaps: number): Promise<unknown> => {
  return fetch(BACK_URL + '/user?' + userInitData, {
    method: 'PATCH',
    headers: {
      'ngrok-skip-browser-warning': '69420',
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

export const mintTokensOnServer = async (tokens: number, address: string, selfMint: boolean) => {
  const obj = {
    tokens,
    address,
    selfMint
  }
  console.log(JSON.stringify(obj, (_, v) => typeof v === 'bigint' ? v.toString() : v))
  return fetch(BACK_URL + '/mint', {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': '69420',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(obj, (_, v) => typeof v === 'bigint' ? v.toString() : v),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Failed with mint');
    })
    .catch((err) => {
      console.error(err);
    });
};

export const transferTokensOnServer = async (tokens: number, address: string) => {
  const obj = {
    tokens,
    address
  }
  console.log(JSON.stringify(obj))
  return fetch(BACK_URL + '/transfer', {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': '69420',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) {
        
        return res.json();
      }
      console.log(res)
      throw new Error('Failed with transfer');
    })
    .catch((err) => {
      console.error(err);
    });
};